export class GetPresignedUrlResponseDto {
  fileName: string;
  expiredAt: Date;
  presignedUrl: string;
}
