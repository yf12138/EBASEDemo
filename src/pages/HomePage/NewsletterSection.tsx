import { Mail } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success('Thank you for subscribing!', { description: 'Welcome to the REN wellness circle.' });
      setEmail('');
    }
  };

  return (
    <section className="w-full py-20 bg-[#3D2B1F] text-[#E8DFD4]">
      <div className="max-w-3xl mx-auto px-4 md:px-6 text-center">
        <Mail className="size-10 mx-auto mb-6 text-[#C8B69A]" strokeWidth={1} />
        <h2 className="font-serif text-3xl md:text-4xl mb-4">
          Join the Wellness Circle
        </h2>
        <p className="text-[#C8B69A] mb-8 max-w-lg mx-auto leading-relaxed">
          Subscribe for exclusive offers, seasonal wellness guides,
          and first access to new arrivals — delivered to your inbox.
        </p>
        <form onSubmit={handleSubmit} className="flex max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            placeholder="Your email address"
            className="flex-1 h-12 px-4 bg-[#2a1d14] border border-[#8B7355]/40 text-sm text-[#E8DFD4] placeholder:text-[#8B7355]/60 focus:outline-none focus:border-[#C8B69A] rounded-none"
          />
          <button
            type="submit"
            className="h-12 px-6 bg-[#8B7355] text-white text-xs tracking-[0.2em] uppercase hover:bg-[#C8B69A] transition-colors"
          >
            Subscribe
          </button>
        </form>
        <p className="text-xs text-[#8B7355] mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}
