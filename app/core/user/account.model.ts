export class Account {
  constructor(
    public activated: boolean,
    public authorities: string[],
    public email: string,
    public firstname: string,
    public langKey: string,
    public lastname: string,
    public username: string,
    public imageUrl: string,
    public phone : '000000'
  ) {}
}
