import React, { useState } from "react";

const Signup = ({ toggleForm }) => {
  // States to manage the form inputs
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // For error handling
  const [isSuccess, setIsSuccess] = useState(false); // For success feedback

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    // Prepare data to send to the backend
    const userData = {
      fullName,
      username,
      password,
      phoneNumber,
    };

    try {
      // Send data to Flask API
      const response = await fetch("https://quiz-maker-backend-1lkn.onrender.com/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("User registered:", result);
        setIsSuccess(true);
        setErrorMessage("");
        alert("Signup successful! You can now log in.");
        toggleForm(); // Switch to login form after successful signup
      } else {
        setErrorMessage(result.error || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred while registering the user.");
    }
  };

  return (
    <div className="form-container">
      <h2>Create Account</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display errors */}
      {isSuccess && <p className="success-message">Signup successful!</p>} {/* Display success */}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your full name"
            required
          />
        </div>
        <div className="input-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="input-group">
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            required
          />
        </div>
        <div className="input-group">
          <label>Phone Number</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter your phone number"
            required
          />
        </div>

        <button type="submit" className="btn">Sign Up</button>
      </form>
      <p className="toggle-link" onClick={toggleForm}>
        Already have an account? Log In
      </p>
    </div>
  );
};

export default Signup;
