import { useState } from "react";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState(() => {
    return JSON.parse(localStorage.getItem("recentSearches")) || [];
  });

  // Load all products from backend or context
  const [products] = useState(() => {
    return JSON.parse(localStorage.getItem("allProducts")) || [];
  });

  const results = products.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  // save recent search
  const saveRecent = (word) => {
    if (!word.trim()) return;
    const updated = [word, ...recent.filter((r) => r !== word)].slice(0, 10);
    setRecent(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  return (
    <div className="p-5 max-w-5xl mx-auto">
      {/* SEARCH BAR */}
      <div className="flex items-center gap-3 border-b pb-3">
        <input
          type="text"
          autoFocus
          placeholder="What are you searching for?"
          className="flex-1 outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") saveRecent(query);
          }}
        />
      </div>

      {/* RECENT SEARCHES */}
      {query.length === 0 && (
        <div className="mt-6">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-lg">Recent Searches</h2>
            <button
              className="text-sm text-gray-600"
              onClick={() => {
                setRecent([]);
                localStorage.removeItem("recentSearches");
              }}
            >
              Clear All
            </button>
          </div>

          <div className="mt-3 space-y-3">
            {recent.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="cursor-pointer" onClick={() => setQuery(item)}>
                  {item}
                </span>

                <button
                  onClick={() => {
                    const updated = recent.filter((r) => r !== item);
                    setRecent(updated);
                    localStorage.setItem(
                      "recentSearches",
                      JSON.stringify(updated)
                    );
                  }}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SEARCH RESULTS */}
      {query.length > 0 && (
        <div className="mt-6">
          <h2 className="font-semibold text-lg mb-4">Results for "{query}"</h2>

          {results.length === 0 ? (
            <p className="text-gray-500">No products found.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {results.map((p, i) => (
                <div key={i} className="border p-3 rounded">
                  <img src={p.image} className="w-full" />
                  <p className="mt-2">{p.name}</p>
                  <p className="font-semibold">${p.price}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
