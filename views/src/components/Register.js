import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSetRecoilState } from "recoil";
import { isAuthenticatedAtom } from "../recoil/isAuthenticated/atom";
import { register } from "../api/auth";

export default function Register() {
  const setIsAuthenticated = useSetRecoilState(isAuthenticatedAtom);
  const [inputs, setInputs] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const { first_name, last_name, email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const data = await register(first_name, last_name, email, password);
    if (data.token) { //We get token back from register() call to API if it is successful
      localStorage.setItem("token", data.token); //We store the token in localStorage
      setIsAuthenticated(true); //We change auth state to true
      toast.success("Registered successfully");
    } else {
      setIsAuthenticated(false); //We change auth state to false
      toast.error(await data);
      }
  };

  return (
    <>
      <h1 className="text-center my-4">Register</h1>
      <div className="container">
        <form onSubmit={onSubmitForm}>
          <div className="form-floating">
            <input
              type="text"
              name="first_name"
              placeholder="First name"
              className="form-control my-3"
              value={first_name}
              onChange={(e) => onChange(e)}
            ></input>
            <label htmlFor="first_name">First Name</label>
          </div>
          <div className="form-floating">
            <input
              type="text"
              name="last_name"
              placeholder="Last name"
              className="form-control my-3"
              value={last_name}
              onChange={(e) => onChange(e)}
            ></input>
            <label htmlFor="last_name">Last Name</label>
          </div>
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
        <Link to="/login">Already have an account? Login here</Link>
      </div>
    </>
  );
}
