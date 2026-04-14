export class UsernameValidator {
  static regex = /^[a-z0-9\-.]{4,}$/;

  constructor(private readonly username: string) {}

  validate() {
    return UsernameValidator.regex.test(this.username);
  }
}
