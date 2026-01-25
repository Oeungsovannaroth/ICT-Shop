// src/pages/ThankYou.jsx
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, ShoppingBag, Calendar, Package } from "lucide-react";

export default function ThankYouPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Prevent direct access
  if (!state?.fromCheckout) {
    navigate("/");
    return null;
  }

  // All values coming from Checkout page
  const {
    orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
    shippingMethod = "standard",
    subtotal = 0,
    shippingCost = 5,
    tax = 0,
    discount = 0,
    total = 0,
    orderDate = new Date().toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }),
  } = state;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Success header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6 mx-auto">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            THANK YOU FOR YOUR ORDER!!
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your order has been successfully placed. A confirmation email will be sent shortly.
          </p>
        </div>

        {/* Main confirmation card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12 border border-gray-100">
          {/* Top banner with order number & total */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-8 sm:px-10 text-white">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
              <div>
                <p className="text-sm opacity-90 mb-1">Order Number</p>
                <p className="text-2xl sm:text-3xl font-bold">{orderNumber}</p>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-90 mb-1">Order Total</p>
                <p className="text-3xl sm:text-4xl font-bold">${Number(total).toFixed(2)}</p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center sm:justify-start gap-2 text-sm opacity-90">
              <Calendar size={18} />
              <span>Placed on {orderDate}</span>
            </div>
          </div>

          {/* Breakdown */}
          <div className="p-6 sm:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              <div>
                <h3 className="font-semibold text-xl mb-5 flex items-center gap-2">
                  <Package size={20} className="text-green-600" />
                  Order Summary
                </h3>

                <div className="space-y-4 text-gray-700">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${Number(subtotal).toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Shipping ({shippingMethod})</span>
                    <span>${Number(shippingCost).toFixed(2)}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-${Number(discount).toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Estimated Tax</span>
                    <span>${Number(tax).toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between pt-4 border-t font-bold text-lg">
                    <span>Total</span>
                    <span className="text-gray-900">${Number(total).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-xl mb-5">What Happens Next?</h3>
                <ul className="space-y-4 text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Confirmation email sent (check spam folder if not received)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>We'll notify you when your order ships</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>You can track your order in your account</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-10 py-4 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition shadow-md text-lg"
          >
            <ShoppingBag className="mr-2 h-6 w-6" />
            Continue Shopping
          </Link>

          <Link
            to="/CartPage"
            className="inline-flex items-center justify-center px-10 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition text-lg"
          >
            View My Orders
          </Link>
        </div>

        <p className="text-center text-gray-500 mt-12 text-sm">
          Questions? Contact us at support@yourstore.com
        </p>
      </div>
    </div>
  );
}