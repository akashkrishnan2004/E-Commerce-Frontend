// import "./announcementBanner.css";

// export default function AnnouncementBanner() {
//   return (
//     <div className="announcement-banner">
//       🚀 New products are coming soon! Stay tuned for exciting launches!
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./css/announcementBanner.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function AnnouncementBanner() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/get-active-announcements`
        );
        setAnnouncements(res.data.announcements);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAnnouncements();
  }, []);

  if (announcements.length === 0) return null;

  return (
    <div className="announcement-banner">
      <div className="scrolling-wrapper">
        {announcements.map((item) => (
          <Link
            key={item._id}
            to={`/product-details/${item.productId._id}`}
            className="banner-link"
          >
            🚀 {item.message} &nbsp;&nbsp;&nbsp;
          </Link>
        ))}
      </div>
    </div>
  );
}