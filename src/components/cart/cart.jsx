import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL

import "./cart.css";

export default function Cart() {
  const user_id = localStorage.getItem("User Id");
  const [cartedProducts, setCartedProducts] = useState([]);
  useEffect(() => {
    const getCartedProducts = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/user-cart/${user_id}`
        );
        setCartedProducts(response.data.cartedItems.reverse());
        // console.log(cartedProducts);
      } catch (error) {
        console.log(error);
      }
    };
    getCartedProducts();
  }, []);

  console.log(cartedProducts);

  return (
    <div className="cart-container">
      <h1 className="cart-title">My Cart</h1>
      {cartedProducts.length === 0 ? (
        <p className="cart-empty">No Products in cart</p>
      ) : (
        <div className="cart-grid">
          {cartedProducts.map((products, index) => (
            <Link to={`/product-details/${products.productId._id}`} key={index}>
              <div key={index} className="cart-card">
                <img src={products.productId.images[0]} alt="" />
                <h3 className="cart-product-title">
                  {products.productId.modelName}
                </h3>
                <div className="product-price-details">
                  <h5 className="discount-offer">
                    {products.productId.discount.percentage} % off
                  </h5>
                  <h3 className="discount-price">
                    {" "}
                    ₹
                    {products.productId.price -
                      (products.productId.price *
                        products.productId.discount.percentage) /
                        100}
                  </h3>
                  <h5 className="product-price">₹{products.productId.price}</h5>
                </div>
                {/* <h4>
                  <button>-</button>
                  {products.quantity}
                  <button>+</button>
                </h4> */}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
