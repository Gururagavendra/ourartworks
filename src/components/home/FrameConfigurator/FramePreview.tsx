"use client";

import { useRef, useCallback, useState, useEffect } from "react";
import { FrameSize, FrameColor, BeadSize, BorderThickness, Orientation } from "@/types";
import { Upload, ZoomIn, ZoomOut, Move, X } from "lucide-react";

interface FramePreviewProps {
  selectedSize: FrameSize | null;
  selectedColor: FrameColor | null;
  selectedBeadSize: BeadSize | null;
  selectedBorderThickness: BorderThickness | null;
  orientation: Orientation;
  uploadedImage: string | null;
  onImageUpload: (image: string | null) => void;
}

export default function FramePreview({
  selectedSize,
  selectedColor,
  selectedBeadSize,
  selectedBorderThickness,
  orientation,
  uploadedImage,
  onImageUpload,
}: FramePreviewProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  
  // Image transform state
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  // Reset transform when image changes
  useEffect(() => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  }, [uploadedImage]);
  
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
  
  // Handle click to upload (only when no image)
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  
  // Handle mouse/touch drag start
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (!uploadedImage) return;
    e.preventDefault();
    setIsDragging(true);
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    setDragStart({
      x: clientX - position.x,
      y: clientY - position.y,
    });
  };
  
  // Handle mouse/touch drag move
  const handleDragMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    setPosition({
      x: clientX - dragStart.x,
      y: clientY - dragStart.y,
    });
  }, [isDragging, dragStart]);
  
  // Handle mouse/touch drag end
  const handleDragEnd = () => {
    setIsDragging(false);
  };
  
  // Zoom controls
  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.25, 3));
  };
  
  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.25, 0.5));
  };
  
  // Remove image
  const handleRemoveImage = () => {
    onImageUpload(null);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  // Calculate frame dimensions based on selected size
  const getFrameDimensions = () => {
    if (!selectedSize) {
      return orientation === "landscape" 
        ? { width: 130, height: 90 }
        : { width: 90, height: 130 };
    }
    
    // Base minimum dimensions (for smallest frame - 12x8)
    // These represent the smaller and larger dimensions respectively
    const minSmallerDim = 96;  // For the 8 inch dimension
    const minLargerDim = 144;  // For the 12 inch dimension
    
    // Maximum display dimensions
    const maxWidth = 220;
    const maxHeight = 260;
    
    // Scaling factor (pixels per inch) applied on top of minimum dimensions
    const pixelsPerInch = 4;
    
    // Reference smallest frame dimensions (12x8)
    const smallestFrameSmallerDim = 8;
    const smallestFrameLargerDim = 12;
    
    // Get the smaller and larger dimensions from the frame size
    const smallerDim = Math.min(selectedSize.width, selectedSize.height);
    const largerDim = Math.max(selectedSize.width, selectedSize.height);
    
    // Calculate scale relative to smallest frame
    const smallerScale = (smallerDim - smallestFrameSmallerDim) * pixelsPerInch;
    const largerScale = (largerDim - smallestFrameLargerDim) * pixelsPerInch;
    
    // Calculate base dimensions with scaling
    const baseSmaller = minSmallerDim + smallerScale;
    const baseLarger = minLargerDim + largerScale;
    
    // For portrait: height > width, for landscape: width > height
    let displayWidth: number;
    let displayHeight: number;
    
    if (orientation === "portrait") {
      displayWidth = baseSmaller;
      displayHeight = baseLarger;
    } else {
      displayWidth = baseLarger;
      displayHeight = baseSmaller;
    }
    
    // Cap at max dimensions if needed (for very large frames)
    if (displayWidth > maxWidth || displayHeight > maxHeight) {
      const capScale = Math.min(maxWidth / displayWidth, maxHeight / displayHeight);
      displayWidth = displayWidth * capScale;
      displayHeight = displayHeight * capScale;
    }
    
    return {
      width: Math.round(displayWidth),
      height: Math.round(displayHeight),
    };
  };
  
  const { width: frameWidth, height: frameHeight } = getFrameDimensions();
  
  // Frame border (bead) width
  const getBeadWidth = () => {
    if (!selectedBeadSize) return 16;
    const match = selectedBeadSize.name.match(/(\d+\.?\d*)/);
    if (match) {
      const inches = parseFloat(match[1]);
      // Use a smaller multiplier for 1 inch to make it thinner
      const multiplier = inches === 1 ? 5 : 4.8;
      return Math.round(inches * multiplier);
    }
    return 16;
  };
  
  // Inner border (mat) width
  const getInnerBorderWidth = () => {
    if (!selectedBorderThickness) return 8;
    const match = selectedBorderThickness.name.match(/(\d+\.?\d*)/);
    if (match) {
      const inches = parseFloat(match[1]);
      return Math.round(inches * 12);
    }
    return 8;
  };
  
  const borderWidth = getBeadWidth();
  const innerBorder = getInnerBorderWidth();

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* Frame Container */}
      <div
        className="relative shadow-lg"
        style={{
          width: frameWidth + borderWidth * 2,
          height: frameHeight + borderWidth * 2,
          backgroundColor: selectedColor?.hexCode || "#212121",
          padding: borderWidth,
        }}
      >
        {/* Inner white mat border */}
        <div
          className="relative bg-white"
          style={{
            width: frameWidth,
            height: frameHeight,
            padding: innerBorder,
          }}
        >
          {/* Image area */}
          <div
            ref={imageContainerRef}
            className="relative w-full h-full overflow-hidden"
            style={{ cursor: uploadedImage ? (isDragging ? 'grabbing' : 'grab') : 'pointer' }}
            onClick={!uploadedImage ? handleUploadClick : undefined}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            {/* Image with transform */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform"
              style={{
                backgroundImage: uploadedImage 
                  ? `url(${uploadedImage})` 
                  : "url('/images/frame-placeholder.jpg')",
                transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                transformOrigin: 'center center',
                transitionDuration: isDragging ? '0ms' : '150ms',
              }}
            />
            
            {/* Upload button overlay (only when no image) */}
            {!uploadedImage && (
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  type="button"
                  className="bg-white/90 hover:bg-white px-1 py-1 flex items-center gap-2 text-[8px] text-gray-700 shadow-sm transition-colors"
                >
                  <Upload size={16} />
                  Upload Photo
                </button>
              </div>
            )}
            
            {/* Drag hint (when image uploaded) */}
            {uploadedImage && !isDragging && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/60 text-white text-[10px] px-2 py-1 rounded flex items-center gap-1 pointer-events-none">
                <Move size={10} />
                Drag to adjust
              </div>
            )}
          </div>
        </div>
        
        {/* Remove image button */}
        {uploadedImage && (
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-md transition-colors"
            title="Remove image"
          >
            <X size={14} />
          </button>
        )}
        
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
      
      {/* Controls (when image uploaded) */}
      {uploadedImage && (
        <div className="mt-4 flex items-center gap-4">
          {/* Zoom controls */}
          <div className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-1.5 shadow-sm">
            <button
              type="button"
              onClick={handleZoomOut}
              disabled={zoom <= 0.5}
              className="text-gray-600 hover:text-primary disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
              title="Zoom out"
            >
              <ZoomOut size={18} />
            </button>
            <span className="text-[12px] text-gray-500 min-w-[40px] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              type="button"
              onClick={handleZoomIn}
              disabled={zoom >= 3}
              className="text-gray-600 hover:text-primary disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
              title="Zoom in"
            >
              <ZoomIn size={18} />
            </button>
          </div>
          
          {/* Change photo button */}
          <button
            type="button"
            onClick={handleUploadClick}
            className="text-[12px] text-gray-500 hover:text-primary underline transition-colors"
          >
            Change Photo
          </button>
        </div>
      )}
      
      {/* Size Info */}
      {selectedSize && (
        <div className={uploadedImage ? "mt-3 text-center" : "mt-4 text-center"}>
          <p className="text-[14px] font-medium text-primary">{selectedSize.name}</p>
          <p className="text-[11px] text-gray-400">
            {selectedSize.width} × {selectedSize.height} mm
          </p>
        </div>
      )}
    </div>
  );
}
