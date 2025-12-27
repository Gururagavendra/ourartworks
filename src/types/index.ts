// Frame Size type (matches WordPress OAW API response)
export interface FrameSize {
  id: number;
  name: string;
  width: number;
  height: number;
  unit: string;
  price: number;
  isActive: boolean;
  displayOrder: number;
}

// Frame Color type (matches WordPress OAW API response)
export interface FrameColor {
  id: number;
  name: string;
  hexCode: string;
  imageUrl: string | null;
  isActive: boolean;
  displayOrder: number;
}

// Bead Size type
export interface BeadSize {
  id: number;
  name: string;
  priceAddon: number;
  isDefault: boolean;
  displayOrder: number;
}

// Border Thickness type
export interface BorderThickness {
  id: number;
  name: string;
  priceAddon: number;
  isDefault: boolean;
  displayOrder: number;
}

// Frame Options (combined API response)
export interface FrameOptions {
  sizes: FrameSize[];
  colors: FrameColor[];
  beadSizes: BeadSize[];
  borderThicknesses: BorderThickness[];
}

// Orientation type
export type Orientation = "portrait" | "landscape";

// Frame Configuration state
export interface FrameConfiguration {
  selectedSize: FrameSize | null;
  selectedColor: FrameColor | null;
  orientation: Orientation;
  isBulkOrder: boolean;
  quantity: number;
  uploadedImage: string | null;
  imagePosition: {
    x: number;
    y: number;
  };
}

// Cart Item type
export interface CartItem {
  productId: number;
  quantity: number;
  frameSize: string;
  frameColor: string;
  orientation: Orientation;
  customerImage: string;
}

// Testimonial type
export interface Testimonial {
  id: number;
  name: string;
  location: string;
  image: string;
  hasVideo?: boolean;
}

// Order Tracking type
export interface OrderStatus {
  orderId: string;
  status: "processing" | "shipped" | "delivered" | "cancelled";
  estimatedDelivery?: string;
  trackingNumber?: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

// Contact Info type
export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
}

// Social Links type
export interface SocialLinks {
  instagram: string;
  facebook: string;
  twitter: string;
}
