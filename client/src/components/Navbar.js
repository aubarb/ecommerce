import React from "react";
import { Link } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { isAuthenticatedAtom } from "../recoil/isAuthenticated/atom";
import { searchAtom } from "../recoil/products/atom";
import Categories from "./Categories";

export default function Navbar() {
  const setSearchTerm = useSetRecoilState(searchAtom);
  const [isAuthenticated, setIsAuthenticated] =
    useRecoilState(isAuthenticatedAtom);

  const submitSearch = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.elements.search.value);
  };

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-light bg-light">
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
                        className="btn dropdown"
                        id="navbarDropdownAccountLink"
                        data-bs-hover="dropdown"
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
                      className="nav-link btn btn-success text-white px-3 mx-3"
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
    </div>
  );
}
