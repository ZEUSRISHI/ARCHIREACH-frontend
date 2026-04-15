// src/pages/firm/FirmDash.jsx
import React, { useEffect, useState, useRef } from "react";

import { useNavigate, useLocation } from "react-router-dom";
import FArchitecturePage from "../../components/FArchitecturePage";
import Footer from "../../components/Footer";
import { getDashboard } from "../../api/dashboardApi";
import { useAuth } from "../../hooks/useAuth";
import { Heart, ExternalLink, X, Plus, Bell, CheckCircle, Edit, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { DashboardHeader } from "../../components/DashboardHeader";
import { FirmProfileHeader } from "../../components/FirmProfileHeader";
import FPostAdd from "../../components/FPostAdd";
import VerificationForm from "../../components/VerificationForm";
import { NotificationSidebar } from "../../components/NotificationSidebar";
import { ContactDetailsModal } from "../../components/ContactDetailsModal";
import { toast } from "react-toastify";
import { EditProvider } from "../../context/EditContext";

function FirmProfileView() {
  const pageRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useAuth();
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

  const { architect } = location.state || {};

  console.log("Received architect:", architect);
  debugger

  const [firmUser, setFirmUser] = useState(null);

  useEffect(() => {
    // Check if viewing someone else's profile (from FindArch)
    const viewUserUID = sessionStorage.getItem("viewUserUID");
    const isViewMode = sessionStorage.getItem("viewMode") === "true";

    const fetchFirmData = async (uid) => {
      try {
        const response = await fetch(`https://archireach.onrender.com/api/users/by-uid/${uid}`);
        const data = await response.json();
        if (data.success) {
          setFirmUser(data.user);
          // Also load their dashboard stats if possible
          const dashRes = await fetch(`https://archireach.onrender.com/api/users/${data.user._id}/dashboard`);
          const dashData = await dashRes.json();
          if (dashData.success) {
            setDashboardData(dashData.data);
          }
        }
      } catch (err) {
        console.error("Error loading firm data:", err);
      }
    };

    if (architect?.originalData?.userUID) {
      // Viewing profile from passed architect object
      const uid = architect.originalData.userUID;
      setUserUID(uid);
      setViewMode(true);
      setLoading(false);
      fetchFirmData(uid);

      // Load saved projects if user is logged in
      if (user?._id) {
        loadSavedProjects();
      }
    } else if (viewUserUID && isViewMode) {
      // Viewing someone else's profile - no edit allowed
      setUserUID(viewUserUID);
      setViewMode(true);
      setLoading(false);
      fetchFirmData(viewUserUID);

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
  }, [navigate, user, architect]);

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
        const response = await fetch(`https://archireach.onrender.com/api/contact/requests?userUID=${userUID}`, {
          headers: {
            'x-user-uid': userUID,
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });

        if (response.ok) {
          debugger
          const data = await response.json();
          if (data.success) {
            const contacts = data.data.map(contact => ({
              id: contact._id,
              userName: contact.name,
              userEmail: contact.email,
              userPhone: contact.phone || '',
              message: contact.message,
              query: contact.extraQuery || '',
              timestamp: contact.createdAt,
              status: contact.status || 'new',
              contactId: contact._id
            }));
            setNotifications(contacts);
            setNewNotificationCount(contacts.filter(c => c.status === 'new').length);
          }
        }
      } catch (err) {
        console.error('Error fetching contacts:', err);
      }
    };

    fetchContacts();
    const interval = setInterval(fetchContacts, 30000);
    return () => clearInterval(interval);
  }, [userUID, viewMode]);

  const handleViewContact = async (contact) => {
    setSelectedContact(contact);
    if (contact.status === 'new') {
      await handleMarkRead(contact.id);
    }
  };

  const handleMarkRead = async (contactId) => {
    try {
      const response = await fetch(`https://archireach.onrender.com/api/contact/${contactId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-user-uid': userUID
        },
        body: JSON.stringify({ status: 'read' })
      });

      if (response.ok) {
        setNotifications(prev =>
          prev.map(n => n.id === contactId ? { ...n, status: 'read' } : n)
        );
        setNewNotificationCount(prev => Math.max(0, prev - 1));
      }
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const handleStatusChange = async (contactId, status) => {
    try {
      const response = await fetch(`https://archireach.onrender.com/api/contact/${contactId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-user-uid': userUID
        },
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        setNotifications(prev =>
          prev.map(n => n.id === contactId ? { ...n, status } : n)
        );
        if (selectedContact && selectedContact.id === contactId) {
          setSelectedContact({ ...selectedContact, status });
        }
        if (status === 'read' || status === 'closed') {
          setNewNotificationCount(prev => Math.max(0, prev - 1));
        }
      }
    } catch (error) {
      console.error('Error updating status:', error);
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 text-gray-600 text-lg">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent relative">
      {/* Close Button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-6 right-6 z-50 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors border border-gray-200"
        aria-label="Close"
      >
        <X className="w-6 h-6 text-gray-600" />
      </button>




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
            onPostJob={() => setShowPostJob(true)}
            totalProjects={dashboardData?.stats?.totalProjects || 0}
            visibleProjects={dashboardData?.stats?.visibleProjects || 0}
            verificationStatus={dashboardData?.verificationStatus || "Not Verified"}
            firmData={firmUser}
          />
        }
      />




      {/* ✅ Saved Projects Section (only in view mode) */}
      {viewMode && user && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Saved Projects</h2>

            {loadingSavedProjects ? (
              <div className="text-center py-10 text-gray-600">Loading saved projects...</div>
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


      {/* ✅ Footer */}
      <Footer />
    </div>
  );
}

export default function FirmProfileViewWrapper() {
  return <FirmProfileView />;
}
