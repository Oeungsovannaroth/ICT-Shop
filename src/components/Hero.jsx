import { useEffect } from "react";

const Hero = () => {
  // Set initial theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.classList.add(savedTheme);
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    const newTheme = html.classList.contains("dark") ? "light" : "dark";
    html.classList.remove("light", "dark");
    html.classList.add(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="fixed top-6 right-6 z-50 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:scale-110 transition-transform border-2 border-gray-200 dark:border-gray-700"
        aria-label="Toggle theme"
      >
        <svg
          className="w-6 h-6 text-gray-800 dark:hidden"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>

        <svg
          className="w-6 h-6 text-yellow-400 hidden dark:block"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      </button>

      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-pink-500 dark:bg-pink-600 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500 dark:bg-purple-600 rounded-full blur-3xl opacity-20 animate-pulse delay-1000" />
        <div className="absolute top-40 left-1/2 w-96 h-96 bg-yellow-400 rounded-full blur-3xl opacity-20 animate-pulse delay-2000" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 min-h-screen flex flex-col lg:flex-row items-center justify-between">
        {/* Left */}
        <div className="lg:w-1/2 text-center lg:text-left space-y-8">
          <h1 className="text-6xl lg:text-8xl font-black leading-tight">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600">
              WALK
            </span>
            <span className="block text-gray-900 dark:text-white">THE</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400">
              TALK
            </span>
          </h1>

          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-lg mx-auto lg:mx-0">
            Shoes so fresh, they'll make your feet do a happy dance.
            <span className="block text-yellow-500 font-bold">
              100% swagger guaranteed
            </span>
          </p>

          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <button className="glow-btn px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold hover:scale-105 transition shadow-xl">
              Shop Now
            </button>

            <button className="px-8 py-4 rounded-full border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition shadow-lg">
              View Collection
            </button>
          </div>

          <div className="flex gap-8 pt-8 justify-center lg:justify-start">
            <div>
              <div className="text-4xl font-bold text-yellow-500">10K+</div>
              <p className="text-gray-500">Happy Feet</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-pink-500">500+</div>
              <p className="text-gray-500">Styles</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-500">★ 4.9</div>
              <p className="text-gray-500">Rating</p>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="lg:w-1/2 mt-16 lg:mt-0 relative flex justify-center">
          <div className="float-shoe bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 p-1 rounded-3xl rotate-12 hover:rotate-0 transition duration-500 shadow-2xl">
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-10">
              <div className="text-9xl text-center -rotate-45">👟</div>
            </div>
          </div>

          <div className="absolute -bottom-8 -left-4 bg-yellow-400 px-6 py-3 rounded-full font-black shadow-xl rotate-12">
            From $49.99
          </div>

          <div className="absolute -top-10 -right-4 bg-pink-500 text-white px-4 py-2 rounded-full font-bold shadow-xl -rotate-12">
            🔥 HOT SALE
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
