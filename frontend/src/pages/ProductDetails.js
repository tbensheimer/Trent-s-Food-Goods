import { useState, useEffect } from "react";
import { Link, NavLink, useParams, Outlet} from "react-router-dom";
import Button from "../components/Button";
import Loader from "../components/Loader";
import { useSelector } from "react-redux";
import useFetch from "../hooks/useFetch";

export default function ProductDetails() {
  const [product, setProduct] = useState({});
  const params = useParams();
  const cart = useSelector(state => state.cart);
  const {get, loading} = useFetch(window.location.origin);
  const productFromCart = cart.find((product) => product._id === product._id);
  const quantity = productFromCart ? productFromCart.quantity : 0;

  useEffect(() => {
    const fetchDetails = async () => {
      const data = await get(`/store/products/product/${params.id}`);
      data != undefined ? setProduct(data) : console.log("Error getting details");
    }
        fetchDetails();
  }, []);

  return (
    <div className="product-details-layout">
      {loading && <Loader />}
      {product && <>
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
      </>
}
    </div>
  );
}
