import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Star, MapPin, Briefcase, CheckCircle, Building2 } from "lucide-react";
import { useState } from "react";
import type React from "react";
import { useNavigate } from "react-router-dom"; // import navigate hook
import { useAuth } from "../../hooks/useAuth";
import { submitContact } from "../../api/dashboardApi";
import { useEditContext } from "../../context/EditContext";
import { Heart } from "lucide-react";

interface ArchitectCardProps {
  architect: {
    id: string;
    name: string;
    firm: string;
    rating: number;
    reviews: number;
    experience: number;
    location: string;
    projects: number;
    specializations: string[];
    bio: string;
    coaVerified: boolean;
    originalData?: any;
    isSignedUp?: boolean;
    onOpenSignUp?: () => void;
  };
  // new optional props to control auth behavior from parent
  isSignedUp?: boolean;
  onOpenSignUp?: () => void;
}

export function ArchitectCard({ architect, isSignedUp = false, onOpenSignUp }: ArchitectCardProps) {

  const [showContactModal, setShowContactModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const navigate = useNavigate(); // <-- react-router-dom hook
  const userUID = localStorage.getItem("userUID");
  const token = localStorage.getItem("token");

  // ensure inside ArchitectCard component
  const { user } = useAuth();
  const { addArchitect, savedArchitects, deleteArchitect } = useEditContext() as any;

  const isAlreadySaved = (savedArchitects as any[]).some(a => a.id === architect.id || a.originalId === architect.id);

  const handleSaveArchitect = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!userUID || !token) {
      navigate("/signin");
      return;
    }

    if (isAlreadySaved) {
      const savedItem = savedArchitects.find((a: any) => a.id === architect.id || a.originalId === architect.id);
      if (savedItem) deleteArchitect(savedItem.id);
      return;
    }

    const archToSave = {
      originalId: architect.id,
      name: architect.name,
      firm: architect.firm,
      rating: architect.rating,
      reviews: architect.reviews,
      experience: `${architect.experience}+ years`,
      location: architect.location,
      specialization: architect.specializations,
      bio: architect.bio,
      image: architect.originalData?.image || architect.originalData?.avatar || null,
      category: "Interested"
    };

    addArchitect(archToSave);
    alert(`Architect ${architect.name} saved to your dashboard!`);
  };

  // ensure inside ArchitectCard component
  const handleContactClick = async () => {
    if (isSignedUp && user) {
      console.log("Original data userUID:", architect.originalData?.userUID);

      if (!window.confirm(`Send contact notification to ${architect.name}?`)) return;

      try {
        const contactData = {
          toFirmId: architect.originalData?._id || architect.id,
          toFirmUID: architect.originalData?.userUID,
          toFirmName: architect.firm || architect.name,
          toFirmEmail: architect.originalData?.email || "",
          userName: (user as any).fullName || "User",
          userEmail: (user as any).email,
          userPhone: (user as any).phone || "",
          message: "The client visited your profile and wants to contact you.",
          extraQuery: ""
        };

        console.log("Sending contact notification to userUID dashboard:", architect.originalData?.userUID);
        const response = await submitContact(contactData);

        if (response.success) {
          alert(`✅ Notification sent to ${architect.name}!`);
        } else {
          alert(response.message || "Failed to send notification.");
        }
      } catch (error: any) {
        console.error("Contact submission error:", error);
        alert(error.response?.data?.message || "Failed to send notification. Please try again.");
      }
    } else {
      // Not signed up → redirect to home page with signup query
      navigate("/?signup=true");
    }
  };



  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setShowContactModal(false);
    alert("Message sent to " + architect.name);
  };

  return (
    <div className="relative group">
      {/* Background Glow */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-teal-100 via-purple-100 to-indigo-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md" />

      <div className="relative bg-white border border-gray-300 rounded-xl sm:rounded-2xl p-2.5 sm:p-3 transition-transform duration-300 group-hover:-translate-y-1.5 h-full w-full max-w-[360px] mx-auto flex flex-col items-center">
        {/* Centered Avatar */}
        <div className="relative flex-shrink-0 mb-2">
          <Avatar className="w-14 h-14 sm:w-16 sm:h-16 border-[3px] border-[rgb(122,107,235)]">
            <AvatarFallback className="text-base sm:text-lg font-extrabold text-[rgb(122,107,235)]">
              {architect.name.split(' ').map((n) => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          {architect.coaVerified && (
            <div className="absolute -top-1 -right-1 bg-gradient-to-r from-[rgb(122,107,235)] to-[rgb(102,91,215)] w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center shadow-lg">
              <CheckCircle className="w-3 h-3 text-white" />
            </div>
          )}
        </div>

        {/* Name & Firm */}
        <div className="text-center mb-1.5">
          <h3
            className="text-[20px] font-normal text-gray-900 leading-tight mb-1 truncate"
            style={{ fontFamily: "'Public Sans', sans-serif" }}
          >
            {architect.name}
          </h3>
          <div className="flex items-center justify-center gap-1.5 mb-1.5">
            <Building2 className="w-3 h-3 sm:w-4 sm:h-4 text-[rgb(122,107,235)] flex-shrink-0" />
            <span className="text-xs sm:text-sm text-gray-600 truncate">{architect.firm}</span>
          </div>

          {/* Rating */}
          <div className="flex items-center justify-center gap-1 text-xs sm:text-sm font-semibold text-gray-600">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i < Math.round(architect.rating)
                  ? 'fill-[rgb(122,107,235)] text-[rgb(122,107,235)]'
                  : 'text-gray-300'
                  }`}
              />
            ))}
            <span className="ml-1">{architect.rating}</span>
            <span className="text-gray-400 mx-1">•</span>
            <span>{architect.reviews} reviews</span>
          </div>
        </div>

        {/* Specializations */}
        <div className="flex flex-wrap gap-1.5 mb-2 justify-center">
          {architect.specializations.slice(0, 3).map((spec) => (
            <Badge
              key={spec}
              className="bg-[rgb(235,232,255)] border border-[rgb(122,107,235)] text-[rgb(122,107,235)] font-semibold text-xs px-2 py-0.5"
            >
              {spec}
            </Badge>
          ))}
          {architect.specializations.length > 3 && (
            <Badge className="bg-gray-100 border border-gray-200 text-gray-600 font-semibold text-xs px-2 py-0.5">
              +{architect.specializations.length - 3}
            </Badge>
          )}
        </div>

        <div className="w-full mt-2 flex justify-center">
          <Button
            onClick={() => {
              if (!userUID || !token) {
                navigate("/signin");
                return;
              }

              // Add smooth scroll for mobile view only
              if (window.innerWidth < 768) {
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                });
              }
              setShowProfileModal(true);
            }}
            className="flex-1 h-8 sm:h-9 bg-[rgb(122,107,235)] hover:bg-[rgb(102,91,215)] text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all text-xs sm:text-sm border-0"
          >
            View Profile
          </Button>
          <button
            onClick={handleSaveArchitect}
            className={`h-8 w-8 sm:h-9 sm:w-9 rounded-lg border flex items-center justify-center transition-all ${isAlreadySaved
                ? "bg-red-50 border-red-200 text-red-500 shadow-inner"
                : "bg-white border-gray-200 text-gray-400 hover:text-red-400 hover:border-red-200"
              }`}
            title={isAlreadySaved ? "Remove from saved" : "Save architect"}
          >
            <Heart className={`w-4 h-4 ${isAlreadySaved ? "fill-current" : ""}`} />
          </button>
        </div>
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-40" onClick={() => setShowContactModal(false)} />
          <div className="relative bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6 z-10">
            <h3 className="text-lg font-semibold mb-3">Contact {architect.name}</h3>
            <form onSubmit={handleSendMessage} className="space-y-3">
              <div>
                <label className="text-xs font-medium text-gray-600">Your name</label>
                <input required className="w-full mt-1 p-2 border rounded" placeholder="Enter your name" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600">Email</label>
                <input type="email" required className="w-full mt-1 p-2 border rounded" placeholder="you@example.com" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600">Message</label>
                <textarea required className="w-full mt-1 p-2 border rounded" rows={4} placeholder="Brief project details..." />
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" className="px-4 py-2 rounded border" onClick={() => setShowContactModal(false)}>Cancel</button>
                <button type="submit" className="px-4 py-2 rounded bg-[rgb(122,107,235)] text-white">Send</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowProfileModal(false)} />

          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl z-10 overflow-hidden">
            <div className="p-5 sm:p-6 border-b border-gray-100 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 truncate">{architect.name}</h3>
                  {architect.coaVerified && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[rgb(122,107,235)] bg-[rgb(235,232,255)] border border-[rgb(122,107,235)] rounded-full px-2.5 py-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      License verified
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">{architect.firm}</p>
              </div>

              <button
                type="button"
                onClick={() => setShowProfileModal(false)}
                className="h-9 w-9 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50"
                aria-label="Close profile"
                title="Close"
              >
                ✕
              </button>
            </div>

            <div className="p-5 sm:p-6">
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-700 mb-4">
                <div className="inline-flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="font-semibold">{architect.location}</span>
                </div>
                <span className="text-gray-300">|</span>
                <div className="inline-flex items-center gap-2">
                  <Star className="w-4 h-4 fill-[rgb(122,107,235)] text-[rgb(122,107,235)]" />
                  <span className="font-semibold">{architect.rating}</span>
                  <span className="text-gray-500">({architect.reviews} reviews)</span>
                </div>
                <span className="text-gray-300">|</span>
                <div className="inline-flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-gray-500" />
                  <span className="font-semibold">{architect.experience}+ yrs</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
                  <div className="text-xs text-gray-500 font-semibold">Projects</div>
                  <div className="text-lg font-semibold text-gray-900">{architect.projects}+</div>
                </div>
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
                  <div className="text-xs text-gray-500 font-semibold">Experience</div>
                  <div className="text-lg font-semibold text-gray-900">{architect.experience}+ yrs</div>
                </div>
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
                  <div className="text-xs text-gray-500 font-semibold">Specializations</div>
                  <div className="text-lg font-semibold text-gray-900">{architect.specializations?.length || 0}</div>
                </div>
              </div>

              {Array.isArray(architect.specializations) && architect.specializations.length > 0 && (
                <div className="mb-5">
                  <div className="text-sm font-semibold text-gray-900 mb-2">Specializations</div>
                  <div className="flex flex-wrap gap-2">
                    {architect.specializations.map((spec) => (
                      <Badge
                        key={spec}
                        className="bg-[rgb(235,232,255)] border border-[rgb(122,107,235)] text-[rgb(122,107,235)] font-semibold text-xs px-2.5 py-1"
                      >
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <div className="text-sm font-semibold text-gray-900 mb-2">About</div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {architect.bio}
                </p>
              </div>
            </div>

            <div className="p-5 sm:p-6 border-t border-gray-100 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
              <div className="flex gap-3">
                <Button
                  onClick={() => {
                    navigate("/pages/blog/FirmProfile", {
                      state: { architect }
                    });
                  }}
                  className="h-10 bg-[rgb(122,107,235)] hover:bg-[rgb(102,91,215)] text-white font-bold rounded-lg shadow-sm hover:shadow-md transition-all border-0"
                >
                  View Projects
                </Button>

                <Button
                  onClick={handleSaveArchitect}
                  className={`h-10 font-bold rounded-lg shadow-sm hover:shadow-md transition-all border ${isAlreadySaved
                      ? "bg-white border-red-200 text-red-500 hover:bg-red-50"
                      : "bg-white border-gray-200 text-gray-700 hover:border-[rgb(122,107,235)] hover:text-[rgb(122,107,235)]"
                    }`}
                >
                  <Heart className={`w-4 h-4 mr-2 ${isAlreadySaved ? "fill-current" : ""}`} />
                  {isAlreadySaved ? "Saved" : "Save Architect"}
                </Button>

                <Button
                  onClick={handleContactClick}
                  className="h-10 bg-[rgb(122,107,235)] hover:bg-[rgb(102,91,215)] text-white font-bold rounded-lg shadow-sm hover:shadow-md transition-all border-0"
                >
                  Contact
                </Button>
              </div>

              <Button
                variant="outline"
                onClick={() => setShowProfileModal(false)}
                className="h-10 rounded-lg border-gray-200"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>

  );
}
