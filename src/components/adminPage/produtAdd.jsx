// Main
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export default function ProductAdd() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const isAdmin = localStorage.getItem("isAdmin");
//     if (isAdmin !== "true") {
//       navigate("/admin/login");
//     }
//   }, [navigate]);

//   return (
//     <div>
//       <h1>Product Add Page</h1>
//     </div>
//   );
// }
// Main

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import "./adminCss/produtAdd.css";

export default function ProductAdd() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    modelName: "",
    brand: "",
    description: "",
    price: "",
    ram: "",
    storage: "",
    battery: "",
    processor: "",
    camera: "",
    displaySize: "",
    os: "",
    stock: "",
    discount: {
      percentage: "",
    },
    images: new Array(5).fill(""),
    color: "",
  });

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin !== "true") {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const newImages = [...formData.images];
      newImages[index] = reader.result;
      setFormData((prev) => ({
        ...prev,
        images: newImages,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "percentage") {
      setFormData((prev) => ({
        ...prev,
        discount: {
          ...prev.discount,
          percentage: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.images.some((img) => !img)) {
      toast.error("Please upload all 5 images.");
      return;
    }

    // ✅ Convert color string to array
    const colorArray = formData.color
      .split(",")
      .map((c) => c.trim())
      .filter((c) => c);

    if (colorArray.length === 0) {
      toast.error("Please provide at least one color.");
      return;
    }

    const preparedData = {
      ...formData,
      color: colorArray,
      price: Number(formData.price),
      stock: Number(formData.stock),
      discount: {
        percentage: Number(formData.discount.percentage),
      },
    };

    try {
      const res = await axios.post(
        "http://localhost:3000/api/create-product",
        preparedData
      );
      toast.success(res.data.message);
      setFormData({
        modelName: "",
        brand: "",
        description: "",
        price: "",
        ram: "",
        storage: "",
        battery: "",
        processor: "",
        camera: "",
        displaySize: "",
        os: "",
        stock: "",
        discount: { percentage: "" },
        images: new Array(5).fill(""),
        color: "",
      });
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to add product.");
    }
  };

  return (
    <div className="add-product-container">
      <h1>Add New Mobile</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="modelName"
          placeholder="Model Name"
          value={formData.modelName}
          onChange={handleChange}
          required
        />
        <input
          name="brand"
          placeholder="Brand"
          value={formData.brand}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
        <input
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <input
          name="ram"
          placeholder="RAM"
          value={formData.ram}
          onChange={handleChange}
          required
        />
        <input
          name="storage"
          placeholder="Storage"
          value={formData.storage}
          onChange={handleChange}
          required
        />
        <input
          name="battery"
          placeholder="Battery"
          value={formData.battery}
          onChange={handleChange}
          required
        />
        <input
          name="processor"
          placeholder="Processor"
          value={formData.processor}
          onChange={handleChange}
          required
        />
        <input
          name="camera"
          placeholder="Camera"
          value={formData.camera}
          onChange={handleChange}
          required
        />
        <input
          name="displaySize"
          placeholder="Display Size"
          value={formData.displaySize}
          onChange={handleChange}
          required
        />
        <input
          name="os"
          placeholder="Operating System"
          value={formData.os}
          onChange={handleChange}
          required
        />
        <input
          name="color"
          placeholder="Colors (coma seperated, eg. Black, Blue, Silver)"
          value={formData.color}
          onChange={handleChange}
        />
        <input
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          required
        />
        <input
          name="percentage"
          placeholder="Discount (%)"
          value={formData.discount.percentage}
          onChange={handleChange}
        />

        <div className="image-upload-group">
          <p>Upload 5 Images:</p>
          <p>Nb : Image 1 will be profile image</p>
          {formData.images.map((_, index) => (
            <input
              key={index}
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, index)}
              required
            />
          ))}
        </div>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}
