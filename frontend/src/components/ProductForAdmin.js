import Button from "./Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

export default function ProductForAdmin(props) {
    const {details} = props;
    let src = details.image;
    const [success, setSuccess] = useState(null);

    const deleteAlert = () => {
        confirmAlert({
          title: `Delete Product ${details.name}?`,
          message: "Are you sure you want to delete this product from the store? Customers won't be able to purchase this item anymore.",
          buttons: [
            {
              label: 'Yes',
              onClick: () => removeProduct()
            },
            {
              label: 'No',
            }
          ]
        });
    }

    const removeProduct = async () => {
        const response = await fetch(`/store/remove-product`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id: details._id})
        });

        const data = await response.json();

        if(response.ok) {
            setSuccess(data.success);
        }
        else {
            setSuccess(null);
        }
    }

    return (<>
        {success && <div className="success-alert">{success}</div> }
        <div className="product margin">
            <div className="product-image-container">
            <img src={src} width="70" height="70" className="product-image" alt={details.name} />
            </div>
            <div className="product-info">
        <h3>{details.name}</h3>
        <p>{details.description}</p>
        </div>
        <div className="action-btns">
        <Link to={`/edit-product/${details._id}`}><Button outline className="product-edit">Edit</Button></Link>
        <Button onClick={deleteAlert} outline className="product-delete">Remove</Button>
        </div>
        </div>
        </>
    )    
} 