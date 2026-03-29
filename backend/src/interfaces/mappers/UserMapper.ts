import { User } from '../../domain/user/entities/User';
import { UserId } from '../../domain/user/value-objects/UserId';
import { Email } from '../../domain/user/value-objects/Email';

export class UserMapper {
  static toResponse(user: User): any {
    return {
      id: user.id.toString(),
      email: user.email.toString(),
      name: user.name,
      avatar: user.avatar,
    };
  }

  static toPersistence(user: User): any {
    return {
      _id: user.id.toString(),
      googleId: user.googleId,
      email: user.email.toString(),
      name: user.name,
      avatar: user.avatar,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  static toDomain(raw: any): User {
    return new User(
      UserId.from(raw._id.toString()),
      raw.googleId,
      Email.create(raw.email),
      raw.name,
      raw.avatar,
      raw.createdAt,
      raw.updatedAt,
    );
  }
}
