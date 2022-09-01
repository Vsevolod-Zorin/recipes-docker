import { IId } from 'src/types/id.interface';
import { IsMongoIdString } from '../decorators/is-mongodb-id-string';

export class MongodbIdDto implements IId {
	@IsMongoIdString()
	readonly id: string;
}
