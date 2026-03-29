import { IRequest } from './IRequest';
import { IResponse } from './IResponse';
import { IUserRepository } from '../../../../domain/user/repositories/IUserRepository';
import { ITokenPort } from '../../ports/ITokenPort';
import { User } from '../../../../domain/user/entities/User';
import { Email } from '../../../../domain/user/value-objects/Email';

export class GoogleAuthUseCase {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly tokenPort: ITokenPort,
  ) {}

  async execute(req: IRequest): Promise<IResponse> {
    // Find or create user
    let user = await this.userRepo.findByGoogleId(req.googleId);
    if (!user) {
      user = User.create({
        googleId: req.googleId,
        email: Email.create(req.email),
        name: req.name,
        avatar: req.avatar,
      });
      await this.userRepo.save(user);
    } else {
      // Update profile info on each login
      user.updateProfile(req.name, req.avatar);
      await this.userRepo.save(user);
    }

    // Sign JWT via port (infrastructure detail hidden)
    const token = this.tokenPort.sign({
      userId: user.id.toString(),
      email: user.email.toString(),
    });

    return {
      token,
      user: {
        id: user.id.toString(),
        email: user.email.toString(),
        name: user.name,
        avatar: user.avatar,
      },
    };
  }
}
