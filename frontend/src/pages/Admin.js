import { NavLink } from "react-router-dom"
import { Outlet } from "react-router-dom"

export default function Admin() {
    return (
        <div>
    <div className="admin-layout">
      </div>
      <div>
        <div className="tabs">
          <ul>
            <li>
              <NavLink className={({isActive}) => isActive ? "tab-active" : ""} to="" end>
                Admin List
              </NavLink>
            </li>
    
            <li>
              <NavLink
                className={({isActive}) => isActive ? "tab-active" : ""}
                to="product-list">
                Manage Product List
              </NavLink>
            </li>
          </ul>
          <Outlet />
        </div>
      </div>
    </div>
    )
}