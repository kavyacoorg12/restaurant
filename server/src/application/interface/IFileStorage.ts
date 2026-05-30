export interface IFileStorage {

  generateSignedUploadUrl(
    fileType: string,
    folder: string,
  ): Promise<{ signedUrl: string; s3Key: string,fileUrl:string }>;
}
