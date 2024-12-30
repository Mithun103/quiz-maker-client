import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from React Router

const Login = ({ toggleForm }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // For error messages
  const [isLoading, setIsLoading] = useState(false); // For loading state
  const navigate = useNavigate(); // Initialize useNavigate hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading
    setErrorMessage(""); // Reset error message
  
    try {
      const response = await fetch("http://127.0.0.1:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }), // Send input data to the backend
      });
  
      const data = await response.json(); // Parse the JSON response
  
      if (response.ok) {
        console.log("Login successful:", data);
        // Store user data in localStorage
        localStorage.setItem('username', data.user.username);
        localStorage.setItem('userData', JSON.stringify(data.user));
        // Navigate to dashboard or home page
        navigate('/dashboard');
      } else {
        console.error("Login failed:", data.error);
        setErrorMessage(data.error || "Failed to log in");
      }
    } catch (error) {
      console.error("Error logging in:", error.message);
      setErrorMessage(error.message || "An unexpected error occurred"); // Display error message
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="form-container">
      <h2>Welcome Back!</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit" className="btn" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Log In"}
        </button>
      </form>
      <p className="toggle-link" onClick={toggleForm}>
        Don't have an account? Sign Up
      </p>
    </div>
  );
};

export default Login;
