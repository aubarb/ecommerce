import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { verifyAuth } from "../api/auth";
import { useRecoilState } from "recoil";
import { isAuthenticatedAtom } from "../recoil/isAuthenticated/atom";

export const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useRecoilState(isAuthenticatedAtom);
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
  }, [setIsAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return children;
};