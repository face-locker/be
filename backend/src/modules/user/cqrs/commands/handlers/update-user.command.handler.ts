import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { UpdateUserCommand } from '../implements/update-user.command';
import { UserRepository } from 'src/modules/user/repository/user.repository';
import { GetMediaByIdsQuery } from 'src/modules/media/cqrs/queries/implements/get-media-by-ids.query';
import { Uuid } from 'src/shared/domain/value-objects/uuid.vo';
import { Media } from 'src/modules/media/domain/media';

@CommandHandler(UpdateUserCommand)
export class UpdateUserCommandHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly queryBus: QueryBus,
  ) {}

  async execute(updateUserCommand: UpdateUserCommand): Promise<void> {
    const media: Media[] = await this.queryBus.execute(
      new GetMediaByIdsQuery([updateUserCommand.avatarId] as Uuid[]),
    );

    await this.userRepository.update({
      ...updateUserCommand.userEntity,
      picture: media[0]?.fileUrl || undefined,
      avatarId: updateUserCommand.avatarId,
      firstName: updateUserCommand.firstName,
      lastName: updateUserCommand.lastName,
      birthday: updateUserCommand.birthday || undefined,
      gender: updateUserCommand.gender || undefined,
      phoneNumber: updateUserCommand.phoneNumber,
    });
  }
}
