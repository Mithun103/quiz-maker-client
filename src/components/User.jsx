import React, { useState } from "react";
import "./User.css"; // Ensure this contains your styles
import Login from "./Login"; // Login component
import Signup from "./Signup"; // Signup component

function User() {
  // State to manage whether to show Login or Signup
  const [isLogin, setIsLogin] = useState(true);

  // Toggle between Login and Signup
  const toggleForm = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <div className="bodyl">
      <div className="container">
        {/* Left Panel with Video or Welcome Content */}
        <div className="left-panel">
          {/* Uncomment the video below if you have a background video */}
          {/* <video autoPlay loop muted className="background-video">
            <source src="/background.mp4" type="video/mp4" />
          </video> */}
          <div className="overlay-content">
            <h1>Welcome to Quiz Maker</h1>
            <p>Join the Quiz Game</p>
          </div>
        </div>

        {/* Right Panel with Forms */}
        <div className="right-panel">
          {/* Render Login or Signup Form */}
          {isLogin ? (
            <Login toggleForm={toggleForm} />
          ) : (
            <Signup toggleForm={toggleForm} />
          )}
        </div>
      </div>
    </div>
  );
}

export default User;
