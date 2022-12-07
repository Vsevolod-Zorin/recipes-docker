import { createServer } from 'src/utils/create-server';
import http from 'http';
import { Express } from 'express';
import mongoose, { Types } from 'mongoose';
import { connectDb } from 'src/utils/db';
import { ICategory, ICategoryCreate } from 'src/types/category/category.interface';
import { categoryModel } from 'src/models/category.model';

class TestsManager {
	private _app: Express;
	private _httpServer: http.Server;
	private _connection: mongoose.Connection;

	constructor() {
		this.app = createServer();
		this.httpServer = http.createServer(this.app);
	}

	public get app(): Express {
		return this._app;
	}
	private set app(value: Express) {
		this._app = value;
	}

	public get httpServer(): http.Server {
		return this._httpServer;
	}
	private set httpServer(value: http.Server) {
		this._httpServer = value;
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

	async startServerForTests(): Promise<void> {
		await this.connectToDb();
		if (!this.httpServer.listening) {
			this.httpServer.listen();
		}
	}

	async closeServerForTests(): Promise<void> {
		await this.disconnectDb();
		this.httpServer.close();
	}

	async createCategory(payload: ICategoryCreate): Promise<ICategory> {
		return await categoryModel.create(payload);
	}

	generateRandomMongoId(): string {
		return new Types.ObjectId().toString();
	}
}

const testsManager = new TestsManager();

export default testsManager;
