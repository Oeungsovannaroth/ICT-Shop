import React, { useState } from "react";
import {
  Star,
  Heart,
  Minus,
  Plus,
  X,
} from "lucide-react";
import { useParams, Link } from "react-router-dom";
import homeData from "../data/homeData";

export default function ProductDetails() {
  const { id } = useParams();

  let product = null;

  if (typeof id === "string" && id.startsWith("cat-")) {
    product = homeData.categories.find((p) => p.id === id);
  }

  const numericId = parseInt(id, 10);
  if (!product && !isNaN(numericId)) {
    product =
      homeData.shoes.find((p) => p.id === numericId) ||
      homeData.lifestyleProducts.find((p) => p.id === numericId) ||
      homeData.driftProducts.find((p) => p.id === numericId);
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light text-gray-800 mb-4">Product Not Found</h1>
          <Link to="/" className="text-blue-600 hover:underline">
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

  const images = [];
  if (product.frontImg) images.push(product.frontImg);
  if (product.backImg) images.push(product.backImg);
  if (product.img1) images.push(product.img1);
  if (product.img2) images.push(product.img2);
  if (product.img) images.push(product.img);

  if (images.length === 0) {
    images.push("https://via.placeholder.com/800x1000/f5f5f5/cccccc?text=No+Image");
  }

  const colors = [
    { name: "Black", hex: "bg-black" },
    { name: "White", hex: "bg-white border-2 border-gray-300" },
    { name: "Gray", hex: "bg-gray-400" },
    { name: "Navy", hex: "bg-blue-900" },
  ];

  const sizes = ["XXS", "XS", "S", "M", "L", "XL"];

  const currentPrice = product.price?.toFixed(2);
  const oldPrice = product.oldPrice || null;
  const discount = product.discount || null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-10 lg:px-10 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Image Gallery - Compact */}
          <div className="space-y-4">
            {/* Main Image */}
            <div
              className="relative aspect-[4/5] bg-white rounded-xl overflow-hidden shadow-md cursor-zoom-in"
              onClick={() => setIsFullView(true)}
            >
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* Thumbnails - Small & Horizontal */}
            {images.length > 1 && (
              <div className="grid grid-cols-6 gap-3">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border transition-all ${
                      selectedImage === index
                        ? "border-black shadow"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info - Compact & Clean */}
          <div className="space-y-8">
            {/* Breadcrumb */}
            <nav className="text-sm text-gray-500">
              <Link to="/" className="hover:underline">Home</Link> / {product.name}
            </nav>

            {/* Title + Heart */}
            <div className="flex justify-between items-start">
              <h1 className="text-3xl lg:text-4xl font-light leading-tight">
                {product.name || "Product Name"}
              </h1>
              <button className="p-2 hover:bg-gray-100 rounded-full transition">
                <Heart className="w-6 h-6" />
              </button>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 fill-black text-black" />
                ))}
              </div>
              <span className="text-sm underline">122 reviews</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              {oldPrice && (
                <span className="text-xl text-gray-500 line-through">
                  ${oldPrice.toFixed(2)}
                </span>
              )}
              <span className="text-3xl font-medium">${currentPrice}</span>
              {discount && (
                <span className="bg-red-600 text-white px-3 py-1 rounded text-sm font-semibold">
                  {discount}
                </span>
              )}
            </div>

            {/* Color */}
            <div className="space-y-3">
              <p className="text-sm">
                Color: <span className="font-medium">{selectedColor}</span>
              </p>
              <div className="flex gap-4">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-10 h-10 rounded-full ${color.hex} ring-2 ring-offset-2 transition-all ${
                      selectedColor === color.name
                        ? "ring-black"
                        : "ring-transparent hover:ring-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Size</span>
                <button className="underline">Size Guide</button>
              </div>
              <div className="grid grid-cols-6 gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 border text-sm font-medium rounded transition-all ${
                      selectedSize === size
                        ? "border-black bg-black text-white"
                        : "border-gray-300 hover:border-black"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-300 rounded">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-gray-100"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="px-6 py-3 border-x border-gray-300 font-medium">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-gray-100"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              <button className="flex-1 bg-black text-white py-4 rounded font-medium hover:bg-gray-800 transition">
                ADD TO CART
              </button>
            </div>

            {/* Description */}
            <div className="pt-8 border-t border-gray-200">
              <h3 className="font-medium mb-3">Description</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Premium quality garment crafted with attention to detail. Designed for comfort and style.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Full Screen Modal */}
      {isFullView && (
        <div
          className="fixed inset-0 bg-white z-50 flex items-center justify-center p-8"
          onClick={() => setIsFullView(false)}
        >
          <button
            className="absolute top-6 right-6 p-3 bg-white rounded-full shadow-lg"
            onClick={(e) => {
              e.stopPropagation();
              setIsFullView(false);
            }}
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={images[selectedImage]}
            alt={product.name}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </div>
  );
}