import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import Products from './pages/Products';

function App() {
  
  return (
    <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>              

              <Route path="/" element={<Home />}></Route>
    
              <Route path="/about" element={<About />}></Route>
    
              <Route path="/products" element={<Products/>}></Route>
    
              <Route path="/products/product/:id/" element={<ProductDetails />}></Route>
    
          </Routes>
          </div>
        </BrowserRouter>
    )
}

export default App;
