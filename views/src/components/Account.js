import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Account({ setAuth }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/account", {
          method: "GET",
          headers: { token: localStorage.token }, //we send the token in the header, back-end middleware receives req.header("token")
        });
        const parsRes = await response.json();
        setUser({
          id: parsRes.first_name,
          first_name: parsRes.first_name,
          last_name: parsRes.last_name,
          email: parsRes.email,
          password: parsRes.password
        });
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchData();
  }, []);

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    toast.success("Logout successfully");
  };

  return (
    <>
      <div className="container">
        <h3>Welcome {user.first_name}!</h3>
        <p>First Name:</p>
        <button className="btn btn-primary" onClick={(e) => logout(e)}>
          Logout
        </button>
      </div>
    </>
  );
}
