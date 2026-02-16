import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
// import { ToastContainer, toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL

import "./Contact.css";

export default function Contact() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});

  const user_id = localStorage.getItem("User Id");

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/get-user/${user_id}`,
        );
        setUserData(response.data.user);
      } catch (error) {
        toast.error("Failed to fetch user data");
      }
    };
    if (user_id) {
      getUserData();
    }
  }, [user_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      userId: userData._id,
      name: userData.username,
      email: userData.email,
      image: userData.profileImage,
      message,
    };

    try {
      const res = await axios.post(
        `${API_URL}/api/contact`,
        payload,
      );
      toast.success(res.data.message || "Message sent successfully!");
      setMessage("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-box">
        <h1>Contact Us</h1>
        <p>We're here to help. Send us your questions or feedback!</p>
        <form onSubmit={handleSubmit}>
          <textarea
            name="message"
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
      {/* <ToastContainer position="top-right" autoClose={3000} /> */}
    </div>
  );
}
