import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function InactivityLogout() {
  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  const logoutUser = () => {
    localStorage.removeItem("User Id");
    localStorage.removeItem("token");
    // localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  const resetTimer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(logoutUser, 10 * 60 * 1000); // 10 min
    // timeoutRef.current = setTimeout(logoutUser, 10 * 1000); // 10 sec
  };

  useEffect(() => {
    const events = ["mousemove", "keydown", "scroll", "click"];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    resetTimer(); // start the timer

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return null;
}
