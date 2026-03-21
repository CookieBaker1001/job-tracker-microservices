import { useNavigate } from "react-router-dom";
import { useState } from "react";

function App() {
    const [serviceState, setServiceState] = useState("");

    function handleServiceState(data) {
        if (data.status === "ok") {
            setServiceState("Service is up and running!");
        } else {
            setServiceState("Service is down!");
        }
    }

    const navigate = useNavigate();
    return (
        <div>
            <h1>Home Page</h1>
            <button onClick={() => navigate("/login")}>Log in</button>
            <button onClick={() => navigate("/register")}>Register</button>
            <hr />
            <button onClick={() => authTest({ setServiceState })}>Test Auth Service</button>
            <button onClick={() => jobTest({ setServiceState })}>Test Job Service</button>
            <h4>{serviceState}</h4>
        </div>
    );
}



async function authTest({ setServiceState }) {
    const res = await fetch("https://localhost:5000/api/auth/test", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    const data = await res.text();
    setServiceState(data);
    console.log("Looks like this: " + data);
}

async function jobTest({ setServiceState }) {
    const res = await fetch("https://localhost:5000/api/jobs/test", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    const data = await res.text();
    setServiceState(data);
    console.log(data);
}

export default App;