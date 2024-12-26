import React from "react";
import { ToastContainer } from "react-toastify";
import "../Login/Login.style.scss";
import { Link, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../../utilities/util";
import Header from "../../components/Header/Header";
const Login = () => {
  const [loginInfo, setLoginInfo] = React.useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  };
  console.log("loginInfo", loginInfo);
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Form submitted");
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError("Email and password are required");
    }
    try {
      const url = "http://localhost:8080/api/v1/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      console.log(result);

      const { success, message, jwtToken, name, error } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem(
          "userInfo",
          JSON.stringify({ token: jwtToken, loggedInUser: name })
        );
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <div className="top-container">
      <Header />
      <div className="container">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Enter your email..."
              value={loginInfo.email}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Enter your password..."
              value={loginInfo.password}
            />
          </div>
          <button type="submit">Login</button>
          <span>
            Doesn't have an account?<Link to="/signup">Signup</Link>
          </span>
        </form>
        <ToastContainer autoClose={3000} />
      </div>
    </div>
  );
};

export default Login;
