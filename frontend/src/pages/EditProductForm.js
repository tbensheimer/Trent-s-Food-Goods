import { useParams } from "react-router"
import Loader from "../components/Loader";
import { useState, useEffect } from "react";
import Input from "../components/Input"

export default function EditProductForm() {
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
              setName(data.name);
              setDescription(data.description);
              setPrice(data.price);
              setImage(data.image);
              setStripeId(data.price_id);
              setFat(data.fat);
              setProtein(data.protein);
              setSalt(data.salt);
              setCarbs(data.carbs);
              setStorage(data.storage);
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
            {name && <>
            <label for="name">Name:</label>
            <Input id="name" type="text" value={name} onChange={e => setName(e.target.value)} />

            <div>
            <label for="description">Description:</label>
            <textarea className="input textarea" id="description" value={description} onChange={e => setDescription(e.target.value)}></textarea>
            </div>

            <label for="price">Price:</label>
            <Input id="price" type="number" value={price} onChange={e => setPrice(e.target.value)} />

            <label for="image">Image:</label>
            <Input type="string" value={image} onChange={e => setImage(e.target.value)} />

            <label for="stripe">Price Id (from stripe, paypal, etc):</label>
            <Input id="stripe" type="text" value={stripeId} onChange={e => setStripeId(e.target.value)} />

            <label for="fat">Fat:</label>
            <Input id="fat" type="text" value={fat} onChange={e => setFat(e.target.value)} />

            <label for="salt">Salt:</label>
            <Input id="salt" type="text" value={salt} onChange={e => setSalt(e.target.value)} />

            <label for="protien">Protein:</label>
            <Input id="protein" type="text" value={protein} onChange={e => setProtein(e.target.value)} />

            <label for="carbs">Carbs:</label>
            <Input id="carbs" type="text" value={carbs} onChange={e => setCarbs(e.target.value)} />

            <div className="div">
            <label for="storage">Storage:</label>
            <textarea className="input textarea" id="storage" type="text" value={storage} onChange={e => setStorage(e.target.value)}></textarea>
            </div>
</>
            }
        </div>
    )
}