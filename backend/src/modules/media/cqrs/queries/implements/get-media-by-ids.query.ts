import { IQuery } from '@nestjs/cqrs';
import { Uuid } from 'src/shared/domain/value-objects/uuid.vo';

export class GetMediaByIdsQuery implements IQuery {
  constructor(public readonly ids: Uuid[]) {}
}
