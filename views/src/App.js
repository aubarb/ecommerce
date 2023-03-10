import React, { useEffect } from "react";
import { Link, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
//toast
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
//Atoms
import { categoryAtom } from "./recoil/category/atom";
import { isAuthenticatedAtom } from "./recoil/isAuthenticated/atom";
import { userAtom } from "./recoil/user/atom";
import { productsAtom, searchAtom } from "./recoil/products/atom";
//components
import Register from "./components/Register";
import Login from "./components/Login";
import Account from "./components/Account";
import ProductList from "./components/ProductList";
import CartItems from "./components/CartItems";
import Categories from "./components/Categories";
import Checkout from "./components/Checkout";
import Orders from "./components/Orders";
//API calls
import { verifyAuth } from "./api/auth";
import { getUser } from "./api/user";
import { getProducts } from "./api/products";

function App() {
  const [isAuthenticated, setIsAuthenticated] =
    useRecoilState(isAuthenticatedAtom);
  const setUser = useSetRecoilState(userAtom);
  const category = useRecoilValue(categoryAtom);
  const setSearchTerm = useSetRecoilState(searchAtom);
  const setProducts = useSetRecoilState(productsAtom);

  //Checking if user is authenticated and setting state
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await verifyAuth(localStorage.token);
        response === true
          ? setIsAuthenticated(true)
          : setIsAuthenticated(false);
      } catch (error) {
        console.error(error.message);
      }
    };
    checkAuth();
  }, []);

  //Getting user info if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const fetchUser = async () => {
        const data = await getUser();
        setUser({
          id: data.id,
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          password: data.password,
        });
      };
      fetchUser();
    }
  }, [setUser, isAuthenticated]);

  //Getting all products from DB
  useEffect(() => {
    const fethProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    }
    fethProducts();
  }, []);

  const submitSearch = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.elements.search.value);
  };

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  const ProtectedRoute = ({ isAuthenticated }) => {
    if (isAuthenticated === null) return <div>Loading...</div>;
    if (isAuthenticated === false) return <Navigate to="/login" />;
    return <Outlet />;
  };

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
                <Link
                  to="/"
                  className="nav-link"
                  onClick={() => setSearchTerm("")}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item"></li>
            </ul>
            <form
              className="d-flex justify-content-center align-items-center"
              onSubmit={(e) => submitSearch(e)}
            >
              <input
                className="form-control me-2"
                type="search"
                name="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {isAuthenticated ? (
                <>
                  <li className="nav-item">
                    <div className="nav-item dropdown">
                      <button
                        className="btn dropdown-toggle"
                        id="navbarDropdownAccountLink"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Account
                      </button>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="navbarDropdownAccountLink"
                      >
                        <li className="dropdown-item">
                          <Link to="/account" className="nav-link">
                            Profile
                          </Link>
                        </li>
                        <li className="dropdown-item">
                          <Link to="/orders" className="nav-link">
                            Orders
                          </Link>
                        </li>
                        <li className="dropdown-item">
                          <Link className="nav-link" onClick={(e) => logout(e)}>
                            Logout
                          </Link>
                        </li>
                      </ul>
                    </div>
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
              ) : (
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/cart_items" element={<CartItems />} />
          <Route path="/account" element={<Account />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>
        <Route path="/" element={<ProductList />} />
        <Route path="/products" element={<ProductList />} />
        <Route
          path="/categories/:name"
          element={<ProductList category={category} />}
        />
        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!isAuthenticated ? <Register /> : <Navigate to="/" />}
        />

        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
      <ToastContainer autoClose={2000} />
    </>
  );
}

export default App;
