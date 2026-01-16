import { useState } from "react";
import { Link } from "react-router-dom";

// Real product data sources
import GridDataWomen from "../data/GridDataWomen";
import GridDataMen from "../data/GridDataMen.js";
// import GridDataBoys from "../data/GridDataBoys";
// import GridDataGirls from "../data/GridDataGirls";

// Optional: for category/collection search
import menuData from "../data/menuData";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState(() => {
    return JSON.parse(localStorage.getItem("recentSearches")) || [];
  });

  // Combine all products from real data files
  const allProducts = [
    ...(GridDataWomen || []),
    ...(GridDataMen || []),
    // ...(GridDataBoys || []),
    // ...(GridDataGirls || []),
  ].filter((item) => item?.id && item?.name); // filter out invalid items

  // Optional: collect categories/collections from menu structure
  const collectMenuItems = () => {
    const items = [];

    Object.entries(menuData).forEach(([genderKey, genderData]) => {
      const gender = genderKey.toLowerCase();

      Object.entries(genderData.dropdown || {}).forEach(
        ([section, subItems]) => {
          subItems.forEach((item) => {
            if (item?.name && item?.path) {
              items.push({
                type: "category",
                name: item.name,
                path: item.path,
                gender,
                section: section.toLowerCase().replace(/\s+/g, "-"),
              });
            }
          });
        }
      );
    });

    return items;
  };

  const menuItems = collectMenuItems();

  // Search logic
  const lowerQuery = query.toLowerCase().trim();

  const productResults = lowerQuery
    ? allProducts
        .filter(
          (product) =>
            product.name?.toLowerCase().includes(lowerQuery) ||
            product.category?.toLowerCase()?.includes(lowerQuery) ||
            (product.collection &&
              product.collection.toLowerCase()?.includes(lowerQuery))
        )
        .map((p) => ({ type: "product", ...p }))
    : [];

  const categoryResults = lowerQuery
    ? menuItems.filter((item) => item.name.toLowerCase().includes(lowerQuery))
    : [];

  const allResults = [...productResults, ...categoryResults];

  const handleSaveRecent = () => {
    const cleaned = query.trim();
    if (!cleaned) return;

    const updated = [cleaned, ...recent.filter((r) => r !== cleaned)].slice(
      0,
      10
    );
    setRecent(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Search Input */}
        <div className="relative mb-10">
          <input
            type="text"
            autoFocus
            placeholder="Search products, gloves, bags, dresses..."
            className="w-full pl-12 pr-12 py-5 text-lg border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black transition shadow-sm"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSaveRecent();
              }
            }}
          />
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <svg
              className="h-6 w-6 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          {query && (
            <button
              className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-black text-2xl font-bold"
              onClick={() => setQuery("")}
            >
              ×
            </button>
          )}
        </div>

        {/* Recent Searches */}
        {query.length === 0 && recent.length > 0 && (
          <div className="mb-12">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-semibold text-gray-900">
                Recent Searches
              </h2>
              <button
                className="text-sm text-gray-600 hover:text-black underline"
                onClick={() => {
                  setRecent([]);
                  localStorage.removeItem("recentSearches");
                }}
              >
                Clear All
              </button>
            </div>

            <div className="flex flex-wrap gap-3">
              {recent.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-gray-100 px-5 py-2.5 rounded-full hover:bg-gray-200 transition group"
                >
                  <span
                    className="cursor-pointer font-medium text-gray-900"
                    onClick={() => setQuery(item)}
                  >
                    {item}
                  </span>
                  <button
                    className="text-gray-500 hover:text-red-600 text-lg font-bold"
                    onClick={() => {
                      const updated = recent.filter((r) => r !== item);
                      setRecent(updated);
                      localStorage.setItem(
                        "recentSearches",
                        JSON.stringify(updated)
                      );
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {query.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">
              {allResults.length} results for{" "}
              <span className="font-normal">"{query}"</span>
            </h2>

            {allResults.length === 0 ? (
              <div className="text-center py-24 text-gray-600">
                <p className="text-2xl font-light mb-4">No results found</p>
                <p className="text-lg">
                  Try different keywords (e.g. "Grip Pro", "Gloves", "Street
                  Haul")
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {allResults.map((result, index) => {
                  if (result.type === "product") {
                    return (
                      <Link
                        key={`p-${result.id}`}
                        to={`/product/${result.id}`}
                        className="group block bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition-all duration-300"
                      >
                        <div className="relative aspect-square bg-gray-50 overflow-hidden">
                          <img
                            src={
                              result.img ||
                              result.img1 ||
                              result.img2 ||
                              "https://via.placeholder.com/400?text=No+Image"
                            }
                            alt={result.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            onError={(e) =>
                              (e.target.src =
                                "https://via.placeholder.com/400?text=Image+Error")
                            }
                          />
                          {result.oldPrice &&
                            result.oldPrice > result.price && (
                              <span className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                                -
                                {Math.round(
                                  ((result.oldPrice - result.price) /
                                    result.oldPrice) *
                                    100
                                )}
                                %
                              </span>
                            )}
                          {result.isNew && (
                            <span className="absolute top-3 left-3 bg-black text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                              NEW
                            </span>
                          )}
                        </div>

                        <div className="p-4">
                          <h3 className="font-medium text-base line-clamp-2 mb-1 group-hover:text-black transition-colors">
                            {result.name}
                          </h3>
                          <div className="flex items-baseline gap-2">
                            <span className="font-semibold text-lg">
                              ${Number(result.price || 0).toFixed(2)}
                            </span>
                            {result.oldPrice &&
                              result.oldPrice > result.price && (
                                <span className="text-sm text-gray-400 line-through">
                                  ${Number(result.oldPrice).toFixed(2)}
                                </span>
                              )}
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            {result.gender} • {result.category}
                          </p>
                        </div>
                      </Link>
                    );
                  }

                  // Category result
                  return (
                    <Link
                      key={`c-${index}`}
                      to={result.path}
                      className="group bg-white rounded-xl p-5 shadow hover:shadow-xl transition-all flex flex-col h-full border border-gray-100"
                    >
                      <div className="text-sm text-gray-500 uppercase tracking-wide mb-2">
                        {result.gender.toUpperCase()} /{" "}
                        {result.section.replace(/-/g, " ")}
                      </div>
                      <h3 className="font-semibold text-lg group-hover:text-black">
                        {result.name}
                      </h3>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
