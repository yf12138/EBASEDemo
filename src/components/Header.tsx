import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, Leaf } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { ALL_CATEGORIES } from '@/data/products';
import { useNavigate } from 'react-router-dom';
import { logger } from '@lark-apaas/client-toolkit-lite';

export default function Header() {
  const { itemCount, openCart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navLinks = [
    { to: '/', label: 'Home', end: true },
    { to: '/shop', label: 'Shop All' },
    // { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#F5F0EB]/90 backdrop-blur-md border-b border-[#8B7355]/15">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <div className="size-10 rounded-full border-2 border-[#8B7355]/60 flex items-center justify-center">
              <Leaf className="size-5 text-[#8B7355]" strokeWidth={1.5} />
            </div>
            <div className="leading-tight">
              <div className="font-serif text-lg tracking-[0.18em] text-[#3D2B1F] uppercase">Ren</div>
              <div className="text-[10px] tracking-[0.25em] text-[#8B7355] uppercase">Apothecary</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `text-xs tracking-[0.2em] uppercase transition-colors ${
                    isActive
                      ? 'text-[#3D2B1F] font-medium'
                      : 'text-[#5C4A3A] hover:text-[#3D2B1F]'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right: search + cart */}
          <div className="flex items-center gap-3">
            <form onSubmit={onSearchSubmit} className="hidden md:flex relative w-56">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-[#8B7355]" />
              <Input
                type="search"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="h-9 bg-white/60 border-[#8B7355]/20 text-xs pl-9 rounded-sm focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-[#8B7355]/60 placeholder:text-[#8B7355]/50 text-[#3D2B1F]"
              />
            </form>

            <Button
              variant="ghost"
              size="icon"
              onClick={openCart}
              className="relative h-10 w-10 text-[#3D2B1F] hover:bg-white/60"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="size-5" strokeWidth={1.5} />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 size-5 rounded-full bg-[#8B7355] text-white text-[10px] font-medium flex items-center justify-center">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </Button>

            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden h-10 w-10 text-[#3D2B1F] hover:bg-white/60" aria-label="Menu">
                  <Menu className="size-5" strokeWidth={1.5} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[320px] bg-[#F5F0EB] border-l border-[#8B7355]/20 p-0">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between p-5 border-b border-[#8B7355]/15">
                    <span className="font-serif tracking-[0.2em] text-[#3D2B1F] uppercase text-sm">Menu</span>
                    <SheetClose asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-[#3D2B1F]">
                        <X className="size-4" />
                      </Button>
                    </SheetClose>
                  </div>
                  <nav className="flex flex-col p-5 gap-1">
                    {navLinks.map(link => (
                      <SheetClose asChild key={link.to}>
                        <NavLink
                          to={link.to}
                          end={link.end}
                          className={({ isActive }) =>
                            `px-3 py-3 text-sm tracking-wider uppercase transition-colors ${
                              isActive ? 'text-[#3D2B1F] font-medium bg-white/50' : 'text-[#5C4A3A] hover:text-[#3D2B1F] hover:bg-white/40'
                            }`
                          }
                        >
                          {link.label}
                        </NavLink>
                      </SheetClose>
                    ))}
                  </nav>
                  <div className="px-5 pb-5">
                    <div className="text-[10px] tracking-[0.25em] uppercase text-[#8B7355] mb-3">Categories</div>
                    <div className="flex flex-col gap-1">
                      {ALL_CATEGORIES.map(cat => (
                        <SheetClose asChild key={cat.slug}>
                          <Link
                            to={`/shop?category=${cat.slug}`}
                            className="px-3 py-2 text-xs text-[#5C4A3A] hover:text-[#3D2B1F] hover:bg-white/40 transition-colors"
                          >
                            {cat.name}
                          </Link>
                        </SheetClose>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
