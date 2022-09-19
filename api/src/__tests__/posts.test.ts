import supertest from 'supertest';
import http from 'http';
import testsManager from 'src/helpers/tests-manager';
import { IPost, IPostCreate, IPostUpdate } from 'src/types/post/post.interface';
import { ICategory, ICategoryCreate } from 'src/types/category/category.interface';
import { BackendMessage } from 'src/shared/backend.messages';
import { IBackendError } from 'src/types/backend/error-template.interface';

describe('Post', () => {
	let server: http.Server = testsManager.httpServer;
	let testsPost: IPost;
	let testsCategoryPayload: ICategoryCreate = {
		name: 'testsCategory',
		parentId: null,
	};
	let testsCategory: ICategory;

	beforeAll(() => {
		testsManager.startServerForTests();
	});

	afterAll(() => {
		testsManager.closeServerForTests();
	});

	describe('--- init category ', () => {
		it('init', async () => {
			testsCategory = await testsManager.createCategory(testsCategoryPayload);
			expect(testsCategory.name).toBe('testsCategory');
		});
	});

	describe('--- Create. post( /post ) ', () => {
		describe('positive: valid params', () => {
			it('should return a 201 and post', async () => {
				const payload: IPostCreate = {
					title: 'test post',
					description: 'test description',
					body: 'test body',
					categoryId: testsCategory._id.toString(),
				};
				const { statusCode, body } = await supertest(server).post(`/post`).send(payload);
				const data: IPost = {
					_id: expect.any(String),
					title: payload.title,
					description: payload.description,
					body: 'test body',
					categoryId: testsCategory._id.toString(),
					createdAt: expect.any(String),
					updatedAt: expect.any(String),
				};

				expect(statusCode).toBe(201);
				expect(body).toEqual(data);
				testsPost = body;
			});
		});

		describe('negative: uncorrect params', () => {
			it('empty body. should return a 400 ', async () => {
				const payload = {};
				const { statusCode, body } = await supertest(server).post(`/post`).send(payload);
				const data: IBackendError = {
					code: 400,
					message: BackendMessage.BAD_REQUEST,
					error: {
						title: [
							`title ${BackendMessage.validation.SHOULD_NOT_BE_EMPTY}`,
							`title ${BackendMessage.validation.MUST_BE_A_STRING}`,
						],
						description: [
							`description ${BackendMessage.validation.SHOULD_NOT_BE_EMPTY}`,
							`description ${BackendMessage.validation.MUST_BE_A_STRING}`,
						],
						body: [
							`body ${BackendMessage.validation.SHOULD_NOT_BE_EMPTY}`,
							`body ${BackendMessage.validation.MUST_BE_A_STRING}`,
						],
						categoryId: [`categoryId ${BackendMessage.validation.MUST_BE_A_MONGODB_ID}`],
					},
				};

				expect(statusCode).toBe(400);
				expect(body).toEqual(data);
			});
			it('body without title. should return a 400 ', async () => {
				const payload = {
					description: 'tests description',
					body: 'test',
					categoryId: testsCategory._id,
				};
				const { statusCode, body } = await supertest(server).post(`/post`).send(payload);
				const data: IBackendError = {
					code: 400,
					message: BackendMessage.BAD_REQUEST,
					error: {
						title: [
							`title ${BackendMessage.validation.SHOULD_NOT_BE_EMPTY}`,
							`title ${BackendMessage.validation.MUST_BE_A_STRING}`,
						],
					},
				};

				expect(statusCode).toBe(400);
				expect(body).toEqual(data);
			});
			it('body without desctiption. should return a 400 ', async () => {
				const payload = {
					title: 'tests title',
					body: 'test',
					categoryId: testsCategory._id,
				};
				const { statusCode, body } = await supertest(server).post(`/post`).send(payload);
				const data: IBackendError = {
					code: 400,
					message: BackendMessage.BAD_REQUEST,
					error: {
						description: [
							`description ${BackendMessage.validation.SHOULD_NOT_BE_EMPTY}`,
							`description ${BackendMessage.validation.MUST_BE_A_STRING}`,
						],
					},
				};

				expect(statusCode).toBe(400);
				expect(body).toEqual(data);
			});
			it('body without body. should return a 400 ', async () => {
				const payload = {
					title: 'tests title',
					description: 'tests description',
					categoryId: testsCategory._id,
				};
				const { statusCode, body } = await supertest(server).post(`/post`).send(payload);
				const data: IBackendError = {
					code: 400,
					message: BackendMessage.BAD_REQUEST,
					error: {
						body: [
							`body ${BackendMessage.validation.SHOULD_NOT_BE_EMPTY}`,
							`body ${BackendMessage.validation.MUST_BE_A_STRING}`,
						],
					},
				};

				expect(statusCode).toBe(400);
				expect(body).toEqual(data);
			});
			it('body without categoryId. should return a 400 ', async () => {
				const payload = {
					title: 'tests title',
					body: 'test',
					description: 'test description',
				};
				const { statusCode, body } = await supertest(server).post(`/post`).send(payload);
				const data: IBackendError = {
					code: 400,
					message: BackendMessage.BAD_REQUEST,
					error: {
						categoryId: [`categoryId ${BackendMessage.validation.MUST_BE_A_MONGODB_ID}`],
					},
				};

				expect(statusCode).toBe(400);
				expect(body).toEqual(data);
			});
			it('body with uncorrect params. should return a 400 ', async () => {
				const payload = {
					title: true,
					description: true,
					body: true,
					categoryId: true,
				};
				const { statusCode, body } = await supertest(server).post(`/post`).send(payload);
				const data: IBackendError = {
					message: BackendMessage.BAD_REQUEST,
					code: 400,
					error: {
						title: [`title ${BackendMessage.validation.MUST_BE_A_STRING}`],
						description: [`description ${BackendMessage.validation.MUST_BE_A_STRING}`],
						body: [`body ${BackendMessage.validation.MUST_BE_A_STRING}`],
						categoryId: [`categoryId ${BackendMessage.validation.MUST_BE_A_MONGODB_ID}`],
					},
				};

				expect(statusCode).toBe(400);
				expect(body).toEqual(data);
			});
		});
	});

	describe('--- GetPosts. get( /post ) ', () => {
		describe('positive', () => {
			it('should return a 200 and posts', async () => {
				const { statusCode, body } = await supertest(server).get(`/post`);
				const data: IPost = body;

				expect(statusCode).toBe(200);
				expect(body).toEqual(data);
			});
		});
	});

	describe('--- GetPosts. get( /post/:id ): ', () => {
		describe('positive. correct params id', () => {
			it('should return a 200 and post', async () => {
				const { statusCode, body } = await supertest(server).get(`/post/${testsPost._id}`);
				const data: IPost = body;

				expect(statusCode).toBe(200);
				expect(body).toEqual(data);
			});
			it('not found. should return a 404 and message', async () => {
				const id: string = testsManager.generateRandomMongoId();
				const { statusCode, body } = await supertest(server).get(`/post/${id}`);
				const data: IBackendError = {
					code: 404,
					message: BackendMessage.NOT_FOUND,
				};

				expect(statusCode).toBe(404);
				expect(body).toEqual(data);
			});
		});

		describe('negative uncorrect params id', () => {
			it('should return a 400 and post', async () => {
				const id = 'fakeIdsf';
				const { statusCode, body } = await supertest(server).get(`/post/${id}`);
				const data: IBackendError = {
					code: 400,
					message: BackendMessage.BAD_REQUEST,
					error: { id: [`id ${BackendMessage.validation.MUST_BE_A_MONGODB_ID}`] },
				};

				expect(statusCode).toBe(400);
				expect(body).toEqual(data);
			});
		});
	});

	describe('--- Update. put( /post )', () => {
		describe('positive: valid params', () => {
			it('should return a 200 and updated post', async () => {
				const payload: IPostUpdate = {
					id: testsPost._id,
					title: 'updated post title',
					description: 'updated post description',
					body: 'test body',
					categoryId: testsPost.categoryId,
				};
				const { statusCode, body } = await supertest(server).put(`/post`).send(payload);
				const data: IPost = {
					_id: testsPost._id,
					title: 'updated post title',
					description: 'updated post description',
					body: 'test body',
					categoryId: testsPost.categoryId,
					createdAt: expect.any(String),
					updatedAt: expect.any(String),
				};

				expect(statusCode).toBe(200);
				expect(body).toEqual(data);
			});
		});

		describe('negative: valid params', () => {
			it('empty body. should return a 400 ', async () => {
				const payload = {};
				const { statusCode, body } = await supertest(server).put(`/post`).send(payload);
				const data: IBackendError = {
					code: 400,
					message: 'Bad Request',
					error: {
						id: [`id ${BackendMessage.validation.MUST_BE_A_MONGODB_ID}`],
					},
				};

				expect(statusCode).toBe(400);
				expect(body).toEqual(data);
			});
			it('body without id. should return a 400 ', async () => {
				const payload = {
					title: 'updated post title',
					body: 'test body',
					description: 'updated post description',
					categoryId: testsPost.categoryId,
				};
				const { statusCode, body } = await supertest(server).put(`/post`).send(payload);
				const data: IBackendError = {
					message: BackendMessage.BAD_REQUEST,
					code: 400,
					error: {
						id: [`id ${BackendMessage.validation.MUST_BE_A_MONGODB_ID}`],
					},
				};

				expect(statusCode).toBe(400);
				expect(body).toEqual(data);
			});
			it('body with uncorrect type id. id = true. should return a 400 ', async () => {
				const payload = {
					id: true,
					title: 'updated post title',
					description: 'updated post description',
					body: 'test body',
					categoryId: testsCategory._id,
				};
				const { statusCode, body } = await supertest(server).put(`/post`).send(payload);
				const data: IBackendError = {
					code: 400,
					message: 'Bad Request',
					error: {
						id: [`id ${BackendMessage.validation.MUST_BE_A_MONGODB_ID}`],
					},
				};

				expect(statusCode).toBe(400);
				expect(body).toEqual(data);
			});
			it('body with uncorrect id. id = fakeid. should return a 400 ', async () => {
				const id = 'fakeid';
				const payload = {
					id,
					title: 'updated post title',
					description: 'updated post description',
					body: 'test body',
					categoryId: testsCategory._id.toString(),
				};
				const { statusCode, body } = await supertest(server).put(`/post`).send(payload);
				const data: IBackendError = {
					code: 400,
					message: BackendMessage.BAD_REQUEST,
					error: {
						id: [`id ${BackendMessage.validation.MUST_BE_A_MONGODB_ID}`],
					},
				};

				expect(statusCode).toBe(400);
				expect(body).toEqual(data);
			});
			it('body with uncorrect title. title = true. should return a 400 ', async () => {
				const payload = {
					id: testsPost._id,
					title: true,
					description: 'tests description',
					body: 'test body',
					categoryId: testsCategory._id,
				};
				const { statusCode, body } = await supertest(server).put(`/post`).send(payload);
				const data: IBackendError = {
					code: 400,
					message: BackendMessage.BAD_REQUEST,
					error: {
						title: [`title ${BackendMessage.validation.MUST_BE_A_STRING}`],
					},
				};

				expect(statusCode).toBe(400);
				expect(body).toEqual(data);
			});
			it('body with uncorrect categoryId. categoryId = false. should return a 400 ', async () => {
				const payload = {
					id: testsPost._id,
					title: 'updated post title',
					description: 'updated description',
					body: 'test body',
					categoryId: false,
				};
				const { statusCode, body } = await supertest(server).put(`/post`).send(payload);
				const data: IBackendError = {
					code: 400,
					message: BackendMessage.BAD_REQUEST,
					error: {
						categoryId: [`categoryId ${BackendMessage.validation.MUST_BE_A_MONGODB_ID}`],
					},
				};

				expect(statusCode).toBe(400);
				expect(body).toEqual(data);
			});
		});
	});

	describe('--- Delete. delete( /post/:id )', () => {
		describe('positive: valid id', () => {
			it('should return a 200', async () => {
				const id = testsPost._id;
				const { statusCode, body } = await supertest(server).delete(`/post/${id}`);

				expect(statusCode).toBe(200);
			});
		});

		describe('negative: uncorrect entity id', () => {
			it('not found. should return a 404 ', async () => {
				const id = testsPost._id;
				const { statusCode, body } = await supertest(server).delete(`/post/${id}`);
				const data: IBackendError = {
					code: 404,
					message: BackendMessage.NOT_FOUND,
				};

				expect(statusCode).toBe(404);
				expect(body).toEqual(data);
			});
			it('id = true. should return a 400 ', async () => {
				const id = true;
				const { statusCode, body } = await supertest(server).delete(`/post/${id}`);
				// todo: interface
				const data: IBackendError = {
					code: 400,
					message: BackendMessage.BAD_REQUEST,
					error: {
						id: ['id must be a mongodb id'],
					},
				};

				expect(statusCode).toBe(400);
				expect(body).toEqual(data);
			});
		});
	});
});
