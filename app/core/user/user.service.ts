import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IUser } from './user.model';
import { Pagination } from '../../shared/util/request-util';

@Injectable({ providedIn: 'root' })
export class UserService {


  constructor(private http: HttpClient) {}

  create(user: IUser): Observable<IUser> {
    return this.http.post<IUser>('https://app.grizzly-api.com/runtime/600ad13623cd764548f4a73e/signup', user);
  }

  // update(user: IUser): Observable<IUser> {
  //   return this.http.put<IUser>(this.resourceUrl, user);
  // }

  // find(login: string): Observable<IUser> {
  //   return this.http.get<IUser>(`${this.resourceUrl}/${login}`);
  // }

  query(req?: Pagination){
    return this.http.get<IUser[]>('https://app.grizzly-api.com/runtime/600ad13623cd764548f4a73e/users', { observe: 'response' });
  }

  // delete(login: string): Observable<{}> {
  //   return this.http.delete(`${this.resourceUrl}/${login}`);
  // }

  // authorities(): Observable<string[]> {
  //   return this.http.get<string[]>(SERVER_API_URL + 'api/users/authorities');
  // }
}
