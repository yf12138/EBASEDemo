import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { useCart } from '@/context/CartContext';
import { Toaster } from 'sonner';

export function Layout() {
  const { isCartOpen, closeCart } = useCart();

  return (
    <div className="min-h-screen bg-[#F5F0EB] text-[#3D2B1F] font-sans">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer open={isCartOpen} onClose={closeCart} />
      <WhatsAppButton />
      <Toaster
        position="top-right"
        theme="light"
        toastOptions={{
          style: {
            background: '#F5F0EB',
            border: '1px solid rgba(139, 115, 85, 0.2)',
            color: '#3D2B1F',
            borderRadius: '0',
          },
        }}
      />
    </div>
  );
}
