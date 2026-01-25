import { ApiProperty } from '@nestjs/swagger';
import { Uuid } from 'src/shared/domain/value-objects/uuid.vo';
import { Media } from '../../domain/media';

export class GetMediaByIdsResponseDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'The unique identifier of the media item',
  })
  id: Uuid;

  @ApiProperty({
    example: 'example-image.png',
    description: 'The name of the media file',
  })
  fileName: string;

  @ApiProperty({
    example: 'https://example.com/media/550e8400-e29b-41d4-a716-446655440000',
    description: 'The URL to access the media file',
  })
  fileUrl: string;

  static fromDomain(media: Media): GetMediaByIdsResponseDto {
    return {
      id: media.id,
      fileName: media.fileName,
      fileUrl: media.fileUrl,
    };
  }

  static fromDomains(medias: Media[]): GetMediaByIdsResponseDto[] {
    return medias.map((media) => this.fromDomain(media));
  }
}
