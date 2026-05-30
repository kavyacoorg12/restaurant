import React, { useRef, useState } from "react";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";
import { uploadApi } from "../services/api/uploadApi";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  error?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  error,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(value || null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = async (file: File) => {
    // Show local preview immediately
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    try {
      setUploading(true);
      setUploadError(null);

      const res = await uploadApi.getSignedUrl(file);
      const result = res.data.data?.[0];

      if (!result) throw new Error("No signed URL returned");

      await uploadApi.uploadToS3(file, result.signedUrl);

      onChange(result.fileUrl);
    } catch {
      setUploadError("Image upload failed. Please try again.");
      setPreview(null);
      onChange("");
    } finally {
      setUploading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleRemove = () => {
    setPreview(null);
    onChange("");
    if (inputRef.current) inputRef.current.value = "";
  };

  const displayError = error || uploadError;

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-stone-700 tracking-wide uppercase">
        Restaurant Photo
      </label>

      {preview ? (
        <div className="relative group rounded-xl overflow-hidden border-2 border-amber-200 shadow-md">
          <img
            src={preview}
            alt="Restaurant preview"
            className="w-full h-48 object-cover"
          />
          {uploading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="flex flex-col items-center gap-2 text-white">
                <Loader2 className="w-8 h-8 animate-spin" />
                <span className="text-sm font-medium">Uploading…</span>
              </div>
            </div>
          )}
          {!uploading && (
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`
            relative flex flex-col items-center justify-center gap-3 h-48 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-200
            ${
              dragOver
                ? "border-amber-500 bg-amber-50 scale-[1.01]"
                : "border-stone-300 bg-stone-50 hover:border-amber-400 hover:bg-amber-50/50"
            }
          `}
        >
          <div className="p-3 rounded-full bg-amber-100">
            {uploading ? (
              <Loader2 className="w-6 h-6 text-amber-600 animate-spin" />
            ) : (
              <ImageIcon className="w-6 h-6 text-amber-600" />
            )}
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-stone-700">
              {dragOver ? "Drop it here!" : "Click or drag to upload"}
            </p>
            <p className="text-xs text-stone-400 mt-1">
              JPG, PNG, WebP · Max 5 MB
            </p>
          </div>
          {!uploading && (
            <div className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium transition-colors">
              <Upload className="w-4 h-4" />
              Choose Photo
            </div>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        className="hidden"
        onChange={handleInputChange}
      />

      {displayError && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <X className="w-3 h-3" /> {displayError}
        </p>
      )}
    </div>
  );
};

export default ImageUpload;
