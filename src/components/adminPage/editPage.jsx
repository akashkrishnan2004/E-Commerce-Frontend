// export default function ProductEdit () {
//     return(
//         <div><h1>Edit</h1></div>
//     )
// }

// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import toast from "react-hot-toast";

// export default function ProductEdit() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState(null);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:3000/api/get-product/${id}`
//         );
//         setFormData(res.data.product);
//       } catch (error) {
//         console.error("Failed to load product", error);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "percentage") {
//       setFormData((prev) => ({
//         ...prev,
//         discount: { ...prev.discount, percentage: value },
//       }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(`http://localhost:3000/api/update-product/${id}`, {
//         ...formData,
//         price: Number(formData.price),
//         stock: Number(formData.stock),
//         discount: {
//           percentage: Number(formData.discount?.percentage || 0),
//         },
//       });
//       toast.success("Product updated successfully");
//       navigate("/admin/dashboard");
//     } catch (error) {
//       console.error("Update failed", error);
//       toast.error("Update failed");
//     }
//   };

//   if (!formData) return <p>Loading...</p>;

//   return (
//     <div style={{ padding: "1rem" }}>
//       <h2>Edit Product</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           name="modelName"
//           value={formData.modelName}
//           onChange={handleChange}
//           placeholder="Model Name"
//           required
//         />
//         <input
//           name="brand"
//           value={formData.brand}
//           onChange={handleChange}
//           placeholder="Brand"
//           required
//         />
//         <textarea
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//           placeholder="Description"
//         />
//         <input
//           name="price"
//           value={formData.price}
//           onChange={handleChange}
//           placeholder="Price"
//           required
//         />
//         <input
//           name="ram"
//           value={formData.ram}
//           onChange={handleChange}
//           placeholder="RAM"
//         />
//         <input
//           name="storage"
//           value={formData.storage}
//           onChange={handleChange}
//           placeholder="Storage"
//         />
//         <input
//           name="battery"
//           value={formData.battery}
//           onChange={handleChange}
//           placeholder="Battery"
//         />
//         <input
//           name="processor"
//           value={formData.processor}
//           onChange={handleChange}
//           placeholder="Processor"
//         />
//         <input
//           name="camera"
//           value={formData.camera}
//           onChange={handleChange}
//           placeholder="Camera"
//         />
//         <input
//           name="displaySize"
//           value={formData.displaySize}
//           onChange={handleChange}
//           placeholder="Display Size"
//         />
//         <input
//           name="os"
//           value={formData.os}
//           onChange={handleChange}
//           placeholder="Operating System"
//         />
//         <input
//           name="stock"
//           value={formData.stock}
//           onChange={handleChange}
//           placeholder="Stock"
//         />
//         <input
//           name="percentage"
//           value={formData.discount?.percentage || ""}
//           onChange={handleChange}
//           placeholder="Discount (%)"
//         />
//         <button type="submit">Update</button>
//       </form>
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import toast from "react-hot-toast";

// import "./adminCss/editPage.css"

// export default function EditProduct() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     modelName: "",
//     brand: "",
//     description: "",
//     price: "",
//     ram: "",
//     storage: "",
//     battery: "",
//     processor: "",
//     camera: "",
//     displaySize: "",
//     os: "",
//     images: [],
//     stock: "",
//     discount: {
//       percentage: "",
//     },
//   });

//   // Check admin
//   useEffect(() => {
//     const isAdmin = localStorage.getItem("isAdmin");
//     if (isAdmin !== "true") {
//       navigate("/admin/login");
//     }
//   }, [navigate]);

//   // Fetch product
//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:3000/api/get-product/${id}`
//         );
//         setFormData(res.data.product);
//       } catch (err) {
//         console.error("Failed to fetch product", err);
//         toast.error("Failed to load product.");
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "percentage") {
//       setFormData((prev) => ({
//         ...prev,
//         discount: {
//           ...prev.discount,
//           percentage: value,
//         },
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };

