import express from 'express';import cors from 'cors';
import bodyParser from 'body-parser';
import { config } from './config';
import { connectDb } from './helpers/db';
import routes from './routes';

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(routes);

const startServer = () => {
  app.listen(config.app.httpPort, () => {
    console.log(`Started api service on port ${config.app.httpPort}`);
  });
};

connectDb().on('error', console.log).on('disconnected', connectDb).once('open', startServer);

export default app;
