import { IQuery } from '@nestjs/cqrs';
import { Uuid } from 'src/shared/domain/value-objects/uuid.vo';

export class LockerGetByIdQuery implements IQuery {
  constructor(public readonly id: Uuid) {}
}
