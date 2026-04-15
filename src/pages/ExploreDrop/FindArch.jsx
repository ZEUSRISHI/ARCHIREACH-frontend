import { useState, useEffect } from "react";
import {
  X,
  Mail,
  User,
  MessageSquare,
  Menu,
  ChevronLeft,
  Lightbulb,
  Search,
  Home,
  Star,
  MapPin,
  Briefcase,
  CheckCircle,
  Heart,
  MessageCircle,
  Building2,
  FileText,
  DollarSign,
  Clock,
  ShieldCheck,
  Sparkles,
  Share2,
  Grid3x3,
  List,
  Map,
  ChevronRight,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { submitContact } from "../../api/dashboardApi";
import Footer from "../../components/Footer";
import Reveal from "../../components/Reveal";

import { EnhancedSearchBar } from "../find-architects/EnhancedSearchBar";
import { FilterSidebar } from "../find-architects/FilterSidebar";
import { ResultsSection } from "../find-architects/ResultsSection";

import SharedNavbar from "../../components/Layout/SharedNavbar";
import { PageHeader } from "../find-projects/PageHeader";
import { RightSidebar } from "../find-projects/RightSidebar";
import { LoginModal } from "../find-projects/LoginModal";
import NavbarAll from "../../components/NavbarAll";

// Indian cities for location filter
const locations = [
  "Mumbai",
  "Bangalore",
  "Delhi",
  "Hyderabad",
  "Chennai",
  "Pune",
  "Kochi",
  "Kolkata",
  "Ahmedabad",
  "Jaipur",
  "Surat",
  "Lucknow",
];

// All project types
const projectTypes = [
  "Residential",
  "Commercial",
  "Hospitality",
  "Institutional",
  "Healthcare",
  "Industrial",
  "Civic & Government",
  "Religious",
  "Urban Design",
  "Landscape",
  "Interiors",
  "Restoration/Renovation",
];

// Specializations/Expertise
const specializations = [
  "Sustainable/Green Architecture",
  "Smart/Hi-Tech Design",
  "Heritage Conservation",
  "Healthcare Design",
  "Educational Design",
  "Urban Planning",
  "Landscape Design",
  "Industrial Process Design",
  "Affordable Housing",
  "Luxury/Lifestyle",
  "Interior Specializations",
  "Project Management",
];

// Design Styles
const designStyles = [
  "Modern/Contemporary",
  "Traditional/Classic",
  "Minimalist",
  "Sustainable/Natural",
  "Brutalist",
  "Art Deco",
  "Postmodern",
  "Industrial",
  "Regional/Indigenous",
  "Scandinavian",
  "Neo-Futuristic",
];

// Firm Sizes
const firmSizes = [
  "Solo Architect",
  "Small (2-10)",
  "Medium (11-50)",
  "Large (50+)",
];

// Languages
const languages = [
  "English",
  "Hindi",
  "Tamil",
  "Telugu",
  "Kannada",
  "Malayalam",
  "Marathi",
  "Gujarati",
  "Bengali",
];

// Availability options
const availabilityOptions = [
  "Open for new projects",
  "Consultation only",
  "Available now",
  "Available in 1-2 weeks",
];

export default function FindArch() {
  const { user } = useAuth();

  const openSignUp = () => window.dispatchEvent(new CustomEvent("openSignUp"));

  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState("listing"); // "listing" or "dashboard"
  const [selectedFirmForDashboard, setSelectedFirmForDashboard] =
    useState(null);
  const [firmsData, setFirmsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedFirm, setSelectedFirm] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Filter states
  const [name, setName] = useState("");
  const [firmName, setFirmName] = useState("");
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedProjectTypes, setSelectedProjectTypes] = useState([]);
  const [selectedSpecializations, setSelectedSpecializations] = useState([]);
  const [selectedDesignStyles, setSelectedDesignStyles] = useState([]);
  const [selectedFirmSizes, setSelectedFirmSizes] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedAvailability, setSelectedAvailability] = useState([]);
  const [minRating, setMinRating] = useState("");
  const [minReviews, setMinReviews] = useState("");
  const [minProjects, setMinProjects] = useState("");
  const [minExperience, setMinExperience] = useState("");
  const [projectArea, setProjectArea] = useState("");
  const [budgetRange, setBudgetRange] = useState([0, 100]);
  const [coaVerified, setCoaVerified] = useState(false);
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [sortBy, setSortBy] = useState("rating");

  // Top search bar filters
  const [topSearchSkill, setTopSearchSkill] = useState("");
  const [topSearchLocation, setTopSearchLocation] = useState("");
  const [topSearchExperience, setTopSearchExperience] = useState("");

  // Contact form state - will be initialized with user data if available
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    query: "",
  });

  // Login modal state (must be before any conditional return)
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Search handler
  const handleSearch = (query) => {
    console.log("Searching for:", query);
  };

  // Tag click handler
  const handleTagClick = (tag) => {
    console.log("Tag clicked:", tag);
  };

  // Login modal handler
  const handleLogin = () => {
    setShowLoginModal(false);
  };

  // Update form when user changes
  useEffect(() => {
    if (user) {
      setContactForm((prev) => ({
        ...prev,
        name: user.fullName || prev.name,
        email: user.email || prev.email,
      }));
    }
  }, [user]);

  useEffect(() => {
    const fetchFirms = async () => {
      setLoading(true);
      setFetchError(null);
      try {
        console.log("Fetching firms from /api/fjobs...");

        // Use fetch directly with proper error handling
        const API_URL =
          import.meta.env.VITE_API_URL || "https://archireach.onrender.com/api";
        const url = `${API_URL}/fjobs`;

        console.log("Fetching from URL:", url);

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include", // Include cookies for CORS
        });

        console.log("Response status:", response.status);
        console.log("Response headers:", response.headers);

        if (!response.ok) {
          let errorText;
          try {
            errorText = await response.text();
          } catch (e) {
            errorText = `Status ${response.status}`;
          }
          console.error("HTTP error response:", response.status, errorText);
          throw new Error(
            `HTTP error! status: ${response.status}, message: ${errorText}`
          );
        }

        const data = await response.json();
        console.log("Fetch response received:", data);

        console.log("Raw API response:", data);
        console.log("Number of firms received:", data?.length || 0);

        if (!Array.isArray(data)) {
          console.error("Expected array but got:", typeof data, data);
          setFirmsData([]);
          setFetchError("Invalid data format received from server");
          setLoading(false);
          return;
        }

        if (data.length === 0) {
          console.warn("No firms found in database");
          setFirmsData([]);
          setFetchError(null);
          setLoading(false);
          return;
        }

        // Map FJob data to match the expected structure
        const mappedData = data.map((firm) => {
          const mapped = {
            ...firm,
            _id: firm._id || firm.id,
            // Map experience fields
            experience: firm.yearsExperience || firm.experience || 0,
            yearsExperience: firm.yearsExperience || firm.experience || 0,
            // Map description/bio
            bio: firm.description || firm.bio || "",
            description: firm.description || firm.bio || "",
            // Map image/avatar
            image: firm.avatar || firm.image || null,
            avatar: firm.avatar || firm.image || null,
            // Ensure arrays exist and are arrays
            projectTypes: Array.isArray(firm.projectTypes)
              ? firm.projectTypes
              : [],
            specializations: Array.isArray(firm.specializations)
              ? firm.specializations
              : [],
            designStyles: Array.isArray(firm.designStyles)
              ? firm.designStyles
              : [],
            recentProjects: Array.isArray(firm.recentProjects)
              ? firm.recentProjects
              : [],
            // Ensure numeric fields
            rating: Number(firm.rating) || 0,
            reviews: Number(firm.reviews) || 0,
            projects: Number(firm.projects) || 0,
            // Ensure string fields
            name: firm.name || "",
            firmName: firm.firmName || firm.companyName || "",
            location: firm.location || "",
          };
          return mapped;
        });

        console.log("Mapped firms data:", mappedData);
        console.log("Sample firm:", mappedData[0]);
        setFirmsData(mappedData);
        setFetchError(null);
      } catch (err) {
        console.error("Fetch error details:", err);
        console.error("Error name:", err.name);
        console.error("Error message:", err.message);
        console.error("Error stack:", err.stack);

        let errorMessage = "Failed to fetch architects. ";
        if (
          err.message?.includes("NetworkError") ||
          err.message?.includes("Failed to fetch")
        ) {
          errorMessage +=
            "Please check if the server is running and try again.";
        } else if (err.message?.includes("CORS")) {
          errorMessage += "CORS error. Please check server configuration.";
        } else {
          errorMessage +=
            err.message || "Please check your connection and try again.";
        }

        setFirmsData([]);
        setFetchError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchFirms();
  }, []);

  const handleTopSearch = () => {
    setName(topSearchSkill);
    if (topSearchLocation && !selectedLocations.includes(topSearchLocation)) {
      setSelectedLocations([topSearchLocation]);
    }
    setMinExperience(topSearchExperience);
    setSidebarOpen(false);
  };

  const toggleLocation = (location) => {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((l) => l !== location)
        : [...prev, location]
    );
  };

  const toggleProjectType = (type) => {
    setSelectedProjectTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleSpecialization = (spec) => {
    setSelectedSpecializations((prev) =>
      prev.includes(spec) ? prev.filter((s) => s !== spec) : [...prev, spec]
    );
  };

  const toggleDesignStyle = (style) => {
    setSelectedDesignStyles((prev) =>
      prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]
    );
  };

  const toggleFirmSize = (size) => {
    setSelectedFirmSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleLanguage = (lang) => {
    setSelectedLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
  };

  const toggleAvailability = (avail) => {
    setSelectedAvailability((prev) =>
      prev.includes(avail) ? prev.filter((a) => a !== avail) : [...prev, avail]
    );
  };

  const clearAllFilters = () => {
    setName("");
    setFirmName("");
    setSelectedLocations([]);
    setSelectedProjectTypes([]);
    setSelectedSpecializations([]);
    setSelectedDesignStyles([]);
    setSelectedFirmSizes([]);
    setSelectedLanguages([]);
    setSelectedAvailability([]);
    setMinRating("");
    setMinReviews("");
    setMinProjects("");
    setMinExperience("");
    setProjectArea("");
    setBudgetRange([0, 100]);
    setCoaVerified(true);
    setFeaturedOnly(false);
    setSidebarOpen(false);
  };

  const filteredFirms = firmsData.filter((firm) => {
    const matchName =
      !name || (firm.name || "").toLowerCase().includes(name.toLowerCase());
    const matchFirmName =
      !firmName ||
      (firm.firmName || "").toLowerCase().includes(firmName.toLowerCase());
    const matchLocation =
      selectedLocations.length === 0 ||
      selectedLocations.includes(firm.location);
    const matchProjectType =
      selectedProjectTypes.length === 0 ||
      (firm.projectTypes &&
        selectedProjectTypes.some((pt) => firm.projectTypes.includes(pt)));
    const matchSpecialization =
      selectedSpecializations.length === 0 ||
      (firm.specializations &&
        selectedSpecializations.some((s) => firm.specializations.includes(s)));
    const matchDesignStyle =
      selectedDesignStyles.length === 0 ||
      (firm.designStyles &&
        selectedDesignStyles.some((ds) => firm.designStyles.includes(ds)));
    const matchFirmSize =
      selectedFirmSizes.length === 0 ||
      selectedFirmSizes.includes(firm.firmSize);
    const matchLanguage =
      selectedLanguages.length === 0 ||
      (firm.languages &&
        selectedLanguages.some((l) => firm.languages.includes(l)));
    const matchAvailability =
      selectedAvailability.length === 0 ||
      (firm.availability &&
        selectedAvailability.some((a) => firm.availability.includes(a)));
    const matchRating = !minRating || (firm.rating || 0) >= Number(minRating);
    const matchReviews =
      !minReviews || (firm.reviews || 0) >= Number(minReviews);
    const matchProjects =
      !minProjects || (firm.projects || 0) >= Number(minProjects);
    const matchExperience =
      !minExperience ||
      (firm.experience || firm.yearsExperience || 0) >= Number(minExperience);
    const matchCOA = !coaVerified || firm.coaVerified === true;
    const matchFeatured = !featuredOnly || firm.featured === true;

    return (
      matchName &&
      matchFirmName &&
      matchLocation &&
      matchProjectType &&
      matchSpecialization &&
      matchDesignStyle &&
      matchFirmSize &&
      matchLanguage &&
      matchAvailability &&
      matchRating &&
      matchReviews &&
      matchProjects &&
      matchExperience &&
      matchCOA &&
      matchFeatured
    );
  });

  const sortedFirms = [...filteredFirms].sort((a, b) => {
    if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
    if (sortBy === "experience") {
      const expA = a.experience || a.yearsExperience || 0;
      const expB = b.experience || b.yearsExperience || 0;
      return expB - expA;
    }
    if (sortBy === "projects") return (b.projects || 0) - (a.projects || 0);
    return 0;
  });

  const handleViewPortfolio = (firm) => {
    // Check if user is logged in
    const userUID = localStorage.getItem("userUID");
    const token = localStorage.getItem("token");

    if (!userUID || !token) {
      // User not logged in - show login/registration prompt
      const shouldLogin = window.confirm(
        "You need to be logged in to view architect details.\n\n" +
          "Click OK to login, or Cancel to continue browsing."
      );

      if (shouldLogin) {
        // Store the firm info to view after login
        sessionStorage.setItem("pendingViewFirm", JSON.stringify(firm));
        // Navigate to landing page with login modal
        navigate("/?login=true");
      }
      return;
    }

    // User is logged in - navigate to FirmDash
    if (firm.userUID) {
      // Store the viewed userUID temporarily and navigate
      sessionStorage.setItem("viewUserUID", firm.userUID);
      sessionStorage.setItem("viewMode", "true"); // Mark as view-only mode
      navigate("/pages/blog/FirmDash");
    } else {
      // Fallback to old behavior if no userUID
      setSelectedFirmForDashboard(firm);
      setCurrentView("dashboard");
    }
  };

  const handleBackToListing = () => {
    setCurrentView("listing");
    setSelectedFirmForDashboard(null);
  };

  const handleContactClick = async (firm) => {
    if (user) {
      console.log("Mapped firm data userUID:", firm.userUID);
      // For logged-in users, send notification immediately
      if (!window.confirm(`Send contact notification to ${firm.name}?`)) return;

      try {
        const contactData = {
          toFirmId: firm._id,
          toFirmUID: firm.userUID,
          toFirmName: firm.firmName || firm.name,
          toFirmEmail: firm.email || "",
          userName: user.fullName || user.name || "User",
          userEmail: user.email,
          userPhone: user.phone || "",
          userId: user.uid || localStorage.getItem("userUID"),
          message: "The client visited your profile and wants to contact you.",
          extraQuery: "",
        };

        console.log(
          "Auto-sending contact notification to firm userUID:",
          firm.userUID
        );
        const response = await submitContact(contactData);

        if (response.success) {
          alert(`✅ Notification sent to ${firm.name}!`);
        } else {
          alert(response.message || "Failed to send notification.");
        }
      } catch (error) {
        console.error("Contact submission error:", error);
        alert(
          error.response?.data?.message ||
            "Failed to send notification. Please try again."
        );
      }
    } else {
      // For guests, show the modal
      setSelectedFirm(firm);
      setShowContactModal(true);
    }
  };

  const handleContactSubmit = async () => {
    try {
      if (!contactForm.query || contactForm.query.trim().length < 20) {
        alert("Please enter a message with at least 20 characters");
        return;
      }

      console.log("Selected firm data userUID:", selectedFirm.userUID);

      // Prefill with authenticated user data if available
      const contactData = {
        toFirmId: selectedFirm._id, // Keep for backward compatibility
        toFirmUID: selectedFirm.userUID, // Use userUID
        toFirmName: selectedFirm.firmName || selectedFirm.name,
        toFirmEmail: selectedFirm.email || "",
        userName: user?.fullName || contactForm.name,
        userEmail: user?.email || contactForm.email,
        userPhone: "",
        userId: user?.uid || localStorage.getItem("userUID") || "guest",
        message: contactForm.query,
        extraQuery: "",
      };

      console.log(
        "📧 Sending contact request to userUID dashboard:",
        selectedFirm.userUID
      );

      const response = await submitContact(contactData);

      if (response.success) {
        alert(
          `✅ Message sent to ${selectedFirm.name}! They will contact you soon.`
        );
        setShowContactModal(false);
        setContactForm({ name: "", email: "", query: "" });
      } else {
        alert(response.message || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Contact submission error:", error);
      alert(
        error.response?.data?.message ||
          "Failed to send message. Please try again."
      );
    }
  };

  if (currentView === "dashboard" && selectedFirmForDashboard) {
    return (
      <ArchitectDashboard
        firm={selectedFirmForDashboard}
        onBack={handleBackToListing}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarAll />

      {/* Hero Section - Exact Reference Design */}
      <div className="w-full bg-white pt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
            {/* Left Section - Stats Cards */}
            <div className="flex-1 max-w-3xl">
              {/* Premium Tag */}
              <div className="inline-flex items-center gap-2 bg-[rgb(122,107,235)]/10 border border-[rgb(122,107,235)] text-[rgb(122,107,235)] font-bold px-4 py-1.5 rounded-full text-sm mb-4">
                <Sparkles className="w-4 h-4" />
                <span>Premium Architect Network</span>
              </div>

              {/* Main Heading */}
              <Reveal
                as="h1"
                delay={0}
                className="text-3xl sm:text-4xl lg:text-[40px] font-semibold leading-tight text-gray-900 tracking-tight mb-4"
              >
                Discover Architecture Professionals Curated For You
              </Reveal>

              {/* Description */}
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-6 sm:mb-8 max-w-2xl">
                Access COA-verified architects across India. Filter by location,
                project type, experience, specialization, and more. All
                professionals are verified with Council of Architecture.
              </p>

              {/* Stats Cards - 4 Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    icon: <User className="w-4 h-4" />,
                    label: "Architects",
                    value: "500+",
                    sub: "Verified this week",
                  },
                  {
                    icon: <Briefcase className="w-4 h-4" />,
                    label: "Experience",
                    value: "7,500+",
                    sub: "Years combined",
                  },
                  {
                    icon: <MapPin className="w-4 h-4" />,
                    label: "Cities",
                    value: "50+",
                    sub: "Pan-India coverage",
                  },
                  {
                    icon: <Clock className="w-4 h-4" />,
                    label: "Response Time",
                    value: "24 hrs",
                    sub: "Average reply",
                  },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
                  >
                    <div className="flex items-center gap-2 text-[rgb(122,107,235)] font-bold text-sm mb-2">
                      {stat.icon}
                      <span>{stat.label}</span>
                    </div>
                    <p className="text-2xl font-extrabold text-gray-900 mb-1">
                      {stat.value}
                    </p>
                    <p className="text-xs font-semibold text-gray-500">
                      {stat.sub}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Sidebar - Why Choose */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="bg-[rgb(122,107,235)]/10 border-2 border-[rgb(122,107,235)] rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 text-[rgb(122,107,235)] font-extrabold text-lg mb-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0" />
                  <span>Why clients choose Archireach</span>
                </div>
                <ul className="space-y-3 text-sm text-gray-700 font-semibold">
                  <li className="flex gap-2">
                    <span className="text-[rgb(122,107,235)] font-bold flex-shrink-0 mt-0.5">
                      •
                    </span>
                    <span>
                      Only verified and COA-registered architects make it to the
                      marketplace.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[rgb(122,107,235)] font-bold flex-shrink-0 mt-0.5">
                      •
                    </span>
                    <span>
                      Transparent portfolios, experience, and client reviews for
                      every profile.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[rgb(122,107,235)] font-bold flex-shrink-0 mt-0.5">
                      •
                    </span>
                    <span>
                      Save filters, get instant alerts, and manage your
                      shortlist in one place.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar Section - Exact Reference Design */}

      <EnhancedSearchBar onSearch={handleSearch} onTagClick={handleTagClick} />

      {/* Main Content - Two Column Layout */}
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6 gap-6">
        {/* Filters Sidebar - Left */}
        <FilterSidebar
          filters={{
            locations: selectedLocations,
            projectTypes: selectedProjectTypes,
            budgetRange: budgetRange,
            specializations: selectedSpecializations,
            verifiedOnly: coaVerified,
          }}
          setFilters={(newFilters) => {
            // Since FilterSidebar mainly uses this for clearing or bulk updates?
            // If newFilters is passed from clearAll, we can map it.
            // But FilterSidebar seems to use local state.
            // I'll just pass clearAllFilters if the object matches "empty" filters
            if (newFilters && newFilters.locations?.length === 0) {
              clearAllFilters();
            }
          }}
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
        />

        {/* Main Content - Right */}
        <ResultsSection
          firmPosts={sortedFirms}
          isLoadingFirmPosts={loading}
          isSignedUp={!!user}
          onOpenSignUp={openSignUp}
        />
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                Contact {selectedFirm?.name}
              </h2>
              <button
                onClick={() => setShowContactModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-1" />
                  Your Name
                </label>
                <input
                  type="text"
                  value={contactForm.name}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, name: e.target.value })
                  }
                  placeholder="Enter your name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-1" />
                  Your Email
                </label>
                <input
                  type="email"
                  value={contactForm.email}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, email: e.target.value })
                  }
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MessageSquare className="w-4 h-4 inline mr-1" />
                  Your Query
                </label>
                <textarea
                  rows={4}
                  value={contactForm.query}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, query: e.target.value })
                  }
                  placeholder="Describe your project or inquiry..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowContactModal(false)}
                  className="flex-1 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleContactSubmit}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer from Landing Page */}
      <Footer />
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => {
          setShowLoginModal(false);
        }}
        onLogin={handleLogin}
        initialMode={"login"}
      />
    </div>
  );
}

