import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { getConnection } from 'typeorm';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  afterAll(async done => {
    const entities = getConnection().entityMetadatas;

    for (const entity of entities) {
        const repository = getConnection().getRepository(entity.name); // Get repository
        await repository.query(`DELETE FROM ${entity.tableName};`);
    }
    app.close()
    done()
  })

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/employee (Post) - Bad Request ', async () => {
    const response = await request(app.getHttpServer())
      .post('/employee')
      .expect(400);
  });

  it('/employee (Post) - Employee Inserted', async () => {
    const response = await request(app.getHttpServer())
      .post('/employee')
      .send({ name: 'testEmployee', designation: 'TestDesignation' })
      .expect(201)
  });

  it('/employee (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/employee')
      .expect(200);
    expect(response.body).toHaveLength(1)
  });
});
