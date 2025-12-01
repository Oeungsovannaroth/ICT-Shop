import { Route, Routes } from "react-router-dom";
import Navbar from "./components/ui/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Footer from "./components/ui/Footer"
const App = () => {
  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </main>
      <footer>
        <Footer/>
      </footer>
    </>
  );
};

export default App;
