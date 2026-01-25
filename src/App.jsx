import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/ui/Navbar";
import Home from "./pages/Home";
import Footer from "./components/ui/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import ProductDetails from "./pages/ProductDetails";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import ThankYou from  "./pages/ThankYou"; 
const App = () => {
  return (
    <BrowserRouter>
      <CartProvider>
        <WishlistProvider>
          <Toaster position="top-right" />

          <div className="flex flex-col min-h-screen">
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
              <Navbar />
            </nav>

            <main className="pt-20 flex-1">
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/:gender" element={<CategoryPage />} />
                <Route path="/:gender/:section" element={<CategoryPage />} />
                <Route
                  path="/:gender/:section/:subcategory"
                  element={<CategoryPage />}
                />
                <Route path="/CartPage" element={<CartPage />}></Route>
                <Route path="/Checkout" element={<Checkout/>}></Route>
                <Route path="/ThankYou" element={<ThankYou/>}></Route>
                {/* <Route path="/hero" element={<Hero />} /> */}
              </Routes>
            </main>

            <footer className="mt-auto">
              <Footer />
            </footer>
          </div>
        </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
  );
};

export default App;
