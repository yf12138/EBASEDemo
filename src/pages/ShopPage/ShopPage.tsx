import { useState, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, Grid, List, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';
import { ALL_PRODUCTS, ALL_CATEGORIES, type IProduct } from '@/data/products';
import { Image } from '@/components/ui/image';
import { HERO_IMAGE } from '@/data/images';

export default function ShopPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const urlCategory = params.get('category') || 'all';
  const urlSearch = params.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(urlCategory);
  const [searchQuery, setSearchQuery] = useState(urlSearch);
  const [sortBy, setSortBy] = useState('featured');
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Sync with URL
  useEffect(() => {
    const cat = params.get('category') || 'all';
    const q = params.get('search') || '';
    setSelectedCategory(cat);
    setSearchQuery(q);
  }, [location.search]);

  const filtered = useMemo(() => {
    let items = [...ALL_PRODUCTS];
    if (selectedCategory !== 'all') {
      items = items.filter(p => p.categorySlug === selectedCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
    switch (sortBy) {
      case 'price-low':
        items.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        items.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        items.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
    return items;
  }, [selectedCategory, searchQuery, sortBy]);

  const currentCategoryName =
    selectedCategory === 'all'
      ? 'All Products'
      : ALL_CATEGORIES.find(c => c.slug === selectedCategory)?.name || 'All Products';

  const handleCategoryChange = (slug: string) => {
    setSelectedCategory(slug);
    const newParams = new URLSearchParams();
    if (slug !== 'all') newParams.set('category', slug);
    if (searchQuery.trim()) newParams.set('search', searchQuery.trim());
    navigate(`/shop${newParams.toString() ? `?${newParams.toString()}` : ''}`, { replace: true });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const newParams = new URLSearchParams();
    if (selectedCategory !== 'all') newParams.set('category', selectedCategory);
    if (searchQuery.trim()) newParams.set('search', searchQuery.trim());
    navigate(`/shop${newParams.toString() ? `?${newParams.toString()}` : ''}`, { replace: true });
  };

  const handleView = (product: IProduct) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  return (
    <div className="bg-[#F5F0EB]">
      {/* Page header */}
      <div className="relative w-full h-56 md:h-72 overflow-hidden">
        <Image src={HERO_IMAGE} alt="Shop" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#3D2B1F]/55" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-[#C8B69A] mb-3">Shop</p>
            <h1 className="font-serif text-3xl md:text-5xl text-[#F5F0EB]">{currentCategoryName}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8 lg:gap-12">
          {/* Sidebar Filters (desktop) */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-8">
              <div>
                <h3 className="font-serif text-base text-[#3D2B1F] mb-4 tracking-wider">Categories</h3>
                <div className="space-y-1">
                  <button
                    onClick={() => handleCategoryChange('all')}
                    className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                      selectedCategory === 'all'
                        ? 'bg-white/70 text-[#3D2B1F] font-medium border-l-2 border-[#8B7355]'
                        : 'text-[#5C4A3A] hover:bg-white/50 hover:text-[#3D2B1F]'
                    }`}
                  >
                    All Products ({ALL_PRODUCTS.length})
                  </button>
                  {ALL_CATEGORIES.map(cat => (
                    <button
                      key={cat.slug}
                      onClick={() => handleCategoryChange(cat.slug)}
                      className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                        selectedCategory === cat.slug
                          ? 'bg-white/70 text-[#3D2B1F] font-medium border-l-2 border-[#8B7355]'
                          : 'text-[#5C4A3A] hover:bg-white/50 hover:text-[#3D2B1F]'
                      }`}
                    >
                      {cat.name} ({cat.count})
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div>
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-[#8B7355]/15">
              <div className="flex items-center gap-3">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="lg:hidden h-9 rounded-none border-[#8B7355]/40 text-[#3D2B1F] text-xs tracking-wider uppercase"
                    >
                      <Filter className="size-4 mr-2" />
                      Filter
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[300px] bg-[#F5F0EB] p-0 border-r border-[#8B7355]/20">
                    <SheetHeader className="p-5 border-b border-[#8B7355]/15">
                      <SheetTitle className="font-serif text-base tracking-[0.15em] uppercase text-[#3D2B1F]">Categories</SheetTitle>
                    </SheetHeader>
                    <div className="p-4 space-y-1">
                      {['all', ...ALL_CATEGORIES.map(c => c.slug)].map(slug => {
                        const label = slug === 'all' ? `All Products (${ALL_PRODUCTS.length})` : `${ALL_CATEGORIES.find(c => c.slug === slug)?.name} (${ALL_CATEGORIES.find(c => c.slug === slug)?.count})`;
                        return (
                          <SheetClose asChild key={slug}>
                            <button
                              onClick={() => handleCategoryChange(slug)}
                              className={`w-full text-left px-3 py-2.5 text-sm transition-colors ${
                                selectedCategory === slug
                                  ? 'bg-white/70 text-[#3D2B1F] font-medium border-l-2 border-[#8B7355]'
                                  : 'text-[#5C4A3A] hover:bg-white/50 hover:text-[#3D2B1F]'
                              }`}
                            >
                              {label}
                            </button>
                          </SheetClose>
                        );
                      })}
                    </div>
                  </SheetContent>
                </Sheet>
                <p className="text-sm text-[#5C4A3A]">
                  <span className="font-medium text-[#3D2B1F]">{filtered.length}</span> products
                </p>
              </div>

              <div className="flex items-center gap-3">
                <form onSubmit={handleSearch} className="relative w-48">
                  <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-[#8B7355]" />
                  <Input
                    type="search"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="h-9 bg-white/60 border-[#8B7355]/20 text-xs pl-9 rounded-sm"
                  />
                </form>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="h-9 px-3 bg-white/60 border border-[#8B7355]/20 text-xs text-[#3D2B1F] rounded-sm focus:outline-none focus:border-[#8B7355]"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>
            </div>

            {/* Products grid */}
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="font-serif text-xl text-[#3D2B1F] mb-2">No products found</p>
                <p className="text-sm text-[#5C4A3A]">Try adjusting your search or filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {filtered.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onView={() => handleView(product)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <ProductModal
        product={selectedProduct}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
