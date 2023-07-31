import { NavLink, Link } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import { cartCountSelector } from "../redux/store";
import useLogout from "../hooks/useLogout";
import Logo from "../assets/TFG-logo.jpg";

export default function Navbar() {
const cartCount = useSelector(cartCountSelector);
const user = useSelector(state => state.user);
const dispatch = useDispatch();
const {Logout} = useLogout();

  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-brand">
        <img src={Logo} className="img" alt="TFG store logo" height="80" width="120" />
      </NavLink>

      <ul className="overflow-visible">
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

        {!user ? 
        <li>
      <div className="navbar-user-login">
        <NavLink className="text" to="/login" >Login</NavLink>
      <NavLink className="text" to="/signup">Signup</NavLink>
      </div> 
      </li>
      : 
      <li>
      <div className="user-cart-div">
      <div className="dropdown">
  <button className="btn btn-sm btn-light shadow dropdown-toggle green-border" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    {user.email.split('@')[0]} {user.admin && <span className="text-success bold">Admin</span>}
  </button>
  <ul className="dropdown-menu green-border">
  {user.admin && <li className="green-underline"><Link to="/admin-product-list" className="dropdown-item" href="#">Manage Products</Link></li>}
    {user.admin && <li className="green-underline"><Link to="/admin-list" className="dropdown-item" >Manage Admins</Link></li>}
    <li><a className="dropdown-item cursor" onClick={() => dispatch(Logout())}>Logout</a></li>
  </ul>
</div>
<NavLink to="/cart" className={({isActive}) => isActive ? "active nav-item nav-cart btn btn-success" : "nav-item nav-cart btn btn-accent-g"}>
            Cart ({cartCount})
          </NavLink>
</div>
</li>
    }

        
      </ul>
    </nav>
  );
    }
