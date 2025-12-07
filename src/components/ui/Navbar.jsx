import React, { useState, useRef } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@radix-ui/react-navigation-menu";
import { Link, Links } from "react-router-dom";
import { MdOutlineSearch } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { FiBell, FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import { IoBagHandleOutline } from "react-icons/io5";
import { useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import SearchBox from "../../components/SearchBox";
const Navbar = () => {
  const [Searchopen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState(() => {
    return JSON.parse(localStorage.getItem("recentSearches")) || [];
  });

  // Load products from localStorage / API
  const [products] = useState(() => {
    return JSON.parse(localStorage.getItem("allProducts")) || [];
  });

  const results = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  const { cart, cartCount, cartTotal, removeFromCart, updateQuantity } =
    useCart();
  // 🟩 SAVE cart every time you update it
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [womenOpen, setWomenOpen] = useState(false);
  const [menOpen, setMenOpen] = useState(false);
  const [boyOpen, setBoyOpen] = useState(false);
  const [girlOpen, setGirlOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handScroll);
    return () => window.removeEventListener("scroll", handScroll);
  }, []);
  useEffect(() => {
    if (!scrolled) return; // Do nothing at top
  }, [scrolled]);

  const [open, setOpen] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 300);
  };

  const womenItems = [
    { name: "NEW IN", path: "/Women/NEW", color: "text-gray-700" },
    { name: "CLOTHING", path: "/Women/CLOTHING", color: "text-gray-700" },
    { name: "SHOES", path: "/Women/SHOES", color: "text-gray-700" },
    { name: "ACCESSORIES", path: "/Women/ACCESSORIES", color: "text-gray-700" },
    { name: "COLLECTION", path: "/Women/COLLECTION", color: "text-gray-700" },
    { name: "SALE", path: "/Women/SALE", color: "text-red-700" },
  ];
  const menItems = [
    { name: "NEW IN", path: "/Men/NEW", color: "text-gray-700" },
    { name: "CLOTHING", path: "/Men/CLOTHING", color: "text-gray-700" },
    { name: "SHOES", path: "/Men/SHOES", color: "text-gray-700" },
    { name: "ACCESSORIES", path: "/Men/ACCESSORIES", color: "text-gray-700" },
    { name: "COLLECTION", path: "/Men/COLLECTION", color: "text-gray-700" },
    { name: "SALE", path: "/Men/SALE", color: "text-red-700" },
  ];
  const boyItems = [
    { name: "NEW IN", path: "/Boy/NEW", color: "text-gray-700" },
    { name: "CLOTHING", path: "/Boy/CLOTHING", color: "text-gray-700" },
    { name: "SHOES", path: "/Boy/SHOES", color: "text-gray-700" },
    { name: "SALE", path: "/Boy/SALE", color: "text-red-700" },
  ];
  const girlItems = [
    { name: "NEW IN", path: "/Girl/NEW", color: "text-gray-700" },
    { name: "CLOTHING", path: "/Girl/CLOTHING", color: "text-gray-700" },
    { name: "SHOES", path: "/Girl/SHOES", color: "text-gray-700" },
    { name: "SALE", path: "/Girl/SALE", color: "text-red-700" },
  ];

  const categories = [
    {
      title: "WOMEN",
      open: womenOpen,
      setOpen: setWomenOpen,
      items: womenItems,
    },
    {
      title: "MEN",
      open: menOpen,
      setOpen: setMenOpen,
      items: menItems,
    },
    {
      title: "BOYS",
      open: boyOpen,
      setOpen: setBoyOpen,
      items: boyItems,
    },
    {
      title: "GIRLS",
      open: girlOpen,
      setOpen: setGirlOpen,
      items: girlItems,
    },
  ];

  const women_New_In = [
    { name: "All", path: "/Women/NewIn/All", color: "text-gray-700" },
    { name: "Casual", path: "/Women/NewIn/Casual", color: "text-gray-700" },
    {
      name: "Sportlife",
      path: "/Women/NewIn/Sportlife",
      color: "text-gray-700",
    },
    {
      name: "Lifestyle",
      path: "/Women/NewIn/Lifestyle",
      color: "text-gray-700",
    },
    {
      name: "New In Top",
      path: "/Women/NewIn/NewInTop",
      color: "text-gray-700",
    },
    {
      name: "New In Dress",
      path: "/Women/NewIn/NewInDress",
      color: "text-gray-700",
    },
    {
      name: "New In Bottom",
      path: "/Women/NewIn/NewInBottom",
      color: "text-gray-700",
    },
  ];
  const women_Clothing = [
    { name: "All", path: "/Women/Clothing/All", color: "text-gray-700" },
    { name: "Tops", path: "/Women/Clothing/Tops", color: "text-gray-700" },
    {
      name: "Blazers",
      path: "/Women/Clothing/Blazers",
      color: "text-gray-700",
    },
    { name: "Vest", path: "/Women/Clothing/Vest", color: "text-gray-700" },
    { name: "Bras", path: "/Women/Clothing/Bras", color: "text-gray-700" },
    { name: "Shirts", path: "/Women/Clothing/Shirts", color: "text-gray-700" },
    {
      name: "T-Shirts",
      path: "/Women/Clothing/T-Shirts",
      color: "text-gray-700",
    },
    {
      name: "Jackets",
      path: "/Women/Clothing/Jackets",
      color: "text-gray-700",
    },
    {
      name: "Polo Shirts",
      path: "/Women/Clothing/PoloShirts",
      color: "text-gray-700",
    },
    {
      name: "Hoodies & Sweatshirts",
      path: "/Women/Clothing/HoodiesSweatshirts",
      color: "text-gray-700",
    },
    {
      name: "Jumpsuits",
      path: "/Women/Clothing/Jumpsuits",
      color: "text-gray-700",
    },
    {
      name: "Dresses",
      path: "/Women/Clothing/Dresses",
      color: "text-gray-700",
    },
    {
      name: "Cardigans",
      path: "/Women/Clothing/Cardigans",
      color: "text-gray-700",
    },
    {
      name: "Blouses",
      path: "/Women/Clothing/Blouses",
      color: "text-gray-700",
    },
    {
      name: "Sportswear",
      path: "/Women/Clothing/Sportswear",
      color: "text-gray-700",
    },
    {
      name: "Trousers",
      path: "/Women/Clothing/Trousers",
      color: "text-gray-700",
    },
    { name: "Jeans", path: "/Women/Clothing/Jeans", color: "text-gray-700" },
    { name: "Skirts", path: "/Women/Clothing/Skirts", color: "text-gray-700" },
    { name: "Shorts", path: "/Women/Clothing/Shorts", color: "text-gray-700" },
  ];
  const women_Shoes = [
    { name: "All", path: "/Women/Shoes/All", color: "text-gray-700" },
    { name: "Sneakers", path: "/Women/Shoes/Sneakers", color: "text-gray-700" },
    { name: "Sandals", path: "/Women/Shoes/Sandals", color: "text-gray-700" },
    { name: "Loafers", path: "/Women/Shoes/Loafers", color: "text-gray-700" },
  ];
  const women_Accessories = [
    { name: "All", path: "/Women/Accessories/All", color: "text-gray-700" },
    { name: "Bags", path: "/Women/Accessories/Bags", color: "text-gray-700" },
    { name: "Belts", path: "/Women/Accessories/Belts", color: "text-gray-700" },
    {
      name: "Caps & Hats",
      path: "/Women/Accessories/CapsHats",
      color: "text-gray-700",
    },
    { name: "Socks", path: "/Women/Accessories/Socks", color: "text-gray-700" },
    {
      name: "Gloves",
      path: "/Women/Accessories/Gloves",
      color: "text-gray-700",
    },
    {
      name: "UnderWear",
      path: "/Women/Accessories/UnderWear",
      color: "text-gray-700",
    },
    {
      name: "Sport Equipment",
      path: "/Women/Accessories/SportEquipment",
      color: "text-gray-700",
    },
  ];
  const women_Shop_By_Collection = [
    { name: "All", path: "/Women/Collection/All", color: "text-gray-700" },
    {
      name: "Post Modern Academy",
      path: "/Women/Collection/PostModernAcademy",
      color: "text-gray-700",
    },
    {
      name: "Fiery Energy Collection",
      path: "/Women/Collection/FieryEnergy",
      color: "text-gray-700",
    },
    {
      name: "Q-Drift Collection",
      path: "/Women/Collection/QDrift",
      color: "text-gray-700",
    },
  ];
  const women_Sale = [
    { name: "Clothing", path: "/Women/Sale/Clothing", color: "text-red-700" },
    { name: "Shoes", path: "/Women/Sale/Shoes", color: "text-red-700" },
    {
      name: "Accessories",
      path: "/Women/Sale/Accessories",
      color: "text-red-700",
    },
    {
      name: "Shop by collection",
      path: "/Women/Sale/Collection",
      color: "text-red-700",
    },
  ];

  const men_New_IN = [
    { name: "All", path: "/Men/NewIn/All", color: "text-gray-700" },
    { name: "LifeStyle", path: "/Men/NewIn/Casual", color: "text-gray-700" },
    { name: "Sportlife", path: "/Men/NewIn/Sportlife", color: "text-gray-700" },
    { name: "Casual", path: "/Men/NewIn/Lifestyle", color: "text-gray-700" },
    { name: "New In Top", path: "/Men/NewIn/NewInTop", color: "text-gray-700" },
    {
      name: "New In Buttom",
      path: "/Men/NewIn/NewInDress",
      color: "text-gray-700",
    },
  ];
  const men_Clothing = [
    { name: "All", path: "/Men/Clothing/All", color: "text-gray-700" },
    { name: "Shirts", path: "/Men/Clothing/Tops", color: "text-gray-700" },
    { name: "Blazers", path: "/Men/Clothing/Blazers", color: "text-gray-700" },
    { name: "Vest", path: "/Men/Clothing/Vest", color: "text-gray-700" },
    { name: "Polo Shirt", path: "/Men/Clothing/Bras", color: "text-gray-700" },
    { name: "T-Shirts", path: "/Men/Clothing/Shirts", color: "text-gray-700" },
    {
      name: "Jackets",
      path: "/Men/Clothing/T-Shirts",
      color: "text-gray-700",
    },
    {
      name: "Hoodies & Sweatshirts",
      path: "/Men/Clothing/Jackets",
      color: "text-gray-700",
    },
    {
      name: "Cardigans",
      path: "/Men/Clothing/PoloShirts",
      color: "text-gray-700",
    },
    {
      name: "Sportswear",
      path: "/Men/Clothing/HoodiesSweatshirts",
      color: "text-gray-700",
    },
    {
      name: "Trousers",
      path: "/Men/Clothing/Jumpsuits",
      color: "text-gray-700",
    },
    { name: "Jeans", path: "/Men/Clothing/Dresses", color: "text-gray-700" },
    {
      name: "Shorts",
      path: "/Men/Clothing/Cardigans",
      color: "text-gray-700",
    },
    { name: "Boxers", path: "/Men/Clothing/Blouses", color: "text-gray-700" },
  ];
  const men_Shoes = [
    { name: "All", path: "/Men/Shoes/All", color: "text-gray-700" },
    { name: "Sneakers", path: "/Men/Shoes/Sneakers", color: "text-gray-700" },
    { name: "Sandals", path: "/Men/Shoes/Sandals", color: "text-gray-700" },
  ];
  const men_Accessories = [
    { name: "All", path: "/Men/Accessories/All", color: "text-gray-700" },
    { name: "Bags", path: "/Men/Accessories/Bags", color: "text-gray-700" },
    { name: "Belts", path: "/Men/Accessories/Belts", color: "text-gray-700" },
    {
      name: "Caps & Hats",
      path: "/Men/Accessories/CapsHats",
      color: "text-gray-700",
    },
    { name: "Socks", path: "/Men/Accessories/Socks", color: "text-gray-700" },
    { name: "Gloves", path: "/Men/Accessories/Gloves", color: "text-gray-700" },
  ];
  const men_Shop_By_Collection = [
    { name: "All", path: "/Men/Collection/All", color: "text-gray-700" },
    {
      name: "Post Modern Academy",
      path: "/Men/Collection/PostModernAcademy",
      color: "text-gray-700",
    },
    {
      name: "Fiery Energy Collection",
      path: "/Men/Collection/FieryEnergy",
      color: "text-gray-700",
    },
    {
      name: "Q-Drift Collection",
      path: "/Men/Collection/QDrift",
      color: "text-gray-700",
    },
    {
      name: "Rhythm Of The River",
      path: "/Men/Collection/QDrift",
      color: "text-gray-700",
    },
  ];
  const men_Sale = [
    { name: "Clothing", path: "/Men/Sale/Clothing", color: "text-red-700" },
    { name: "Shoes", path: "/Men/Sale/Shoes", color: "text-red-700" },
    {
      name: "Accessories",
      path: "/Men/Sale/Accessories",
      color: "text-red-700",
    },
    {
      name: "Shop by collection",
      path: "/Men/Sale/Collection",
      color: "text-red-700",
    },
  ];

  const boy_New_IN = [
    { name: "All", path: "/Boy/NewIn/All", color: "text-gray-700" },
    { name: "LifeStyle", path: "/Boy/NewIn/Casual", color: "text-gray-700" },
    { name: "Sportlife", path: "/Boy/NewIn/Sportlife", color: "text-gray-700" },
  ];
  const boy_Clothing = [
    { name: "All", path: "/Boy/Clothing/All", color: "text-gray-700" },
    { name: "Shirts", path: "/Boy/Clothing/Tops", color: "text-gray-700" },
    { name: "Polo Shirt", path: "/Boy/Clothing/Bras", color: "text-gray-700" },
    { name: "T-Shirts", path: "/Boy/Clothing/Shirts", color: "text-gray-700" },
    { name: "Jackets", path: "/Boy/Clothing/T-Shirts", color: "text-gray-700" },
    {
      name: "Trousers",
      path: "/Boy/Clothing/Jumpsuits",
      color: "text-gray-700",
    },
    { name: "Shorts", path: "/Boy/Clothing/Cardigans", color: "text-gray-700" },
  ];
  const boy_Shoes = [
    { name: "All", path: "/Boy/Shoes/All", color: "text-gray-700" },
    { name: "Sneakers", path: "/Boy/Shoes/Sneakers", color: "text-gray-700" },
    { name: "Sandals", path: "/Boy/Shoes/Sandals", color: "text-gray-700" },
  ];
  const boy_Sale = [
    { name: "New IN", path: "/Boy/Sale/Clothing", color: "text-red-700" },
    { name: "Clothing", path: "/Boy/Sale/Shoes", color: "text-red-700" },
    { name: "Shoes", path: "/Boy/Sale/Shoes", color: "text-red-700" },
  ];

  const girl_New_IN = [
    { name: "All", path: "/Girl/NewIn/All", color: "text-gray-700" },
    { name: "Casual", path: "/Girl/NewIn/Lifestyle", color: "text-gray-700" },
    {
      name: "New In Top",
      path: "/Girl/NewIn/NewInTop",
      color: "text-gray-700",
    },
  ];
  const girl_Clothing = [
    { name: "All", path: "/Girl/Clothing/All", color: "text-gray-700" },
    { name: "Shirts", path: "/Girl/Clothing/Tops", color: "text-gray-700" },
    { name: "Trousers", path: "/Girl/Clothing/Bras", color: "text-gray-700" },
    { name: "T-Shirts", path: "/Girl/Clothing/Shirts", color: "text-gray-700" },
    {
      name: "Jackets",
      path: "/Girl/Clothing/T-Shirts",
      color: "text-gray-700",
    },
    {
      name: "Shorts",
      path: "/Girl/Clothing/Cardigans",
      color: "text-gray-700",
    },
  ];
  const girl_Shoes = [
    { name: "All", path: "/Girl/Shoes/All", color: "text-gray-700" },
    { name: "Sandals", path: "/Girl/Shoes/Sneakers", color: "text-gray-700" },
    { name: "Sneakers", path: "/Girl/Shoes/Sandals", color: "text-gray-700" },
  ];
  const girl_Sale = [
    { name: "New IN", path: "/Girl/Sale/Clothing", color: "text-red-700" },
    { name: "Clothing", path: "/Girl/Sale/Shoes", color: "text-red-700" },
    { name: "Shoes", path: "/Girl/Sale/Shoes", color: "text-red-700" },
  ];

  return (
    <div className="w-full border-b bg-white">
      <nav
        className={`fixed top-0 left-0 right-0 z-50 w-full max-w-full mx-auto px-6 py-1 flex items-center justify-between
        ${
          scrolled
            ? "bg-white/50 backdrop-blur-lg shadow-md"
            : "bg-white/20 backdrop-blur-md border-b border-white/20"
        }`}
      >
        <div className="hidden lg:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-2 mr-3 text-lg font-bold">
              <NavigationMenuItem
                className="relative group"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <NavigationMenuLink className="hover:bg-gray-100 px-3 py-4">
                  <Link
                    to="/Women"
                    className="px-3 py-2 hover:text-blue-500 transition"
                  >
                    WOMEN
                  </Link>
                </NavigationMenuLink>

                {/* DROPDOWN WomenWRAPPER */}
                <div
                  className="absolute left-0 mt-8 bg-white shadow-lg rounded-md 
                  opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                  transition-all duration-300 z-20"
                >
                  {open && (
                    <div className="grid grid-cols-6 gap-7 px-5 py-8 w-[1250px] transition-all duration-3000 z-10">
                      <div>
                        <h3 className="font-bold mb-3 text-md">New In</h3>
                        <ul className="space-y-2 font-medium text-gray-700">
                          {women_New_In.map((Item) => (
                            <Link
                              key={Item.name}
                              to={Item.path}
                              className={`block hover:text-pink-700 hover:underline hover:decoration-wavy hover:font-bold  transition text-sm  ${Item.color}`}
                              onMouseEnter={handleMouseEnter}
                            >
                              {Item.name}
                            </Link>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-bold mb-3 text-md">Clothing</h3>
                        <ul className="space-y-2 font-medium text-gray-700">
                          {women_Clothing.map((Item) => (
                            <Link
                              key={Item.name}
                              to={Item.path}
                              className={`block hover:text-pink-700 hover:underline hover:decoration-wavy hover:font-bold  transition text-sm ${Item.color}`}
                              onMouseEnter={handleMouseEnter}
                            >
                              {Item.name}
                            </Link>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-bold mb-3 text-md">Shoes</h3>
                        <ul className="space-y-2 font-medium text-gray-700 ">
                          {women_Shoes.map((Item) => (
                            <Link
                              key={Item.name}
                              to={Item.path}
                              className={`block hover:text-pink-700 hover:underline hover:decoration-wavy hover:font-bold  transition text-sm  ${Item.color}`}
                              onMouseEnter={handleMouseEnter}
                            >
                              {Item.name}
                            </Link>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-bold mb-3 text-md">Accessories</h3>
                        <ul className="space-y-2 font-medium text-gray-700">
                          {women_Accessories.map((Item) => (
                            <Link
                              key={Item.name}
                              to={Item.path}
                              className={`block hover:text-pink-700 hover:underline hover:decoration-wavy hover:font-bold  transition text-sm  ${Item.color}`}
                              onMouseEnter={handleMouseEnter}
                            >
                              {Item.name}
                            </Link>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-bold mb-3 text-md">
                          Shop By Collection
                        </h3>
                        <ul className="space-y-2 font-medium text-gray-700">
                          {women_Shop_By_Collection.map((Item) => (
                            <Link
                              key={Item.name}
                              to={Item.path}
                              className={`block hover:text-pink-700 hover:underline hover:decoration-wavy hover:font-bold  transition text-sm  ${Item.color}`}
                              onMouseEnter={handleMouseEnter}
                            >
                              {Item.name}
                            </Link>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-bold mb-3 text-md text-red-700">
                          Sale
                        </h3>
                        <ul className="space-y-2 font-medium text-red-700">
                          {women_Sale.map((Item) => (
                            <Link
                              key={Item.name}
                              to={Item.path}
                              className={`block hover:text-gray-700 hover:underline hover:decoration-wavy hover:font-bold  transition text-sm  ${Item.color}`}
                              onMouseEnter={handleMouseEnter}
                            >
                              {Item.name}
                            </Link>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </NavigationMenuItem>

              <NavigationMenuItem
                className="relative group"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <NavigationMenuLink className="hover:bg-gray-100 px-3 py-4 ">
                  <Link
                    to="/Men"
                    className="px-3 py-2 hover:text-blue-500 transition"
                  >
                    MEN
                  </Link>
                </NavigationMenuLink>

                {/* DROPDOWN Men WRAPPER */}
                <div
                  className="absolute left-0 mt-8 bg-white shadow-lg rounded-md 
                  opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                  transition-all duration-300 z-20"
                >
                  {open && (
                    <div className="grid grid-cols-6 gap-6 px-5 py-8 w-[1200px] transition-all duration-3000 z-10">
                      <div>
                        <h3 className="font-bold mb-3 text-md">New In</h3>
                        <ul className="space-y-2 font-medium text-gray-700">
                          {men_New_IN.map((Item) => (
                            <Link
                              key={Item.name}
                              to={Item.path}
                              className={`block hover:text-pink-700 hover:underline hover:decoration-wavy hover:font-bold  transition text-sm  ${Item.color}`}
                              onMouseEnter={handleMouseEnter}
                            >
                              {Item.name}
                            </Link>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-bold mb-3 text-md">Clothing</h3>
                        <ul className="space-y-2 font-medium text-gray-700">
                          {men_Clothing.map((Item) => (
                            <Link
                              key={Item.name}
                              to={Item.path}
                              className={`block hover:text-pink-700 hover:underline hover:decoration-wavy hover:font-bold  transition text-sm ${Item.color}`}
                              onMouseEnter={handleMouseEnter}
                            >
                              {Item.name}
                            </Link>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-bold mb-3 text-md">Shoes</h3>
                        <ul className="space-y-2 font-medium text-gray-700 ">
                          {men_Shoes.map((Item) => (
                            <Link
                              key={Item.name}
                              to={Item.path}
                              className={`block hover:text-pink-700 hover:underline hover:decoration-wavy hover:font-bold  transition text-sm  ${Item.color}`}
                              onMouseEnter={handleMouseEnter}
                            >
                              {Item.name}
                            </Link>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-bold mb-3 text-md">Accessories</h3>
                        <ul className="space-y-2 font-medium text-gray-700">
                          {men_Accessories.map((Item) => (
                            <Link
                              key={Item.name}
                              to={Item.path}
                              className={`block hover:text-pink-700 hover:underline hover:decoration-wavy hover:font-bold  transition text-sm  ${Item.color}`}
                              onMouseEnter={handleMouseEnter}
                            >
                              {Item.name}
                            </Link>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-bold mb-3 text-md">
                          Shop By Collection
                        </h3>
                        <ul className="space-y-2 font-medium text-gray-700">
                          {men_Shop_By_Collection.map((Item) => (
                            <Link
                              key={Item.name}
                              to={Item.path}
                              className={`block hover:text-pink-700 hover:underline hover:decoration-wavy hover:font-bold  transition text-sm  ${Item.color}`}
                              onMouseEnter={handleMouseEnter}
                            >
                              {Item.name}
                            </Link>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-bold mb-3 text-md text-red-700">
                          Sale
                        </h3>
                        <ul className="space-y-2 font-medium text-red-700">
                          {men_Sale.map((Item) => (
                            <Link
                              key={Item.name}
                              to={Item.path}
                              className={`block hover:text-gray-700 hover:underline hover:decoration-wavy hover:font-bold  transition text-sm  ${Item.color}`}
                              onMouseEnter={handleMouseEnter}
                            >
                              {Item.name}
                            </Link>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </NavigationMenuItem>

              <NavigationMenuItem
                className="relative group"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <NavigationMenuLink className="hover:bg-gray-100 px-3 py-4">
                  <Link
                    to="/Boys"
                    className="px-3 py-2 hover:text-blue-500 transition"
                  >
                    BOYS
                  </Link>
                </NavigationMenuLink>
                <div className="absolute left-0 mt-8 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-opacity duration-2000 z-10 ">
                  {open && (
                    <div className="grid grid-cols-4 gap-16 px-5 py-8 w-[1000px] transition-all duration-3000 z-10">
                      <div>
                        <h3 className="font-bold mb-3 text-xl">New In</h3>
                        <ul className="space-y-2 font-medium text-gray-700">
                          {boy_New_IN.map((Item) => (
                            <Link
                              key={Item.name}
                              to={Item.path}
                              className={`block hover:text-pink-700 hover:underline hover:decoration-wavy hover:font-bold transition text-md ${Item.color}`}
                              onMouseEnter={handleMouseEnter}
                            >
                              {Item.name}
                            </Link>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-bold mb-3 text-xl">Clothing</h3>
                        <ul className="space-y-2 font-medium text-gray-700">
                          {boy_Clothing.map((Item) => (
                            <Link
                              key={Item.name}
                              to={Item.path}
                              className={`block hover:text-pink-700 hover:underline hover:decoration-wavy hover:font-bold transition text-md ${Item.color}`}
                              onMouseEnter={handleMouseEnter}
                            >
                              {Item.name}
                            </Link>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-bold mb-3 text-md">Shoes</h3>
                        <ul className="space-y-2 font-medium text-gray-700 ">
                          {boy_Shoes.map((Item) => (
                            <Link
                              key={Item.name}
                              to={Item.path}
                              className={`block hover:text-pink-700 hover:underline hover:decoration-wavy hover:font-bold transition text-md ${Item.color}`}
                              onMouseEnter={handleMouseEnter}
                            >
                              {Item.name}
                            </Link>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-bold mb-3 text-md text-red-700">
                          Sale
                        </h3>
                        <ul className="space-y-2 font-medium text-red-700">
                          {boy_Sale.map((Item) => (
                            <Link
                              key={Item.name}
                              to={Item.path}
                              className={`block hover:text-gray-700 hover:underline hover:decoration-wavy hover:font-bold  transition text-md  ${Item.color}`}
                              onMouseEnter={handleMouseEnter}
                            >
                              {Item.name}
                            </Link>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </NavigationMenuItem>

              <NavigationMenuItem
                className="relative group"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <NavigationMenuLink className="hover:bg-gray-100 px-3 py-4">
                  <Link
                    to="/Girls"
                    className="px-3 py-2 hover:text-blue-500 transition"
                  >
                    GIRLS
                  </Link>
                </NavigationMenuLink>
                <div className="absolute left-0 mt-8 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-opacity duration-2000 z-10 ">
                  {open && (
                    <div className="grid grid-cols-4 gap-16 px-5 py-8 w-[900px] transition-all duration-3000 z-10">
                      <div>
                        <h3 className="font-bold mb-3 text-xl">New In</h3>
                        <ul className="space-y-2 font-medium text-gray-700">
                          {girl_New_IN.map((Item) => (
                            <Link
                              key={Item.name}
                              to={Item.path}
                              className={`block hover:text-pink-700 hover:underline hover:decoration-wavy hover:font-bold transition text-md ${Item.color}`}
                              onMouseEnter={handleMouseEnter}
                            >
                              {Item.name}
                            </Link>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-bold mb-3 text-xl">Clothing</h3>
                        <ul className="space-y-2 font-medium text-gray-700">
                          {girl_Clothing.map((Item) => (
                            <Link
                              key={Item.name}
                              to={Item.path}
                              className={`block hover:text-pink-700 hover:underline hover:decoration-wavy hover:font-bold transition text-md ${Item.color}`}
                              onMouseEnter={handleMouseEnter}
                            >
                              {Item.name}
                            </Link>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-bold mb-3 text-md">Shoes</h3>
                        <ul className="space-y-2 font-medium text-gray-700 ">
                          {girl_Shoes.map((Item) => (
                            <Link
                              key={Item.name}
                              to={Item.path}
                              className={`block hover:text-pink-700 hover:underline hover:decoration-wavy hover:font-bold transition text-md ${Item.color}`}
                              onMouseEnter={handleMouseEnter}
                            >
                              {Item.name}
                            </Link>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-bold mb-3 text-md text-red-700">
                          Sale
                        </h3>
                        <ul className="space-y-2 font-medium text-red-700">
                          {girl_Sale.map((Item) => (
                            <Link
                              key={Item.name}
                              to={Item.path}
                              className={`block hover:text-gray-700 hover:underline hover:decoration-wavy hover:font-bold  transition text-md  ${Item.color}`}
                              onMouseEnter={handleMouseEnter}
                            >
                              {Item.name}
                            </Link>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <h1 className="text-sm lg:text-3xl font-extrabold tracking-[1px]">
          ICT SHOP.
        </h1>

        {/* ACTION ICONS — desktop only */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="relative flex items-center">
            <MdOutlineSearch className="absolute left-3 text-gray-500 text-xl cursor-pointer" />
            <input
              type="text"
              placeholder="Search"
              className="border rounded-lg pl-10 pr-4 py-2 w-52 hover:bg-gray-100"
              onClick={() => setSearchOpen(true)}
            />
            {Searchopen && (
              <SearchBox
                query={query}
                setQuery={setQuery}
                recent={recent}
                setRecent={setRecent}
                results={results}
                close={() => setOpen(false)}
              />
            )}
          </div>

          <FiBell className="text-xl cursor-pointer" />
          <CiHeart className="text-2xl cursor-pointer" />
          {/* 🛒 CART COMPONENT */}
          <div
            className="relative cursor-pointer"
            onClick={() => setIsCartOpen(!isCartOpen)}
          >
            <IoBagHandleOutline className="text-3xl hover:text-gray-700 transition" />

            {/* Cart item count badge */}
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </div>

          <h1 className="font-bold cursor-pointer text-md hover:bg-gray-100 px-3 py-4 hover:text-blue-500">
            LOGIN
          </h1>
          <h1 className="font-bold cursor-pointer text-md hover:bg-gray-100 px-3 py-4 hover:text-blue-500">
            REGISTER
          </h1>
        </div>
        <div className="relative">
          {/* Cart Dropdown */}
          {isCartOpen && (
            <div
              className="fixed inset-0 z-50"
              onClick={() => setIsCartOpen(false)}
            >
              <div
                className="absolute right-0 top-16 w-96 max-h-[80vh] bg-white rounded-2xl shadow-2xl border overflow-hidden"
                onClick={(e) => e.stopPropagation()} // prevents closing when clicking inside
              >
                <div className="p-6 bg-linear-to-b from-gray-50 to-white">
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
                          <div
                            key={item.id}
                            className="flex gap-4 pb-4 border-b"
                          >
                            <img
                              src={item.img1}
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
        </div>

        {/* MOBILE + MD MENU BUTTON */}
        <div className="lg:hidden flex items-center gap-4">
          <div className="relative flex items-center">
            <MdOutlineSearch
              className="left-3 text-gray-500 text-lg cursor-pointer"
              onClick={() => navigate("/search")}
            />
          </div>

          <FiBell className="text-lg cursor-pointer" />
          <CiHeart className="text-lg cursor-pointer" />
          <div
            className="relative cursor-pointer"
            onClick={() => setIsCartOpen(!isCartOpen)}
          >
            <IoBagHandleOutline className="text-lg hover:text-gray-700 transition" />

            {/* Cart item count badge */}
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </div>
          <h1 className="font-medium cursor-pointer text-sm hover:bg-gray-100 px-2 py-2 hover:text-blue-500">
            LOGIN
          </h1>
          <h1 className="font-medium cursor-pointer text-sm hover:bg-gray-100 px-2 py-2 hover:text-blue-500">
            REGISTER
          </h1>
          <button onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? (
              <FiX className="text-3xl cursor-pointer hover:text-blue-500" />
            ) : (
              <FiMenu className="text-3xl cursor-pointer hover:text-blue-500" />
            )}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="lg:hidden px-6 pb-4 mt-15">
          {categories.map((cat) => (
            <div key={cat.title}>
              <div className="w-full">
                <Link
                  to={`/${cat.title}`}
                  onClick={() => cat.setOpen(!cat.open)}
                  className="w-full flex justify-between items-center py-2 font-bold text-xl hover:text-blue-500"
                >
                  {cat.title}
                  <span className="ml-2">
                    {cat.open ? (
                      <FiX className="text-lg" />
                    ) : (
                      <FiChevronDown className="text-lg" />
                    )}
                  </span>
                </Link>
              </div>
              <div
                className={`bg-white shadow-md rounded-md mt-2 overflow-hidden transition-all duration-1000 z-10
            ${cat.open ? "opacity-100 max-h-96" : "opacity-0 max-h-0"}`}
              >
                <div className="bg-white shadow-lg rounded-md mt-2 ">
                  {cat.items.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`block px-4 py-2 hover:bg-gray-100 ${item.color}`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
