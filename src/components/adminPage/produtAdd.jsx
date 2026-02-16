import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL

import "./adminCss/produtAdd.css";

export default function ProductAdd() {
  const navigate = useNavigate();

  const initialState = {
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
    images: Array(5).fill(""),
  };

  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  // 🔐 Admin protection
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin !== "true") {
      navigate("/admin/login");
    }
  }, [navigate]);

  // 📷 Handle image upload
  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => {
        const updatedImages = [...prev.images];
        updatedImages[index] = reader.result;
        return { ...prev, images: updatedImages };
      });
    };

    reader.readAsDataURL(file);
  };

  // 📝 Handle input change
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

  // 🚀 Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔎 Validate images properly
    const validImages = formData.images.filter(
      (img) => img && img.trim() !== "",
    );

    if (validImages.length !== 5) {
      toast.error("Please upload exactly 5 images.");
      return;
    }

    const preparedData = {
      ...formData,
      images: validImages, // important
      price: Number(formData.price),
      stock: Number(formData.stock),
      discount: {
        percentage: Number(formData.discount.percentage) || 0,
      },
    };

    try {
      setLoading(true);

      const res = await axios.post(
        `${API_URL}/api/create-product`,
        preparedData,
      );

      toast.success(res.data.message);

      setFormData(initialState);
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Full Error:", error);
      console.log("Backend Error:", error.response?.data);

      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Server error. Try again.");
      }
    } finally {
      setLoading(false);
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
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          min="0"
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
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          min="0"
          required
        />

        <input
          type="number"
          name="percentage"
          placeholder="Discount (%)"
          value={formData.discount.percentage}
          onChange={handleChange}
          min="0"
          max="100"
        />

        <div className="image-upload-group">
          <p>Upload 5 Images:</p>
          <p>NB: Image 1 will be profile image</p>

          {formData.images.map((_, index) => (
            <input
              key={index}
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, index)}
            />
          ))}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}
