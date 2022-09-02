import { IsMongoId } from 'class-validator';
import { IId } from 'src/types/id.interface';
import { IsMongoIdString } from '../decorators/is-mongodb-id-string';

export class MongodbIdDto implements IId {
	// !@IsMongoId()
	@IsMongoIdString()
	public id: string;
}
