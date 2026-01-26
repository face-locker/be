import { Module } from '@nestjs/common';
import { LockersController } from './lockers.controller';
import { LockerCreateCommandHandler } from './cqrs/commands/handlers/locker-create.command.handler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LockerEntity } from './entities/lockers.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { LockersRepository } from './repositories/lockers.repository';

const commandHandlers = [LockerCreateCommandHandler];

@Module({
  imports: [TypeOrmModule.forFeature([LockerEntity]), CqrsModule],
  providers: [...commandHandlers, LockersRepository],
  controllers: [LockersController],
})
export class LockersModule {}
