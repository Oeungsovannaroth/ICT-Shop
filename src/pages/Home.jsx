import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
const Home = () => {
  const banners = [
    {
      id: 1,
      img: "https://d3jmn01ri1fzgl.cloudfront.net/photoadking/webp_thumbnail/shark-new-collection-sale-clothing-banner-template-p3ztild89dffd0.webp",
      title: "NEW COLLECTION",
      subtitle: "Up to 7x0% off",
    },
    {
      id: 2,
      img: "https://cdn.venngage.com/template/thumbnail/full/4a4561e3-bada-4f2b-898f-60f8fdb0c8c3.webp",
      title: "NEW ARRIVALS",
      subtitle: "Check out our latest products",
    },
    {
      id: 3,
      img: "https://cdn.venngage.com/template/thumbnail/small/01b644bd-e75b-4e70-b476-3a786261f066.webp",
      title: "LIMITED OFFER",
      subtitle: "Hurry before it's gone!",
    },
    {
      id: 4,
      img: "https://www.mbaazar.in/wp-content/uploads/2024/12/10-Dec-blog-02-banner.png",
      title: "WINTER COLLECTION",
      subtitle: "Stay cozy and stylish",
    },
  ];

  const [current, setCurrent] = useState(0);
  const length = banners.length;

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
    }, 2000);

    return () => clearInterval(interval);
  }, [length]);
  // const nextSlide = () => setCurrent(current === length - 1 ? 0 : current + 1);
  // const prevSlide = () => setCurrent(current === 0 ? length - 1 : current - 1);

  const products = [
    {
      name: "LIFESTYLE",

      frontImg:
        "https://i.pinimg.com/736x/bf/da/4a/bfda4aee91c4273984ca28d1f87116c8.jpg",
      backImg:
        "https://i.pinimg.com/736x/24/f2/00/24f200348979523116dc3b7f4d0e5a0c.jpg",
    },
    {
      name: "SPORTLIFE",

      frontImg:
        "https://i.pinimg.com/736x/5a/54/ae/5a54aede23a2cd869d9d93b3cf4a4d68.jpg",
      backImg:
        "https://i.pinimg.com/736x/4b/45/b3/4b45b32417b475a47d4e60dc7aa4a082.jpg",
    },
    {
      name: "SMART CASUAL",

      frontImg:
        "https://i.pinimg.com/736x/4d/6c/eb/4d6ceb25ed5e5653319f5d58150575e4.jpg",
      backImg:
        "https://i.pinimg.com/736x/20/90/9a/20909a88c6adc72e3c745519ffd2f61c.jpg",
    },
    {
      name: "TOPS",

      frontImg:
        "https://koreanstyle-shop.com/cdn/shop/products/korean-outfit-suit-jacket-and-skirt_1080x.jpg?v=1627279686",
      backImg:
        "https://koreanstyle-shop.com/cdn/shop/products/korean-outfit-plaid-suit_480x480.jpg?v=1627279578",
    },
    {
      name: "BOTTOMS",

      frontImg:
        "https://ae-pic-a1.aliexpress-media.com/kf/S2a9c35e6869c4a8db64b81d2cfc8404cH/Summer-Mini-Dress-for-Women-Girl-Korean-Fashion-Short-Clothes-Clothing-Japanese-Preppy-Style-Student-Short.jpg_640x640Q90.jpg_.webp",
      backImg:
        "https://i.pinimg.com/736x/f9/a9/38/f9a9386345e6ecd420db7b404f478bdf.jpg",
    },
    {
      name: "DRIFT-HALF",

      frontImg:
        "https://i.pinimg.com/736x/50/80/cb/5080cbaa91f6451601401e7147e9360d.jpg",
      backImg:
        "https://cdn.shopify.com/s/files/1/0767/5032/3991/files/Softboy7_480x480.jpg?v=1736066369",
    },
  ];
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target); // animate only once
        }
      });
    });

    elements.forEach((el) => observer.observe(el));
  }, []);
  const shoes = [
    {
      name: "Nike Odyssey React Shield",
      price: 130,
      discount: 35,
      description: "TEN11/NEW IN",
      img1: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/881020/nike01a.png",
      img2: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/881020/nike01b.png",
    },
    {
      name: "LeBron 16",
      price: 185,
      discount: 35,
      description: "TEN11/NEW IN",
      img1: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/881020/nike02a.png",
      img2: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/881020/nike02b.png",
    },
    {
      name: "Nike Epic React Flyknit",
      price: 150,
      discount: 35,
      description: "TEN11/NEW IN",
      img1: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/881020/nike03a.png",
      img2: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/881020/nike03b.png",
    },
    {
      name: "Nike Air Max 97 Premium",
      price: 180,
      discount: 35,
      description: "TEN11/NEW IN",
      img1: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/881020/nike04a.png",
      img2: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/881020/nike04b.png",
    },
    {
      name: "Nike Free RN Motion Flyknit 2018",
      price: 150,
      discount: 35,
      description: "TEN11/NEW IN",
      img1: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/881020/nike05a.png",
      img2: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/881020/nike05b.png",
    },
    {
      name: "Nike Free RN Flyknit 2018",
      price: 120,
      discount: 35,
      description: "361 SPORT",
      img1: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/881020/nike06a.png",
      img2: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/881020/nike06b.png",
    },
  ];
  const productsLiftStyle = [
    {
      id: 1,
      img: "https://zandokh.com/image/catalog/products/2025-07/22225031216/Untitled%20Session1152.jpg",
      name: "Lace Trim Tops",
      price: 8.97,
      oldPrice: 14.95,
      discount: "-40%",
    },
    {
      id: 2,
      img: "https://thechicsavvy.com/wp-content/uploads/2024/12/Lace-skirt-outfits3-765x1024.webp",
      name: "Mexi Lace Skirt",
      price: 11.15,
      oldPrice: 18.59,
      discount: "-40%",
    },
    {
      id: 3,
      img: "https://zandokh.com/image/catalog/products/2025-09/21225061350/SR__1143.jpg",
      name: "Regular T-Shirts With Printed",
      price: 8.75,
      oldPrice: 14.59,
      discount: "-40%",
    },
    {
      id: 4,
      img: "https://www.alcott.eu/dw/image/v2/BDJZ_PRD/on/demandware.static/-/Sites-catalog-alcott-master/default/dw2a6dd878/hi-res/5T3583DOY12_C272_001.jpg?sw=1000&sh=1350&q=90&strip=false",
      name: "Balloon Denim Jean",
      price: 13.77,
      oldPrice: 22.95,
      discount: "-40%",
    },
  ];
  const Q_Drift=[
     {
      id: 1,
      img: "https://zandokh.com/image/catalog/products/2025-07/22225031216/Untitled%20Session1152.jpg",
      name: "Lace Trim Tops",
      price: 8.97,
      oldPrice: 14.95,
      discount: "-40%",
    },
    {
      id: 2,
      img: "https://thechicsavvy.com/wp-content/uploads/2024/12/Lace-skirt-outfits3-765x1024.webp",
      name: "Mexi Lace Skirt",
      price: 11.15,
      oldPrice: 18.59,
      discount: "-40%",
    },
    {
      id: 3,
      img: "https://zandokh.com/image/catalog/products/2025-09/21225061350/SR__1143.jpg",
      name: "Regular T-Shirts With Printed",
      price: 8.75,
      oldPrice: 14.59,
      discount: "-40%",
    },
    {
      id: 4,
      img: "https://www.alcott.eu/dw/image/v2/BDJZ_PRD/on/demandware.static/-/Sites-catalog-alcott-master/default/dw2a6dd878/hi-res/5T3583DOY12_C272_001.jpg?sw=1000&sh=1350&q=90&strip=false",
      name: "Balloon Denim Jean",
      price: 13.77,
      oldPrice: 22.95,
      discount: "-40%",
    },
  ]

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
      {/* SlideSHow */}
      <section className="my-8">
        <div className="relative w-full max-w-7xl mx-auto overflow-hidden rounded-lg h-64 md:h-90">
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === current
                  ? "opacity-100 z-10"
                  : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <img
                src={banner.img}
                alt={banner.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/25 flex flex-col items-center justify-center text-white">
                <h2 className="text-2xl md:text-4xl font-bold">
                  {banner.title}
                </h2>
                <p className="text-sm md:text-lg mt-2">{banner.subtitle}</p>
              </div>
            </div>
          ))}

          {/* <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 text-black p-2 rounded-full hover:bg-white z-20"
          >
            &#10094;
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 text-black p-2 rounded-full hover:bg-white z-20"
          >
            &#10095;
          </button> */}
        </div>
      </section>

      {/* big card */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {products.map((item, index) => (
            <div key={index} className="flex flex-col items-center w-full">
              {/* MOBILE CARD */}
              <div
                className="
            reveal opacity-0 translate-y-10 transition-all duration-700 ease-out
            w-full bg-white shadow-lg rounded-xl p-4 flex flex-col items-center
            block md:block lg:hidden
          "
              >
                <img src={item.frontImg} className="rounded-lg mb-4" />
                <h2 className="font-semibold text-lg text-center">
                  {item.name}
                </h2>

                <button className="mt-4 px-4 py-2 bg-black text-white rounded-full w-full">
                  Buy Now
                </button>
              </div>

              {/* DESKTOP FLIP CARD */}
              <div
                className="
            reveal opacity-0 translate-y-10 transition-all duration-700 ease-out
            hidden md:flex w-full group perspective cursor-pointer mt-4 lg:flex
          "
              >
                <div className="relative w-full h-150 transition-transform duration-500 transform-style-preserve-3d group-hover:rotate-y-180">
                  <div className="absolute inset-0  flex flex-col items-center justify-center p-4 backface-hidden">
                    <img
                      src={item.frontImg}
                      className="w-100 h-150 rounded-lg mb-4"
                    />
                    <h2 className="absolute font-bold text-2xl bottom-25 bg-black px-2 py-3 text-white border-4 text-center">
                      {item.name}
                    </h2>
                  </div>

                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 rotate-y-180 backface-hidden">
                    <img
                      src={item.backImg}
                      className="w-100 h-150 rounded-lg mb-4"
                    />
                    <button className="mt-4 px-4 py-2 bg-black text-white rounded-full">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* shoes */}
      <section className="mt-25 max-w-7xl mx-auto">
        <div className="flex justify-between font-bold mb-5">
          <span className="lg:text-4xl sm:text-sm lg:ml-5">
            Daily Shoe Essentials
          </span>
          <span>
            <button className="cursor-pointer hover:bg-gray-100 lg:px-3 lg:py-4 sm:text-sm text-sm text-blue-500 font-semibold hover:underline hover:text-pink-500">
              SHOP MORE
            </button>
          </span>
        </div>
        <div className="w-full min-h-screen py-10 px-6">
          <ul className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {shoes.map((shoe, index) => (
              <li
                key={index}
                className="relative group h-120 bg-gray-100 rounded-2xl shadow-xl overflow-hidden hover:z-10 transition-all"
              >
                <div className="absolute inset-0 bg-[#e8ebee] rounded-2xl shadow-inner border border-gray-200 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300 -translate-x-1/2 top-1/2 -translate-y-1/2 rotate-[-45deg"></div>

                <h2 className="absolute w-full text-center left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 rotate-[-45deg] bg-white px-3 py-1 text-lg font-semibold transition-all duration-300 group-hover:top-[65%]">
                  {shoe.name}
                </h2>

                <p className="absolute top-3 left-3 bg-white px-2 py-1 text-sm font-medium">
                  ${shoe.price}
                </p>

                <p className="absolute top-3 right-3 text-red-700  bg-white px-2 py-1 text-sm font-semibold rotate-0">
                  -{shoe.discount} %
                </p>
                <p className="absolute bottom-3 right-5 text-red-800 rounded-md bg-white px-2 py-1 text-sm font-bold">
                  {shoe.description}
                </p>

                <img
                  src={shoe.img1}
                  alt=""
                  className="absolute w-[80%] top-1/2 left-1/2 -translate-x-[70%] -translate-y-[105%] rotate-[-45deg] 
                         transition-all duration-300 group-hover:w-[120%] group-hover:-translate-y-[75%]"
                />

                <img
                  src={shoe.img2}
                  alt=""
                  className="absolute w-[80%] top-1/2 left-1/2 translate-x-[-30%] translate-y-[5%] rotate-[135deg]
                         transition-all duration-300 group-hover:w-[60%] group-hover:translate-x-[-15%] group-hover:translate-y-[60%]"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
      {/* productLifeStyle */}
      <section className="w-full py-10">
        {/* Header */}
        <div className="flex justify-between items-center max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold flex items-center gap-2">
            Lifestyle Must-Haves ✨
          </h2>
          <a
            href="#"
            className="cursor-pointer hover:bg-gray-100 lg:px-3 lg:py-4 sm:text-sm text-sm text-blue-500 font-semibold hover:underline hover:text-pink-500"
          >
            Shop More
          </a>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto px-4 mt-6">
          {productsLiftStyle.map((item, index) => (
            <div key={index} className="flex flex-col">
              {/* Image Container */}
              <div className="relative w-full overflow-hidden rounded-xl cursor-pointer">
                {/* Discount Badge */}
                <span className="absolute top-3 left-3 bg-red-500 text-white text-sm px-2 py-1 rounded-md">
                  {item.discount}
                </span>

                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Product Info */}
              <div className="mt-3 text-left">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold text-red-500">
                    US ${item.price}
                  </span>
                  <span className="text-sm line-through text-gray-400">
                    US ${item.oldPrice}
                  </span>
                </div>
                <p className="text-sm mt-1 text-gray-700">{item.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* product-Q-Drift */}
       <section className="w-full py-10">
        {/* Header */}
        <div className="flex justify-between items-center max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold flex items-center gap-2">
            Q-Drift Urban Motion
          </h2>
          <a
            href="#"
            className="cursor-pointer hover:bg-gray-100 lg:px-3 lg:py-4 sm:text-sm text-sm text-blue-500 font-semibold hover:underline hover:text-pink-500"
          >
            Shop More
          </a>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto px-4 mt-6">
          {Q_Drift.map((item, index) => (
            <div key={index} className="flex flex-col">
              {/* Image Container */}
              <div className="relative w-full overflow-hidden rounded-xl cursor-pointer">
                {/* Discount Badge */}
                <span className="absolute top-3 left-3 bg-red-500 text-white text-sm px-2 py-1 rounded-md">
                  {item.discount}
                </span>

                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Product Info */}
              <div className="mt-3 text-left">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold text-red-500">
                    US ${item.price}
                  </span>
                  <span className="text-sm line-through text-gray-400">
                    US ${item.oldPrice}
                  </span>
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
