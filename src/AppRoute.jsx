import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import 'react-loading-skeleton/dist/skeleton.css';

import '@fortawesome/fontawesome-free/css/all.min.css'; // For loading font awesome icons

import AdminLogin from "./components/adminPage/adminLogin";
import AdminDashboard from "./components/adminPage/adminDashboard";
import ProductAdd from "./components/adminPage/produtAdd";
import Register from "./components/register/register";
import VerifyOTP from "./components/otpVerification/VerifyOTP";
import Login from "./components/login/login";
import Dashboard from "./components/dashboard/dashboard";
import ProtectedRoute from "./components/protectedRoute/protectedRoute";
import About from "./components/about/about";
import Contact from "./components/contact/contact";
import LayoutWithNav from "./components/layoutComponent/layoutWithNav";
import Profile from "./components/profile/profile";
import ProductEdit from "./components/adminPage/editPage";
import ProductDetails from "./components/productDetails/productDetails";
import ForgotPassword from "./components/passwordChange/forgotPassword";
import ResetPassword from "./components/passwordChange/resetPassword";
import Cart from "./components/cart/cart";
import AdminReviews from "./components/adminPage/appReviews";
import SiteReviews from "./components/reviews/siteReviews";

import InactivityLogout from "./components/autoLogout/inactivityLogout";

export default function AppRoute() {
  return (
    <BrowserRouter>
      <InactivityLogout />
      <Toaster position="bottom-left" reverseOrder={false} />
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Protected Routes with NavBar */}
        <Route
          element={
            <ProtectedRoute>
              <LayoutWithNav />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/app-reviews" element={<SiteReviews />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path="/cart-details" element={<Cart />} />
        </Route>

        {/* Admin Pages */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/product-add" element={<ProductAdd />} />
        <Route path="/admin/product-edit/:id" element={<ProductEdit />} />
        <Route path="/admin/app-reviews" element={<AdminReviews />} />
      </Routes>
    </BrowserRouter>
  );
}
