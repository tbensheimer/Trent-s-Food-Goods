import {useEffect, useState} from "react";
import Pagination from "../components/Pagination";
import usePagination from "../hooks/usePagination";

export default function AdminList() {
const [users, setUsers] = useState(null);
const [error, setError] = useState(null);
const [success, setSuccess] = useState(null);
const {paginationAttributes, onNextClick, onPrevClick, onPageChange} = usePagination();

useEffect(() => {
    const fetchUsers = async () => {
    const response = await fetch("/user/users");

    const data = await response.json();

    if(response.ok) {
        setError(null);
        setUsers(data.users);
    } else {
        setError(data.error);
    }
}
fetchUsers();
}, [])

const changeAdmin = async (id) => {
    const response = await fetch("/user/admin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({id})
    });

    const data = await response.json();

    if(response.ok) {
        setUsers(data.users);
        setSuccess("Successfully updated Admin Status!");
        setError(null);
    } else {
        setSuccess(null);
        setError(data.error);
    }
}

    return (
        <div className="admin-list-layout">
            <h2 className="margin">Admin List</h2>
            {success && <div className="success">{success}</div>}
            {error && <div className="error">{error}</div>}
            {users && <Pagination {...paginationAttributes} 
                          onPrevClick={onPrevClick} 
                          onNextClick={onNextClick}
                          onPageChange={onPageChange}
                          admin={false}
                          adminList={true}
                          changeAdmin={changeAdmin}
                          data={users}
                          totalPages={Math.ceil(users.length / 5)}
                          dataPerPage={5}/>
                          }
        </div>
    )
}