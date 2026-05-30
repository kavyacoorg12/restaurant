import { apiRoute } from "../../constants/apiRouter";
import type { BackendResponse } from "../../types/api";
import api, { axiosWrapper } from "../axiosWrapper";


export interface SignedUrlResult {
  index: number;
  signedUrl: string;
  s3Key: string;
  fileUrl: string;  
}

export const uploadApi = {
  getSignedUrl: async (file: File) => {
    return await axiosWrapper<BackendResponse<SignedUrlResult[]>>(
      api.post(apiRoute.getSignedUrl, {
        fileType: file.type,
        fileSize: file.size,
        files: [{ index: 0, fileType: file.type }],
      })
    );
  },

  uploadToS3: async (file: File, signedUrl: string): Promise<void> => {
    await fetch(signedUrl, {
      method: 'PUT',
      headers: { 'Content-Type': file.type },
      body: file,
    });
  },
};