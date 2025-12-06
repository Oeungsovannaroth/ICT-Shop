// import React, { useEffect, useState } from "react";
// import { ShoppingCart, X } from "lucide-react";
// import { Link } from "react-router-dom";

// const AddToCart = () => {
//   const [cart, setCart] = useState([]);
//   const [showCart, setShowCart] = useState(false);

//   const addToCart = (product) => {
//     setCart((prev) => [...prev, product]);
//   };

//   const removeFromCart = (id) => {
//     setCart((prev) => prev.filter((item) => item.id !== id));
//   };

//   useEffect(() => {
//     const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCart(savedCart);
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart]);

//   return (
//     <div className="relative cursor-pointer">
//       {/* 🛒 Cart Icon */}
//       <button
//         onClick={() => setShowCart(!showCart)}
//         className="relative hover:scale-110 transition"
//       >
//         <ShoppingCart size={26} className="text-gray-800" />

//         {cart.length > 0 && (
//           <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs rounded-full px-2 py-0.5">
//             {cart.length}
//           </span>
//         )}
//       </button>

//       {/* 🧾 Cart Modal */}
//       {showCart && (
//         <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
//           <div className="bg-blue-50 shadow-2xl rounded-2xl w-[420px] max-h-[80vh] p-6 relative flex flex-col">
//             {/* Close */}
//             <button
//               onClick={() => setShowCart(false)}
//               className="absolute top-4 right-4 text-gray-600 hover:text-purple-600 transition"
//             >
//               <X size={22} />
//             </button>

//             {/* Title */}
//             <h2 className="text-2xl font-bold text-purple-700 text-center mb-4">
//               Your Cart 🛒
//             </h2>

//             {/* Items */}
//             <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-transparent">
//               {cart.length === 0 ? (
//                 <p className="text-gray-500 text-center py-10">
//                   Your cart is empty
//                 </p>
//               ) : (
//                 cart.map((item) => (
//                   <div
//                     key={item.id}
//                     className="flex items-center justify-between bg-white shadow-sm rounded-lg p-3 hover:shadow-md transition"
//                   >
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="w-12 h-12 object-contain rounded-md border"
//                     />
//                     <div className="flex-1 px-3 text-left">
//                       <p className="text-sm font-semibold text-gray-800">
//                         {item.name}
//                       </p>
//                       <p className="text-xs text-gray-600">
//                         ${item.price.toFixed(2)}
//                       </p>
//                     </div>
//                     <button
//                       onClick={() => removeFromCart(item.id)}
//                       className="text-red-500 hover:text-red-600 text-sm font-medium"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 ))
//               )}
//             </div>

//             {/* Total */}
//             {cart.length > 0 && (
//               <div className="mt-5 border-t pt-4">
//                 <p className="font-semibold text-lg text-center mb-3">
//                   Total: $
//                   {cart
//                     .reduce((total, item) => total + item.price, 0)
//                     .toFixed(2)}
//                 </p>

//                 <Link
//                   to="/payment"
//                   className="block w-full bg-purple-500 text-white text-center py-3 rounded-lg hover:bg-purple-600 transition font-medium shadow-md"
//                 >
//                   Pay now
//                 </Link>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AddToCart;
