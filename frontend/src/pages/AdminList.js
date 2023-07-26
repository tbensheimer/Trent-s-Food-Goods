import {useEffect, useState} from "react";
import Pagination from "../components/Pagination";

export default function AdminList() {
const [users, setUsers] = useState([]);
const [error, setError] = useState(null);
const [success, setSuccess] = useState(null);

//
const pageNumberLimit = 5;
const [currentPage, setCurrentPage] = useState(1);
const [maxPageLimit, setMaxPageLimit] = useState(5);
const [minPageLimit, setMinPageLimit] = useState(0);
//

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

const onPageChange= (pageNumber)=>{
    setCurrentPage(pageNumber);
  }
  const onPrevClick = ()=>{
      if((currentPage-1) % pageNumberLimit === 0){
          setMaxPageLimit(maxPageLimit - pageNumberLimit);
          setMinPageLimit(minPageLimit - pageNumberLimit);
      }
      setCurrentPage(prev=> prev-1);
   }

  const onNextClick = ()=>{
       if(currentPage+1 > maxPageLimit){
           setMaxPageLimit(maxPageLimit + pageNumberLimit);
           setMinPageLimit(minPageLimit + pageNumberLimit);
       }
       setCurrentPage(prev=>prev+1);
    }

    const paginationAttributes = {
      currentPage,
      maxPageLimit,
      minPageLimit,
    };

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
                          totalPages={Math.ceil(users.length / 8)}/>
                          }
        </div>
    )
}