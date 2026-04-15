// src/pages/firm/FirmDash.jsx
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import FArchitecturePage from "../../components/FArchitecturePage";
import Footer from "../../components/Footer";
import { getDashboard } from "../../api/dashboardApi";
import { useAuth } from "../../hooks/useAuth";
import { useSocket } from "../../hooks/useSocket";
import {
  Heart,
  ExternalLink,
  X,
  Plus,
  Bell,
  CheckCircle,
  Edit,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { DashboardHeader } from "../../components/DashboardHeader";
import { FirmProfileHeader } from "../../components/FirmProfileHeader";
import FPostAdd from "../../components/FPostAdd";
import VerificationForm from "../../components/VerificationForm";
import { NotificationSidebar } from "../../components/NotificationSidebar";
import { ContactDetailsModal } from "../../components/ContactDetailsModal";
import { toast } from "react-toastify";
import { EditProvider } from "../../context/EditContext";

function FirmDash() {
  const pageRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { notifications: socketNotifications, isConnected } = useSocket();
  const [userUID, setUserUID] = useState(null);
  const [viewMode, setViewMode] = useState(false); // true = viewing someone else's profile
  const [loading, setLoading] = useState(true);
  const [savedProjects, setSavedProjects] = useState([]);
  const [loadingSavedProjects, setLoadingSavedProjects] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [newNotificationCount, setNewNotificationCount] = useState(0);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [showPostJob, setShowPostJob] = useState(false);
  const [showVerificationForm, setShowVerificationForm] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const editProfileRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const location = useLocation();
  const fromViewProject = location.state?.viewProject === true;

  // Handle real-time socket notifications
  useEffect(() => {
    if (socketNotifications && socketNotifications.length > 0) {
      // Add new socket notification to the notifications list
      const latestNotification = socketNotifications[0];
      setNotifications((prev) => {
        // Check if notification already exists
        const exists = prev.some((n) => n.id === latestNotification.id);
        if (!exists) {
          return [latestNotification, ...prev];
        }
        return prev;
      });

      // Update notification count
      setNewNotificationCount((prev) => prev + 1);

      // Show toast notification
      toast.info(latestNotification.message || "New notification received!", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  }, [socketNotifications]);

  useEffect(() => {
    // Check if viewing someone else's profile (from FindArch)
    const viewUserUID = sessionStorage.getItem("viewUserUID");
    const isViewMode = sessionStorage.getItem("viewMode") === "true";

    if (viewUserUID && isViewMode) {
      // Viewing someone else's profile - no edit allowed
      setUserUID(viewUserUID);
      setViewMode(true);
      setLoading(false);
      // Clear session storage after reading
      sessionStorage.removeItem("viewUserUID");
      sessionStorage.removeItem("viewMode");

      // Load saved projects if user is logged in
      if (user?._id) {
        loadSavedProjects();
      }
    } else {
      // Viewing own profile - get from localStorage
      const storedUserUID = localStorage.getItem("userUID");
      if (storedUserUID) {
        setUserUID(storedUserUID);
        setViewMode(false);
        setLoading(false);
        // Load dashboard data
        if (user?._id) {
          loadDashboardData();
        }
      } else {
        // 🚨 If userUID not found — redirect to login
        navigate("/signin");
      }
    }
  }, [navigate, user]);

  const loadDashboardData = async () => {
    if (!user?._id) return;
    try {
      const response = await getDashboard(user._id);
      if (response.success && response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.error("Error loading dashboard:", error);
    }
  };

  // Load notifications/contact requests
  useEffect(() => {
    if (!userUID || viewMode) return;

    const fetchContacts = async () => {
      try {
        const response = await fetch(
          `https://archireach.onrender.com/api/contact/requests?userUID=${userUID}`,
          {
            headers: {
              "x-user-uid": userUID,
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            const contacts = data.data.map((contact) => ({
              id: contact._id,
              userName: contact.userName,
              userEmail: contact.userEmail,
              userPhone: contact.userPhone || "",
              message: contact.message,
              query: contact.extraQuery || "",
              timestamp: contact.createdAt,
              status: contact.status || "new",
              contactId: contact._id,
            }));
            setNotifications(contacts);
            setNewNotificationCount(
              contacts.filter((c) => c.status === "new").length
            );
          }
        }
      } catch (err) {
        console.error("Error fetching contacts:", err);
      }
    };

    fetchContacts();
    const interval = setInterval(fetchContacts, 30000);
    return () => clearInterval(interval);
  }, [userUID, viewMode]);

  const handleViewContact = async (contact) => {
    setSelectedContact(contact);
    if (contact.status === "new") {
      await handleMarkRead(contact.id);
    }
  };

  const handleMarkRead = async (contactId) => {
    try {
      const response = await fetch(
        `https://archireach.onrender.com/api/contact/requests/${contactId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "x-user-uid": userUID,
          },
          body: JSON.stringify({ status: "read" }),
        }
      );

      if (response.ok) {
        setNotifications((prev) =>
          prev.map((n) => (n.id === contactId ? { ...n, status: "read" } : n))
        );
        setNewNotificationCount((prev) => Math.max(0, prev - 1));
      }
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };

  const handleStatusChange = async (contactId, status) => {
    try {
      const response = await fetch(
        `https://archireach.onrender.com/api/contact/requests/${contactId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "x-user-uid": userUID,
          },
          body: JSON.stringify({ status }),
        }
      );

      if (response.ok) {
        setNotifications((prev) =>
          prev.map((n) => (n.id === contactId ? { ...n, status } : n))
        );
        if (selectedContact && selectedContact.id === contactId) {
          setSelectedContact({ ...selectedContact, status });
        }
        if (status === "read" || status === "closed") {
          setNewNotificationCount((prev) => Math.max(0, prev - 1));
        }
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const loadSavedProjects = async () => {
    if (!user?._id) return;

    try {
      setLoadingSavedProjects(true);
      const response = await getDashboard(user._id);
      if (response.success && response.data) {
        setSavedProjects(response.data.savedProjects || []);
      }
    } catch (error) {
      console.error("Error loading saved projects:", error);
    } finally {
      setLoadingSavedProjects(false);
    }
  };

  const handleUnsaveProject = async (projectId) => {
    if (!user?._id) return;

    try {
      const { unsaveProject } = await import("../../api/dashboardApi");
      const response = await unsaveProject(user._id, projectId);
      if (response.success) {
        alert("Project removed from saved");
        loadSavedProjects();
      }
    } catch (error) {
      console.error("Error unsaving project:", error);
      alert("Failed to remove project");
    }
  };

  const handlePostJobClick = () => {
    const status = dashboardData?.verificationStatus || "Not Verified";

    if (status === "approved") {
      setShowPostJob(true);
    } else if (status === "pending") {
      toast.info(
        "Your verification is pending admin approval. You can add posts once approved."
      );
    } else if (status === "rejected") {
      toast.error(
        `Verification rejected: ${dashboardData?.verificationData?.rejectionReason || "Please check details and re-submit"}`
      );
      setShowVerificationForm(true);
    } else {
      toast.warning("Please complete your firm verification to add posts.");
      setShowVerificationForm(true);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 text-gray-600 text-lg">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent">
      <DashboardHeader />
      {/* Action Buttons Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <div className="flex flex-col items-stretch gap-3 pb-4 sm:flex-row sm:flex-wrap sm:justify-end sm:items-center">
          {!viewMode && (
            <button
              onClick={handlePostJobClick}
              className="w-full justify-center px-4 py-2.5 bg-[#7A6BEB] text-white font-semibold rounded-lg shadow-md hover:bg-[#6c5fe0] transition-all flex items-center gap-1.5 text-sm sm:w-auto"
            >
              <Plus className="w-4 h-4" />
              Post Jobs
            </button>
          )}

          <button
            onClick={() => setIsNotificationOpen(true)}
            className="relative w-full justify-center px-4 py-2.5 bg-[#7A6BEB] text-white font-semibold rounded-lg shadow-md hover:bg-[#6c5fe0] transition-all flex items-center gap-1.5 text-sm sm:w-auto"
          >
            <Bell className="w-4 h-4" />
            Notification
            {newNotificationCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
                {newNotificationCount}
              </span>
            )}
          </button>

          {!viewMode && dashboardData?.verificationStatus !== "approved" && (
            <button
              onClick={() => setShowVerificationForm(true)}
              className="w-full justify-center px-4 py-2.5 bg-[#7A6BEB] text-white font-semibold rounded-lg shadow-md hover:bg-[#6c5fe0] transition-all flex items-center gap-1.5 text-sm sm:w-auto"
            >
              <CheckCircle className="w-4 h-4" />
              Verification Form
            </button>
          )}

          {!viewMode && (
            <button
              onClick={() => {
                if (!isEditing) {
                  // Start editing
                  setIsEditing(true);
                  if (editProfileRef.current?.triggerEdit) {
                    editProfileRef.current.triggerEdit();
                  }
                } else {
                  // Currently editing -> save and close
                  const savePromises = [];

                  // 1. Save Portfolio Content
                  if (pageRef.current?.save) {
                    savePromises.push(pageRef.current.save());
                  }

                  // 2. Save Profile Header Info
                  if (editProfileRef.current?.save) {
                    savePromises.push(editProfileRef.current.save());
                  }

                  if (savePromises.length > 0) {
                    Promise.all(savePromises)
                      .then(() => {
                        toast.success("All changes saved successfully!");
                        setIsEditing(false);
                        // Optional: reload dashboard data to sync stats
                        loadDashboardData();
                      })
                      .catch((err) => {
                        console.error("Save error:", err);
                        toast.error("Some changes failed to save.");
                      });
                  } else {
                    setIsEditing(false);
                  }
                }
              }}
              className="w-full justify-center px-4 py-2.5 bg-[#7A6BEB] text-white font-semibold rounded-lg shadow-md hover:bg-[#6c5fe0] transition-all flex items-center gap-1.5 text-sm sm:w-auto"
            >
              <Edit className="w-4 h-4" />
              {isEditing ? "Save Changes" : "Edit Profile"}
            </button>
          )}

          <button
            onClick={() => {
              navigate("/pricing?category=firm");
            }}
            className="w-full justify-center px-4 py-2.5 bg-[#7A6BEB] text-white font-semibold rounded-lg shadow-md hover:bg-[#6c5fe0] transition-all inline-flex items-center text-sm sm:w-auto"
          >
            Upgrade
          </button>
        </div>
      </div>

      {/* ✅ Architecture Section */}
      <FArchitecturePage
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        currentUserId={userUID}
        viewMode={viewMode}
        pageRef={pageRef}
        profileComponent={
          <FirmProfileHeader
            editRef={editProfileRef}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            onPostJob={handlePostJobClick}
            totalProjects={dashboardData?.stats?.totalProjects || 0}
            visibleProjects={dashboardData?.stats?.visibleProjects || 0}
            verificationStatus={
              dashboardData?.verificationStatus || "Not Verified"
            }
          />
        }
      />

      {/* ✅ Saved Projects Section (only in view mode) */}
      {viewMode && user && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Your Saved Projects
            </h2>

            {loadingSavedProjects ? (
              <div className="text-center py-10 text-gray-600">
                Loading saved projects...
              </div>
            ) : savedProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedProjects.map((project) => (
                  <div
                    key={project._id}
                    className="bg-gray-50 rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-lg transition-shadow"
                  >
                    {project.images && project.images.length > 0 && (
                      <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 overflow-hidden">
                        <img
                          src={project.images[0]}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex gap-2">
                      <Link
                        to={`/projects/${project._id}`}
                        className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View
                      </Link>
                      <button
                        onClick={() => handleUnsaveProject(project._id)}
                        className="flex items-center justify-center gap-2 border border-red-300 text-red-600 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors text-sm"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-gray-50 rounded-lg border border-gray-200">
                <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">No saved projects yet</p>
                <Link
                  to="/pages/ExploreDrop/FindProjects"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Browse Projects →
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Post Job Modal */}
      <FPostAdd
        isOpen={showPostJob}
        onClose={() => setShowPostJob(false)}
        onSave={() => {
          setShowPostJob(false);
          loadDashboardData();
        }}
      />

      {/* Verification Form Modal */}
      {showVerificationForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 font-bold text-xl z-10 bg-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-100"
              onClick={() => setShowVerificationForm(false)}
            >
              ×
            </button>
            <div className="p-6">
              <VerificationForm
                onClose={() => {
                  setShowVerificationForm(false);
                  loadDashboardData();
                  setShowPostJob(true);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Notification Sidebar */}
      <NotificationSidebar
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        notifications={notifications}
        onViewContact={handleViewContact}
        onMarkRead={handleMarkRead}
      />

      {/* Contact Details Modal */}
      {selectedContact && (
        <ContactDetailsModal
          contact={selectedContact}
          onClose={() => setSelectedContact(null)}
          onStatusChange={handleStatusChange}
        />
      )}

      {/* ✅ Footer */}
      <Footer />
    </div>
  );
}

export default function FirmDashWrapper() {
  return <FirmDash />;
}
