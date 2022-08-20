import express, { Request, Response } from 'express';import cors from 'cors';
import bodyParser from 'body-parser';
import { config } from './config';
import { connectDb } from './helpers/db';

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/', (req: Request, res: Response) => {
  res.send('from api');
});

app.use('/category', (req: Request, res: Response) => {
  res.send('category from api');
});

const startServer = () => {
  app.listen(config.app.httpPort, () => {
    console.log(`Started api service on port ${config.app.httpPort}`);
  });
};

connectDb().on('error', console.log).on('disconnected', connectDb).once('open', startServer);
