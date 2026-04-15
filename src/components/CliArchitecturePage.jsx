// src/pages/ClientDash.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import Carousel from '../components/Carousel';
import CarouselBtn from '../components/CarouselBtn';
import { getArchitecturePage, updateArchitecturePage, createArchitecturePage } from '../api/architectureApi';

function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
}

function EmptyTemplate() {
  return {
    header: {
      greeting: 'Welcome to My Portfolio',
      subtitle: 'Professional Excellence in Every Project',
      introParagraphs: [
        'I specialize in delivering exceptional results through innovative solutions and dedicated service.',
        'With years of experience and a passion for excellence, I help clients achieve their goals through strategic thinking and meticulous execution.'
      ],
      headerImageBase64: '',
      profileImageBase64: ''
    },
    experience: [
      { 
        title: 'Senior Consultant', 
        location: 'ABC Corporation', 
        year: '2020-Present',
        description: 'Leading strategic initiatives and delivering impactful solutions',
        imageBase64: '' 
      }
    ],
    skills: [
      { title: 'Strategic Planning', category: 'Business', level: 'Expert', imageBase64: '' },
      { title: 'Project Management', category: 'Leadership', level: 'Advanced', imageBase64: '' },
      { title: 'Data Analysis', category: 'Technical', level: 'Proficient', imageBase64: '' }
    ],
    projects: [
      { 
        title: 'Digital Transformation Initiative', 
        location: 'Fortune 500 Client', 
        year: '2024',
        description: 'Led complete digital overhaul resulting in 40% efficiency gain',
        imageBase64: '' 
      }
    ],
    certifications: [
      { title: 'PMP Certification', location: 'PMI', year: '2023', imageBase64: '' }
    ],
    achievements: [
      { title: 'Excellence Award', location: 'Industry Association', year: '2024', imageBase64: '' }
    ],
    education: [
      { title: 'MBA', location: 'Harvard Business School', year: '2018', imageBase64: '' }
    ],
    services: [
      { title: 'Consulting', description: 'Strategic business consulting', imageBase64: '', icon: '💼' },
      { title: 'Analysis', description: 'Data-driven insights', imageBase64: '', icon: '📊' },
      { title: 'Training', description: 'Professional development', imageBase64: '', icon: '🎓' },
      { title: 'Strategy', description: 'Growth planning', imageBase64: '', icon: '🎯' }
    ],
    testimonials: [
      {
        name: 'John Smith',
        role: 'CEO, Tech Corp',
        text: 'Outstanding professional who delivered exceptional results beyond our expectations.',
        rating: 5,
        imageBase64: ''
      }
    ],
    moreInfo: { 
      Specialty: 'Business Strategy', 
      Industry: 'Technology & Finance', 
      Experience: '10+ Years',
      Website: 'www.yourwebsite.com' 
    },
    address: { 
      lines: [
        '123 Professional Plaza',
        'Business District, City 12345',
        'United States'
      ] 
    },
    contact: { 
      phone: '+1 (555) 123-4567', 
      email: 'contact@professional.com',
      linkedin: 'linkedin.com/in/yourprofile',
      twitter: '@yourhandle'
    },
    aboutMe: {
      title: 'About Me',
      content: 'Passionate professional dedicated to excellence and innovation. I bring a unique blend of technical expertise and strategic thinking to help clients achieve their most ambitious goals.',
      stats: [
        { label: 'Years Experience', value: '10+' },
        { label: 'Projects Completed', value: '150+' },
        { label: 'Client Satisfaction', value: '99%' },
        { label: 'Awards Won', value: '25+' }
      ]
    },
    callToAction: {
      title: 'Ready to Start Your Next Project?',
      subtitle: 'Let\'s work together to bring your vision to life',
      buttonText: 'Get In Touch',
      buttonLink: '#contact'
    }
  };
}

