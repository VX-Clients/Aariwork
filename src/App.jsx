import { Routes, Route } from "react-router-dom";
import Home from "./Components/Pages/Home";
import About from "./Components/Pages/About";
import Contact from "./Components/Pages/Contact";
import Courses from "./Components/Pages/Courses";
import Designs from "./Components/Pages/Designs";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import ScrollToTop from "./ScrollToTop";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="app">
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <ScrollToTop />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/designs" element={<Designs />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
