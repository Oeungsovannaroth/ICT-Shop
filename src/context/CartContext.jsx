import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("shoeStoreCart");
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        setCart(Array.isArray(parsed) ? parsed : []);
      }
    } catch (error) {
      console.error("Failed to load cart:", error);
      setCart([]);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("shoeStoreCart", JSON.stringify(cart));
    } catch (error) {
      console.error("Failed to save cart:", error);
      toast.error("Could not save your cart");
    }
  }, [cart]);

  // Helper: unique key for variant (id + color + size)
  const getVariantKey = (item) =>
    `${item.id}-${item.color || "no-color"}-${item.size || "no-size"}`;

  const addToCart = (newItem) => {
    if (!newItem?.id) {
      toast.error("Cannot add invalid product");
      return;
    }

    setCart((prev) => {
      const variantKey = getVariantKey(newItem);

      // Check if this exact variant already exists
      const existingIndex = prev.findIndex(
        (item) => getVariantKey(item) === variantKey
      );

      let updatedCart;

      if (existingIndex !== -1) {
        // Variant exists → increase quantity
        updatedCart = prev.map((item, idx) =>
          idx === existingIndex
            ? {
                ...item,
                quantity: item.quantity + (newItem.quantity || 1),
              }
            : item
        );
        toast.success(`+1 ${newItem.name} (${newItem.color || ""} / ${newItem.size || ""})`);
      } else {
        // New variant → add as new line item
        updatedCart = [...prev, { ...newItem, quantity: newItem.quantity || 1 }];
        toast.success(`${newItem.name} added to cart!`);
      }

      return updatedCart;
    });
  };

  const removeFromCart = (id, color, size) => {
    setCart((prev) => {
      const itemToRemove = prev.find(
        (item) =>
          item.id === id &&
          item.color === color &&
          item.size === size
      );

      if (!itemToRemove) return prev;

      const newCart = prev.filter(
        (item) =>
          !(
            item.id === id &&
            item.color === color &&
            item.size === size
          )
      );

      toast.error(`${itemToRemove.name} removed from cart`);
      return newCart;
    });
  };

  const updateQuantity = (id, color, size, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id, color, size);
      return;
    }

    setCart((prev) =>
      prev.map((item) => {
        if (
          item.id === id &&
          item.color === color &&
          item.size === size
        ) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    toast.success("Cart cleared");
  };

  // Computed values
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};