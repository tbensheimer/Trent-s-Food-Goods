import { useParams } from "react-router"
import Loader from "../components/Loader";
import { useState, useEffect } from "react";
import Input from "../components/Input"
import Button from "../components/Button";

export default function EditProductForm() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [imageError, setImageError] = useState(null);
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

    const handleFileChange = async (e) => {
        setImage(null);

        let file = e.target.files[0];  //selects first file if multiple uploaded

        if(!file) {
            setImageError("Please select a file");
            return;
        }

        if(!file.type.includes('image')) {
            setImageError("File type must be an image");
            return;
        }

        if(file.size > 100000) {
            setImageError("File size must be less than 100Kb");
            return;
        }

        const base64 = await convertToBase64(file);
        setImage(base64);
        setImageError(null);
    }

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }

    const SaveChanges = () => {
        
    }

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
            <input required type="file" onChange={handleFileChange}/>
                {image && <div className="img-container">Preview:<img src={image} className="product-pic" alt="food pic" /></div>}
                {imageError && <div className="error">{imageError}</div>}
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

            <Button type="button" onClick={SaveChanges}>Save</Button>
</>
            }
        </div>
    )
}