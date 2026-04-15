import { useState } from "react";
import { X, ChevronDown, ChevronUp, MapPin, DollarSign, Layout, Files, Send } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import axiosClient from "../api/axiosClient";
import { toast } from "react-toastify";

const PROJECT_TYPES = [
    "Residential", "Commercial", "Institutional", "Industrial", "Mixed-Use", "Other"
];

const BUDGET_RANGES = [
    "Under 5 Lakhs",
    "5 Lakhs - 10 Lakhs",
    "10 Lakhs - 25 Lakhs",
    "25 Lakhs - 50 Lakhs",
    "50 Lakhs - 1 Crore",
    "Above 1 Crore"
];

export function PostBriefForm({ onBack }) {
    const { user } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        projectType: "Residential",
        description: "",
        location: {
            city: "",
            state: "",
            address: "",
            pincode: ""
        },
        budget: {
            min: 0,
            max: 0
        },
        requirements: [],
        timeline: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleBudgetChange = (min, max) => {
        setFormData(prev => ({
            ...prev,
            budget: { min, max }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await axiosClient.post("/project-briefs", formData);

            if (response.data.success) {
                toast.success("Project brief posted successfully!");
                onBack(); // Close the modal
            } else {
                toast.error(response.data.message || "Failed to post brief");
            }
        } catch (error) {
            console.error("Error posting brief:", error);
            toast.error(error.response?.data?.message || "Error posting project brief");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full">
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Project Overview Section */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-[#7a6beb]/10 rounded-lg">
                            <Layout className="w-5 h-5 text-[#7a6beb]" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Project Overview</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Project Title</label>
                            <input
                                required
                                name="title"
                                type="text"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g., Modern 3BHK Apartment Interior"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#7a6beb] focus:border-transparent outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Project Type</label>
                            <div className="relative">
                                <select
                                    name="projectType"
                                    value={formData.projectType}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#7a6beb] focus:border-transparent outline-none transition-all appearance-none"
                                >
                                    {PROJECT_TYPES.map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Timeline</label>
                            <input
                                name="timeline"
                                type="text"
                                value={formData.timeline}
                                onChange={handleChange}
                                placeholder="e.g., 6 months"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#7a6beb] focus:border-transparent outline-none transition-all"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description & Vision</label>
                            <textarea
                                required
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={4}
                                placeholder="Describe your project, architectural style preferences, and any specific requirements..."
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#7a6beb] focus:border-transparent outline-none transition-all resize-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Location Section */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-blue-50 rounded-lg">
                            <MapPin className="w-5 h-5 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Project Location</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Address</label>
                            <input
                                name="location.address"
                                type="text"
                                value={formData.location.address}
                                onChange={handleChange}
                                placeholder="Street address or Area"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#7a6beb] focus:border-transparent outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">City</label>
                            <input
                                required
                                name="location.city"
                                type="text"
                                value={formData.location.city}
                                onChange={handleChange}
                                placeholder="e.g., Mumbai"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#7a6beb] focus:border-transparent outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">State</label>
                            <input
                                required
                                name="location.state"
                                type="text"
                                value={formData.location.state}
                                onChange={handleChange}
                                placeholder="e.g., Maharashtra"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#7a6beb] focus:border-transparent outline-none transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* Budget Section */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-green-50 rounded-lg">
                            <DollarSign className="w-5 h-5 text-green-600" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Budget Range</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Min Budget (₹)</label>
                            <input
                                name="budget.min"
                                type="number"
                                value={formData.budget.min}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#7a6beb] focus:border-transparent outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Max Budget (₹)</label>
                            <input
                                name="budget.max"
                                type="number"
                                value={formData.budget.max}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#7a6beb] focus:border-transparent outline-none transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-4 pt-4">
                    <button
                        type="button"
                        onClick={onBack}
                        className="px-6 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-8 py-3 bg-[#7a6beb] text-white rounded-xl font-bold hover:bg-[#6c5fe0] shadow-lg shadow-[#7a6beb]/20 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Posting...
                            </>
                        ) : (
                            <>
                                <Send className="w-4 h-4" />
                                Post Project Brief
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
