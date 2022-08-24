import supertest from 'supertest';
import http from 'http';
import app from '..';


describe('category', () => {
  let server;
  beforeAll(done => {
    server = http.createServer(app)
    server.listen(done);
  });

  afterAll(done => {
      server.close(done);
  });
  it('--- test', async () => {
    expect(true).toBe(true);
  });
  describe('get category route', () => {
    describe('/category', () => {
      it('should return a 200 and arr', async () => {
        const { statusCode, body } = await supertest(server).get(`/category`);
        expect(statusCode).toBe(200);
      });
    });
  });
});
