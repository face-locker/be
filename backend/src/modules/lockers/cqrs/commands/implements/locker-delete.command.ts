import { ICommand } from '@nestjs/cqrs';
import { Uuid } from 'src/shared/domain/value-objects/uuid.vo';

export class LockerDeleteCommand implements ICommand {
  constructor(public readonly id: Uuid) {}
}
