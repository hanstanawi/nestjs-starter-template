import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserModule } from 'src/user/user.module';
import * as request from 'supertest';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let httpServer: any;

  function seedDb() {
    return prisma.user.createMany({
      data: [
        {
          id: 'clp93rulx00003b73mmbtrfps',
          email: 'janedoe@gmail.com',
          name: 'Jane Doe',
        },
      ],
    });
  }

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule, PrismaModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    prisma = app.get(PrismaService);
    httpServer = app.getHttpServer();
    await seedDb();
    await app.init();
  });

  afterAll(() => {
    prisma.$transaction([prisma.user.deleteMany()]);
    app.close();
  });

  describe('Get Users', () => {
    it('should get all users /users (GET)', async () => {
      const res = await request(httpServer).get('/api/v1/users').expect(200);
      expect(res.body).toHaveLength(1);
    });

    it('should throw not found error /users/:id (GET)', () => {
      return request(httpServer).get('/api/v1/users/2321').expect(404).expect({
        message: 'User with 2321 does not exist',
        statusCode: 404,
        error: 'Not Found',
      });
    });

    // it();
  });

  describe('Create user', () => {
    it('/users (POST) with wrong email format', () => {
      return request(httpServer)
        .post('/api/v1/users')
        .send({ name: 'john doe', email: 'john' })
        .expect(400)
        .expect({
          message: ['email must be an email'],
          error: 'Bad Request',
          statusCode: 400,
        });
    });
  });
});
