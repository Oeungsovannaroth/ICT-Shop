import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="pt-2">
      <section className="relative w-full">
        <div className="absolute inset-x-0 bottom-6 flex justify-center gap-8 text-sm lg:bottom-40 lg:left-[570px] lg:text-2xl lg:justify-start">
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

      <section className="w-full bg-white py-8">
  <div
    className="
      max-w-7xl mx-auto 
      flex flex-wrap 
      items-center 
      justify-center md:justify-between
      gap-6
    "
  >
    <button className="text-xl hover:bg-gray-200 px-2 py-4 md:text-2xl lg:text-3xl font-semibold tracking-wide hover:opacity-70">
      <Link to="/zando">ZANDO.</Link>
    </button>

    <button className="text-xl hover:bg-gray-200 px-2 py-4 md:text-2xl lg:text-3xl font-bold tracking-wide hover:opacity-70">
      <Link to="/ten11">TEN ELEVEN</Link>
    </button>

    <button className="text-xl hover:bg-gray-200 px-2 py-4 md:text-2xl lg:text-3xl font-semibold hover:opacity-70">
      <Link to="/routine">ROUTINE</Link>
    </button>

    <button className="text-xl hover:bg-gray-200 px-2 py-4 md:text-2xl lg:text-3xl font-semibold hover:opacity-70">
      <Link to="/gatoni">GATONI</Link>
    </button>

    <button className="text-xl hover:bg-gray-200 px-2 py-4 md:text-2xl lg:text-3xl font-semibold hover:opacity-70">
      <Link to="/361-sport">
        361<sup>°</sup>
      </Link>
    </button>

    <button className="text-xl hover:bg-gray-200 px-2 py-4 md:text-2xl lg:text-3xl hover:opacity-70">
      <Link to="/sisburma">SISBURMA</Link>
    </button>

    <button className="text-xl hover:bg-gray-200 px-2 py-4 md:text-2xl lg:text-3xl font-semibold font-serif hover:opacity-70">
      <Link to="/pomelo">POMELO.</Link>
    </button>
  </div>
</section>

    </div>
  );
};

export default Home;
