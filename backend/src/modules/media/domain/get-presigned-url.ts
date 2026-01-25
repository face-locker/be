export class GetPresignedUrl {
  constructor(
    public readonly fileName: string,
    public readonly expiredAt: Date,
    public readonly presignedUrl: string,
  ) {}
}
