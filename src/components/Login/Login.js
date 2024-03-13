import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import loginStyle from "../css/Login.module.css";
import backgroundImage from "../../assets/images/Login/ship.png";

const Login = ({ setUserState }) => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [user, setUserDetails] = useState({ email: "", password: "" });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...user, [name]: value });
  };

  const validateForm = (values) => {
    const errors = {};
    const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm(user);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/login",
          { email: user.email, password: user.password }
        );
        alert(response.data.message); // Display message from the server response
        if (response.status === 200) {
          setUserState(response.data.user);
          navigate("/dashboard", { replace: true }); // Navigate to the "/Register" route
        } else {
          alert("Login failed. Please try again.");
        }
      } catch (error) {
        console.error("Login error:", error);
        alert("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className={loginStyle.login} style={{ backgroundImage: `url(${backgroundImage})` }}>
    <div className="logoSmartShip">
      <img
        // src={logo}
        // alt="Logo"
        style={{ width: "50%", marginLeft: "25%", marginTop: "-60%", height: "auto" }}
      />
    </div>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          value={user.email}
          onChange={changeHandler}
        />
        <p className={loginStyle.error}>{formErrors.email}</p>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={user.password}
          onChange={changeHandler}
        />
        <p className={loginStyle.error}>{formErrors.password}</p>
        <button className={loginStyle.button_common} type="submit">
          Login
        </button>
      </form>
      <NavLink to="/Register">Don't have an account? Register</NavLink>
    </div>
  );
};

export default Login;