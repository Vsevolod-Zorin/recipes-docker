import { Request, Response } from 'express';
import { categoryService } from 'src/services/category.service';
import { validateCategoryById } from 'src/shared/validation/category/get-by-id.validarion';

class CategoryController {
  async find(req: Request, res: Response) {
    try {
      // todo query
      const categories = await categoryService.find();
      res.json({ categories });
    } catch (e) {
      res.status(e.statusCode).json({
        ...e,
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = req.params.id;

      const category = await categoryService.find({ _id: id });
      res.json({ category });
    } catch (e) {
      res.status(e.statusCode).json({
        ...e,
      });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const createdCategory = await categoryService.create(req.body);
      res.json({ createdCategory });
    } catch (e) {
      res.status(e.statusCode).json({
        ...e,
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const category = await validateCategoryById(req.body.id);
      const updatedCategory = await categoryService.update(category, req.body);
    } catch (e) {
      res.status(e.statusCode).json({
        ...e,
      });
    }
  }

  // async delete(req: Request, res: Response) {
  //   res.send('delete');
  // }
}

export const categoryController = new CategoryController();
