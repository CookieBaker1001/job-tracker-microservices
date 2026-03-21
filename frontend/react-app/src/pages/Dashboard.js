import { useNavigate } from "react-router-dom";

function App({ setIsLoggedIn }) {
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/");
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={getJobs}>Get Jobs</button>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

async function getJobs() {
    const token = localStorage.getItem("token");

    const res = await fetch("https://localhost:5000/api/jobs", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    const data = await res.json();
    console.log(data);
}

export default App;