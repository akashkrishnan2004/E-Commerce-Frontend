import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import "./adminCss/adminAnnouncement.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function AdminAnnouncement() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    message: "",
    image: "",
    redirectLink: "",
  });

  /* ================= FETCH ================= */
  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/api/get-all-announcements`);
      setAnnouncements(res.data?.announcements || []);
    } catch (error) {
      toast.error("Failed to fetch announcements");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  /* ================= HANDLE INPUT ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ================= HANDLE IMAGE ================= */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      return toast.error("Image must be under 2MB");
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        image: reader.result,
      }));
    };
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image) {
      return toast.error("Image is required");
    }

    try {
      setSubmitting(true);

      if (editingId) {
        await axios.put(
          `${API_URL}/api/update-announcement/${editingId}`,
          formData
        );
        toast.success("Announcement Updated Successfully");
      } else {
        await axios.post(
          `${API_URL}/api/create-announcement`,
          formData
        );
        toast.success("Announcement Added Successfully");
      }

      resetForm();
      fetchAnnouncements();
    } catch (error) {
      toast.error("Operation failed");
    } finally {
      setSubmitting(false);
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = (item) => {
    setEditingId(item._id);
    setFormData({
      title: item.title || "",
      message: item.message || "",
      image: item.image || "",
      redirectLink: item.redirectLink || "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ================= RESET ================= */
  const resetForm = () => {
    setEditingId(null);
    setFormData({
      title: "",
      message: "",
      image: "",
      redirectLink: "",
    });
  };

  /* ================= TOGGLE ACTIVE ================= */
  const toggleActive = async (id, currentStatus) => {
    try {
      await axios.put(`${API_URL}/api/update-announcement/${id}`, {
        isActive: !currentStatus,
      });

      toast.success("Status updated");
      fetchAnnouncements();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  /* ================= DELETE ================= */
  const deleteAnnouncement = async (id) => {
    if (!window.confirm("Are you sure you want to delete this banner?"))
      return;

    try {
      await axios.delete(`${API_URL}/api/delete-announcement/${id}`);
      toast.success("Deleted successfully");
      fetchAnnouncements();
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">
        {editingId ? "Edit Announcement" : "Manage Announcement Banners"}
      </h2>

      {/* ================= FORM ================= */}
      <form onSubmit={handleSubmit} className="form-card">
        <input
          type="text"
          name="title"
          placeholder="Banner Title (optional)"
          value={formData.title}
          onChange={handleChange}
        />

        <input
          type="text"
          name="message"
          placeholder="Banner Message (optional)"
          value={formData.message}
          onChange={handleChange}
        />

        <input
          type="text"
          name="redirectLink"
          placeholder="Redirect Link (optional)"
          value={formData.redirectLink}
          onChange={handleChange}
        />

        <input type="file" accept="image/*" onChange={handleImageChange} />

        {formData.image && (
          <img
            src={formData.image}
            alt="Preview"
            className="preview-image"
          />
        )}

        <button type="submit" disabled={submitting} className="add-btn">
          {submitting
            ? "Processing..."
            : editingId
            ? "Update Banner"
            : "Add Banner"}
        </button>

        {editingId && (
          <button type="button" onClick={resetForm} className="cancel-btn">
            Cancel
          </button>
        )}
      </form>

      {/* ================= LIST ================= */}
      {loading ? (
        <p>Loading...</p>
      ) : announcements.length === 0 ? (
        <p>No announcements found.</p>
      ) : (
        announcements.map((item) => (
          <div key={item._id} className="banner-card">
            <div className="banner-content">
              <img
                src={item.image}
                alt="Banner"
                className="banner-image"
              />

              <div>
                {item.title && <h4>{item.title}</h4>}
                {item.message && <p>{item.message}</p>}
                {item.redirectLink && (
                  <small>Redirect: {item.redirectLink}</small>
                )}

                <p>
                  Status:{" "}
                  <strong>
                    {item.isActive ? "Active" : "Inactive"}
                  </strong>
                </p>
              </div>
            </div>

            <div className="banner-actions">
              <button
                onClick={() => handleEdit(item)}
                className="action-btn-edit-btn"
              >
                Edit
              </button>

              <button
                onClick={() =>
                  toggleActive(item._id, item.isActive)
                }
                className={`action-btn ${
                  item.isActive
                    ? "deactivate-btn"
                    : "activate-btn"
                }`}
              >
                {item.isActive ? "Deactivate" : "Activate"}
              </button>

              <button
                onClick={() => deleteAnnouncement(item._id)}
                className="action-btn delete-btn"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}