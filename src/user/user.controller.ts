import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CreateUserDto, UpdateUserDto } from './dtos';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.findUsers();
  }

  @Get(':id')
  @ApiNotFoundResponse({
    description: 'User does not exist',
  })
  @ApiParam({
    name: 'id',
    description: 'User id',
  })
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
  @ApiBody({
    description: 'Create user request body',
    type: CreateUserDto,
  })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  createUser(@Body() body: CreateUserDto) {
    return this.userService.insertUser(body);
  }

  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  @ApiParam({
    name: 'id',
    description: 'User id',
  })
  @ApiCreatedResponse({
    status: 201,
    description: 'The user has been successfully updated.',
  })
  @ApiNotFoundResponse({
    description: 'User does not exist',
  })
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.updateUser(id, body);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'User deleted successfully' })
  @ApiParam({
    name: 'id',
    description: 'User id',
  })
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
