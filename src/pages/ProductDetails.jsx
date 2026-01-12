import { useState } from "react";
import { Star, Heart, Minus, Plus, X } from "lucide-react";
import { IoCart } from "react-icons/io5";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import homeData from "../data/homeData";
import GridDataWomen from "../data/GridDataWomen";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  // Find product from all possible sources
  let product = null;

  // 1. Check GridData.All (numeric IDs)
  const numericId = parseInt(id, 10);
  if (!isNaN(numericId)) {
    product = GridDataWomen.All?.find((p) => p.id === numericId);
  }

  // 2. Fallback to homeData categories (string IDs like "cat-xxx")
  if (!product && typeof id === "string" && id.startsWith("cat-")) {
    product = homeData.categories?.find((p) => p.id === id);
  }

  // 3. Fallback to other homeData arrays (if numeric)
  if (!product && !isNaN(numericId)) {
    product =
      homeData.shoes?.find((p) => p.id === numericId) ||
      homeData.lifestyleProducts?.find((p) => p.id === numericId) ||
      homeData.driftProducts?.find((p) => p.id === numericId);
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

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("Black");
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isFullView, setIsFullView] = useState(false);

  // Collect all available images
  const images = [
    product.img,
    product.img1,
    product.img2,
    product.frontImg,
    product.backImg,
  ].filter(Boolean); // remove undefined/null

  if (images.length === 0) {
    images.push(
      "https://via.placeholder.com/800x1000/f5f5f5/cccccc?text=No+Image"
    );
  }

  const colors = [
    { name: "Black", hex: "bg-black" },
    { name: "White", hex: "bg-white border border-gray-300" },
    { name: "Gray", hex: "bg-gray-400" },
    { name: "Navy", hex: "bg-blue-900" },
  ];

  const sizes = ["XXS", "XS", "S", "M", "L", "XL", "XXL"];

  const discountPercentage = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  const totalPrice = (product.price * quantity).toFixed(2);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    addToCart({
      ...product,
      quantity,
      selectedSize,
      selectedColor,
    });

    // Optional: nice feedback
    // toast.success("Added to cart!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* === Image Gallery === */}
          <div className="space-y-6">
            <div
              className="relative aspect-[4/5] sm:aspect-[3/4] bg-white rounded-2xl overflow-hidden shadow-lg cursor-zoom-in group"
              onClick={() => setIsFullView(true)}
            >
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-contain p-8 sm:p-12 transition-transform duration-700 group-hover:scale-110"
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
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? "border-black scale-105 shadow-md"
                        : "border-gray-200 hover:border-gray-400"
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

          {/* === Product Info === */}
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
                className="p-3 hover:bg-gray-100 rounded-full transition flex-shrink-0"
                onClick={() =>
                  isInWishlist(product.id)
                    ? removeFromWishlist(product.id)
                    : addToWishlist(product)
                }
                aria-label="Toggle wishlist"
              >
                <Heart
                  className="w-7 h-7"
                  fill={isInWishlist(product.id) ? "red" : "none"}
                  stroke={isInWishlist(product.id) ? "red" : "black"}
                  strokeWidth={1.8}
                />
              </button>
            </div>

            {/* Price & Discount */}
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
            <div className="space-y-3">
              <p className="text-sm font-medium">
                Color: <span className="text-gray-700">{selectedColor}</span>
              </p>
              <div className="flex flex-wrap gap-3">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-11 h-11 rounded-full ${
                      color.hex
                    } ring-2 ring-offset-2 transition-all ${
                      selectedColor === color.name
                        ? "ring-black scale-110"
                        : "ring-transparent hover:ring-gray-300"
                    }`}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="space-y-3">
              <div className="flex justify-between text-sm font-medium">
                <span>Size</span>
                <button className="text-blue-600 hover:underline">
                  Size Guide
                </button>
              </div>
              <div className="grid grid-cols-5 sm:grid-cols-7 gap-2.5">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 text-sm font-medium border rounded-lg transition-all ${
                      selectedSize === size
                        ? "border-black bg-black text-white"
                        : "border-gray-300 hover:border-gray-600"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-5 pt-4">
              <div className="flex items-center border border-gray-300 rounded-lg w-full sm:w-auto">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-4 hover:bg-gray-100 transition"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="px-8 py-4 font-medium border-x border-gray-300 min-w-80px text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-4 hover:bg-gray-100 transition"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className={`flex-1 py-4 rounded-lg font-medium transition flex items-center justify-center gap-3 text-lg ${
                  selectedSize
                    ? "bg-black text-white hover:bg-gray-800"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <IoCart className="text-xl" />
                ADD TO CART
              </button>
            </div>

            <div className="pt-10 border-t border-gray-200 space-y-6">
              <div>
                <h3 className="font-medium mb-3">Description</h3>
                <p className="text-gray-700 leading-relaxed text-sm">
                  Premium quality garment crafted with attention to detail.
                  Designed for comfort and style. Made from high-quality
                  materials that feel great against the skin.
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-3">Details</h3>
                <ul className="text-sm text-gray-700 space-y-2 list-disc pl-5">
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

      {/* Fullscreen Image Modal */}
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
