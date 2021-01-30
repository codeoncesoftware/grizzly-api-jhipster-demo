import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';

import { Login } from '../../core/login/login.model';


type JwtToken = {
  token: string;
};

@Injectable({ providedIn: 'root' })
export class AuthServerProvider {
  constructor(private http: HttpClient, private $localStorage: LocalStorageService, private $sessionStorage: SessionStorageService) {}

  getToken(): string {
    return this.$localStorage.retrieve('authenticationToken') || this.$sessionStorage.retrieve('authenticationToken') || '';
  }

  login(credentials: Login): Observable<void> {
    return this.http
      .post<JwtToken>('https://app.grizzly-api.com/runtime/600ad13623cd764548f4a73e/signin', credentials)
      .pipe(map(response => this.authenticateSuccess(response , credentials.username)));
  }

  logout(): Observable<void> {
    return new Observable(observer => {
      this.$localStorage.clear('authenticationToken');
      this.$sessionStorage.clear('authenticationToken');
      observer.complete();
    });
  }

  private authenticateSuccess(response: JwtToken , username : string): void {
    const jwt = response.token;
    this.$localStorage.store('authenticationToken', jwt);
    localStorage.setItem('username' , username );}
}
