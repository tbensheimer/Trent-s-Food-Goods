import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";

export default function Products(props) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //
  const pageNumberLimit = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageLimit, setMaxPageLimit] = useState(5);
  const [minPageLimit, setMinPageLimit] = useState(0);
  //
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

  const onPageChange= (pageNumber)=>{
    setCurrentPage(pageNumber);
  }
  const onPrevClick = ()=>{
      if((currentPage-1) % pageNumberLimit === 0){
          setMaxPageLimit(maxPageLimit - pageNumberLimit);
          setMinPageLimit(minPageLimit - pageNumberLimit);
      }
      setCurrentPage(prev=> prev-1);
   }

  const onNextClick = ()=>{
       if(currentPage+1 > maxPageLimit){
           setMaxPageLimit(maxPageLimit + pageNumberLimit);
           setMinPageLimit(minPageLimit + pageNumberLimit);
       }
       setCurrentPage(prev=>prev+1);
    }

    const paginationAttributes = {
      currentPage,
      maxPageLimit,
      minPageLimit,
    };

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
                          totalPages={Math.ceil(products.length / 4)}/>
                          }
      </div>
    </div>
  );
}
