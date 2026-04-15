import { useState, useEffect } from "react";

const API_BASE = "https://archireach.onrender.com/api/fjobs";

export default function FUpdateSidebar({ isOpen, onClose, job, onSave }) {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    location: "",
    salary: "",
    description: "",
    company: "",
  });

  useEffect(() => {
    if (job) setFormData(job);
  }, [job]);

  if (!isOpen || !job) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const userUID = localStorage.getItem("userUID");
      
      if (!userUID) {
        alert("Please login to update a job");
        return;
      }

      await fetch(`${API_BASE}/${job._id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "x-user-uid": userUID // ✅ Send userUID in header
        },
        body: JSON.stringify(formData),
      });
      onSave();
      onClose();
    } catch (error) {
      console.error("Error updating job:", error);
      alert("Failed to update job. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
          Update Job
        </h2>
        <form onSubmit={handleUpdate} className="space-y-3">
          {["title", "category", "location", "salary", "company"].map((field) => (
            <input
              key={field}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData[field] || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-400 outline-none"
            />
          ))}

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-400 outline-none"
            rows="4"
          />

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
