// main
// import { useNavigate } from "react-router-dom";

// import "./profile.css";
// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function Profile() {
//   const navigate = useNavigate();
//   const [userData, setUserData] = useState({});

//   const user_id = localStorage.getItem("User Id");

//   useEffect(() => {
//     const getUserData = async () => {
//       const response = await axios.get(
//         `http://localhost:3000/api/get-user/${user_id}`
//       );
//       setUserData(response.data.user);
//     };
//     getUserData();
//   }, [user_id]);
//   console.log(userData);

//   const handleLogout = () => {
//     localStorage.removeItem("User Id");
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   return (
//     <div className="profile-container">
//       <div className="profile-container-top">
//         <h1 className="profile-title">My Profile</h1>
//         <button onClick={handleLogout} className="logout-btn">
//           <span>Logout</span>
//           <i className="fa-solid fa-right-from-bracket"></i>
//         </button>
//       </div>
//       <div className="profile-container-body">
//         <div className="profile-container-body-left">
//           <div className="profile-container-username  ">
//             <input type="text" value={userData.firstName} />
//             <input type="text" value={userData.lastName} />
//           </div>
//           <input type="text" value={userData.username} />
//           <input type="email" value={userData.email} />
//         </div>
//         <div className="profile-container-body-right">
//           <img src={userData.profileImage} alt="" />
//         </div>
//       </div>
//       <button>Edit profile</button>
//     </div>
//   );
// }
// main

// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";

// import "./profile.css";

// export default function Profile() {
//   const navigate = useNavigate();
//   const [userData, setUserData] = useState({});
//   const [editMode, setEditMode] = useState(false);
//   const [formData, setFormData] = useState({});
//   const user_id = localStorage.getItem("User Id");

//   useEffect(() => {
//     const getUserData = async () => {
//       const response = await axios.get(
//         `http://localhost:3000/api/get-user/${user_id}`
//       );
//       setUserData(response.data.user);
//       setFormData(response.data.user);
//     };
//     getUserData();
//   }, [user_id]);

//   const handleLogout = () => {
//     localStorage.removeItem("User Id");
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setFormData((prev) => ({ ...prev, profileImage: reader.result }));
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleUpdate = async () => {
//     try {
//       await axios.put(`http://localhost:3000/api/update-user/${user_id}`, {
//         firstName: formData.firstName,
//         lastName: formData.lastName,
//         username: formData.username,
//         profileImage: formData.profileImage,
//       });
//       setEditMode(false);
//       setUserData((prev) => ({
//         ...prev,
//         ...formData,
//       }));
//     } catch (err) {
//       console.error("Failed to update profile", err);
//     }
//   };

//   return (
//     <div className="profile-container">
//       <div className="profile-container-top">
//         <h1 className="profile-title">My Profile</h1>
//         <button onClick={handleLogout} className="logout-btn">
//           <span>Logout</span>
//           <i className="fa-solid fa-right-from-bracket"></i>
//         </button>
//       </div>

//       <div className="profile-container-body">
//         <div className="profile-container-body-left">
//           <div className="profile-container-username">
//             <input
//               type="text"
//               name="firstName"
//               value={formData.firstName || ""}
//               onChange={handleChange}
//               disabled={!editMode}
//             />
//             <input
//               type="text"
//               name="lastName"
//               value={formData.lastName || ""}
//               onChange={handleChange}
//               disabled={!editMode}
//             />
//           </div>
//           <input
//             type="text"
//             name="username"
//             value={formData.username || ""}
//             onChange={handleChange}
//             disabled={!editMode}
//           />
//           <input type="email" value={formData.email || ""} disabled />
//         </div>

//         <div className="profile-container-body-right">
//           {editMode ? (
//             <>
//               <input
//                 type="file"
//                 name="image"
//                 id="image"
//                 accept="image/*"
//                 onChange={handleImageUpload}
//                 className="image-update-file"
//               />
//               {formData.profileImage && (
//                 <img src={formData.profileImage} alt="preview" />
//               )}
//             </>
//           ) : (
//             <label htmlFor="image">
//               <img src={formData.profileImage} alt="profile" />
//             </label>
//           )}
//         </div>
//       </div>

//       {!editMode ? (
//         <button onClick={() => setEditMode(true)}>Edit profile</button>
//       ) : (
//         <button onClick={handleUpdate}>Save Changes</button>
//       )}
//     </div>
//   );
// }

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
// import { ToastContainer, toast } from "react-toastify";

import "./profile.css";

import avatar from "../images/Avatar.png";

export default function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const user_id = localStorage.getItem("User Id");

  useEffect(() => {
    const getUserData = async () => {
      const response = await axios.get(
        `http://localhost:3000/api/get-user/${user_id}`
      );
      setUserData(response.data.user);
      setFormData(response.data.user); // For editing
    };
    getUserData();
  }, [user_id]);

  const handleLogout = () => {
    try {
      localStorage.removeItem("User Id");
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      setFormData((prev) => ({
        ...prev,
        profileImage: base64, // Immediately update image in UI
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3000/api/update-user/${user_id}`, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        profileImage: formData.profileImage,
      });
      setEditMode(false);
      setUserData((prev) => ({
        ...prev,
        ...formData,
      }));
      toast.success("Profile updated successfully");
    } catch (err) {
      console.error("Failed to update profile", err);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-container-top">
        <h1 className="profile-title">My Profile</h1>
        <button onClick={handleLogout} className="logout-btn">
          <span>Logout</span>
          <i className="fa-solid fa-right-from-bracket"></i>
        </button>
      </div>

      <div className="profile-container-body">
        <div className="profile-container-body-left">
          <div className="profile-container-username">
            <div className="firstName-container">
              <label htmlFor="">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName || ""}
                onChange={handleChange}
                disabled={!editMode}
              />
            </div>
            <div className="lastName-container">
              <label htmlFor="">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName || ""}
                onChange={handleChange}
                disabled={!editMode}
              />
            </div>
          </div>
          <div className="username-container">
            <label htmlFor="">User Name</label>
            <input
              type="text"
              name="username"
              value={formData.username || ""}
              onChange={handleChange}
              disabled={!editMode}
            />
          </div>
          <div className="email-container">
            <label htmlFor="">Email</label>
            <input type="email" value={formData.email || ""} disabled />
          </div>
        </div>

        <div className="profile-container-body-right">
          <label htmlFor="image">
            <img src={formData.profileImage || avatar} alt="Profile" />
          </label>

          {editMode && (
            <input
              type="file"
              name="image"
              id="image"
              accept="image/*"
              onChange={handleImageUpload}
              className="image-update-file"
            />
          )}
        </div>
      </div>

      {!editMode ? (
        <button className="profile-edit" onClick={() => setEditMode(true)}>
          Edit profile
        </button>
      ) : (
        <div className="profile-edit-btns">
          <button className="profile-edit-save" onClick={handleUpdate}>
            Save Changes
          </button>
          <button
            onClick={() => navigate("/forgot-password")}
            className="profile-edit-password"
          >
            Edit password
          </button>
        </div>
      )}
      {/* <ToastContainer position="top-right" autoClose={3000} /> */}
    </div>
  );
}
