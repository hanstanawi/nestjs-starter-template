import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@prisma/client';
import { DatabaseModule } from 'src/database/database.module';
import { DatabaseService } from 'src/database/database.service';
import { UserModule } from 'src/user/user.module';
import * as request from 'supertest';

const mockUser = {
  id: 'clp93rulx00003b73mmbtrfps',
  email: 'janedoe@gmail.com',
  name: 'Jane Doe',
};

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let prisma: DatabaseService;
  let httpServer: any;
  let createdUser: User;

  function seedDb() {
    return prisma.user.createMany({
      data: [mockUser],
    });
  }

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule, DatabaseModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    prisma = app.get(DatabaseService);
    httpServer = app.getHttpServer();
    await seedDb();
    await app.init();
  });

  afterAll(() => {
    prisma.$transaction([prisma.user.deleteMany()]);
    app.close();
  });

  describe('Get Users', () => {
    it('(GET /users) should get all users', async () => {
      const res = await request(httpServer).get('/users');

      expect(res.status).toBe(HttpStatus.OK);
      expect(res.body).toHaveLength(1);
    });

    it('(GET /users/:id) should throw not found error', () => {
      return request(httpServer).get('/users/2321').expect(404).expect({
        message: 'User with 2321 does not exist',
        statusCode: 404,
        error: 'Not Found',
      });
    });

    it(' should get a single user', async () => {
      const res = await request(httpServer).get(`/users/${mockUser.id}`);

      expect(res.status).toBe(HttpStatus.OK);
      expect(res.body).toHaveProperty('id', mockUser.id);
      expect(res.body).toHaveProperty('name', 'Jane Doe');
      expect(res.body).toHaveProperty('email', 'janedoe@gmail.com');
    });
  });

  describe('Create user', () => {
    it('should reject request with wrong email email (POST /users)', () => {
      return request(httpServer)
        .post('/users')
        .send({ name: 'john doe', email: 'john' })
        .expect(400)
        .expect({
          message: ['email must be an email'],
          error: 'Bad Request',
          statusCode: 400,
        });
    });

    it('should create a new user (POST /users)', async () => {
      const newUser = { name: 'john doe', email: 'johndoe@gmail.com' };
      const res = await request(httpServer).post('/users').send(newUser);

      createdUser = res.body;

      expect(res.status).toBe(HttpStatus.CREATED);
      expect(res.body).toHaveProperty('id');
      expect(res.body).toHaveProperty('name', newUser.name);
      expect(res.body).toHaveProperty('email', newUser.email);
    });
  });

  describe('Update user', () => {
    it('(PUT /users/:id) should throw not found error', async () => {
      const res = await request(httpServer)
        .put('/users/2321')
        .send({ id: '2321', name: null, email: 'test@test.com' });

      expect(res.status).toBe(HttpStatus.NOT_FOUND);
      expect(res.body).toEqual({
        message: 'User with 2321 id does not exist',
        error: 'Not Found',
        statusCode: 404,
      });
    });

    it('(PUT /users/:id) should throw bad request error', async () => {
      const res = await request(httpServer)
        .put(`/users/${createdUser.id}`)
        .send({ id: createdUser.id, name: null, email: 'test' });

      expect(res.status).toBe(HttpStatus.BAD_REQUEST);
      expect(res.body).toEqual({
        message: ['email must be an email'],
        error: 'Bad Request',
        statusCode: 400,
      });
    });

    it('(PUT /users/:id) should update created user', async () => {
      const updateUserPayload = {
        id: createdUser.id,
        name: 'Updated name',
        email: 'johnupdated@email.com',
      };
      const res = await request(httpServer)
        .put(`/users/${createdUser.id}`)
        .send(updateUserPayload);

      expect(res.status).toBe(HttpStatus.CREATED);
      expect(res.body).toHaveProperty('id', createdUser.id);
      expect(res.body).toHaveProperty('name', updateUserPayload.name);
      expect(res.body).toHaveProperty('email', updateUserPayload.email);
    });
  });

  describe('Delete user', () => {
    it('(DELETE /users/:id) should delete the user', async () => {
      const res = await request(httpServer).delete(`/users/${createdUser.id}`);

      expect(res.status).toBe(HttpStatus.OK);
      expect(res.body).toEqual({
        id: createdUser.id,
        deleted: true,
      });
    });

    it('GET /users/:id) verify user is deleted', async () => {
      const res = await request(httpServer).get(`/users/${createdUser.id}`);

      expect(res.status).toBe(HttpStatus.NOT_FOUND);
      expect(res.body).toEqual({
        message: `User with ${createdUser.id} does not exist`,
        statusCode: 404,
        error: 'Not Found',
      });
    });
  });
});
