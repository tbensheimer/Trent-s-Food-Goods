import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import Products from './pages/Products';
import ProductDetails from "./pages/ProductDetails";
import ProductDetailsNutrition from "./pages/ProductDetailsNutrition";
import ProductDetailsStorage from "./pages/ProductDetailsStorage";
import Cart from "./pages/Cart";
import {useSelector, useDispatch} from "react-redux"
import LoginForm from "./pages/LoginForm";
import SignupForm from "./pages/SignupForm";
import React, { useEffect } from "react";
import { login } from "./redux/store";
import Admin from "./pages/Admin";
import ProductDetailInfo from "./pages/ProductDetailInfo";
import AdminProductList from "./pages/AdminProductList";
import AdminList from "./pages/AdminList";
import EditProductForm from "./pages/EditProductForm";

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
              <Route path="" element={<ProductDetailInfo />}></Route>
   
                <Route path="nutrition" element={<ProductDetailsNutrition />}></Route>
    
                <Route path="storage" element={<ProductDetailsStorage />}></Route>
              </Route>
    
              <Route path="/cart" element={user ? <Cart /> : <Navigate to="/login" />}></Route>

              <Route path="/signup" element={!user ? <SignupForm /> : <Navigate to="/" />}></Route>

              <Route path="/login" element={!user ? <LoginForm /> : <Navigate to="/" />}></Route>

              <Route path="/admin/" element={user ? <Admin /> : <Navigate to="/login" />}>
                <Route path="" element={<AdminList />}></Route>

                <Route path="product-list" element={<AdminProductList />}></Route>
              </Route>

              <Route path="/edit-product/:id/" element={user && user.admin ? <EditProductForm /> : <Home />}></Route>
            </Routes>
          </div>
        </BrowserRouter>
    )
}

export default App;
