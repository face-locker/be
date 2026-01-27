import { ICommand } from '@nestjs/cqrs';
import { Uuid } from 'src/shared/domain/value-objects/uuid.vo';
import { LockerStatusVO } from 'src/modules/lockers/value-objects/locker-status.vo';
import { DoorStateVO } from 'src/modules/lockers/value-objects/door-state.vo';

export class LockerUpdateStateCommand implements ICommand {
  constructor(
    public readonly id: Uuid,
    public readonly status?: LockerStatusVO,
    public readonly doorState?: DoorStateVO,
  ) {}
}
