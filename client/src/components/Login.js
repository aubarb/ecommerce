import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSetRecoilState } from "recoil";
import { isAuthenticatedAtom } from "../recoil/isAuthenticated/atom";
import { login } from "../api/auth";

export default function Login() {
  const setIsAuthenticated = useSetRecoilState(isAuthenticatedAtom);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const data = await login(email, password); //We send password, email to login fetch api function
    if (data.token) {
      //If login fetch was successful response contained token
      localStorage.setItem("token", data.token); //We store the token in localStorage
      setIsAuthenticated(true); //We change auth state to true
      toast.success("Login successfully"); //use toast for notif
    } else {
      setIsAuthenticated(false); //We change auth state to false
      toast.error(data); //use toast to send custom err message defined in server side
    }
  };

  return (
    <>
      <h1 className="text-center my-5">Login</h1>
      <div className="container">
        <form onSubmit={onSubmitForm}>
          <div className="form-floating">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="form-control my-3"
              value={email}
              onChange={(e) => onChange(e)}
            ></input>
            <label htmlFor="email">Email</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="form-control my-3"
              value={password}
              onChange={(e) => onChange(e)}
            ></input>
            <label htmlFor="password">Password</label>
          </div>
          <button className="btn btn-outline-success border-2 btn-block mb-2">
            Submit
          </button>
        </form>
        <Link to="/register">No account? Register here</Link>
      </div>
    </>
  );
}
