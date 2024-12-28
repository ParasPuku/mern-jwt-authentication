import React, { useState } from "react";
import axios from "axios";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./ForgotPassword.style.scss"
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/forgot-password", { email });
      setMessage(response.data);
    } catch (err) {
      setMessage("Error: Unable to send reset email");
    }
  };

  return (
    <div className="forgot-password-container">
      <Header />
      <div className="forgot-password">
        <h1>Forgot Password</h1>
        <form onSubmit={handleSubmit} className="forgot-password-form">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="email-input"
          />
          <button type="submit">Send Reset Email</button>
        </form>
        {message && <p>{message}</p>}
      </div>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
