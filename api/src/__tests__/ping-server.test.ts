import supertest from 'supertest';
import http from 'http';
import testsManager from 'src/utils/tests-manager';

describe('server', () => {
	let server: http.Server = testsManager.httpServer;
	beforeAll(() => {
		testsManager.startServerForTests();
	});

	afterAll(() => {
		testsManager.closeServerForTests();
	});

	describe('/', () => {
		it('returns 200 and msg', async () => {
			const response = await supertest(server).get('/');
			expect(response.status).toBe(200);
			expect(response.body).toEqual({ msg: 'from api' });
		});
	});
});
