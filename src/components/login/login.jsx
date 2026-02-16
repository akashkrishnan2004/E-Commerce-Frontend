import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
// import { ToastContainer, toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL

import "./login.css";

import mobile from "../images/mobile-img.jpg";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/api/login`, formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("User Id", res.data.userId);
      toast.success(res.data.message);
      console.log(res);

      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          {/* <p className="forgot-password">Forgot Password?</p> */}
          <p
            className="forgot-password"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </p>

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          <p className="need-register">
            Don't have an account ?{" "}
            <span>
              {" "}
              <Link to="/">Sign Up</Link>{" "}
            </span>
          </p>
        </form>
      </div>
      <div className="login-image-card">
        <img src={mobile} alt="" />
      </div>
      {/* <ToastContainer position="top-right" autoClose={3000} /> */}
    </div>
  );
}