export default function ClientDash() {
  const { uid } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [docId, setDocId] = useState(null);
  const [error, setError] = useState(null);
  const [saveStatus, setSaveStatus] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  const getCurrentUserId = () => {
    const storedUid = localStorage.getItem('userId');
    if (storedUid) return storedUid;
    if (uid) return uid;
    const sessionId = 'user_' + Date.now();
    localStorage.setItem('userId', sessionId);
    return sessionId;
  };

  const currentUid = getCurrentUserId();

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await getArchitecturePage(currentUid);
        setPage(data);
        setDocId(data._id);
      } catch (err) {
        console.log('No existing page found, loading template');
        setPage(EmptyTemplate());
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [currentUid]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-700 text-lg font-medium">Loading your portfolio...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-100">
        <div className="text-center p-8 bg-white rounded-2xl shadow-2xl max-w-md">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Oops!</h2>
          <p className="text-red-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
          <p className="text-gray-600">No data available. Please refresh.</p>
        </div>
      </div>
    );
  }

  const toggleEdit = () => setEditMode(v => !v);

  async function handleImageChange(path, e) {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }
    const dataUrl = await readFileAsDataURL(file);
    handleTextChange(path, dataUrl);
  }

  function handleTextChange(path, value) {
    setPage(prev => {
      const copy = JSON.parse(JSON.stringify(prev));
      let cur = copy;
      for (let i = 0; i < path.length - 1; i++) {
        if (!cur[path[i]]) cur[path[i]] = {};
        cur = cur[path[i]];
      }
      cur[path[path.length - 1]] = value;
      return copy;
    });
  }

  function addItem(area, defaultItem) {
    setPage(prev => {
      const arr = [...(prev[area] || [])];
      arr.push(defaultItem);
      return { ...prev, [area]: arr };
    });
  }

  function removeItem(area, idx) {
    if (!confirm('Delete this item?')) return;
    setPage(prev => {
      const arr = [...(prev[area] || [])];
      arr.splice(idx, 1);
      return { ...prev, [area]: arr };
    });
  }

  async function savePage() {
    try {
      setSaveStatus('saving');
      if (docId) {
        const updated = await updateArchitecturePage(page, docId, currentUid);
        setPage(updated);
      } else {
        const created = await createArchitecturePage({ ...page, uid: currentUid }, currentUid);
        setPage(created);
        setDocId(created._id);
      }
      setEditMode(false);
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (err) {
      console.error('Save error:', err);
      setSaveStatus('error');
      alert('Error saving: ' + (err.message || err));
      setTimeout(() => setSaveStatus(''), 3000);
    }
  }

  function showImage(src, fallback) {
    return src || fallback;
  }

  // Hero Section
  const renderHero = () => (
    <div className="relative bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="absolute inset-0">
        <img
          src={showImage(page.header.headerImageBase64, "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80")}
          alt="header"
          className="w-full h-full object-cover opacity-30"
        />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            {editMode && (
              <div className="mb-4">
                <label className="block text-sm mb-2 bg-black/50 px-3 py-1 rounded">Upload Header Background:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(['header', 'headerImageBase64'], e)}
                  className="text-sm w-full bg-white/90 text-gray-800 rounded px-2 py-1"
                />
              </div>
            )}
            
            <input
              className="text-5xl lg:text-6xl font-bold w-full mb-4 bg-transparent border-b-2 border-transparent focus:border-white outline-none"
              value={page.header.greeting}
              onChange={(e) => handleTextChange(["header", "greeting"], e.target.value)}
              readOnly={!editMode}
              placeholder="Your Name"
            />
            
            <input
              className="text-2xl lg:text-3xl w-full mb-6 bg-transparent border-b border-transparent focus:border-white/50 outline-none text-blue-200"
              value={page.header.subtitle || ''}
              onChange={(e) => handleTextChange(["header", "subtitle"], e.target.value)}
              readOnly={!editMode}
              placeholder="Your Title or Tagline"
            />

            <div className="space-y-4 text-lg">
              {(page.header.introParagraphs || []).map((p, i) => (
                <textarea
                  key={i}
                  rows={2}
                  className="w-full bg-white/10 backdrop-blur-sm focus:outline-none resize-none border border-white/20 focus:border-white/50 rounded-xl p-4"
                  value={p}
                  onChange={(e) => {
                    const arr = [...page.header.introParagraphs];
                    arr[i] = e.target.value;
                    handleTextChange(["header", "introParagraphs"], arr);
                  }}
                  readOnly={!editMode}
                  placeholder="Introduction paragraph"
                />
              ))}
              
              {editMode && (
                <button
                  onClick={() => handleTextChange(["header", "introParagraphs"], [...(page.header.introParagraphs || []), "New paragraph"])}
                  className="text-sm text-blue-300 hover:text-white"
                >
                  + Add paragraph
                </button>
              )}
            </div>

            {!editMode && (
              <div className="mt-8 flex gap-4">
                <a href="#contact" className="px-8 py-4 bg-white text-blue-900 rounded-xl font-semibold hover:bg-blue-50 transition-all shadow-lg">
                  Get In Touch
                </a>
                <a href="#portfolio" className="px-8 py-4 bg-blue-600/30 backdrop-blur-sm border-2 border-white/50 rounded-xl font-semibold hover:bg-blue-600/50 transition-all">
                  View Work
                </a>
              </div>
            )}
          </div>

          <div className="flex justify-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-3xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <img
                src={showImage(page.header.profileImageBase64, "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80")}
                alt="profile"
                className="relative w-80 h-80 object-cover rounded-full border-8 border-white/20 shadow-2xl"
              />
              {editMode && (
                <div className="absolute bottom-4 right-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(['header', 'profileImageBase64'], e)}
                    className="opacity-0 absolute inset-0 cursor-pointer"
                  />
                  <div className="bg-white text-blue-900 px-4 py-2 rounded-full shadow-lg cursor-pointer">
                    📷 Change Photo
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // About Me Section
  const renderAboutMe = () => {
    const about = page.aboutMe || {};
    if (!editMode && !about.content) return null;

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="p-8 lg:p-12">
            <input
              className="text-4xl font-bold text-gray-800 mb-6 w-full border-b-2 border-transparent focus:border-blue-400 outline-none"
              value={about.title || 'About Me'}
              onChange={(e) => handleTextChange(['aboutMe', 'title'], e.target.value)}
              readOnly={!editMode}
            />
            
            <textarea
              className="w-full text-lg text-gray-600 leading-relaxed mb-8 border border-gray-200 focus:border-blue-400 outline-none rounded-xl p-4 resize-none"
              rows={4}
              value={about.content || ''}
              onChange={(e) => handleTextChange(['aboutMe', 'content'], e.target.value)}
              readOnly={!editMode}
              placeholder="Tell your story..."
            />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {(about.stats || []).map((stat, i) => (
                <div key={i} className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                  <input
                    className="text-3xl font-bold text-blue-600 mb-2 w-full text-center border-b border-transparent focus:border-blue-400 outline-none bg-transparent"
                    value={stat.value}
                    onChange={(e) => {
                      const arr = [...about.stats];
                      arr[i] = { ...arr[i], value: e.target.value };
                      handleTextChange(['aboutMe', 'stats'], arr);
                    }}
                    readOnly={!editMode}
                  />
                  <input
                    className="text-sm text-gray-600 w-full text-center border-b border-transparent focus:border-blue-400 outline-none bg-transparent"
                    value={stat.label}
                    onChange={(e) => {
                      const arr = [...about.stats];
                      arr[i] = { ...arr[i], label: e.target.value };
                      handleTextChange(['aboutMe', 'stats'], arr);
                    }}
                    readOnly={!editMode}
                  />
                  {editMode && (
                    <button
                      onClick={() => {
                        const arr = [...about.stats];
                        arr.splice(i, 1);
                        handleTextChange(['aboutMe', 'stats'], arr);
                      }}
                      className="text-red-500 text-xs mt-2"
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))}
              
              {editMode && (
                <button
                  onClick={() => {
                    const arr = [...(about.stats || [])];
                    arr.push({ label: 'New Stat', value: '0' });
                    handleTextChange(['aboutMe', 'stats'], arr);
                  }}
                  className="p-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-400 hover:border-blue-400 hover:text-blue-400"
                >
                  + Add Stat
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Enhanced Services Section
  const renderServices = () => (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 py-16" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Services I Offer</h2>
          <p className="text-xl text-gray-600">Comprehensive solutions tailored to your needs</p>
        </div>

        {editMode && (
          <div className="flex justify-center mb-6">
            <button
              onClick={() => addItem('services', { title: 'New Service', description: 'Description', imageBase64: '', icon: '⭐' })}
              className="px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 shadow-lg"
            >
              + Add Service
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {(page.services || []).map((s, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
              <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden">
                {s.imageBase64 ? (
                  <img src={s.imageBase64} alt={s.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <span className="text-6xl">{s.icon || '💼'}</span>
                  </div>
                )}
              </div>
              
              <div className="p-6">
                {editMode && (
                  <input
                    className="text-lg mb-2 w-full border rounded px-2 py-1"
                    value={s.icon || ''}
                    onChange={(e) => handleTextChange(['services', String(idx), 'icon'], e.target.value)}
                    placeholder="Emoji icon"
                  />
                )}
                
                <input
                  className="text-xl font-bold text-gray-800 mb-3 w-full border-b border-transparent focus:border-blue-400 outline-none"
                  value={s.title}
                  onChange={(e) => handleTextChange(['services', String(idx), 'title'], e.target.value)}
                  readOnly={!editMode}
                />
                
                <textarea
                  className="text-gray-600 w-full border border-transparent focus:border-blue-400 outline-none rounded resize-none"
                  rows={2}
                  value={s.description || ''}
                  onChange={(e) => handleTextChange(['services', String(idx), 'description'], e.target.value)}
                  readOnly={!editMode}
                  placeholder="Service description"
                />

                {editMode && (
                  <div className="mt-4 space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(['services', String(idx), 'imageBase64'], e)}
                      className="text-xs w-full"
                    />
                    <button
                      onClick={() => removeItem('services', idx)}
                      className="text-red-500 text-sm hover:underline"
                    >
                      Delete Service
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Enhanced Portfolio Sections
  const renderPortfolioSection = (title, dataKey, icon, defaultItem) => {
    const items = page[dataKey] || [];
    if (!editMode && items.length === 0) return null;

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id={dataKey}>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <span className="text-4xl">{icon}</span>
            {title}
          </h2>
          {editMode && (
            <button
              onClick={() => addItem(dataKey, defaultItem)}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-lg"
            >
              + Add {title.split(' ')[1]}
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
              {item.imageBase64 && (
                <div className="h-56 overflow-hidden">
                  <img
                    src={item.imageBase64}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              )}
              
              {editMode && (
                <div className="p-3 bg-gray-50 border-b">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange([dataKey, String(i), 'imageBase64'], e)}
                    className="text-xs w-full"
                  />
                </div>
              )}
              
              <div className="p-6">
                <input
                  className="text-xl font-bold text-gray-800 w-full mb-2 border-b border-transparent focus:border-blue-400 outline-none"
                  value={item.title}
                  onChange={(e) => handleTextChange([dataKey, String(i), 'title'], e.target.value)}
                  readOnly={!editMode}
                />
                
                <input
                  className="text-sm text-gray-600 w-full mb-2 border-b border-transparent focus:border-blue-400 outline-none"
                  value={item.location || item.category || ''}
                  onChange={(e) => handleTextChange([dataKey, String(i), item.location !== undefined ? 'location' : 'category'], e.target.value)}
                  readOnly={!editMode}
                />
                
                <input
                  className="text-blue-600 font-semibold w-full mb-3 border-b border-transparent focus:border-blue-400 outline-none"
                  value={item.year || item.level || ''}
                  onChange={(e) => handleTextChange([dataKey, String(i), item.year !== undefined ? 'year' : 'level'], e.target.value)}
                  readOnly={!editMode}
                />

                {item.description !== undefined && (
                  <textarea
                    className="text-gray-600 text-sm w-full border border-gray-200 focus:border-blue-400 outline-none rounded-lg p-2 resize-none"
                    rows={2}
                    value={item.description || ''}
                    onChange={(e) => handleTextChange([dataKey, String(i), 'description'], e.target.value)}
                    readOnly={!editMode}
                    placeholder="Description"
                  />
                )}

                {editMode && (
                  <button
                    onClick={() => removeItem(dataKey, i)}
                    className="mt-4 text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg transition-all"
                  >
                    🗑️ Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Testimonials Section
  const renderTestimonials = () => {
    const testimonials = page.testimonials || [];
    if (!editMode && testimonials.length === 0) return null;

    return (
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Client Testimonials</h2>
            <p className="text-xl text-gray-600">What people say about working with me</p>
          </div>

          {editMode && (
            <div className="flex justify-center mb-8">
              <button
                onClick={() => addItem('testimonials', { name: 'Client Name', role: 'Position', text: 'Testimonial text...', rating: 5, imageBase64: '' })}
                className="px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 shadow-lg"
              >
                + Add Testimonial
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all">
                <div className="flex items-center mb-4">
                  <img
                    src={showImage(t.imageBase64, "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop")}
                    alt={t.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div className="flex-1">
                    <input
                      className="font-bold text-gray-800 w-full border-b border-transparent focus:border-blue-400 outline-none"
                      value={t.name}
                      onChange={(e) => handleTextChange(['testimonials', String(i), 'name'], e.target.value)}
                      readOnly={!editMode}
                    />
                    <input
                      className="text-sm text-gray-600 w-full border-b border-transparent focus:border-blue-400 outline-none"
                      value={t.role}
                      onChange={(e) => handleTextChange(['testimonials', String(i), 'role'], e.target.value)}
                      readOnly={!editMode}
                    />
                  </div>
                </div>

                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map(star => (
                    <span key={star} className={`text-2xl ${star <= (t.rating || 5) ? 'text-yellow-400' : 'text-gray-300'}`}>
                      ⭐
                    </span>
                  ))}
                  {editMode && (
                    <input
                      type="number"
                      min="1"
                      max="5"
                      className="ml-2 w-16 border rounded px-2"
                      value={t.rating || 5}
                      onChange={(e) => handleTextChange(['testimonials', String(i), 'rating'], parseInt(e.target.value))}
                    />
                  )}
                </div>

                <textarea
                  className="text-gray-600 italic w-full border border-gray-200 focus:border-blue-400 outline-none rounded-lg p-3 resize-none"
                  rows={4}
                  value={t.text}
                  onChange={(e) => handleTextChange(['testimonials', String(i), 'text'], e.target.value)}
                  readOnly={!editMode}
                  placeholder="Testimonial text..."
                />

                {editMode && (
                  <div className="mt-4 space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(['testimonials', String(i), 'imageBase64'], e)}
                      className="text-xs w-full"
                    />
                    <button
                      onClick={() => removeItem('testimonials', i)}
                      className="text-red-500 text-sm hover:underline"
                    >
                      Delete Testimonial
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Contact Section
  const renderContact = () => (
    <div className="bg-white py-16" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Get In Touch</h2>
          <p className="text-xl text-gray-600">Let's discuss how I can help you achieve your goals</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 text-white shadow-2xl">
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">📧</div>
                <div className="flex-1">
                  <p className="text-sm opacity-80">Email</p>
                  <input
                    className="text-lg font-medium w-full bg-transparent border-b border-white/30 focus:border-white outline-none"
                    value={page.contact.email}
                    onChange={(e) => handleTextChange(['contact', 'email'], e.target.value)}
                    readOnly={!editMode}
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">📞</div>
                <div className="flex-1">
                  <p className="text-sm opacity-80">Phone</p>
                  <input
                    className="text-lg font-medium w-full bg-transparent border-b border-white/30 focus:border-white outline-none"
                    value={page.contact.phone}
                    onChange={(e) => handleTextChange(['contact', 'phone'], e.target.value)}
                    readOnly={!editMode}
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">💼</div>
                <div className="flex-1">
                  <p className="text-sm opacity-80">LinkedIn</p>
                  <input
                    className="text-lg font-medium w-full bg-transparent border-b border-white/30 focus:border-white outline-none"
                    value={page.contact.linkedin || ''}
                    onChange={(e) => handleTextChange(['contact', 'linkedin'], e.target.value)}
                    readOnly={!editMode}
                    placeholder="linkedin.com/in/yourprofile"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">🐦</div>
                <div className="flex-1">
                  <p className="text-sm opacity-80">Twitter</p>
                  <input
                    className="text-lg font-medium w-full bg-transparent border-b border-white/30 focus:border-white outline-none"
                    value={page.contact.twitter || ''}
                    onChange={(e) => handleTextChange(['contact', 'twitter'], e.target.value)}
                    readOnly={!editMode}
                    placeholder="@yourhandle"
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-white/20">
                <p className="text-sm opacity-80 mb-2">Address</p>
                {(page.address.lines || []).map((line, idx) => (
                  <div key={idx} className="flex gap-2 mb-2">
                    <input
                      className="flex-1 bg-white/10 border border-white/20 focus:border-white outline-none rounded-lg px-3 py-2"
                      value={line}
                      onChange={(e) => {
                        const arr = [...page.address.lines];
                        arr[idx] = e.target.value;
                        handleTextChange(['address', 'lines'], arr);
                      }}
                      readOnly={!editMode}
                    />
                    {editMode && (
                      <button
                        onClick={() => {
                          const arr = [...page.address.lines];
                          arr.splice(idx, 1);
                          handleTextChange(['address', 'lines'], arr);
                        }}
                        className="text-red-300"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                {editMode && (
                  <button
                    onClick={() => handleTextChange(['address', 'lines'], [...page.address.lines, ''])}
                    className="text-sm text-white/70 hover:text-white"
                  >
                    + Add line
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-gray-50 rounded-3xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Professional Details</h3>
            
            <div className="space-y-4">
              {Object.entries(page.moreInfo || {}).map(([k, v], idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
                  <input
                    className="font-semibold text-gray-700 w-1/3 border-b border-transparent focus:border-blue-400 outline-none"
                    value={k}
                    onChange={(e) => {
                      if (!editMode) return;
                      const newInfo = {};
                      Object.keys(page.moreInfo).forEach(key => {
                        newInfo[key === k ? e.target.value : key] = page.moreInfo[key];
                      });
                      handleTextChange(['moreInfo'], newInfo);
                    }}
                    readOnly={!editMode}
                  />
                  <input
                    className="flex-1 text-gray-600 border-b border-transparent focus:border-blue-400 outline-none"
                    value={v}
                    onChange={(e) => {
                      const copy = { ...page.moreInfo };
                      copy[k] = e.target.value;
                      handleTextChange(['moreInfo'], copy);
                    }}
                    readOnly={!editMode}
                  />
                  {editMode && (
                    <button
                      onClick={() => {
                        const copy = { ...page.moreInfo };
                        delete copy[k];
                        handleTextChange(['moreInfo'], copy);
                      }}
                      className="text-red-500"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}

              {editMode && (
                <button
                  className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-blue-400 hover:text-blue-400"
                  onClick={() => {
                    const key = prompt('Field name:');
                    if (!key) return;
                    const copy = { ...page.moreInfo };
                    copy[key] = '';
                    handleTextChange(['moreInfo'], copy);
                  }}
                >
                  + Add Info Field
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Call to Action Section
  const renderCTA = () => {
    const cta = page.callToAction || {};
    if (!editMode && !cta.title) return null;

    return (
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <input
            className="text-4xl lg:text-5xl font-bold text-white mb-6 w-full text-center bg-transparent border-b-2 border-transparent focus:border-white outline-none"
            value={cta.title || ''}
            onChange={(e) => handleTextChange(['callToAction', 'title'], e.target.value)}
            readOnly={!editMode}
            placeholder="Call to Action Title"
          />
          
          <input
            className="text-xl text-white/90 mb-8 w-full text-center bg-transparent border-b border-transparent focus:border-white/50 outline-none"
            value={cta.subtitle || ''}
            onChange={(e) => handleTextChange(['callToAction', 'subtitle'], e.target.value)}
            readOnly={!editMode}
            placeholder="Subtitle"
          />

          <div className="flex gap-4 justify-center">
            <input
              className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg shadow-2xl hover:bg-blue-50 transition-all text-center"
              value={cta.buttonText || 'Get Started'}
              onChange={(e) => handleTextChange(['callToAction', 'buttonText'], e.target.value)}
              readOnly={!editMode}
            />
            {editMode && (
              <input
                className="px-4 py-2 bg-white/20 text-white rounded-xl border border-white/50"
                value={cta.buttonLink || '#contact'}
                onChange={(e) => handleTextChange(['callToAction', 'buttonLink'], e.target.value)}
                placeholder="Button link"
              />
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Sticky Edit Bar */}
      {editMode && (
        <div className="fixed top-0 left-0 right-0 bg-gray-900 text-white px-6 py-4 shadow-2xl z-50 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">✏️ Editing Mode</h2>
            <p className="text-sm text-gray-400">Make your changes and save when ready</p>
          </div>
          
          <div className="flex gap-3 items-center">
            {saveStatus === 'saving' && <span className="text-yellow-400">💾 Saving...</span>}
            {saveStatus === 'saved' && <span className="text-green-400">✓ Saved!</span>}
            {saveStatus === 'error' && <span className="text-red-400">✗ Error</span>}
            
            <button
              onClick={toggleEdit}
              className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all"
            >
              👁️ Preview
            </button>
            
            <button
              onClick={savePage}
              disabled={saveStatus === 'saving'}
              className="px-8 py-2 bg-green-600 hover:bg-green-500 rounded-lg transition-all font-semibold disabled:opacity-50"
            >
              💾 Save All Changes
            </button>
          </div>
        </div>
      )}

      {/* Top Bar for Preview Mode */}
      {!editMode && (
        <div className="bg-white border-b sticky top-0 z-40 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-800">{page.header.greeting}</h1>
              <p className="text-sm text-gray-500">User: {currentUid}</p>
            </div>
            
            <button
              onClick={toggleEdit}
              className="px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium shadow-lg"
            >
              ✏️ Edit Portfolio
            </button>
          </div>
        </div>
      )}

      <div className={editMode ? 'pt-24' : ''}>
        {/* Hero Section */}
        {renderHero()}

        {/* About Me */}
        {renderAboutMe()}

        {/* Services */}
        {renderServices()}

        {/* Portfolio Sections */}
        {renderPortfolioSection(
          '💼 Professional Experience',
          'experience',
          '💼',
          { title: 'Job Title', location: 'Company', year: '2024', description: 'Key achievements and responsibilities', imageBase64: '' }
        )}

        {renderPortfolioSection(
          '🚀 Featured Projects',
          'projects',
          '🚀',
          { title: 'Project Name', location: 'Client', year: '2024', description: 'Project description and outcomes', imageBase64: '' }
        )}

        {renderPortfolioSection(
          '🎯 Core Skills',
          'skills',
          '🎯',
          { title: 'Skill Name', category: 'Category', level: 'Expert', imageBase64: '' }
        )}

        {renderPortfolioSection(
          '🏆 Certifications',
          'certifications',
          '🏆',
          { title: 'Certification', location: 'Organization', year: '2024', imageBase64: '' }
        )}

        {renderPortfolioSection(
          '⭐ Achievements',
          'achievements',
          '⭐',
          { title: 'Achievement', location: 'Organization', year: '2024', description: 'Achievement details', imageBase64: '' }
        )}

        {renderPortfolioSection(
          '🎓 Education',
          'education',
          '🎓',
          { title: 'Degree', location: 'Institution', year: '2024', imageBase64: '' }
        )}

        {/* Testimonials */}
        {renderTestimonials()}

        {/* Carousels */}
        <div className="py-8 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Carousel />
          </div>
        </div>
        
        <div className="py-8 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <CarouselBtn />
          </div>
        </div>

        {/* Contact Section */}
        {renderContact()}

        {/* Call to Action */}
        {renderCTA()}

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} {page.header.greeting}. All rights reserved.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Built with passion and dedication
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}