// import { Link, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";

// import "./navBar.css";

// import avatar from "../images/Avatar.png";

// export default function NavBar() {
//   const [userData, setUserData] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const user_id = localStorage.getItem("User Id");

//   useEffect(() => {
//     const getUser = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:3000/api/get-user/${user_id}`
//         );
//         setUserData(response.data.user);
//       } catch (err) {
//         console.error("Failed to fetch user:", err);
//         setError("Failed to load user data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (user_id) getUser();
//   }, [user_id]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <nav className="dashboard-nav">
//       <div className="left-dashboard-nav">
//         {/* <span>Logo</span> */}
//         <span>Phonix</span>
//       </div>
//       <div className="center-dashboard-nav">
//         <ul>
//           <li>
//             <Link to="/dashboard">Home</Link>
//           </li>
//           <li>
//             <Link to="/about">About</Link>
//           </li>
//           <li>
//             <Link to="/contact">Contact Us</Link>
//           </li>
//           <li>
//             <Link to="/app-reviews">Reviews</Link>
//           </li>
//         </ul>
//       </div>
//       <div className="right-dashboard-nav">
//         {/* <span > */}
//         <Link to="/cart-details">
//           <button className="product-cart">
//             <i className="fa-solid fa-cart-shopping"></i>
//           </button>
//         </Link>

//         {/* </span> */}
//         <div className="image">
//           <Link to="/profile">
//             <img
//               src={userData.profileImage || avatar}
//               // alt={userData.name || "User"}
//             />
//           </Link>
//         </div>
//         <span className="menu-bar">
//           <i className="fa-solid fa-bars"></i>
//         </span>
//       </div>
//     </nav>
//   );
// }

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import "./navBar.css";

import avatar from "../images/Avatar.png";

export default function NavBar() {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 👈 new state

  const navigate = useNavigate();
  const user_id = localStorage.getItem("User Id");

  const toggleMenu = () => setIsMenuOpen((prev) => !prev); // 👈 toggle menu

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/get-user/${user_id}`
        );
        setUserData(response.data.user);
      } catch (err) {
        console.error("Failed to fetch user:", err);
        setError("Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };

    if (user_id) getUser();
  }, [user_id]);

  if (loading) return <p className="navBar-data-loading">Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <nav className="dashboard-nav">
      <div className="left-dashboard-nav">
        <span>Phonix</span>
      </div>

      <div className={`center-dashboard-nav ${isMenuOpen ? "open" : ""}`}>
        <ul>
          <li>
            <Link to="/dashboard">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <li>
            <Link to="/app-reviews">Reviews</Link>
          </li>
        </ul>
      </div>

      <div className="right-dashboard-nav">
        <Link to="/cart-details">
          <button className="product-cart">
            <i className="fa-solid fa-cart-shopping"></i>
          </button>
        </Link>
        <div className="image">
          <Link to="/profile">
            <img src={userData.profileImage || avatar} />
          </Link>
        </div>
        <span className="menu-bar" onClick={toggleMenu}>
          <i className="fa-solid fa-bars"></i>
        </span>
      </div>

      {/* <div className={`right-dashboard-nav2 ${isMenuOpen ? "open" : ""}`}>
        <ul>
          <li>
            <Link to="/dashboard">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <li>
            <Link to="/app-reviews">Reviews</Link>
          </li>
          <li>
            <Link to="/cart-details">Cart</Link>
          </li>
        </ul>
      </div> */}
    </nav>
  );
}
