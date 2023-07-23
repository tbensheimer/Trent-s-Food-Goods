import {useState, useEffect } from "react";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Pagination from "../components/Pagination";

export default function AdminProductList() {
    const [products, setProducts] = useState(null);
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
    },[])

    const removeProductAfterDelete = (productId) => {
        const filteredProducts = products.filter(product => product._id !== productId);
        setProducts(filteredProducts);
    }

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
        <div className="admin-product-list-layout">
            {isLoading && <Loader />}
            {products && <Link to="/edit-product/0" className="create-product-btn"><Button>Create New Product</Button></Link>}
                {products && <Pagination {...paginationAttributes} 
                          onPrevClick={onPrevClick} 
                          onNextClick={onNextClick}
                          onPageChange={onPageChange}
                          admin={true}
                          products={products}
                          totalPages={Math.ceil(products.length / 4)}
                          removeProductAfterDelete={removeProductAfterDelete}
                          />
                          }
        </div>
    )
}