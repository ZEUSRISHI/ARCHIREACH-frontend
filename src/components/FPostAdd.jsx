import { useState } from "react";
import { X, ChevronDown, ChevronUp, Upload, Image as ImageIcon } from "lucide-react";

const API_BASE = "https://archireach.onrender.com/api/fjobs";

const PROJECT_TYPES = [
  "Residential - Single Family", "Residential - Apartments", "Residential - Villas",
  "Residential - Group Housing", "Residential - Luxury Homes", "Residential - Affordable Housing",
  "Commercial - Offices", "Commercial - Retail", "Commercial - Shopping Malls",
  "Commercial - Co-working", "Commercial - Banks",
  "Hospitality - Hotels", "Hospitality - Resorts", "Hospitality - Serviced Apartments",
  "Institutional - Schools", "Institutional - Colleges", "Institutional - Libraries",
  "Healthcare - Hospitals", "Healthcare - Clinics", "Healthcare - Wellness Centers",
  "Industrial - Factories", "Industrial - Warehouses", "Industrial - Logistics",
  "Civic - Government Buildings", "Civic - Community Centers",
  "Religious - Temples", "Religious - Churches", "Religious - Mosques",
  "Urban Design - Master Planning", "Urban Design - Public Spaces",
  "Landscape - Parks", "Landscape - Gardens", "Landscape - Recreational",
  "Interiors - Residential", "Interiors - Commercial", "Interiors - Hospitality",
  "Restoration - Heritage", "Restoration - Adaptive Reuse"
];

const DESIGN_STYLES = [
  "Modern/Contemporary", "Traditional/Classic", "Minimalist", "Sustainable/Natural",
  "Brutalist", "Art Deco", "Postmodern", "Industrial", "Regional/Indigenous",
  "Scandinavian", "Neo-Futuristic", "Colonial", "Vernacular", "Eclectic"
];

const SPECIALIZATIONS = [
  "Sustainable/Green Architecture", "LEED/IGBC Certified", "Smart/Hi-Tech Design",
  "Heritage Conservation", "Healthcare Design", "Educational Design",
  "Urban Planning", "Landscape Design", "Industrial Process Design",
  "Affordable Housing", "Luxury/Lifestyle", "Interior Design",
  "Project Management", "BIM Expertise", "Turnkey Solutions",
  "Net-Zero Buildings", "Adaptive Reuse", "Modular Design"
];

const FIRM_SIZES = ["Solo Architect", "Small (2-10)", "Medium (11-50)", "Large (50+)"];
const AVAILABILITY = ["Open for Projects", "Consultation Only", "By Referral", "Waitlist"];

