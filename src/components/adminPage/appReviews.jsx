import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
// import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

import avatar from "../images/Avatar.png";

import "./adminCss/appReviews.css";

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Check admin
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin !== "true") {
      navigate("/admin/login");
    }
  }, [navigate]);

  const getReviews = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/get-all-messages"
      );
      setReviews(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReviews();
  }, []);

  const handleDeleteReview = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      await axios.delete(`http://localhost:3000/api/delete-message/${id}`);
      toast.success("Review deleted");
      getReviews();
    } catch (err) {
      console.error("Delete error", err);
      toast.error("Delete failed");
    }
  };

  const handleToggleShow = async (id) => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/toggle-show-message/${id}`
      );
      toast.success(
        response.data.showOnSite
          ? "Review is now visible on site"
          : "Review hidden from site"
      );
      getReviews();
    } catch (err) {
      toast.error("Toggle failed");
      console.error(err);
    }
  };

  return (
    <div className="app-review-container">
      <h1>User Messages</h1>

      {loading ? (
        <p>Loading...</p>
      ) : reviews.length === 0 ? (
        <p className="no-reviews">No reviews found.</p>
      ) : (
        <div className="app-review-grid">
          {reviews.map((review) => (
            <div className="review-card" key={review._id}>
              <div className="user-info">
                <img
                  src={review.image || avatar}
                  className="profile-img"
                  alt="user avatar"
                />
                <div>
                  <h3>{review.name}</h3>
                  <p className="email">{review.email}</p>
                </div>
              </div>
              <p className="message">{review.message}</p>
              <p className="timestamp">
                {new Date(review.createdAt).toLocaleString()}
              </p>
              <div className="review-btns">
                <button
                  onClick={() => handleDeleteReview(review._id)}
                  className="delete-review"
                >
                  Delete Review
                </button>
                <button
                  onClick={() => handleToggleShow(review._id)}
                  className="show-hide-review"
                >
                  {review.showOnSite
                    ? "Hide review from site"
                    : "Show review in site"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* <ToastContainer position="top-right" autoClose={3000} /> */}
    </div>
  );
}
