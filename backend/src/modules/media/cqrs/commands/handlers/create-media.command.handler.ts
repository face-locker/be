import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateMediaCommand } from '../implements/create-media.command';
import { MediaRepository } from 'src/modules/media/repository/media.repository';
import { MediaAdapterInterface } from 'src/modules/media/interfaces/media-adapter.interface';
import { Media } from 'src/modules/media/domain/media';
import { getFileType } from 'src/utils/file-type.enum';
import { Inject } from '@nestjs/common';
import { MediaAdapterToken } from 'src/modules/media/media.token';

@CommandHandler(CreateMediaCommand)
export class CreateMediaCommandHandler implements ICommandHandler<CreateMediaCommand> {
  constructor(
    private readonly mediaRepository: MediaRepository,
    @Inject(MediaAdapterToken)
    private readonly mediaAdapterInterface: MediaAdapterInterface,
  ) {}

  async execute(command: CreateMediaCommand): Promise<Media> {
    await this.mediaAdapterInterface.fileExists(
      command.bucket,
      command.fileName,
    );

    return Media.fromEntity(
      await this.mediaRepository.create({
        bucket: command.bucket,
        fileName: command.fileName,
        fileType: getFileType(command.fileName),
        fileUrl: this.mediaAdapterInterface.getPublicUrl(
          command.bucket,
          command.fileName,
        ),
      }),
    );
  }
}
