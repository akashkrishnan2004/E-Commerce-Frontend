import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios, { all } from "axios";

const API_URL =  import.meta.env.VITE_API_URL

import "./dashboard.css";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = parseInt(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(pageParam);

  const productsPerPage = 4;
  
  // console.log(API_URL);

  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/get-products`
        );
        const allowedProducts = response.data.products.filter(
          (allowed) => allowed.showOnSite
        );
        // setProducts(allowedProducts);
        // setProducts(allowedProducts.reverse());
        setProducts(allowedProducts.sort(() => Math.random() - 0.5));
        // setProducts(response.data.products);
      } catch (error) {
        console.error("Failed to load products", error);
        toast.error("Failed to load products");
      }
    };
    getProducts();
  }, []);

  // Filter
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.modelName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesBrand =
      !brandFilter || product.brand.toLowerCase() === brandFilter.toLowerCase();

    return matchesSearch && matchesBrand;
  });

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setSearchParams({ page });
    }
  };

  return (
    <div className="home-container">
      <nav className="home-nav">
        <h1>Shop Now</h1>
        <input
          type="search"
          // list="mobiles"
          placeholder="Search by model or brand"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
            setSearchParams({ page: 1 });
          }}
          className="search-input"
        />

        {/* <datalist id="mobiles">
          <option value="Apple">Apple</option>
          <option value="Samsung">Samsung</option>
          <option value="Oneplus">Oneplus</option>
          <option value="Oppo">Oppo</option>
          <option value="Realme">Realme</option>
          <option value="Vivo">Vivo</option>
          <option value="Nothing">Nothing</option>
        </datalist> */}

        <div className="select-wrapper">
          <select
            value={brandFilter}
            onChange={(e) => {
              setBrandFilter(e.target.value);
              setCurrentPage(1);
              setSearchParams({ page: 1 });
            }}
            className="brand-filter"
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
          <span className="custom-arrow">&#9662;</span>
        </div>
      </nav>

      {/* Products List */}
      <div className="product-grid">
        {currentProducts.length === 0 ? (
          <p className="no-product">No products found.</p>
        ) : (
          currentProducts.map((product) => (
            <Link to={`/product-details/${product._id}`} key={product._id}>
              <div className="product-card">
                {/* Show label if product.showLabel is true */}
                {product.showLabel && (
                  <div className="new-launch-label">New Arrival</div>
                )}

                <img src={product.images[0]} alt={product.modelName} />
                <h3>{product.modelName}</h3>
                <div className="product-price-details">
                  <div className="product-price-details-right">
                    <h5 className="discount-percentage">
                      {product.discount.percentage}% off
                    </h5>
                    <h3 className="discount-price">
                      ₹
                      {product.price -
                        (product.price * product.discount.percentage) / 100}
                    </h3>
                    <h5 className="product-price">₹{product.price}</h5>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {/* Prev */}
          <i className="fa-solid fa-arrow-left"></i>
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? "active-page" : ""}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {/* Next */}
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
}
