import {useEffect, useState} from "react";

export default function AdminList() {
const [users, setUsers] = useState([]);
const [error, setError] = useState(null);
const [success, setSuccess] = useState(null);

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

const ChangeAdmin = async (id) => {
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
        <div>
            {success && <div>{success}</div>}
            {error && <div>{error}</div>}
            {users && users.map(user => {
                return <div key={user.email}>{user.email} <input onChange={() => ChangeAdmin(user._id)} checked={user.admin} type="checkbox" /></div>
            })}
        </div>
    )
}