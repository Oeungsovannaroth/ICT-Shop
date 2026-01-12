import React from "react";
import { useParams, Link } from "react-router-dom";
import GridDataWomen from "../data/GridDataWomen";
// import GridDataMen from "../data/GridDataMen";     // uncomment when ready
// import GridDataBoys from "../data/GridDataBoys";
// import GridDataGirls from "../data/GridDataGirls";
import homeData from "../data/homeData";
import { useCart } from "../context/CartContext";
import { IoCart } from "react-icons/io5";
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

  const formatTitle = (str) => {
    if (!str) return "";
    return str
      .replace(/([A-Z])/g, " $1")
      .replace("New In", "New In")
      .replace("Hoodies Sweatshirts", "Hoodies & Sweatshirts")
      .replace("Polo Shirt", "Polo Shirts")
      .trim();
  };

  const displayGender =
    gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase();
  const displaySection = formatTitle(section);
  const displaySubcategory = formatTitle(subcategory);

  

  // ── 1. Load correct product source based on gender ────────────────────────
  let allProducts = getProductsByGender(gender);

  // Fallback if no gender-specific data exists
  if (allProducts.length === 0) {
    allProducts = getAllFallbackProducts();
  }

  // ── 2. Base filter: match gender 
  let products = allProducts.filter(
    (p) => p.gender?.toLowerCase() === gender.toLowerCase()
  );

  // ── 3. Section & subcategory filtering
  if (section) {
    const sectionLower = section.toLowerCase().trim();
    const subLower = subcategory?.toLowerCase().trim() || "";

    const isNewIn = sectionLower === "newin";
    const isSale = sectionLower === "sale";
    const isCollection = sectionLower === "collection";
    const isClothing = sectionLower === "clothing";
    const isShoes = sectionLower === "shoes";
    const isAccessories = sectionLower === "accessories";

    if (isNewIn) {
      products = products.filter((p) => p.isNew === true);

      if (subcategory && subcategory !== "All") {
        if (
          subLower.includes("top") ||
          subLower.includes("shirt") ||
          subLower.includes("blouse")
        ) {
          products = products.filter(
            (p) =>
              /(top|shirt|blouse|hoodie|t-shirt|polo)/i.test(p.name || "") ||
              p.category?.toLowerCase().includes("top") ||
              p.category?.toLowerCase().includes("shirt")
          );
        } else if (
          subLower.includes("dress") ||
          subLower.includes("jumpsuit")
        ) {
          products = products.filter((p) =>
            /(dress|jumpsuit)/i.test(p.name || "")
          );
        } else if (
          subLower.includes("bottom") ||
          subLower.includes("trouser") ||
          subLower.includes("jean")
        ) {
          products = products.filter((p) =>
            /(trousers|jeans|skirt|shorts|pants)/i.test(p.name || "")
          );
        } else {
          // casual / sportlife / lifestyle etc.
          products = products.filter(
            (p) =>
              p.name?.toLowerCase().includes(subLower) ||
              p.category?.toLowerCase().includes(subLower)
          );
        }
      }
    } else if (isSale) {
      products = products.filter((p) => p.oldPrice || p.badge === "SALE");
    } else if (isCollection && subcategory) {
      const collectionMap = {
        postmodernacademy: "post modern academy",
        fieryenergy: "fiery energy",
        qdrift: "q-drift",
        rhythmoftheriver: "rhythm of the river",
      };
      const target = collectionMap[subLower];
      if (target) {
        products = products.filter((p) =>
          p.collection?.toLowerCase()?.includes(target)
        );
      }
    } else if (isClothing || isShoes || isAccessories) {
      products = products.filter(
        (p) =>
          p.category?.toLowerCase() === sectionLower ||
          p.category?.toLowerCase().includes(sectionLower)
      );

      if (subcategory && subcategory !== "All") {
        products = products.filter((p) => {
          const nameLower = (p.name || "").toLowerCase();
          const catLower = (p.category || "").toLowerCase();
          return nameLower.includes(subLower) || catLower.includes(subLower);
        });
      }
    } else if (subcategory && subcategory !== "All") {
      products = products.filter((p) => {
        const nameLower = (p.name || "").toLowerCase();
        const catLower = (p.category || "").toLowerCase();
        return nameLower.includes(subLower) || catLower.includes(subLower);
      });
    }
  }

  // Final fallback: show all gender products if filter was too strict
  if (products.length === 0 && section?.toLowerCase() !== "newin") {
    products = allProducts.filter(
      (p) => p.gender?.toLowerCase() === gender.toLowerCase()
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10 md:py-12 bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-600 mb-8">
        <Link to="/" className="hover:underline">
          Home
        </Link>
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
            <span className="capitalize">
              {displaySubcategory || subcategory}
            </span>
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
              className={`
                group relative
                bg-white rounded-xl overflow-hidden
                shadow-sm hover:shadow-2xl
                transition-all duration-400 ease-out
                hover:-translate-y-1
                h-[520px] sm:h-[540px]
              `}
            >
              {/* Clickable Image Area */}
              <Link
                to={`/product/${product.id}`}
                className="block relative h-[76%] overflow-hidden bg-gray-50"
              >
                <img
                  src={
                    product.img ||
                    product.img1 ||
                    "https://via.placeholder.com/500x650?text=No+Image"
                  }
                  alt={product.name}
                  className={`
                    absolute inset-0 w-full h-full object-cover
                    transition-all duration-500
                    group-hover:opacity-0
                    ${!product.img2 && "group-hover:opacity-100"}
                  `}
                />

                {product.img2 && (
                  <img
                    src={product.img2}
                    alt={`${product.name} - view 2`}
                    className={`
                      absolute inset-0 w-full h-full object-cover
                      opacity-0 group-hover:opacity-100
                      transition-all duration-500
                      scale-105 group-hover:scale-110
                    `}
                  />
                )}

                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>

              {/* Badges */}
              <div className="absolute top-3 right-3 flex flex-col gap-2 items-end z-20 pointer-events-none">
                {product.oldPrice && (
                  <div className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    -
                    {Math.round(
                      ((product.oldPrice - product.price) / product.oldPrice) *
                        100
                    )}
                    %
                  </div>
                )}

                {product.badge === "SALE" && (
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
                  {product.name}
                </h3>

                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-baseline gap-2.5">
                    <span className="font-semibold text-lg">
                      ${product.price?.toFixed(2) || "0.00"}
                    </span>
                    {product.oldPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        ${product.oldPrice}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    className={`
                      p-2.5 rounded-full bg-gray-100 hover:bg-gray-200
                      text-gray-700 hover:text-black transition-colors
                    `}
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
