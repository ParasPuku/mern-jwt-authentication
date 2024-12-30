import React, { useState } from "react";
import axios from "axios";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./ForgotPassword.style.scss";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/forgot-password",
        { email }
      );
      if (response?.data?.success) {
        console.log("Responseee", response);
        setIsEmailSent(true);
        setMessage(response?.data?.data);
      }
    } catch (err) {
      setMessage("Error: Unable to send reset email");
    }
  };

  return (
    <div className="forgot-password-container">
      <Header />
      <div className="forgot-password">
        <h1>Forgot Password</h1>
        {!isEmailSent && (
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
        )}
        {message && (
          <div className="forgot-password-message">
            <div className="title">{message?.title}</div>
            <div className="message">{message?.message}</div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
