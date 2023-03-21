import React, { useEffect } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
//toast
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
//Atoms
import { isAuthenticatedAtom } from "./recoil/isAuthenticated/atom";
import { userAtom } from "./recoil/user/atom";
import { productsAtom } from "./recoil/products/atom";
//components
import Register from "./components/Register";
import Login from "./components/Login";
import Account from "./components/Account";
import ProductList from "./components/ProductList";
import CartItems from "./components/CartItems";
import Checkout from "./components/Checkout";
import Orders from "./components/Orders";
//API calls
import { verifyAuth } from "./api/auth";
import { getUser } from "./api/user";
import { getProducts } from "./api/products";
import Navbar from "./components/Navbar";
import { categoryAtom } from "./recoil/category/atom";

function App() {
  const [isAuthenticated, setIsAuthenticated] =
    useRecoilState(isAuthenticatedAtom);
  const setUser = useSetRecoilState(userAtom);
  const setProducts = useSetRecoilState(productsAtom);
  const category = useRecoilValue(categoryAtom);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    };
    fethProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ProtectedRoute = ({ isAuthenticated }) => {
    if (isAuthenticated === null) return <div>Loading...</div>;
    if (isAuthenticated === false) return <Navigate to="/login" />;
    return <Outlet />;
  };

  return (
    <>
      <Navbar />
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
      </Routes>
      <ToastContainer autoClose={2000} style={{ top: "55px" }} />
    </>
  );
}

export default App;
