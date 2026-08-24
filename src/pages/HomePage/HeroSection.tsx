import { Link } from 'react-router-dom';
import { ArrowRight, Leaf } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { HERO_IMAGE } from '@/data/images';

export default function HeroSection() {
  return (
    <section className="relative w-full">
      <div className="relative h-[80vh] min-h-[560px] max-h-[720px] w-full overflow-hidden">
        <Image
          src={HERO_IMAGE}
          alt="TCM Apothecary"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#3D2B1F]/60 via-[#3D2B1F]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F5F0EB] via-transparent to-transparent opacity-40" />

        <div className="relative h-full max-w-7xl mx-auto px-4 md:px-6 flex items-center">
          <div className="max-w-xl text-[#F5F0EB]">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-[#C8B69A]" />
              <p className="text-xs tracking-[0.3em] uppercase text-[#C8B69A]">Since 1952 · Malaysia</p>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-6">
              Ancient Wisdom,<br />
              <span className="italic text-[#C8B69A]">Modern Wellness</span>
            </h1>
            <p className="text-base md:text-lg text-[#E8DFD4]/80 leading-relaxed mb-8 max-w-md">
              Curated Traditional Chinese Medicine — premium herbs, tonics and remedies
              for balance, vitality and lifelong well-being.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 h-12 px-8 bg-[#8B7355] text-white text-xs tracking-[0.25em] uppercase hover:bg-[#C8B69A] transition-colors"
              >
                Shop Now
                <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 h-12 px-8 border border-[#C8B69A]/60 text-[#E8DFD4] text-xs tracking-[0.25em] uppercase hover:bg-[#C8B69A]/20 transition-colors"
              >
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
