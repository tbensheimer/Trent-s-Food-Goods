import { NavLink } from "react-router-dom";
import {useSelector} from "react-redux";
import { cartCountSelector } from "../redux/store";
import useLogout from "../hooks/useLogout";
import Button from "../components/Button";

export default function Navbar() {
const cartCount = useSelector(cartCountSelector);

  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-brand">
        Trent's Food Goods
      </NavLink>

      <ul>
        <li className="nav-item">
          <NavLink className={({isActive}) => isActive ? "active" : ""} to="/">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={({isActive}) => isActive ? "active" : ""} to="/about">
            About us
          </NavLink>
        </li>
        {user && 
        <li className="nav-item">
          <NavLink className={({isActive}) => isActive ? "active" : ""} to="/products">
            Products
          </NavLink>
        </li>}

        {user && <li>
          <NavLink to="/cart" className="nav-item nav-cart btn btn-accent">
            Cart ({cartCount})
          </NavLink>
        </li>}
      </ul>

    </nav>
  );
    }
