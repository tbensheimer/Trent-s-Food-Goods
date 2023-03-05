import { Link } from "react-router-dom";
import Button from "../components/Button";
import { useSelector, useDispatch } from "react-redux";
import { addProduct, removeProduct } from "../redux/store";

export default function Product(props) {
  const { details } = props;
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);

  const productFromCart = cart.find((product) => product._id === details._id);

  const quantity = productFromCart ? productFromCart.quantity : 0;

  return (
    <div className="product">
      <div className="product-image-container">
        <Link to={`/products/product/${details._id}`}>
          <img src={details.image} width="100" height="100" className="product-image" alt={details.name} />
        </Link>
          {quantity > 0 && (
            <div className="product-quantity-container">
              <div className="product-quantity">{quantity}</div>
            </div>
          )}
      </div>
      <div className="product-info">
        <h3>{details.name}</h3>
        <p>{details.description}</p>
      </div>
      <div className="product-checkout">
        <div>
            {quantity > 0 && 
            <Button outline onClick={() => dispatch(removeProduct(details))} className="product-delete">x</Button>
          }
        </div>
        <div className="product-btn-div">
        <Link to={`/products/product/${details._id}`}><Button outline type="button" className="product-details">Details</Button></Link>
        <Button outline onClick={() => dispatch(addProduct(details))}>
          ${details.price}
        </Button>
        </div>
      </div>
    </div>
  )
}
