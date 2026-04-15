import { useState, useEffect } from "react";
import { Bell, X, Mail, Phone, User, CheckCircle, AlertCircle } from "lucide-react";
import FPostAdd from "../components/FPostAdd";
import Header from "../components/Header";
import VerificationForm from "./VerificationForm";

const API_BASE = "https://archireach.onrender.com/api/fjobs";

// Contact Notification Item Component
const ContactNotificationItem = ({ contact, onView, onMarkRead }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-100 border-blue-300 text-blue-800';
      case 'read': return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'responded': return 'bg-green-100 border-green-300 text-green-800';
      default: return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const contactTime = new Date(timestamp);
    const diffMs = now - contactTime;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <div
      className={`border-2 rounded-lg p-4 mb-3 transition-all hover:shadow-md cursor-pointer ${contact.status === 'new' ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'
        }`}
      onClick={() => onView(contact)}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
            {contact.userName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{contact.userName}</h4>
            <p className="text-xs text-gray-500">{contact.userEmail}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(contact.status)}`}>
            {contact.status}
          </span>
          <span className="text-xs text-gray-500">{formatTime(contact.timestamp)}</span>
        </div>
      </div>

      <p className="text-sm text-gray-700 line-clamp-2 mb-2">{contact.message}</p>

      {contact.query && (
        <p className="text-xs text-blue-600 italic mb-1">Query: {contact.query.substring(0, 50)}{contact.query.length > 50 ? '...' : ''}</p>
      )}

      {contact.userPhone && (
        <p className="text-xs text-gray-500 flex items-center gap-1">
          <Phone className="w-3 h-3" />
          {contact.userPhone}
        </p>
      )}

      {contact.status === 'new' && (
        <div className="mt-2 flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMarkRead(contact.id);
            }}
            className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
          >
            Mark as Read
          </button>
        </div>
      )}
    </div>
  );
};

// Contact Details Modal
const ContactDetailsModal = ({ contact, onClose, onStatusChange }) => {
  if (!contact) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl">
          <h2 className="text-xl font-bold text-gray-900">Contact Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${contact.status === 'new' ? 'bg-blue-100 text-blue-800' :
                contact.status === 'read' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
              }`}>
              {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
            </span>
            <span className="text-sm text-gray-500">
              {new Date(contact.timestamp).toLocaleString()}
            </span>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <h3 className="font-semibold text-gray-900 mb-2">Contact Information</h3>

            <div className="flex items-center space-x-3">
              <User className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Name</p>
                <p className="font-medium text-gray-900">{contact.userName}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <a href={`mailto:${contact.userEmail}`} className="font-medium text-blue-600 hover:underline">
                  {contact.userEmail}
                </a>
              </div>
            </div>

            {contact.userPhone && (
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <a href={`tel:${contact.userPhone}`} className="font-medium text-blue-600 hover:underline">
                    {contact.userPhone}
                  </a>
                </div>
              </div>
            )}
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Message</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{contact.message}</p>
          </div>

          {contact.query && (
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Additional Query</h3>
              <p className="text-gray-700 whitespace-pre-wrap">{contact.query}</p>
            </div>
          )}

          <div className="flex gap-2">
            <button
              onClick={() => onStatusChange(contact.id, 'read')}
              disabled={contact.status !== 'new'}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${contact.status === 'new'
                  ? 'bg-yellow-600 text-white hover:bg-yellow-700'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
            >
              <AlertCircle className="w-4 h-4" />
              Mark as Read
            </button>
            <button
              onClick={() => onStatusChange(contact.id, 'responded')}
              disabled={contact.status === 'responded'}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${contact.status !== 'responded'
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
            >
              <CheckCircle className="w-4 h-4" />
              Mark as Responded
            </button>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold text-gray-900 mb-3">Quick Actions</h3>
            <div className="flex gap-2">
              <a
                href={`mailto:${contact.userEmail}?subject=Re: Your Inquiry&body=Dear ${contact.userName},%0D%0A%0D%0A`}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center text-sm font-medium"
              >
                Reply via Email
              </a>
              {contact.userPhone && (
                <a
                  href={`tel:${contact.userPhone}`}
                  className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-center text-sm font-medium"
                >
                  Call Now
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Notification Sidebar Component
const NotificationSidebar = ({ isOpen, onClose, notifications, onViewContact, onMarkRead }) => {
  const [filter, setFilter] = useState('all');

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'all') return true;
    return n.status === filter;
  });

  const newCount = notifications.filter(n => n.status === 'new').length;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex flex-col h-full">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <Bell className="w-6 h-6" />
                <h2 className="text-xl font-bold">Contact Requests</h2>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:bg-blue-800 rounded-lg p-2 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            {newCount > 0 && (
              <p className="text-blue-100 text-sm">
                {newCount} new contact request{newCount !== 1 ? 's' : ''}
              </p>
            )}
          </div>

          <div className="px-6 py-3 bg-gray-50 border-b">
            <div className="flex gap-2">
              {['all', 'new', 'read', 'responded'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors ${filter === status
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                    }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                  {status === 'new' && newCount > 0 && (
                    <span className="ml-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                      {newCount}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-12">
                <Bell className="w-16 h-16 mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500 font-medium">No contact requests</p>
                <p className="text-sm text-gray-400 mt-1">
                  {filter === 'all'
                    ? "You haven't received any contact requests yet"
                    : `No ${filter} contact requests`
                  }
                </p>
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <ContactNotificationItem
                  key={notification.id}
                  contact={notification}
                  onView={onViewContact}
                  onMarkRead={onMarkRead}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default function FProfilePage({ currentUserId, viewMode = false }) {
  const [isPostOpen, setPostOpen] = useState(false);
  const [isVerificationOpen, setVerificationOpen] = useState(false);
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [firmData, setFirmData] = useState(null);
  const [newContactCount, setNewContactCount] = useState(0);

  useEffect(() => {
    if (!currentUserId) return;

    // Fetch contact requests based on userUID
    const fetchContacts = async () => {
      try {
        const userUID = currentUserId;
        const response = await fetch(`https://archireach.onrender.com/api/contact/requests?userUID=${userUID}`, {
          headers: {
            'x-user-uid': userUID,
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            // Transform contact queries to notification format
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
            setNewContactCount(contacts.filter(c => c.status === 'new').length);
          }
        }
      } catch (err) {
        console.error('Error fetching contacts:', err);
      }
    };

    fetchContacts();

    // Refresh contacts every 30 seconds
    const interval = setInterval(fetchContacts, 30000);

    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }

    return () => clearInterval(interval);
  }, [currentUserId]);

  const handleViewContact = async (contact) => {
    setSelectedContact(contact);
    if (contact.status === 'new') {
      await handleMarkRead(contact.id);
    }
  };

  const handleMarkRead = async (contactId) => {
    try {
      const userUID = currentUserId;
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
        setNewContactCount(prev => Math.max(0, prev - 1));
      }
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const handleStatusChange = async (contactId, status) => {
    try {
      const userUID = currentUserId;
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
        // Update new contact count
        if (status === 'read' || status === 'closed') {
          setNewContactCount(prev => Math.max(0, prev - 1));
        }
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  // Remove duplicate newContactCount calculation - already using state

  return (
    <div className="bg-gray-50">
      <Header />

      <div className="w-full bg-gradient-to-r from-gray-900 to-gray-800 h-28 relative shadow-md">
        <div className="absolute top-12 left-30 flex items-end">
          <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden hover:scale-105 transform transition">
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <img
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23e5e7eb'/%3E%3Ccircle cx='50' cy='40' r='15' fill='%239ca3af'/%3E%3Cellipse cx='50' cy='95' rx='30' ry='25' fill='%239ca3af'/%3E%3C/svg%3E"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="ml-4 mb-2 text-gray-50">
            <div className="text-2xl font-semibold">Hi 👋</div>
            <div className="text-sm text-gray-300">
              Welcome to your firm dashboard
            </div>
          </div>
        </div>
      </div>

      <div className="relative max-w-6xl mx-auto  bottom-6   px-4 flex justify-end items-center mt-0 pb-4 space-x-3">
        {!viewMode && (
          <button
            onClick={() => setPostOpen(true)}
            className="px-5 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            + Post Jobs
          </button>
        )}

        <button
          onClick={() => setNotificationOpen(true)}
          className="relative px-5 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition flex items-center gap-2"
        >
          <Bell className="w-5 h-5" />
          Notification
          {newContactCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
              {newContactCount}
            </span>
          )}
        </button>

        <button className="px-5 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
          Features
        </button>

        {!viewMode && (
          <button
            onClick={() => setVerificationOpen(true)}
            className="px-5 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition"
          >
            Verification Form
          </button>
        )}
      </div>

      <FPostAdd
        isOpen={isPostOpen}
        onClose={() => setPostOpen(false)}
        onSave={() => { }}
      />

      {isVerificationOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl p-6 relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 font-bold text-xl"
              onClick={() => setVerificationOpen(false)}
            >
              &times;
            </button>
            <VerificationForm />
          </div>
        </div>
      )}

      <NotificationSidebar
        isOpen={isNotificationOpen}
        onClose={() => setNotificationOpen(false)}
        notifications={notifications}
        onViewContact={handleViewContact}
        onMarkRead={handleMarkRead}
      />

      {selectedContact && (
        <ContactDetailsModal
          contact={selectedContact}
          onClose={() => setSelectedContact(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}
