import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetMediaByIdsQuery } from '../implements/get-media-by-ids.query';
import { MediaRepository } from 'src/modules/media/repository/media.repository';
import { Media } from 'src/modules/media/domain/media';

@QueryHandler(GetMediaByIdsQuery)
export class GetMediaByIdsQueryHandler implements IQueryHandler<GetMediaByIdsQuery> {
  constructor(private readonly mediaRepository: MediaRepository) {}

  async execute(query: GetMediaByIdsQuery): Promise<Media[]> {
    return Media.fromEntities(await this.mediaRepository.findByIds(query.ids));
  }
}
