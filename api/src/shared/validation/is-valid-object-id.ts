import { StatusCodes } from 'http-status-codes';
import { Types } from 'mongoose';
import { BackendError } from '../backend.error';
import { BackendMessage } from '../backend.messages';

export const validateMongoId = (id: string): string => {
  if (Types.ObjectId.isValid(id)) {
    if (String(new Types.ObjectId(id)) === id) {
      return id;
    }
  }

  throw new BackendError(StatusCodes.BAD_REQUEST, BackendMessage.UNCORRECT_ID);
};
