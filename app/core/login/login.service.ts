import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { AccountService } from '../../core/auth/account.service';
import { AuthServerProvider } from '../../core/auth/auth-jwt.service';
import { Login } from './login.model';

@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(private accountService: AccountService, private authServerProvider: AuthServerProvider) {}

  login(credentials: Login){
    return this.authServerProvider.login(credentials);
  }

  logout(): void {
    this.authServerProvider.logout().subscribe(null, null, () => this.accountService.authenticate(null));
  }
}
