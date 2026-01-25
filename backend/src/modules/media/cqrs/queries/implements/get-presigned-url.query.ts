import { IQuery } from '@nestjs/cqrs';

export class GetPresignedUrlQuery implements IQuery {
  constructor(
    public readonly bucket: string,
    public readonly fileName: string,
  ) {}
}
