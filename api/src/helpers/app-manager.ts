import { Express } from 'express';
import mongoose from 'mongoose';
import { connectDb } from './db';
import { createServer } from './create-server';

class AppManager {
  private _app: Express;
  private _connection: mongoose.Connection;

  constructor() {
    this.app = createServer();
  }

  public get app(): Express {
    return this._app;
  }
  private set app(value: Express) {
    this._app = value;
  }

  public get connection(): mongoose.Connection {
    return this._connection;
  }
  private set connection(value: mongoose.Connection) {
    this._connection = value;
  }

  async connectToDb(): Promise<mongoose.Connection> {
    this.connection = await connectDb;
    return this.connection;
  }

  async disconnectDb() {
    await this.connection.close();
  }
}

const appManager = new AppManager();

export default appManager;
