import { MessageCircle } from 'lucide-react';
import { UniversalLink } from '@lark-apaas/client-toolkit-lite';

export default function WhatsAppButton() {
  return (
    <UniversalLink
      to="https://wa.me/60123456789"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 size-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:bg-[#22c55e] hover:scale-110 transition-all"
    >
      <MessageCircle className="size-7" strokeWidth={2} />
    </UniversalLink>
  );
}
