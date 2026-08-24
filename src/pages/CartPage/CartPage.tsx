import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { getProductImage } from '@/data/images';

const SHIPPING_FEE_THRESHOLD = 150;
const FLAT_SHIPPING = 12;

export default function CartPage() {
  const navigate = useNavigate();
  const { cartProducts, subtotal, updateQuantity, removeFromCart } = useCart();

  const shippingFee = subtotal >= SHIPPING_FEE_THRESHOLD ? 0 : FLAT_SHIPPING;
  const total = subtotal + shippingFee;

  if (cartProducts.length === 0) {
    return (
      <div className="min-h-[70vh] bg-[#F5F0EB] flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-md">
          <ShoppingBag className="size-16 mx-auto mb-6 text-[#8B7355]" strokeWidth={1} />
          <h1 className="font-serif text-3xl text-[#3D2B1F] mb-3">Your cart is empty</h1>
          <p className="text-[#5C4A3A] mb-8 leading-relaxed">
            Your apothecary basket awaits. Discover premium herbs, tonics and wellness treasures.
          </p>
          <Link to="/shop">
            <Button className="h-12 px-10 bg-[#3D2B1F] text-white hover:bg-[#8B7355] rounded-none text-xs tracking-[0.25em] uppercase">
              Start Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F0EB] py-10 md:py-14">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-sm text-[#5C4A3A] hover:text-[#3D2B1F] mb-6"
        >
          <ArrowLeft className="size-4" />
          Continue Shopping
        </Link>

        <h1 className="font-serif text-3xl md:text-4xl text-[#3D2B1F] mb-10">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 lg:gap-12">
          {/* Cart items */}
          <div className="space-y-4">
            {cartProducts.map((item, idx) => (
              <div
                key={item.id}
                className="flex gap-4 md:gap-6 bg-white/60 border border-[#8B7355]/15 p-4 md:p-5"
              >
                <div className="size-20 md:size-28 shrink-0 bg-[#EDE5DA] border border-[#8B7355]/10 overflow-hidden">
                  <Image
                    src={getProductImage(item.imageIndex)}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0 flex flex-col">
                  <div className="flex justify-between gap-3 mb-1">
                    <div className="min-w-0">
                      <p className="text-xs text-[#8B7355] mb-1 tracking-wide">{item.category}</p>
                      <h3 className="font-serif text-base md:text-lg text-[#3D2B1F] leading-snug mb-1">
                        {item.name}
                      </h3>
                      <p className="text-xs text-[#5C4A3A]">{item.specification}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-[#8B7355] hover:text-[#3D2B1F] shrink-0"
                      aria-label="Remove"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <div className="flex items-center border border-[#8B7355]/25">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="size-8 flex items-center justify-center text-[#5C4A3A] hover:text-[#3D2B1F] hover:bg-[#F5F0EB] transition-colors"
                        aria-label="Decrease"
                      >
                        <Minus className="size-3.5" />
                      </button>
                      <span className="w-10 text-center text-sm text-[#3D2B1F] tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="size-8 flex items-center justify-center text-[#5C4A3A] hover:text-[#3D2B1F] hover:bg-[#F5F0EB] transition-colors"
                        aria-label="Increase"
                      >
                        <Plus className="size-3.5" />
                      </button>
                    </div>
                    <p className="font-serif text-lg text-[#3D2B1F] tabular-nums">
                      RM {item.lineTotal.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="bg-white/60 border border-[#8B7355]/15 p-6 md:p-7 space-y-4">
              <h3 className="font-serif text-xl text-[#3D2B1F] border-b border-[#8B7355]/10 pb-3">
                Order Summary
              </h3>
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between text-[#5C4A3A]">
                  <span>Subtotal ({cartProducts.length} items)</span>
                  <span className="tabular-nums">RM {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#5C4A3A]">
                  <span>Shipping</span>
                  <span className="tabular-nums">
                    {shippingFee === 0 ? (
                      <span className="text-[#3D2B1F] font-medium">Free</span>
                    ) : (
                      `RM ${shippingFee.toFixed(2)}`
                    )}
                  </span>
                </div>
                {subtotal < SHIPPING_FEE_THRESHOLD && (
                  <p className="text-xs text-[#8B7355] pt-1">
                    Add RM {(SHIPPING_FEE_THRESHOLD - subtotal).toFixed(2)} more for free shipping!
                  </p>
                )}
              </div>
              <div className="flex justify-between pt-4 border-t border-[#8B7355]/10 font-medium">
                <span className="text-[#3D2B1F]">Total</span>
                <span className="font-serif text-xl text-[#3D2B1F] tabular-nums">
                  RM {total.toFixed(2)}
                </span>
              </div>
              <Button
                onClick={() => navigate('/checkout')}
                className="w-full h-12 bg-[#3D2B1F] text-white hover:bg-[#8B7355] rounded-none text-xs tracking-[0.25em] uppercase mt-2"
              >
                Proceed to Checkout
              </Button>
              <p className="text-[11px] text-center text-[#8B7355] tracking-wide">
                Secure checkout · Malaysia delivery
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
