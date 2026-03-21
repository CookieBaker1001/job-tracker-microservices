import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";


import logo from './logo.svg';
import './App.css';


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="" element={<Home />} />
                <Route path="/home" element={<Home />} />

                <Route path="/login"
                    element={<Login setIsLoggedIn={ setIsLoggedIn } />} />

                <Route path="/register"
                    element={<Register setIsLoggedIn={ setIsLoggedIn } />} />

                <Route path="dashboard" element={
                    isLoggedIn ? (
                        <Dashboard setIsLoggedIn={ setIsLoggedIn } />
                    ): (
                            <Navigate to="/login" />
                        )
                } />
            </Routes>
        </BrowserRouter>

        //<div className="App">
        //    <header className="App-header">
        //        <img src={logo} className="App-logo" alt="logo" />
        //        <LoginForm />
        //        <button onClick={test}>Test</button>
        //        <button onClick={getJobs}>Get Jobs</button>
        //    </header>
        //</div>
    );
}

async function test() {
    const res = await fetch("https://localhost:5000/api/auth/test", {
        method: "GET",
    });

    const data = await res.json();
    console.log(data);
}

export default App;
