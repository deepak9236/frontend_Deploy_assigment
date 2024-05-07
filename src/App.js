import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
// import UserManagement from './pages/UserManagement';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
// import ChangePassword from './components/Auth/ChangePassword';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

    // Function to handle login
    // const handleLogin = () => {
    //     // Perform login logic here
    //     // For example, setting isLoggedIn to true after successful login
    //     setIsLoggedIn(true);
    // };

    // Function to handle logout
    const handleLogout = () => {
        // Perform logout logic here
        // For example, setting isLoggedIn to false after logout
        setIsLoggedIn(false);
    };

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/signup" element={<Signup />} />
                {/* Protected route for Dashboard */}
                <Route
                    path="/"
                    element={isLoggedIn ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/login" replace />}
                />
                {/* Other routes */}
            </Routes>
        </Router>
    );
};

export default App;
