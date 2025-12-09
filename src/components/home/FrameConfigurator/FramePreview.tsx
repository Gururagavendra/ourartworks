"use client";

import { useRef, useCallback } from "react";
import { FrameSize, FrameColor, Orientation } from "@/types";
import { Upload } from "lucide-react";

interface FramePreviewProps {
  selectedSize: FrameSize | null;
  selectedColor: FrameColor | null;
  orientation: Orientation;
  uploadedImage: string | null;
  onImageUpload: (image: string | null) => void;
}

export default function FramePreview({
  selectedSize,
  selectedColor,
  orientation,
  uploadedImage,
  onImageUpload,
}: FramePreviewProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Calculate preview dimensions based on orientation
  const getPreviewDimensions = () => {
    if (!selectedSize) return { width: 157, height: 222 };
    
    const maxWidth = 157;
    const maxHeight = 222;
    
    let width = selectedSize.width;
    let height = selectedSize.height;
    
    if (orientation === "landscape") {
      [width, height] = [height, width];
    }
    
    const aspectRatio = width / height;
    
    if (aspectRatio > maxWidth / maxHeight) {
      return { width: maxWidth, height: maxWidth / aspectRatio };
    } else {
      return { width: maxHeight * aspectRatio, height: maxHeight };
    }
  };
  
  const { width: previewWidth, height: previewHeight } = getPreviewDimensions();
  
  // Handle file drop
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onImageUpload(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageUpload]);
  
  // Handle file select
  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onImageUpload(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageUpload]);
  
  // Handle click to upload
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center">
      {/* Frame Container */}
      <div
        className="relative flex items-center justify-center"
        style={{
          width: previewWidth + 24,
          height: previewHeight + 24,
          backgroundColor: selectedColor?.hexCode || "#000",
          padding: "12px",
        }}
      >
        {/* Inner white border */}
        <div
          className="relative bg-white flex items-center justify-center overflow-hidden"
          style={{
            width: previewWidth,
            height: previewHeight,
          }}
        >
          {uploadedImage ? (
            <img
              src={uploadedImage}
              alt="Uploaded preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              className="w-full h-full flex flex-col items-center justify-center bg-gray-100 cursor-pointer hover:bg-gray-200 transition-colors"
              onClick={handleClick}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              <Upload size={24} className="text-gray-400 mb-2" />
              <p className="text-small text-text-light text-center px-4">
                Drag & drop or click to upload
              </p>
            </div>
          )}
        </div>
        
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
      
      {/* Size Info */}
      {selectedSize && (
        <div className="mt-4 text-center">
          <p className="text-small font-medium text-primary">{selectedSize.name}</p>
          <p className="text-[9px] text-text-light">{selectedSize.width}×{selectedSize.height} {selectedSize.unit}</p>
        </div>
      )}
    </div>
  );
}
