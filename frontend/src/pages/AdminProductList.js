import {useState, useEffect } from "react";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Pagination from "../components/Pagination";
import usePagination from "../hooks/usePagination";

export default function AdminProductList() {
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
    },[])

    const removeProductAfterDelete = (productId) => {
        const filteredProducts = products.filter(product => product._id !== productId);
        setProducts(filteredProducts);
    }

    return (
        <div className="admin-product-list-layout">
            {isLoading && <Loader />}
            {products && <Link to="/edit-product/0" className="create-product-btn"><Button>Create New Product</Button></Link>}
                {products && <Pagination {...paginationAttributes} 
                          onPrevClick={onPrevClick} 
                          onNextClick={onNextClick}
                          onPageChange={onPageChange}
                          admin={true}
                          data={products}
                          totalPages={Math.ceil(products.length / 4)}
                          removeProductAfterDelete={removeProductAfterDelete}
                          dataPerPage={4}
                          />
                          }
        </div>
    )
}