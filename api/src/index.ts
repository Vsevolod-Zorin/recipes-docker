import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { config } from 'src/config';
import { connectDb } from 'src/helpers/db';
import categoryRouter from 'src/routes/category.route';

export const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/category', categoryRouter);
app.use('/', (req: Request, res: Response) => {
  res.send('from api');
});

const startServer = () => {
  app.listen(config.app.httpPort, () => {
    console.log(`Started api service on port ${config.app.httpPort}`);
  });
};

connectDb().on('error', console.log).on('disconnected', connectDb).once('open', startServer);
