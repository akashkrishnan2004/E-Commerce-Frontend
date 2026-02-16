import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL =  import.meta.env.VITE_API_URL

import "./adminCss/adminDashboard.css";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [products, setProducts] = useState([]);

  // Check admin auth
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin !== "true") {
      navigate("/admin/login");
    }
  }, [navigate]);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/get-products`);
      setProducts(res.data.products);
    } catch (error) {
      console.error("Failed to load products", error);
      toast.error("Failed to load products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete a product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      await axios.delete(`${API_URL}/api/delete-product/${id}`);
      toast.success("Product deleted");
      fetchProducts();
    } catch (err) {
      console.error("Delete error", err);
      toast.error("Delete failed");
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/admin/login");
  };

  // Combine search + filter
  const filteredAndSearched = products.filter((product) => {
    const matchesBrand =
      !statusFilter ||
      product.brand.toLowerCase() === statusFilter.toLowerCase();

    const matchesSearch =
      product.modelName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesBrand && matchesSearch;
  });

  const handleToggleShow = async (id) => {
    try {
      const response = await axios.patch(
        `${API_URL}/api/toggle-show-product/${id}`
      );
      toast.success(
        response.data.showOnSite
          ? "Product is now visible on site"
          : "Product hidden from site"
      );
      fetchProducts();
    } catch (err) {
      toast.error("Toggle failed");
      console.error(err);
    }
  };

  const handelAddLable = async (id) => {
    try {
      const response = await axios.patch(
        `${API_URL}/api/toggle-add-label/${id}`
      );
      toast.success(
        response.data.showLabel ? "Added the label" : "Removed the label"
      );
      fetchProducts();
    } catch (error) {
      toast.error("Toggle failed");
      console.error(error);
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Top Nav */}
      <nav className="admin-dashboard-nav">
        <h1>Admin Dashboard</h1>
        <div className="admin-dashboard-buttons">
          <Link to="/admin/product-add">
            <button>Add Product</button>
          </Link>
          <Link to="/admin/app-reviews">
            <button>View App Reviews</button>
          </Link>

          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <nav className="admin-dashboard-nav2">
        <input
          type="search"
          placeholder="Search Mobiles"
          className="product-search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Filter/Search */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="admin-select-box"
        >
          <option value="">All Brands</option>
          <option value="Apple">Apple</option>
          <option value="Samsung">Samsung</option>
          <option value="Oneplus">Oneplus</option>
          <option value="Oppo">Oppo</option>
          <option value="Realme">Realme</option>
          <option value="Vivo">Vivo</option>
          <option value="Nothing">Nothing</option>
          <option value="Google Pixel">Pixel</option>
          <option value="Motorola">Motorola</option>
          <option value="Honor">Honor</option>
          <option value="Iqoo">Iqoo</option>
        </select>
      </nav>

      {/* Product Grid */}
      <div>
        {filteredAndSearched.length === 0 ? (
          <p className="no-product">No products found.</p>
        ) : (
          <div className="product-grid">
            {filteredAndSearched.map((product) => (
              <div className="product-card" key={product._id}>
                <h3>{product.modelName}</h3>
                <div className="product-price-details">
                  <h4>₹ {product.price}</h4>
                  <h5>{product.discount.percentage}% Offer</h5>
                </div>
                <img src={product.images[0]} alt={product.modelName} />
                <div className="product-btns">
                  <Link to={`/admin/product-edit/${product._id}`}>
                    <button className="product-edit-btn">Edit</button>
                  </Link>

                  <button
                    onClick={() => handleDelete(product._id)}
                    className="product-delete-btn"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => handleToggleShow(product._id)}
                    className="product-show-hide-btn"
                  >
                    {product.showOnSite
                      ? "Hide product from site"
                      : "Show product in site"}
                  </button>

                  <button
                    onClick={() => handelAddLable(product._id)}
                    className="add-label-button"
                  >
                    {product.showLabel ? "Remove label" : "Add label"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
