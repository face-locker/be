import { Uuid } from 'src/shared/domain/value-objects/uuid.vo';

export class MediaDto {
  id: Uuid;
  fileName: string;
  fileUrl: string;
}
