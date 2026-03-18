import logo from './logo.svg';
import './App.css';
import LoginForm from "./LoginForm";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <LoginForm />
                <button onClick={test}>Test</button>
                <button onClick={getJobs}>Get Jobs</button>
            </header>
        </div>
    );
}

async function test() {
    const res = await fetch("https://localhost:5000/api/auth/test", {
        method: "GET",
    });

    const data = await res.json();
    console.log(data);
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
