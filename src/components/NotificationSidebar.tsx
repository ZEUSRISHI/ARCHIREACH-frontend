import { useState } from "react";
import { Bell, X, Phone } from "lucide-react";

interface Contact {
  id: string;
  userName: string;
  userEmail: string;
  userPhone?: string;
  message: string;
  query?: string;
  timestamp: string | Date;
  status: 'new' | 'read' | 'responded';
}

interface ContactNotificationItemProps {
  contact: Contact;
  onView: (contact: Contact) => void;
  onMarkRead: (id: string) => void;
}

const ContactNotificationItem = ({ contact, onView, onMarkRead }: ContactNotificationItemProps) => {
  const getStatusColor = (status: Contact['status']) => {
    switch (status) {
      case 'new': return 'bg-blue-100 border-blue-300 text-blue-800';
      case 'read': return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'responded': return 'bg-green-100 border-green-300 text-green-800';
      default: return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const formatTime = (timestamp: string | Date) => {
    const now = new Date();
    const contactTime = new Date(timestamp);
    const diffMs = now.getTime() - contactTime.getTime();
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
            {contact.userName ? contact.userName.charAt(0).toUpperCase() : 'U'}
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{contact.userName || 'Unknown User'}</h4>
            <p className="text-xs text-gray-500">{contact.userEmail || 'No email provided'}</p>
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

interface NotificationSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Contact[];
  onViewContact: (contact: Contact) => void;
  onMarkRead: (id: string) => void;
  title?: string;
}

export const NotificationSidebar = ({
  isOpen,
  onClose,
  notifications,
  onViewContact,
  onMarkRead,
  title = "Contact Requests"
}: NotificationSidebarProps) => {
  const [filter, setFilter] = useState('all');

  const filteredNotifications = notifications.filter((n: Contact) => {
    if (filter === 'all') return true;
    return n.status === filter;
  });

  const newCount = notifications.filter((n: Contact) => n.status === 'new').length;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/25 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex flex-col h-full">
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <Bell className="w-6 h-6" />
                <h2 className="text-xl font-bold">{title}</h2>
              </div>
              <button
                onClick={onClose}
                aria-label="Close notifications"
                title="Close notifications"
                className="text-white hover:bg-purple-800 rounded-lg p-2 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            {newCount > 0 && (
              <p className="text-purple-100 text-sm">
                {newCount} new contact request{newCount !== 1 ? 's' : ''}
              </p>
            )}
          </div>

          <div className="px-6 py-3 bg-gray-50 border-b">
            <div className="flex gap-2">
              {['all', 'new', 'read', 'responded'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status as any)}
                  className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors ${filter === status
                    ? 'bg-purple-600 text-white'
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
              filteredNotifications.map((notification: Contact) => (
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
