import React, { Fragment } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Redirect
} from "react-router-dom";
import Products from "./components/Product";
import Categories from "./components/Category";
import CartItems from "./components/CartItems";
import Account from "./components/Account";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  return (
    <Router>
        <main>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/auth/register">Register</Link>
              </li>
              <li>
                <Link to="/auth/login">Login</Link>
              </li>
              <li>
                <Link to="/account">Account</Link>
              </li>
              <li>
                <Link to="/products">Products</Link>
              </li>
              <li>
                <Link to="/categories">Categories</Link>
              </li>
              <li>
                <Link to="/cart_items">Cart</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/account" element={<Account />} />
            <Route path="/products" element={<Products />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/cart_items" element={<CartItems />} />
          </Routes>
        </main>
    </Router>
  );
}

export default App;
