import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UserResponse } from './responses';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(@Body() dto: CreateUserDto) {
    const user = await this.userService.save(dto);
    return new UserResponse(user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':email')
  async findOneUserByEmail(@Param('email') email: string) {
    const user = await this.userService.findOneByEmail(email);
    return new UserResponse(user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    const user = await this.userService.update(id, dto);
    return new UserResponse(user);
  }
}
