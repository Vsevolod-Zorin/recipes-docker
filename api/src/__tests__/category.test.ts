import supertest from 'supertest';
import http from 'http';
import appManager from 'src/helpers/app-manager';

describe('category', () => {
  let server: http.Server = appManager.httpServer;
  beforeAll(() => {
    appManager.startServerForTests();
  });

  afterAll(() => {
    appManager.closeServerForTests();
  });

  it('--- test', async () => {
    expect(true).toBe(true);
  });

  describe('category route: ', () => {
    describe('/category', () => {
      it('should return a 200 and arr', async () => {
        const { statusCode, body } = await supertest(server).get(`/category`);
        expect(statusCode).toBe(200);
      });
    });
  });
});
