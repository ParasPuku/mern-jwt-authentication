import { useState } from "react";
import { BrowserRouter, Routes, Route, Router, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
function App() {
  return (
    <div className="app">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to={"/login"} />} />
            <Route path="/home" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
      </BrowserRouter>
      <Footer></Footer>
    </div>
  );
}

export default App;
