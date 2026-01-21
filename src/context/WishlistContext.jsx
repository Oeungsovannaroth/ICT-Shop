import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const WishlistContext = createContext(null);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within WishlistProvider");
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem("ictShopWishlist");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Failed to load wishlist from localStorage:", error);
      return [];
    }
  });

  // Sync wishlist → localStorage
  useEffect(() => {
    try {
      localStorage.setItem("ictShopWishlist", JSON.stringify(wishlist));
    } catch (error) {
      console.error("Failed to save wishlist to localStorage:", error);
    }
  }, [wishlist]);

  const addToWishlist = (product) => {
    if (!product?.id) {
      toast.error("Invalid product");
      return;
    }

    setWishlist((prev) => {
      if (prev.some((item) => item.id === product.id)) {
        toast("Already in wishlist", {
          icon: "ℹ️",
        });
        return prev;
      }

      toast.success(`Added ${product.name || "item"} to wishlist`);
      return [...prev, { ...product }]; // safe copy
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => {
      const newWishlist = prev.filter((item) => item.id !== id);
      if (newWishlist.length === prev.length) {
        toast("Item not found in wishlist");
        return prev;
      }
      toast.success("Removed from wishlist");
      return newWishlist;
    });
  };

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const isInWishlist = (id) => wishlist.some((item) => item.id === id);

  const clearWishlist = () => {
    setWishlist([]);
    toast.success("Wishlist cleared");
  };

  const value = {
    wishlist,
    wishlistCount: wishlist.length,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,       // ← very useful for heart buttons
    isInWishlist,
    clearWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};