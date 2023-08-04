import {useState, useEffect } from "react";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Pagination from "../components/Pagination";
import usePagination from "../hooks/usePagination";
import useFetch from "../hooks/useFetch";

export default function AdminProductList() {
    const [products, setProducts] = useState(null);
    const {paginationAttributes, onNextClick, onPrevClick, onPageChange} = usePagination();
    const {get, error, loading} = useFetch(window.location.origin);

    useEffect(() => {
        const fetchProducts = async () => { 
            const data = await get("/store/products");
            data != undefined ? setProducts(data.products) : setProducts(null);
    }
        fetchProducts();
    },[])

    const removeProductAfterDelete = (productId) => {
        const filteredProducts = products.filter(product => product._id !== productId);
        setProducts(filteredProducts);
    }

    return (
        <div className="admin-product-list-layout">
            {loading && <Loader />}
            {error && <div className="error">{error}</div>}
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