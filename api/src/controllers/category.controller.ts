import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { categoryService } from 'src/services/category.service';
import { validateCategoryById } from 'src/shared/validation/category/get-by-id.validarion';
import { IIdRequest } from 'src/types/express/id-request.interface';

// todo: make category request interface
class CategoryController {
  async find(req: Request, res: Response) {
    // todo: check query interface
    const categories = await categoryService.find();
    res.status(StatusCodes.OK).json(categories);
  }

  async getById(req: Request, res: Response) {
    const { id } = req.query as IIdRequest;

    const category = await validateCategoryById(id);
    res.status(StatusCodes.OK).json(category);
  }

  async create(req: Request, res: Response) {
    const createdCategory = await categoryService.create(req.body);
    res.status(StatusCodes.CREATED).json(createdCategory);
  }

  // todo:  refs!
  async update(req: Request, res: Response) {
    const category = await validateCategoryById(req.body.id);
    await categoryService.update(category, req.body);
    // todo: check response data type
    res.status(StatusCodes.OK).json({ updated: 'ok' });
  }

  // todo: change child refs
  async delete(req: Request, res: Response) {
    const id = req.params.id;
    await validateCategoryById(id);
    await categoryService.delete(id);
    res.status(StatusCodes.OK).json({ deleted: 'ok' });
  }
}

export const categoryController = new CategoryController();
