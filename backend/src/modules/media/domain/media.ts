import { Uuid } from 'src/shared/domain/value-objects/uuid.vo';
import { FileType } from 'src/utils/file-type.enum';
import { MediaEntity } from '../entities/media.entity';

export class Media {
  id: Uuid;

  fileType: FileType;

  bucket: string;

  fileName: string;

  fileUrl: string;

  createdAt: Date;

  updatedAt: Date;

  static fromEntity(mediaEntity: MediaEntity): Media {
    return {
      id: mediaEntity.id,
      fileType: mediaEntity.fileType,
      bucket: mediaEntity.bucket,
      fileName: mediaEntity.fileName,
      fileUrl: mediaEntity.fileUrl,
      createdAt: mediaEntity.createdAt,
      updatedAt: mediaEntity.updatedAt,
    };
  }

  static fromEntities(mediaEntities: MediaEntity[]): Media[] {
    return mediaEntities.map((entity) => Media.fromEntity(entity));
  }
}
