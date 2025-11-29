import { Route, Routes } from "react-router-dom";
import Navbar from "./components/ui/Navbar";
import Home from "./pages/Home"
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
    </>
  );
};

export default App;
