import { useState, useEffect } from "react";
import { Star, Heart, Minus, Plus, X } from "lucide-react";
import { IoCart } from "react-icons/io5";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import homeData from "../data/homeData";
import GridDataWomen from "../data/GridDataWomen";
import GridDataMen from "../data/GridDataMen";
import GridDataBoys from "../data/GridDataBoys";
import GridDataGirls from "../data/GridDataGirls";
import ZandoData from "../data/zandoData";
import ten11Data from "../data/ten11Data";
import gatoniData from "../data/gatoniData";
import sportData from "../data/sportData";
import sisburmaData from "../data/sisburmaData";
import pomeloData from "../data/pomeloData";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  // ── Find product ─────────────────────────────────────────────────────────────
  let product = null;
  const numericId = parseInt(id, 10);

  if (!isNaN(numericId)) {
    product =
      GridDataWomen.All?.find((p) => p.id === numericId) ||
      GridDataMen.All?.find((p) => p.id === numericId) ||
      GridDataBoys.All?.find((p) => p.id === numericId) ||
      GridDataGirls.All?.find((p) => p.id === numericId) ||
      ZandoData.All?.find((p) => p.id === numericId) ||
      ten11Data.All?.find((p) => p.id === numericId) ||
      gatoniData.All?.find((p) => p.id === numericId) ||
      sportData.All?.find((p) => p.id === numericId) ||
      sisburmaData.All?.find((p) => p.id === numericId) ||
      pomeloData.All?.find((p) => p.id === numericId) ||
      homeData.shoes?.find((p) => p.id === numericId) ||
      homeData.lifestyleProducts?.find((p) => p.id === numericId) ||
      homeData.driftProducts?.find((p) => p.id === numericId);
  }

  if (!product && typeof id === "string" && id.startsWith("cat-")) {
    product = homeData.categories?.find((p) => p.id === id);
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <h1 className="text-3xl font-light text-gray-800 mb-4">
            Product Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/"
            className="inline-block px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // ── State ────────────────────────────────────────────────────────────────────
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("Black");
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isFullView, setIsFullView] = useState(false);

  // ── Images ───────────────────────────────────────────────────────────────────
  const images = [
    product.img,
    product.img1,
    product.img2,
    product.frontImg,
    product.backImg,
  ].filter(Boolean);

  if (images.length === 0) {
    images.push(
      "https://via.placeholder.com/800x1000/f5f5f5/cccccc?text=No+Image",
    );
  }

  // ── Variants ─────────────────────────────────────────────────────────────────
  const availableColors = product.colors || [
    { name: "Black", hex: "#000000" },
    { name: "White", hex: "#ffffff" },
    { name: "Gray", hex: "#a0a0a0" },
    { name: "Navy", hex: "#1e3a8a" },
    { name: "Silver", hex: "#C0C0C0" },
    { name: "Red", hex: "#FF0000" },
  ];

  const isFootwear =
    product.category?.toLowerCase().includes("sneaker") ||
    product.category?.toLowerCase().includes("shoe") ||
    product.sizeType?.toLowerCase?.()?.includes("shoes") ||
    product.name?.toLowerCase().includes("sneaker") ||
    false;

  const defaultClothingSizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const defaultShoeSizes = ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"];

  const availableSizes = product.sizes || (isFootwear ? defaultShoeSizes : defaultClothingSizes);

  // Auto-select first size (optional - uncomment if you want)
  // useEffect(() => {
  //   if (availableSizes.length > 0 && !selectedSize) {
  //     setSelectedSize(availableSizes[0]);
  //   }
  // }, [availableSizes, selectedSize]);

  const discountPercentage = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  const canAddToCart = !!selectedSize && !!selectedColor && !isAdding;

  const handleAddToCart = () => {
    if (!canAddToCart) return;

    setIsAdding(true);

    try {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        oldPrice: product.oldPrice,
        img: product.img || product.img1 || product.frontImg || images[0],
        color: selectedColor,
        size: selectedSize,
        quantity,
        category: product.category,
        gender: product.gender,
        // ── Important additions for better variant handling ───────────────
        sizeType: isFootwear ? "shoes" : "clothing",
        availableSizes: availableSizes,
        // You can also pass product.colors if it exists
      });
    } catch (err) {
      console.error("Add to cart failed", err);
      alert("Failed to add item. Please try again.");
    } finally {
      setIsAdding(false);
    }
  };

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Image Gallery */}
          <div className="space-y-6">
            <div
              className="relative aspect-[4/5] sm:aspect-[3/4] bg-white rounded-2xl overflow-hidden shadow-lg cursor-zoom-in group"
              onClick={() => setIsFullView(true)}
            >
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-contain p-6 sm:p-12 transition-transform duration-700 group-hover:scale-110"
              />
              {discountPercentage && (
                <div className="absolute top-4 left-4 bg-red-600 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-md">
                  -{discountPercentage}%
                </div>
              )}
            </div>

            {images.length > 1 && (
              <div className="grid grid-cols-5 sm:grid-cols-6 gap-3">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                      selectedImage === index
                        ? "border-black scale-105 shadow-md"
                        : "border-gray-200 hover:border-gray-400 hover:scale-105"
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-8 lg:space-y-10">
            <nav className="text-sm text-gray-600">
              <Link to="/" className="hover:underline">
                Home
              </Link>{" "}
              /{" "}
              <Link
                to={`/${product.gender?.toLowerCase() || "women"}`}
                className="hover:underline capitalize"
              >
                {product.gender || "Women"}
              </Link>{" "}
              / {product.name}
            </nav>

            <div className="flex justify-between items-start gap-4">
              <h1 className="text-3xl lg:text-4xl font-light leading-tight">
                {product.name}
              </h1>
              <button
                className="p-3 hover:bg-gray-100 rounded-full transition"
                onClick={() =>
                  isInWishlist(product.id)
                    ? removeFromWishlist(product.id)
                    : addToWishlist(product)
                }
                aria-label={
                  isInWishlist(product.id)
                    ? "Remove from wishlist"
                    : "Add to wishlist"
                }
              >
                <Heart
                  className="w-7 h-7"
                  fill={isInWishlist(product.id) ? "red" : "none"}
                  stroke={isInWishlist(product.id) ? "red" : "black"}
                  strokeWidth={1.8}
                />
              </button>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-3xl lg:text-4xl font-medium">
                ${product.price?.toFixed(2)}
              </span>
              {product.oldPrice && (
                <>
                  <span className="text-xl lg:text-2xl text-gray-500 line-through">
                    ${product.oldPrice.toFixed(2)}
                  </span>
                  <span className="bg-red-600 text-white px-4 py-1.5 rounded-full text-sm font-bold">
                    -{discountPercentage}%
                  </span>
                </>
              )}
            </div>

            {/* Colors */}
            <div className="space-y-2">
              <p className="text-sm font-medium">
                Color: <span className="text-gray-700">{selectedColor}</span>
              </p>
              <div className="flex flex-wrap gap-3">
                {availableColors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-9 h-9 rounded-full transition-all duration-200 ${
                      selectedColor === color.name
                        ? "ring-2 ring-black ring-offset-2 scale-110 shadow-md"
                        : "ring-1 ring-gray-300 hover:ring-gray-400 hover:scale-105"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                    aria-label={`Select ${color.name} color`}
                  />
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-medium">
                <span>Size</span>
                <button className="text-blue-600 hover:underline text-sm">
                  Size Guide
                </button>
              </div>
              <div className="grid grid-cols-5 sm:grid-cols-7 gap-2.5">
                {availableSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 text-sm font-medium border rounded-lg transition-all duration-200 ${
                      selectedSize === size
                        ? "border-black bg-black text-white shadow-md"
                        : "border-gray-300 hover:border-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-5 pt-6">
              {/* Quantity selector */}
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white w-full sm:w-auto">
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="px-6 py-4 hover:bg-gray-50 transition disabled:opacity-40"
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-5 h-5 text-gray-700" />
                </button>
                <span className="px-8 py-4 font-semibold min-w-[80px] text-center border-x border-gray-200">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="px-6 py-4 hover:bg-gray-50 transition"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-5 h-5 text-gray-700" />
                </button>
              </div>

              {/* Add to Cart button */}
              <div className="flex-1 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={!canAddToCart}
                  className={`
                    w-full py-4.5 px-8 rounded-xl font-semibold text-base sm:text-lg
                    flex items-center justify-center gap-3 transition-all duration-300
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900
                    shadow-lg hover:shadow-xl active:scale-[0.98]
                    ${
                      !canAddToCart
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed shadow-none"
                        : isAdding
                        ? "bg-gray-800 text-white cursor-wait shadow-lg"
                        : "bg-black text-white hover:bg-gray-950"
                    }
                  `}
                >
                  <IoCart className="text-xl" />
                  {isAdding ? (
                    <span className="flex items-center gap-2.5">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Adding...
                    </span>
                  ) : !canAddToCart ? (
                    "Select Size & Color"
                  ) : (
                    "ADD TO CART"
                  )}
                </button>

                {!canAddToCart && !isAdding && (
                  <p className="text-red-600 text-sm text-center sm:text-left font-medium">
                    Please select size and color
                  </p>
                )}
              </div>
            </div>

            {/* Description & Details */}
            <div className="pt-10 border-t border-gray-200 space-y-8">
              <div>
                <h3 className="font-medium text-lg mb-3">Description</h3>
                <p className="text-gray-700 leading-relaxed">
                  Premium quality garment crafted with attention to detail.
                  Designed for comfort and style. Made from high-quality
                  materials that feel great against the skin.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-lg mb-3">Details</h3>
                <ul className="text-gray-700 space-y-2 list-disc pl-5 text-sm">
                  <li>100% Premium Cotton</li>
                  <li>Machine wash cold</li>
                  <li>Relaxed fit</li>
                  <li>Imported</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullView && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setIsFullView(false)}
        >
          <button
            className="absolute top-6 right-6 p-4 bg-white/20 backdrop-blur rounded-full text-white hover:bg-white/40 transition"
            onClick={(e) => {
              e.stopPropagation();
              setIsFullView(false);
            }}
            aria-label="Close fullscreen view"
          >
            <X className="w-7 h-7" />
          </button>
          <img
            src={images[selectedImage]}
            alt={product.name}
            className="max-w-full max-h-[90vh] object-contain"
          />
        </div>
      )}
    </div>
  );
}