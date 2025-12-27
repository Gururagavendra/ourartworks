import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#F8F8F8] text-black">
      {/* Main Footer Content */}
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h3 className="text-[24px] font-bold tracking-tight mb-4">OUR ART WORKS</h3>
            <p className="text-[14px] text-gray-600 leading-relaxed mb-6">
              Premium custom photo frames crafted with precision and care. Elevating memories since 2020.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              <Link 
                href="https://instagram.com/ourartworkss" 
                target="_blank"
                className="w-[36px] h-[36px] rounded-full border border-gray-300 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all"
                aria-label="Instagram"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </Link>
              <Link 
                href="https://facebook.com/ourartworks" 
                target="_blank"
                className="w-[36px] h-[36px] rounded-full border border-gray-300 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all"
                aria-label="Facebook"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </Link>
              <Link 
                href="https://youtube.com/@ourartworks" 
                target="_blank"
                className="w-[36px] h-[36px] rounded-full border border-gray-300 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all"
                aria-label="YouTube"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
              </Link>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-[16px] font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#configurator" className="text-[14px] text-gray-600 hover:text-black transition-colors">
                  Customize Frame
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-[14px] text-gray-600 hover:text-black transition-colors">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[14px] text-gray-600 hover:text-black transition-colors">
                  Bulk Orders
                </Link>
              </li>
              <li>
                <Link href="#track" className="text-[14px] text-gray-600 hover:text-black transition-colors">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Customer Service */}
          <div>
            <h4 className="text-[16px] font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/shipping" className="text-[14px] text-gray-600 hover:text-black transition-colors">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-[14px] text-gray-600 hover:text-black transition-colors">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-[14px] text-gray-600 hover:text-black transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-[14px] text-gray-600 hover:text-black transition-colors">
                  Privacy Policy
                </Link>
              </li>
                            <li>
                <Link href="/privacy-policy" className="text-[14px] text-gray-600 hover:text-black transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Get in Touch */}
          <div>
            <h4 className="text-[16px] font-semibold mb-4">Get in Touch</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-gray-600 mt-0.5 flex-shrink-0" />
                <span className="text-[14px] text-gray-600">Coimbatore, Tamil Nadu</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-gray-600 flex-shrink-0" />
                <span className="text-[14px] text-gray-600">+91 63811 57296</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-gray-600 flex-shrink-0" />
                <span className="text-[14px] text-gray-600">ourartworkss@gmail.com</span>
              </li>
            </ul>
            {/* WhatsApp Button */}
            <Link 
              href="https://wa.me/916381157296" 
              target="_blank"
              className="inline-flex items-center gap-2 mt-4 bg-black text-white px-5 py-2.5 rounded-sm text-[14px] font-medium hover:bg-gray-800 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp Us
            </Link>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-gray-200">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[14px] text-gray-600">
              © 2025 FRAME. All rights reserved.
            </p>

            {/* White Label Credit */}
            <p className="text-[12px] text-gray-400">
              Designed & Developed by{" "}
              <Link 
                href="https://achitor.com" 
                target="_blank" 
                className="text-gray-500 hover:text-black transition-colors font-medium"
              >
                Achitor
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
