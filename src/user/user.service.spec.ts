import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from 'src/database/database.service';

import { UserService } from './user.service';

const mockUsers = [
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
];

const mockUser = mockUsers[0];

const mockDatabaseService = {
  user: {
    findMany: jest.fn().mockResolvedValue(mockUsers),
    findUnique: jest.fn().mockResolvedValue(mockUser),
    findFirst: jest.fn().mockResolvedValue(mockUser),
    create: jest.fn().mockReturnValue(mockUser),
    save: jest.fn(),
    update: jest.fn().mockResolvedValue(mockUser),
    delete: jest.fn().mockResolvedValue(mockUser),
  },
};

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: DatabaseService,
          useValue: mockDatabaseService,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
