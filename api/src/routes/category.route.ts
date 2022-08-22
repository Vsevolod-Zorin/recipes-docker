import { CategoryController } from '../controllers/category.controller';
import * as express from 'express';
import { CategoryService } from 'src/services/category.service';
import { CategoryModel } from 'src/models/category.model';
import { validator } from 'src/middlewares/validator.middleware';
import { CreateCategoryDto } from 'src/types/category/create-category.dto';

const categoryRouter = express.Router();
const categoryModel = new CategoryModel();
const categoryService = new CategoryService(categoryModel);
const categoryController = new CategoryController(categoryService);

categoryRouter
  .get('/', categoryController.find)
  // .get('/:id', categoryController.getById)
  .post('/', validator(new CreateCategoryDto()), categoryController.create);
// .put('/', categoryController.update)
// .delete('/:id', categoryController.delete);

export default categoryRouter;
