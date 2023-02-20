import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register({ setAuth }) {
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
    try {
      const body = { first_name, last_name, email, password };
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.status === 200) {
        const parsRes = await response.json(); //We get the object containing jwToken here
        localStorage.setItem("token", parsRes.token); //We store the token in localStorage
        setAuth(true); //We change auth state to true
        toast.success("Registered successfully");
      } else {
        setAuth(false); //We change auth state to false
        toast.error(await response.json()); 
      }

    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <h1 className="text-center my-5">Register</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          name="first_name"
          placeholder="First name"
          className="form-control my-3"
          value={first_name}
          onChange={(e) => onChange(e)}
        ></input>
        <input
          type="text"
          name="last_name"
          placeholder="Last name"
          className="form-control my-3"
          value={last_name}
          onChange={(e) => onChange(e)}
        ></input>
        <input
          type="email"
          name="email"
          placeholder="email"
          className="form-control my-3"
          value={email}
          onChange={(e) => onChange(e)}
        ></input>
        <input
          type="password"
          name="password"
          placeholder="password"
          className="form-control my-3"
          value={password}
          onChange={(e) => onChange(e)}
        ></input>
        <button className="btn btn-success btn-block">Submit</button>
      </form>
      <Link to="/login">Already have an account? Login here</Link>
    </>
  );
}
