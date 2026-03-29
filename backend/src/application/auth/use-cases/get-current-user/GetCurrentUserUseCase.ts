import { IResponse } from './IResponse';
import { IUserRepository } from '../../../../domain/user/repositories/IUserRepository';
import { ITokenPort } from '../../ports/ITokenPort';
import { UserId } from '../../../../domain/user/value-objects/UserId';
import { NotFoundError } from '../../../../domain/errors';

export class GetCurrentUserUseCase {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly tokenPort: ITokenPort,
  ) {}

  async execute(userId: string): Promise<IResponse> {
    const user = await this.userRepo.findById(UserId.from(userId));
    if (!user) throw new NotFoundError('User not found');

    return {
      id: user.id.toString(),
      email: user.email.toString(),
      name: user.name,
      avatar: user.avatar,
    };
  }
}
