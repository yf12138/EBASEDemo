import { useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { getProductImage } from '@/data/images';
import { useCart } from '@/context/CartContext';
import type { IProduct } from '@/data/products';
import { toast } from 'sonner';

interface ProductModalProps {
  product: IProduct | null;
  open: boolean;
  onClose: () => void;
}

export default function ProductModal({ product, open, onClose }: ProductModalProps) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  if (!product) return null;

  const handleAdd = () => {
    addToCart(product.id, qty);
    toast.success('Added to cart', { description: `${product.name} × ${qty}` });
    setQty(1);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent className="max-w-4xl p-0 bg-[#F5F0EB] rounded-none border border-[#8B7355]/20 overflow-hidden">
        <DialogClose asChild>
          <button
            className="absolute right-4 top-4 z-10 size-9 rounded-full bg-white/80 text-[#3D2B1F] flex items-center justify-center hover:bg-white transition-colors"
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </DialogClose>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="aspect-square md:aspect-auto bg-white/50">
            <Image
              src={getProductImage(product.imageIndex)}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 md:p-8 flex flex-col">
            <p className="text-[10px] tracking-[0.25em] uppercase text-[#8B7355] mb-2">{product.category}</p>
            <h2 className="font-serif text-2xl text-[#3D2B1F] leading-tight mb-2">{product.name}</h2>
            <p className="text-sm text-[#5C4A3A] mb-4">{product.specification}</p>
            <p className="font-serif text-3xl text-[#3D2B1F] tabular-nums mb-6">RM {product.price.toFixed(2)}</p>

            <p className="text-sm text-[#5C4A3A] leading-relaxed mb-6">{product.description}</p>

            <div className="mt-auto space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-xs tracking-wider uppercase text-[#5C4A3A]">Quantity</span>
                <div className="flex items-center border border-[#8B7355]/30 bg-white/60">
                  <button
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="h-9 w-9 flex items-center justify-center text-[#5C4A3A] hover:text-[#3D2B1F] hover:bg-white/80"
                    aria-label="Decrease"
                  >
                    <Minus className="size-3.5" />
                  </button>
                  <span className="w-10 text-center text-sm text-[#3D2B1F] tabular-nums">{qty}</span>
                  <button
                    onClick={() => setQty(q => q + 1)}
                    className="h-9 w-9 flex items-center justify-center text-[#5C4A3A] hover:text-[#3D2B1F] hover:bg-white/80"
                    aria-label="Increase"
                  >
                    <Plus className="size-3.5" />
                  </button>
                </div>
              </div>

              <Button
                onClick={handleAdd}
                className="w-full h-12 bg-[#3D2B1F] hover:bg-[#2a1d14] text-white rounded-none text-xs tracking-[0.25em] uppercase"
              >
                Add to Cart — RM {(product.price * qty).toFixed(2)}
              </Button>

              <div className="text-xs text-[#8B7355] text-center">
                Free shipping on orders over RM 150
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
