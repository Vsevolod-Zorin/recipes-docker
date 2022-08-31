import supertest from 'supertest';
import http from 'http';
import testsManager from 'src/helpers/tests-manager';
import { IRecipe, IRecipeCreate, IRecipeUpdate } from 'src/types/recipe/recipe.interface';
import { ICategory, ICategoryCreate } from 'src/types/category/category.interface';
import { BackendError } from 'src/shared/backend.error';
import { BackendMessage } from 'src/shared/backend.messages';
import { StatusCodes } from 'http-status-codes';

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
				console.log('tests category ', { testsCategory });

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
				const data: BackendError = {
					statusCode: 400,
					message: BackendMessage.BAD_REQUEST,
					error: {
						title: ['title must be a string', 'title should not be empty'],
						description: ['description must be a string', 'description should not be empty'],
						categoryId: [
							`categoryId ${BackendMessage.MUST_BE_A_MONGODB_ID}`,
							'categoryId must be a string',
							'categoryId should not be empty',
						],
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
				const data: BackendError = {
					statusCode: 400,
					message: BackendMessage.BAD_REQUEST,
					error: {
						title: ['title must be a string', 'title should not be empty'],
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
				const data: BackendError = {
					statusCode: 400,
					message: BackendMessage.BAD_REQUEST,
					error: {
						description: ['description must be a string', 'description should not be empty'],
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
				const data: BackendError = {
					statusCode: 400,
					message: BackendMessage.BAD_REQUEST,
					error: {
						categoryId: [
							`categoryId ${BackendMessage.MUST_BE_A_MONGODB_ID}`,
							'categoryId must be a string',
							'categoryId should not be empty',
						],
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
				const data: BackendError = {
					statusCode: 400,
					message: BackendMessage.BAD_REQUEST,
					error: {
						title: ['title must be a string'],
						description: ['description must be a string'],
						categoryId: [
							`categoryId ${BackendMessage.MUST_BE_A_MONGODB_ID}`,
							'categoryId must be a string',
						],
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
				console.log('--- testsRecipe._id', { id: testsRecipe._id });

				const { statusCode, body } = await supertest(server).get(`/recipe/${testsRecipe._id}`);
				const data: IRecipe = body;

				expect(statusCode).toBe(200);
				expect(body).toEqual(data);
			});
			it('not found. should return a 404 and message', async () => {
				const id: string = testsManager.generateRandomMongoId();
				const { statusCode, body } = await supertest(server).get(`/recipe/${id}`);

				expect(statusCode).toBe(404);
			});
		});

		describe('negative uncorrect params id', () => {
			it('should return a 400 and recipe', async () => {
				const id = 'fakeId';
				const { statusCode, body } = await supertest(server).get(`/recipe/${id}`);
				const data: BackendError = {
					statusCode: StatusCodes.BAD_REQUEST,
					message: BackendMessage.BAD_REQUEST,
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
				const { statusCode, body } = await supertest(server).put(`/recipe`).send(payload);
				const data: IRecipe = {
					_id: testsRecipe._id,
					title: 'updated recipe title',
					description: 'updated recipe description',
					categoryId: testsRecipe.categoryId,
				};

				expect(statusCode).toBe(200);
				expect(body).toEqual(data);
			});
		});

		describe('negative: valid params', () => {
			it('empty body. should return a 400 ', async () => {
				const payload = {};
				const { statusCode, body } = await supertest(server).put(`/recipe`).send(payload);

				const data: BackendError = {
					statusCode: 400,
					message: BackendMessage.BAD_REQUEST,
					error: {
						id: [
							`id ${BackendMessage.MUST_BE_A_MONGODB_ID}`,
							'id must be a string',
							'id should not be empty',
						],
						title: ['title must be a string', 'title should not be empty'],
						description: ['description must be a string', 'description should not be empty'],
						categoryId: [
							`categoryId ${BackendMessage.MUST_BE_A_MONGODB_ID}`,
							'categoryId must be a string',
							'categoryId should not be empty',
						],
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
				const { statusCode, body } = await supertest(server).put(`/recipe`).send(payload);
				const data: BackendError = {
					statusCode: 400,
					message: BackendMessage.BAD_REQUEST,
					error: {
						id: [
							`id ${BackendMessage.MUST_BE_A_MONGODB_ID}`,
							'id must be a string',
							'id should not be empty',
						],
					},
				};

				expect(statusCode).toBe(400);
				expect(body).toEqual(data);
			});
			it('body with uncorrect type id. id = true. should return a 404 ', async () => {
				const payload = {
					id: true,
					title: 'updated recipe title',
					description: 'updated recipe description',
					categoryId: testsCategory._id,
				};
				const { statusCode, body } = await supertest(server).put(`/recipe`).send(payload);
				const data: BackendError = {
					statusCode: 400,
					message: BackendMessage.BAD_REQUEST,
					error: {
						title: ['title must be a string'],
						description: ['description must be a string'],
						categoryId: [
							`categoryId ${BackendMessage.MUST_BE_A_MONGODB_ID}`,
							'categoryId must be a string',
						],
					},
				};

				expect(statusCode).toBe(400);
				expect(body).toEqual(data);
			});
			it('body with uncorrect id. id = fakeid. should return a 400 ', async () => {
				const payload = {
					id: testsManager.generateRandomMongoId(),
					title: 'updated recipe title',
					description: 'updated recipe description',
					categoryId: testsCategory._id,
				};
				const { statusCode, body } = await supertest(server).put(`/recipe`).send(payload);
				const data: BackendError = {
					statusCode: 400,
					message: BackendMessage.BAD_REQUEST,
					error: {
						categoryId: [`categoryId ${BackendMessage.MUST_BE_A_MONGODB_ID}`],
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
				const { statusCode, body } = await supertest(server).put(`/recipe`).send(payload);
				const data: BackendError = {
					statusCode: 400,
					message: BackendMessage.BAD_REQUEST,
					error: {
						title: ['title must be a string'],
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
				const { statusCode, body } = await supertest(server).put(`/recipe`).send(payload);
				const data: BackendError = {
					statusCode: 400,
					message: BackendMessage.BAD_REQUEST,
					error: {
						categoryId: [
							'categoryId must be a string',
							`categoryId ${BackendMessage.MUST_BE_A_MONGODB_ID}`,
						],
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

		describe('negative: uncorrect id', () => {
			it('not found. should return a 404 ', async () => {
				const id = testsRecipe._id;
				const { statusCode, body } = await supertest(server).delete(`/recipe/${id}`);
				const data: BackendError = {
					statusCode: 404,
					message: BackendMessage.NOT_FOUND,
				};
				expect(statusCode).toBe(404);
				expect(body).toEqual(data);
			});
			it('id = true. should return a 400 ', async () => {
				const id = testsRecipe._id;
				const { statusCode, body } = await supertest(server).delete(`/recipe/${id}`);

				const data: BackendError = {
					statusCode: 400,
					message: BackendMessage.BAD_REQUEST,
					error: {
						id: ['id must be a string', `id ${BackendMessage.MUST_BE_A_MONGODB_ID}`],
					},
				};
				expect(statusCode).toBe(404);
				expect(body).toEqual(data);
			});
		});
	});
});
