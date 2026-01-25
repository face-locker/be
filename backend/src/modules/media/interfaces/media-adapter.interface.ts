export interface MediaAdapterInterface {
  getPresignedUrl(request: { bucket: string; fileName: string }): Promise<{
    fileName: string;
    expiredAt: Date;
    presignedUrl: string;
  }>;

  fileExists(bucket: string, fileName: string): Promise<boolean>;

  getPublicUrl(bucket: string, fileName: string): string;
}
