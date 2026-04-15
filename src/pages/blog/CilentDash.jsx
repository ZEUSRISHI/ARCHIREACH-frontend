// src/pages/firm/FirmDash.jsx
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Bell,
  X,
  Search,
  FolderOpen,
  FileEdit,
  User,
  Sparkles,
  Plus,
  CheckCircle,
  Edit,
} from "lucide-react";
import { DashboardHeader } from "../../components/DashboardHeader";
import { ClientProfileHeader } from "../../components/ClientProfileHeader";
import { DashboardTabs } from "../../components/DashboardTabs";
import { PostBriefForm } from "../../components/PostBriefForm";
import Footer from "../../components/Footer";
import { getDashboard } from "../../api/dashboardApi";
import { useAuth } from "../../hooks/useAuth";
import { useSocket } from "../../hooks/useSocket";
import { SavedArchitects } from "../../components/SavedArchitects";
import { EditProvider, useEditContext } from "../../context/EditContext";
import { useSubscription } from "../../context/SubscriptionContext";
import { NotificationSidebar } from "../../components/NotificationSidebar";
import { ContactDetailsModal } from "../../components/ContactDetailsModal";
import { checkBriefPayment } from "../../api/subscriptionApi";

function EditableProfileButton({ editProfileRef }) {
  const { isEditing, setIsEditing } = useEditContext();

  const handleClick = () => {
    if (isEditing) {
      // Save changes
      if (editProfileRef.current && editProfileRef.current.triggerSave) {
        editProfileRef.current.triggerSave();
      }
      setIsEditing(false);
    } else {
      if (editProfileRef.current && editProfileRef.current.triggerEdit) {
        editProfileRef.current.triggerEdit();
      }
      setIsEditing(true);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="w-full justify-center px-4 py-2.5 bg-[#7a6beb] text-white font-semibold rounded-lg shadow-md hover:bg-[#6c5fe0] transition-all flex items-center gap-1.5 text-sm sm:w-auto"
    >
      {isEditing ? (
        <CheckCircle className="w-4 h-4" />
      ) : (
        <Edit className="w-4 h-4" />
      )}
      {isEditing ? "Save Changes" : "Edit Profile"}
    </button>
  );
}

// import { useState } from "react";
// import { Edit } from "lucide-react";

// export function EditableProfileButton({ editProfileRef, handleSaveChanges }) {
//   const [isEditing, setIsEditing] = useState(false);

//   const handleClick = () => {
//     if (isEditing) {
//       // Save changes
//       handleSaveChanges();
//       setIsEditing(false);
//     } else {
//       // Trigger edit mode in ClientProfileHeader
//       if (editProfileRef.current) {
//         editProfileRef.current.triggerEdit();
//       }
//       setIsEditing(true);
//     }
//   };

//   return (
//     <button
//       onClick={handleClick}
//       className="px-4 py-2.5 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition-all flex items-center gap-1.5 text-sm"
//     >
//       <Edit className="w-4 h-4" />
//       {isEditing ? "Save Changes" : "Edit Profile"}
//     </button>
//   );
// }

function ClientDashContent() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const { notifications: socketNotifications } = useSocket();
  const editProfileRef = useRef(null);
  const [uid, setUid] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showPostBrief, setShowPostBrief] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [newNotificationCount, setNewNotificationCount] = useState(0);
  const [dashboardData, setDashboardData] = useState(null);
  const { isEditing, setIsEditing, savedArchitects, savedProjects } =
    useEditContext();
  const { subscription } = useSubscription();

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
    }
  }, [socketNotifications]);

  useEffect(() => {
    if (!showPostBrief) return;

    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
    };
  }, [showPostBrief]);

  useEffect(() => {
    const storedUserUID = localStorage.getItem("userUID");
    if (storedUserUID) {
      setUid(storedUserUID);
    } else {
      navigate("/signin");
      return;
    }

    if (user?._id) {
      loadDashboard();
    }
    setLoading(false);
  }, [user]);

  /**
   * After redirect from pricing page with ?openPostBrief=true,
   * verify the user has a valid brief payment and auto-open the form.
   */
  useEffect(() => {
    if (!user?._id) return;
    const openForm = searchParams.get("openPostBrief");
    if (openForm === "true") {
      // Verify the payment is still valid before opening the form
      checkBriefPayment(user._id)
        .then((data) => {
          if (data.hasValidPayment) {
            setShowPostBrief(true);
          } else {
            // Payment not found — redirect to pricing again
            navigate("/pricing");
          }
        })
        .catch(() => {
          navigate("/pricing");
        });
    }
  }, [user, searchParams]);

  const loadDashboard = async () => {
    try {
      const response = await getDashboard(user._id);
      if (response.success) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.error("Error loading dashboard:", error);
    }
  };

  const fetchNotifications = async () => {
    try {
      const userUID = localStorage.getItem("userUID");
      if (!userUID) return;

      const response = await fetch(
        `https://archireach.onrender.com/api/contact/requests?userUID=${userUID}`,
        {
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
            userId: contact.userId,
          }));
          setNotifications(contacts);
          setNewNotificationCount(
            contacts.filter((c) => c.status === "new").length
          );
        }
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    if (uid) {
      fetchNotifications();
      const interval = setInterval(fetchNotifications, 30000);
      return () => clearInterval(interval);
    }
  }, [uid]);

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
            "x-user-uid": uid,
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
            "x-user-uid": uid,
          },
          body: JSON.stringify({ status }),
        }
      );

      if (response.ok) {
        setNotifications((prev) =>
          prev.map((n) => (n.id === contactId ? { ...n, status } : n))
        );
        if (status !== "new") {
          setNewNotificationCount((prev) => Math.max(0, prev - 1));
        }
      }
    } catch (error) {
      console.error("Error changing status:", error);
    }
  };

  /**
   * Handle Post Brief button click.
   * Checks if the client has a valid paid brief payment (₹99 per post).
   * If not, redirects to the pricing page (Client section) to pay.
   */
  const handlePostBriefClick = async () => {
    if (!user?._id) {
      navigate("/signin");
      return;
    }
    try {
      const data = await checkBriefPayment(user._id);
      if (data.hasValidPayment) {
        setShowPostBrief(true);
      } else {
        // No valid payment — send to pricing page. Auto-select client tab.
        navigate("/pricing?category=client");
      }
    } catch (error) {
      console.error("Error checking brief payment:", error);
      navigate("/pricing?category=client");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 text-gray-600 text-lg font-bold">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent">
      <DashboardHeader />

      {/* Action Buttons Row */}
      <div className="max-w-7xl mx-auto mt-4 px-4 sm:px-6 lg:px-8">
        <div className="mt-4 flex flex-col items-stretch gap-3 pb-4 sm:flex-row sm:flex-wrap sm:justify-end sm:items-center">
          <button
            onClick={handlePostBriefClick}
            className="w-full justify-center px-4 py-2.5 bg-[#7a6beb] text-white font-semibold rounded-lg shadow-md hover:bg-[#6c5fe0] transition-all flex items-center gap-1.5 text-sm sm:w-auto"
          >
            <Plus className="w-4 h-4" />
            Post Brief
          </button>

          <button
            onClick={() => setIsNotificationOpen(true)}
            className="relative w-full justify-center px-4 py-2.5 bg-[#7a6beb] text-white font-semibold rounded-lg shadow-md hover:bg-[#6c5fe0] transition-all flex items-center gap-1.5 text-sm sm:w-auto"
          >
            <Bell className="w-4 h-4" />
            Notification
            {newNotificationCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
                {newNotificationCount}
              </span>
            )}
          </button>

          <button
            onClick={() => navigate("/pages/ExploreDrop/FindArch")}
            className="w-full justify-center px-4 py-2.5 bg-[#7a6beb] text-white font-semibold rounded-lg shadow-md hover:bg-[#6c5fe0] transition-all flex items-center gap-1.5 text-sm sm:w-auto"
          >
            <CheckCircle className="w-4 h-4" />
            Find Architect
          </button>
          <button
            onClick={() => navigate("/pricing?category=client")}
            className="w-full justify-center px-4 py-2.5 bg-[#7a6beb] text-white font-semibold rounded-lg shadow-md hover:bg-[#6c5fe0] transition-all inline-flex items-center text-sm sm:w-auto"
          >
            Upgrade
          </button>

          <EditableProfileButton editProfileRef={editProfileRef} />
        </div>
      </div>

      <div className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-transparent rounded-xl p-0">
            <ClientProfileHeader
              onPostBrief={handlePostBriefClick}
              savedProjectsCount={savedProjects.length}
              savedArchitectsCount={savedArchitects.length}
              designBriefsCount={0}
              editRef={editProfileRef}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
            />
            <DashboardTabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              showPostBrief={false}
              setShowPostBrief={setShowPostBrief}
              onPostBrief={handlePostBriefClick}
            />
          </div>
        </div>
      </div>

      {/* Notification Sidebar */}
      <NotificationSidebar
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        notifications={notifications}
        onViewContact={handleViewContact}
        onMarkRead={handleMarkRead}
        title="Notifications"
      />

      {/* Contact Details Modal */}
      {selectedContact && (
        <ContactDetailsModal
          contact={selectedContact}
          onClose={() => setSelectedContact(null)}
          onStatusChange={handleStatusChange}
        />
      )}

      {/* Post Brief Modal */}
      {showPostBrief && (
        <div className="fixed inset-0 bg-transparent backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="flex-shrink-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Post Design Brief
              </h2>
              <button
                onClick={() => setShowPostBrief(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              <PostBriefForm onBack={() => setShowPostBrief(false)} />
            </div>
          </div>
        </div>
      )}

      {/* Upgrade Subscription Modal — removed; now redirects to /pricing */}

      <Footer />
    </div>
  );
}

// export default ClientDash;
export default function ClientDash() {
  return <ClientDashContent />;
}
