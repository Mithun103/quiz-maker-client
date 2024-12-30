import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import "./navbar.css"

function Navbar(){
    const navigate = useNavigate();

    const handleLogout = () => {
        // Add any logout logic here if needed
        navigate('/');
    };

    return(
        <nav>
            <p>Quiz Maker</p>
            <div className="links">
                <a href="/dashboard">Home</a>
                <a href="/profile">Profile</a>
                <img src="https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_640.png" alt="" />
                <Button 
                    variant="contained" 
                    color='error' 
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            </div>
        </nav>
    )
}

export default Navbar