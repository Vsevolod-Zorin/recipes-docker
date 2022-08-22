import { NextFunction, Request, Response } from 'express';
import { validate, ValidationError } from 'class-validator';
import { StatusCodes as status } from 'http-status-codes';
import { OutgoingMessage } from 'http';
import { CreateCategoryDto } from 'src/types/category/create-category.dto';
import { UpdateCategoryDto } from 'src/types/category/update-category.dto';

export function validator(DataTransferObject: CreateCategoryDto | UpdateCategoryDto) {
  return async function (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<OutgoingMessage> {
    const errors: ValidationError[] = await validate(Object.assign(DataTransferObject, req.body));
    // todo create errorWrapper
    const errorMessage = errors.reduce((acc, error) => {
      acc[error.property] = Object.values(error.constraints);
      return acc;
    }, {});

    if (Object.keys(errorMessage)) {
      return res.status(status.BAD_REQUEST).json(errorMessage);
    }
    next();
  };
}
