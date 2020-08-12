import app from '../src/app';
import { crawl } from '../src/utils/crawler';
import { isUrlValid, isSubPath } from '../src/utils/validator';
import { crawlBackground } from '../src/routes/collector.route';
import * as request from 'supertest';

jest.mock('../src/dbs/Mongo');
jest.mock('../src/dbs/MongoLink');

// Test routes
test('Request url crawl', async () => {
  await request(app).get('/').query({ url: 'https://www.test.com.br' }).send().expect(200);
});

test('Request url crawl with url not in the database', async () => {
  await request(app).get('/').query({ url: 'https://www.test1.com.br' }).send().expect(200);
});

test('Request url crawl with invalid url', async () => {
  const response = await request(app).get('/').query({ url: '?test1.com' }).send().expect(400);
  expect(response.text).toBe('INVALID URL');
});

test('Request all urls', async () => {
  await request(app).get('/').send().expect(200);
});

test('Delete url record', async () => {
  await request(app).delete('/').query({ url: 'https://www.test.com.br' }).send().expect(204);
});

test('Delete url record without query params', async () => {
  const response = await request(app).delete('/').send().expect(400);
  expect(response.text).toBe('URL REQUIRED');
});

test('Test database connection error handle', async () => {
  const response = await request(app).get('/').query({ url: 'https://www.test2.com.br' }).send().expect(500);
  expect(response.text).toBe('INTERNAL ERROR');
});

//test crawlBackground function
test('Test crawlBackground function', () => {
  expect(crawlBackground(['https://www.test1.com.br'])).resolves;
});

test('Test crawlBackground function with url not in the database', () => {
  expect(crawlBackground(['https://www.test3.com.br'])).resolves;
});

//test validator funtions
test('Test is urlValid with valid url', async () => {
  const response = isUrlValid('test.com');
  expect(response).toBe(true);
});

test('Test is urlValid with a not valid url', async () => {
  const response = isUrlValid('?test.com');
  expect(response).toBe(false);
});

test('Test valid sub path', async () => {
  const response = isSubPath('/about');
  expect(response).toBe(true);
});

test('Test invalid sub path', async () => {
  const response = isSubPath('/#about');
  expect(response).toBe(false);
});

//test crawler functions
test('Test crawl function with valid url', async () => {
  const response = await crawl('crawler-test.com');
  expect(response.size).toBeGreaterThanOrEqual(1);
});

test('Test crawl function with invalid url', async () => {
  const response = await crawl('test');
  expect(response.size).toBe(0);
});
