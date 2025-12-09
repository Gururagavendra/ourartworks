/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for Hostinger deployment
  output: 'export',
  
  // Your domain
  basePath: '',
  
  // Disable image optimization (not supported in static export)
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
