import React from "react";
import { ToastContainer } from "react-toastify";
import "../Signup/Signup.style.scss";
import { Link, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../../utilities/util";
import Header from "../../components/Header/Header";
const Signup = () => {
  const [signUpInfo, setSignUpInfo] = React.useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copySignupInfo = { ...signUpInfo };
    copySignupInfo[name] = value;
    setSignUpInfo(copySignupInfo);
  };
  console.log("signUpInfo", signUpInfo);
  const handleFormSignup = async (e) => {
    e.preventDefault();
    console.log("Form submitted");
    const { name, email, password } = signUpInfo;
    if (!name || !email || !password) {
      return handleError("Name, email and password are required");
    }
    try {
      const url = "http://localhost:8080/api/v1/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpInfo),
      });
      const result = await response.json();
      console.log(result);

      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if(!success) {
        handleError(message)
      }
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <div className="top-container"><Header/>  
    <div className="container">
    <h1>Signup</h1>
    <form onSubmit={handleFormSignup}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          onChange={handleChange}
          type="text"
          name="name"
          autoFocus
          placeholder="Enter your name..."
          value={signUpInfo.name}
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          onChange={handleChange}
          type="email"
          name="email"
          placeholder="Enter your email..."
          value={signUpInfo.email}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          onChange={handleChange}
          type="password"
          name="password"
          placeholder="Enter your password..."
          value={signUpInfo.password}
        />
      </div>
      <button type="submit">Signup</button>
      <span>
        Already have an account?<Link to="/login">Login</Link>
      </span>
    </form>
    <ToastContainer autoClose={3000} />
  </div></div>
   
  );
};

export default Signup;
