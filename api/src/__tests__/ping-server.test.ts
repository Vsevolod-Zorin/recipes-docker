import supertest from 'supertest';
import http from 'http';
import appManager from 'src/helpers/app-manager';

describe('server', () => {
  let server: http.Server = appManager.httpServer;
  beforeAll(() => {
    appManager.startServerForTests();
  });

  afterAll(() => {
    appManager.closeServerForTests();
  });

  describe('/', () => {
    it('returns 200 and msg', async () => {
      const response = await supertest(server).get('/');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ msg: 'from api' });
    });
  });
});
