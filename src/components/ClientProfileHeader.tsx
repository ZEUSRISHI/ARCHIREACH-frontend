import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router-dom";
import {
    BookOpen,
    Camera,
    Briefcase,
    Heart,
    Save,
    X,
    Share2,
} from "lucide-react";
import { toast } from "react-toastify";
import ReferralModal from "./ReferralModal";

// ------------------
// Reusable Components
// ------------------

const IconButton = ({ icon: Icon, className = "", onClick, disabled }: any) => (
    <button
        onClick={onClick}
        disabled={disabled}
        aria-label={Icon?.name || 'Action'}
        title={Icon?.name || 'Action'}
        className={`p-2 rounded-lg transition-all hover:scale-[1.2] bg-white shadow-xl border hover:bg-gray-100 disabled:opacity-40 ${className}`}
    >
        <Icon className="w-4 h-4" />
    </button>
);

const StatItem = ({ value, label }: { value: number; label: string }) => (
    <div className="flex items-center justify-between rounded-2xl px-3 py-3 border border-gray-100 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3 min-w-0">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7A6BEB] to-[#6c5fe0] text-white font-extrabold text-sm shadow-sm">
                {value}
            </span>
            <div className="min-w-0">
                <div className="text-[11px] font-semibold uppercase tracking-widest text-gray-500">{label}</div>
                <div className="text-sm font-semibold text-gray-900 truncate">Overview</div></div></div>
        <div className="h-7 w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent" /></div>
);



// ------------------
// Main Component
// ------------------

