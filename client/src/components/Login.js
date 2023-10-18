import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import style from "../Style/RegisterStyle.css";
import validator from "validator";

const Login = () => {
  const navigate = useNavigate();
  // State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle Submit Click
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!email || !validator.isEmail(email)) {
      toast.error("Enter validate email");
      return;
    }

    if (!password) {
      toast.error("Enter the password");
      return;
    }

    try {
      const { data } = await axios.post("/api/v1/user/login", {
        email,
        password,
      });
      if (data?.success) {
        localStorage.setItem("userId", data?.user._id);
        toast.success("User login successfully");
        navigate("/today");
      } else {
        toast.error("Invalid username or password");
      }
    } catch (error) {
      // console.log(error);
      toast.error("Invalid username or password");
    }
  };
  return (
    <div className="mainContainer">
      <div className="container1">
        <input type="checkbox" id="check" />
        <div className="login form">
          <header>Login</header>
          <form>
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
              defaultValue="Login"
              onClick={handleSubmit}
            />
          </form>
          <div className="signup">
            <span className="signup">
              Don't Have account ?
              <label onClick={() => navigate("/register")}>Register</label>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
