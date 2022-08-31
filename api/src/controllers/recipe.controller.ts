import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ExpressRequest } from 'src/types/express/expressRequest.interface';

class RecipeController {
	async findAll(req: Request, res: Response) {
		res.status(StatusCodes.OK).send();
	}

	async getById(req: ExpressRequest, res: Response) {
		res.status(StatusCodes.OK).send();
	}

	async create(req: Request, res: Response) {
		res.status(StatusCodes.OK).send();
	}

	async update(req: Request, res: Response) {
		res.status(StatusCodes.OK).send();
	}

	async delete(req: Request, res: Response) {
		res.status(StatusCodes.OK).send();
	}
}

export const recipeController = new RecipeController();
