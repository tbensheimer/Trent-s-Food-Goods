import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";
import usePagination from "../hooks/usePagination";
import useFetch from "../hooks/useFetch";

export default function Products(props) {
  const [products, setProducts] = useState(null);
  const {paginationAttributes, onNextClick, onPrevClick, onPageChange} = usePagination();
  const {get, loading, error} = useFetch(window.location.origin);

  useEffect(() => {
      const fetchProducts = async () => {
        const data = await get("/store/products");
        data != undefined ? setProducts(data.products) : setProducts(null);
      }
      fetchProducts();
  }, []);

  return (
    <div className="products-layout">
      <h2 className="center">Products</h2>
      <p className="center">Take a look at our products</p>
      <div className="products-grid">
      {loading && <Loader />}
      {error && <div className="error">{error}</div>}
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
