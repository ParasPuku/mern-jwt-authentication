import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import "./Home.style.scss"

const Home = () => {
  const [productsData, setProductsData] = useState(null);
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")).loggedInUser
    : false;
  useEffect(() => {
    console.log("setProductsData", productsData);
  }, [productsData]);
  const fetchProductsData = async () => {
    if (isLoggedIn) {
      const { token } = JSON.parse(localStorage.getItem("userInfo"));
      const url = "http://localhost:8080/api/v1/product/getAllProducts";
      const options = {
        headers: {
          Authorization: token,
        },
      };
      await fetch(url, options)
        .then(async (response) => {
          const data = await response.json();
          console.log("DATA", data);
          setProductsData(data);
        })
        .catch((error) => console.log("Error:", error));
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchProductsData();
  }, []);
  return (
    <div className="top-container">
      <Header isLoggedIn={isLoggedIn} />
      <div className="container">
        <h3>Welcome to the Home page!</h3>
        <div className="product-container">
          {productsData &&
            productsData?.data?.map((product, index) => (
              <div className="product-details" key={index}>
                <div className="product-name">{product.name}</div>
                <div className="product-mobile">{product.mobile}</div>
                <div className="product-email">{product.email}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
