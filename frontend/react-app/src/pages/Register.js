import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Register({ setIsLoggedIn }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        const res = await fetch("https://localhost:5000/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        console.log(data);

        localStorage.setItem("token", data.token);
        setIsLoggedIn(true);
        navigate("/dashboard");
    }

    return (
        <div>
        <h1>Register Page</h1>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Login</button>
            </form>
            <button onClick={() => navigate("/login")}>Already have an account? Log in</button>
            <button onClick={() => navigate("/")}>Go back</button>
        </div>
    );
}

export default Register;