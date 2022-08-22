import { categoryController } from '../controllers/category.controller';
import * as express from 'express';
import { validator } from 'src/middlewares/validator.middleware';
import { CreateCategoryDto } from 'src/types/category/create-category.dto';

const categoryRouter = express.Router();

// todo error

categoryRouter
  .get('/', categoryController.find)
  .get('/:id', categoryController.getById)
  .post('/', validator(new CreateCategoryDto()), categoryController.create);
// .put('/', categoryController.update)
// .delete('/:id', categoryController.delete);

export default categoryRouter;
