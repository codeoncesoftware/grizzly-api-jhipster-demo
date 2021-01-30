import { IUser } from '../../core/user/user.model';
import { IOperation } from '../../shared/model/operation.model';

export interface IBankAccount {
  _id?: number;
  name?: string;
  balance?: number;
  user?: IUser;
  operations?: IOperation[];
}

export class BankAccount implements IBankAccount {
  constructor(public _id?: number, public name?: string, public balance?: number, public user?: IUser, public operations?: IOperation[]) {}
}
