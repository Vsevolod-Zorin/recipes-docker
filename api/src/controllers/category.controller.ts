import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { categoryService } from 'src/services/category.service';
import { validateCategoryById } from 'src/shared/validation/category/get-by-id.validarion';
import { validateMongoId } from 'src/shared/validation/is-valid-object-id';
import { ExpressRequest } from 'src/types/express/expressRequest.interface';
import { ICategory } from 'src/types/category/category.interface';

// todo: make category request interface
class CategoryController {
  async find(req: Request, res: Response) {
    // todo: check query interface
    const categories = await categoryService.find();
    res.status(StatusCodes.OK).json(categories);
  }

  async getById(req: ExpressRequest, res: Response) {
    const { id } = req;
    const virifiedId = validateMongoId(id);
    const category = await validateCategoryById(virifiedId);
    res.status(StatusCodes.OK).json(category);
  }

  async create(req: Request, res: Response) {
    const createdCategory = await categoryService.create(req.body);
    res.status(StatusCodes.CREATED).json(createdCategory);
  }

  async update(req: ExpressRequest, res: Response) {
    const { id } = req;
    await validateCategoryById(id);
    const updatedCategory = await categoryService.update(id, req.body);
    res.status(StatusCodes.OK).json(updatedCategory);
  }

  async delete(req: ExpressRequest, res: Response) {
    const { id } = req;
    const virifiedId = validateMongoId(id);
    const category: ICategory = await validateCategoryById(virifiedId);

    await categoryService.moveChildsCategoryUp(category);
    await categoryService.delete(id);

    res.status(StatusCodes.OK).send();
  }
}

export const categoryController = new CategoryController();
