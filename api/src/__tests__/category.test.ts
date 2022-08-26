import supertest from 'supertest';
import http from 'http';
import appManager from 'src/helpers/app-manager';
import { ICategory } from 'src/types/category/category.interface';

describe('category', () => {
  let server: http.Server = appManager.httpServer;
  beforeAll(() => {
    appManager.startServerForTests();
  });

  afterAll(() => {
    appManager.closeServerForTests();
  });

  describe('GetCategories. get( /category ): ', () => {
    describe('/category', () => {
      it('should return a 200 and arr', async () => {
        // todo
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
        const { statusCode, body } = await supertest(server).get(`/category`);
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

  // describe('Create. post( /category ) ', () => {
  //   describe('positive: valid params', () => {
  //     it('should return a 200 and category', async () => {
  //       const { statusCode, body } = await supertest(server).post(`/category`);
  //       const data: ICategory = body;
  //       expect(statusCode).toBe(200);
  //       expect(body).toEqual(data);
  //     });
  //   });
  //   describe('negative: empty body params', () => {
  //     it('empty body. should return a 400 ', async () => {});
  //   });
  //   describe('negative: body without name', () => {
  //     it('should return a 400 ', async () => {});
  //   });
  //   describe('negative: body with uncorrect name', () => {
  //     it('name = true. should return a 400 ', async () => {});
  //   });
  //   describe('negative: body without parrentId', () => {
  //     it('empty body. should return a 400 ', async () => {});
  //   });
  //   describe('negative: body with uncorrect parrentId', () => {
  //     it('parrentId = false. should return a 400 ', async () => {});
  //   });
  // });

  // describe('Update. put( /category ) ', () => {
  //   describe('positive: valid params', () => {
  //     it('should return a 200 and updated category', async () => {});
  //   });
  //   describe('negative: empty body params', () => {
  //     it('empty body. should return a 400 ', async () => {});
  //   });
  //   describe('negative: body without id', () => {
  //     it('should return a 400 ', async () => {});
  //   });
  //   describe('negative: body with uncorrect id', () => {
  //     it('id = true. should return a 404 ', async () => {});
  //   });
  //   describe('negative: body with uncorrect name', () => {
  //     it('name = true. should return a 400 ', async () => {});
  //   });
  //   describe('negative: body with uncorrect parrentId', () => {
  //     it('parrentId = false. should return a 400 ', async () => {});
  //   });
  // });

  // describe('Delete. delete( /category/:id ) ', () => {
  //   describe('negative: uncorrect id', () => {
  //     it('id = true. should return a 404 ', async () => {});
  //   });
  //   describe('positive: valid id', () => {
  //     it('should return a 200', async () => {});
  //   });
  // });
});
