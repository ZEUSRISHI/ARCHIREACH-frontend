import { useState } from "react";
import { X } from "lucide-react";

export default function FEditSidebar({ isOpen, onClose }) {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-[500px] bg-white shadow-2xl transform transition-transform duration-300 z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <h2 className="text-lg font-semibold text-gray-800">Add More Details</h2>
        <X
          className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800"
          onClick={onClose}
        />
      </div>

      {/* Form */}
      <div className="overflow-y-auto h-[calc(100%-4rem)] px-6 py-4 space-y-6">
        {[
          { label: "📄 About", type: "textarea", name: "about" },
          { label: "💼 Experience", type: "input", name: "experience" },
          { label: "⚡ Skills", type: "input", name: "skills" },
          { label: "🎯 Interests", type: "input", name: "interests" },
          { label: "🏅 Certifications", type: "input", name: "certifications" },
          { label: "📂 Projects", type: "input", name: "projects" },
        ].map((field, idx) => (
          <div key={idx}>
            <label className="flex items-center text-lg font-medium text-gray-700 mb-2">
              <span className="mr-2">{field.label}</span>
            </label>
            {field.type === "textarea" ? (
              <textarea
                name={field.name}
                placeholder={`Enter ${field.name}`}
                className="w-full h-24 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            ) : (
              <input
                type="text"
                name={field.name}
                placeholder={`Enter ${field.name}`}
                className="w-full h-14 px-4 border rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            )}
          </div>
        ))}

        <button className="w-full bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700">
          Update Profile
        </button>
      </div>
    </div>
  );
}
