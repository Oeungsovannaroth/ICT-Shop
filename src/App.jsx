import { Route, Routes } from "react-router-dom";
import Navbar from "./components/ui/Navbar";
import Home from "./pages/Home";
import Footer from "./components/ui/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "./context/CartContext";
import ProductDetails from "./pages/ProductDetails";
import Hero from "./components/Hero";
import { WishlistProvider } from "./context/WishlistContext";
const App = () => {
  return (
    <CartProvider>
      <WishlistProvider>
        <Toaster position="top-right" />
        <>
          <nav>
            <Navbar />
          </nav>
          <main className="pt-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/ProductDetails/:id" element={<ProductDetails />} />
              {/* <Route path="/Hero" element={<Hero />} /> */}
            </Routes>
            <ScrollToTop />
          </main>
          <footer>
            <Footer />
          </footer>
        </>
      </WishlistProvider>
    </CartProvider>
  );
};

export default App;
