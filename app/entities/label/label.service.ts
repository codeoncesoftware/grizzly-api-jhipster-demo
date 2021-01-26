import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILabel } from 'app/shared/model/label.model';

type EntityResponseType = HttpResponse<ILabel>;
type EntityArrayResponseType = HttpResponse<ILabel[]>;

@Injectable({ providedIn: 'root' })
export class LabelService {
  public resourceUrl = 'https://app.grizzly-api.com/runtime/600ad13623cd764548f4a73e/api/labels';

  constructor(protected http: HttpClient) {}

  create(label: ILabel): Observable<EntityResponseType> {
    return this.http.post<ILabel>(this.resourceUrl, label, { observe: 'response' });
  }

  update(label: ILabel): Observable<EntityResponseType> {
    return this.http.put<ILabel>(this.resourceUrl, label, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILabel>(this.resourceUrl +  '/'+ id, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    return this.http.get<ILabel[]>(this.resourceUrl, { observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(this.resourceUrl +  '/'+ id, { observe: 'response' });
  }
}
