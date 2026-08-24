import { Link } from 'react-router-dom';
import {
  Leaf,
  Crown,
  Pill,
  Soup,
  Coffee,
  FlaskConical,
  PillBottle,
  HeartPulse,
  Flame,
  UtensilsCrossed,
  Sparkles,
  Baby,
} from 'lucide-react';
import { ALL_CATEGORIES } from '@/data/products';
import { motion } from 'framer-motion';

const CATEGORY_ICONS = [
  Leaf,
  Crown,
  Pill,
  Soup,
  Coffee,
  FlaskConical,
  PillBottle,
  HeartPulse,
  Flame,
  UtensilsCrossed,
  Sparkles,
  Baby,
];

export default function CategoriesSection() {
  return (
    <section className="w-full py-20 md:py-28 bg-[#F5F0EB]">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-14 md:mb-18">
          <p className="text-xs tracking-[0.3em] uppercase text-[#8B7355] mb-3">Our Collection</p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#3D2B1F] mb-4">
            Twelve Categories of Wellness
          </h2>
          <div className="w-16 h-px bg-[#8B7355]/50 mx-auto" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-[#8B7355]/15 border border-[#8B7355]/15">
          {ALL_CATEGORIES.map((cat, i) => {
            const Icon = CATEGORY_ICONS[cat.iconIndex % CATEGORY_ICONS.length];
            return (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
              >
                <Link
                  to={`/shop?category=${cat.slug}`}
                  className="group block p-6 md:p-8 bg-[#F5F0EB] hover:bg-white transition-all duration-300 h-full"
                >
                  <div className="size-12 mb-4 rounded-full border border-[#8B7355]/30 flex items-center justify-center text-[#8B7355] group-hover:bg-[#3D2B1F] group-hover:text-[#C8B69A] group-hover:border-[#3D2B1F] transition-all duration-300">
                    <Icon className="size-5" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif text-base text-[#3D2B1F] mb-1.5 leading-snug group-hover:text-[#8B7355] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#8B7355] mb-3">{cat.count} products</p>
                  <p className="text-xs text-[#5C4A3A] leading-relaxed line-clamp-2 opacity-70 group-hover:opacity-100 transition-opacity">
                    {cat.description}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
