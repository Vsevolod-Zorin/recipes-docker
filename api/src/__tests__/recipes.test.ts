import supertest from 'supertest';
import http from 'http';
import testsManager from 'src/utils/tests-manager';
import { IRecipe, IRecipeCreate, IRecipeUpdate } from 'src/types/recipe/recipe.interface';
import { ICategory, ICategoryCreate } from 'src/types/category/category.interface';
import { BackendMessage } from 'src/shared/backend.messages';
import { IBackendError } from 'src/types/backend/error-template.interface';

describe('Recipe', () => {
	let server: http.Server = testsManager.httpServer;
	let testsRecipe: IRecipe;
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

	describe('--- Create. post( /recipe ) ', () => {
		describe('positive: valid params', () => {
			it('should return a 201 and recipe', async () => {
				const payload: IRecipeCreate = {
					title: 'test recipe',
					description: 'test description',
					categoryId: testsCategory._id.toString(),
				};
				const { statusCode, body } = await supertest(server).post(`/recipe`).send(payload);
				const data: IRecipe = {
					_id: expect.any(String),
					title: payload.title,
					description: payload.description,
					categoryId: testsCategory._id.toString(),
					createdAt: expect.any(String),
					updatedAt: expect.any(String),
				};

				expect(statusCode).toBe(201);
				expect(body).toEqual(data);
				testsRecipe = body;
			});
		});

		describe('negative: uncorrect params', () => {
			it('empty body. should return a 400 ', async () => {
				const payload = {};
				const { statusCode, body } = await supertest(server).post(`/recipe`).send(payload);
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
						categoryId: [`categoryId ${BackendMessage.validation.MUST_BE_A_MONGODB_ID}`],
					},
				};

				expect(statusCode).toBe(400);
				expect(body).toEqual(data);
			});
			it('body without title. should return a 400 ', async () => {
				const payload = {
					description: 'tests description',
					categoryId: testsCategory._id,
				};
				const { statusCode, body } = await supertest(server).post(`/recipe`).send(payload);
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
					categoryId: testsCategory._id,
				};
				const { statusCode, body } = await supertest(server).post(`/recipe`).send(payload);
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
			it('body without categoryId. should return a 400 ', async () => {
				const payload = {
					title: 'tests title',
					description: 'test description',
				};
				const { statusCode, body } = await supertest(server).post(`/recipe`).send(payload);
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
					categoryId: true,
				};
				const { statusCode, body } = await supertest(server).post(`/recipe`).send(payload);
				const data: IBackendError = {
					message: BackendMessage.BAD_REQUEST,
					code: 400,
					error: {
						title: [`title ${BackendMessage.validation.MUST_BE_A_STRING}`],
						description: [`description ${BackendMessage.validation.MUST_BE_A_STRING}`],
						categoryId: [`categoryId ${BackendMessage.validation.MUST_BE_A_MONGODB_ID}`],
					},
				};

				expect(statusCode).toBe(400);
				expect(body).toEqual(data);
			});
		});
	});

	describe('--- GetRecipes. get( /recipe ) ', () => {
		describe('positive', () => {
			it('should return a 200 and recipes', async () => {
				const { statusCode, body } = await supertest(server).get(`/recipe`);
				const data: IRecipe = body;

				expect(statusCode).toBe(200);
				expect(body).toEqual(data);
			});
		});
	});

	describe('--- GetRecipes. get( /recipe/:id ): ', () => {
		describe('positive. correct params id', () => {
			it('should return a 200 and recipe', async () => {
				const { statusCode, body } = await supertest(server).get(`/recipe/${testsRecipe._id}`);
				const data: IRecipe = body;

				expect(statusCode).toBe(200);
				expect(body).toEqual(data);
			});
			it('not found. should return a 404 and message', async () => {
				const id: string = testsManager.generateRandomMongoId();
				const { statusCode, body } = await supertest(server).get(`/recipe/${id}`);
				const data: IBackendError = {
					code: 404,
					message: BackendMessage.NOT_FOUND,
				};

				expect(statusCode).toBe(404);
				expect(body).toEqual(data);
			});
		});

		describe('negative uncorrect params id', () => {
			it('should return a 400 and recipe', async () => {
				const id = 'fakeIdsf';
				const { statusCode, body } = await supertest(server).get(`/recipe/${id}`);
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

	describe('--- Update. put( /recipe )', () => {
		describe('positive: valid params', () => {
			it('should return a 200 and updated recipe', async () => {
				const payload: IRecipeUpdate = {
					id: testsRecipe._id,
					title: 'updated recipe title',
					description: 'updated recipe description',
					categoryId: testsRecipe.categoryId,
				};
				const { statusCode, body } = await supertest(server).put(`/recipe/${testsRecipe._id}`).send(payload);
				const data: IRecipe = {
					_id: testsRecipe._id,
					title: 'updated recipe title',
					description: 'updated recipe description',
					categoryId: testsRecipe.categoryId,
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
				const { statusCode, body } = await supertest(server)
					.put(`/recipe/${testsRecipe._id}`)
					.send(payload);
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
					title: 'updated recipe title',
					description: 'updated recipe description',
					categoryId: testsRecipe.categoryId,
				};
				const { statusCode, body } = await supertest(server)
					.put(`/recipe/${testsRecipe._id}`)
					.send(payload);
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
					title: 'updated recipe title',
					description: 'updated recipe description',
					categoryId: testsCategory._id,
				};
				const { statusCode, body } = await supertest(server)
					.put(`/recipe/${testsRecipe._id}`)
					.send(payload);
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
					title: 'updated recipe title',
					description: 'updated recipe description',
					categoryId: testsCategory._id.toString(),
				};
				const { statusCode, body } = await supertest(server)
					.put(`/recipe/${testsRecipe._id}`)
					.send(payload);
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
					id: testsRecipe._id,
					title: true,
					description: 'tests description',
					categoryId: testsCategory._id,
				};
				const { statusCode, body } = await supertest(server)
					.put(`/recipe/${testsRecipe._id}`)
					.send(payload);
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
					id: testsRecipe._id,
					title: 'updated recipe title',
					description: 'updated description',
					categoryId: false,
				};
				const { statusCode, body } = await supertest(server)
					.put(`/recipe/${testsRecipe._id}`)
					.send(payload);
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

	describe('--- Delete. delete( /recipe/:id )', () => {
		describe('positive: valid id', () => {
			it('should return a 200', async () => {
				const id = testsRecipe._id;
				const { statusCode, body } = await supertest(server).delete(`/recipe/${id}`);

				expect(statusCode).toBe(200);
			});
		});

		describe('negative: uncorrect entity id', () => {
			it('not found. should return a 404 ', async () => {
				const id = testsRecipe._id;
				const { statusCode, body } = await supertest(server).delete(`/recipe/${id}`);
				const data: IBackendError = {
					code: 404,
					message: BackendMessage.NOT_FOUND,
				};

				expect(statusCode).toBe(404);
				expect(body).toEqual(data);
			});
			it('id = true. should return a 400 ', async () => {
				const id = true;
				const { statusCode, body } = await supertest(server).delete(`/recipe/${id}`);
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
