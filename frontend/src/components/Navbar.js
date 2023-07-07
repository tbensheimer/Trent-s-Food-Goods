import { NavLink, Link } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import { cartCountSelector } from "../redux/store";
import useLogout from "../hooks/useLogout";
import Button from "../components/Button";
import Logo from "../assets/TFlogo.jpg";

export default function Navbar() {
const cartCount = useSelector(cartCountSelector);
const user = useSelector(state => state.user);
const dispatch = useDispatch();
const {Logout} = useLogout();

  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-brand">
        <img src={Logo} alt="TF store logo" height="80" width="80" />
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

        {/* {user && user.admin && <li className="nav-item">
          <NavLink to="/admin/" className={({isActive}) => isActive ? "active" : ""}>
            Admin
          </NavLink>
        </li>} */}
      </ul>

      {!user ? 
      <div className="navbar-user-login">
        <NavLink className="text" to="/login" >Login</NavLink>
      <NavLink className="text" to="/signup">Signup</NavLink>
      </div> 
      : 
      <div class="dropdown">
  <button class="btn btn-sm btn-light border shadow dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    {user.email.split('@')[0]} {user.admin && <span className="text-danger bold">Admin</span>}
  </button>
  <ul class="dropdown-menu">
  {user.admin && <li><Link to="/admin-product-list" class="dropdown-item" href="#">Manage Products</Link></li>}
    {user.admin && <li><Link to="/admin-list" class="dropdown-item" >Manage Admins</Link></li>}
    <li><a className="dropdown-item" onClick={() => dispatch(Logout())}>Logout</a></li>
  </ul>
</div>
      // <div className="navbar-user-logout">
      // <p>{user.email}</p>
      // <Button type="button" onClick={() => dispatch(Logout())}>Logout</Button>
      // </div>
    }

    </nav>
  );
    }
