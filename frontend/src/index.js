import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App'; // Make sure the path is correct
import './index.css'; // Optional: Import your CSS file

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);