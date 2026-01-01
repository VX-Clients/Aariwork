import { Routes, Route } from "react-router-dom";
import Home from "./Components/Pages/Home";
// import About from "./Components/Pages/About"; // Merged into Home
// import Contact from "./Components/Pages/Contact"; // Replaced by StickyContact
import Courses from "./Components/Pages/Courses";
// import Designs from "./Components/Pages/Designs"; // Merged into Home
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import ScrollToTop from "./ScrollToTop";
import QrPayment from './Components/Pages/QrPayment';
import PolicyPage from "./Components/Pages/PolicyPage";
import Shop from "./Components/Pages/Shop";
import StickyContact from "./Components/StickyContact";
import CartDrawer from "./Components/CartDrawer";
import { useProducts } from "./context/ProductContext";
import { Toaster } from "react-hot-toast";

function App() {
  const { isCartOpen, closeCart } = useProducts();

  return (
    <div className="app">
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <ScrollToTop />
      <StickyContact /> {/* Global Sticky Contact */}
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/about" element={<About />} /> Merged */}
          <Route path="/courses" element={<Courses />} />
          {/* <Route path="/contact" element={<Contact />} /> Replaced */}
          {/* <Route path="/designs" element={<Designs />} /> Merged */}
          <Route path="/shop" element={<Shop />} />
          <Route path="/pay" element={<QrPayment />} />
          <Route path="/policy" element={<PolicyPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
