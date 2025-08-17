import React, { useContext, useState } from 'react';
import './Sidebar.css';
import { AuthContext } from '../context/AuthContext';

function Sidebar() {
    const [activeTab, setActiveTab] = useState('home');
    const { logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
        setActiveTab('home'); 
    };

    return (
        <div className={`sidebar`}>
        <ul>
            <li className={activeTab === 'home' ? 'active' : ''} onClick={() => setActiveTab('home')}>Home</li>
            <li className={activeTab === 'profile' ? 'active' : ''} onClick={() => setActiveTab('profile')}>Profile</li>
            <li className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}>Settings</li>
            <li className={activeTab === 'logout' ? 'active' : ''} onClick={() => handleLogout('logout')}>Logout</li>
        </ul>
        </div>
    );
}

export default Sidebar;