import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const API_URL =  import.meta.env.VITE_API_URL

import "./adminCss/adminLogin.css";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error("Please fill in both fields.");
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/admin/login`, {
        username,
        password,
      });

      if (res.data.success) {
        localStorage.setItem("isAdmin", "true");
        toast.success("Welcome admin");
        navigate("/admin/dashboard");
      } else {
        toast.error("Invalid credentials.");
      }
    } catch (err) {
      toast.error("Login failed. Invalid credentials.");
    }
  };
  return (
    <div className="admin-login-container">
      <h2 className="admin-login-container-h2">Admin Login</h2>
      <form onSubmit={handleLogin} className="admin-login-form">
        <input
          type="text"
          placeholder="Admin Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="off"
        />
        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="off"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
