import { Link } from 'react-router-dom';
import { Image } from '@/components/ui/image';
import { PULSE_IMAGE } from '@/data/images';
import { Shield, Truck, Award, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  { icon: Shield, title: 'Authentic Herbs', desc: 'Sourced directly from certified origins, rigorously tested for purity.' },
  { icon: Truck, title: 'Free Shipping', desc: 'Complimentary delivery on all orders over RM 150 within Malaysia.' },
  { icon: Award, title: 'TCM Certified', desc: 'Curated by licensed Traditional Chinese Medicine practitioners.' },
  { icon: Leaf, title: 'Natural & Pure', desc: 'No artificial additives, preservatives or hidden fillers.' },
];

export default function ValuesSection() {
  return (
    <section className="w-full py-20 md:py-28 bg-[#EDE5DA]">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden bg-[#D4C6B4]">
              <Image
                src={PULSE_IMAGE}
                alt="TCM pulse diagnosis"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 md:-bottom-8 md:-right-8 bg-[#3D2B1F] text-[#C8B69A] p-6 md:p-8 max-w-[220px]">
              <p className="font-serif text-4xl md:text-5xl mb-1">70+</p>
              <p className="text-xs tracking-[0.2em] uppercase leading-relaxed">
                Years of TCM Heritage
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-xs tracking-[0.3em] uppercase text-[#8B7355] mb-3">Our Promise</p>
            <h2 className="font-serif text-3xl md:text-4xl text-[#3D2B1F] leading-tight mb-4">
              Heritage of Healing,<br />
              <span className="italic text-[#8B7355]">Rooted in Nature</span>
            </h2>
            <div className="w-16 h-px bg-[#8B7355]/50 mb-8" />
            <p className="text-base text-[#5C4A3A] leading-relaxed mb-10 max-w-lg">
              At REN Apothecary, we blend time-honored Traditional Chinese Medicine wisdom
              with modern quality standards. Every product is hand-selected, traceable
              and prepared with the same care our family has practiced for generations.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <div key={f.title} className="flex gap-3">
                    <div className="size-10 shrink-0 rounded-full border border-[#8B7355]/40 flex items-center justify-center text-[#8B7355]">
                      <Icon className="size-4.5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="font-serif text-[#3D2B1F] mb-1">{f.title}</h4>
                      <p className="text-xs text-[#5C4A3A] leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Link
              to="/about"
              className="inline-flex items-center gap-2 mt-10 h-11 px-7 border border-[#8B7355]/50 text-[#3D2B1F] text-xs tracking-[0.25em] uppercase hover:bg-[#3D2B1F] hover:text-white hover:border-[#3D2B1F] transition-colors"
            >
              Learn Our Story
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
