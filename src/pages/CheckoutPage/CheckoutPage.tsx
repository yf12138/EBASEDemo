import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check, CreditCard, MapPin, Package } from 'lucide-react';
import { toast } from 'sonner';

const SHIPPING_FEE_THRESHOLD = 150;
const FLAT_SHIPPING = 12;

type Step = 'shipping' | 'payment' | 'review' | 'confirmation';

interface ShippingInfo {
  fullName: string;
  phone: string;
  email: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface PaymentInfo {
  method: 'card' | 'ewallet';
  cardNumber: string;
  cardExpiry: string;
  cardCvv: string;
  cardName: string;
  ewalletProvider: string;
}

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cartProducts, subtotal, clearCart } = useCart();
  const [step, setStep] = useState<Step>('shipping');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const [shipping, setShipping] = useState<ShippingInfo>({
    fullName: '',
    phone: '',
    email: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'Malaysia',
  });

  const [payment, setPayment] = useState<PaymentInfo>({
    method: 'card',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    cardName: '',
    ewalletProvider: '',
  });

  const shippingFee = subtotal >= SHIPPING_FEE_THRESHOLD ? 0 : FLAT_SHIPPING;
  const total = subtotal + shippingFee;

  if (cartProducts.length === 0 && step !== 'confirmation') {
    return (
      <div className="min-h-[60vh] bg-[#F5F0EB] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <Package className="size-16 mx-auto mb-6 text-[#8B7355]" strokeWidth={1} />
          <h1 className="font-serif text-2xl text-[#3D2B1F] mb-3">Your cart is empty</h1>
          <p className="text-[#5C4A3A] mb-6">Add some herbal treasures before checkout.</p>
          <Link to="/shop">
            <Button className="h-11 px-8 bg-[#3D2B1F] text-white hover:bg-[#8B7355] rounded-none text-xs tracking-[0.2em] uppercase">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('review');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    // Simulated payment processing — this is a frontend prototype demo.
    // In production, replace with real order submission API and payment gateway integration.
    // The prototype demonstrates the full checkout flow UX with a realistic processing delay.
    await new Promise(r => setTimeout(r, 1800));

    // Simulate successful payment (demo mode: always succeeds for a smooth prototype experience).
    // Toggle the line below to test the failure/error state.
    const paymentSucceeded = true;

    if (paymentSucceeded) {
      const orderNum = 'REN-' + Date.now().toString().slice(-8) + '-' + Math.floor(Math.random() * 100).toString().padStart(2, '0');
      setOrderNumber(orderNum);
      clearCart();
      setStep('confirmation');
      toast.success('Order placed successfully!');
    } else {
      toast.error('Payment failed', { description: 'Please check your card details and try again.' });
    }
    setIsProcessing(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const steps = [
    { key: 'shipping', label: 'Shipping', icon: MapPin },
    { key: 'payment', label: 'Payment', icon: CreditCard },
    { key: 'review', label: 'Review', icon: Package },
    { key: 'confirmation', label: 'Confirmation', icon: Check },
  ];

  const stepIndex = steps.findIndex(s => s.key === step);

  return (
    <div className="min-h-screen bg-[#F5F0EB] py-10 md:py-14">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <Link
          to="/cart"
          className="inline-flex items-center gap-2 text-sm text-[#5C4A3A] hover:text-[#3D2B1F] mb-6"
        >
          <ArrowLeft className="size-4" />
          Back to Cart
        </Link>

        <h1 className="font-serif text-3xl md:text-4xl text-[#3D2B1F] mb-8">Checkout</h1>

        {/* Progress bar */}
        {step !== 'confirmation' && (
          <div className="flex items-center justify-between mb-10">
            {steps.slice(0, 3).map((s, i) => {
              const Icon = s.icon;
              const isActive = i === stepIndex;
              const isDone = i < stepIndex;
              return (
                <div key={s.key} className="flex items-center flex-1">
                  <div className="flex items-center gap-3">
                    <div
                      className={`size-9 flex items-center justify-center rounded-full border text-xs ${
                        isDone
                          ? 'bg-[#3D2B1F] text-white border-[#3D2B1F]'
                          : isActive
                          ? 'border-[#8B7355] text-[#8B7355] bg-white'
                          : 'border-[#8B7355]/30 text-[#8B7355]/50'
                      }`}
                    >
                      {isDone ? <Check className="size-3.5" /> : <Icon className="size-3.5" />}
                    </div>
                    <span
                      className={`hidden sm:block text-xs tracking-wider uppercase ${
                        isActive ? 'text-[#3D2B1F] font-medium' : isDone ? 'text-[#5C4A3A]' : 'text-[#8B7355]/50'
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                  {i < 2 && (
                    <div
                      className={`flex-1 h-px mx-3 ${
                        i < stepIndex ? 'bg-[#3D2B1F]' : 'bg-[#8B7355]/20'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 lg:gap-12">
          {/* Main form area */}
          <div>
            {step === 'shipping' && (
              <form onSubmit={handleShippingSubmit} className="bg-white/60 border border-[#8B7355]/15 p-6 md:p-8 space-y-5">
                <h2 className="font-serif text-xl text-[#3D2B1F] mb-2">Shipping Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="Full Name"
                    value={shipping.fullName}
                    onChange={v => setShipping({ ...shipping, fullName: v })}
                    required
                  />
                  <InputField
                    label="Phone Number"
                    value={shipping.phone}
                    onChange={v => setShipping({ ...shipping, phone: v })}
                    required
                  />
                  <InputField
                    label="Email"
                    type="email"
                    value={shipping.email}
                    onChange={v => setShipping({ ...shipping, email: v })}
                    required
                  />
                  <div className="md:col-span-2">
                    <InputField
                      label="Address Line 1"
                      value={shipping.address1}
                      onChange={v => setShipping({ ...shipping, address1: v })}
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <InputField
                      label="Address Line 2 (Optional)"
                      value={shipping.address2}
                      onChange={v => setShipping({ ...shipping, address2: v })}
                    />
                  </div>
                  <InputField
                    label="City"
                    value={shipping.city}
                    onChange={v => setShipping({ ...shipping, city: v })}
                    required
                  />
                  <InputField
                    label="State"
                    value={shipping.state}
                    onChange={v => setShipping({ ...shipping, state: v })}
                    required
                  />
                  <InputField
                    label="Postal Code"
                    value={shipping.postalCode}
                    onChange={v => setShipping({ ...shipping, postalCode: v })}
                    required
                  />
                  <div>
                    <label className="block text-xs text-[#5C4A3A] mb-1.5 tracking-wide">Country</label>
                    <input
                      value={shipping.country}
                      readOnly
                      className="w-full h-10 px-3 bg-[#F5F0EB] border border-[#8B7355]/20 text-sm text-[#3D2B1F] rounded-sm focus:outline-none focus:border-[#8B7355]"
                    />
                  </div>
                </div>
                <div className="pt-4">
                  <Button
                    type="submit"
                    className="w-full h-12 bg-[#3D2B1F] text-white hover:bg-[#8B7355] rounded-none text-xs tracking-[0.25em] uppercase"
                  >
                    Continue to Payment
                  </Button>
                </div>
              </form>
            )}

            {step === 'payment' && (
              <form onSubmit={handlePaymentSubmit} className="bg-white/60 border border-[#8B7355]/15 p-6 md:p-8 space-y-5">
                <h2 className="font-serif text-xl text-[#3D2B1F] mb-2">Payment Method</h2>

                <div className="grid grid-cols-1 gap-3 mb-6">
                  <label className={`flex items-center gap-4 p-4 border cursor-pointer transition-colors ${payment.method === 'card' ? 'border-[#8B7355] bg-white' : 'border-[#8B7355]/20 hover:border-[#8B7355]/40'}`}>
                    <input
                      type="radio"
                      name="payment"
                      checked={payment.method === 'card'}
                      onChange={() => setPayment({ ...payment, method: 'card' })}
                      className="accent-[#8B7355]"
                    />
                    <div>
                      <p className="font-medium text-sm text-[#3D2B1F]">Credit / Debit Card</p>
                      <p className="text-xs text-[#5C4A3A]">Visa, Mastercard, American Express</p>
                    </div>
                  </label>
                  <label className={`flex items-center gap-4 p-4 border cursor-pointer transition-colors ${payment.method === 'ewallet' ? 'border-[#8B7355] bg-white' : 'border-[#8B7355]/20 hover:border-[#8B7355]/40'}`}>
                    <input
                      type="radio"
                      name="payment"
                      checked={payment.method === 'ewallet'}
                      onChange={() => setPayment({ ...payment, method: 'ewallet' })}
                      className="accent-[#8B7355]"
                    />
                    <div>
                      <p className="font-medium text-sm text-[#3D2B1F]">Online Banking & E-Wallet</p>
                      <p className="text-xs text-[#5C4A3A]">GrabPay, Boost, FPX Online Banking</p>
                    </div>
                  </label>
                </div>

                {payment.method === 'card' && (
                  <div className="space-y-4 border-t border-[#8B7355]/10 pt-5">
                    <h3 className="font-serif text-base text-[#3D2B1F]">Card Details</h3>
                    <InputField
                      label="Card Number"
                      value={payment.cardNumber}
                      onChange={v => setPayment({ ...payment, cardNumber: v.replace(/\D/g, '').slice(0, 19) })}
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <InputField
                        label="Expiry Date"
                        value={payment.cardExpiry}
                        onChange={v => setPayment({ ...payment, cardExpiry: v })}
                        placeholder="MM/YY"
                        required
                      />
                      <InputField
                        label="CVV"
                        value={payment.cardCvv}
                        onChange={v => setPayment({ ...payment, cardCvv: v.replace(/\D/g, '').slice(0, 4) })}
                        placeholder="123"
                        required
                      />
                    </div>
                    <InputField
                      label="Cardholder Name"
                      value={payment.cardName}
                      onChange={v => setPayment({ ...payment, cardName: v })}
                      required
                    />
                  </div>
                )}

                {payment.method === 'ewallet' && (
                  <div className="space-y-4 border-t border-[#8B7355]/10 pt-5">
                    <h3 className="font-serif text-base text-[#3D2B1F]">Select Provider</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {['GrabPay', 'Boost', 'FPX Online Banking', 'Touch \'n Go eWallet'].map(p => (
                        <label
                          key={p}
                          className={`flex items-center justify-center p-3 border cursor-pointer text-sm transition-colors ${
                            payment.ewalletProvider === p
                              ? 'border-[#8B7355] bg-[#3D2B1F] text-white'
                              : 'border-[#8B7355]/20 text-[#5C4A3A] hover:border-[#8B7355]/40'
                          }`}
                        >
                          <input
                            type="radio"
                            name="ewallet"
                            value={p}
                            checked={payment.ewalletProvider === p}
                            onChange={() => setPayment({ ...payment, ewalletProvider: p })}
                            className="hidden"
                          />
                          {p}
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep('shipping')}
                    className="flex-1 h-12 rounded-none border-[#8B7355]/40 text-[#3D2B1F] text-xs tracking-[0.2em] uppercase hover:bg-[#8B7355]/10"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 h-12 bg-[#3D2B1F] text-white hover:bg-[#8B7355] rounded-none text-xs tracking-[0.25em] uppercase"
                  >
                    Review Order
                  </Button>
                </div>
              </form>
            )}

            {step === 'review' && (
              <div className="bg-white/60 border border-[#8B7355]/15 p-6 md:p-8 space-y-6">
                <h2 className="font-serif text-xl text-[#3D2B1F]">Order Review</h2>

                <div className="border-b border-[#8B7355]/10 pb-5">
                  <h3 className="text-xs tracking-[0.2em] uppercase text-[#8B7355] mb-3">Shipping To</h3>
                  <p className="text-sm text-[#3D2B1F] font-medium">{shipping.fullName}</p>
                  <p className="text-sm text-[#5C4A3A]">{shipping.address1}</p>
                  {shipping.address2 && <p className="text-sm text-[#5C4A3A]">{shipping.address2}</p>}
                  <p className="text-sm text-[#5C4A3A]">
                    {shipping.city}, {shipping.state} {shipping.postalCode}, {shipping.country}
                  </p>
                  <p className="text-sm text-[#5C4A3A]">Phone: {shipping.phone}</p>
                  <p className="text-sm text-[#5C4A3A]">Email: {shipping.email}</p>
                </div>

                <div className="border-b border-[#8B7355]/10 pb-5">
                  <h3 className="text-xs tracking-[0.2em] uppercase text-[#8B7355] mb-3">Payment Method</h3>
                  <p className="text-sm text-[#3D2B1F] font-medium">
                    {payment.method === 'card' ? 'Credit / Debit Card' : 'E-Wallet / Online Banking'}
                  </p>
                  <p className="text-sm text-[#5C4A3A]">
                    {payment.method === 'card'
                      ? `Card ending in ${payment.cardNumber.slice(-4) || '****'}`
                      : payment.ewalletProvider || 'To be selected'}
                  </p>
                </div>

                <div>
                  <h3 className="text-xs tracking-[0.2em] uppercase text-[#8B7355] mb-3">Items ({cartProducts.length})</h3>
                  <div className="space-y-3">
                    {cartProducts.map(item => (
                      <div key={item.id} className="flex justify-between items-start text-sm">
                        <div className="flex-1 min-w-0">
                          <p className="text-[#3D2B1F] font-medium truncate">{item.name}</p>
                          <p className="text-xs text-[#5C4A3A]">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-[#3D2B1F] shrink-0 ml-3 tabular-nums">
                          RM {item.lineTotal.toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    variant="outline"
                    onClick={() => setStep('payment')}
                    className="flex-1 h-12 rounded-none border-[#8B7355]/40 text-[#3D2B1F] text-xs tracking-[0.2em] uppercase hover:bg-[#8B7355]/10"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="flex-1 h-12 bg-[#3D2B1F] text-white hover:bg-[#8B7355] rounded-none text-xs tracking-[0.25em] uppercase disabled:opacity-60"
                  >
                    {isProcessing ? 'Processing...' : `Place Order · RM ${total.toFixed(2)}`}
                  </Button>
                </div>
              </div>
            )}

            {step === 'confirmation' && (
              <div className="bg-white/60 border border-[#8B7355]/15 p-8 md:p-12 text-center">
                <div className="size-16 mx-auto mb-6 rounded-full bg-[#3D2B1F] text-[#C8B69A] flex items-center justify-center">
                  <Check className="size-8" strokeWidth={2} />
                </div>
                <h2 className="font-serif text-2xl md:text-3xl text-[#3D2B1F] mb-2">
                  Thank You for Your Order
                </h2>
                <p className="text-[#5C4A3A] mb-6">
                  Your order has been placed successfully.
                  A confirmation email will be sent to {shipping.email || 'your email'}.
                </p>
                <div className="bg-[#F5F0EB] border border-[#8B7355]/15 p-5 mb-6 inline-block">
                  <p className="text-xs tracking-[0.2em] uppercase text-[#8B7355] mb-1">Order Number</p>
                  <p className="font-serif text-xl text-[#3D2B1F] tracking-wider">{orderNumber}</p>
                </div>
                <div className="flex flex-wrap justify-center gap-3">
                  <Link to="/shop">
                    <Button
                      variant="outline"
                      className="h-11 px-6 rounded-none border-[#8B7355]/40 text-[#3D2B1F] text-xs tracking-[0.2em] uppercase hover:bg-[#8B7355]/10"
                    >
                      Continue Shopping
                    </Button>
                  </Link>
                  <Link to="/">
                    <Button
                      className="h-11 px-6 bg-[#3D2B1F] text-white hover:bg-[#8B7355] rounded-none text-xs tracking-[0.2em] uppercase"
                    >
                      Back to Home
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Order summary sidebar */}
          {step !== 'confirmation' && (
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="bg-white/60 border border-[#8B7355]/15 p-6 space-y-4">
                <h3 className="font-serif text-lg text-[#3D2B1F] border-b border-[#8B7355]/10 pb-3">
                  Order Summary
                </h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {cartProducts.map(item => (
                    <div key={item.id} className="flex gap-3 text-sm">
                      <div className="size-12 shrink-0 bg-[#EDE5DA] border border-[#8B7355]/10" />
                      <div className="flex-1 min-w-0">
                        <p className="text-[#3D2B1F] truncate">{item.name}</p>
                        <p className="text-xs text-[#5C4A3A]">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-[#3D2B1F] shrink-0 tabular-nums">
                        RM {item.lineTotal.toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 border-t border-[#8B7355]/10 pt-4 text-sm">
                  <div className="flex justify-between text-[#5C4A3A]">
                    <span>Subtotal</span>
                    <span className="tabular-nums">RM {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#5C4A3A]">
                    <span>Shipping</span>
                    <span className="tabular-nums">
                      {shippingFee === 0 ? (
                        <span className="text-[#3D2B1F]">Free</span>
                      ) : (
                        `RM ${shippingFee.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  {subtotal < SHIPPING_FEE_THRESHOLD && (
                    <p className="text-xs text-[#8B7355]">
                      Add RM {(SHIPPING_FEE_THRESHOLD - subtotal).toFixed(2)} more for free shipping!
                    </p>
                  )}
                  <div className="flex justify-between pt-3 border-t border-[#8B7355]/10 font-medium text-[#3D2B1F]">
                    <span>Total</span>
                    <span className="tabular-nums">RM {total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
  type = 'text',
  required = false,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
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
        placeholder={placeholder}
        className="w-full h-10 px-3 bg-white border border-[#8B7355]/20 text-sm text-[#3D2B1F] rounded-sm focus:outline-none focus:border-[#8B7355]"
      />
    </div>
  );
}
