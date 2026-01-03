import React from "react";
import { useParams, Link } from "react-router-dom";
import homeData from "../data/homeData";

const CategoryPage = () => {
  const { gender, section, subcategory } = useParams();

  // Build full path to match menuData
  const pathParts = [gender, section, subcategory].filter(Boolean);
  const currentPath = "/" + pathParts.join("/");

  // Example filtering logic — adjust based on your data
  let products = [];

  if (gender?.toLowerCase() === "women") {
    products = [
      ...homeData.shoes,
      ...homeData.lifestyleProducts,
      ...homeData.driftProducts,
      // filter by tags if you have them
    ].filter(p => {
      // Simple example: show all for now, or add real filtering
      return true;
    });
  } else if (gender?.toLowerCase() === "men") {
    products = homeData.shoes; // adjust
  } else if (gender?.toLowerCase() === "boys") {
    products = homeData.driftProducts;
  } else if (gender?.toLowerCase() === "girls") {
    products = homeData.lifestyleProducts;
  }

  // Optional: filter further by section/subcategory
  // e.g., if (subcategory === "Sportlife") filter by name or tag

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8 capitalize">
        {gender} {section && `> ${section}`} {subcategory && `> ${subcategory}`}
      </h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-500 py-20 text-xl">
          No products found in this category yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="group"
            >
              <div className="overflow-hidden rounded-xl bg-gray-100">
                <img
                  src={product.img || product.img1 || product.frontImg}
                  alt={product.name}
                  className="w-full h-96 object-cover group-hover:scale-105 transition"
                />
              </div>
              <div className="mt-4 text-center">
                <h3 className="font-medium text-lg">{product.name}</h3>
                <p className="text-xl font-bold mt-2">${product.price}</p>
                {product.oldPrice && (
                  <p className="text-sm line-through text-gray-500">
                    ${product.oldPrice}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;