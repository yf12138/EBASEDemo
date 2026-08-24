import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { getProductImage } from '@/data/images';
import { useCart } from '@/context/CartContext';
import type { IProduct } from '@/data/products';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: IProduct;
  onView?: () => void;
}

export default function ProductCard({ product, onView }: ProductCardProps) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleView = () => {
    if (onView) {
      onView();
    } else {
      navigate(`/product/${product.id}`);
    }
  };

  return (
    <div className="group bg-white border border-[#8B7355]/15 flex flex-col hover:border-[#8B7355]/40 transition-all duration-300">
      <div
        className="relative aspect-[4/3] overflow-hidden bg-[#F5F0EB] cursor-pointer"
        onClick={handleView}
      >
        <Image
          src={getProductImage(product.imageIndex)}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3D2B1F]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 w-[80%]">
          <button
            onClick={(e) => { e.stopPropagation(); addToCart(product.id); }}
            className="w-full h-10 bg-[#3D2B1F] text-white text-[10px] tracking-[0.25em] uppercase hover:bg-[#8B7355] transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="size-3.5" />
            Add to Cart
          </button>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <button onClick={handleView} className="text-left">
          <p className="text-[10px] tracking-[0.2em] uppercase text-[#8B7355] mb-1.5">{product.category}</p>
          <h3 className="text-sm font-medium text-[#3D2B1F] leading-snug line-clamp-2 group-hover:text-[#8B7355] transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-[#8B7355] mt-1">{product.specification}</p>
        </button>
        <div className="mt-auto pt-3 flex items-center justify-between">
          <span className="font-serif text-lg text-[#3D2B1F] tabular-nums">RM {product.price.toFixed(2)}</span>
          <button
            onClick={() => addToCart(product.id)}
            className="size-8 rounded-full border border-[#8B7355]/40 text-[#5C4A3A] flex items-center justify-center hover:bg-[#3D2B1F] hover:text-white hover:border-[#3D2B1F] transition-colors"
            aria-label="Add to cart"
          >
            <Plus className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
