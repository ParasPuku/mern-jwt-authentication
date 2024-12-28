import { BrowserRouter, Routes, Route, Router, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Footer from "./components/Footer/Footer";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <div className="app">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to={"/login"} />} />
            <Route path="/home" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
      </BrowserRouter>
      <ToastContainer autoClose={3000} />
      <Footer></Footer>
    </div>
  );
}

export default App;
