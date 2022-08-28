import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { categoryService } from 'src/services/category.service';
import { validateCategoryById } from 'src/shared/validation/category/get-by-id.validarion';
import { validateMongoId } from 'src/shared/validation/is-valid-object-id';
import { ICategory } from 'src/types/category/category.interface';
import { IIdRequest } from 'src/types/express/id-request.interface';

// todo: make category request interface
class CategoryController {
  async find(req: Request, res: Response) {
    // todo: check query interface
    const categories = await categoryService.find();
    res.status(StatusCodes.OK).json(categories);
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params as IIdRequest;
    const virifiedId = validateMongoId(id);
    const category = await validateCategoryById(virifiedId);
    res.status(StatusCodes.OK).json(category);
  }

  async create(req: Request, res: Response) {
    const createdCategory = await categoryService.create(req.body);
    res.status(StatusCodes.CREATED).json(createdCategory);
  }

  // todo: child refs!
  async update(req: Request, res: Response) {
    const virifiedId = validateMongoId(req.body.id);
    const category = await validateCategoryById(virifiedId);
    const updatedCategory = await categoryService.update(category, req.body);
    res.status(StatusCodes.OK).json(updatedCategory);
  }

  // todo: change child refs
  async delete(req: Request, res: Response) {
    const id = req.params.id;
    const virifiedId = validateMongoId(id);
    const category: ICategory = await validateCategoryById(virifiedId);
    await categoryService.delete(id, category);

    res.status(StatusCodes.OK).send();
  }
}

export const categoryController = new CategoryController();
