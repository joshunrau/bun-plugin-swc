import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'bun:test';

import { HttpStatus, INestApplication } from '@nestjs/common';
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
    let response: request.Response;

    beforeEach(async () => {
      response = await request(server).get('/cats');
    });

    it('should return status code 200', () => {
      expect(response.status).toBe(HttpStatus.OK);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
