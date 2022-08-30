import { NextFunction, Response } from 'express';
import { OutgoingMessage } from 'http';
import { ExpressRequest } from 'src/types/express/expressRequest.interface';
import { validateMongoId } from 'src/shared/validation/is-valid-object-id';

export function validatorParamsId() {
  return async function (
    req: ExpressRequest,
    res: Response,
    next: NextFunction
  ): Promise<OutgoingMessage> {
    try {
      const { id } = req.params;
      const verifiedId = validateMongoId(id);

      if (verifiedId) {
        req.id = verifiedId;
        next();
      }
    } catch (e) {
      return res.status(e.statusCode).json({ ...e });
    }
  };
}
