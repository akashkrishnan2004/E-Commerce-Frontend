import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL =  import.meta.env.VITE_API_URL

import "./siteReviews.css";

import avatar from "../images/Avatar.png";

export default function SiteReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/get-all-messages`,
        );
        const visibleReviews = response.data.filter(
          (review) => review.showOnSite,
        );
        setReviews(visibleReviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    getReviews();
  }, []);

  return (
    <div className="site-review-container">
      <h1>User Reviews</h1>
      {loading ? (
        <p>Loading...</p>
      ) : reviews.length === 0 ? (
        <p>No reviews to show.</p>
      ) : (
        reviews.map((review, index) => (
          <div key={index} className="review-grid">
            <div className="review-card" key={review._id}>
              <div className="review-header">
                <img
                  src={review.image || avatar}
                  // alt={review.name}
                />
                <div className="review-details">
                  <h3>{review.name}</h3>
                  {/* <p className="email">{review.email}</p> */}
                </div>
              </div>
              <p className="review-message">{review.message}</p>
              <p className="review-timestamp">
                {new Date(review.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))
      )}

      <h4 className="add-opinions">
        <Link to="/contact">Add Your Opinions</Link>
      </h4>
    </div>
  );
}
