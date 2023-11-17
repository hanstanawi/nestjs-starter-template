import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { CreateUserDto, UpdateUserDto } from './dtos';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.findUsers();
  }

  @Get(':id')
  async getSingleUser(@Param('id') id: string) {
    const user = await this.userService.findUserById(id);

    if (!user) {
      throw new NotFoundException(`User with ${id} does not exist`);
    }

    return user;
  }

  @Post()
  createUser(@Body() body: CreateUserDto) {
    return this.userService.insertUser(body);
  }

  @Put()
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.updateUser(id, body);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
