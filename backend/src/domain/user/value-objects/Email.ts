export class Email {
  private constructor(private readonly value: string) {}

  static create(email: string): Email {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) throw new Error(`Invalid email: ${email}`);
    return new Email(email.toLowerCase());
  }

  toString(): string {
    return this.value;
  }

  equals(other: Email): boolean {
    return this.value === other.value;
  }
}
