import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from '../../shared/constants/input.constants';

import { IOperation, Operation } from '../../shared/model/operation.model';
import { OperationService } from './operation.service';
import { IBankAccount } from '../../shared/model/bank-account.model';
import { BankAccountService } from '../../entities/bank-account/bank-account.service';
import { ILabel } from '../../shared/model/label.model';
import { LabelService } from '../../entities/label/label.service';

type SelectableEntity = IBankAccount | ILabel;

@Component({
  selector: 'jhi-operation-update',
  templateUrl: './operation-update.component.html',
})
export class OperationUpdateComponent implements OnInit {
  isSaving = false;
  bankaccounts: IBankAccount[] = [];
  labels: ILabel[] = [];

  editForm = this.fb.group({
    id: [],
    date: [null, [Validators.required]],
    description: [],
    amount: [null, [Validators.required]],
    bankAccount: [],
    labels: [],
  });

  constructor(
    protected operationService: OperationService,
    protected bankAccountService: BankAccountService,
    protected labelService: LabelService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ operation }) => {
      if (!operation.id) {
        const today = moment().startOf('day');
        operation.date = today;
      }

      this.updateForm(operation);

      this.bankAccountService.query().subscribe((res: HttpResponse<IBankAccount[]>) => (this.bankaccounts = res.body || []));

      this.labelService.query().subscribe((res: HttpResponse<ILabel[]>) => (this.labels = res.body || []));
    });
  }

  updateForm(operation: IOperation): void {
    this.editForm.patchValue({
      id: operation._id,
      date: operation.date ? operation.date.format(DATE_TIME_FORMAT) : null,
      description: operation.description,
      amount: operation.amount,
      bankAccount: operation.bankAccount,
      labels: operation.labels,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const operation = this.createFromForm();
    if (operation._id !== undefined) {
      this.subscribeToSaveResponse(this.operationService.update(operation));
    } else {
      this.subscribeToSaveResponse(this.operationService.create(operation));
    }
  }

  private createFromForm(): IOperation {
    return {
      ...new Operation(),
      _id: this.editForm.get(['id'])!.value,
      date: this.editForm.get(['date'])!.value ? moment(this.editForm.get(['date'])!.value, DATE_TIME_FORMAT) : undefined,
      description: this.editForm.get(['description'])!.value,
      amount: this.editForm.get(['amount'])!.value,
      bankAccount: this.editForm.get(['bankAccount'])!.value,
      labels: this.editForm.get(['labels'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOperation>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item._id;
  }

  getSelected(selectedVals: ILabel[], option: ILabel): ILabel {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option._id === selectedVals[i]._id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
