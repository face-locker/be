import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { LockerGetByIdQuery } from '../implements/locker-get-by-id.query';
import { LockersRepository } from 'src/modules/lockers/repositories/lockers.repository';
import { Locker } from 'src/modules/lockers/domain/lockers';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(LockerGetByIdQuery)
export class LockerGetByIdQueryHandler implements IQueryHandler<LockerGetByIdQuery> {
  constructor(private readonly lockersRepository: LockersRepository) {}

  async execute(query: LockerGetByIdQuery): Promise<Locker> {
    const locker = await this.lockersRepository.findById(query.id);

    if (!locker) {
      throw new NotFoundException(`Locker with ID ${query.id} not found.`);
    }

    return locker;
  }
}
