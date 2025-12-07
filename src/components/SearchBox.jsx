import { useEffect, useRef } from "react";
export default function SearchBox({
  query,
  setQuery,
  recent,
  setRecent,
  results,
  close,
}) {
  const boxRef = useRef();
  const overlayRef = useRef();

  // Close if clicking outside box
  useEffect(() => {
    const handleClick = (e) => {
      if (
        boxRef.current &&
        !boxRef.current.contains(e.target)
      ) {
        close();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Close on ESC key
  useEffect(() => {
    const closeOnEsc = (e) => e.key === "Escape" && close();
    document.addEventListener("keydown", closeOnEsc);
    return () => document.removeEventListener("keydown", closeOnEsc);
  }, []);

  const saveRecent = (word) => {
    if (!word.trim()) return;

    const updated = [word, ...recent.filter((r) => r !== word)].slice(0, 10);
    setRecent(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  return (
    // Overlay Background
    <div
      ref={overlayRef}
      className="
        fixed inset-0
        bg-black/40
        backdrop-blur-sm
        z-50
        flex justify-center
        pt-24
        animate-fadeIn
      "
    >
      {/* Search Box Container */}
      <div
        ref={boxRef}
        className="
          w-[92%] md:w-[80%] lg:w-[55%]
          max-w-4xl
          bg-white 
          rounded-2xl 
          shadow-2xl 
          p-6 
          animate-slideDown
          max-h-[80vh]
        "
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 border-b pb-4">
          <input
            type="text"
            autoFocus
            className="flex-1 outline-  none text-xl font-medium placeholder-gray-400"
            placeholder="What are you searching for?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && saveRecent(query)}
          />

          {/* Close Button */}
          <button
            onClick={close}
            className="text-gray-400 hover:text-black text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Recent Searches */}
        {query.length === 0 && (
          <div className="mt-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Recent Searches</h2>

              {recent.length > 0 && (
                <button
                  className="text-sm text-gray-500 hover:text-gray-700"
                  onClick={() => {
                    setRecent([]);
                    localStorage.removeItem("recentSearches");
                  }}
                >
                  Clear All
                </button>
              )}
            </div>

            <div className="space-y-3">
              {recent.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center text-gray-700"
                >
                  <span
                    className="cursor-pointer hover:underline"
                    onClick={() => setQuery(item)}
                  >
                    {item}
                  </span>

                  <button
                    className="text-gray-400 hover:text-black"
                    onClick={() => {
                      const updated = recent.filter((r) => r !== item);
                      setRecent(updated);
                      localStorage.setItem(
                        "recentSearches",
                        JSON.stringify(updated)
                      );
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        {query.length > 0 && (
          <div className="mt-6 max-h-80 overflow-y-auto space-y-2">
            {results.length === 0 ? (
              <p className="text-gray-500">No products found.</p>
            ) : (
              results.map((p, i) => (
                <div
                  key={i}
                  className="
                    flex items-center gap-4 
                    p-3 
                    hover:bg-white
                    rounded-xl 
                    cursor-pointer
                    bg-gray-100
                  "
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-14 h-14 rounded-lg object-cover shadow-sm"
                  />

                  <div>
                    <p className="font-semibold">{p.name}</p>
                    <p className="text-sm text-gray-500">${p.price}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
