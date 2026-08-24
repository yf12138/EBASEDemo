import { Link } from 'react-router-dom';
import { Leaf, Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { UniversalLink } from '@lark-apaas/client-toolkit-lite';

export default function Footer() {
  return (
    <footer className="w-full bg-[#2C2C2C] text-[#E8DFD4] pt-16 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full border-2 border-[#C8B69A]/60 flex items-center justify-center">
                <Leaf className="size-5 text-[#C8B69A]" strokeWidth={1.5} />
              </div>
              <div className="leading-tight">
                <div className="font-serif text-lg tracking-[0.18em] text-[#E8DFD4] uppercase">Ren</div>
                <div className="text-[10px] tracking-[0.25em] text-[#9C8B7A] uppercase">Apothecary</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-[#9C8B7A] max-w-xs">
              Ancient wisdom meets modern wellness. Premium Traditional Chinese Medicine,
              hand-selected for your health and vitality.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <UniversalLink to="#" className="size-9 rounded-full border border-[#9C8B7A]/40 flex items-center justify-center text-[#9C8B7A] hover:text-[#E8DFD4] hover:border-[#E8DFD4] transition-colors" aria-label="Facebook">
                <Facebook className="size-4" />
              </UniversalLink>
              <UniversalLink to="#" className="size-9 rounded-full border border-[#9C8B7A]/40 flex items-center justify-center text-[#9C8B7A] hover:text-[#E8DFD4] hover:border-[#E8DFD4] transition-colors" aria-label="Instagram">
                <Instagram className="size-4" />
              </UniversalLink>
              <UniversalLink to="#" className="size-9 rounded-full border border-[#9C8B7A]/40 flex items-center justify-center text-[#9C8B7A] hover:text-[#E8DFD4] hover:border-[#E8DFD4] transition-colors" aria-label="Email">
                <Mail className="size-4" />
              </UniversalLink>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-sm tracking-[0.2em] uppercase text-[#E8DFD4] mb-5">Quick Links</h4>
            <ul className="space-y-3 text-sm text-[#9C8B7A]">
              <li><Link to="/" className="hover:text-[#E8DFD4] transition-colors">Home</Link></li>
              <li><Link to="/shop" className="hover:text-[#E8DFD4] transition-colors">Shop All</Link></li>
              <li><Link to="/about" className="hover:text-[#E8DFD4] transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-[#E8DFD4] transition-colors">Contact</Link></li>
              <li><UniversalLink to="#" className="hover:text-[#E8DFD4] transition-colors">Shipping & Returns</UniversalLink></li>
              <li><UniversalLink to="#" className="hover:text-[#E8DFD4] transition-colors">Privacy Policy</UniversalLink></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-sm tracking-[0.2em] uppercase text-[#E8DFD4] mb-5">Contact Us</h4>
            <ul className="space-y-3 text-sm text-[#9C8B7A]">
              <li className="flex items-start gap-3">
                <MapPin className="size-4 mt-0.5 shrink-0 text-[#C8B69A]" />
                <span>No. 9, Jalan SS12/1, Subang Jaya, 47500 Selangor, Malaysia</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-4 shrink-0 text-[#C8B69A]" />
                <span>+60 3-5633 8788</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-4 shrink-0 text-[#C8B69A]" />
                <span>hello@rentcm.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-serif text-sm tracking-[0.2em] uppercase text-[#E8DFD4] mb-5">Newsletter</h4>
            <p className="text-sm text-[#9C8B7A] mb-4">
              Subscribe for wellness tips, exclusive offers &amp; new arrivals.
            </p>
            <form
              onSubmit={e => e.preventDefault()}
              className="flex"
            >
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 h-10 px-3 bg-[#3A3A3A] border border-[#4A4A4A] text-xs text-[#E8DFD4] placeholder:text-[#7A6F62] focus:outline-none focus:border-[#C8B69A] rounded-none"
              />
              <button
                type="submit"
                className="h-10 px-4 bg-[#8B7355] text-white text-xs tracking-wider uppercase hover:bg-[#9C8B7A] transition-colors"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-[#4A4A4A]/60 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#7A6F62]">
            © {new Date().getFullYear()} REN TCM Apothecary. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-[#7A6F62]">
            <UniversalLink to="#" className="hover:text-[#C8B69A] transition-colors">Terms &amp; Conditions</UniversalLink>
            <UniversalLink to="#" className="hover:text-[#C8B69A] transition-colors">Privacy Notice</UniversalLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
