import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { Link, Navigate, Route, Routes } from "react-router-dom";
//components
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Account from "./components/Account";
import ProductList from "./components/ProductList";
import CartItems from "./components/CartItems";
import NotFound from "./components/NotFound";
//toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({});

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  //Checking if user is authenticated
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await fetch("http://localhost:5000/auth/verify", {
          method: "GET",
          headers: { token: localStorage.token }, //it will go through auth middleware and verify route
        });
        const parsRes = await response.json(); //If token is valid, verify route returns true

        parsRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
      } catch (err) {
        console.error(err.message);
      }
    };
    verifyAuth();
  }, []);

  //Fetching the categories
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:5000/categories");
      setCategories(result.data);
    };
    fetchData();
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <div className="nav-item dropdown">
            <button
              className="btn btn-primary  dropdown-toggle"
              id="navbarDropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Categories
            </button>
            <ul
              className="dropdown-menu"
              aria-labelledby="navbarDropdownMenuLink"
            >
              {categories.map((category) => (
                <li key={category.id} className="dropdown-item">
                  <Link
                    to={`/categories/${category.name}`}
                    onClick={() => setCategory(category)}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/products" className="nav-link">
                  All Products
                </Link>
              </li>
              <li className="nav-item">
                
              </li>
              <li className="nav-item">
                <Link to="/cart_items" className="nav-link">
                  Cart
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/account" className="nav-link">
                  Account
                </Link>
              </li>
            </ul>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <Login setAuth={setAuth} />
            ) : (
              <Navigate to="/account" />
            )
          }
        />
        <Route
          path="/register"
          element={
            !isAuthenticated ? (
              <Register setAuth={setAuth} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/account"
          element={
            isAuthenticated ? (
              <Account setAuth={setAuth} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/categories/:name"
          element={<ProductList category={category} />}
        />
        <Route path="/products" element={<ProductList />} />
        <Route path="/cart_items" element={<CartItems />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
