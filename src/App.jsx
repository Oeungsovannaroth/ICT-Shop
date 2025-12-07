import { Route, Routes } from "react-router-dom";
import Navbar from "./components/ui/Navbar";
import Home from "./pages/Home";
import Footer from "./components/ui/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "./context/CartContext";

const App = () => {
  return (
    <CartProvider>
      <Toaster position="top-right" />
      <>
        <nav>
          <Navbar />
        </nav>
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
          
          </Routes>
          <ScrollToTop />
        </main>
        <footer>
          <Footer />
        </footer>
      </>
    </CartProvider>
  );
};

export default App;
