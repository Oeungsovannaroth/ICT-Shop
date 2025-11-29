import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="pt-2">
      <section className="relative w-full">
        <div className="absolute lg:bottom-40 lg:left-[570px] lg:text-2xl flex flex-col sm:flex-row md:bottom-20 md:left-58 md:gap-10 md:text-md gap-4 lg:gap-16 items-center sm:bottom-10 sm:left-45 sm:gap-8 sm:text-sm">
          <button
            className="border-2 border-white cursor-pointer text-white px-6 py-2 font-bold rounded-lg shadow-black transition-all duration-700 ease-in-out
               hover:bg-pink-700 hover:scale-110"
          >
            <Link to="/Men">SHOP MEN</Link>
          </button>
          <button
            className="border-2 border-white cursor-pointer text-white px-4 py-2 font-bold rounded-lg shadow-black transition-all duration-700 ease-in-out
               hover:bg-pink-700 hover:scale-110"
          >
            <Link to="/Women">SHOP WOMEN</Link>
          </button>
        </div>

        <img
          className="w-full h-auto"
          src="https://cdn.dewatermark.xyz/user-data/generate/img/2025-11-29/8ccfbd26-6381-47d8-9737-005120958b8a.png"
          alt="cover"
        />
      </section>

      <section class="w-full bg-white py-8">
        <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-6">
          <button class="text-3xl font-semibold tracking-wide hover:opacity-70">
            <Link to="/zando">ZANDO.</Link>
          </button>

          <button class="text-2xl font-bold tracking-wide hover:opacity-70">
            <Link to="/ten11">TEN ELEVEN</Link>
          </button>

          <button class="text-3xl font-semibold hover:opacity-70">
            <Link to="/routine">ROUTINE</Link>
          </button>

          <button class="text-3xl font-semibold hover:opacity-70">
            <Link to="/gatoni">GATONI</Link>
          </button>

          <button class="text-3xl font-semibold hover:opacity-70">
            <Link to="/361-sport">
              361<sup>°</sup>
            </Link>
          </button>

          <button class="text-2xl over:opacity-70">
            <Link to="/sisburma">SISBURMA</Link>
          </button>

          <button class="text-3xl font-semibold font-serif hover:opacity-70">
            <Link to="/pomelo">POMELO.</Link>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
