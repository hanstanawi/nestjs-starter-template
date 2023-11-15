import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateUserDto, UpdateUserDto } from './dtos';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  public findUsers(limit: number = 10): Promise<User[]> {
    return this.prismaService.user.findMany({
      take: limit,
      skip: 1,
    });
  }

  public findUserById(id: string): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
  }

  public insertUser({ name, email }: CreateUserDto) {
    return this.prismaService.user.create({
      data: {
        name: name ?? undefined,
        email,
      },
    });
  }

  public async updateUser(id: string, { email, name }: UpdateUserDto) {
    const existingUser = await this.findUserById(id);

    if (!existingUser) {
      throw new NotFoundException(`User with ${id} id does not exist`);
    }

    return this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        email,
        name: name ?? undefined,
      },
    });
  }

  public async deleteUser(
    id: string,
  ): Promise<{ id: string; deleted: boolean }> {
    const deleted = await this.prismaService.user.delete({
      where: {
        id,
      },
    });

    return {
      id: deleted.id,
      deleted: true,
    };
  }
}
