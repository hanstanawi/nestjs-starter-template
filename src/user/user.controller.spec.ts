import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@prisma/client';

import { CreateUserDto, UpdateUserDto } from './dtos';
import { UserController } from './user.controller';
import { UserService } from './user.service';

const mockUserService = {
  getAll: jest.fn<User[], []>().mockImplementation(() => [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@email.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: 'Test User 2',
      email: 'test2@email.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '3',
      name: 'Test User 3',
      email: 'test3@email.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  getOne: jest.fn<Promise<User>, [string]>().mockImplementation((id) =>
    Promise.resolve({
      id: id,
      name: 'John Doe',
      email: 'john@email.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
  ),
  insertUser: jest
    .fn<Promise<User>, [CreateUserDto]>()
    .mockImplementation((user) =>
      Promise.resolve({
        id: '1',
        name: user.name ?? null,
        email: user.email,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    ),
  updateUser: jest
    .fn<Promise<User>, [string, UpdateUserDto]>()
    .mockImplementation((id, user) =>
      Promise.resolve({
        id,
        name: user.name ?? null,
        email: user.email,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    ),
  deleteUser: jest
    .fn<{ deleted: boolean }, [string]>()
    .mockImplementation((id) => ({ id, deleted: true })),
};

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: mockUserService }],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
