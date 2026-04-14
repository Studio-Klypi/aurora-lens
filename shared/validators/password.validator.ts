export class PasswordValidator {
  static regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,}$/;

  constructor(private readonly password: string) {}

  validate() {
    return PasswordValidator.regex.test(this.password);
  }
}
