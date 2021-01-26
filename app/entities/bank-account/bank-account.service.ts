import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBankAccount } from 'app/shared/model/bank-account.model';

type EntityResponseType = HttpResponse<IBankAccount>;
type EntityArrayResponseType = HttpResponse<IBankAccount[]>;

@Injectable({ providedIn: 'root' })
export class BankAccountService {
  public resourceUrl = 'https://app.grizzly-api.com/runtime/600ad13623cd764548f4a73e/api/bank-accounts';

  constructor(protected http: HttpClient) {}

  create(bankAccount: IBankAccount): Observable<EntityResponseType> {
    return this.http.post<IBankAccount>(this.resourceUrl, bankAccount, { observe: 'response' });
  }

  update(bankAccount: IBankAccount): Observable<EntityResponseType> {
    return this.http.put<IBankAccount>(this.resourceUrl, bankAccount, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IBankAccount>(this.resourceUrl + '/' +  id, { observe: 'response' });
  }

  query(): Observable<EntityArrayResponseType> {
    // const options = createRequestOption(req);
    return this.http.get<IBankAccount[]>(this.resourceUrl, { observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {const httpOptions = new HttpHeaders({ 'Content-Type': 'application/json', "apiKey": "UhGmdHzxaLDvCOJwONdzeUNKRgsDPxfb" }) 
    return this.http.delete(this.resourceUrl + '/' +  id, { observe: 'response', headers:httpOptions });
  }
}
