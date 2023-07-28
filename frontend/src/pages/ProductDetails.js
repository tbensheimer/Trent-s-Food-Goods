import { useState, useEffect } from "react";
import { Link, NavLink, useParams, Outlet} from "react-router-dom";
import Button from "../components/Button";
import Loader from "../components/Loader";
import { useSelector } from "react-redux";

export default function ProductDetails() {
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const cart = useSelector(state => state.cart);

  const productFromCart = cart.find((product) => product._id === product._id);

  const quantity = productFromCart ? productFromCart.quantity : 0;

  useEffect(() => {
 
    const fetchDetails = async () => {
        const response = await fetch(`/store/products/product/${params.id}`);
        const data = await response.json();

        if(response.ok) {
            setProduct(data);
        }
        else {
            console.log("error in getting details");
        }
    }

        fetchDetails();
        setIsLoading(false);
  }, []);

  return (
    <div className="product-details-layout">
      {isLoading && <Loader />}
      <div>
      <Link to="/products"><Button outline className="product-details">Back</Button></Link>
        <div className="center margin">
        <div className="product-image-container">
        <img
          src={product.image}
          width="125"
          height="125"
          className="product-details-image"
          alt={product.name}
        />
        {quantity > 0 && (
            <div className="product-quantity-container">
              <div className="product-quantity">{quantity}</div>
            </div>
          )}
          </div>
          </div>
      </div>
      <div className="details-div">
        <div className="tabs">
          <h2 className="text-center">{product.name}</h2>
          <ul>
          <li>
              <NavLink className={({isActive}) => isActive ? "tab-active" : ""} to="" end>
                Details
              </NavLink>
            </li>
            <li>
              <NavLink className={({isActive}) => isActive ? "tab-active" : ""} to="nutrition">
                Nutrition
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({isActive}) => isActive ? "tab-active" : ""} to="storage">
                Storage
              </NavLink>
            </li>
          </ul>
        </div>
        
        <Outlet context={product} />
      </div>
    </div>
  );
}
