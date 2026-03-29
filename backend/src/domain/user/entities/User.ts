import { UserId } from '../value-objects/UserId';
import { Email } from '../value-objects/Email';

export interface CreateUserProps {
  googleId: string;
  email: Email;
  name: string;
  avatar: string;
}

export class User {
  constructor(
    public readonly id: UserId,
    public readonly googleId: string,
    public readonly email: Email,
    public name: string,
    public avatar: string,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {}

  static create(props: CreateUserProps): User {
    const now = new Date();
    return new User(
      UserId.generate(),
      props.googleId,
      props.email,
      props.name,
      props.avatar,
      now,
      now,
    );
  }

  updateProfile(name: string, avatar: string): void {
    this.name = name;
    this.avatar = avatar;
    this.updatedAt = new Date();
  }
}
