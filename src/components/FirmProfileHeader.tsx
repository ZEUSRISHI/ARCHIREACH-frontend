import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { BookOpen, Camera, Briefcase, Heart, Edit, Save, X, Share2 } from "lucide-react";
import { toast } from "react-toastify";
import ReferralModal from "./ReferralModal";

interface FirmProfileHeaderProps {
  onPostJob?: () => void;
  totalProjects?: number;
  visibleProjects?: number;
  verificationStatus?: string;
  editRef?: React.MutableRefObject<any>;
  isEditing?: boolean;
  setIsEditing?: React.Dispatch<React.SetStateAction<boolean>>;
  firmData?: any;
}

export function FirmProfileHeader({
  onPostJob,
  totalProjects = 0,
  visibleProjects = 0,
  verificationStatus = "Not Verified",
  editRef,
  isEditing: controlledIsEditing,
  setIsEditing: controlledSetIsEditing,
  firmData,
}: FirmProfileHeaderProps) {
  const { user: authUser, refreshUser } = useAuth() as any;
  const user = firmData || authUser;
  const navigate = useNavigate();
  const [internalEditing, setInternalEditing] = useState(false);
  // controlled vs uncontrolled editing state
  const isEditing = controlledIsEditing ?? internalEditing;
  const setIsEditing = controlledSetIsEditing ?? setInternalEditing;

  const [isSaving, setIsSaving] = useState(false);
  const [showReferralModal, setShowReferralModal] = useState(false);
  const [profileImage, setProfileImage] = useState(
    user?.profileImageUrl || ""
  );

  const [coverImage, setCoverImage] = useState(
    user?.coverImageUrl || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop"
  );

  const [editData, setEditData] = useState({
    fullName: user?.fullName || "",
    company: user?.company || "",
    role: "PRINCIPAL ARCHITECT & STUDIO DIRECTOR",
    bio: user?.bio || "Expert in sustainable urban design and innovative residential projects with over 15 years of experience creating spaces that harmonize with their environment while pushing the boundaries of modern architecture."
  });

  useEffect(() => {
    if (user) {
      setProfileImage(user.profileImageUrl || "");
      setCoverImage(user.coverImageUrl || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop");

      setEditData({
        fullName: user.fullName || "",
        company: user.company || "",
        role: "PRINCIPAL ARCHITECT & STUDIO DIRECTOR",
        bio: user.bio || "Expert in sustainable urban design and innovative residential projects with over 15 years of experience creating spaces that harmonize with their environment while pushing the boundaries of modern architecture."
      });
    }
  }, [user]);

  // Expose edit trigger function via ref
  useEffect(() => {
    if (editRef) {
      editRef.current = {
        triggerEdit: () => setIsEditing(true),
        toggleEdit: () => setIsEditing((s: boolean) => !s),
        cancelEdit: handleCancel,
        triggerCancel: handleCancel,
        save: handleSave,
        triggerSave: handleSave
      };
    }
  }, [editRef, setIsEditing, editData, profileImage, coverImage]);

  const handleImageChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setProfileImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setCoverImage(result);
      };
      reader.readAsDataURL(file);
    }
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

      let imageToSave = profileImage;
      if (profileImage && profileImage.startsWith("data:image")) {
        imageToSave = profileImage;
      }

      const updateData = {
        fullName: editData.fullName,
        company: editData.company,
        bio: editData.bio,
        profileImageUrl: imageToSave
        ,
        coverImageUrl: coverImage
      };

      const response = await axiosClient.put(`/users/${user?._id}`, updateData);

      if (response.data.success) {
        toast.success("Profile updated successfully!");
        setIsEditing(false);
        if (refreshUser) {
          await refreshUser();
        }
      } else {
        toast.error(response.data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (user) {
      setProfileImage(user.profileImageUrl || "");
      setCoverImage(user.coverImageUrl || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop");

      setEditData({
        fullName: user.fullName || "",
        company: user.company || "",
        role: "PRINCIPAL ARCHITECT & STUDIO DIRECTOR",
        bio: user.bio || "Expert in sustainable urban design and innovative residential projects with over 15 years of experience creating spaces that harmonize with their environment while pushing the boundaries of modern architecture."
      });
    }
  };

  const handlePortfolioClick = (e: any) => {
    e.preventDefault();
    navigate("/pages/blog/FirmDash");
  };

  // Simplified profile component for use in projects section
  return (
    <div className="bg-transparent rounded-xl overflow-hidden">
      {/* Main Content - Two Column Layout */}
      <div className="flex flex-col lg:flex-row bg-transparent items-center gap-6">
        {/* Left Column - Profile Information */}
        <div className="flex flex-col items-center text-center lg:text-left lg:items-start">
          {/* Profile Picture */}
          <div className="relative mb-4 group">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#cfc9ff] shadow-md mx-auto lg:mx-0 group-hover:border-[#7A6BEB] transition-all duration-300 bg-transparent">
              <input
                type="file"
                accept="image/*"
                aria-label="Upload profile image"
                title="Upload profile image"
                onChange={handleImageChange}
                disabled={!isEditing}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 disabled:cursor-not-allowed"
              />
              {profileImage && (profileImage.startsWith("data:") || profileImage.startsWith("http")) ? (
                <img
                  src={profileImage}
                  alt={editData.fullName || "Firm"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[#ECEBFB] text-[#7A6BEB] text-xl font-bold">
                  {editData.fullName?.[0]?.toUpperCase() || editData.company?.[0]?.toUpperCase() || "F"}
                </div>
              )}
            </div>
            {isEditing && (
              <div className="absolute bottom-0 right-0 lg:right-auto lg:left-1/2 lg:-translate-x-1/2 bg-[#7A6BEB] text-white p-1 rounded-full shadow-md">
                <Camera className="w-3 h-3" />
              </div>
            )}
          </div>

          {/* Name - Editable */}
          <div className="flex flex-col lg:flex-row items-center lg:items-center gap-3 w-full mb-3">
            {isEditing ? (
              <input
                type="text"
                value={editData.fullName || editData.company}
                onChange={(e) => setEditData({ ...editData, fullName: e.target.value })}
                className="text-2xl font-bold text-gray-900 w-full bg-transparent border-b-2 border-[#cfc9ff] focus:border-[#7A6BEB] focus:outline-none px-2 py-0.5 text-center lg:text-left"
                placeholder="Enter firm name"
              />
            ) : (
              <h1 className="text-2xl font-bold text-gray-900 text-center lg:text-left">
                {editData.fullName || editData.company || "Firm Name"}
              </h1>
            )}

            {/* Verification Badge */}
            {!isEditing && (
              <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm ${verificationStatus === "approved"
                ? "bg-green-100 text-green-700 border border-green-200"
                : verificationStatus === "pending"
                  ? "bg-amber-100 text-amber-700 border border-amber-200"
                  : verificationStatus === "rejected"
                    ? "bg-red-100 text-red-700 border border-red-200"
                    : "bg-gray-100 text-gray-600 border border-gray-200"
                }`}>
                <div className={`w-1.5 h-1.5 rounded-full ${verificationStatus === "approved" ? "bg-green-500" :
                  verificationStatus === "pending" ? "bg-amber-500" :
                    verificationStatus === "rejected" ? "bg-red-500" : "bg-gray-400"
                  }`} />
                {verificationStatus === "approved" ? "Verified Firm" :
                  verificationStatus === "pending" ? "Verification Pending" :
                    verificationStatus === "rejected" ? "Verification Rejected" : "Not Verified"}
              </div>
            )}
          </div>

          {/* Description - Editable */}
          {isEditing ? (
            <textarea
              value={editData.bio}
              onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
              className="text-gray-700 leading-relaxed mb-4 max-w-md text-sm w-full bg-transparent border-2 border-[#cfc9ff] rounded-lg focus:border-[#7A6BEB] focus:outline-none px-2 py-1.5 resize-none text-center lg:text-left"
              rows={3}
              placeholder="Enter your bio/description"
            />
          ) : (
            <p className="text-gray-700 leading-relaxed mb-4 max-w-md text-sm text-center lg:text-left">
              {editData.bio}
            </p>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
            {/* <button
              onClick={handlePortfolioClick}
              disabled={isEditing}
              className="px-4 py-2 bg-[#7A6BEB] text-white rounded-lg hover:bg-[#6c5fe0] transition-all text-sm font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Briefcase className="w-4 h-4" />
              <span>View Portfolio</span>
            </button> */}

            {/* Referral Button */}
            <button
              onClick={() => setShowReferralModal(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all text-sm font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              <Share2 className="w-4 h-4" />
              <span>Refer a Friend</span>
            </button>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-2 mt-4">
            <div className="p-2 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer">
              <BookOpen className="w-4 h-4 text-blue-600" />
            </div>
            <div className="p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
              <Camera className="w-4 h-4 text-gray-600" />
            </div>
            <div className="p-2 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors cursor-pointer">
              <Briefcase className="w-4 h-4 text-amber-600" />
            </div>
            <div className="p-2 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors cursor-pointer">
              <Heart className="w-4 h-4 text-pink-600" />
            </div>
          </div>
        </div>

        {/* Right Column - Cover Image */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative w-full max-w-lg rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <input
              type="file"
              accept="image/*"
              aria-label="Upload cover image"
              title="Upload cover image"
              onChange={handleCoverChange}
              disabled={!isEditing}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 disabled:cursor-not-allowed"
            />
            {coverImage ? (
              <img
                src={coverImage}
                alt="Project Cover"
                className="w-full h-full object-cover"
                style={{ aspectRatio: '16/9' }}
              />
            ) : (
              <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400" style={{ aspectRatio: '16/9' }}>
                No cover image
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity"></div>
            {isEditing && (
              <div className="absolute bottom-3 right-3 bg-[#7A6BEB] text-white p-2 rounded-full shadow-md">
                <Camera className="w-4 h-4" />
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Edit Mode Controls */}
      {/* {isEditing && (
        <div className="flex gap-2 justify-center mt-4 pt-4 border-t border-gray-200">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-semibold flex items-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? "Saving..." : "Save"}</span>
          </button>
          <button
            onClick={handleCancel}
            disabled={isSaving}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-semibold flex items-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50"
          >
            <X className="w-4 h-4" />
            <span>Cancel</span>
          </button>
        </div>
      )} */}

      {/* Referral Modal */}
      <ReferralModal
        isOpen={showReferralModal}
        onClose={() => setShowReferralModal(false)}
      />
    </div>
  );
}

