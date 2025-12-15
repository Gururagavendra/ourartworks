"use client";

import { useState, useEffect } from "react";
import Switch from "@/components/ui/Switch";
import FramePreview from "./FramePreview";
import ColorSelector from "./ColorSelector";
import SizeSelector from "./SizeSelector";
import OrientationToggle from "./OrientationToggle";
import BeadSizeSelector from "./BeadSizeSelector";
import BorderThicknessSelector from "./BorderThicknessSelector";
import { FrameSize, FrameColor, BeadSize, BorderThickness, Orientation } from "@/types";
import { getFrameOptions } from "@/services/frames";
import { addToCart } from "@/services/cart";
import { formatPrice } from "@/utils/helpers";
import { ShoppingCart, Info, Check, Loader2 } from "lucide-react";

export default function FrameConfigurator() {
  // Frame options
  const [sizes, setSizes] = useState<FrameSize[]>([]);
  const [colors, setColors] = useState<FrameColor[]>([]);
  const [beadSizes, setBeadSizes] = useState<BeadSize[]>([]);
  const [borderThicknesses, setBorderThicknesses] = useState<BorderThickness[]>([]);
  
  // Selection state
  const [selectedSize, setSelectedSize] = useState<FrameSize | null>(null);
  const [selectedColor, setSelectedColor] = useState<FrameColor | null>(null);
  const [selectedBeadSize, setSelectedBeadSize] = useState<BeadSize | null>(null);
  const [selectedBorderThickness, setSelectedBorderThickness] = useState<BorderThickness | null>(null);
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  const [isBulkOrder, setIsBulkOrder] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  
  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      const options = await getFrameOptions();
      
      setSizes(options.sizes);
      setColors(options.colors);
      setBeadSizes(options.beadSizes);
      setBorderThicknesses(options.borderThicknesses);
      
      // Set defaults
      if (options.sizes.length > 0) {
        setSelectedSize(options.sizes[0]);
      }
      if (options.colors.length > 0) {
        setSelectedColor(options.colors[0]);
      }
      // Set default bead size
      const defaultBead = options.beadSizes.find(b => b.isDefault) || options.beadSizes[0];
      if (defaultBead) setSelectedBeadSize(defaultBead);
      
      // Set default border thickness
      const defaultBorder = options.borderThicknesses.find(b => b.isDefault) || options.borderThicknesses[0];
      if (defaultBorder) setSelectedBorderThickness(defaultBorder);
    };
    
    loadData();
  }, []);
  
  // Calculate total price
  const basePrice = selectedSize?.price || 0;
  const beadAddon = selectedBeadSize?.priceAddon || 0;
  const borderAddon = selectedBorderThickness?.priceAddon || 0;
  const totalPrice = basePrice + beadAddon + borderAddon;
  
  // Handle add to cart
  const handleAddToCart = async () => {
    if (!selectedSize || !selectedColor) {
      alert("Please select a size and color");
      return;
    }
    
    setIsAddingToCart(true);
    setAddedToCart(false);
    
    try {
      const result = await addToCart({
        sizeId: selectedSize.id,
        colorId: selectedColor.id,
        beadSizeId: selectedBeadSize?.id || 0,
        borderThicknessId: selectedBorderThickness?.id || 0,
        orientation,
        quantity: 1,
        uploadedImage,
        isBulkOrder,
        price: totalPrice,
        sizeName: selectedSize.name,
        dimensions: `${selectedSize.width} × ${selectedSize.height} in`,
        colorName: selectedColor.name,
        colorHex: selectedColor.hexCode,
        beadSizeName: selectedBeadSize?.name || "",
        borderThicknessName: selectedBorderThickness?.name || "",
      });
      
      if (result.success) {
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
        window.dispatchEvent(new CustomEvent('cart-updated', { detail: result.cart }));
      }
    } catch (error) {
      console.error("Failed to add to cart:", error);
      alert("Failed to add to cart. Please try again.");
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <section id="configurator" className="py-6 bg-white">
      <div className="max-w-[800px] mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-3">
          <h2 className="text-[2.20rem] font-bold leading-tight text-primary mb-08">
            Customize Your Frame
          </h2>
          <p className="text-[11px] $404040">
            Create your perfect frame with our real-time configurator
          </p>
        </div>
        
        {/* Configurator */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-3 border border-gray-100">
          {/* Left - Preview */}
          <div className="bg-[#f8f8f8] p-2 flex items-center justify-center min-h-[220px]">
            <FramePreview
              selectedSize={selectedSize}
              selectedColor={selectedColor}
              selectedBeadSize={selectedBeadSize}
              selectedBorderThickness={selectedBorderThickness}
              orientation={orientation}
              uploadedImage={uploadedImage}
              onImageUpload={setUploadedImage}
            />
          </div>
          
          {/* Right - Options */}
          <div className="space-y-1.5 py-2 pr-2">
            {/* Frame Color */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-[11px] font-semibold text-primary">Frame Color</h3>
                {selectedColor && (
                  <span className="text-[10px] text-gray-400">
                    {selectedColor.name}
                  </span>
                )}
              </div>
              <ColorSelector
                colors={colors}
                selectedColor={selectedColor}
                onSelect={setSelectedColor}
              />
            </div>
            
            {/* Frame Size */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-[11px] font-semibold text-primary">Frame Size</h3>
                <button className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-primary transition-colors">
                  <Info size={10} />
                  Measurement Guide
                </button>
              </div>
              <SizeSelector
                sizes={sizes}
                selectedSize={selectedSize}
                onSelect={setSelectedSize}
              />
            </div>
            
            {/* Orientation */}
            <div>
              <h3 className="text-[11px] font-semibold text-primary mb-1">Orientation</h3>
              <OrientationToggle
                orientation={orientation}
                onChange={setOrientation}
              />
            </div>
            
            {/* Frame Bead Size */}
            <div>
              <h3 className="text-[11px] font-semibold text-primary mb-1">Frame Bead Size</h3>
              <BeadSizeSelector
                beadSizes={beadSizes}
                selectedBeadSize={selectedBeadSize}
                onSelect={setSelectedBeadSize}
              />
            </div>
            
            {/* Inner Border Thickness */}
            <div>
              <h3 className="text-[11px] font-semibold text-primary mb-1">Inner Border Thickness</h3>
              <BorderThicknessSelector
                borderThicknesses={borderThicknesses}
                selectedBorderThickness={selectedBorderThickness}
                onSelect={setSelectedBorderThickness}
              />
            </div>
            
            {/* Bulk Order */}
            <div className="border border-gray-200 px-2 py-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-primary">Bulk Order</span>
                <Switch
                  checked={isBulkOrder}
                  onChange={setIsBulkOrder}
                />
              </div>
            </div>
            
            {/* Total & Add to Cart */}
            <div className="bg-primary text-white p-3">
              <div className="mb-1.5">
                <span className="text-[10px] text-white/60">Total Price</span>
                <p className="text-[20px] font-medium">{formatPrice(totalPrice)}</p>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className="w-full bg-white text-primary py-2 font-medium text-[12px] flex items-center justify-center gap-2 hover:bg-gray-50 disabled:opacity-70 transition-colors"
              >
                {isAddingToCart ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Adding...
                  </>
                ) : addedToCart ? (
                  <>
                    <Check size={14} />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart size={14} />
                    Add to Cart
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
