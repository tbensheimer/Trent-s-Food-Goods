import {useState, useEffect } from "react";
import ProductForAdmin from "../components/ProductForAdmin";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import Button from "../components/Button";

export default function AdminProductList() {
    const [products, setProducts] = useState(null);
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

    const removeProductAfterDelete = (productId) => {
        const filteredProducts = products.filter(product => product._id !== productId);
        setProducts(filteredProducts);
    }


    return (
        <div className="admin-product-list-layout">
            {isLoading && <Loader />}
            {products && <Link to="/edit-product/0" className="create-product-btn"><Button>Create New Product</Button></Link>}
           {products && products.map(product => {
            return <ProductForAdmin
            key={product._id}
            details={product}
            removeProductAfterDelete={removeProductAfterDelete}
         />
           })
        }
        </div>
    )
}