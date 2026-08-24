import { Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { CartProvider } from "@/context/CartContext";
import HomePage from "@/pages/HomePage/HomePage";
import ShopPage from "@/pages/ShopPage/ShopPage";
import CartPage from "@/pages/CartPage/CartPage";
import CheckoutPage from "@/pages/CheckoutPage/CheckoutPage";
import AboutPage from "@/pages/AboutPage/AboutPage";
import ContactPage from "@/pages/ContactPage/ContactPage";
import NotFoundPage from "@/pages/NotFoundPage/NotFoundPage";

export default function App() {
  return (
    <CartProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="shop" element={<ShopPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </CartProvider>
  );
}
