import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LockerDeleteCommand } from '../implements/locker-delete.command';
import { LockersRepository } from 'src/modules/lockers/repositories/lockers.repository';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(LockerDeleteCommand)
export class LockerDeleteCommandHandler implements ICommandHandler<LockerDeleteCommand> {
  constructor(private readonly lockersRepository: LockersRepository) {}

  async execute(command: LockerDeleteCommand): Promise<void> {
    const existingLocker = await this.lockersRepository.findById(command.id);

    if (!existingLocker) {
      throw new NotFoundException(`Locker with ID ${command.id} not found.`);
    }

    await this.lockersRepository.delete(command.id);
  }
}
