import React, { useState } from "react";
import registerStyle from "../css/Register.module.css";
import axios from "axios";
// import logo from "../../assets/images/logossh.jpg";
import { useNavigate, NavLink } from "react-router-dom";

const Register = ({ setUserState }) => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [user, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Function to validate the form inputs
  const validateForm = (values) => {
    const errors = {};
    const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.name) {
      errors.name = "Name is required";
    }
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

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...user,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm(user);
    setFormErrors(errors);

    // If there are no errors in the form
    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/register",
          user
        );
        // If registration is successful
        if (response.status === 201) {
          alert("Registration successful! Please log in.");
          navigate("/DashboardPage1"); // Redirect to login page
        }
      } catch (error) {
        if (error.response) {
          console.error("Registration error:", error.response.data);
          alert("Registration failed: " + error.response.data.message);
        } else if (error.request) {
          console.error("No response received:", error.request);
          alert("Registration failed: No response received from server");
        } else {
          console.error("Error setting up the request:", error.message);
          alert("Registration failed: " + error.message);
        }
      }
    }
  };

  return (
    <div className={registerStyle.register}>
      <img
        // src={logo}
        // alt="Logo"
        style={{
          width: "50%",
          marginLeft: "25%",
          marginTop: "-60%",
          height: "auto",
        }}
      />
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <div className={registerStyle.formGroup}>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter your name"
            value={user.name}
            onChange={handleInputChange}
          />
          {formErrors.name && (
            <span className={registerStyle.error}>{formErrors.name}</span>
          )}
        </div>
        <div className={registerStyle.formGroup}>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            value={user.email}
            onChange={handleInputChange}
          />
          {formErrors.email && (
            <span className={registerStyle.error}>{formErrors.email}</span>
          )}
        </div>
        <div className={registerStyle.formGroup}>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            value={user.password}
            onChange={handleInputChange}
          />
          {formErrors.password && (
            <span className={registerStyle.error}>{formErrors.password}</span>
          )}
        </div>
        <button className={registerStyle.button_common} type="submit">
          Register
        </button>
      </form>
      <NavLink to="/login">Already have an account? Login</NavLink>
    </div>
  );
};

export default Register;