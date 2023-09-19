import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'bun:test';

import { HttpStatus } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';

import { AppModule } from './app.module';

describe('App', () => {
  let app: NestExpressApplication;
  let server: any;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication({
      logger: false
    });

    await app.init();
    server = app.getHttpServer();
  });

  describe('GET /cats', () => {
    it('should return status code 200', async () => {
      const response = await request(server).get('/cats');
      expect(response.status).toBe(HttpStatus.OK);
    });

    it('should return an empty array', async () => {
      const response = await request(server).get('/cats');
      expect(response.body).toBeArrayOfSize(0);
    });
  });

  describe('POST /cats', () => {
    it('should return status code 201', async () => {
      const response = await request(server).post('/cats').send({
        name: 'Winston'
      });
      expect(response.status).toBe(HttpStatus.CREATED);
    });
    it('should return the created cat', async () => {
      const response = await request(server).post('/cats').send({ name: 'Winston' });
      expect(response.body).toMatchObject({ name: 'Winston' });
    });
    it('should reject a request to create a cat without a name', async () => {
      const response = await request(server).post('/cats').send();
      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
