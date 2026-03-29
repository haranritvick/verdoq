import { User } from '../entities/User';
import { UserId } from '../value-objects/UserId';

export interface IUserRepository {
  findByGoogleId(googleId: string): Promise<User | null>;
  findById(id: UserId): Promise<User | null>;
  save(user: User): Promise<void>;
}
