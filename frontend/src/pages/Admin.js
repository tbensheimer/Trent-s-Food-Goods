export default function Admin() {
    return (
        <div>
    <div className="admin-layout">
      {isLoading && <Loader />}
      </div>
      <div>
        <div className="tabs">
          <ul>
            <li>
              <NavLink className={({isActive}) => isActive ? "tab-active" : ""} to="" end>
                Admin Info
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({isActive}) => isActive ? "tab-active" : ""}
                to="admin-list">
                Manage Admin List
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
        </div>
      </div>
    </div>
    )
}