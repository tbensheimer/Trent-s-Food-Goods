import {useState} from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import useSignup from "../hooks/useSignup";

export default function SignupForm() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const {loading, error, Signup} = useSignup("");

const handleFormSubmit = async (e) => {
    e.preventDefault();
    await Signup(email, password);
}

    return (
        <div className="signup-form-layout">
        <form onSubmit={handleFormSubmit}>
            <h1>Signup</h1>
        <Input required placeholder="Email" id="email" type="email" onChange={e => setEmail(e.target.value)} value={email} />
        <Input required placeholder="Password" id="password" type="password" onChange={e => setPassword(e.target.value)} value={password} />
        <Button disabled={loading} type="submit">Signup</Button>
        {error && <div className="error">{error}</div>}
        </form>
        </div>
    )
}
