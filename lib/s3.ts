import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";

const s3Client = new S3Client({
  region: process.env.S3_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

const BUCKET_NAME = process.env.S3_BUCKET || "";
const UPLOAD_EXPIRY = 3600; // 1 hour

export interface PresignedUploadResponse {
  uploadUrl: string;
  fileUrl: string;
  storageKey: string;
}

export async function generatePresignedUpload(
  filename: string,
  mimeType: string,
  projectId?: string
): Promise<PresignedUploadResponse> {
  // Generate unique storage key
  const fileExtension = filename.split(".").pop() || "";
  const uniqueId = crypto.randomUUID();
  const storageKey = projectId
    ? `projects/${projectId}/${uniqueId}.${fileExtension}`
    : `uploads/${uniqueId}.${fileExtension}`;

  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: storageKey,
    ContentType: mimeType,
    ACL: "private", // or "public-read" if you want public access
  });

  const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: UPLOAD_EXPIRY });

  // Construct public URL (adjust based on your S3 setup)
  const fileUrl = `https://${BUCKET_NAME}.s3.${process.env.S3_REGION || "us-east-1"}.amazonaws.com/${storageKey}`;

  return {
    uploadUrl,
    fileUrl,
    storageKey,
  };
}

export async function deleteFile(storageKey: string): Promise<void> {
  const command = new DeleteObjectCommand({
    Bucket: BUCKET_NAME,
    Key: storageKey,
  });

  await s3Client.send(command);
}

export async function getPresignedDownloadUrl(storageKey: string, expiresIn: number = 3600): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: storageKey,
  });

  return getSignedUrl(s3Client, command, { expiresIn });
}












