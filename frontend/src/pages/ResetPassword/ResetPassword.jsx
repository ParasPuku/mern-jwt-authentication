import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import "./ResetPassword.style.scss";
import Header from "../../components/Header/Header";
import { handleError } from "../../utilities/util";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = "Oops! Password did not match";
    if (confirmPassword !== newPassword) {
      handleError(message);
      return false;
    }
    const token = searchParams.get("token");
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/auth/reset-password?token=${token}`,
        {
          password: newPassword,
        }
      );
      if (response?.data?.success) {
        setMessage(response?.data?.data);
      }
    } catch (err) {
      setMessage("Error: Unable to reset password");
    }
  };

  return (
    <div className="reset-password-container">
      <Header />
      <div className="reset-password">
        <h1>Reset Password</h1>
        {!message && (
          <form onSubmit={handleSubmit} className="reset-password-form">
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="password-input"
            />
            <input
              type="password"
              placeholder="Enter confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="password-input"
            />
            <button type="submit">Reset Password</button>
          </form>
        )}
        {message && (
          <div className="reset-password-message">
            <div className="reset-password-message-title">{message?.title}</div>
            <div className="reset-password-message-text">
              {message?.message}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
