import React from "react";
import { useParams, Link } from "react-router-dom";
import { IoCart } from "react-icons/io5";
import { useCart } from "../context/CartContext";
import {
  getProductsByGender,
  getAllFallbackProducts,
} from "../data/productData";

const CategoryPage = () => {
  const { gender, section, subcategory } = useParams();
  const { addToCart } = useCart();

  if (!gender) {
    return (
      <div className="text-center py-20 text-2xl text-gray-600">
        Invalid category
      </div>
    );
  }

  // ── Title formatting ───────────────────────────────────────────────────────
  const formatTitle = (str = "") => {
    if (!str) return "";
    return str
      .replace(/([A-Z])/g, " $1")
      .replace(/NewIn([A-Za-z]+)/g, "New In $1")
      .replace("HoodiesSweatshirts", "Hoodies & Sweatshirts")
      .replace("PoloShirt", "Polo Shirts")
      .replace("PostModernAcademy", "Post Modern Academy")
      .replace("FieryEnergy", "Fiery Energy")
      .replace("QDrift", "Q-Drift")
      .replace("RhythmOfTheRiver", "Rhythm Of The River")
      .replace(/-/g, " ")
      .trim();
  };

  const displayGender = gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase();
  const displaySection = formatTitle(section);
  const displaySubcategory = formatTitle(subcategory);

  // ── Load products ─────────────────────────────────────────────────────────
  let allProducts = getProductsByGender(gender) || getAllFallbackProducts() || [];

  // Base filter: only this gender
  let products = allProducts.filter(
    (p) => p?.gender?.toLowerCase() === gender.toLowerCase()
  );

  // ── Apply filters only when there's a section ─────────────────────────────
  if (section) {
    const sectionLower = section.toLowerCase().trim();
    const subLower = (subcategory || "").toLowerCase().trim();

    const isAll = subLower === "" || subLower === "all";

    // 1. New In
    if (sectionLower === "newin") {
      products = products.filter((p) => !!p.isNew);

      if (!isAll && subLower) {
        products = products.filter((p) =>
          String(p.category || "").toLowerCase().includes(subLower)
        );
      }
    }

    // 2. Sale
    else if (sectionLower === "sale") {
      products = products.filter((p) => {
        const price = Number(p.price) || 0;
        const oldPrice = Number(p.oldPrice) || price;
        return (
          p.isSale === true ||
          oldPrice > price ||
          String(p.badge || "").toUpperCase() === "SALE"
        );
      });

      if (!isAll && subLower) {
        products = products.filter((p) =>
          String(p.category || "").toLowerCase().includes(subLower)
        );
      }
    }

    // 3. Collections
    else if (sectionLower === "collection") {
      if (!isAll && subLower) {
        const slugToName = {
          "postmodernacademy": "post modern academy",
          "post-modern-academy": "post modern academy",
          "fieryenergy": "fiery energy",
          "qdrift": "q-drift",
          "q-drift": "q-drift",
          "rhythmoftheriver": "rhythm of the river",
        };

        const targetCollection =
          slugToName[subLower] || subLower.replace(/-/g, " ").trim();

        products = products.filter((p) =>
          String(p.collection || "").toLowerCase().includes(targetCollection)
        );
      }
      // else → show all (no collection filter)
    }

    // 4. Regular categories (shoes, t-shirts, accessories, etc...)
    else {
      // Only apply category filter when NOT "all"
      if (!isAll) {
        const target = subLower || sectionLower;

        products = products.filter((p) => {
          const cat = String(p.category || "").toLowerCase();
          return cat === target || cat.includes(target);
        });
      }
      // else → keep all products of this gender
    }
  }

  // Final safety net (avoid empty results except maybe real empty new-in)
  const sectionIsNewIn = section?.toLowerCase() === "newin";
  if (products.length === 0 && !sectionIsNewIn) {
    products = allProducts.filter(
      (p) => p?.gender?.toLowerCase() === gender.toLowerCase()
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10 md:py-12 bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-600 mb-8">
        <Link to="/" className="hover:underline">Home</Link>
        <span className="mx-2">/</span>
        <Link to={`/${gender}`} className="hover:underline capitalize">
          {displayGender}
        </Link>

        {section && (
          <>
            <span className="mx-2">/</span>
            <span className="capitalize">{displaySection || section}</span>
          </>
        )}

        {subcategory && (
          <>
            <span className="mx-2">/</span>
            <span className="capitalize">{displaySubcategory || subcategory}</span>
          </>
        )}
      </nav>

      {products.length === 0 ? (
        <div className="text-center py-32">
          <p className="text-2xl md:text-3xl text-gray-500 mb-10">
            No products found in this category yet...
          </p>
          <Link
            to={`/${gender}`}
            className="inline-block px-8 py-4 bg-black text-white text-lg font-medium rounded-xl hover:bg-gray-800 transition-colors"
          >
            ← Back to {displayGender}
          </Link>
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => (
            <li
              key={product.id}
              className="
                group relative
                bg-white rounded-xl overflow-hidden
                shadow-sm hover:shadow-2xl
                transition-all duration-400 ease-out
                hover:-translate-y-1
                h-[520px] sm:h-[540px]
              "
            >
              <Link
                to={`/product/${product.id}`}
                className="block relative h-[76%] overflow-hidden bg-gray-50"
              >
                <img
                  src={
                    product.img ||
                    product.img1 ||
                    product.image ||
                    "https://via.placeholder.com/500x650?text=No+Image"
                  }
                  alt={product.name || "Product"}
                  className={`
                    absolute inset-0 w-full h-full object-cover
                    transition-all duration-500
                    group-hover:opacity-0
                    ${!product.img2 && "group-hover:opacity-100"}
                  `}
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/500x650?text=Image+Error";
                  }}
                />

                {product.img2 && (
                  <img
                    src={product.img2}
                    alt={`${product.name || "Product"} - view 2`}
                    className="
                      absolute inset-0 w-full h-full object-cover
                      opacity-0 group-hover:opacity-100
                      transition-all duration-500
                      scale-105 group-hover:scale-110
                    "
                  />
                )}

                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </Link>

              {/* Badges */}
              <div className="absolute top-3 right-3 flex flex-col gap-2 items-end z-20 pointer-events-none">
                {product.oldPrice && Number(product.oldPrice) > Number(product.price || 0) && (
                  <div className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    -
                    {Math.round(
                      ((Number(product.oldPrice) - Number(product.price)) / Number(product.oldPrice)) * 100
                    )}%
                  </div>
                )}

                {(product.isSale || String(product.badge || "").toUpperCase() === "SALE") && (
                  <div className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    SALE
                  </div>
                )}

                {product.isNew && (
                  <div className="bg-black text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    NEW
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4 pt-3 flex flex-col">
                <h3 className="text-base sm:text-lg font-medium text-gray-900 line-clamp-2 min-h-[2.8em] group-hover:text-black">
                  {product.name || "Unnamed Product"}
                </h3>

                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-baseline gap-2.5">
                    <span className="font-semibold text-lg">
                      ${(Number(product.price) || 0).toFixed(2)}
                    </span>
                    {product.oldPrice && Number(product.oldPrice) > Number(product.price || 0) && (
                      <span className="text-sm text-gray-400 line-through">
                        ${(Number(product.oldPrice)).toFixed(2)}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    className="
                      p-2.5 rounded-full bg-gray-100 hover:bg-gray-200
                      text-gray-700 hover:text-black transition-colors
                    "
                    aria-label="Add to cart"
                  >
                    <IoCart size={20} />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryPage;