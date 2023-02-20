import React, { useEffect, useState } from "react";
import "./App.css";
import { Link, Navigate, Route, Routes } from "react-router-dom";
//components
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Account from "./components/Account";
import Products from "./components/Product";
import Categories from "./components/Categories";
import Category from "./components/Category";
import CartItems from "./components/CartItems";
import NotFound from "./components/NotFound";
import CategoryLayout from "./components/CategoryLayout";
//toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

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

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/account">Account</Link>
          </li>
          <li>
            <Link to="/categories">Categories</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/cart_items">Cart</Link>
          </li>
        </ul>
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

        <Route path="/categories" element={<CategoryLayout />}>
          <Route index element={<Categories />} />
          <Route path=":name" element={<Category />} />
        </Route>
        <Route path="/products" element={<Products />} />
        <Route path="/cart_items" element={<CartItems />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
