// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// import "./css/dashboardBanner.css";

// const API_URL = import.meta.env.VITE_API_URL;

// export default function DashboardBanner() {
//   const [banners, setBanners] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchBanners = async () => {
//       try {
//         const res = await axios.get(
//           `${API_URL}/api/get-active-announcements`
//         );
//         setBanners(res.data?.announcements || []);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchBanners();
//   }, []);

//   if (banners.length === 0) return null;

//   return (
//     <div className="banner-wrapper">
//       {banners.map((banner) => (
//         <div
//           key={banner._id}
//           className="banner-card"
//           onClick={() =>
//             banner.redirectLink && navigate(banner.redirectLink)
//           }
//         >
//           <img src={banner.image} alt={banner.title} />
//           <div className="banner-overlay">
//             <h2>{banner.title}</h2>
//             <p>{banner.message}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./css/dashboardBanner.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function DashboardBanner() {
  const [banners, setBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/get-active-announcements`
        );
        setBanners(res.data?.announcements || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBanners();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === banners.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? banners.length - 1 : prev - 1
    );
  };

  if (banners.length === 0) return null;

  return (
    <div className="slider-container">
      {/* Left Arrow */}
      <button className="arrow left" onClick={prevSlide}>
        ❮
      </button>

      {/* Banner */}
      <div
        className="slide"
        onClick={() =>
          banners[currentIndex].redirectLink &&
          navigate(banners[currentIndex].redirectLink)
        }
      >
        <img
          src={banners[currentIndex].image}
          alt={banners[currentIndex].title}
        />

        <div className="overlay">
          <h2>{banners[currentIndex].title}</h2>
          <p>{banners[currentIndex].message}</p>
        </div>
      </div>

      {/* Right Arrow */}
      <button className="arrow right" onClick={nextSlide}>
        ❯
      </button>
    </div>
  );
}