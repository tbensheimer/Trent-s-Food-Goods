import {useState} from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import {useLogin} from "../hooks/useLogin";
import {Link} from "react-router-dom";

export default function LoginForm() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const {error, loading, Login} = useLogin();


const handleFormSubmit = async (e) => {
        e.preventDefault();
        await Login(email, password);
}

    return (
        <div className="login-form-layout">
        <form onSubmit={handleFormSubmit}>
            <h1>Login</h1>
        <Input required placeholder="Email" id="email" type="email" onChange={e => setEmail(e.target.value)} value={email} />
        <Input required placeholder="Password" id="password" type="password" onChange={e => setPassword(e.target.value)} value={password} />
        <Button disabled={loading} type="submit">Login</Button>
        {error && <div className="error">{error}</div>}
        </form>
        
        <p>Don't have account? <Link to="/signup">Sign up</Link></p>
        </div>
    )
}
