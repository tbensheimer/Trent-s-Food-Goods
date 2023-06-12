import Button from "./Button";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function ProductForAdmin(props) {
    const {details} = props;
    let src = details.image;
    const [success, setSuccess] = useState(null);


    const removeProduct = async () => {

        const response = await fetch(`/remove-product/${details._id}`);

        const data = await response.json();

        if(response.ok) {
            setSuccess(data.success);
        }
        else {
            setSuccess(null);
        }
    }

    return (
        <div className="admin-product-list">
            {success && <div className="success-alert">{success}</div> }
            <div className="product-image-container">
            <img src={src} width="100" height="100" className="product-image" alt={details.name} />
            </div>
        <h3>{details.name}</h3>
        <p>{details.description}</p>
        <div className="action-btns">
        <Link to={`/edit-product/${details._id}`}><Button outline className="edit">Edit</Button></Link>
        <Button onClick={removeProduct} outline className="delete">Remove</Button>
        </div>
        </div>
    )    

} 