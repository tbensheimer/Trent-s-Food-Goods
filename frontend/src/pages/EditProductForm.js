import { useParams } from "react-router"
import Loader from "../components/Loader";
import { useState, useEffect } from "react";
import Input from "../components/Input"
import Button from "../components/Button";
import { Link } from "react-router-dom";

export default function EditProductForm() {
    const [id, setId] = useState(0);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [imageError, setImageError] = useState(null);
    const [price, setPrice] = useState("");
    const [stripeId, setStripeId] = useState("");
    const [protein, setProtein] = useState("");
    const [fat, setFat] = useState("");
    const [carbs, setCarbs] = useState("");
    const [salt, setSalt] = useState("");
    const [storage, setStorage] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [success, setSuccess] = useState(null);
    const params = useParams();
  
    useEffect(() => {
    
      const fetchDetails = async () => {
          const response = await fetch(`/store/products/product/${params.id}`);
          const data = await response.json();
  
          if(response.ok) {
              setId(data._id);
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

      if(params.Id !== 0) {
        fetchDetails();
      }
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

    const SaveChanges = async () => {
        let response;
        if(id === 0) {

            response = await fetch(`/store/create-product`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({name, description, image, price, stripeId, protein, fat, carbs, salt, storage})
            });        
        }
        else {
            response = await fetch(`/store/edit-product/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({id, name, description, image, price, stripeId, protein, fat, carbs, salt, storage})
            });
        }

        const data = await response.json();

        if(response.ok) {
            if(data.success) {

                if(id === 0) {
                setId(data._id);
                setSuccess("Successfully created product!");
                } 
                else {
                setSuccess("Successfully saved changes!");
                }
            }
        }
    }

    return (
        <>
        <Link to="/admin/product-list"><Button outline className="product-details">Back</Button></Link>

        <div className="edit-product-form">
            {isLoading && <Loader />}
            
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
                <br/>
                {image && <div className="img-container"><span className="bold">Preview:</span><img src={image} className="product-pic" alt="food pic" /></div>}
                {imageError && <div className="error">{imageError}</div>}
                <br/>

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

                {success && <div className="success">{success}</div>}
            <Button type="button" onClick={SaveChanges}>{id === 0 ? "Create" : "Save"}</Button>
        </div>
        </>
    )
}