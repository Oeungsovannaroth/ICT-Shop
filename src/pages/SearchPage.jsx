import { useState } from "react";
import { Link } from "react-router-dom";
import homeData from "../data/homeData";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState(() => {
    return JSON.parse(localStorage.getItem("recentSearches")) || [];
  });

  // Combine ALL products from homeData (same as CategoryPage)
  const allProducts = [
    ...(homeData.shoes || []),
    ...(homeData.lifestyleProducts || []),
    ...(homeData.driftProducts || []),
    ...(homeData.categories || []), // include if you have category items with id
  ];

  // Filter (case-insensitive + trim whitespace)
  const results = allProducts.filter((item) =>
    item.name?.toLowerCase().includes(query.toLowerCase().trim())
  );

  // Save recent search (on Enter)
  const saveRecent = (word) => {
    if (!word.trim()) return;
    const cleaned = word.trim();
    const updated = [cleaned, ...recent.filter((r) => r !== cleaned)].slice(0, 10);
    setRecent(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* SEARCH BAR - modern & clean */}
        <div className="relative mb-10">
          <input
            type="text"
            autoFocus
            placeholder="Search for products, categories..."
            className="w-full pl-12 pr-12 py-5 text-lg border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition shadow-sm"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                saveRecent(query);
              }
            }}
          />
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          {query && (
            <button
              className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-black"
              onClick={() => setQuery("")}
            >
              ×
            </button>
          )}
        </div>

        {/* RECENT SEARCHES - only when input is empty */}
        {query.length === 0 && recent.length > 0 && (
          <div className="mb-12">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-semibold text-gray-900">Recent Searches</h2>
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
              {recent.map((item, index) => (
                <div
                  key={index}
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
                      localStorage.setItem("recentSearches", JSON.stringify(updated));
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SEARCH RESULTS */}
        {query.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">
              {results.length} Results for "{query}"
            </h2>

            {results.length === 0 ? (
              <div className="text-center py-24 text-gray-600">
                <p className="text-2xl font-light mb-4">No products found</p>
                <p className="text-lg">Try different keywords or check spelling</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}  // ← Correct lowercase route to details page
                    className="group block bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative aspect-square bg-gray-50 overflow-hidden">
                      <img
                        src={
                          product.img ||
                          product.img1 ||
                          product.frontImg ||
                          product.image ||
                          "https://via.placeholder.com/400?text=No+Image"
                        }
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {product.discount && (
                        <span className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow">
                          {product.discount}
                        </span>
                      )}
                      {product.isNew && (
                        <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow">
                          NEW
                        </span>
                      )}
                    </div>

                    <div className="p-4">
                      <h3 className="font-medium text-base line-clamp-2 mb-1 group-hover:text-black transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-lg font-semibold text-gray-900">
                        ${product.price?.toFixed(2)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}