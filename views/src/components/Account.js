import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Account({ setAuth }) {
  const [name, setName] = useState({ first_name: "", last_name: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/account", {
          method: "GET",
          headers: { token: localStorage.token }, //we send the token in the header, back-end middleware receives req.header("token")
        });
        const parsRes = await response.json();
        setName({
          first_name: parsRes.first_name,
          last_name: parsRes.last_name,
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
      <h1>Account</h1>
      <h2>Welcome {name.first_name}!</h2>
      <button className="btn btn-primary" onClick={(e) => logout(e)}>
        Logout
      </button>
    </>
  );
}
