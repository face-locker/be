import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LockerCreateCommand } from '../implements/locker-create.command';
import { LockersRepository } from 'src/modules/lockers/repositories/lockers.repository';
import { BadRequestException } from '@nestjs/common';

@CommandHandler(LockerCreateCommand)
export class LockerCreateCommandHandler implements ICommandHandler<LockerCreateCommand> {
  constructor(private readonly lockersRepository: LockersRepository) {}

  async execute(command: LockerCreateCommand): Promise<void> {
    const findByCode = await this.lockersRepository.findByCode(
      command.locker.code,
    );

    if (findByCode) {
      throw new BadRequestException(
        `Locker with code ${command.locker.code} already exists.`,
      );
    }

    const findByEsp32Id = await this.lockersRepository.findByEsp32Id(
      command.locker.esp32Id,
    );

    if (findByEsp32Id) {
      throw new BadRequestException(
        `Locker with ESP32 ID ${command.locker.esp32Id} already exists.`,
      );
    }

    await this.lockersRepository.save(command.locker);
  }
}