function MultiSelectDropdown({ label, options, selected, onChange, placeholder, required }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOption = (option) => {
    if (selected.includes(option)) {
      onChange(selected.filter(item => item !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <div className="relative">
      <label className="block mb-2 text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-3 border border-gray-300 rounded-xl bg-white/90 text-left flex items-center justify-between hover:border-indigo-400 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      >
        <span className={`text-sm ${selected.length > 0 ? 'text-gray-900' : 'text-gray-500'} truncate`}>
          {selected.length > 0 ? `${selected.length} selected` : placeholder}
        </span>
        {isOpen ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
      </button>

      {isOpen && (
        <div className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl max-h-64 overflow-y-auto">
          {options.map((option, idx) => (
            <label
              key={idx}
              className="flex items-center px-4 py-3 hover:bg-indigo-50 cursor-pointer transition border-b border-gray-100 last:border-b-0"
            >
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => toggleOption(option)}
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <span className="ml-3 text-sm text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      )}

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {selected.map((item, idx) => (
            <span
              key={idx}
              className="inline-flex items-center px-3 py-1.5 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full"
            >
              {item}
              <button
                type="button"
                onClick={() => toggleOption(item)}
                className="ml-1.5 hover:text-indigo-900 focus:outline-none"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function FPostAdd({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    firmName: "",
    location: "",
    pinCode: "",
    projectTypes: [],
    projectArea: "",
    budgetMin: "",
    budgetMax: "",
    firmSize: "",
    yearsExperience: "",
    specializations: [],
    designStyles: [],
    availability: "",
    rating: "",
    reviews: 0,
    projects: 0,
    description: "",
    recentProjects: "",
    avatar: "",
    color: "bg-indigo-500",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should not exceed 5MB");
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert("Please upload an image file");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        // Store as base64 string (already includes data:image/...;base64, prefix)
        setFormData({ ...formData, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // ✅ Get userUID from localStorage
    const userUID = localStorage.getItem("userUID");

    if (!userUID) {
      alert("Please login to post a job");
      setIsSubmitting(false);
      return;
    }

    const payload = {
      userUID: userUID, // ✅ Add userUID to body
      ...formData,
      rating: Number(formData.rating) || 0,
      reviews: Number(formData.reviews) || 0,
      projects: Number(formData.projects) || 0,
      yearsExperience: Number(formData.yearsExperience) || 0,
      budgetMin: Number(formData.budgetMin) || 0,
      budgetMax: Number(formData.budgetMax) || 0,
      recentProjects: formData.recentProjects
        ? formData.recentProjects.split(",").map((p) => p.trim())
        : [],
      avatar: formData.avatar, // Base64 string stored as-is
    };

    try {
      const response = await fetch(API_BASE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-uid": userUID // ✅ Send userUID in header
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        onSave();
        onClose();
        resetForm();
      } else {
        const errorData = await response.json();
        alert(`Failed to post: ${errorData.message || 'Unknown error'}`);
      }
    } catch (err) {
      console.error("Error posting job:", err);
      alert("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };


  const resetForm = () => {
    setFormData({
      name: "",
      firmName: "",
      location: "",
      pinCode: "",
      projectTypes: [],
      projectArea: "",
      budgetMin: "",
      budgetMax: "",
      firmSize: "",
      yearsExperience: "",
      specializations: [],
      designStyles: [],
      availability: "",
      rating: "",
      reviews: 0,
      projects: 0,
      description: "",
      recentProjects: "",
      avatar: "",
      color: "bg-indigo-500",
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4 overflow-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-8 max-h-[95vh] flex flex-col border border-white/60 overflow-hidden">
        {/* Header */}
        <div className="bg-white text-gray-900 px-8 py-6 flex justify-between items-center flex-shrink-0 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold tracking-tight" style={{ fontFamily: 'FS Dillon, sans-serif' }}>Post Architecture Firm</h2>
            <p className="text-gray-600 text-sm mt-2">Add your firm details to connect with potential clients</p>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-gray-100 rounded-full p-3 transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Form - Scrollable */}
        <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 px-8 md:px-10 py-8 bg-gray-50">
          <div className="space-y-10">
            {/* Basic Information Section */}
            <section>
              <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-200">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-3 text-sm font-semibold text-gray-700">
                      Architect Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-4 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block mb-3 text-sm font-semibold text-gray-700">
                      Firm Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="firmName"
                      required
                      value={formData.firmName}
                      onChange={handleChange}
                      className="w-full p-4 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Design Studio Architects"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Location Section */}
            <section>
              <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-200">Location Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-3 text-sm font-semibold text-gray-700">
                      Location <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="location"
                      required
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full p-4 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Mumbai, Maharashtra"
                    />
                  </div>
                  <div>
                    <label className="block mb-3 text-sm font-semibold text-gray-700">PIN Code</label>
                    <input
                      name="pinCode"
                      value={formData.pinCode}
                      onChange={handleChange}
                      className="w-full p-4 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="400001"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Project Details Section */}
            <section>
              <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-200">Project Details</h3>
                <div className="space-y-6">
                  <MultiSelectDropdown
                    label="Project Types"
                    options={PROJECT_TYPES}
                    selected={formData.projectTypes}
                    onChange={(val) => setFormData({ ...formData, projectTypes: val })}
                    placeholder="Select project types you specialize in"
                    required
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block mb-3 text-sm font-semibold text-gray-700">Project Area</label>
                      <input
                        name="projectArea"
                        value={formData.projectArea}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                        placeholder="1200 sq.ft"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Min Budget (₹)</label>
                      <input
                        name="budgetMin"
                        type="number"
                        value={formData.budgetMin}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                        placeholder="500000"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Max Budget (₹)</label>
                      <input
                        name="budgetMax"
                        type="number"
                        value={formData.budgetMax}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                        placeholder="5000000"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Firm Details Section */}
            <section>
              <div className="rounded-2xl border border-gray-200/80 bg-white/80 backdrop-blur-sm p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Firm Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Firm Size</label>
                    <select
                      name="firmSize"
                      value={formData.firmSize}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-white"
                    >
                      <option value="">Select firm size</option>
                      {FIRM_SIZES.map((size, idx) => (
                        <option key={idx} value={size}>{size}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Years of Experience <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="yearsExperience"
                      type="number"
                      required
                      value={formData.yearsExperience}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      placeholder="15"
                    />
                  </div>
                </div>

                <div className="mt-5 space-y-5">
                  <MultiSelectDropdown
                    label="Specializations/Expertise"
                    options={SPECIALIZATIONS}
                    selected={formData.specializations}
                    onChange={(val) => setFormData({ ...formData, specializations: val })}
                    placeholder="Select your areas of expertise"
                  />

                  <MultiSelectDropdown
                    label="Design Styles"
                    options={DESIGN_STYLES}
                    selected={formData.designStyles}
                    onChange={(val) => setFormData({ ...formData, designStyles: val })}
                    placeholder="Select design styles you work with"
                  />

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Availability</label>
                    <select
                      name="availability"
                      value={formData.availability}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-white"
                    >
                      <option value="">Select availability status</option>
                      {AVAILABILITY.map((avail, idx) => (
                        <option key={idx} value={avail}>{avail}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </section>

            {/* Performance Metrics Section */}
            <section>
              <div className="rounded-2xl border border-gray-200/80 bg-white/80 backdrop-blur-sm p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Performance Metrics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Rating</label>
                    <input
                      name="rating"
                      type="number"
                      step="0.1"
                      min="0"
                      max="5"
                      value={formData.rating}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      placeholder="4.5"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Reviews Count</label>
                    <input
                      name="reviews"
                      type="number"
                      value={formData.reviews}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      placeholder="150"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Projects Completed</label>
                    <input
                      name="projects"
                      type="number"
                      value={formData.projects}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      placeholder="85"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Additional Information Section */}
            <section>
              <div className="rounded-2xl border border-gray-200/80 bg-white/80 backdrop-blur-sm p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Additional Information</h3>
                <div className="space-y-5">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="description"
                      rows="4"
                      required
                      value={formData.description}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
                      placeholder="Describe your firm's approach, philosophy, and what makes you unique..."
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Recent Projects</label>
                    <input
                      name="recentProjects"
                      value={formData.recentProjects}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      placeholder="Luxury Villa in Goa, Corporate Office in Delhi, Resort in Kerala"
                    />
                    <p className="text-xs text-gray-500 mt-2">Separate multiple projects with commas</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Profile Image Section */}
            <section>
              <div className="rounded-2xl border border-gray-200/80 bg-white/80 backdrop-blur-sm p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Profile Image</h3>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Upload Profile Image</label>
                  <div className="flex items-start gap-6">
                    <div className="flex-1">
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                          id="avatar-upload"
                        />
                        <label
                          htmlFor="avatar-upload"
                          className="flex items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition"
                        >
                          <div className="text-center">
                            <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600 font-medium">Click to upload image</p>
                            <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                          </div>
                        </label>
                      </div>
                    </div>

                    {formData.avatar && (
                      <div className="flex-shrink-0">
                        <div className="relative">
                          <img
                            src={formData.avatar}
                            alt="Preview"
                            className="w-32 h-32 object-cover rounded-xl border-4 border-indigo-100 shadow-md"
                          />
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, avatar: "" })}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition shadow-lg"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-2 text-center">Image preview</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* Theme Section */}
            <section>
              <div className="rounded-2xl border border-gray-200/80 bg-white/80 backdrop-blur-sm p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Theme Settings</h3>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Color Theme</label>
                  <input
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    placeholder="bg-indigo-500"
                  />
                  <p className="text-xs text-gray-500 mt-2">Enter a Tailwind CSS background color class</p>
                </div>
              </div>
            </section>
          </div>
        </form>

        {/* Footer - Fixed */}
        <div className="px-6 md:px-8 py-4 bg-white border-t border-gray-200 flex-shrink-0">
          <div className="flex flex-col sm:flex-row justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-6 py-3 rounded-xl bg-white border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Posting...
                </>
              ) : (
                'Post Project'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}