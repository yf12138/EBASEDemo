import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { scopedStorage } from '@lark-apaas/client-toolkit-lite';
import { getProductById, type IProduct } from '@/data/products';

export interface CartItem {
  productId: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (productId: string, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  shippingFee: number;
  total: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  getProductInCart: (productId: string) => (IProduct & { quantity: number }) | null;
  cartProducts: (IProduct & { quantity: number; lineTotal: number })[];
}

const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = 'ren-tcm-cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = scopedStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    scopedStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = (productId: string, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.productId === productId);
      if (existing) {
        return prev.map(i =>
          i.productId === productId ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { productId, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setItems(prev => prev.filter(i => i.productId !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems(prev =>
      prev.map(i => (i.productId === productId ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  const cartProducts = items
    .map(item => {
      const product = getProductById(item.productId);
      if (!product) return null;
      return {
        ...product,
        quantity: item.quantity,
        lineTotal: product.price * item.quantity,
      };
    })
    .filter((i): i is IProduct & { quantity: number; lineTotal: number } => i !== null);

  const subtotal = cartProducts.reduce((sum, p) => sum + p.lineTotal, 0);
  const shippingFee = subtotal > 0 && subtotal < 150 ? 12 : 0;
  const total = subtotal + shippingFee;

  const getProductInCart = (productId: string) => {
    const item = items.find(i => i.productId === productId);
    const product = getProductById(productId);
    if (!item || !product) return null;
    return { ...product, quantity: item.quantity };
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        shippingFee,
        total,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        toggleCart: () => setIsCartOpen(v => !v),
        getProductInCart,
        cartProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
