import { Injectable } from '@nestjs/common';
import { genSaltSync, hashSync } from 'bcrypt';
import { Role, User } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';
import { UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  save(user: Partial<User>) {
    const hashedPassword = this.hashPassword(user.password);
    return this.prismaService.user.create({
      data: {
        userName: user.userName,
        password: hashedPassword,
        email: user.email,
        role: user.role || Role.USER,
      },
    });
  }

  findOneByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }

  update(id: string, dto: UpdateUserDto) {
    return this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        userName: dto.userName,
        email: dto.email,
      },
    });
  }

  private hashPassword(password: string) {
    return hashSync(password, genSaltSync(10));
  }
}
