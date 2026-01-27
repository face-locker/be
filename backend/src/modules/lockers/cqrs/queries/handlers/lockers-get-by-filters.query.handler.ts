import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { LockersGetByFilters } from '../implements/lockers-get-by-filters.query';
import { LockersRepository } from 'src/modules/lockers/repositories/lockers.repository';
import { PagedResponse } from 'src/shared/configuration/paged.response';
import { Locker } from 'src/modules/lockers/domain/lockers';

@QueryHandler(LockersGetByFilters)
export class LockersGetByFiltersQueryHandler implements IQueryHandler<LockersGetByFilters> {
  constructor(private readonly lockersRepository: LockersRepository) {}

  async execute(query: LockersGetByFilters): Promise<PagedResponse<Locker>> {
    return await this.lockersRepository.findAll(
      query.pageNumber,
      query.pageSize,
      query.filters,
    );
  }
}
