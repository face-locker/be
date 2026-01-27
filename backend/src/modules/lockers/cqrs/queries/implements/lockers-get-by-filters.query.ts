import { IQuery } from '@nestjs/cqrs';
import { LockerStatusVO } from 'src/modules/lockers/value-objects/locker-status.vo';
import { LockerSizeVO } from 'src/modules/lockers/value-objects/locker-size.vo';
import { DoorStateVO } from 'src/modules/lockers/value-objects/door-state.vo';

export interface LockerFilters {
  status?: LockerStatusVO;
  size?: LockerSizeVO;
  doorState?: DoorStateVO;
  location?: string;
  code?: string;
  esp32Id?: string;
}

export class LockersGetByFilters implements IQuery {
  constructor(
    public readonly pageNumber: number,
    public readonly pageSize: number,
    public readonly filters?: LockerFilters,
  ) {}
}
