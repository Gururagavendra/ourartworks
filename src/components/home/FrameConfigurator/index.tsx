"use client";

import { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Switch from "@/components/ui/Switch";
import FramePreview from "./FramePreview";
import ColorSelector from "./ColorSelector";
import SizeSelector from "./SizeSelector";
import OrientationToggle from "./OrientationToggle";
import { FrameSize, FrameColor, Orientation } from "@/types";
import { getFrameOptions } from "@/services/frames";
import { addToCart } from "@/services/cart";
import { formatPrice } from "@/utils/helpers";
import { ShoppingCart, Ruler, Check, Loader2 } from "lucide-react";

export default function FrameConfigurator() {
  // Frame options
  const [sizes, setSizes] = useState<FrameSize[]>([]);
  const [colors, setColors] = useState<FrameColor[]>([]);
  
  // Selection state
  const [selectedSize, setSelectedSize] = useState<FrameSize | null>(null);
  const [selectedColor, setSelectedColor] = useState<FrameColor | null>(null);
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  const [isBulkOrder, setIsBulkOrder] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  
  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      // Fetch from WordPress API
      const { sizes: frameSizes, colors: frameColors } = await getFrameOptions();
      
      setSizes(frameSizes);
      setColors(frameColors);
      
      // Set defaults
      if (frameSizes.length > 0) {
        setSelectedSize(frameSizes[0]);
      }
      if (frameColors.length > 0) {
        setSelectedColor(frameColors[0]);
      }
    };
    
    loadData();
  }, []);
  
  // Calculate total price
  const totalPrice = selectedSize?.price || 0;
  
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
        orientation,
        quantity: 1,
        uploadedImage,
        isBulkOrder,
        price: selectedSize.price,
        sizeName: selectedSize.name,
        dimensions: `${selectedSize.width}x${selectedSize.height} ${selectedSize.unit}`,
        colorName: selectedColor.name,
        colorHex: selectedColor.hexCode,
      });
      
      if (result.success) {
        setAddedToCart(true);
        // Reset after 2 seconds
        setTimeout(() => setAddedToCart(false), 2000);
        
        // Dispatch custom event for header cart update
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
    <section id="configurator" className="py-24 bg-[#fafafa]">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-[45px] leading-tight tracking-tight text-primary mb-3">
            Customize Your Frame
          </h2>
          <p className="text-[15px] text-text">
            Create your perfect frame with our real-time configurator
          </p>
        </div>
        
        {/* Configurator */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left - Preview */}
          <Card variant="bordered" className="p-6">
            <FramePreview
              selectedSize={selectedSize}
              selectedColor={selectedColor}
              orientation={orientation}
              uploadedImage={uploadedImage}
              onImageUpload={setUploadedImage}
            />
          </Card>
          
          {/* Right - Options */}
          <div className="space-y-6">
            {/* Frame Color */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-heading-3 text-primary">Frame Color</h3>
                {selectedColor && (
                  <span className="text-small bg-border-light px-3 py-1 rounded-full">
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
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-heading-3 text-primary">Frame Size</h3>
                <button className="flex items-center gap-1 text-small text-primary hover:underline">
                  <Ruler size={12} />
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
              <h3 className="text-heading-3 text-primary mb-3">Orientation</h3>
              <OrientationToggle
                orientation={orientation}
                onChange={setOrientation}
              />
            </div>
            
            {/* Bulk Order */}
            <Card variant="bordered" className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-body-lg text-primary">Bulk Order</span>
                <Switch
                  checked={isBulkOrder}
                  onChange={setIsBulkOrder}
                />
              </div>
            </Card>
            
            {/* Total & Add to Cart */}
            <Card className="bg-primary text-white p-6">
              <div className="mb-4">
                <span className="text-small text-white/80">Total Price</span>
                <p className="text-[26px] font-normal">{formatPrice(totalPrice)}</p>
              </div>
              <Button
                variant="secondary"
                fullWidth
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className="bg-white text-primary hover:bg-white/90 disabled:opacity-70"
              >
                {isAddingToCart ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Adding...
                  </>
                ) : addedToCart ? (
                  <>
                    <Check size={16} />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart size={16} />
                    Add to Cart
                  </>
                )}
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
