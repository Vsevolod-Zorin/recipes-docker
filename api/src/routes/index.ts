import * as express from 'express';
import categoryRouter from './category.route';

const routes = express.Router();

routes.use('/category', categoryRouter);
routes.use('/', (req: express.Request, res: express.Response) => {
  res.status(200).json({ msg: 'from api' });
});

export default routes;
