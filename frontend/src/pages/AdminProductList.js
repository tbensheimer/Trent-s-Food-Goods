import {useState, useEffect } from "react";
import ProductForAdmin from "../components/ProductForAdmin";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import Button from "../components/Button";

export default function AdminProductList() {
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
    },[])


    return (
        <div className="admin-product-list-layout">
            {isLoading && <Loader />}
            <Link to="/edit-product/0"><Button>Create Product</Button></Link>
           {products && products.map(product => {
            return <ProductForAdmin
            key={product._id}
            details={product}
         />
           })
        }
        </div>
    )
}