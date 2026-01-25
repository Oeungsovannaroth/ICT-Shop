// src/pages/Checkout.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ArrowLeft, CheckCircle } from "lucide-react";

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const { state } = useLocation();

  const [isProcessing, setIsProcessing] = useState(false);

  // Values passed from Cart page (with safe fallbacks)
  const shippingMethod = state?.shippingMethod || "standard";
  const discount = state?.discount || 0;

  const shippingCosts = {
    standard: 5,
    express: 15,
    overnight: 25,
  };

  const shippingCost = shippingCosts[shippingMethod] || 5;

  const taxRate = 0.045;
  const subtotal = cartTotal;
  const tax = subtotal * taxRate;
  const total = subtotal + shippingCost + tax - discount;

  // Redirect to cart if somehow empty
  useEffect(() => {
    if (cart.length === 0) {
      const timer = setTimeout(() => {
        navigate("/cart");
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [cart.length, navigate]);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-20">
        <div className="text-center">
          <p className="text-xl text-gray-600 animate-pulse">Redirecting to cart...</p>
        </div>
      </div>
    );
  }

  const handlePlaceOrder = () => {
    if (isProcessing) return;

    setIsProcessing(true);

    setTimeout(() => {
      // Pass data to thank-you page BEFORE clearing cart
      navigate("/ThankYou", {
        state: {
          fromCheckout: true,
          orderNumber: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
          shippingMethod,
          subtotal,
          shippingCost,
          tax,
          discount,
          total,
          orderDate: new Date().toLocaleString("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
          }),
          // cartItems: cart.map(item => ({ ...item })),   // ← uncomment if you want items list
        },
      });

      // Clear cart after navigation state is set
      clearCart();

      setIsProcessing(false);
    }, 1400); // fake processing delay
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link
            to="/cart"
            className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            BACK TO CART
          </Link>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center md:text-left">
          CHECKOUT
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left - Order items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold mb-6">Order Review</h2>

              <div className="space-y-6 divide-y divide-gray-100">
                {cart.map((item) => (
                  <div
                    key={`${item.id}-${item.color || ""}-${item.size || ""}`}
                    className="flex gap-5 py-6 first:pt-0 last:pb-0 last:border-b-0"
                  >
                    <img
                      src={item.img || item.img1 || "https://via.placeholder.com/100"}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg truncate">{item.name}</h3>
                      {item.model && (
                        <p className="text-sm text-gray-600 mt-0.5">{item.model}</p>
                      )}

                      <div className="mt-3 text-sm text-gray-600 space-y-1.5">
                        <div>Color: <span className="font-medium text-gray-800">{item.color || "—"}</span></div>
                        <div>Size: <span className="font-medium text-gray-800">{item.size || "—"}</span></div>
                        <div>Quantity: <span className="font-medium text-gray-800">{item.quantity}</span></div>
                      </div>
                    </div>
                    <div className="text-right font-medium whitespace-nowrap pt-1 text-lg">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Summary & Place Order */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4 text-gray-700">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-start">
                  <span>Shipping</span>
                  <div className="text-right">
                    <span className="font-medium">${shippingCost.toFixed(2)}</span>
                    <div className="text-xs text-gray-500 capitalize mt-0.5">
                      {shippingMethod} •{" "}
                      {shippingMethod === "standard" ? "5–7 business days" :
                       shippingMethod === "express"  ? "1–3 business days"  :
                       "Next business day"}
                    </div>
                  </div>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Estimated Tax ({(taxRate * 100).toFixed(1)}%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className={`w-full mt-8 py-4 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2 shadow-md ${
                  isProcessing
                    ? "bg-green-400 cursor-wait"
                    : "bg-green-600 hover:bg-green-700 active:bg-green-800"
                }`}
              >
                {isProcessing ? (
                  <>
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing Order...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle size={20} />
                    Place Order
                  </>
                )}
              </button>

              <p className="text-center text-sm text-gray-500 mt-6">
                Secure checkout • SSL Protected
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}