import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';
import { ALL_PRODUCTS, ALL_CATEGORIES, type IProduct } from '@/data/products';
import { Button } from '@/components/ui/button';

export default function FeaturedSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const categories = ['all', ...ALL_CATEGORIES.map(c => c.slug)];
  const displayProducts = activeCategory === 'all'
    ? ALL_PRODUCTS.slice(0, 8)
    : ALL_PRODUCTS.filter(p => p.categorySlug === activeCategory).slice(0, 8);

  const handleView = (product: IProduct) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  return (
    <section className="w-full py-20 md:py-28 bg-white/40">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.3em] uppercase text-[#8B7355] mb-3">Best Sellers</p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#3D2B1F] mb-4">
            Featured Products
          </h2>
          <div className="w-16 h-px bg-[#8B7355]/50 mx-auto mb-8" />

          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-2">
            {categories.slice(0, 7).map(slug => {
              const isActive = activeCategory === slug;
              const label = slug === 'all' ? 'All' : ALL_CATEGORIES.find(c => c.slug === slug)?.name.split(' ')[0];
              return (
                <button
                  key={slug}
                  onClick={() => setActiveCategory(slug)}
                  className={`h-9 px-4 text-[10px] tracking-[0.2em] uppercase transition-colors border ${
                    isActive
                      ? 'bg-[#3D2B1F] text-white border-[#3D2B1F]'
                      : 'bg-transparent text-[#5C4A3A] border-[#8B7355]/30 hover:border-[#8B7355] hover:text-[#3D2B1F]'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {displayProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProductCard product={product} onView={() => handleView(product)} />
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/shop">
            <Button
              variant="outline"
              className="h-12 px-10 rounded-none border-[#8B7355]/50 text-[#3D2B1F] text-xs tracking-[0.25em] uppercase hover:bg-[#3D2B1F] hover:text-white hover:border-[#3D2B1F]"
            >
              View All Products
              <ArrowRight className="size-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>

      <ProductModal
        product={selectedProduct}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
}
