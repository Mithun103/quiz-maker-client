import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import "./profile.css";

function Profile() {
    const [profileData, setProfileData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // Get username from localStorage (saved during login)
                const username = localStorage.getItem('username');
                if (!username) {
                    throw new Error('Not logged in');
                }
                
                const response = await fetch('http://localhost:5000/api/profile', {
                    method: 'GET',
                    headers: {
                        'username': username,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch profile');
                }

                const data = await response.json();
                if (data.success) {
                    setProfileData(data.user);
                } else {
                    throw new Error(data.error || 'Failed to fetch profile');
                }
            } catch (err) {
                setError(err.message);
            }
        };

        fetchProfile();
    }, []);

    if (error) return <div>Error: {error}</div>;
    if (!profileData) return <div>Loading...</div>;

    return (
        <>
            <Navbar />
            <div className='profile-container'>
                <div className='profile-card'>
                    <div className="profile-header">
                        <div className="profile-image">
                            <img src="https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_640.png" alt="Profile" />
                        </div>
                        <h1>{profileData.full_name}</h1>
                        <span className="role-badge">{profileData.role || 'User'}</span>
                    </div>
                    
                    <div className="profile-info">
                        <div className="info-item">
                            <div className="info-label">Username</div>
                            <div className="info-value">{profileData.username}</div>
                        </div>
                        
                        <div className="info-item">
                            <div className="info-label">Mobile</div>
                            <div className="info-value">{profileData.phone_number}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;