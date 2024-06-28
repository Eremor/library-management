import {
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from '@user/user.service';
import { LoginDto, RegisterDto } from './dto';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private readonly userService: UserService) {}

  async register(dto: RegisterDto): Promise<User> {
    try {
      const user: User = await this.userService.findOneByEmail(dto.email);

      if (user) {
        throw new ConflictException(
          'A user with this email is already registered',
        );
      }

      return this.userService.save(dto);
    } catch (error) {
      this.logger.error(error);
    }
  }

  async login(dto: LoginDto): Promise<User> {
    try {
      const user: User = await this.userService.findOneByEmail(dto.email);

      if (!user || !compareSync(dto.password, user.password)) {
        throw new UnauthorizedException('Invalid email or password');
      }

      return user;
    } catch (error) {
      this.logger.error(error);
    }
  }
}
