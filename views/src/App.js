import React, { useEffect } from "react";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
//toast
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
//style
import "./App.css";
//Atoms
import { categoryAtom } from "./recoil/category/atom";
import { isAuthenticatedAtom } from "./recoil/isAuthenticated/atom";
//components
import Register from "./components/Register";
import Login from "./components/Login";
import Account from "./components/Account";
import ProductList from "./components/ProductList";
import CartItems from "./components/CartItems";
import NotFound from "./components/NotFound";
import Categories from "./components/Categories";
//API calls
import { verifyAuth } from "./api/auth";

function App() {
  const [isAuthenticated, setIsAuthenticated] =
    useRecoilState(isAuthenticatedAtom);
  const category = useRecoilValue(categoryAtom);

  //Checking if user is authenticated and setting state
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await verifyAuth(localStorage.token);
        response === true
          ? setIsAuthenticated(true)
          : setIsAuthenticated(false);
      } catch (err) {
        console.error(err.message);
      }
    };
    checkAuth();
  }, [setIsAuthenticated]);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Categories />
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
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item"></li>
            </ul>
            <form className="d-flex justify-content-center align-items-center">
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
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {
                isAuthenticated ?
                <>
                  <li className="nav-item">
                    <Link to="/account" className="nav-link">
                      Account
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/cart_items"
                      className="nav-link btn btn-success text-white px-3"
                    >
                      Cart
                    </Link>
                  </li>
                </>
                :
                <li className="nav-item">
                    <Link to="/login" className="nav-link">
                      Login
                    </Link>
                </li>
              }
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!isAuthenticated ? <Register /> : <Navigate to="/login" />}
        />
        <Route
          path="/account"
          element={isAuthenticated ? <Account /> : <Navigate to="/login" />}
        />
        <Route
          path="/categories/:name"
          element={<ProductList category={category} />}
        />
        <Route path="/products" element={<ProductList />} />
        <Route
          path="/cart_items"
          element={isAuthenticated ? <CartItems /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer autoClose={2000}/>
    </>
  );
}

export default App;
