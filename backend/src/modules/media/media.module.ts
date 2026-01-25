import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { GetPresignedUrlQueryHandler } from './cqrs/queries/handlers/get-presigned-url.query';
import { S3Adapter } from '../s3/s3.adapter';
import { S3Module } from '../s3/s3.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaEntity } from './entities/media.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { MediaAdapterToken } from './media.token';
import { CreateMediaCommandHandler } from './cqrs/commands/handlers/create-media.command.handler';
import { MediaRepository } from './repository/media.repository';
import { GetMediaByIdsQueryHandler } from './cqrs/queries/handlers/get-media-by-ids.query.handler';

const queryHandlers = [GetPresignedUrlQueryHandler, GetMediaByIdsQueryHandler];
const commandHandlers = [CreateMediaCommandHandler];

@Module({
  controllers: [MediaController],
  providers: [
    ...queryHandlers,
    ...commandHandlers,
    MediaRepository,
    { provide: MediaAdapterToken, useClass: S3Adapter },
  ],
  imports: [TypeOrmModule.forFeature([MediaEntity]), CqrsModule, S3Module],
  exports: [MediaRepository],
})
export class MediaModule {}
