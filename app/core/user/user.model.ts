export interface IUser {
  _id?: any;
  username?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  activated?: boolean;
  langKey?: string;
  authorities?: string[];
  createdBy?: string;
  createdDate?: Date;
  lastModifiedBy?: string;
  lastModifiedDate?: Date;
  password?: string;
  phone?: string;
}

export class User implements IUser {
  constructor(
    public _id?: any,
    public username?: string,
    public firstname?: string,
    public lastname?: string,
    public email?: string,
    public activated?: boolean,
    public langKey?: string,
    public authorities?: string[],
    public createdBy?: string,
    public createdDate?: Date,
    public lastModifiedBy?: string,
    public lastModifiedDate?: Date,
    public password?: string,
    public phone?: string
  ) {}
}
