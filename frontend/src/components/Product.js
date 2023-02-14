import { Link } from "react-router-dom";
import Button from "../components/Button";

export default function Product(props) {
  const { details } = props;
 
  return (
    <div className="product">
      <div className="product-image-container">
        <Link to={`/products/product/${details._id}`}>
          <img src={details.image} width="100" height="100" className="product-image" alt={details.name} />
        </Link>
      </div>
      <div className="product-info">
        <h3>{details.name}</h3>
        <p>{details.description}</p>
      </div>
      <div className="product-checkout">
        <div className="product-btn-div">
        <Link to={`/products/product/${details._id}`}><Button outline type="button" className="product-details">Details</Button></Link>
        <Button outline onClick={() => {}}>
          ${details.price}
        </Button>
        </div>
      </div>
    </div>
  )
}
