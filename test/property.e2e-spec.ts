import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module.js';

describe('Property API (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleRef.createNestApplication();

        await app.init();
    });

    afterEach(async () => {
        await app.close();
    });

    it('GET /properties/111 should return property', async () => {
        const response = await request(app.getHttpServer())
            .get('/properties/111')
            .set('x-api-key', 'piyush123');

        expect(response.status).toBe(200);
        expect(response.body.id).toBe('111');
    });

    it('GET /properties/3456 should return notFound error', async () => {
        const response = await request(app.getHttpServer())
            .get('/properties/3456')
            .set('x-api-key', 'piyush123');

        expect(response.status).toBe(404);
    });

    it('GET /properties/111 should return error when x-api-key is wrong', async () => {
        const response = await request(app.getHttpServer())
            .get('/properties/111')
            .set('x-api-key', 'piyush12');

        expect(response.status).toBe(403);
    });
});