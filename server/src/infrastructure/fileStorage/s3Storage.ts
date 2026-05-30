import { PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "./s3Client";
import { IFileStorage } from "../../application/interface/IFileStorage";



export class S3Storage implements IFileStorage {



  async generateSignedUploadUrl(
    fileType: string,   // e.g. "video/mp4", "image/jpeg"
    folder: string = "posts/raw"
  ): Promise<{ signedUrl: string; s3Key: string ,fileUrl :string}> {
    const ext = fileType.split("/")[1] ?? "bin";
    const s3Key = `${folder}/${crypto.randomUUID()}.${ext}`;

    const command = new PutObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: s3Key,
      ContentType: fileType,
    });
      const fileUrl = `https://${process.env.BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${s3Key}`;

    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: Number(process.env.SIGNED_URL_EXPIRETIME )}); 
    return { signedUrl, s3Key ,fileUrl};
  }

}