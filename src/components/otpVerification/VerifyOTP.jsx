import { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL

import "../otpVerification/VerifyOTP.css";

export default function VerifyOTP () {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);

  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleVerify = async () => {
    const emailOTP = otp.join("");
    if (emailOTP.length < 6) return toast.error("Please enter the full OTP");

    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/verify-otp`, {
        email: state?.email,
        emailOTP,
      });

      toast.success(res.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "OTP verification failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setResendLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/resend-otp`, {
        email: state?.email,
      });

      toast.success(res.data.message);
      setResendDisabled(true);
      setTimeout(() => setResendDisabled(false), 60000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to resend OTP.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="verify-otp-container">
      <div className="verify-card">
        <h2>Verify OTP</h2>
        <div className="otp-box">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => (inputsRef.current[index] = el)}
            />
          ))}
        </div>
        <button onClick={handleVerify} disabled={loading}>
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        <button
          className="resend-btn"
          onClick={handleResendOTP}
          disabled={resendLoading || resendDisabled}
        >
          {resendLoading
            ? "Resending..."
            : resendDisabled
            ? "Wait 1 minute"
            : "Resend OTP"}
        </button>
      </div>
    </div>
  );
};
