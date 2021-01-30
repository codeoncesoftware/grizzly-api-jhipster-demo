import { IOperation } from '../../shared/model/operation.model';

export interface ILabel {
  _id?: number;
  label?: string;
  operations?: IOperation[];
}

export class Label implements ILabel {
  constructor(public _id?: number, public label?: string, public operations?: IOperation[]) {}
}
