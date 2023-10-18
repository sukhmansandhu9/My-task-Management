import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import style from "../Style/RegisterStyle.css";
import validator from "validator";

const Register = () => {
  const navigate = useNavigate();
  // State
  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle Submit Click
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.error("Enter username");
      return;
    }

    if (!email || !validator.isEmail(email)) {
      toast.error("Enter validate email");
      return;
    }
    if (!password) {
      toast.error("Enter the password");
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/user/register",
        {
          name,
          email,
          password,
        }
      );
      if (data?.success === true) {
        // localStorage.setItem("token", `${data.user.password}`);
        toast.success("User is registered");
        navigate("/login");
      }
      if (data?.message === "User already present") {
        toast.error("Username is already taken");
      }
    } catch (error) {
      toast.success("Error while login");
    }
  };
  return (
    <div className="mainContainer">
      <div className="container1">
        <input type="checkbox" id="check" />
        <div className="login form">
          <header>Register</header>
          <form>
            <input
              name="username"
              type="text"
              placeholder="Enter your username"
              required
              value={name}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <input
              type="button"
              className="button"
              defaultValue="Register"
              onClick={handleSubmit}
            />
          </form>
          <div className="signup">
            <span className="signup">
              Already Have a account ?
              <label onClick={() => navigate("/login")}>Login</label>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
