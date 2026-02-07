import { Outlet } from "react-router-dom";
import NavBar from "../navBar/navBar";
import Footer from "../footer/footer";

import "./layoutWithNav.css";

export default function LayoutWithNav() {
  return (
    <div className="page-layout">
      <NavBar />
      <main className="page-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
