import { ICommand } from '@nestjs/cqrs';
import { Locker } from 'src/modules/lockers/domain/lockers';

export class LockerUpdateCommand implements ICommand {
  constructor(
    public readonly locker: Omit<Locker, 'createdAt' | 'updatedAt'>,
  ) {}
}
