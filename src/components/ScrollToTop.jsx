import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [show, setShow] = useState(false);

  // Show button only when scrolled down
  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top
  const goTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!show) return null;

  return (
    <button
      onClick={goTop}
      className="fixed bottom-10 right-10 z-50 flex flex-col items-center gap-y-0.5 cursor-pointer "
    >
      {/* Arrows */}
      <span className="text-gray-500 animate-bounce">⌃</span>
      <span className="text-gray-500 animate-bounce delay-150">⌃</span>
      <span className="text-gray-500 animate-bounce delay-200">⌃</span>

      {/* Mouse Icon */}
      <div className="w-8 h-12 border-2 border-gray-500 rounded-full flex items-start justify-center py-2">
        <div className="w-1 h-3 bg-gray-500 rounded-full"></div>
      </div>
    </button>
  );
}
