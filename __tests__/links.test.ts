import app from '../src/app';
import * as request from 'supertest';

jest.mock('../src/dbs/Mongo');
jest.mock('../src/dbs/MongoLink');

test('Request url crawl', async () => {
  await request(app).get('/').query({ url: 'https://www.test.com.br' }).send().expect(200);
});

test('Request all urls', async () => {
  await request(app).get('/').send().expect(200);
});

test('Delete url record', async () => {
  await request(app).delete('/').query({ url: 'https://www.test.com.br' }).send().expect(204);
});

test('Delete url record without query params', async () => {
  await request(app).delete('/').send().expect(400);
});
