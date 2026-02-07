// import { useState, useRef } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useLocation, useNavigate } from "react-router-dom";

// import "./css/resetPassword.css"

// const ResetPassword = () => {
//   const [otp, setOtp] = useState(new Array(6).fill(""));
//   const [newPassword, setNewPassword] = useState("");
//   const inputRefs = useRef([]);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const email = location.state?.email;

//   const handleChange = (element, index) => {
//     if (/^\d$/.test(element.value) || element.value === "") {
//       const newOtp = [...otp];
//       newOtp[index] = element.value;
//       setOtp(newOtp);

//       // Focus next input
//       if (element.value && index < 5) {
//         inputRefs.current[index + 1]?.focus();
//       }
//     }
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === "Backspace" && !otp[index] && index > 0) {
//       inputRefs.current[index - 1]?.focus();
//     }
//   };

//   const handleReset = async (e) => {
//     e.preventDefault();
//     const emailOTP = otp.join("");
//     if (emailOTP.length !== 6) {
//       return toast.error("Enter all 6 digits of the OTP");
//     }

//     try {
//       await axios.post("http://localhost:3000/api/reset-password", {
//         email,
//         emailOTP,
//         newPassword,
//       });
//       toast.success("Password reset successful");
//       navigate("/login");
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to reset password");
//     }
//   };

//   return (
//     <div className="reset-password-container">
//       <h2>Reset Password</h2>
//       <form onSubmit={handleReset}>
//         <div>
//           {otp.map((digit, index) => (
//             <input
//               key={index}
//               type="text"
//               inputMode="numeric"
//               maxLength="1"
//               value={digit}
//               onChange={(e) => handleChange(e.target, index)}
//               onKeyDown={(e) => handleKeyDown(e, index)}
//               ref={(el) => (inputRefs.current[index] = el)}
//               required
//             />
//           ))}
//         </div>
//         <input
//           type="password"
//           placeholder="Enter New Password"
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Reset Password</button>
//       </form>
//     </div>
//   );
// };
// export default ResetPassword;

import { useState, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";

import "./css/resetPassword.css";

export default function ResetPassword() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const inputRefs = useRef([]);
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const handleChange = (element, index) => {
    if (/^\d$/.test(element.value) || element.value === "") {
      const newOtp = [...otp];
      newOtp[index] = element.value;
      setOtp(newOtp);

      // Focus next input
      if (element.value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    const emailOTP = otp.join("");

    if (emailOTP.length !== 6) {
      return toast.error("Enter all 6 digits of the OTP");
    }

    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      await axios.post("http://localhost:3000/api/reset-password", {
        email,
        emailOTP,
        newPassword,
      });
      toast.success("Password reset successful");
      navigate("/profile");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleReset}>
        <div className="otp-inputs">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => (inputRefs.current[index] = el)}
              required
            />
          ))}
        </div>
        <input
          type="password"
          placeholder="Enter New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      {/* <ToastContainer position="top-right" autoClose={3000} /> */}
    </div>
  );
}
