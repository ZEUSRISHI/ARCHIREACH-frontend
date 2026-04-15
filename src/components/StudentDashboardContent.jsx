import React, { useState, useEffect } from 'react';
import { Pencil, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const API_BASE = "https://archireach.onrender.com/api/students";

export default function StudentDashboardContent({ studentId, showToast }) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [studentInfo, setStudentInfo] = useState({
    name: '',
    field: '',
  });

  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [welcomeText, setWelcomeText] = useState('');
  const [cardsData, setCardsData] = useState([]);

  // Fetch student data on mount
  useEffect(() => {
    fetchData();
  }, [studentId]);

  const fetchData = async () => {
    try {
      const res = await fetch(`${API_BASE}/${studentId}`);
      const data = await res.json();
      
      if (data.success) {
        setStudentInfo({ 
          name: data.data.name, 
          field: data.data.field || '' 
        });
        setWelcomeMessage(data.data.welcomeMessage || '');
        setWelcomeText(data.data.welcomeText || '');
        setCardsData(data.data.cardsData || []);
      } else {
        showToast(data.message || 'Failed to load dashboard', 'error');
      }
    } catch (err) {
      console.error('Error fetching student data:', err);
      showToast('Error loading dashboard data', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Update a card field locally
  const updateCard = (index, key, value) => {
    const newCards = [...cardsData];
    newCards[index][key] = value;
    setCardsData(newCards);
  };

  const inputStyle =
    'w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition';

  const handleCardClick = (card) => {
    if (editing) return;

    if (card.type === 'download' && card.fileUrl) {
      const link = document.createElement('a');
      link.href = card.fileUrl;
      link.download = card.fileUrl.split('/').pop();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (card.type === 'link' && card.linkUrl) {
      navigate(card.linkUrl);
    }
  };

  // Save changes to backend
  const handleSave = async () => {
    // Validation
    const missingFields = [];
    if (!studentInfo.name.trim()) missingFields.push('Name');
    if (!studentInfo.field.trim()) missingFields.push('Field');
    if (!welcomeMessage.trim()) missingFields.push('Welcome Message');
    if (!welcomeText.trim()) missingFields.push('Welcome Text');

    if (missingFields.length > 0) {
      showToast(
        `Please complete the following fields: ${missingFields.join(', ')}`,
        'error'
      );
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`${API_BASE}/${studentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: studentInfo.name,
          field: studentInfo.field,
          welcomeMessage,
          welcomeText,
          cardsData,
        }),
      });

      const data = await res.json();

      if (data.success) {
        showToast('Dashboard updated successfully! ✓', 'success');
        setEditing(false);
      } else {
        showToast(data.message || 'Failed to update dashboard', 'error');
      }
    } catch (err) {
      console.error('Error saving student data:', err);
      showToast('Error saving dashboard data', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditing(false);
    fetchData(); // Reload original data
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="text-gray-500 mt-4">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-8">
      {/* Header with Edit/Save */}
      <div className="flex justify-between items-center mb-6 md:mb-8">
        {!editing ? (
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {studentInfo.name}
            </h1>
            <p className="text-lg md:text-xl text-gray-600">
              {studentInfo.field}
            </p>
          </div>
        ) : (
          <div className="space-y-2 w-full max-w-md">
            <input
              className={`text-3xl md:text-4xl font-bold text-gray-900 ${inputStyle}`}
              placeholder="Your Name *"
              value={studentInfo.name}
              onChange={(e) =>
                setStudentInfo({ ...studentInfo, name: e.target.value })
              }
            />
            <input
              className={`text-lg md:text-xl text-gray-600 ${inputStyle}`}
              placeholder="Your Field/Major *"
              value={studentInfo.field}
              onChange={(e) =>
                setStudentInfo({ ...studentInfo, field: e.target.value })
              }
            />
          </div>
        )}

        <div className="flex gap-2">
          {editing && (
            <button
              onClick={handleCancel}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600 transition disabled:opacity-50"
            >
              Cancel
            </button>
          )}
          <button
            onClick={() => {
              if (editing) {
                handleSave();
              } else {
                setEditing(true);
              }
            }}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition disabled:opacity-50"
          >
            {editing ? <Save size={18} /> : <Pencil size={18} />}
            {saving ? 'Saving...' : editing ? 'Save' : 'Edit'}
          </button>
        </div>
      </div>

      {/* Welcome Card */}
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-6">
        {editing ? (
          <div className="space-y-4">
            <input
              className={`font-bold text-gray-800 ${inputStyle}`}
              placeholder="Welcome Message *"
              value={welcomeMessage}
              onChange={(e) => setWelcomeMessage(e.target.value)}
            />
            <textarea
              className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-700 transition`}
              rows={4}
              placeholder="Welcome Text *"
              value={welcomeText}
              onChange={(e) => setWelcomeText(e.target.value)}
            />
          </div>
        ) : (
          <div className="space-y-2 text-gray-700">
            <p className="font-bold text-lg">{welcomeMessage}</p>
            <p className="leading-relaxed">{welcomeText}</p>
          </div>
        )}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cardsData.map((card, index) => (
          <div
            key={index}
            className={`bg-white rounded-2xl shadow-xl p-6 md:p-10 transition ${
              !editing ? 'hover:shadow-2xl cursor-pointer hover:bg-gray-50' : ''
            }`}
            onClick={() => handleCardClick(card)}
          >
            <div className="text-center space-y-3">
              <div
                className={`w-16 h-16 md:w-20 md:h-20 ${
                  card.bgColor || 'bg-blue-500'
                } rounded-2xl flex items-center justify-center mx-auto`}
              >
                <span className="text-3xl">
                  {card.type === 'download' ? '📄' : '🔗'}
                </span>
              </div>
              {editing ? (
                <>
                  <input
                    className={`text-xl md:text-2xl font-bold text-gray-900 text-center ${inputStyle}`}
                    placeholder="Card Title"
                    value={card.title}
                    onChange={(e) =>
                      updateCard(index, 'title', e.target.value)
                    }
                  />
                  <textarea
                    className={`text-gray-600 text-sm w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none transition`}
                    rows={2}
                    placeholder="Card Description"
                    value={card.description}
                    onChange={(e) =>
                      updateCard(index, 'description', e.target.value)
                    }
                  />
                  <select
                    className={inputStyle}
                    value={card.type}
                    onChange={(e) => updateCard(index, 'type', e.target.value)}
                  >
                    <option value="link">Link</option>
                    <option value="download">Download</option>
                  </select>
                  {card.type === 'download' ? (
                    <input
                      className={inputStyle}
                      placeholder="File URL"
                      value={card.fileUrl || ''}
                      onChange={(e) =>
                        updateCard(index, 'fileUrl', e.target.value)
                      }
                    />
                  ) : (
                    <input
                      className={inputStyle}
                      placeholder="Link URL"
                      value={card.linkUrl || ''}
                      onChange={(e) =>
                        updateCard(index, 'linkUrl', e.target.value)
                      }
                    />
                  )}
                </>
              ) : (
                <>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{card.description}</p>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}