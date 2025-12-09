"use client";

import { useRef, useCallback } from "react";
import { Upload, X } from "lucide-react";
import { isValidImage, fileToBase64 } from "@/utils/helpers";

interface ImageUploaderProps {
  uploadedImage: string | null;
  onUpload: (image: string | null) => void;
}

export default function ImageUploader({
  uploadedImage,
  onUpload,
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    
    if (file && isValidImage(file)) {
      const base64 = await fileToBase64(file);
      onUpload(base64);
    }
  }, [onUpload]);
  
  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file && isValidImage(file)) {
      const base64 = await fileToBase64(file);
      onUpload(base64);
    }
  }, [onUpload]);
  
  const handleClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleRemove = () => {
    onUpload(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  if (uploadedImage) {
    return (
      <div className="relative">
        <img
          src={uploadedImage}
          alt="Uploaded preview"
          className="w-full h-full object-cover rounded-card"
        />
        <button
          onClick={handleRemove}
          className="absolute top-2 right-2 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors"
          aria-label="Remove image"
        >
          <X size={14} />
        </button>
      </div>
    );
  }

  return (
    <div
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="w-full h-full min-h-[200px] flex flex-col items-center justify-center bg-background-secondary border-2 border-dashed border-border rounded-card cursor-pointer hover:border-primary transition-colors"
    >
      <Upload size={32} className="text-text-light mb-3" />
      <p className="text-body text-text-light mb-1">Drag & drop your image</p>
      <p className="text-small text-text-light">or click to browse</p>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}
