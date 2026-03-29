import { IUserRepository } from '../../../domain/user/repositories/IUserRepository';
import { User } from '../../../domain/user/entities/User';
import { UserId } from '../../../domain/user/value-objects/UserId';
import { UserModel } from '../mongoose/models/UserModel';
import { UserMapper } from '../../../interfaces/mappers/UserMapper';

export class MongoUserRepository implements IUserRepository {
  async findByGoogleId(googleId: string): Promise<User | null> {
    const raw = await UserModel.findOne({ googleId });
    return raw ? UserMapper.toDomain(raw) : null;
  }

  async findById(id: UserId): Promise<User | null> {
    const raw = await UserModel.findById(id.toString());
    return raw ? UserMapper.toDomain(raw) : null;
  }

  async save(user: User): Promise<void> {
    const raw = UserMapper.toPersistence(user);
    await UserModel.findByIdAndUpdate(raw._id, raw, { upsert: true, new: true });
  }
}
