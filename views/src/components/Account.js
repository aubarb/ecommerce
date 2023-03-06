import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userAtom } from "../recoil/user/atom";
import { userAddressAtom } from "../recoil/userAddress/atom";
import { isAuthenticatedAtom } from "../recoil/isAuthenticated/atom";
import { updateUser, updateUserPassword } from "../api/user";
import { getUserAddress, updateUserAddress } from "../api/userAddress";

export default function Account() {
  const setIsAuthenticated = useSetRecoilState(isAuthenticatedAtom);
  const [user, setUser] = useRecoilState(userAtom);
  const [userAddress, setUserAddress] = useRecoilState(userAddressAtom);
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const { first_name, last_name, id } = user;
  const { address_line1, address_line2, city, postal_code, country } =
    userAddress;

  //Editing the state based on user's inputs
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

  //Send user info update
  const submitPersonalInfo = async (e) => {
    e.preventDefault();
    const res = await updateUser(first_name, last_name, id);
    toast.success(res);
  };

  //Getting the user address info for current user
  useEffect(() => {
    if (id) {
      const fetchUserAddress = async () => {
        const data = await getUserAddress(id);
        setUserAddress({
          id: data.id,
          user_id: data.user_id,
          address_line1: data.address_line1,
          address_line2: data.address_line2,
          city: data.city,
          postal_code: data.postal_code,
          country: data.country,
        });
      };
      fetchUserAddress();
    }
  }, [id, setUserAddress]);

  //Send user address info update
  const submitAddressInfo = async (e) => {
    e.preventDefault();
    const res = await updateUserAddress(userAddress.id, address_line1, address_line2, city, postal_code, country);
    toast.success(res);
  };

  //Send password update
  const submitPassword = async (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = passwords;
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Missing fields");
    } else if (newPassword !== confirmPassword) {
      toast.error("Passwords don't match");
    } else {
      const data = await updateUserPassword(passwords, id);
      if (data === "Incorrect password") {
        toast.error(data);
      } else {
        toast.success(data);
        setPasswords({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    };
  }

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
                value={user.first_name || ""}
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
                value={user.last_name || ""}
                className="form-control"
              />
            </div>
          </div>
          <div className="form-group row my-3">
            <label className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-4">
              <input
                type="text"
                value={user.email || ""}
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
                value={userAddress.address_line1 || ""}
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
                value={userAddress.address_line2 || ""}
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
                value={userAddress.city || ""}
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
                value={userAddress.postal_code || ""}
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
                value={userAddress.country || ""}
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
                value={passwords.currentPassword || ""}
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
                value={passwords.newPassword || ""}
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
                value={passwords.confirmPassword || ""}
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
