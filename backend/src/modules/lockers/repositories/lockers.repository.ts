import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LockerEntity } from '../entities/lockers.entity';
import { Repository } from 'typeorm';
import { Locker } from '../domain/lockers';
import { LockersMapper } from '../mappers/lockers.mapper';
import { Uuid } from 'src/shared/domain/value-objects/uuid.vo';

@Injectable()
export class LockersRepository {
  constructor(
    @InjectRepository(LockerEntity)
    private readonly repository: Repository<LockerEntity>,
  ) {}

  async save(locker: Locker): Promise<void> {
    await this.repository.save(LockersMapper.toEntity(locker));
  }

  async findById(id: Uuid): Promise<Locker | null> {
    return LockersMapper.toDomainOrNull(
      await this.repository.findOneBy({ id }),
    );
  }

  async findByCode(code: string): Promise<Locker | null> {
    return LockersMapper.toDomainOrNull(
      await this.repository.findOneBy({ code }),
    );
  }

  async findByEsp32Id(esp32Id: string): Promise<Locker | null> {
    return LockersMapper.toDomainOrNull(
      await this.repository.findOneBy({ esp32Id }),
    );
  }
}
