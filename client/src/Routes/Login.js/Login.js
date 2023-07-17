import React, { useState } from "react";
import "./login.style.css";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import { LoginApi } from "../../constants/ApiList";

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleButton = (e) => {
    e.preventDefault();

    const API = LoginApi;

    if (formData.email && formData.password) {
      axios
        .post(API, formData)
        .then((res) => {
          if (res.data.email) {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("name", res.data.name);
            localStorage.setItem("id", res.data._id);
            navigate("/", { replace: true });
            setFormData({ email: "", password: "" });
          } else {
            setError("Invalid password/email");
            setFormData({ email: "", password: "" });
          }
        })
        .catch((err) => console.log(err));
    } else {
      setError("Please enter email and password.");
    }
  };

  const handleBackBtn = () => {
    navigate("/");
  };

  return (
    <div className="LoginParent">
      <button onClick={handleBackBtn} className="backButtn">
        Back
      </button>
      <div className="loginText">Login here</div>
      <div className="loginContainer">
        <div className="LoginCard">
          <div className="logComCon">
            <img
              className="lockImg"
              src="https://cdn3.vectorstock.com/i/1000x1000/00/47/lock-icon-vector-13820047.jpg"
              alt="Locked"
            />
            <div className="Logcont1">
              <input
                className="lLoginInp"
                type="email"
                name="email"
                onChange={handleInputChange}
                value={formData.email}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="Logcont2">
              <input
                className="lLoginInp"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                required
              />
            </div>
            {error && <span className="loginErr">{error}</span>}
            <button className="Sbutn" onClick={handleButton}>
              Login
            </button>
            <div className="signupRoute">
              {" "}
              <NavLink to="/signup"> Don't have an account? Sign up</NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
