import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { PULSE_IMAGE } from '@/data/images';
import { toast } from 'sonner';

const info = [
  { icon: MapPin, title: 'Visit Us', lines: ['Ground Floor, Wisma REN', '128 Jalan Petaling, 50000', 'Kuala Lumpur, Malaysia'] },
  { icon: Phone, title: 'Call Us', lines: ['+60 3-2011 8888', 'Mon - Sat: 9:00 - 18:00'] },
  { icon: Mail, title: 'Email Us', lines: ['hello@ren-apothecary.my', 'wholesale@ren-apothecary.my'] },
  { icon: Clock, title: 'Opening Hours', lines: ['Monday - Saturday', '9:00 AM - 7:00 PM', 'Sunday: 10:00 - 5:00 PM'] },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 800));
    toast.success('Message sent successfully!', { description: 'We will get back to you within 24 hours.' });
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    setSubmitting(false);
  };

  return (
    <div className="bg-[#F5F0EB]">
      {/* Hero */}
      <div className="relative w-full h-56 md:h-72 overflow-hidden">
        <Image src={PULSE_IMAGE} alt="Contact" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#3D2B1F]/60" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-[#C8B69A] mb-3">Get in Touch</p>
            <h1 className="font-serif text-3xl md:text-5xl text-[#F5F0EB]">Contact Us</h1>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-20">
        {/* Info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {info.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-white/60 border border-[#8B7355]/15 p-6 text-center"
              >
                <div className="size-12 mx-auto mb-4 rounded-full border border-[#8B7355]/40 flex items-center justify-center text-[#8B7355]">
                  <Icon className="size-5" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-base text-[#3D2B1F] mb-2">{item.title}</h3>
                {item.lines.map((line, i) => (
                  <p key={i} className="text-xs text-[#5C4A3A] leading-relaxed">{line}</p>
                ))}
              </div>
            );
          })}
        </div>

        {/* Contact form + map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-[#8B7355] mb-3">Send a Message</p>
            <h2 className="font-serif text-3xl text-[#3D2B1F] mb-2">We'd Love to Hear from You</h2>
            <p className="text-[#5C4A3A] mb-8 leading-relaxed">
              Have a question about our products, need herbal advice, or interested in wholesale?
              Fill in the form below and our TCM advisors will respond within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Your Name"
                  value={form.name}
                  onChange={v => setForm({ ...form, name: v })}
                  required
                />
                <FormField
                  label="Email Address"
                  type="email"
                  value={form.email}
                  onChange={v => setForm({ ...form, email: v })}
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Phone Number"
                  value={form.phone}
                  onChange={v => setForm({ ...form, phone: v })}
                />
                <FormField
                  label="Subject"
                  value={form.subject}
                  onChange={v => setForm({ ...form, subject: v })}
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-[#5C4A3A] mb-1.5 tracking-wide">
                  Message <span className="text-[#8B7355]">*</span>
                </label>
                <textarea
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  required
                  rows={6}
                  className="w-full px-3 py-2.5 bg-white border border-[#8B7355]/20 text-sm text-[#3D2B1F] rounded-sm focus:outline-none focus:border-[#8B7355] resize-none"
                  placeholder="How can we help you?"
                />
              </div>
              <Button
                type="submit"
                disabled={submitting}
                className="h-12 px-10 bg-[#3D2B1F] text-white hover:bg-[#8B7355] rounded-none text-xs tracking-[0.25em] uppercase"
              >
                {submitting ? 'Sending...' : 'Send Message'}
                <Send className="size-3.5 ml-2" />
              </Button>
            </form>
          </div>

          {/* Map / Image */}
          <div className="space-y-4">
            <div className="aspect-[4/3] bg-[#EDE5DA] border border-[#8B7355]/15 overflow-hidden">
              <Image
                src={PULSE_IMAGE}
                alt="Our store"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-white/60 border border-[#8B7355]/15 p-6">
              <h3 className="font-serif text-lg text-[#3D2B1F] mb-3">TCM Consultation</h3>
              <p className="text-sm text-[#5C4A3A] leading-relaxed mb-4">
                We offer complimentary in-store consultations with our licensed TCM physicians.
                Book a 30-minute session to receive personalized herbal recommendations
                based on your constitution and wellness goals.
              </p>
              <p className="text-sm text-[#8B7355]">
                To book, call us at <span className="font-medium">+60 3-2011 8888</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FormField({
  label,
  value,
  onChange,
  type = 'text',
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs text-[#5C4A3A] mb-1.5 tracking-wide">
        {label} {required && <span className="text-[#8B7355]">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        required={required}
        className="w-full h-10 px-3 bg-white border border-[#8B7355]/20 text-sm text-[#3D2B1F] rounded-sm focus:outline-none focus:border-[#8B7355]"
      />
    </div>
  );
}
