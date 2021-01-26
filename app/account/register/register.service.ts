import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { IUser } from 'app/core/user/user.model';

@Injectable({ providedIn: 'root' })
export class RegisterService {
  constructor(private http: HttpClient) {}

  save(account: IUser): Observable<{}> {
    return this.http.post('https://app.grizzly-api.com/runtime/600ad13623cd764548f4a73e/signup', account);
  }
}
