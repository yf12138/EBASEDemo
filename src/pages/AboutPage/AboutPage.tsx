import { Image } from '@/components/ui/image';
import { PULSE_IMAGE, HERO_IMAGE } from '@/data/images';
import { motion } from 'framer-motion';
import { Leaf, Award, Heart, Sprout } from 'lucide-react';

const values = [
  { icon: Leaf, title: 'Authenticity First', desc: 'Every herb is sourced from verified origins, with full traceability from farm to bottle.' },
  { icon: Award, title: 'TCM Certified', desc: 'Formulated and curated by licensed practitioners with decades of clinical experience.' },
  { icon: Heart, title: 'Generations of Care', desc: 'A family heritage spanning three generations, rooted in the traditions of Chinese herbal medicine.' },
  { icon: Sprout, title: 'Sustainably Sourced', desc: 'Ethical wild-harvesting and organic cultivation to protect nature and ensure purity.' },
];

const milestones = [
  { year: '1952', title: 'The First Apothecary', desc: 'Our grandfather opened the first herbal shop in Kuala Lumpur, serving the local Chinese community.' },
  { year: '1978', title: 'Second Generation', desc: 'Expanded into wholesale and began importing premium herbs directly from China and Southeast Asia.' },
  { year: '2005', title: 'Modern Heritage', desc: 'Launched our flagship store and introduced lab-tested quality assurance for every batch.' },
  { year: '2024', title: 'REN Apothecary', desc: 'Rebranded as REN — bringing 70 years of TCM wisdom to a new generation of wellness seekers.' },
];

export default function AboutPage() {
  return (
    <div className="bg-[#F5F0EB]">
      {/* Hero */}
      <div className="relative w-full h-[50vh] min-h-[400px] overflow-hidden">
        <Image src={HERO_IMAGE} alt="About REN" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#3D2B1F]/60" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-[#C8B69A] mb-3">Our Story</p>
            <h1 className="font-serif text-4xl md:text-6xl text-[#F5F0EB] mb-4">
              Three Generations,<br />
              <span className="italic text-[#C8B69A]">One Tradition</span>
            </h1>
            <p className="text-[#E8DFD4]/80 max-w-xl mx-auto leading-relaxed">
              A family legacy of Traditional Chinese Medicine, brought into the modern age
              with care, quality and reverence for ancient wisdom.
            </p>
          </div>
        </div>
      </div>

      {/* Philosophy */}
      <section className="w-full py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="aspect-[4/5] overflow-hidden">
                <Image
                  src={PULSE_IMAGE}
                  alt="TCM practitioner"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-xs tracking-[0.3em] uppercase text-[#8B7355] mb-3">Our Philosophy</p>
              <h2 className="font-serif text-3xl md:text-4xl text-[#3D2B1F] leading-tight mb-6">
                Balance is not a<br />
                <span className="italic text-[#8B7355]">destination</span> — <br />
                it is a way of living.
              </h2>
              <div className="w-16 h-px bg-[#8B7355]/50 mb-8" />
              <div className="space-y-4 text-[#5C4A3A] leading-relaxed">
                <p>
                  At REN, we believe that true wellness comes from harmony — between body and mind,
                  between humanity and nature, between tradition and innovation.
                </p>
                <p>
                  Founded on the principles of Traditional Chinese Medicine, our apothecary curates
                  only the finest herbs, tonics and remedies — each chosen for its purity, potency
                  and authenticity. We work directly with farmers and herbalists who share our
                  commitment to quality and sustainability.
                </p>
                <p>
                  Every product in our collection has been carefully selected by our master
                  herbalist, drawing on knowledge passed down through three generations.
                  We don't sell supplements — we share a legacy of healing.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="w-full py-20 bg-white/40">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.3em] uppercase text-[#8B7355] mb-3">What We Stand For</p>
            <h2 className="font-serif text-3xl md:text-4xl text-[#3D2B1F] mb-4">
              Our Core Values
            </h2>
            <div className="w-16 h-px bg-[#8B7355]/50 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-[#F5F0EB] border border-[#8B7355]/15 p-6 text-center"
                >
                  <div className="size-14 mx-auto mb-5 rounded-full border border-[#8B7355]/40 flex items-center justify-center text-[#8B7355]">
                    <Icon className="size-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif text-lg text-[#3D2B1F] mb-2">{v.title}</h3>
                  <p className="text-sm text-[#5C4A3A] leading-relaxed">{v.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="w-full py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.3em] uppercase text-[#8B7355] mb-3">Heritage</p>
            <h2 className="font-serif text-3xl md:text-4xl text-[#3D2B1F] mb-4">
              Our Journey
            </h2>
            <div className="w-16 h-px bg-[#8B7355]/50 mx-auto" />
          </div>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[#8B7355]/20 md:-translate-x-1/2" />
            <div className="space-y-10">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`relative flex ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className="hidden md:block md:w-1/2" />
                  <div className="absolute left-4 md:left-1/2 top-2 size-3 -translate-x-1/2 rounded-full bg-[#8B7355] ring-4 ring-[#F5F0EB]" />
                  <div className="md:w-1/2 pl-12 md:pl-0 md:px-8">
                    <div className="bg-white/60 border border-[#8B7355]/15 p-5">
                      <p className="font-serif text-2xl text-[#8B7355] mb-1">{m.year}</p>
                      <h3 className="font-serif text-lg text-[#3D2B1F] mb-2">{m.title}</h3>
                      <p className="text-sm text-[#5C4A3A] leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
