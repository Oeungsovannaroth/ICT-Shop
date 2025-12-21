import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@radix-ui/react-navigation-menu";
import { Link } from "react-router-dom";
import { MdOutlineSearch } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { FiBell, FiMenu, FiX } from "react-icons/fi";
import { IoBagHandleOutline } from "react-icons/io5";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import menuData from "../../data/menuData";
import homeData from "../../data/homeData";

const Navbar = () => {
  const [Searchopen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState(() => {
    const saved = localStorage.getItem("recentSearches");
    return saved ? JSON.parse(saved) : [];
  });

  const { cart, cartCount, cartTotal, removeFromCart, updateQuantity } =
    useCart();
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef(null);

  // === ALL PRODUCTS FROM HOME PAGE FOR SEARCH ===
  const allHomeProducts = useMemo(() => {
    const { shoes, lifestyleProducts, driftProducts } = homeData;
    const products = [
      ...shoes.map((item) => ({
        ...item,
        id: `shoe-${item.id}`,
        category: "Shoes",
        img: item.img1,
      })),
      ...lifestyleProducts.map((item) => ({
        ...item,
        id: `lifestyle-${item.id}`,
        category: "Lifestyle",
        img: item.img,
      })),
      ...driftProducts.map((item) => ({
        ...item,
        id: `drift-${item.id}`,
        category: "Q-Drift",
        img: item.img,
      })),
    ];
    return products;
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return allHomeProducts.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, allHomeProducts]);

  const addToRecent = (productName) => {
    const updated = [
      productName,
      ...recent.filter((n) => n !== productName),
    ].slice(0, 5);
    setRecent(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 300);
  };

  // === SCROLL EFFECT ===
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // === SAVE CART ===
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const categories = Object.keys(menuData);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // "login" or "register"
  return (
    <div className="w-full border-b bg-white">
      <nav
        className={`fixed top-0 left-0 right-0 z-50 w-full px-6 py-1 flex items-center justify-between ${
          scrolled
            ? "bg-white/50 backdrop-blur-lg shadow-md"
            : "bg-white/20 backdrop-blur-md border-b border-white/20"
        }`}
      >
        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-2 mr-3 text-lg font-bold">
              {categories.map((category) => {
                const { mainLink, dropdown } = menuData[category];

                // Define columns and width per category (static for Tailwind)
                const gridColsClass =
                  category === "WOMEN" || category === "MEN"
                    ? "grid-cols-6"
                    : "grid-cols-4";

                const widthClass =
                  category === "WOMEN"
                    ? "w-[1250px]"
                    : category === "MEN"
                    ? "w-[1200px]"
                    : category === "BOYS"
                    ? "w-[1000px]"
                    : "w-[900px]"; // fallback for GIRLS or others

                return (
                  <NavigationMenuItem
                    key={category}
                    className="relative group"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <NavigationMenuLink className="hover:bg-gray-100 px-3 py-4">
                      <Link
                        to={mainLink}
                        className="px-3 py-2 hover:text-blue-500 transition"
                      >
                        {category}
                      </Link>
                    </NavigationMenuLink>

                    <div className="absolute left-0 mt-8 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-20">
                      {open && (
                        <div
                          className={`grid ${gridColsClass} gap-8 px-5 py-8 ${widthClass} transition-all duration-300 z-10`}
                        >
                          {Object.entries(dropdown).map(
                            ([sectionTitle, items]) => (
                              <div key={sectionTitle}>
                                <h3
                                  className={`font-bold mb-3 text-md ${
                                    sectionTitle === "Sale"
                                      ? "text-red-700"
                                      : ""
                                  }`}
                                >
                                  {sectionTitle}
                                </h3>
                                <ul className="space-y-2 font-medium">
                                  {items.map((item) => (
                                    <Link
                                      key={item.name}
                                      to={item.path}
                                      className={`block hover:text-pink-700 hover:underline hover:decoration-wavy hover:font-bold transition text-sm ${
                                        item.color || "text-gray-700"
                                      }`}
                                      onMouseEnter={handleMouseEnter}
                                    >
                                      {item.name}
                                    </Link>
                                  ))}
                                </ul>
                              </div>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Logo */}
        <h1 className="text-sm lg:text-3xl font-extrabold tracking-[1px]">
          ICT SHOP.
        </h1>

        {/* Desktop Icons */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="relative">
            <MdOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl cursor-pointer" />
            <input
              type="text"
              placeholder="Search"
              className="border rounded-lg pl-10 pr-4 py-2 w-52 hover:bg-gray-100 cursor-pointer"
              onClick={() => setSearchOpen(true)}
              readOnly
            />
          </div>

          <FiBell className="text-xl cursor-pointer" />
          <CiHeart className="text-2xl cursor-pointer" />

          <div
            className="relative cursor-pointer"
            onClick={() => setIsCartOpen(!isCartOpen)}
          >
            <IoBagHandleOutline className="text-3xl hover:text-gray-700 transition" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </div>

          <button
            onClick={() => {
              setAuthMode("login");
              setIsAuthModalOpen(true);
            }}
            className="font-bold cursor-pointer text-md hover:bg-gray-100 px-3 py-4 hover:text-blue-500 transition"
          >
            LOGIN
          </button>
          <button
            onClick={() => {
              setAuthMode("register");
              setIsAuthModalOpen(true);
            }}
            className="font-bold cursor-pointer text-md hover:bg-gray-100 px-3 py-4 hover:text-blue-500 transition"
          >
            REGISTER
          </button>
        </div>

        {/* Mobile Icons */}
        <div className="lg:hidden flex items-center gap-4">
          <MdOutlineSearch
            className="text-lg cursor-pointer"
            onClick={() => setSearchOpen(true)}
          />
          <FiBell className="text-lg cursor-pointer" />
          <CiHeart className="text-lg cursor-pointer" />
          <div
            className="relative cursor-pointer"
            onClick={() => setIsCartOpen(!isCartOpen)}
          >
            <IoBagHandleOutline className="text-lg hover:text-gray-700 transition" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </div>
          <button
            onClick={() => {
              setAuthMode("login");
              setIsAuthModalOpen(true);
            }}
            className="font-medium cursor-pointer text-sm hover:bg-gray-100 px-2 py-2 hover:text-blue-500 transition"
          >
            LOGIN
          </button>
          <button
            onClick={() => {
              setAuthMode("register");
              setIsAuthModalOpen(true);
            }}
            className="font-medium cursor-pointer text-sm hover:bg-gray-100 px-2 py-2 hover:text-blue-500 transition"
          >
            REGISTER
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? (
              <FiX className="text-3xl cursor-pointer hover:text-blue-500" />
            ) : (
              <FiMenu className="text-3xl cursor-pointer hover:text-blue-500" />
            )}
          </button>
        </div>
      </nav>

      {/* SEARCH DROPDOWN */}
      {Searchopen && (
        <>
          {/* Overlay to close on outside click */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => {
              setSearchOpen(false);
              setQuery("");
            }}
          />

          {/* Professional Search Dropdown */}
          <div className="absolute top-16 left-1/2 -translate-x-1/2 w-full max-w-lg lg:max-w-xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
            {/* Search Input */}
            <div className="p-5 border-b border-gray-100">
              <div className="relative">
                <MdOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for products, styles, brands..."
                  className="w-full pl-12 pr-6 py-4 text-base bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-600 focus:bg-white transition-all"
                  autoFocus
                />
              </div>
            </div>

            {/* Results / Recent */}
            <div className="max-h-96 overflow-y-auto">
              {query.trim() === "" ? (
                <div className="p-6">
                  {recent.length > 0 ? (
                    <>
                      <p className="text-sm font-medium text-gray-500 mb-4">
                        Recent Searches
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {recent.map((term, i) => (
                          <button
                            key={i}
                            onClick={() => setQuery(term)}
                            className="px-4 py-2 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </>
                  ) : (
                    <p className="text-center text-gray-400 py-8">
                      Start typing to search products
                    </p>
                  )}
                </div>
              ) : results.length === 0 ? (
                <p className="text-center text-gray-500 py-12">
                  No products found for "{query}"
                </p>
              ) : (
                <>
                  {results.map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.id}`}
                      onClick={() => {
                        addToRecent(product.name);
                        setSearchOpen(false);
                        setQuery("");
                      }}
                      className="flex items-center gap-5 p-5 hover:bg-gray-50 transition-all border-b border-gray-50 last:border-0"
                    >
                      <div className="relative">
                        <img
                          src={product.img}
                          alt={product.name}
                          className="w-20 h-20 object-cover rounded-xl"
                        />
                        {product.discount && (
                          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full font-bold">
                            {product.discount}
                          </span>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">
                          {product.name}
                        </h4>
                        <p className="text-sm text-gray-500 mt-1">
                          {product.category}
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-lg font-semibold text-gray-900">
                            ${product.price}
                          </span>
                          {product.oldPrice && (
                            <span className="text-sm line-through text-gray-400">
                              ${product.oldPrice}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}

                  {/* View All Results Button */}
                  {results.length > 0 && (
                    <div className="p-4 border-t border-gray-100">
                      <Link
                        to={`/search?q=${encodeURIComponent(query)}`}
                        onClick={() => {
                          setSearchOpen(false);
                          setQuery("");
                        }}
                        className="block w-full text-center py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition"
                      >
                        View all results ({results.length})
                      </Link>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </>
      )}

      {/* CART DROPDOWN */}
      {isCartOpen && (
        <div
          className="fixed inset-0 z-50"
          onClick={() => setIsCartOpen(false)}
        >
          <div
            className="absolute right-0 top-16 w-96 max-h-[80vh] bg-white rounded-2xl shadow-2xl border overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 bg-gradient-to-b from-gray-50 to-white">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold flex items-center gap-2">
                  <IoBagHandleOutline /> My Cart
                </h3>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-gray-500 hover:text-black text-2xl"
                >
                  ×
                </button>
              </div>

              {cart.length === 0 ? (
                <p className="text-center text-gray-500 py-12 text-2xl font-bold">
                  Your cart is empty
                </p>
              ) : (
                <>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-4 pb-4 border-b">
                        <img
                          src={item.img1 || item.img}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-xl shadow-md"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold">{item.name}</h4>
                          <p className="text-gray-600">
                            ${item.price} × {item.quantity}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-lg"
                            >
                              -
                            </button>
                            <span className="w-10 text-center font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-lg"
                            >
                              +
                            </button>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="ml-auto text-red-500 hover:text-red-700 font-medium"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t">
                    <div className="flex justify-between text-xl font-bold mb-4">
                      <span>Total</span>
                      <span className="text-pink-600">
                        ${cartTotal.toFixed(2)}
                      </span>
                    </div>
                    <button className="w-full bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-900 transition">
                      Proceed to Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="lg:hidden px-6 pb-4 mt-16 bg-white shadow-lg">
          {categories.map((category) => {
            const { mainLink, dropdown } = menuData[category];
            const [isOpen, setIsOpen] = useState(false);

            return (
              <div key={category} className="border-b">
                <Link
                  to={mainLink}
                  onClick={() => setIsOpen(!isOpen)}
                  className="w-full flex justify-between items-center py-3 font-bold text-xl hover:text-blue-500"
                >
                  {category}
                  <span>
                    {isOpen ? <FiX /> : <FiMenu className="text-lg" />}
                  </span>
                </Link>

                {isOpen && (
                  <div className="pl-4 py-2 space-y-4">
                    {Object.entries(dropdown).map(([section, items]) => (
                      <div key={section}>
                        <h4
                          className={`font-semibold mb-2 ${
                            section === "Sale" ? "text-red-700" : ""
                          }`}
                        >
                          {section}
                        </h4>
                        {items.map((item) => (
                          <Link
                            key={item.name}
                            to={item.path}
                            className={`block py-1 text-gray-700 hover:text-pink-600 ${
                              item.color || ""
                            }`}
                            onClick={() => setMobileOpen(false)}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      {/* AUTH MODAL (LOGIN / REGISTER) */}
      {isAuthModalOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setIsAuthModalOpen(false)}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden">
              {/* Close Button */}
              <button
                onClick={() => setIsAuthModalOpen(false)}
                className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-600"
              >
                ×
              </button>

              {/* Tabs */}
              <div className="flex border-b">
                <button
                  onClick={() => setAuthMode("login")}
                  className={`flex-1 cursor-pointer py-4 text-lg font-semibold transition ${
                    authMode === "login"
                      ? "text-black border-b-4 border-black"
                      : "text-gray-400"
                  }`}
                >
                  LOGIN
                </button>
                <button
                  onClick={() => setAuthMode("register")}
                  className={`flex-1 cursor-pointer py-4 text-lg font-semibold transition ${
                    authMode === "register"
                      ? "text-black border-b-4 border-black"
                      : "text-gray-400"
                  }`}
                >
                  REGISTER
                </button>
              </div>

              {/* LOGIN FORM */}
              {authMode === "login" && (
                <div className="p-8">
                  <form className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Mobile number
                      </label>
                      <input
                        type="tel"
                        placeholder="Enter phone number"
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type="password"
                          placeholder="Enter password"
                          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black pr-12"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full cursor-pointer bg-black text-white py-4 rounded-lg font-bold text-lg hover:bg-gray-800 transition"
                    >
                      LOGIN
                    </button>
                  </form>

                  <div className="text-center my-6">
                    <a
                      href="#"
                      className="text-sm text-gray-600 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>

                  <div className="text-center text-gray-500 text-sm my-6">
                    OR
                  </div>

                  <div className="space-y-3">
                    <button className="w-full cursor-pointer flex items-center justify-center gap-3 border rounded-lg py-3 hover:bg-gray-50 transition">
                      <img
                        src="https://www.google.com/favicon.ico"
                        alt="Google"
                        className="w-5 h-5"
                      />
                      Continue with Google
                    </button>
                    <button className="w-full cursor-pointer flex items-center justify-center gap-3 border rounded-lg py-3 hover:bg-gray-50 transition">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                        alt="Facebook"
                        className="w-5 h-5"
                      />
                      Continue with Facebook
                    </button>
                  </div>

                  <div className="text-center mt-8">
                    <span className="text-sm text-gray-600">
                      New to ICT?{" "}
                      <button
                        onClick={() => setAuthMode("register")}
                        className="text-black font-semibold hover:underline cursor-pointer"
                      >
                        Register
                      </button>
                    </span>
                  </div>
                </div>
              )}

              {/* REGISTER FORM */}
              {authMode === "register" && (
                <div className="p-8">
                  <form className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium mb-3">
                        Gender (Required)
                      </label>
                      <div className="flex gap-8">
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="gender"
                            value="male"
                            className="w-5 h-5"
                          />
                          <span>Male</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="gender"
                            value="female"
                            className="w-5 h-5"
                          />
                          <span>Female</span>
                        </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Enter first name"
                        className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      />
                      <input
                        type="text"
                        placeholder="Enter last name"
                        className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>

                    <input
                      type="tel"
                      placeholder="Enter phone number"
                      className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />

                    <input
                      type="email"
                      placeholder="Enter email"
                      className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <select className="px-4 py-3 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-black">
                        <option>Cambodia</option>
                      </select>
                      <input
                        type="text"
                        placeholder="City/province"
                        className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>

                    <button
                      type="submit"
                      className=" cursor-pointer w-full bg-black text-white py-4 rounded-lg font-bold text-lg hover:bg-gray-800 transition"
                    >
                      CREATE ACCOUNT
                    </button>
                  </form>

                  <div className="text-center text-gray-500 text-sm my-6">
                    OR
                  </div>

                  <div className="space-y-3">
                    <button className="w-full cursor-pointer flex items-center justify-center gap-3 border rounded-lg py-3 hover:bg-gray-50 transition">
                      <img
                        src="https://www.google.com/favicon.ico"
                        alt="Google"
                        className="w-5 h-5"
                      />
                      Continue with Google
                    </button>
                    <button className=" cursor-pointer w-full flex items-center justify-center gap-3 border rounded-lg py-3 hover:bg-gray-50 transition">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                        alt="Facebook"
                        className="w-5 h-5"
                      />
                      Continue with Facebook
                    </button>
                  </div>

                  <div className="text-center mt-8">
                    <span className="text-sm text-gray-600">
                      Already have an account?{" "}
                      <button
                        onClick={() => setAuthMode("login")}
                        className="text-black font-semibold hover:underline cursor-pointer"
                      >
                        Login
                      </button>
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
