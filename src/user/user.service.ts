import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

import { CreateUserDto, UpdateUserDto } from './dtos';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly prismaService: DatabaseService) {}

  public findUsers(limit: number = 10): Promise<User[]> {
    return this.prismaService.user.findMany({
      take: limit,
    });
  }

  public findUserById(id: string): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
  }

  public async insertUser({ name, email }: CreateUserDto) {
    const created = await this.prismaService.user.create({
      data: {
        name: name ?? undefined,
        email,
      },
    });

    this.logger.log({ message: `User ${email} inserted successfully` });

    return created;
  }

  public async updateUser(id: string, { email, name }: UpdateUserDto) {
    const existingUser = await this.findUserById(id);

    if (!existingUser) {
      const exception = new NotFoundException(
        `User with ${id} id does not exist`,
      );
      this.logger.error(
        {
          message: exception.message,
          statusCode: exception.getStatus(),
        },
        exception.stack,
      );
      throw exception;
    }

    const updated = await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        email,
        name: name ?? undefined,
      },
    });

    this.logger.log({ message: `User ${id} updated successfully` });

    return updated;
  }

  public async deleteUser(
    id: string,
  ): Promise<{ id: string; deleted: boolean }> {
    const deleted = await this.prismaService.user.delete({
      where: {
        id,
      },
    });

    this.logger.log({ message: `User ${id} deleted successfully` });

    return {
      id: deleted.id,
      deleted: true,
    };
  }
}
