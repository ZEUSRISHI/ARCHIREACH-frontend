import { X, Mail, Phone, User, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Contact {
  id: string;
  userName: string;
  userEmail: string;
  userPhone?: string;
  message: string;
  query?: string;
  timestamp: string | Date;
  status: 'new' | 'read' | 'responded';
  userId?: string;
}

interface ContactDetailsModalProps {
  contact: Contact | null;
  onClose: () => void;
  onStatusChange: (id: string, status: Contact['status']) => void;
}

export const ContactDetailsModal = ({ contact, onClose, onStatusChange }: ContactDetailsModalProps) => {
  const navigate = useNavigate();
  if (!contact) return null;

  const handleViewFirmDashboard = () => {
    if (contact.userId) {
      sessionStorage.setItem("viewUserUID", contact.userId);
      sessionStorage.setItem("viewMode", "true");
      navigate("/pages/blog/FirmProfile");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl text-black">
          <h2 className="text-xl font-bold ">Contact Details</h2>
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
                <p className="text-sm font-medium text-gray-900">{contact.userName}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <a href={`mailto:${contact.userEmail}`} className="text-sm font-medium text-blue-600 hover:underline">
                  {contact.userEmail}
                </a>
              </div>
            </div>

            {contact.userPhone && (
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <a href={`tel:${contact.userPhone}`} className="text-sm font-medium text-blue-600 hover:underline">
                    {contact.userPhone}
                  </a>
                </div>
              </div>
            )}

            {contact.userId && (
              <div className="pt-2">
                <button
                  onClick={handleViewFirmDashboard}
                  className="w-full bg-[#7a6beb] text-white px-4 py-2.5 rounded-lg hover:bg-[#6c5fe0] transition-all flex items-center justify-center gap-2 font-semibold shadow-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Firm Dashboard
                </button>
              </div>
            )}
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Message</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{contact.message}</p>
            </div>
          </div>

          {contact.query && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Query</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{contact.query}</p>
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-4 border-t">
            <button
              onClick={() => onStatusChange(contact.id, 'read')}
              className="flex-1 bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors text-sm font-medium"
            >
              Mark as Read
            </button>
            <button
              onClick={() => onStatusChange(contact.id, 'responded')}
              className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
            >
              Mark as Responded
            </button>
          </div>

          <div className="flex gap-3">
            <a
              href={`mailto:${contact.userEmail}`}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center text-sm font-medium flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Reply via Email
            </a>
            {contact.userPhone && (
              <a
                href={`tel:${contact.userPhone}`}
                className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-center text-sm font-medium flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