export function ClientProfileHeader({
    onPostBrief,
    savedProjectsCount = 3,
    savedArchitectsCount = 0,
    designBriefsCount = 0,
    editRef,
    isEditing: isEditingProp,
    setIsEditing: setIsEditingProp,
}: any) {
    const { user, refreshUser } = useAuth() as {
        user: any;
        refreshUser: () => Promise<void> | void;
    };
    const navigate = useNavigate();

    const [isEditingInternal, setIsEditingInternal] = useState(false);
    const isEditing = isEditingProp !== undefined ? isEditingProp : isEditingInternal;
    const setIsEditing = setIsEditingProp !== undefined ? setIsEditingProp : setIsEditingInternal;

    const [isSaving, setIsSaving] = useState(false);
    const [showReferralModal, setShowReferralModal] = useState(false);

    const defaultAvatar =
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23e5e7eb'/%3E%3Ccircle cx='50' cy='40' r='15' fill='%239ca3af'/%3E%3Cellipse cx='50' cy='95' rx='30' ry='25' fill='%239ca3af'/%3E%3C/svg%3E";

    const [profileImage, setProfileImage] = useState(
        user?.profileImageUrl || defaultAvatar
    );

    const [editData, setEditData] = useState({
        fullName: user?.fullName || "",
        company: user?.company || "",
        role: "CLIENT & PROJECT MANAGER",
        bio:
            user?.bio ||
            "Passionate about architecture and design. Looking for talented architects to bring my vision to life.",
    });

    // Sync with user
    useEffect(() => {
        if (!user) return;
        setProfileImage(user.profileImageUrl || defaultAvatar);
        setEditData({
            fullName: user.fullName || "",
            company: user.company || "",
            role: "CLIENT & PROJECT MANAGER",
            bio: user.bio || editData.bio,
        });
    }, [user]);

    useEffect(() => {
        if (editRef)
            editRef.current = {
                triggerEdit: () => setIsEditing(true),
                triggerSave: handleSave,
                triggerCancel: handleCancel,
            };
    }, [editRef, editData, profileImage]); // Include dependencies so handleSave uses latest state

    // ------------------
    // Handlers
    // ------------------

    const handleImageChange = (e: any) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            toast.error('Please select an image file');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast.error('Image size should be less than 5MB');
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            setProfileImage(reader.result as string);
            toast.success('Image uploaded successfully');
        };
        reader.onerror = () => {
            toast.error('Failed to read image file');
        };
        reader.readAsDataURL(file);
    };

    const handleSave = async () => {
        try {
            setIsSaving(true);

            const userUID = localStorage.getItem("userUID");
            const token = localStorage.getItem("token");

            if (!userUID || !token) {
                toast.error("Please login to update profile");
                return;
            }

            const response = await axiosClient.put(`/users/${user?._id}`, {
                ...editData,
                profileImageUrl: profileImage,
            });

            if (response.data.success) {
                toast.success("Profile updated!");
                await refreshUser();
                setIsEditing(false);
            } else {
                toast.error(response.data.message || "Update failed");
            }
        } catch (e) {
            toast.error("Error updating profile");
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        if (!user) return;

        setProfileImage(user.profileImageUrl || defaultAvatar);
        setEditData({
            fullName: user.fullName || "",
            company: user.company || "",
            role: "CLIENT & PROJECT MANAGER",
            bio: user.bio || "",
        });
    };

    // Navigation
    const handleSavedProjectsClick = () =>
        navigate("/pages/ExploreDrop/FindProjects");

    // ------------------
    // UI
    // ------------------

    return (
        <div className="bg-transparent rounded-xl mb-6">
            {/* HEADER */}
            <div className="flex items-center justify-between px-3 py-2">
                <h2 className="text-xl font-semibold text-[#7A6BEB] tracking-tight flex items-center gap-3">
                    Client Profile & Dashboard
                </h2>


                {isEditing && (
                    <div className="flex gap-2">
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="px-3 py-1.5 bg-green-600 text-white rounded-lg flex items-center gap-1 shadow hover:bg-green-700 transition disabled:opacity-50"
                        >
                            <Save className="w-4 h-4" />
                            {isSaving ? "Saving..." : "Save"}
                        </button>

                        <button
                            onClick={handleCancel}
                            className="px-3 py-1.5 bg-gray-500 text-white rounded-lg flex items-center gap-1 shadow hover:bg-gray-600 transition"
                        >
                            <X className="w-4 h-4" />
                            Cancel
                        </button></div>
                )}</div>

            {/* MAIN */}
            <div className="flex flex-col lg:flex-row gap-6 p-4">
                {/* LEFT COLUMN */}
                <div className="lg:w-3/5 flex flex-col items-center lg:items-start text-center lg:text-left">

                    {/* Profile Image */}
                    <div className="relative">
                        <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-[#cfc9ff] shadow-lg group relative">
                            {isEditing && (
                                <input
                                    ref={(input) => {
                                        if (input && !input.hasAttribute('data-initialized')) {
                                            input.setAttribute('data-initialized', 'true');
                                            input.addEventListener('click', (e) => {
                                                e.stopPropagation();
                                            });
                                        }
                                    }}
                                    type="file"
                                    accept="image/*"
                                    aria-label="Upload profile image"
                                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                    style={{ cursor: 'pointer' }}
                                    onChange={handleImageChange}
                                />
                            )}

                            <img
                                src={profileImage || defaultAvatar}
                                className="w-full h-full object-cover"
                                alt="profile"
                            />

                            {isEditing && (
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white pointer-events-none">
                                    <Camera className="w-6 h-6" /></div>
                            )}</div></div>

                    {/* Name */}
                    {isEditing ? (
                        <input
                            value={editData.fullName}
                            onChange={(e) =>
                                setEditData({ ...editData, fullName: e.target.value })
                            }
                            aria-label="Full name"
                            placeholder="Full name"
                            className="mt-3 text-xl font-bold text-center lg:text-left w-full border-b p-1 focus:outline-none"
                        />
                    ) : (
                        <h1 className="mt-3 text-2xl font-bold text-gray-900">
                            {editData.fullName || "Client Name"}
                        </h1>
                    )}

                    {/* Role */}
                    {isEditing ? (
                        <input
                            value={editData.role}
                            onChange={(e) =>
                                setEditData({ ...editData, role: e.target.value })
                            }
                            aria-label="Role"
                            placeholder="Role"
                            className="text-[#7A6BEB] uppercase text-xs tracking-widest border-b p-1 w-full"
                        />
                    ) : (
                        <p className="text-[#7A6BEB] uppercase text-xs tracking-widest mt-1">
                            {editData.role}
                        </p>
                    )}

                    {/* Bio */}
                    {isEditing ? (
                        <textarea
                            value={editData.bio}
                            onChange={(e) =>
                                setEditData({ ...editData, bio: e.target.value })
                            }
                            aria-label="Bio"
                            placeholder="Bio"
                            rows={3}
                            className="mt-3 w-full border rounded-lg p-2 text-sm"
                        />
                    ) : (
                        <p className="mt-3 text-sm text-gray-700 max-w-md">{editData.bio}</p>
                    )}

                    {/* Saved Projects Btn */}
                    <button
                        onClick={handleSavedProjectsClick}
                        disabled={isEditing}
                        className="mt-4 w-full max-w-xs px-4 py-2 bg-[#7A6BEB] text-white rounded-lg shadow hover:bg-[#6c5fe0] transition"
                    >
                        <Briefcase className="inline-block w-4 h-4 mr-2" />
                        Saved Projects ({savedProjectsCount})
                    </button>

                    {/* Referral Button */}
                    <button
                        onClick={() => setShowReferralModal(true)}
                        className="mt-2 w-full max-w-xs px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition flex items-center justify-center gap-2"
                    >
                        <Share2 className="w-4 h-4" />
                        Refer a Friend
                    </button>

                    {/* Icon Row */}
                    <div className="flex gap-2 mt-4">
                        <IconButton icon={BookOpen} className="text-blue-600" />
                        <IconButton icon={Camera} className="text-gray-600" />
                        <IconButton icon={Briefcase} className="text-amber-600" />
                        <IconButton icon={Heart} className="text-pink-600" /></div></div>

                {/* RIGHT COLUMN - STATS */}
                <div className="lg:w-1/3 mt-4">
                    <div className="rounded-3xl border border-gray-100 bg-gradient-to-b from-white to-[#ECEBFB]/40 shadow-lg p-3">
                        <div className="px-1 pb-2">
                            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">Summary</div></div>

                        <div className="grid grid-cols-1 gap-3">
                            <div className="w-full">
                                <StatItem value={savedProjectsCount} label="Saved Projects" /></div>

                            <div className="w-full">
                                <StatItem value={savedArchitectsCount} label="Saved Architects" /></div>

                            <div className="w-full">
                                <StatItem value={designBriefsCount} label="Design Briefs" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Referral Modal */}
            <ReferralModal
                isOpen={showReferralModal}
                onClose={() => setShowReferralModal(false)}
            />
        </div>
    );
}

