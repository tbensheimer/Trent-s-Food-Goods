import {useState} from "react";
import {useDispatch} from "react-redux";
import {login} from "../redux/store";

export default function useSignup() {
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
const dispatch = useDispatch();

const Login = async(email, password) => {
    setLoading(true);
    setError(null);

    const response = await fetch("/user/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password})
    });
    const data = await response.json();

    if(!response.ok) {
        setError(data.error);
        setLoading(false);
    }

    if(response.ok) {
        setLoading(false);
        localStorage.setItem("user", JSON.stringify(data));
        dispatch(login(data));
    }
}

return {error, loading, Login}

}
