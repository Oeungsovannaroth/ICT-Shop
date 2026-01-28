import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Trash2,
  Plus,
  Minus,
  ChevronDown,
  ChevronUp,
  Edit,
  X,
  Check,
} from "lucide-react";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    addToCart,
    cartTotal,
    clearCart,
  } = useCart();

  const [shippingMethod, setShippingMethod] = useState("standard");
  const [promoCode, setPromoCode] = useState("");
  const [promoMessage, setPromoMessage] = useState("");
  const [promoValid, setPromoValid] = useState(false);
  const [discount, setDiscount] = useState(0);

  const [descriptionStates, setDescriptionStates] = useState(
    cart.reduce((acc, item) => {
      acc[`${item.id}-${item.color || ""}-${item.size || ""}`] = {
        show: false,
        editing: false,
        original: item.description || "",
      };
      return acc;
    }, {})
  );

  const updateDescriptionState = (key, updates) => {
    setDescriptionStates((prev) => ({
      ...prev,
      [key]: { ...prev[key], ...updates },
    }));
  };

  const subtotal = cartTotal;
  const shippingCosts = {
    standard: 5,
    express: 15,
    overnight: 25,
  };
  const navigate = useNavigate();
  const shippingCost = shippingCosts[shippingMethod] || 5;
  const taxRate = 0.075;
  const tax = (subtotal - discount) * taxRate;
  const total = subtotal + shippingCost + tax - discount;

  // ── Variant helpers ──────────────────────────────────────────────────────────
  const getAvailableColors = (item) => {
    // You can later use item.colors if you pass it from product
    return ["Black", "Silver", "Red", "White", "Navy", "Gray"];
  };

  const getColorHex = (color) => {
    const map = {
      Black: "#000000",
      Silver: "#C0C0C0",
      Red: "#FF0000",
      White: "#FFFFFF",
      Navy: "#000080",
      Gray: "#808080",
    };
    return map[color] || "#000000";
  };

  const getAvailableSizes = (item) => {
    if (item.sizeType === "shoes") {
      return [
        "36", "37", "38", "39", "40",
        "41", "42", "43", "44", "45",
      ];
    }

    // Fallback / clothing / default
    if (item.availableSizes && Array.isArray(item.availableSizes)) {
      return item.availableSizes;
    }

    return ["XS", "S", "M", "L", "XL", "XXL"];
  };

  const handleVariantChange = (item, newColor, newSize) => {
    const updatedColor = newColor || item.color;
    const updatedSize = newSize || item.size;

    if (updatedColor === item.color && updatedSize === item.size) {
      return;
    }

    removeFromCart(item.id, item.color, item.size);

    addToCart({
      ...item,
      color: updatedColor,
      size: updatedSize,
      quantity: item.quantity,
    });
  };

  const hasMissingVariant = cart.some((item) => !item.color || !item.size);

  const applyPromoCode = () => {
    const codes = {
      SAVE10: { discount: 0.1, message: "10% discount applied!" },
      FREESHIP: { discount: 0, message: "Free shipping!", freeShipping: true },
      WELCOME20: { discount: 0.2, message: "20% discount applied!" },
      NEW: { discount: 0.3, message: "30% discount applied!" },
    };

    const code = promoCode.trim().toUpperCase();
    if (!code) {
      setPromoMessage("Please enter a promo code");
      setPromoValid(false);
      return;
    }

    const promo = codes[code];
    if (promo) {
      setPromoValid(true);
      setPromoMessage(promo.message);
      setDiscount(promo.discount ? subtotal * promo.discount : 0);
      if (promo.freeShipping) setShippingMethod("standard");
    } else {
      setPromoValid(false);
      setPromoMessage("Invalid promo code");
      setDiscount(0);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10 text-center">
            SHOPPING CART
          </h1>
          <div className="bg-white rounded-xl shadow-lg p-10 text-center">
            <Trash2 className="mx-auto h-20 w-20 text-gray-300 mb-6" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added any products yet.
            </p>
            <Link
              to="/"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            SHOPPING CART ({cart.length} {cart.length === 1 ? "item" : "items"})
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Mobile / Card View */}
            <div className="lg:hidden space-y-5">
              {cart.map((item) => {
                const key = `${item.id}-${item.color || ""}-${item.size || ""}`;
                const state = descriptionStates[key] || {
                  show: false,
                  editing: false,
                };

                return (
                  <div
                    key={key}
                    className="bg-white rounded-xl shadow-md p-5"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-start space-x-4">
                        <img
                          src={
                            item.img ||
                            item.img1 ||
                            "https://via.placeholder.com/100"
                          }
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div>
                          <h3 className="font-semibold text-lg">{item.name}</h3>
                          {item.model && (
                            <p className="text-sm text-gray-600">
                              {item.model}
                            </p>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          removeFromCart(item.id, item.color, item.size)
                        }
                        className="text-red-600 hover:text-red-800 p-2"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>

                    <div className="space-y-3 text-sm">
                      {/* Color */}
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Color:</span>
                        <div className="flex items-center gap-2">
                          <select
                            value={item.color || ""}
                            onChange={(e) =>
                              handleVariantChange(
                                item,
                                e.target.value,
                                item.size
                              )
                            }
                            className="border rounded px-2 py-1 text-sm min-w-[130px]"
                          >
                            <option value="">Select color</option>
                            {getAvailableColors(item).map((c) => (
                              <option key={c} value={c}>
                                {c}
                              </option>
                            ))}
                          </select>
                          {item.color && (
                            <div
                              className="w-5 h-5 rounded-full border shadow-sm"
                              style={{ backgroundColor: getColorHex(item.color) }}
                            />
                          )}
                        </div>
                      </div>

                      {/* Size – now dynamic */}
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Size:</span>
                        <select
                          value={item.size || ""}
                          onChange={(e) =>
                            handleVariantChange(
                              item,
                              item.color,
                              e.target.value
                            )
                          }
                          className="border rounded px-2 py-1 text-sm min-w-[130px]"
                        >
                          <option value="">Select size</option>
                          {getAvailableSizes(item).map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Quantity */}
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Quantity:</span>
                        <div className="flex items-center border rounded">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.color,
                                item.size,
                                item.quantity - 1
                              )
                            }
                            className="px-3 py-1 hover:bg-gray-100"
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-12 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.color,
                                item.size,
                                item.quantity + 1
                              )
                            }
                            className="px-3 py-1 hover:bg-gray-100"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-gray-600">Price per unit:</span>
                        <span>${Number(item.price).toFixed(2)}</span>
                      </div>

                      <div className="flex justify-between font-bold">
                        <span>Total:</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>

                      {/* Description */}
                      <div className="pt-2 border-t">
                        <button
                          onClick={() =>
                            updateDescriptionState(key, { show: !state.show })
                          }
                          className="text-blue-600 text-sm flex items-center"
                        >
                          {state.show ? "Hide" : "Show"} Description
                          {state.show ? (
                            <ChevronUp size={16} className="ml-1" />
                          ) : (
                            <ChevronDown size={16} className="ml-1" />
                          )}
                        </button>

                        {state.show && (
                          <div className="mt-3">
                            {state.editing ? (
                              <div>
                                <textarea
                                  value={item.description || ""}
                                  onChange={() => {}}
                                  className="w-full border rounded p-2 text-sm min-h-[80px]"
                                />
                                <div className="flex justify-end gap-2 mt-2">
                                  <button
                                    onClick={() =>
                                      updateDescriptionState(key, {
                                        editing: false,
                                      })
                                    }
                                    className="px-3 py-1 border rounded text-sm"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    onClick={() =>
                                      updateDescriptionState(key, {
                                        editing: false,
                                      })
                                    }
                                    className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
                                  >
                                    Save
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div>
                                <p className="text-sm text-gray-700">
                                  {item.description ||
                                    "No description available."}
                                </p>
                                <button
                                  onClick={() =>
                                    updateDescriptionState(key, {
                                      editing: true,
                                    })
                                  }
                                  className="text-xs text-blue-600 mt-2 flex items-center"
                                >
                                  <Edit size={14} className="mr-1" /> Edit
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block bg-white rounded-xl shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-4 px-6 text-left font-semibold text-gray-700">
                      Product
                    </th>
                    <th className="py-4 px-6 text-left font-semibold text-gray-700">
                      Details
                    </th>
                    <th className="py-4 px-6 text-center font-semibold text-gray-700">
                      Quantity
                    </th>
                    <th className="py-4 px-6 text-right font-semibold text-gray-700">
                      Price
                    </th>
                    <th className="py-4 px-6 text-right font-semibold text-gray-700">
                      Total
                    </th>
                    <th className="py-4 px-6 text-center font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => {
                    const key = `${item.id}-${item.color || ""}-${item.size || ""}`;
                    const state = descriptionStates[key] || {
                      show: false,
                      editing: false,
                    };

                    return (
                      <React.Fragment key={key}>
                        <tr className="border-t hover:bg-gray-50 transition">
                          <td className="py-5 px-6">
                            <div className="flex items-center space-x-4">
                              <img
                                src={
                                  item.img ||
                                  item.img1 ||
                                  "https://via.placeholder.com/80"
                                }
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded"
                              />
                              <div>
                                <div className="font-medium">{item.name}</div>
                                {item.model && (
                                  <div className="text-sm text-gray-600">
                                    {item.model}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>

                          <td className="py-5 px-6">
                            <div className="space-y-3 text-sm">
                              <div className="flex items-center gap-2">
                                <span className="text-gray-600 w-16">Color:</span>
                                <select
                                  value={item.color || ""}
                                  onChange={(e) =>
                                    handleVariantChange(
                                      item,
                                      e.target.value,
                                      item.size
                                    )
                                  }
                                  className="border rounded px-2 py-1 text-sm"
                                >
                                  <option value="">Select</option>
                                  {getAvailableColors(item).map((c) => (
                                    <option key={c} value={c}>
                                      {c}
                                    </option>
                                  ))}
                                </select>
                                {item.color && (
                                  <div
                                    className="w-4 h-4 rounded-full border"
                                    style={{ backgroundColor: getColorHex(item.color) }}
                                  />
                                )}
                              </div>

                              <div className="flex items-center gap-2">
                                <span className="text-gray-600 w-16">Size:</span>
                                <select
                                  value={item.size || ""}
                                  onChange={(e) =>
                                    handleVariantChange(
                                      item,
                                      item.color,
                                      e.target.value
                                    )
                                  }
                                  className="border rounded px-2 py-1 text-sm"
                                >
                                  <option value="">Select</option>
                                  {getAvailableSizes(item).map((s) => (
                                    <option key={s} value={s}>
                                      {s}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </td>

                          <td className="py-5 px-6 text-center">
                            <div className="inline-flex items-center border rounded">
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.id,
                                    item.color,
                                    item.size,
                                    item.quantity - 1
                                  )
                                }
                                className="px-3 py-2 hover:bg-gray-100"
                                disabled={item.quantity <= 1}
                              >
                                <Minus size={14} />
                              </button>
                              <span className="px-4 font-medium">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.id,
                                    item.color,
                                    item.size,
                                    item.quantity + 1
                                  )
                                }
                                className="px-3 py-2 hover:bg-gray-100"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                          </td>

                          <td className="py-5 px-6 text-right font-medium">
                            ${Number(item.price).toFixed(2)}
                          </td>

                          <td className="py-5 px-6 text-right font-bold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </td>

                          <td className="py-5 px-6 text-center">
                            <button
                              onClick={() =>
                                removeFromCart(item.id, item.color, item.size)
                              }
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>

                        {state.show && (
                          <tr className="bg-gray-50">
                            <td colSpan={6} className="py-4 px-6">
                              {state.editing ? (
                                <div>
                                  <textarea
                                    className="w-full border rounded p-3 text-sm min-h-[90px]"
                                    defaultValue={item.description || ""}
                                  />
                                  <div className="flex justify-end gap-3 mt-3">
                                    <button
                                      onClick={() =>
                                        updateDescriptionState(key, {
                                          editing: false,
                                        })
                                      }
                                      className="px-4 py-2 border rounded text-sm"
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      onClick={() =>
                                        updateDescriptionState(key, {
                                          editing: false,
                                        })
                                      }
                                      className="px-4 py-2 bg-blue-600 text-white rounded text-sm"
                                    >
                                      Save
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div>
                                  <p className="text-gray-700">
                                    {item.description ||
                                      "No description provided."}
                                  </p>
                                  <button
                                    onClick={() =>
                                      updateDescriptionState(key, {
                                        editing: true,
                                      })
                                    }
                                    className="text-sm text-blue-600 mt-2 flex items-center"
                                  >
                                    <Edit size={14} className="mr-1" /> Edit
                                    Description
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
              <h2 className="text-xl font-bold mb-6 text-center">
                ORDER SUMMARY
              </h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className="font-medium">
                    ${shippingCost.toFixed(2)}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-700">
                  <span>Estimated Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="font-semibold mb-3">Shipping Method</h3>
                <div className="space-y-3">
                  {["standard", "express", "overnight"].map((method) => (
                    <label
                      key={method}
                      className={`flex items-center p-3 border rounded-lg cursor-pointer transition ${
                        shippingMethod === method
                          ? "border-blue-500 bg-blue-50"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="shipping"
                        value={method}
                        checked={shippingMethod === method}
                        onChange={() => setShippingMethod(method)}
                        className="mr-3"
                      />
                      <div className="flex-1">
                        <div className="font-medium capitalize">{method}</div>
                        <div className="text-sm text-gray-600">
                          {method === "standard" && "5–7 business days"}
                          {method === "express" && "1–3 business days"}
                          {method === "overnight" && "Next business day"}
                        </div>
                      </div>
                      <div className="font-medium">
                        ${shippingCosts[method].toFixed(2)}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h3 className="font-semibold mb-3">Promo Code</h3>
                <div className="flex">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={applyPromoCode}
                    className="bg-blue-600 text-white px-5 rounded-r-lg hover:bg-blue-700 transition"
                  >
                    Apply
                  </button>
                </div>
                {promoMessage && (
                  <p
                    className={`mt-2 text-sm ${
                      promoValid ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {promoMessage}
                  </p>
                )}
              </div>

              <button
                disabled={hasMissingVariant}
                onClick={() =>
                  navigate("/checkout", {
                    state: {
                      shippingMethod,
                      discount,
                      promoCode,
                    },
                  })
                }
                className={`w-full py-4 rounded-xl font-semibold transition mb-6 ${
                  hasMissingVariant
                    ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {hasMissingVariant
                  ? "Please select color & size for all items"
                  : "Proceed to Checkout"}
              </button>

              <div className="flex flex-col sm:flex-row justify-between text-sm text-gray-600">
                <Link to="/" className="flex items-center hover:text-blue-600">
                  ← Continue Shopping
                </Link>
                <button
                  onClick={() => {
                    if (window.confirm("Clear entire cart?")) clearCart();
                  }}
                  className="text-red-600 hover:text-red-800 flex items-center mt-3 sm:mt-0"
                >
                  <Trash2 size={16} className="mr-1" /> Clear Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}