//   const handleImageUpload = async (e, index) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => {
//       const updatedImages = [...formData.images];
//       updatedImages[index] = reader.result;
//       setFormData((prev) => ({
//         ...prev,
//         images: updatedImages,
//       }));
//     };
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.images.length !== 5 || formData.images.some((img) => !img)) {
//       toast.error("Exactly 5 images must be provided.");
//       return;
//     }

//     const updatedData = {
//       ...formData,
//       price: Number(formData.price),
//       stock: Number(formData.stock),
//       discount: {
//         percentage: Number(formData.discount.percentage),
//       },
//     };

//     try {
//       const res = await axios.put(
//         `http://localhost:3000/api/update-product/${id}`,
//         updatedData
//       );
//       toast.success(res.data.message);
//       navigate("/admin/dashboard");
//     } catch (err) {
//       console.error(err);
//       toast.error("Update failed.");
//     }
//   };

//   return (
//     <div className="edit-container">
//       <h2>Edit Product</h2>
//       <form onSubmit={handleSubmit} className="editForm">
//         <label htmlFor="modelName">Model Name</label>
//         <input
//           name="modelName"
//           placeholder="Model Name"
//           value={formData.modelName}
//           onChange={handleChange}
//           required
//         />
//         <label htmlFor="brand">Brand Name</label>
//         <input
//           name="brand"
//           placeholder="Brand"
//           value={formData.brand}
//           onChange={handleChange}
//           required
//         />
//         <label htmlFor="description">Description</label>
//         <textarea
//           name="description"
//           placeholder="Description"
//           value={formData.description}
//           onChange={handleChange}
//         />
//         <label htmlFor="price">Price</label>
//         <input
//           name="price"
//           placeholder="Price"
//           value={formData.price}
//           onChange={handleChange}
//           required
//         />
//         <label htmlFor="modelName"></label>
//         <input
//           name="ram"
//           placeholder="RAM"
//           value={formData.ram}
//           onChange={handleChange}
//         />
//         <label htmlFor="storage">Storage</label>
//         <input
//           name="storage"
//           placeholder="Storage"
//           value={formData.storage}
//           onChange={handleChange}
//         />
//         <label htmlFor="battery">Battery</label>
//         <input
//           name="battery"
//           placeholder="Battery"
//           value={formData.battery}
//           onChange={handleChange}
//         />
//         <label htmlFor="processor">Processor</label>
//         <input
//           name="processor"
//           placeholder="Processor"
//           value={formData.processor}
//           onChange={handleChange}
//         />
//         <label htmlFor="camera">Camera</label>
//         <input
//           name="camera"
//           placeholder="Camera"
//           value={formData.camera}
//           onChange={handleChange}
//         />
//         <label htmlFor="displaySize">Display Size</label>
//         <input
//           name="displaySize"
//           placeholder="Display Size"
//           value={formData.displaySize}
//           onChange={handleChange}
//         />
//         <label htmlFor="os">OS</label>
//         <input
//           name="os"
//           placeholder="Operating System"
//           value={formData.os}
//           onChange={handleChange}
//         />
//         <label htmlFor="stock">Stock</label>
//         <input
//           name="stock"
//           placeholder="Stock"
//           value={formData.stock}
//           onChange={handleChange}
//         />
//         <label htmlFor="percentage">Offer (in percentage)</label>
//         <input
//           name="percentage"
//           placeholder="Discount (%)"
//           value={formData.discount.percentage}
//           onChange={handleChange}
//         />
//         {/* <label htmlFor="showLabel">Add Label</label>
//         <button name="showLabel" value={formData.showLabel}>Add Label</button> */}

//         <p>Update 5 Images:</p>
//         <p>Nb : Image 1 will be profile image</p>
//         {[0, 1, 2, 3, 4].map((index) => (
//           <div key={index}>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) => handleImageUpload(e, index)}
//             />
//             {formData.images[index] && (
//               <img
//                 src={formData.images[index]}
//                 alt={`Preview ${index}`}
//                 width="100"
//                 style={{ marginTop: "0.5rem" }}
//               />
//             )}
//           </div>
//         ))}

//         <button type="submit" style={{ marginTop: "1rem" }}>
//           Update Product
//         </button>
//       </form>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import "./adminCss/editPage.css";

export default function EditProduct() {
  const { id } = useParams();
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
    color: [], // 🆕 color field added
    images: [],
    stock: "",
    discount: { percentage: "" },
  });

  // ✅ Check admin
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin !== "true") {
      navigate("/admin/login");
    }
  }, [navigate]);

  // ✅ Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/get-product/${id}`
        );
        const product = res.data.product;

        // Ensure color array exists
        setFormData({
          ...product,
          color: product.color || [],
          discount: product.discount || { percentage: "" },
        });
      } catch (err) {
        console.error("Failed to fetch product", err);
        toast.error("Failed to load product.");
      }
    };

    fetchProduct();
  }, [id]);

  // ✅ Handle text/number changes
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

  // ✅ Handle color changes
  const handleColorChange = (index, value) => {
    const updatedColors = [...formData.color];
    updatedColors[index] = value;
    setFormData((prev) => ({
      ...prev,
      color: updatedColors,
    }));
  };

  const addColorField = () => {
    setFormData((prev) => ({
      ...prev,
      color: [...prev.color, ""],
    }));
  };

  const removeColorField = (index) => {
    const updatedColors = [...formData.color];
    updatedColors.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      color: updatedColors,
    }));
  };

  // ✅ Handle image upload
  const handleImageUpload = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const updatedImages = [...formData.images];
      updatedImages[index] = reader.result;
      setFormData((prev) => ({
        ...prev,
        images: updatedImages,
      }));
    };
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.images.length !== 5 || formData.images.some((img) => !img)) {
      toast.error("Exactly 5 images must be provided.");
      return;
    }

    if (
      !formData.color ||
      formData.color.length === 0 ||
      formData.color.some((c) => !c.trim())
    ) {
      toast.error("Please provide at least one color.");
      return;
    }

    const updatedData = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
      discount: {
        percentage: Number(formData.discount.percentage),
      },
    };

    try {
      const res = await axios.put(
        `http://localhost:3000/api/update-product/${id}`,
        updatedData
      );
      toast.success(res.data.message);
      navigate("/admin/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Update failed.");
    }
  };

  return (
    <div className="edit-container">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit} className="editForm">
        <label>Model Name</label>
        <input
          name="modelName"
          value={formData.modelName}
          onChange={handleChange}
          required
        />

        <label>Brand</label>
        <input
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          required
        />

        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <label>Price</label>
        <input
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <label>RAM</label>
        <input
          name="ram"
          value={formData.ram}
          onChange={handleChange}
          required
        />

        <label>Storage</label>
        <input
          name="storage"
          value={formData.storage}
          onChange={handleChange}
          required
        />

        <label>Battery</label>
        <input
          name="battery"
          value={formData.battery}
          onChange={handleChange}
          required
        />

        <label>Processor</label>
        <input
          name="processor"
          value={formData.processor}
          onChange={handleChange}
          required
        />

        <label>Camera</label>
        <input
          name="camera"
          value={formData.camera}
          onChange={handleChange}
          required
        />

        <label>Display Size</label>
        <input
          name="displaySize"
          value={formData.displaySize}
          onChange={handleChange}
          required
        />

        <label>Operating System</label>
        <input name="os" value={formData.os} onChange={handleChange} required />

        <label>Stock</label>
        <input
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          required
        />

        <label>Discount (%)</label>
        <input
          name="percentage"
          value={formData.discount.percentage}
          onChange={handleChange}
        />

        {/* 🆕 Color Section */}
        <label>Available Colors</label>
        {formData.color.map((clr, index) => (
          <div
            key={index}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <input
              type="text"
              placeholder="Enter color (e.g., Black, Blue)"
              value={clr}
              onChange={(e) => handleColorChange(index, e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => removeColorField(index)}
              style={{
                background: "red",
                color: "white",
                border: "none",
                borderRadius: "4px",
                padding: "2px 6px",
              }}
            >
              ×
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addColorField}
          style={{
            marginTop: "0.5rem",
            background: "#007bff",
            color: "white",
            border: "none",
            padding: "5px 10px",
            borderRadius: "5px",
          }}
        >
          + Add Color
        </button>

        <p style={{ marginTop: "1rem" }}>Update 5 Images:</p>
        <p>Note: Image 1 will be the profile image</p>
        {[0, 1, 2, 3, 4].map((index) => (
          <div key={index}>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, index)}
            />
            {formData.images[index] && (
              <img
                src={formData.images[index]}
                alt={`Preview ${index}`}
                width="100"
                style={{ marginTop: "0.5rem" }}
              />
            )}
          </div>
        ))}

        <button type="submit" style={{ marginTop: "1rem" }}>
          Update Product
        </button>
      </form>
    </div>
  );
}
