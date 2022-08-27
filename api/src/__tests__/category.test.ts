import supertest from 'supertest';
import http from 'http';
import { ICategory, ICategoryCreate, ICategoryUpdate } from 'src/types/category/category.interface';
import testsManager from 'src/helpers/tests-manager';
import { BackendError } from 'src/shared/backend.error';

describe('category', () => {
  let server: http.Server = testsManager.httpServer;
  let categoryForTest: ICategory;

  beforeAll(() => {
    testsManager.startServerForTests();
  });

  afterAll(() => {
    // remove in testsManager
    testsManager.closeServerForTests();
  });
  // todo let category

  describe('Create. post( /category ) ', () => {
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
        console.log('create success body', { body });
        expect(statusCode).toBe(201);
        expect(body).toEqual(data);

        categoryForTest = body;
      });
      // it('create child', async () => {
      //   const payload: ICategoryCreate = {
      //     name: 'tests category',
      //     parentId: testsManager.category._id.toString(),
      //   };
      // });
    });
    describe('negative: uncorrect params', () => {
      it('empty body. should return a 400 ', async () => {
        const payload = {};
        const { statusCode, body } = await supertest(server).post(`/category`).send(payload);

        const data: BackendError = {
          statusCode: 400,
          message: 'Bad Request',
          error: {
            name: ['name must be a string', 'name should not be empty'],
            parentId: ['parentId must be a string'],
          },
        };
        console.log('--- body ', { body });

        expect(statusCode).toBe(400);
        expect(body).toEqual(data);
      });

      // it('body without name. should return a 400 ', async () => {
      //   const payload = { parentId: null };
      //   const { statusCode, body } = await supertest(server).post(`/category`).send(payload);

      //   const data: BackendError = {
      //     statusCode: 400,
      //     message: 'Bad Request',
      //     error: {
      //       name: ['name must be a string', 'name should not be empty'],
      //     },
      //   };
      //   expect(statusCode).toBe(400);
      //   expect(body).toEqual(data);
      // });

      // it('body without parrentId. should return a 400 ', async () => {
      //   const payload = { name: 'test' };
      //   const { statusCode, body } = await supertest(server).post(`/category`).send(payload);

      //   const data: BackendError = {
      //     statusCode: 400,
      //     message: 'Bad Request',
      //     error: {
      //       parentId: ['parentId must be a string'],
      //     },
      //   };
      //   expect(statusCode).toBe(400);
      //   expect(body).toEqual(data);
      // });
      // it('body with uncorrect name. name = true. should return a 400 ', async () => {
      //   const payload = { name: true, parrentId: null };
      //   const { statusCode, body } = await supertest(server).post(`/category`).send(payload);

      //   const data: BackendError = {
      //     statusCode: 400,
      //     message: 'Bad Request',
      //     error: {
      //       name: ['name must be a string'],
      //     },
      //   };

      //   expect(statusCode).toBe(400);
      //   expect(body).toEqual(data);
      // });
      // it('body with uncorrect parentId. parentId = false. should return a 400 ', async () => {
      //   const payload = { name: 'test', parentId: false };
      //   const { statusCode, body } = await supertest(server).post(`/category`).send(payload);
      //   const data: BackendError = {
      //     statusCode: 400,
      //     message: 'Bad Request',
      //     error: {
      //       parentId: ['parentId must be a string'],
      //     },
      //   };
      //   expect(statusCode).toBe(400);
      //   expect(body).toEqual(data);
      // });
    });
  });

  describe('GetCategories. get( /category ): ', () => {
    describe('positive', () => {
      it('should return a 200 and arr', async () => {
        const { statusCode, body } = await supertest(server).get(`/category`);
        expect(statusCode).toBe(200);
        const data: ICategory[] = body;
        expect(body).toEqual(data);
      });
    });
  });

  describe('GetById. get( /category/:id ) ', () => {
    describe('positive. correct params id', () => {
      it('should return a 200 and category', async () => {
        const id: string = categoryForTest._id;
        const { statusCode, body } = await supertest(server).get(`/category/${id}`);
        expect(statusCode).toBe(200);
        const data: ICategory[] = body;
        expect(body).toEqual(data);
      });
    });

    describe('negative: uncorrect params id', () => {
      it('should return a 404 ', async () => {
        const fakeId = 'qwe';
        const { statusCode, body } = await supertest(server).get(`/category/${fakeId}`);
        expect(statusCode).toBe(404);
      });
    });
  });

  describe('Update. put( /category ) ', () => {
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
    // describe('negative: uncorrect params', () => {
    //   it('empty body. should return a 400 ', async () => {});
    //   it('body without id. should return a 400 ', async () => {});
    //   it('body with uncorrect id. id = true. should return a 404 ', async () => {});
    //   it('body with uncorrect name. name = true. should return a 400 ', async () => {});
    //   it('body with uncorrect parrentId. parrentId = false. should return a 400 ', async () => {});
    // });
  });

  describe('Delete. delete( /category/:id ) ', () => {
    describe('positive: valid id', () => {
      it('should return a 200', async () => {
        const id: string = categoryForTest._id;
        // todo: move refs
        const { statusCode, body } = await supertest(server).delete(`/category/${id}`);

        expect(statusCode).toBe(200);
      });
    });
    describe('negative: uncorrect id', () => {
      it('id = true. should return a 404 ', async () => {
        const id: string = categoryForTest._id;
        const { statusCode, body } = await supertest(server).delete(`/category/${id}`);
        expect(statusCode).toBe(404);
      });
    });
  });
});
