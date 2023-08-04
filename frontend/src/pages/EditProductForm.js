import { useParams } from "react-router"
import Loader from "../components/Loader";
import { useState, useEffect } from "react";
import Input from "../components/Input"
import Button from "../components/Button";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import useFileConfig from "../hooks/useFileConfig";

export default function EditProductForm() {
    const [id, setId] = useState(0);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stripeId, setStripeId] = useState("");
    const [protein, setProtein] = useState("");
    const [fat, setFat] = useState("");
    const [carbs, setCarbs] = useState("");
    const [salt, setSalt] = useState("");
    const [storage, setStorage] = useState("");
    const [success, setSuccess] = useState(null);
    const params = useParams();
    const {get, post, error, loading} = useFetch(window.location.origin);
    const {handleFileChange, image, setImage, imageError} = useFileConfig();
  
    useEffect(() => {
      const fetchDetails = async () => {
        const data = await get(`/store/products/product/${params.id}`);
          if(data != undefined) {
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
      if(params.id !== "0") {
        fetchDetails();
      }
    }, []);

    const SaveChanges = async () => {
        let data;
        if(id === 0) {
            data = await post("/store/create-product", {name, description, image, price, stripeId, protein, fat, carbs, salt, storage});       
        }
        else {
            data = await post(`/store/edit-product/${id}`, {id, name, description, image, price, stripeId, protein, fat, carbs, salt, storage});
        }

            if(data != undefined && data.success) {
                if(id === 0) {
                setId(data._id);
                setSuccess("Successfully created product!");
                } 
                else {
                setSuccess("Successfully saved changes!");
                }
                } 
                else if(data == undefined) {
                setSuccess(null);
            }
    }

    return (
        <>
        <div className="edit-product-layout">
        <Link to="/admin-product-list"><Button outline className="product-details">Back</Button></Link>

        <div className="edit-product-form">
            {loading && <Loader />}
            
            <label htmlFor="name">Name:</label>
            <Input id="name" type="text" value={name} onChange={e => setName(e.target.value)} />

            <div>
            <label htmlFor="description">Description:</label>
            <textarea className="input textarea" id="description" value={description} onChange={e => setDescription(e.target.value)}></textarea>
            </div>

            <label htmlFor="price">Price:</label>
            <Input id="price" type="text" value={price} onChange={e => setPrice(e.target.value)} />

            <label htmlFor="image">Image:</label>
            <input required type="file" onChange={handleFileChange}/>
                <br/>
                <div className="form-img-layout">
                {image && <div className="img-container"><span className="bold">Preview:</span><img src={image} className="product-pic" alt="food pic" /></div>}
                {imageError && <div className="error">{imageError}</div>}
                </div>
                <br/>

            <label htmlFor="stripe">Price Id (from stripe, paypal, etc):</label>
            <Input id="stripe" type="text" value={stripeId} onChange={e => setStripeId(e.target.value)} />

            <label htmlFor="fat">Fat:</label>
            <Input id="fat" type="text" value={fat} onChange={e => setFat(e.target.value)} />

            <label htmlFor="salt">Salt:</label>
            <Input id="salt" type="text" value={salt} onChange={e => setSalt(e.target.value)} />

            <label htmlFor="protien">Protein:</label>
            <Input id="protein" type="text" value={protein} onChange={e => setProtein(e.target.value)} />

            <label htmlFor="carbs">Carbs:</label>
            <Input id="carbs" type="text" value={carbs} onChange={e => setCarbs(e.target.value)} />

            <div className="div">
            <label htmlFor="storage">Storage:</label>
            <textarea className="input textarea" id="storage" type="text" value={storage} onChange={e => setStorage(e.target.value)}></textarea>
            </div>

                {success && <div className="success">{success}</div>}
                {error && <div className="error">{error}</div>}
            <Button type="button" onClick={SaveChanges}>{id === 0 ? "Create" : "Save"}</Button>
        </div>
        </div>
        </>
    )
}