function FirmCard({ firm, onViewPortfolio, onContact, viewMode = "grid" }) {
  const { user } = useAuth();
  const [isSaved, setIsSaved] = useState(false);

  const getImageSrc = () => {
    if (firm.avatar && firm.avatar.startsWith("data:image")) {
      return firm.avatar;
    } else if (firm.avatar && firm.avatar.length > 50) {
      return `data:image/jpeg;base64,${firm.avatar}`;
    } else if (firm.image && firm.image.startsWith("data:image")) {
      return firm.image;
    } else if (firm.image && firm.image.length > 50) {
      return `data:image/jpeg;base64,${firm.image}`;
    }
    return null;
  };

  const imageSrc = getImageSrc();
  const firmSpecializations =
    firm.specializations ||
    (firm.specialty ? [firm.specialty] : ["Residential", "Commercial"]);
  const displaySpecializations = firmSpecializations.slice(0, 2);
  const remainingCount = firmSpecializations.length - 2;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full">
      {/* Profile Header - Exact Reference Design */}
      <div className="flex items-start gap-4 mb-5">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={firm.name}
            className="w-14 h-14 rounded-full object-cover flex-shrink-0"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
        ) : null}
        <div
          className={`w-14 h-14 ${firm.color || "bg-blue-600"} rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 ${imageSrc ? "hidden" : ""}`}
        >
          {firm.name ? firm.name.substring(0, 6).toUpperCase() : "A"}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold text-gray-900 mb-1 truncate">
            {firm.name || "Unknown"}
          </h3>
          <p className="text-xs text-gray-600 mb-0.5">
            {firm.location || "N/A"}
          </p>
          <p className="text-xs text-gray-500">{firm.firmName || "N/A"}</p>
        </div>
      </div>

      {/* Rating and Reviews - Exact Reference */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg font-bold text-gray-900">
          {firm.rating || 0}.0
        </span>
        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
        <span className="text-sm text-gray-600">
          {firm.reviews || 0} reviews
        </span>
      </div>

      {/* Specialization Tags - Exact Reference Design */}
      <div className="flex flex-wrap gap-2 mb-4">
        {displaySpecializations.map((spec, idx) => (
          <span
            key={idx}
            className="px-3 py-1 rounded-lg text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200"
          >
            {spec}
          </span>
        ))}
        {remainingCount > 0 && (
          <span className="px-3 py-1 rounded-lg text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
            +{remainingCount} more
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
        {firm.description || firm.bio || "No description available."}
      </p>

      {/* Signature Projects Section - Exact Reference */}
      <div className="mb-4">
        <h4 className="text-xs font-bold text-gray-900 mb-2 uppercase tracking-wider">
          SIGNATURE PROJECTS
        </h4>
        <p className="text-sm text-gray-600 line-clamp-2">
          {firm.recentProjects && firm.recentProjects.length > 0
            ? firm.recentProjects.slice(0, 2).join(", ")
            : "No signature projects listed."}
        </p>
      </div>

      {/* Statistics Cards - 3 Cards - Exact Reference */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
          <p className="text-sm font-bold text-gray-900 mb-1">
            {firm.projects || 0}+
          </p>
          <p className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">
            PROJECTS
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
          <p className="text-sm font-bold text-gray-900 mb-1">
            {firm.experience || 0}yr
          </p>
          <p className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">
            EXPERIENCE
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
          <p className="text-sm font-bold text-gray-900 mb-1">EN</p>
          <p className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">
            LANGUAGES
          </p>
        </div>
      </div>

      {/* Status - Exact Reference */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        <span className="text-sm font-semibold text-green-600">
          Open for Projects
        </span>
      </div>

      {/* Additional Info - Exact Reference */}
      <p className="text-xs text-gray-500 mb-4">
        {firm.projects || 0}+ projects completed
      </p>

      {/* Action Buttons - Exact Reference Design */}
      <div className="flex gap-3 mt-auto pt-4 border-t border-gray-200">
        <button
          onClick={onContact}
          className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2.5 rounded-lg transition-all text-sm font-semibold shadow-sm"
        >
          Contact
        </button>
        <button
          onClick={onViewPortfolio}
          className="flex-1 border-2 border-purple-600 text-purple-600 hover:bg-purple-50 px-4 py-2.5 rounded-lg transition-all text-sm font-semibold"
        >
          View Portfolio
        </button>
      </div>
    </div>
  );
}

function ArchitectDashboard({ firm, onBack }) {
  const getImageSrc = () => {
    if (firm.avatar && firm.avatar.startsWith("data:image")) {
      return firm.avatar;
    } else if (firm.avatar && firm.avatar.length > 50) {
      return `data:image/jpeg;base64,${firm.avatar}`;
    } else if (firm.image && firm.image.startsWith("data:image")) {
      return firm.image;
    } else if (firm.image && firm.image.length > 50) {
      return `data:image/jpeg;base64,${firm.image}`;
    }
    return null;
  };

  const imageSrc = getImageSrc();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium mb-4"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Listings
          </button>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {imageSrc ? (
              <img
                src={imageSrc}
                alt={firm.name}
                className="w-24 h-24 rounded-2xl object-cover shadow-md"
              />
            ) : (
              <div
                className={`w-24 h-24 ${firm.color || "bg-gradient-to-br from-blue-500 to-purple-600"} rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-md`}
              >
                {firm.name ? firm.name[0].toUpperCase() : "A"}
              </div>
            )}

            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">{firm.name}</h1>
              <p className="text-lg text-gray-600 mt-1">{firm.firmName}</p>
              <p className="text-sm text-gray-500 mt-1">{firm.location}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <p className="text-sm text-gray-500 mb-1">Rating</p>
            <p className="text-3xl font-bold text-gray-900">
              {firm.rating || 0}/5
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {firm.reviews || 0} reviews
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <p className="text-sm text-gray-500 mb-1">Projects</p>
            <p className="text-3xl font-bold text-gray-900">
              {firm.projects || 0}
            </p>
            <p className="text-xs text-gray-400 mt-1">Completed</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <p className="text-sm text-gray-500 mb-1">Experience</p>
            <p className="text-3xl font-bold text-gray-900">
              {firm.experience || 0}
            </p>
            <p className="text-xs text-gray-400 mt-1">Years</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <p className="text-sm text-gray-500 mb-1">Specialty</p>
            <p className="text-lg font-semibold text-gray-900">
              {firm.specialty || "N/A"}
            </p>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
          <p className="text-gray-700 leading-relaxed">
            {firm.description || "No description available for this architect."}
          </p>
        </div>

        {/* Recent Projects Section */}
        {firm.recentProjects && firm.recentProjects.length > 0 && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Recent Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {firm.recentProjects.map((project, idx) => (
                <div
                  key={`${firm._id || firm.name}-recent-project-${idx}`}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="w-full h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg mb-3"></div>
                  <p className="font-medium text-gray-900">{project}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contact Information */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Contact Information
          </h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700">
                {firm.email || "contact@architect.com"}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700">
                {firm.phone || "+1 (555) 123-4567"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
