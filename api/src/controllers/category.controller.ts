import e, { Request, Response } from 'express';
import { CategoryService } from 'src/services/category.service';
import { CreateCategoryDto } from 'src/types/category/create-category.dto';

export class CategoryController {
  constructor(readonly categoryService: CategoryService) {}

  find = async (req: Request, res: Response) => {
    try {
      const categories = await this.categoryService.find();
      res.json({ categories: categories });
    } catch (e) {
      res.json({
        message: e.message,
      });
    }
  };

  // async getById(req: Request, res: Response) {
  //   res.send('getById');
  // }

  create = async (req: Request, res: Response) => {
    try {
      const createdCategory = await this.categoryService.create(req.body);
      res.json({ createdCategory });
    } catch (e) {
      res.json({
        message: e.message,
      });
    }
  };

  // async update(req: Request, res: Response) {
  //   res.send('update');
  // }

  // async delete(req: Request, res: Response) {
  //   res.send('delete');
  // }
}
