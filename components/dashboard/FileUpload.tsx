"use client"
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, FileText, Image as ImageIcon, Video, File } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FileUploadProps {
  projectId?: string;
  onUploadComplete?: (file: any) => void;
}

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export default function FileUpload({
  projectId,
  onUploadComplete,
}: FileUploadProps) {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getFileIcon = (mime: string) => {
    if (mime.startsWith("image/")) return ImageIcon;
    if (mime.startsWith("video/")) return Video;
    if (mime.includes("pdf")) return FileText;
    return File;
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: "File too large",
        description: "Maximum file size is 50MB",
        variant: "error",
      });
      return;
    }

    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setProgress(0);

    try {
      // Step 1: Get presigned URL
      const presignRes = await fetch("/api/uploads/presign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: selectedFile.name,
          mimeType: selectedFile.type,
          projectId,
        }),
      });

      if (!presignRes.ok) {
        throw new Error("Failed to get upload URL");
      }

      const { uploadUrl, fileUrl, storageKey } = await presignRes.json();

      // Step 2: Upload to S3
      const uploadRes = await fetch(uploadUrl, {
        method: "PUT",
        body: selectedFile,
        headers: {
          "Content-Type": selectedFile.type,
        },
      });

      if (!uploadRes.ok) {
        throw new Error("Upload failed");
      }

      setProgress(100);

      // Step 3: Create file record
      const fileRes = await fetch("/api/files", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: selectedFile.name,
          mime: selectedFile.type,
          size: selectedFile.size,
          url: fileUrl,
          storageKey,
          projectId,
        }),
      });

      if (!fileRes.ok) {
        throw new Error("Failed to create file record");
      }

      const { file } = await fileRes.json();

      toast({
        title: "Upload successful",
        description: `${selectedFile.name} has been uploaded.`,
        variant: "success",
      });

      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      onUploadComplete?.(file);
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message || "An error occurred",
        variant: "error",
      });
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileSelect}
        className="hidden"
        id="file-upload"
      />

      {!selectedFile ? (
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border/30 rounded-2xl cursor-pointer hover:border-primary/50 transition-colors"
        >
          <Upload className="w-8 h-8 text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Max file size: 50MB
          </p>
        </label>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="border border-border/30 rounded-2xl p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                {(() => {
                  const Icon = getFileIcon(selectedFile.type);
                  return <Icon className="w-8 h-8 text-primary" />;
                })()}
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {(selectedFile.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedFile(null);
                  if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                  }
                }}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {uploading && (
              <div className="mb-3">
                <div className="w-full bg-border/30 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="bg-primary h-2 rounded-full transition-all"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1 text-center">
                  {progress}% uploaded
                </p>
              </div>
            )}

            <button
              onClick={handleUpload}
              disabled={uploading}
              className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {uploading ? "Uploading..." : "Upload File"}
            </button>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}










