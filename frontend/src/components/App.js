import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Auth/Login';
import Register from './Auth/Register';
import Dashboard from './Dashboard/Dashboard';
import HomePage from './pages/home';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />  {/* Use element instead of component */}
                <Route path="/register" element={<Register />} />  {/* Use element instead of component */}
                <Route path="/dashboard" element={<Dashboard />} />  {/* Use element instead of component */}
                <Route path="/home" element={<HomePage />} />  {/* Use element instead of component */}
            </Routes>
        </Router>
    );
};

export default App;