import { Injectable } from '@nestjs/common';
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

  public insertUser(dto: CreateUserDto) {}

  public updateUser(id: string, dto: UpdateUserDto) {}

  public deleteUser(id: string): Promise<User> {
    return this.prismaService.user.delete({
      where: {
        id,
      },
    });
  }
}
