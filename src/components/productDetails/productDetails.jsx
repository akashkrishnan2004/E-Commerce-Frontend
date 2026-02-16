// currently using
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL

import "./productDetails.css";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [selectedImage, setSelectedImage] = useState("");
  const [inCart, setInCart] = useState(false);

  const [userData, setUserData] = useState({});

  const userId = localStorage.getItem("User Id");

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/get-product/${id}`
        );
        setProduct(response.data.product);
        setSelectedImage(response.data.product.images?.[0]);
      } catch (error) {
        console.error(error);
      }
    };

    const checkInCart = async () => {
      if (!userId) return;
      try {
        const response = await axios.get(
          `${API_URL}/api/is-in-cart/${userId}/${id}`
        );
        setInCart(response.data.inCart);
      } catch (error) {
        console.error(error);
      }
    };

    getProduct();
    checkInCart();

    // get user details for adding username into cart
    const getUserData = async () => {
      const response = await axios.get(
        `${API_URL}/api/get-user/${userId}`
      );
      setUserData(response.data.user);
    };
    getUserData();
  }, [id, userId]);

  console.log(userData.userName);

  const handleCartToggle = async () => {
    if (!userId) {
      toast.error("Please log in to manage your cart.");
      return;
    }

    try {
      if (inCart) {
        await axios.post(`${API_URL}/api/remove-from-cart`, {
          userId,
          productId: product._id,
        });
        toast.success("Removed from cart");
        setInCart(false);
      } else {
        await axios.post(`${API_URL}/api/add-to-cart`, {
          userId,
          userName: userData.username,
          productId: product._id,
          productName: product.modelName,
          quantity: 1,
        });
        toast.success("Added to cart");
        setInCart(true);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const handeleBuyMobile = async () => {
    toast.error("Product is currently not available");
  };

  console.log(product);

  return (
    <div>
      {!product ? (
        <p>Loading.....</p>
      ) : (
        <div className="product-container">
          <div className="product-details-image-set">
            <div className="other-images">
              {product.images?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Image ${index + 1}`}
                  onClick={() => setSelectedImage(img)}
                  className={`thumbnail ${
                    selectedImage === img ? "selected-thumbnail" : ""
                  }`}
                />
              ))}
            </div>
            <div className="product-details-center-section">
              <img
                src={selectedImage}
                alt={product?.modelName}
                className="main-image"
              />
              <div className="product-buttons">
                <button className="cart-btn" onClick={handleCartToggle}>
                  <span>
                    {inCart ? (
                      <i className="fa-solid fa-trash"></i>
                    ) : (
                      <i className="fa-solid fa-cart-shopping"></i>
                    )}
                  </span>
                  {inCart ? "REMOVE FROM CART" : "ADD TO CART"}
                </button>
                <button className="buy-btn" onClick={handeleBuyMobile}>
                  <span>
                    <i className="fa-solid fa-bolt-lightning"></i>
                  </span>
                  BUY NOW
                </button>
              </div>
            </div>
          </div>
          <div className="product-details">
            <h1>{product.modelName}</h1>
            <p>{product.description}</p>

            {product.discount?.percentage > 0 && (
              <div className="price-details">
                <h2 className="discounted-price">
                  ₹
                  {product.price -
                    (product.price * product.discount.percentage) / 100}
                </h2>
                <h3 className="original-price">₹{product.price}</h3>
                <h3 className="discount">
                  {/* <i className="fa-solid fa-arrow-down"></i>  */}
                  {product.discount.percentage}% off
                </h3>
              </div>
            )}
            <div className="product-details-key-features">
              {/* <h3>Key Features</h3> */}
              <h3>Product Highlights</h3>
              {/* <ul className="product-key-features">
                <li>
                  <span>RAM</span> {product.ram}
                </li>
                <li>
                  <span>Storage</span> {product.storage}
                </li>
                <li>
                  <span>Processor</span> {product.processor}
                </li>
                <li>
                  <span>Display</span> {product.displaySize}
                </li>
                <li>
                  <span>OS</span> {product.os}
                </li>
                <li>
                  <span>Battery</span> {product.battery}
                </li>
                <li>
                  <span>Camera</span> {product.camera}
                </li>
              </ul> */}
              <ul className="product-key-features">
                <li>
                  <span className="material-symbols-outlined">memory_alt</span>
                  <span className="product-specification">
                    {product.ram} | {product.storage}
                  </span>
                </li>
                <li>
                  <span className="material-symbols-outlined">memory</span>
                  <span className="product-specification">{product.processor}</span>
                </li>
                <li>
                  <span className="material-symbols-outlined">mobile_2</span>
                  <span className="product-specification">{product.displaySize}</span>
                </li>
                <li>
                  {/* <span class="material-symbols-outlined">android</span> */}
                  <span className="material-symbols-outlined">adb</span>
                  <span className="product-specification">{product.os}</span>
                </li>
                <li>
                  <span className="material-symbols-outlined">
                    battery_android_frame_full
                  </span>
                  <span className="product-specification">{product.battery}</span>
                </li>
                <li>
                  <span className="material-symbols-outlined">camera</span>
                  <span className="product-specification">{product.camera}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
      {/* <ToastContainer position="top-right" autoClose={3000} /> */}
    </div>
  );
}

