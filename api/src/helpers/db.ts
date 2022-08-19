import { config } from '../config';
import mongoose, { ConnectOptions } from 'mongoose';

export const connectDb = () => {
  mongoose.connect(config.db.mongoUrl, {
    useNewUrlParser: true,
  } as ConnectOptions);

  return mongoose.connection;
};
