import { useState, useEffect } from "react";
import Product from "../components/Product";
import Loader from "../components/Loader";

export default function Products(props) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      const fetchProducts = async () => {
        const response = await fetch("/store/products");
        const data = await response.json();

        if(response.ok) {
            setProducts(data.products);
            setIsLoading(false);
        }
        else {
            console.log("error in getting products");
            setIsLoading(false);
        }
      }
      fetchProducts();
  }, []);

  return (
    <div className="products-layout">
      <h1>Products</h1>
      <p>Take a look at our products</p>
      <div className="products-grid">
      {isLoading && <Loader />}
        {products && products.map((product) => {
          return (
            <Product
              key={product._id}
              details={product}
            ></Product>
          );
        })}
      </div>
    </div>
  );
}
