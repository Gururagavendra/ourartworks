import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10">
          {/* Brand */}
          <div>
            <h3 className="text-[22px] font-normal tracking-tight mb-4">OAW</h3>
            <p className="text-small text-white/80 leading-relaxed">
              Custom frames, crafted for your moments.
              <br />
              Premium quality, made in India.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-heading-4 font-normal mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#about" className="text-small text-white/80 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#configurator" className="text-small text-white/80 hover:text-white transition-colors">
                  Customize Frame
                </Link>
              </li>
              <li>
                <Link href="#track" className="text-small text-white/80 hover:text-white transition-colors">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-heading-4 font-normal mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Phone size={12} className="text-white/80" />
                <span className="text-small text-white/80">+91 XXXXX XXXXX</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={12} className="text-white/80" />
                <span className="text-small text-white/80">hello@oaw.in</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={12} className="text-white/80" />
                <span className="text-small text-white/80">Mumbai, Maharashtra, India</span>
              </li>
            </ul>
          </div>
          
          {/* Social */}
          <div>
            <h4 className="text-heading-4 font-normal mb-4">Follow Us</h4>
            <div className="flex gap-3">
              <Link 
                href="https://instagram.com" 
                target="_blank"
                className="w-[30px] h-[30px] rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Instagram"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </Link>
              <Link 
                href="https://facebook.com" 
                target="_blank"
                className="w-[30px] h-[30px] rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Facebook"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </Link>
              <Link 
                href="https://twitter.com" 
                target="_blank"
                className="w-[30px] h-[30px] rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Twitter"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-white/10 pt-6">
          <p className="text-small text-white/60 text-center">
            © 2025 OAW. All rights reserved. Made with love in India.
          </p>
        </div>
      </div>
    </footer>
  );
}
