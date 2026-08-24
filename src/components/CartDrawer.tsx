import { useNavigate } from 'react-router-dom';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { getProductImage } from '@/data/images';
import { Image } from '@/components/ui/image';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { cartProducts, subtotal, shippingFee, total, updateQuantity, removeFromCart, itemCount } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <Sheet open={open} onOpenChange={v => !v && onClose()}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md bg-[#F5F0EB] border-l border-[#8B7355]/20 p-0 flex flex-col"
      >
        <SheetHeader className="p-5 border-b border-[#8B7355]/15">
          <div className="flex items-center justify-between">
            <SheetTitle className="font-serif text-lg tracking-[0.15em] uppercase text-[#3D2B1F]">
              Shopping Cart ({itemCount})
            </SheetTitle>
          </div>
        </SheetHeader>

        {cartProducts.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <ShoppingBag className="size-16 text-[#8B7355]/40 mb-4" strokeWidth={1} />
            <p className="font-serif text-[#3D2B1F] mb-2">Your cart is empty</p>
            <p className="text-sm text-[#5C4A3A] mb-6">Explore our collection of wellness herbs and tonics.</p>
            <Button
              onClick={() => { onClose(); navigate('/shop'); }}
              className="bg-[#8B7355] hover:bg-[#3D2B1F] text-white rounded-none h-11 px-8 text-xs tracking-[0.2em] uppercase"
            >
              Shop Now
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cartProducts.map(product => (
                <div key={product.id} className="flex gap-4 pb-4 border-b border-[#8B7355]/10 last:border-b-0">
                  <div className="size-20 shrink-0 overflow-hidden bg-white/50 border border-[#8B7355]/10">
                    <Image
                      src={getProductImage(product.imageIndex)}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h4 className="text-sm font-medium text-[#3D2B1F] leading-snug line-clamp-2">{product.name}</h4>
                        <p className="text-xs text-[#8B7355] mt-0.5">{product.specification}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="shrink-0 text-[#8B7355] hover:text-[#3D2B1F] transition-colors"
                        aria-label="Remove item"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center border border-[#8B7355]/30 bg-white/40">
                        <button
                          onClick={() => updateQuantity(product.id, product.quantity - 1)}
                          className="h-7 w-7 flex items-center justify-center text-[#5C4A3A] hover:text-[#3D2B1F] hover:bg-white/60 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="size-3" />
                        </button>
                        <span className="w-8 text-center text-sm text-[#3D2B1F] tabular-nums">{product.quantity}</span>
                        <button
                          onClick={() => updateQuantity(product.id, product.quantity + 1)}
                          className="h-7 w-7 flex items-center justify-center text-[#5C4A3A] hover:text-[#3D2B1F] hover:bg-white/60 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="size-3" />
                        </button>
                      </div>
                      <p className="text-sm font-medium text-[#3D2B1F] tabular-nums">
                        RM {product.lineTotal.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-[#8B7355]/15 p-5 space-y-3 bg-white/30">
              <div className="flex items-center justify-between text-sm text-[#5C4A3A]">
                <span>Subtotal</span>
                <span className="tabular-nums">RM {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-[#5C4A3A]">
                <span>Shipping</span>
                <span className="tabular-nums">
                  {shippingFee === 0 ? 'Free' : `RM ${shippingFee.toFixed(2)}`}
                </span>
              </div>
              {subtotal > 0 && subtotal < 150 && (
                <p className="text-xs text-[#8B7355]">
                  Add RM {(150 - subtotal).toFixed(2)} more for free shipping
                </p>
              )}
              <div className="flex items-center justify-between pt-2 border-t border-[#8B7355]/15">
                <span className="font-serif text-base tracking-wider text-[#3D2B1F] uppercase">Total</span>
                <span className="font-serif text-lg text-[#3D2B1F] tabular-nums">RM {total.toFixed(2)}</span>
              </div>
              <Button
                onClick={handleCheckout}
                className="w-full h-12 bg-[#3D2B1F] hover:bg-[#2a1d14] text-white rounded-none text-xs tracking-[0.25em] uppercase mt-2"
              >
                Proceed to Checkout
              </Button>
              <Button
                variant="outline"
                onClick={() => { onClose(); navigate('/shop'); }}
                className="w-full h-10 rounded-none text-xs tracking-[0.2em] uppercase border-[#8B7355]/40 text-[#5C4A3A] hover:bg-white/50"
              >
                Continue Shopping
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
