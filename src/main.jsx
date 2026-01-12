import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext.jsx";
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init({
  duration: 2500,       // matches your transition duration
  once: true,           // animate only once (better performance)
  easing: "ease-in-out",
  offset: 100,          // start animation 100px before element
});
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <WishlistProvider>
        <App />
      </WishlistProvider>
    </CartProvider>                                                         
  </StrictMode>
);
