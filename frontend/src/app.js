import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import Products from './pages/Products';
import ProductDetails from "./pages/ProductDetails";
import ProductDetailNutrition from "./pages/ProductDetailNutrition";
import ProductDetailStorage from "./pages/ProductDetailStorage";
import Cart from "./pages/Cart";
import {useSelector, useDispatch} from "react-redux"
import LoginForm from "./pages/LoginForm";
import SignupForm from "./pages/SignupForm";
import { useEffect } from "react";
import { login } from "./redux/store";

function App() {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if(user) {
        dispatch(login(user));
    }
}, [dispatch])

  return (
    <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>              

              <Route path="/" element={<Home />}></Route>
    
              <Route path="/about" element={<About />}></Route>
    
              <Route path="/products" element={user ? <Products/> : <Navigate to="/login" />}></Route>
    
              <Route path="/products/product/:id/" element={user ? <ProductDetails /> : <Navigate to="/login" />}>    
                <Route path="" element={<ProductDetailNutrition />}></Route>
    
                <Route path="storage" element={<ProductDetailStorage />}></Route>
              </Route>
    
              <Route path="/cart" element={user ? <Cart /> : <Navigate to="/login" />}></Route>

              <Route path="/signup" element={!user ? <SignupForm /> : <Navigate to="/" />}></Route>

              <Route path="/login" element={!user ? <LoginForm /> : <Navigate to="/" />}></Route>
            </Routes>
          </div>
        </BrowserRouter>
    )
}

export default App;
