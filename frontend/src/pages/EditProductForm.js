import { useParams } from "react-router"
import Loader from "../components/Loader";
import { useState, useEffect } from "react";

export default function EditProductForm() {
    const [product, setProduct] = useState({});
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [price, setPrice] = useState("");
    const [stripeId, setStripeId] = useState("");
    const [protein, setProtein] = useState({});
    const [fat, setFat] = useState({});
    const [carbs, setCarbs] = useState({});
    const [salt, setSalt] = useState({});
    const [storage, setStorage] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const params = useParams();
  
    useEffect(() => {
   
      const fetchDetails = async () => {
          const response = await fetch(`/store/products/product/${params.id}`);
          const data = await response.json();
  
          if(response.ok) {
              setProduct(data);
              setName(data.name);
          setDescription(product.description);
          setPrice(product.price);
          setImage(product.image);
          setStripeId(product.price_id);
          setFat(product.fat);
          setSalt(product.salt);
          setCarbs(product.carbs);
          setProtein(product.protein);
          setStorage(product.storage);
          }
          else {
              console.log("error in getting details");
          }
      }
  
          fetchDetails();
          setIsLoading(false);
    }, []);

    return (
        <div className="edit-product-form">
            {isLoading && <Loader />}
            {product && <>
            <input type="text" value={product} onChange={e => setName(e.target.value)} />

            <textarea value={description} onChange={e => setDescription(e.target.value)}></textarea>

            <input type="number" value={price} onChange={e => setPrice(e.target.value)} />

            <input type="string" value={image} onChange={e => setImage(e.target.value)} />

            <input type="text" value={stripeId} onChange={e => setStripeId(e.target.value)} />

            <input type="text" value={fat} onChange={e => setFat(e.target.value)} />

            <input type="text" value={salt} onChange={e => setSalt(e.target.value)} />

            <input type="text" value={protein} onChange={e => setProtein(e.target.value)} />

            <input type="text" value={carbs} onChange={e => setCarbs(e.target.value)} />

            <input type="text" value={storage} onChange={e => setStorage(e.target.value)} />
</>
            }


        </div>
    )
}