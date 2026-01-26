import { ICommand } from '@nestjs/cqrs';
import { Locker } from 'src/modules/lockers/domain/lockers';

export class LockerCreateCommand implements ICommand {
  constructor(public readonly locker: Locker) {}
}
