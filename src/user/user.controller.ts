import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { CreateUserDto, UpdateUserDto } from './dtos';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.findUsers();
  }

  @Get(':id')
  async getSingleUser(@Param('id') id: string) {
    const user = await this.userService.findUserById(id);

    if (!user) {
      const exception = new NotFoundException(`User with ${id} does not exist`);

      this.logger.error(
        {
          message: exception.message,
          statusCode: exception.getStatus(),
        },
        exception.stack,
      );

      throw exception;
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
