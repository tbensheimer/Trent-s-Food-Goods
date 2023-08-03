import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";
import usePagination from "../hooks/usePagination";

export default function Products(props) {
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const {paginationAttributes, onNextClick, onPrevClick, onPageChange} = usePagination();

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
      <h2 className="center">Products</h2>
      <p className="center">Take a look at our products</p>
      <div className="products-grid">
      {isLoading && <Loader />}
        {products && <Pagination {...paginationAttributes} 
                          onPrevClick={onPrevClick} 
                          onNextClick={onNextClick}
                          onPageChange={onPageChange}
                          admin={false}
                          data={products}
                          totalPages={Math.ceil(products.length / 4)}
                          dataPerPage={4}/>
                          }
      </div>
    </div>
  );
}
