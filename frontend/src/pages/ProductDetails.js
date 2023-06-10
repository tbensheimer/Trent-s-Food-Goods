import { useState, useEffect } from "react";
import { Link, NavLink, useParams, Outlet} from "react-router-dom";
import Button from "../components/Button";
import Loader from "../components/Loader";

export default function ProductDetails(props) {
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  console.log(params.id)

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

        <h2>{product.name}</h2>
        <img
          src={product.image}
          width="125"
          height="125"
          className="product-details-image"
          alt={product.name}
        />
      </div>
      <div>
        <div className="tabs">
          <ul>
          <li>
              <NavLink className={({isActive}) => isActive ? "tab-active" : ""} to="" end>
                Details
              </NavLink>
            </li>
            <li>
              <NavLink className={({isActive}) => isActive ? "tab-active" : ""} to="" end>
                Nutrition
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({isActive}) => isActive ? "tab-active" : ""}
                to="storage"
              >
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
