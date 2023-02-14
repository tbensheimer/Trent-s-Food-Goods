import { NavLink } from "react-router-dom";
import Button from "../components/Button";

export default function Navbar() {

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
      </ul>

    </nav>
  );
    }
