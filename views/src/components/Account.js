import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userAtom } from "../recoil/user/atom";
import { userAddressAtom } from "../recoil/userAddress/atom";
import { isAuthenticatedAtom } from "../recoil/isAuthenticated/atom";
import { baseUrl } from "../utils/API";

export default function Account() {
  const setIsAuthenticated = useSetRecoilState(isAuthenticatedAtom);
  const [user, setUser] = useRecoilState(userAtom);
  const [userAddress, setUserAddress] = useRecoilState(userAddressAtom);
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/account`, {
          method: "GET",
          headers: { token: localStorage.token }, //we send the token in the header, back-end middleware receives req.header("token")
        });
        const parsRes = await response.json();
        setUser({
          id: parsRes.id,
          first_name: parsRes.first_name,
          last_name: parsRes.last_name,
          email: parsRes.email,
          password: parsRes.password,
        });
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchData();
  }, [setUser]);

  useEffect(() => {
    if (user.id) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `${baseUrl}/user_addresses?user_id=${user.id}`
          );
          const parsRes = await response.json();
          setUserAddress({
            id: parsRes.id,
            user_id: parsRes.user_id,
            address_line1: parsRes.address_line1,
            address_line2: parsRes.address_line2,
            city: parsRes.city,
            postal_code: parsRes.postal_code,
            country: parsRes.country,
          });
        } catch (err) {
          console.error(err.message);
        }
      };
      fetchData();
    }
  }, [user.id, setUserAddress]);

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
    setUserAddress({
      ...userAddress,
      [e.target.name]: e.target.value,
    });
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  };

  const submitPersonalInfo = async (e) => {
    e.preventDefault();
    const { first_name, last_name } = user;
    const body = { first_name, last_name };
    try {
      await fetch(`${baseUrl}/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  const submitAddressInfo = async (e) => {
    e.preventDefault();
    const { address_line1, address_line2, city, postal_code, country } =
      userAddress;
    const body = { address_line1, address_line2, city, postal_code, country };
    try {
      await fetch(`${baseUrl}/user_addresses/${userAddress.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  const submitPassword = async (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = passwords;
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Missing fields");
    } else if (newPassword !== confirmPassword) {
      toast.error("Passwords don't match");
    } else
      try {
        const body = {
          currentPassword: currentPassword,
          newPassword: newPassword,
        };
        const response = await fetch(`${baseUrl}/auth/edit/${user.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
        const data = await response.json();

        if (response.status === 401 && data === "Incorrect password") {
          toast.error("Incorrect Password");
        } else if (response.status === 200) {
          toast.success("Password changed successfully!");
          setPasswords({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
        }
      } catch (err) {
        console.error(err.message);
      }
  };

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    toast.success("Logout successfully");
  };

  return (
    <>
      <div className="container m-5">
        <form onSubmit={submitPersonalInfo}>
          <h4 className="border-bottom">Personal information</h4>
          <div className="form-group row my-3">
            <label className="col-sm-2 col-form-label">First Name</label>
            <div className="col-sm-4">
              <input
                type="text"
                name="first_name"
                onChange={(e) => onChange(e)}
                value={user.first_name}
                className="form-control"
              />
            </div>
          </div>
          <div className="form-group row my-3">
            <label className="col-sm-2 col-form-label">Last Name</label>
            <div className="col-sm-4">
              <input
                type="text"
                name="last_name"
                onChange={(e) => onChange(e)}
                value={user.last_name}
                className="form-control"
              />
            </div>
          </div>
          <div className="form-group row my-3">
            <label className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-4">
              <input
                type="text"
                value={user.email}
                className="form-control"
                disabled
              />
            </div>
          </div>
          <button
            className="col-sm-1 btn btn-outline-primary mb-3"
            type="submit"
          >
            Submit
          </button>
        </form>
        <form onSubmit={submitAddressInfo}>
          <h4 className="border-bottom">Address Information</h4>
          <div className="form-group row my-3">
            <label className="col-sm-2 col-form-label">Address Line 1</label>
            <div className="col-sm-4">
              <input
                type="text"
                name="address_line1"
                onChange={(e) => onChange(e)}
                value={userAddress.address_line1}
                className="form-control"
              />
            </div>
          </div>
          <div className="form-group row my-3">
            <label className="col-sm-2 col-form-label">Address Line 2</label>
            <div className="col-sm-4">
              <input
                type="text"
                name="address_line2"
                onChange={(e) => onChange(e)}
                value={userAddress.address_line2}
                className="form-control"
              />
            </div>
          </div>
          <div className="form-group row my-3">
            <label className="col-sm-2 col-form-label">City</label>
            <div className="col-sm-4">
              <input
                type="text"
                name="city"
                onChange={(e) => onChange(e)}
                value={userAddress.city}
                className="form-control"
              />
            </div>
          </div>
          <div className="form-group row my-3">
            <label className="col-sm-2 col-form-label">Postal Code</label>
            <div className="col-sm-4">
              <input
                type="text"
                name="postal_code"
                onChange={(e) => onChange(e)}
                value={userAddress.postal_code}
                className="form-control"
              />
            </div>
          </div>
          <div className="form-group row my-3">
            <label className="col-sm-2 col-form-label">Country</label>
            <div className="col-sm-4">
              <input
                type="text"
                name="country"
                onChange={(e) => onChange(e)}
                value={userAddress.country}
                className="form-control"
              />
            </div>
          </div>
          <button
            className="col-sm-1 btn btn-outline-primary mb-3"
            type="submit"
          >
            Submit
          </button>
        </form>
        <form onSubmit={submitPassword}>
          <h4 className="border-bottom">Edit Password</h4>
          <div className="form-group row my-3">
            <label className="col-sm-2 col-form-label">Current Password</label>
            <div className="col-sm-2">
              <input
                type="text"
                className="form-control"
                name="currentPassword"
                onChange={(e) => onChange(e)}
                value={passwords.currentPassword}
              />
            </div>
          </div>
          <div className="form-group row my-3">
            <label className="col-sm-2 col-form-label">New Password</label>
            <div className="col-sm-2">
              <input
                type="text"
                className="form-control"
                name="newPassword"
                onChange={(e) => onChange(e)}
                value={passwords.newPassword}
              />
            </div>
          </div>
          <div className="form-group row my-3">
            <label className="col-sm-2 col-form-label">Confirm Password</label>
            <div className="col-sm-2">
              <input
                type="text"
                className="form-control"
                name="confirmPassword"
                onChange={(e) => onChange(e)}
                value={passwords.confirmPassword}
              />
            </div>
          </div>
          <button
            className="col-sm-1 btn btn-outline-primary mb-3"
            type="submit"
          >
            Submit
          </button>
        </form>
        <button className="btn btn-danger" onClick={(e) => logout(e)}>
          Logout
        </button>
      </div>
    </>
  );
}
