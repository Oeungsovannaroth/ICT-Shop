import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NewsTicker from "../components/NewsTicker";
import { IoCart } from "react-icons/io5";
import { useCart } from "../context/CartContext";
import homeData from "../data/homeData"; // ← Import all data here

const Home = () => {
  const { addToCart } = useCart();

  const { banners, categories, shoes, lifestyleProducts, driftProducts } = homeData;

  const [current, setCurrent] = useState(0);
  const length = banners.length;

  // Auto slide for banners
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [length]);

  // Reveal on scroll
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    });
    elements.forEach((el) => observer.observe(el));
  }, []);

  return (
    <div className="">
      {/* Hero Cover */}
      <section className="relative w-full">
        <div className="absolute inset-x-0 bottom-6 flex justify-center gap-8 text-sm lg:bottom-40 lg:left-[570px] lg:text-2xl lg:justify-start">
          <button className="border-2 border-black text-black px-6 py-2 font-bold rounded-lg shadow-black hover:bg-pink-700 hover:text-white hover:scale-110 transition-all duration-700">
            <Link to="/Men">SHOP MEN</Link>
          </button>
          <button className="border-2 border-black text-black px-4 py-2 font-bold rounded-lg shadow-black hover:bg-pink-700 hover:text-white hover:scale-110 transition-all duration-700">
            <Link to="/Women">SHOP WOMEN</Link>
          </button>
        </div>
        <img className="w-full h-auto" src="/public/home.jpg" alt="cover" />
      </section>

      {/* Brand Links */}
      <section className="w-full bg-white py-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center md:justify-between gap-6">
          {["zando", "ten11", "routine", "gatoni", "361-sport", "sisburma", "pomelo"].map((brand) => (
            <button key={brand} className="text-xl md:text-2xl lg:text-3xl font-semibold tracking-wide hover:opacity-70 hover:bg-gray-200 px-2 py-4">
              <Link to={`/${brand}`}>
                {brand === "361-sport" ? "361°" : brand === "pomelo" ? "POMELO." : brand.toUpperCase().replace("-", " ")}
              </Link>
            </button>
          ))}
        </div>
      </section>

      {/* Banner Slider */}
      <section className="my-15">
        <div className="relative w-full max-w-7xl mx-auto overflow-hidden rounded-lg h-64 md:h-90">
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === current ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <img src={banner.img} alt={banner.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/25 flex flex-col items-center justify-center text-white">
                <h2 className="text-2xl md:text-4xl font-bold">{banner.title}</h2>
                <p className="text-sm md:text-lg mt-2">{banner.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* News Ticker */}
      <section className="mb-8 max-w-7xl w-auto mx-auto">
        <NewsTicker text="NEW ARRIVALS EVERY DAY — BIG SALE UP TO 50% OFF — LIMITED STOCK — BEST PRICE GUARANTEED — TRENDY OUTFITS — SHOP NOW BEFORE IT'S GONE — FRESH FASHION JUST ARRIVED" />
      </section>

      {/* Big Flip Cards */}
      <section className="mb-35 mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {categories.map((item, index) => (
            <div key={index} className="flex flex-col items-center w-full">
              {/* Mobile */}
              <div className="reveal opacity-0 translate-y-10 transition-all duration-1300 ease-out w-full bg-white shadow-lg rounded-xl p-4 flex flex-col items-center block lg:hidden">
                <img src={item.frontImg} alt={item.name} className="rounded-lg mb-4" />
                <h2 className="font-semibold text-lg text-center">{item.name}</h2>
                <button className="mt-4 px-4 py-2 bg-black text-white rounded-full w-full">
                  <Link to="#">Buy Now</Link>
                </button>
              </div>

              {/* Desktop Flip */}
              <div className="reveal opacity-0 translate-y-10 transition-all duration-1500 ease-out hidden lg:flex w-full group perspective cursor-pointer">
                <div className="relative w-full h-150 transition-transform duration-500 transform-style-preserve-3d group-hover:rotate-y-180">
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 backface-hidden">
                    <img src={item.frontImg} alt={item.name} className="w-full h-full rounded-lg mb-4 object-cover" />
                    <h2 className="absolute font-bold text-2xl bottom-25 bg-black px-2 py-3 text-white border-4 text-center">
                      {item.name}
                    </h2>
                  </div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 rotate-y-180 backface-hidden">
                    <img src={item.backImg} alt={item.name} className="w-full h-full rounded-lg mb-4 object-cover" />
                    <button className="mt-4 px-4 py-2 bg-black text-white rounded-full">
                      <Link to="#">Buy Now</Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Shoes Section */}
      <section className="mt-25 max-w-7xl mx-auto">
        <div className="flex justify-between font-bold mb-5">
          <span className="lg:text-4xl">DAILY SHOES ESSENTIALS</span>
          <Link to="#" className="text-blue-500 font-semibold hover:underline hover:text-pink-500">
            Shop More
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {shoes.map((shoe) => (
            <li key={shoe.id} className="relative group h-120 bg-gray-100 rounded-2xl shadow-xl overflow-hidden reveal opacity-0 translate-y-10 transition-all duration-2500 ease-in">
              <div className="absolute inset-0 bg-[#e8ebee] rounded-2xl shadow-inner border border-gray-200 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300 -translate-x-1/2 top-1/2 -translate-y-1/2 rotate-[-45deg]"></div>
              <h2 className="absolute w-full text-center left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 rotate-[-45deg] bg-white px-3 py-1 text-lg font-semibold group-hover:top-[65%] transition-all duration-300">
                {shoe.name}
              </h2>
              <p className="absolute top-3 left-3 bg-white px-2 py-1 text-sm font-medium">${shoe.price}</p>
              <p className="absolute top-3 right-3 text-red-700 bg-white px-2 py-1 text-sm font-semibold">-{shoe.discount}%</p>
              <p
                onClick={() => addToCart(shoe)}
                className="absolute bottom-3 right-3 bg-white px-2 py-1 text-sm font-medium flex items-center gap-2 hover:bg-gray-200 cursor-pointer rounded-md"
              >
                {shoe.addcart} <IoCart />
              </p>
              <img src={shoe.img1} alt="" className="absolute w-[80%] top-1/2 left-1/2 -translate-x-[70%] -translate-y-[105%] rotate-[-45deg] transition-all duration-300 group-hover:w-[120%] group-hover:-translate-y-[75%]" />
              <img src={shoe.img2} alt="" className="absolute w-[80%] top-1/2 left-1/2 translate-x-[-30%] translate-y-[5%] rotate-[135deg] transition-all duration-300 group-hover:w-[60%] group-hover:translate-x-[-15%] group-hover:translate-y-[60%]" />
            </li>
          ))}
        </div>
      </section>

      {/* Lifestyle Products */}
      <section className="w-full py-10">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold">LIFESTYLE MUST-HAVES</h2>
          <Link to="#" className="text-blue-500 font-semibold hover:underline hover:text-pink-500">Shop More</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto px-4 mt-6">
          {lifestyleProducts.map((item) => (
            <div key={item.id} className="flex flex-col">
              <div className="relative w-full overflow-hidden rounded-xl cursor-pointer reveal opacity-0 translate-y-10 transition-all duration-2500 ease-out">
                <span className="absolute top-3 left-3 bg-red-500 text-white text-sm px-2 py-1 rounded-md">{item.discount}</span>
                <img src={item.img} alt={item.name} className="w-full object-cover hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="mt-10 text-left">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold text-red-500">US ${item.price}</span>
                  <span className="text-sm line-through text-gray-400">US ${item.oldPrice}</span>
                </div>
                <p className="text-sm mt-1 text-gray-700">{item.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Q-Drift Products */}
      <section className="w-full py-10">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold">Q-DRIFT URBAN MOTION</h2>
          <Link to="#" className="text-blue-500 font-semibold hover:underline hover:text-pink-500">Shop More</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto px-4 mt-6">
          {driftProducts.map((item) => (
            <div key={item.id} className="flex flex-col">
              <div className="relative w-full overflow-hidden rounded-xl cursor-pointer reveal opacity-0 translate-y-10 transition-all duration-2500 ease-out">
                <span className="absolute top-3 left-3 bg-red-500 text-white text-sm px-2 py-1 rounded-md">{item.discount}</span>
                <img src={item.img} alt={item.name} className="w-full object-cover hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="mt-10 text-left">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold text-red-500">US ${item.price}</span>
                  <span className="text-sm line-through text-gray-400">US ${item.oldPrice}</span>
                </div>
                <p className="text-sm mt-1 text-gray-700">{item.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;