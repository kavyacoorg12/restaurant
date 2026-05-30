import { IFileStorage } from "../interface/IFileStorage";
import { IGetSignedUploadUrlsUseCase } from "../interface/IGetSignedUrlUseCase";


 
export class GetSignedUrlsUseCase implements IGetSignedUploadUrlsUseCase
 {
  constructor(private _fileStorage: IFileStorage) {}
 
  async execute(
    files: { index: number; fileType: string }[]
  ): Promise<{ index: number; signedUrl: string; s3Key: string,fileUrl :string }[]> {
    return Promise.all(
      files.map(async ({ index, fileType }) => {
        const { signedUrl, s3Key,fileUrl } = await this._fileStorage.generateSignedUploadUrl(fileType, "restaurants");
        return { index, signedUrl, s3Key,fileUrl  };
      })
    );
  }
}