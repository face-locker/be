import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LockerUpdateStateCommand } from '../implements/locker-update-state.command';
import { LockersRepository } from 'src/modules/lockers/repositories/lockers.repository';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(LockerUpdateStateCommand)
export class LockerUpdateStateCommandHandler implements ICommandHandler<LockerUpdateStateCommand> {
  constructor(private readonly lockersRepository: LockersRepository) {}

  async execute(command: LockerUpdateStateCommand): Promise<void> {
    const existingLocker = await this.lockersRepository.findById(command.id);

    if (!existingLocker) {
      throw new NotFoundException(`Locker with ID ${command.id} not found.`);
    }

    await this.lockersRepository.save({
      ...existingLocker,
      status: command.status ?? existingLocker.status,
      doorState: command.doorState ?? existingLocker.doorState,
    });
  }
}
