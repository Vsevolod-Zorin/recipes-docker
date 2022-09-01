import supertest from 'supertest';
import http from 'http';
import { ICategory, ICategoryCreate, ICategoryUpdate } from 'src/types/category/category.interface';
import testsManager from 'src/helpers/tests-manager';
import { BackendMessage } from 'src/shared/backend.messages';
import { IBackendError } from 'src/types/backend/error-template.interface';

describe('category', () => {
	let server: http.Server = testsManager.httpServer;
	let categoryForTest: ICategory;
	let subCategoryForTest1: ICategory;
	let subCategoryForTest2: ICategory;

	beforeAll(() => {
		testsManager.startServerForTests();
	});

	afterAll(() => {
		testsManager.closeServerForTests();
	});

	describe('--- Create. post( /category ) ', () => {
		describe('positive: valid params', () => {
			it('should return a 201 and category', async () => {
				const payload: ICategoryCreate = {
					name: 'tests category',
					parentId: null,
				};
				const { statusCode, body } = await supertest(server).post(`/category`).send(payload);
				const data: ICategory = {
					_id: expect.any(String),
					name: 'tests category',
					parentId: null,
					createdAt: expect.any(String),
					updatedAt: expect.any(String),
				};

				expect(statusCode).toBe(201);
				expect(body).toEqual(data);
				categoryForTest = body;
			});
			it('create first child', async () => {
				const payload: ICategoryCreate = {
					name: 'subCategory1',
					parentId: categoryForTest._id,
				};
				const { statusCode, body } = await supertest(server).post(`/category`).send(payload);
				const data: ICategory = {
					_id: expect.any(String),
					name: 'subCategory1',
					parentId: categoryForTest._id,
					createdAt: expect.any(String),
					updatedAt: expect.any(String),
				};

				expect(statusCode).toBe(201);
				expect(body).toEqual(data);
				subCategoryForTest1 = body;
			});
			it('create second child', async () => {
				const payload: ICategoryCreate = {
					name: 'subCategory2',
					parentId: categoryForTest._id,
				};
				const { statusCode, body } = await supertest(server).post(`/category`).send(payload);
				const data: ICategory = {
					_id: expect.any(String),
					name: 'subCategory2',
					parentId: categoryForTest._id,
					createdAt: expect.any(String),
					updatedAt: expect.any(String),
				};

				expect(statusCode).toBe(201);
				expect(body).toEqual(data);
				subCategoryForTest2 = body;
			});
		});
		describe('negative: uncorrect params', () => {
			it('empty body. should return a 400 ', async () => {
				const payload = {};
				const { statusCode, body } = await supertest(server).post(`/category`).send(payload);
				const data: IBackendError = {
					message: 'Bad Request',
					error: {
						name: ['name must be a string', 'name should not be empty'],
						parentId: ['parentId must be a string or null'],
					},
				};

				expect(statusCode).toBe(400);
				expect(body).toEqual(data);
			});
			it('body without name. should return a 400 ', async () => {
				const payload = { parentId: null };
				const { statusCode, body } = await supertest(server).post(`/category`).send(payload);
				const data: IBackendError = {
					message: 'Bad Request',
					error: {
						name: ['name must be a string', 'name should not be empty'],
					},
				};

				expect(statusCode).toBe(400);
				expect(body).toEqual(data);
			});
			it('body without parrentId. should return a 400 ', async () => {
				const payload = { name: 'test' };
				const { statusCode, body } = await supertest(server).post(`/category`).send(payload);
				const data: IBackendError = {
					message: 'Bad Request',
					error: {
						parentId: ['parentId must be a string or null'],
					},
				};

				expect(statusCode).toBe(400);
				expect(body).toEqual(data);
			});
			it('body with uncorrect name. name = true. should return a 400 ', async () => {
				const payload = { name: true, parentId: null };
				const { statusCode, body } = await supertest(server).post(`/category`).send(payload);
				const data: IBackendError = {
					message: 'Bad Request',
					error: {
						name: ['name must be a string'],
					},
				};

				expect(statusCode).toBe(400);
				expect(body).toEqual(data);
			});
			it('body with uncorrect parentId. parentId = false. should return a 400 ', async () => {
				const payload = { name: 'test', parentId: false };
				const { statusCode, body } = await supertest(server).post(`/category`).send(payload);
				const data: IBackendError = {
					message: 'Bad Request',
					error: {
						parentId: ['parentId must be a string or null'],
					},
				};

				expect(statusCode).toBe(400);
				expect(body).toEqual(data);
			});
		});
	});

	describe('--- GetCategories. get( /category ): ', () => {
		describe('positive', () => {
			it('should return a 200 and arr', async () => {
				const { statusCode, body } = await supertest(server).get(`/category`);
				const data: ICategory[] = body;

				expect(statusCode).toBe(200);
				expect(body).toEqual(data);
			});
		});
	});

	describe('--- GetById. get( /category/:id ) ', () => {
		describe('positive. correct params id', () => {
			it('should return a 200 and category', async () => {
				const id: string = categoryForTest._id;
				const { statusCode, body } = await supertest(server).get(`/category/${id}`);
				const data: ICategory[] = body;

				expect(statusCode).toBe(200);
				expect(body).toEqual(data);
			});
		});

		describe('negative: uncorrect params id', () => {
			it('should return a 400 ', async () => {
				const fakeId = 'qwe';
				const { statusCode, body } = await supertest(server).get(`/category/${fakeId}`);
				const data: IBackendError = { message: BackendMessage.UNCORRECT_ID };

				expect(statusCode).toBe(400);
				expect(body).toEqual(data);
			});
		});
	});

	describe('--- Update. put( /category ) ', () => {
		describe('positive: valid params', () => {
			it('should return a 200 and updated category', async () => {
				const payload: ICategoryUpdate = {
					id: categoryForTest._id,
					name: 'updated category',
					parentId: null,
				};
				const { statusCode, body } = await supertest(server).put(`/category`).send(payload);
				const data: ICategory = {
					_id: expect.any(String),
					name: 'updated category',
					parentId: null,
					createdAt: expect.any(String),
					updatedAt: expect.any(String),
				};

				expect(statusCode).toBe(200);
				expect(body).toEqual(data);
				categoryForTest = body;
			});
		});

		describe('negative: uncorrect params', () => {
			it('empty body. should return a 400 ', async () => {
				const { statusCode, body } = await supertest(server).put(`/category`).send({});
				const data: IBackendError = {
					message: BackendMessage.UNCORRECT_ID,
				};

				expect(statusCode).toBe(400);
				expect(body).toEqual(data);
			});
			it('body without id. should return a 400 ', async () => {
				const payload = {
					name: 'updated category',
					parentId: null,
				};
				const { statusCode, body } = await supertest(server).put(`/category`).send(payload);
				const data: IBackendError = {
					message: BackendMessage.UNCORRECT_ID,
				};

				expect(statusCode).toBe(400);
				expect(body).toEqual(data);
			});
			it('body with uncorrect id. id = true. should return a 404 ', async () => {
				const payload = {
					id: true,
					name: 'updated category',
					parentId: null,
				};
				const { statusCode, body } = await supertest(server).put(`/category`).send(payload);
				const data: IBackendError = {
					message: BackendMessage.UNCORRECT_ID,
				};

				expect(statusCode).toBe(400);
				expect(body).toEqual(data);
			});
			it('body with uncorrect id. id = fakeid. should return a 404 ', async () => {
				const payload = {
					id: '6308af066754b3d1914597f',
					name: 'updated category',
					parentId: null,
				};
				const { statusCode, body } = await supertest(server).put(`/category`).send(payload);
				const data: IBackendError = { message: BackendMessage.UNCORRECT_ID };

				expect(statusCode).toBe(400);
				expect(body).toEqual(data);
			});
			it('body with uncorrect name. name = true. should return a 400 ', async () => {
				const payload = {
					id: categoryForTest._id,
					name: true,
					parentId: null,
				};
				const { statusCode, body } = await supertest(server).put(`/category`).send(payload);
				const data: IBackendError = {
					message: 'Bad Request',
					error: {
						name: ['name must be a string'],
					},
				};

				expect(statusCode).toBe(400);
				expect(body).toEqual(data);
			});
			it('body with uncorrect parrentId. parrentId = false. should return a 400 ', async () => {
				const payload = {
					id: categoryForTest._id,
					name: 'updated category',
					parentId: false,
				};
				const { statusCode, body } = await supertest(server).put(`/category`).send(payload);
				const data: IBackendError = {
					message: 'Bad Request',
					error: {
						parentId: ['parentId must be a string or null'],
					},
				};

				expect(statusCode).toBe(400);
				expect(body).toEqual(data);
			});
		});
	});

	describe('--- Delete. delete( /category/:id )', () => {
		describe('positive: valid id', () => {
			it('should return a 200', async () => {
				const id: string = categoryForTest._id;
				const { statusCode, body } = await supertest(server).delete(`/category/${id}`);

				expect(statusCode).toBe(200);
			});

			describe('move subcategories up', () => {
				it('check subCategoryForTest1 parentId === null ', async () => {
					const id: string = subCategoryForTest1._id;
					const { statusCode, body } = await supertest(server).get(`/category/${id}`);
					const data: ICategory = {
						_id: id,
						name: 'subCategory1',
						parentId: null,
						createdAt: expect.any(String),
						updatedAt: expect.any(String),
					};

					expect(statusCode).toBe(200);
					expect(body).toEqual(data);
				});
				it('check subCategoryForTest2 parentId === null ', async () => {
					const id: string = subCategoryForTest2._id;
					const { statusCode, body } = await supertest(server).get(`/category/${id}`);
					const data: ICategory = {
						_id: id,
						name: 'subCategory2',
						parentId: null,
						createdAt: expect.any(String),
						updatedAt: expect.any(String),
					};

					expect(statusCode).toBe(200);
					expect(body).toEqual(data);
				});

				it('remove subCategoryForTest1. expect 200', async () => {
					const id: string = subCategoryForTest1._id;
					const { statusCode, body } = await supertest(server).delete(`/category/${id}`);

					expect(statusCode).toBe(200);
				});
				it('remove subCategoryForTest2. expect 200', async () => {
					const id: string = subCategoryForTest2._id;
					const { statusCode, body } = await supertest(server).delete(`/category/${id}`);

					expect(statusCode).toBe(200);
				});
			});
		});

		describe('negative: uncorrect id', () => {
			it('id = true. should return a 404 ', async () => {
				const id: string = 'fake id';
				const { statusCode, body } = await supertest(server).delete(`/category/${id}`);
				const data: IBackendError = {
					message: BackendMessage.UNCORRECT_ID,
				};

				expect(statusCode).toBe(400);
				expect(body).toEqual(data);
			});
		});
	});
});
