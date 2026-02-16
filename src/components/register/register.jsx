// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import toast from "react-hot-toast";

// import avatar from "../images/Avatar.png";
// import mobile from "../images/mobile-img.jpg";

// const API_URL =  import.meta.env.VITE_API_URL

// import "../register/register.css";

// export default function Register() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     profileImage: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");


//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setError(""); // Clear error when user types
//   };

//   // Handle image upload and convert to Base64
//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setFormData((prevData) => ({
//           ...prevData,
//           profileImage: reader.result, // Store Base64 string
//         }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Check if passwords match
//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     setLoading(true);
//     try {
//       const { confirmPassword, ...dataToSend } = formData; // Exclude confirmPassword from API request
//       const res = await axios.post(
//         `${API_URL}/api/register`,
//         dataToSend
//       );
//       toast.success(res.data.message);
//       navigate("/verify-otp", { state: { email: formData.email } }); // Redirect to OTP verification
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Registration failed.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="register-container">
//       <div className="register-image-card">
//         <img src={mobile} alt="" />
//         <div className="register-image-card-des">
//           <h1 className="register-head">Welcome to Our Community</h1>
//           <p className="register-para">The largest mobile selling platform</p>
//         </div>
//       </div>
//       <div className="register-card">
//         <h2>Register</h2>
//         <form onSubmit={handleSubmit} className="register-form">
//           <label htmlFor="image" style={{ cursor: "pointer" }}>
//             <img
//               src={formData.profileImage || avatar}
//               alt="Profile image"
//               className="profile-image"
//             />
//           </label>
//           <input
//             type="file"
//             name="image"
//             id="image"
//             accept="image/*"
//             onChange={handleImageUpload}
//             className="image-file"
//           />
//           <div className="register-form-name">
//             <input
//               type="text"
//               name="firstName"
//               placeholder="First Name"
//               onChange={handleChange}
//               required
//             />
//             <input
//               type="text"
//               name="lastName"
//               placeholder="Last Name"
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <input
//             type="text"
//             name="username"
//             placeholder="Username"
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="password"
//             name="confirmPassword"
//             placeholder="Confirm Password"
//             onChange={handleChange}
//             required
//           />
//           {error && <p className="error-message">{error}</p>}{" "}
//           <button type="submit" disabled={loading}>
//             {loading ? "Registering..." : "Register"}
//           </button>
//           <p className="already-login">
//             Already have an account ?{" "}
//             <span>
//               {" "}
//               <Link to="/login">Login</Link>{" "}
//             </span>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import avatar from "../images/Avatar.png";
import mobile from "../images/mobile-img.jpg";

const API_URL = import.meta.env.VITE_API_URL;

import "../register/register.css";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const usernameRegex = /^[a-z0-9_]+$/;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
    setError("");
  };

  // ✅ Image upload (Base64)
  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          profileImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // ✅ Username validation
    if (!usernameRegex.test(formData.username)) {
      setError(
        "Username can only contain lowercase letters, numbers, and underscores."
      );
      return;
    }

    // ✅ Password match validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...dataToSend } = formData;

      const res = await axios.post(
        `${API_URL}/api/register`,
        dataToSend
      );

      toast.success(res.data.message);

      navigate("/verify-otp", {
        state: { email: formData.email },
      });

    } catch (error) {
      const message =
        error.response?.data?.message || "Registration failed.";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-image-card">
        <img src={mobile} alt="" />
        <div className="register-image-card-des">
          <h1 className="register-head">Welcome to Our Community</h1>
          <p className="register-para">
            The largest mobile selling platform
          </p>
        </div>
      </div>

      <div className="register-card">
        <h2>Register</h2>

        <form onSubmit={handleSubmit} className="register-form">

          {/* Profile Image */}
          <label htmlFor="image" style={{ cursor: "pointer" }}>
            <img
              src={formData.profileImage || avatar}
              alt="Profile"
              className="profile-image"
            />
          </label>

          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageUpload}
            className="image-file"
          />

          <div className="register-form-name">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              onChange={handleChange}
              required
            />
          </div>

          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
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

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            required
          />

          {error && <p className="error-message">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>

          <p className="already-login">
            Already have an account?{" "}
            <Link to="/login">Login</Link>
          </p>

        </form>
      </div>
    </div>
  );
}
