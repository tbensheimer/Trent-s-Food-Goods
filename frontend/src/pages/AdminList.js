import {useEffect, useState} from "react";
import Pagination from "../components/Pagination";
import usePagination from "../hooks/usePagination";
import useFetch from "../hooks/useFetch";
import Loader from "../components/Loader";

export default function AdminList() {
const [users, setUsers] = useState(null);
const [success, setSuccess] = useState(null);
const {paginationAttributes, onNextClick, onPrevClick, onPageChange} = usePagination();
const {get, post, error, loading } = useFetch(window.location.origin);

useEffect(() => {
    const fetchUsers = async () => {
        const data = await get("/user/users");
        data != undefined ? setUsers(data.users) : setUsers(null);
}
    fetchUsers();
}, [])

const changeAdmin = async (id) => {
    const data = await post("/user/admin", {id})
    if(data != undefined) {
        setUsers(data.users);
        setSuccess("Successfully updated Admin Status!");
    } else {
        setSuccess(null);
    }
}
    return (
        <div className="admin-list-layout">
            <h2 className="margin">Admin List</h2>
            {loading && <Loader />}
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