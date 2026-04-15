// Enhanced Architecture Page with Backend Integration
import React, { useEffect, useState, useRef, useImperativeHandle } from "react";
import portfolioAPI from '../api/portfolioApi';
import { useNavigate } from "react-router-dom";
import { FirmProfileHeader } from "./FirmProfileHeader";
import { Bookmark, Heart } from "lucide-react";
import { useEditContext } from "../context/EditContext";
import { useSubscription } from "../context/SubscriptionContext";
import { toast } from "react-toastify";
import awardImage from '../assets/award.jpg';
import mediaImage from '../assets/media.jpg';
import publicationsImage from '../assets/publications.jpg';

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
      greeting: 'Alexandra Chen',
      title: 'Principal Architect & Studio Director',
      introParagraphs: [
        'Expert in sustainable urban design and innovative residential projects with over 15 years of experience creating spaces that harmonize with their environment while pushing the boundaries of modern architecture.'
      ],
      headerImageBase64: ''
    },
    projectCategories: [
      { name: 'Architecture', key: 'architecture' },
      { name: 'Interior', key: 'interior' },
      { name: 'Residential', key: 'residential' },
      { name: 'Commercial', key: 'commercial' }
    ],
    projects: {
      architecture: [
        {
          title: 'Zenith Tower',
          description: 'A state-of-the-art commercial skyscraper that redefines the skyline with its eco-friendly design and cutting-edge technology.',
          location: 'Downtown Singapore',
          year: '2024',
          imageBase64: '',
          architects: 'Chen Architecture Studio',
          area: '15,000 m²',
          photographs: 'Michael Chen',
          manufacturers: 'Premium Materials',
          category: 'Commercial',
          city: 'Singapore',
          country: 'Singapore',
          additionalImages: []
        },
        {
          title: 'Riverside Residence',
          description: 'A state-of-the-art commercial skyscraper that redefines the skyline with its eco-friendly design and cutting-edge technology.',

          location: 'Portland, Oregon',
          year: '2023',
          imageBase64: '',
          architects: 'Chen Architecture Studio',
          area: '450 m²',
          photographs: 'Sarah Johnson',
          manufacturers: 'Eco-Friendly Materials',
          category: 'Residential',
          city: 'Portland',
          country: 'United States',
          additionalImages: []
        }
      ],
      interior: [],
      residential: [],
      commercial: []
    },
    awards: [
      { title: 'Architectural Excellence Award', organization: 'International Design Council', year: '2024', imageBase64: '' },
      { title: 'Sustainable Design Recognition', organization: 'Green Building Institute', year: '2024', imageBase64: '' },
      { title: 'Innovation in Urban Planning', organization: 'Architecture Foundation', year: '2023', imageBase64: '' },
      { title: 'Best Residential Project', organization: 'Design Awards', year: '2023', imageBase64: '' }
    ],
    media: [
      { title: 'Sustainable Architecture: The Future of Urban Design', description: 'Featured article discussing innovative approaches to sustainable building practices in modern cities.', date: 'Jan 2025', imageBase64: '', link: '' },
      { title: 'Interview: Redefining Modern Living Spaces', description: 'An in-depth conversation about the evolution of residential architecture and design philosophy.', date: 'Dec 2024', imageBase64: '', link: '' },
      { title: 'Award-Winning Projects Showcase', description: 'Highlighting our recent award-winning architectural projects and their impact on communities.', date: 'Nov 2024', imageBase64: '', link: '' }
    ],
    publications: [
      { title: 'Contemporary Urban Living', publisher: 'Design Press', year: '2024', imageBase64: '', description: 'A comprehensive guide to modern residential architecture' },
      { title: 'Sustainable Building Practices', publisher: 'City Planning Institute', year: '2024', imageBase64: '', description: 'Exploring eco-friendly construction methods' },
      { title: 'The Future of Architecture', publisher: 'Architecture Books', year: '2023', imageBase64: '', description: 'Visionary perspectives on architectural innovation' }
    ],
    team: [
      { name: 'Sarah Johnson', role: 'Senior Architect', bio: 'Specialized in sustainable design with 12 years of experience in residential and commercial projects', imageBase64: '' },
      { name: 'Michael Rodriguez', role: 'Project Manager', bio: 'Expert in managing large-scale architectural projects with a focus on timeline and budget optimization', imageBase64: '' },
      { name: 'Emily Chen', role: 'Interior Designer', bio: 'Award-winning interior designer known for creating harmonious and functional living spaces', imageBase64: '' }
    ],
    services: [
      { title: 'ARCHITECTURE', imageBase64: '', description: 'Comprehensive architectural design services from concept to completion' },
      { title: 'INTERIOR', imageBase64: '', description: 'Thoughtful interior design that enhances functionality and aesthetic appeal' },
      { title: 'PRODUCT DESIGN', imageBase64: '', description: 'Innovative product design solutions for modern living spaces' },
      { title: 'BRANDING', imageBase64: '', description: 'Architectural branding and identity design for commercial spaces' }
    ],
    moreInfo: {
      Type: 'Private',
      'Company Size': '1001-5000',
      Website: 'https://www.example.com'
    },
    address: {
      lines: [
        'Old No. 856, New No. 386, 2nd Floor Anna Salai',
        'Saidapet, Chennai',
        'Tamil Nadu, 600015'
      ]
    },
    contact: {
      phone: '083690 99230',
      email: 'qubotechnologies@gmail.com'
    },
    serviceText: 'At the core of our vision is a deep respect for the environment and a commitment to creating spaces that inspire, function beautifully, and stand the test of time. We believe architecture should enhance human experience while maintaining harmony with nature.',
    awardsTitle: 'Awards & recognition',
    awardsDescription: 'Celebrating excellence in architectural design and innovation.',
    mediaTitle: 'Media coverage',
    mediaDescription: 'Featured in leading publications and media outlets worldwide.',
    publicationsTitle: 'Publications',
    publicationsDescription: 'Our published works and contributions to architectural literature.',
    teamTitle: 'Our team',
    teamDescription: 'Meet the talented professionals behind our innovative designs.',
    servicesTitle: 'Our services',
    servicesDescription: 'Comprehensive architectural solutions tailored to your vision and needs.'
  };
}

function validatePortfolio(data) {
  // Relaxed validation: only basic structure check
  const errors = [];
  if (!data) errors.push('Portfolio data is missing');
  return errors;
}

export function ProjectModal({ project, isOpen, onClose, editMode, onUpdate, categoryKey, index, viewMode = false, onDelete }) {
  const [localProject, setLocalProject] = useState(project);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('info');
  const [hasChanges, setHasChanges] = useState(false);
  const isEditing = editMode && !viewMode;
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [showMoreSpecs, setShowMoreSpecs] = useState(false);

  useEffect(() => {
    setLocalProject(project);
    setHasChanges(false);
  }, [project]);


  if (!isOpen) return null;

  const handleClose = () => {
    if (editMode && hasChanges) {
      onUpdate(categoryKey, index, localProject);
    }
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      if (onDelete) {
        onDelete(categoryKey, index);
      }
      onClose();
    }
  };

  const handleFieldChange = (field, value) => {
    setLocalProject(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleNestedFieldChange = (parent, field, value) => {
    setLocalProject(prev => ({
      ...prev,
      [parent]: { ...(prev[parent] || {}), [field]: value }
    }));
    setHasChanges(true);
  };

  // Limit to 6 images total
  const MAX_TOTAL_IMAGES = 6;
  const MAX_ADDITIONAL_IMAGES = MAX_TOTAL_IMAGES - 1; // 5

  const allImages = [
    localProject.imageBase64 || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=675&fit=crop',
    ...(localProject.additionalImages || [])
  ].slice(0, MAX_TOTAL_IMAGES);


  const handleImageChange = async (e, imgIndex) => {
    const file = e.target.files[0];
    if (!file) return;

    const dataUrl = await readFileAsDataURL(file);
    e.target.value = null; // Reset input

    if (imgIndex === 0) {
      setLocalProject(prev => ({
        ...prev,
        imageBase64: dataUrl
      }));
    } else {
      const newAdditional = [...(localProject.additionalImages || [])];
      newAdditional[imgIndex - 1] = dataUrl;

      setLocalProject(prev => ({
        ...prev,
        additionalImages: newAdditional.slice(0, MAX_ADDITIONAL_IMAGES)
      }));
    }

    setHasChanges(true);
  };


  const addAdditionalImage = () => {
    const currentAdditional = localProject.additionalImages || [];

    if (currentAdditional.length >= MAX_ADDITIONAL_IMAGES) {
      alert('Maximum 6 images allowed (1 main + 5 additional)');
      return;
    }

    setLocalProject(prev => ({
      ...prev,
      additionalImages: [...currentAdditional, '']
    }));

    setHasChanges(true);
  };

  const removeAdditionalImage = (imgIndex) => {
    const newAdditional = [...(localProject.additionalImages || [])];
    newAdditional.splice(imgIndex, 1);

    setLocalProject(prev => ({
      ...prev,
      additionalImages: newAdditional
    }));

    setHasChanges(true);
  };


  const projectInfo = localProject.projectInfo || {};
  const productInfo = localProject.productInfo || {};
  const productDetails = localProject.productDetails || {};

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const navigateLightbox = (direction) => {
    if (direction === 'next') {
      setLightboxIndex((prev) => (prev + 1) % allImages.length);
    } else {
      setLightboxIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        navigateLightbox('prev');
      } else if (e.key === 'ArrowRight') {
        navigateLightbox('next');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, allImages.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        navigateLightbox('prev');
      } else if (e.key === 'ArrowRight') {
        navigateLightbox('next');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, allImages.length]);

  // Get quick info for glassmorphism badge
  const quickInfo = [
    localProject.location || 'Location',
    localProject.area || projectInfo.builtUpArea || 'Area',
    localProject.category || projectInfo.category || 'Category'
  ].filter(Boolean);

  return (
    <React.Fragment>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      {/* Popup Form Container - White Card Design */}
      <div
        className="
  fixed inset-0
  bg-black/60
  flex justify-center items-center
  z-50

  p-4
  overflow-auto
  purple-scrollbar
"
        style={{ animation: 'fadeIn 0.3s ease-out' }}
        onClick={(e) => e.target === e.currentTarget && handleClose()}
      >
        <div
          className="bg-white my-8 h-[80vh] w-full max-w-5xl flex flex-col md:flex-row relative overflow-hidden"
          style={{
            borderRadius: '18px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
            animation: 'slideUp 0.4s ease-out'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-50 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all duration-200 text-gray-600 hover:text-gray-800"
            aria-label="Close"
            style={{ pointerEvents: 'auto' }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Left: Image Section */}
          <div className="w-full md:w-[58%] relative">
            <div
              className="relative w-full h-full cursor-pointer group rounded-l-lg overflow-hidden"
              onClick={() => openLightbox(selectedImageIndex)}
            >
              <img
                src={allImages[selectedImageIndex] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=675&fit=crop'}
                alt={localProject.title || 'Project Image'}
                className="w-full h-full object-cover transition-opacity duration-300"
                key={selectedImageIndex}
              />

              {/* Edit Image Overlay */}
              {isEditing && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center pointer-events-auto">
                  <input
                    type="file"
                    accept="image/*"
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => handleImageChange(e, selectedImageIndex)}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <span className="text-white text-sm font-medium bg-black/80 px-4 py-2 rounded-lg pointer-events-none">Change Image</span>
                </div>
              )}
            </div>

            {/* Thumbnail Strip */}
            <div className="relative z-10 flex flex-wrap gap-1 justify-center md:justify-start -mt-32 pl-2 pb-2">
              {allImages.map((img, idx) => (
                <div key={idx} className="relative group flex-shrink-0">
                  {/* Thumbnail */}
                  <button
                    onMouseEnter={() => setSelectedImageIndex(idx)}
                    onFocus={() => setSelectedImageIndex(idx)}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${idx === selectedImageIndex
                      ? 'border-[#7B3FF2] scale-105 shadow-md'
                      : 'border-gray-300 hover:border-gray-400'
                      }`}
                  >
                    <img
                      src={
                        img ||
                        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=200&h=200&fit=crop'
                      }
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>

                  {/* Remove button (additional images only) */}
                  {isEditing && editMode && !viewMode && idx !== 0 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeAdditionalImage(idx - 1);
                        if (selectedImageIndex === idx) {
                          setSelectedImageIndex(0);
                        }
                      }}
                      className="
            absolute -top-2 -right-2
            w-5 h-5
            bg-[#7B3FF2]
            text-white
            rounded-full
            text-xs
            flex items-center justify-center
            opacity-0 group-hover:opacity-100
            transition
          "
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}

              {/* Add Image Button */}
              {isEditing && editMode && !viewMode && allImages.length < 6 && (
                <button
                  onClick={addAdditionalImage}
                  className="
        w-20 h-20
        rounded-lg
        border-2 border-dashed border-purple-300
        hover:border-purple-500
        flex items-center justify-center
        text-purple-400 hover:text-purple-600
        transition-all duration-200
        text-2xl
        bg-white
      "
                >
                  +
                </button>
              )}
            </div>

          </div>

          {/* Right: Content Section */}
          <div className="w-full md:w-[42%] p-6 md:p-8 overflow-y-auto no-scrollbar relative h-[80vh]">
            {/* Edit Mode Controls removed - using parent editMode */}

            {/* Project Title */}
            {isEditing ? (
              <input
                type="text"
                value={localProject.title || ''}
                onChange={(e) => {
                  setLocalProject(prev => ({ ...prev, title: e.target.value }));
                  setHasChanges(true);
                }}
                placeholder="Project Title"
                className="w-full text-2xl md:text-3xl font-bold text-gray-900 mb-1 border-b border-purple-300 focus:outline-none focus:border-purple-500"
              />
            ) : (
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                {localProject.title || 'Untitled Project'}
              </h1>
            )}

            {/* Category & Location */}
            {isEditing ? (
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={localProject.category || ''}
                  onChange={(e) => {
                    setLocalProject(prev => ({ ...prev, category: e.target.value }));
                    setHasChanges(true);
                  }}
                  placeholder="Category"
                  className="text-sm text-purple-600 uppercase tracking-widest border-b border-purple-300 focus:outline-none focus:border-purple-500"
                />
                <span className="text-sm text-purple-600">•</span>
                <input
                  type="text"
                  value={localProject.location || ''}
                  onChange={(e) => {
                    setLocalProject(prev => ({ ...prev, location: e.target.value }));
                    setHasChanges(true);
                  }}
                  placeholder="Location"
                  className="text-sm text-purple-600 uppercase tracking-widest border-b border-purple-300 focus:outline-none focus:border-purple-500"
                />
              </div>
            ) : (
              <p className="text-sm uppercase tracking-widest mb-2" style={{ color: '#7A6BEB' }}>
                {localProject.category || 'Project'} • {localProject.location || 'Location'}
              </p>
            )}

            {/* Description */}
            {isEditing ? (
              <textarea
                value={localProject.description || ''}
                onChange={(e) => {
                  setLocalProject(prev => ({ ...prev, description: e.target.value }));
                  setHasChanges(true);
                }}
                placeholder="Project Description"
                className="w-full text-sm text-black mb-6 border border-gray-300 rounded-md p-2 focus:outline-none focus:border-purple-500"
                rows={4}
              />
            ) : (
              <p className="text-sm text-black mb-6">{localProject.description}</p>
            )}

            {/* Core Specs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {[
                { label: 'Architects', key: 'architects' },
                { label: 'Area', key: 'area' },
                { label: 'Year', key: 'year' },
                { label: 'Photographs', key: 'photographs' },
              ].map(({ label, key }) => (
                <div key={key}>
                  <label className="text-xs uppercase tracking-wider block mb-1" style={{ color: '#7A6BEB' }}>
                    {label}
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={localProject[key] || ''}
                      onChange={(e) => {
                        setLocalProject(prev => ({ ...prev, [key]: e.target.value }));
                        setHasChanges(true);
                      }}
                      placeholder={label}
                      className="w-full text-gray-800 font-medium border-b border-purple-300 focus:outline-none focus:border-purple-500"
                    />
                  ) : (
                    <p className="text-gray-800 font-medium">{localProject[key] || '—'}</p>
                  )}
                </div>
              ))}
            </div>

            {/* More Specs Button */}
            <div className="flex justify-start mt-8">
              <button
                onClick={() => setShowMoreSpecs(!showMoreSpecs)}
                className="
        px-6 py-2.5
        border-2 border-[#7B3FF2]
        text-[#7B3FF2]
        bg-[#7B3FF2]/10
        text-xs font-semibold
        uppercase tracking-widest
        rounded-md
        transition
      "
              >
                {showMoreSpecs ? 'Hide Specs' : 'More Specs'}
              </button>
            </div>

            {/* Additional Specs */}
            {showMoreSpecs && (
              <div className="mt-8 pt-8 border-t border-purple-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  {[
                    'Roofing', 'Cladding', 'Doors', 'Hardware', 'Tiles',
                    'False Ceiling', 'Wooden Finish Ceiling', 'Lighting',
                    'Paint', 'Sanitaryware', 'Bath Fittings', 'Bath Flooring'
                  ].map((field) => (
                    <div key={field}>
                      <label className="text-xs uppercase tracking-wider block mb-1" style={{ color: '#7A6BEB' }}>
                        {field}
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={productInfo[field.toLowerCase().replace(/\s/g, '')] || ''}
                          onChange={(e) => {
                            setLocalProject(prev => ({
                              ...prev,
                              productInfo: {
                                ...(prev.productInfo || {}),
                                [field.toLowerCase().replace(/\s/g, '')]: e.target.value
                              }
                            }));
                            setHasChanges(true);
                          }}
                          placeholder={field}
                          className="w-full text-gray-700 border-b border-purple-300 focus:outline-none focus:border-purple-500"
                        />
                      ) : (
                        <p className="text-gray-700">
                          {productInfo[field.toLowerCase().replace(/\s/g, '')] || '—'}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>


      {/* Premium Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 bg-black/95 z-[60] flex items-center justify-center p-4 backdrop-blur-md"
          onClick={closeLightbox}
        >
          <div className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center">
            <img
              src={allImages[lightboxIndex] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop'}
              alt={`Image ${lightboxIndex + 1}`}
              className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
              style={{ borderRadius: '24px' }}
              onClick={(e) => e.stopPropagation()}
            />

            {/* Navigation Arrows */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateLightbox('prev');
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md border border-white/20 hover:border-white/30 hover:scale-110"
                  aria-label="Previous image"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateLightbox('next');
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md border border-white/20 hover:border-white/30 hover:scale-110"
                  aria-label="Next image"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md border border-white/20 hover:border-white/30 hover:scale-110 text-white text-2xl font-bold"
              aria-label="Close lightbox"
            >
              ✕
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
              <span className="text-white text-sm font-semibold">
                {lightboxIndex + 1} / {allImages.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

// Award Modal Component
function AwardModal({ award, isOpen, onClose }) {
  if (!isOpen || !award) return null;

  return (
    <React.Fragment>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Modal Overlay */}
      <div
        className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4 overflow-auto"
        style={{ animation: 'fadeIn 0.3s ease-out' }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div
          className="bg-white my-8 max-w-2xl w-full relative overflow-y-auto rounded-2xl no-scrollbar"
          style={{
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            animation: 'slideUp 0.4s ease-out',
            maxHeight: '90vh'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all duration-200 text-gray-600 hover:text-gray-800"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Content */}
          <div className="p-8">
            {/* Award Title */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4 pr-8">
              {award.title}
            </h1>

            {/* Organization */}
            <p className="text-lg text-gray-700 mb-2">
              {award.organization}
            </p>

            {/* Year */}
            {award.year && (
              <p className="text-base font-semibold mb-6" style={{ color: '#7A6BEB' }}>
                {award.year}
              </p>
            )}

            {/* Description/Details */}
            <div className="mb-6">
              <p className="text-gray-600 leading-relaxed">
                {award.description || award.organization || 'This prestigious award recognizes excellence and innovation in architectural design, celebrating outstanding contributions to the field.'}
              </p>
            </div>

            {/* Award Image - Now after content */}
            <div className="mb-6 rounded-xl overflow-hidden">
              <img
                src={award.imageBase64 || awardImage}
                alt={award.title}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Back to Firm Button - Styles Update */}
            <div className="flex justify-start">
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  onClose();
                }}
                className="px-6 py-3 font-semibold transition-all duration-300 flex items-center gap-2"
                style={{ color: '#7A6BEB' }}
              >
                ← Back to Firm
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

// Media Modal Component
function MediaModal({ media, isOpen, onClose }) {
  if (!isOpen || !media) return null;

  return (
    <React.Fragment>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Modal Overlay */}
      <div
        className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4 overflow-auto"
        style={{ animation: 'fadeIn 0.3s ease-out' }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div
          className="bg-white my-8 max-w-2xl w-full relative overflow-y-auto rounded-2xl no-scrollbar"
          style={{
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            animation: 'slideUp 0.4s ease-out',
            maxHeight: '90vh'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all duration-200 text-gray-600 hover:text-gray-800"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Content */}
          <div className="p-8">
            {/* Media Title */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4 pr-8">
              {media.title}
            </h1>

            {/* Date */}
            {media.date && (
              <p className="text-base font-semibold mb-6" style={{ color: '#7A6BEB' }}>
                {media.date}
              </p>
            )}

            {/* Description/Details */}
            <div className="mb-6">
              <p className="text-gray-600 leading-relaxed">
                {media.description || 'Featured in leading publications and media outlets worldwide.'}
              </p>
            </div>

            {/* Media Image */}
            <div className="mb-6 rounded-xl overflow-hidden">
              <img
                src={media.imageBase64 || mediaImage}
                alt={media.title}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Back to Firm Button */}
            <div className="flex justify-start">
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  onClose();
                }}
                className="px-6 py-3 font-semibold transition-all duration-300 flex items-center gap-2"
                style={{ color: '#7A6BEB' }}
              >
                ← Back to Firm
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

// Publication Modal Component
function PublicationModal({ publication, isOpen, onClose }) {
  if (!isOpen || !publication) return null;

  return (
    <React.Fragment>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Modal Overlay */}
      <div
        className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4 overflow-auto"
        style={{ animation: 'fadeIn 0.3s ease-out' }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div
          className="bg-white my-8 max-w-2xl w-full relative overflow-y-auto rounded-2xl no-scrollbar"
          style={{
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            animation: 'slideUp 0.4s ease-out',
            maxHeight: '90vh'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all duration-200 text-gray-600 hover:text-gray-800"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Content */}
          <div className="p-8">
            {/* Publication Title */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4 pr-8">
              {publication.title}
            </h1>

            {/* Publisher */}
            <p className="text-lg text-gray-700 mb-2">
              {publication.publisher}
            </p>

            {/* Year */}
            {publication.year && (
              <p className="text-base font-semibold mb-6" style={{ color: '#7A6BEB' }}>
                {publication.year}
              </p>
            )}

            {/* Description/Details */}
            <div className="mb-6">
              <p className="text-gray-600 leading-relaxed">
                {publication.description || publication.publisher || 'Our published works and contributions to architectural literature.'}
              </p>
            </div>

            {/* Publication Image */}
            <div className="mb-6 rounded-xl overflow-hidden">
              <img
                src={publication.imageBase64 || publicationsImage}
                alt={publication.title}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Back to Firm Button */}
            <div className="flex justify-start">
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  onClose();
                }}
                className="px-6 py-3 font-semibold transition-all duration-300 flex items-center gap-2"
                style={{ color: '#7A6BEB' }}
              >
                ← Back to Firm
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default function FArchitecturePage({
  currentUserId,
  viewMode = false,
  profileComponent = null,
  isEditing: parentIsEditing,
  setIsEditing: parentSetIsEditing,
  pageRef, // <-- new optional prop (MutableRef) from parent to call save/cancel

}) {
  const navigate = useNavigate();
  const { addProject, savedProjects, deleteProject } = useEditContext();
  const { subscription } = useSubscription();
  const userUID = localStorage.getItem("userUID");
  const token = localStorage.getItem("token");

  /** State for plan limit upgrade modal */
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [limitModalMessage, setLimitModalMessage] = useState('');

  const isProjectSaved = (projectTitle) => {
    return (savedProjects || []).some(p => p.title === projectTitle);
  };

  const handleToggleSaveProject = (proj) => {
    if (!userUID || !token) {
      navigate("/signin");
      return;
    }

    if (isProjectSaved(proj.title)) {
      const savedItem = (savedProjects || []).find(p => p.title === proj.title);
      if (savedItem) deleteProject(savedItem.id);
      toast.info("Project removed from saved");
    } else {
      const newProject = {
        title: proj.title,
        architect: proj.architects || "Chen Architecture Studio",
        firmUID: currentUserId,
        category: proj.category || (selectedCategory === 'all' ? 'Architecture' : selectedCategory),
        description: proj.description,
        image: proj.imageBase64 || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=675&fit=crop',
        location: proj.location,
        year: proj.year,
        architects: proj.architects,
        imageBase64: proj.imageBase64,
        likes: 0,
        comments: 0,
        shares: 0
      };
      addProject(newProject);
      toast.success("Project saved to your dashboard!");
    }
  };
  const [page, setPage] = useState(EmptyTemplate());
  const [editMode, setEditMode] = useState(false);
  const [modalProject, setModalProject] = useState(null);
  const [modalCategoryKey, setModalCategoryKey] = useState(null);
  const [modalIndex, setModalIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('architecture');
  const [saveStatus, setSaveStatus] = useState('');

  // Award Modal State
  const [selectedAward, setSelectedAward] = useState(null);
  const [awardModalOpen, setAwardModalOpen] = useState(false);

  const openAwardModal = (award) => {
    setSelectedAward(award);
    setAwardModalOpen(true);
  };

  const closeAwardModal = () => {
    setAwardModalOpen(false);
    setSelectedAward(null);
  };

  // Media Modal State
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [mediaModalOpen, setMediaModalOpen] = useState(false);

  const openMediaModal = (media) => {
    setSelectedMedia(media);
    setMediaModalOpen(true);
  };

  const closeMediaModal = () => {
    setMediaModalOpen(false);
    setSelectedMedia(null);
  };

  // Publication Modal State
  const [selectedPublication, setSelectedPublication] = useState(null);
  const [publicationModalOpen, setPublicationModalOpen] = useState(false);

  const openPublicationModal = (pub) => {
    setSelectedPublication(pub);
    setPublicationModalOpen(true);
  };

  const closePublicationModal = () => {
    setPublicationModalOpen(false);
    setSelectedPublication(null);
  };

  const activeEdit = parentIsEditing ?? editMode;
  const setActiveEdit = parentSetIsEditing ?? setEditMode;

  // Keep local editMode synced with the resolved activeEdit so existing checks using editMode work.
  useEffect(() => {
    setEditMode(activeEdit);
  }, [activeEdit]);


  //     
  // use editMode (already present) as the single source of truth
  const headerRef = useRef(null);

  // Expose save function to parent via ref
  useImperativeHandle(pageRef, () => ({
    save: handleSave,
    cancel: () => {
      loadPortfolio();
      setActiveEdit(false);
    }
  }), [page]);

  // Initialize portfolioAPI with userUID when component mounts
  useEffect(() => {
    if (currentUserId) {
      portfolioAPI.setUserUID(currentUserId);
      // Load existing portfolio if available
      loadPortfolio();
    }
  }, [currentUserId]);

  // Disable edit mode if in view mode
  useEffect(() => {
    if (viewMode) {
      // prefer parent's setter when available
      setActiveEdit(false);
    }
  }, [viewMode]);

  // Load portfolio from backend
  const loadPortfolio = async () => {
    try {
      const portfolio = await portfolioAPI.getPortfolio();
      if (portfolio) {
        setPage(portfolio);
      }
    } catch (error) {
      console.log('No existing portfolio found, starting with empty template');
    }
  };

  const toggleEdit = () => setEditMode(v => !v);

  // prefer toggling via parent setter so single control works
  const toggleActiveEdit = () => setActiveEdit((v) => !v);

  const openProjectModal = (project, categoryKey, index) => {
    setModalProject(project);
    setModalCategoryKey(categoryKey);
    setModalIndex(index);
  };

  const closeProjectModal = () => {
    setModalProject(null);
    setModalCategoryKey(null);
    setModalIndex(null);
  };

  // Save portfolio handler
  const handleSave = async () => {
    const errors = validatePortfolio(page);

    if (errors.length > 0) {
      alert('Please fill in all required fields:\n\n' + errors.join('\n'));
      return;
    }

    try {
      console.log("🟡 Saving portfolio data to backend...");
      console.log("📦 Data to save:", page);

      setSaveStatus('Saving...');

      // Send data to backend API
      const response = await portfolioAPI.savePortfolio(page);

      // Log backend response
      console.log("✅ Backend response:", response);

      setSaveStatus('Portfolio saved successfully!');
      // turn off edit mode via active setter
      setActiveEdit(false);

      // Clear status message after 3 seconds
      setTimeout(() => setSaveStatus(''), 3000);

    } catch (error) {
      console.error("❌ Error while saving portfolio:", error);
      // Handle subscription limit error from server (403)
      if (error.response?.status === 403) {
        const msg = error.response?.data?.message || 'Portfolio project limit reached. Please upgrade your plan.';
        setLimitModalMessage(msg);
        setShowLimitModal(true);
        setSaveStatus('Plan limit reached');
      } else {
        setSaveStatus('Error saving portfolio');
        alert('Failed to save: ' + error.message);
      }
    }
  };

  // Update project data in modal
  const updateProjectInModal = (categoryKey, index, updatedProject) => {
    console.log(`✏️ Updating project in category "${categoryKey}" at index ${index}`);
    console.log("🆕 Updated project data:", updatedProject);

    setPage(prev => {
      const projects = { ...prev.projects };
      const arr = [...(projects[categoryKey] || [])];
      arr[index] = updatedProject;

      const updated = {
        ...prev,
        projects: {
          ...projects,
          [categoryKey]: arr
        }
      };

      console.log("📄 Updated page state:", updated);
      return updated;
    });
  };

  // Delete portfolio handler
  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete your portfolio? This action cannot be undone.')) {
      return;
    }

    try {
      console.log("🗑️ Deleting portfolio...");
      await portfolioAPI.deletePortfolio();
      console.log("✅ Portfolio deleted successfully");

      // Reset to empty state
      setPage({
        header: {},
        projectCategories: [],
        projects: {},
        awards: [],
        media: [],
      });

      alert('Portfolio deleted successfully');
    } catch (error) {
      console.error("❌ Error deleting portfolio:", error);
      alert('Failed to delete portfolio: ' + error.message);
    }
  };


  async function handleHeaderImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const dataUrl = await readFileAsDataURL(file);
    setPage(prev => ({ ...prev, header: { ...prev.header, headerImageBase64: dataUrl } }));
  }

  async function handleProjectImageChange(categoryKey, index, e) {
    const file = e.target.files[0];
    if (!file) return;
    const dataUrl = await readFileAsDataURL(file);
    e.target.value = null; // Reset input so same file can be selected again
    setPage(prev => {
      const projects = { ...prev.projects };
      const arr = [...(projects[categoryKey] || [])];
      arr[index] = { ...(arr[index] || {}), imageBase64: dataUrl };
      return { ...prev, projects: { ...projects, [categoryKey]: arr } };
    });
  }

  function handleTextChange(path, value) {
    setPage(prev => {
      const copy = JSON.parse(JSON.stringify(prev));
      let cur = copy;
      for (let i = 0; i < path.length - 1; i++) cur = cur[path[i]];
      cur[path[path.length - 1]] = value;
      return copy;
    });
  }

  function addProjectToPortfolio(categoryKey) {
    // ─── Subscription-based portfolio project limit check ───
    const totalProjects = page.projects
      ? Object.values(page.projects).reduce((sum, arr) => sum + (Array.isArray(arr) ? arr.length : 0), 0)
      : 0;
    const maxProjects = subscription?.maxPortfolioProjects || 2;

    if (totalProjects >= maxProjects) {
      setLimitModalMessage(
        `Your ${subscription?.plan || 'free'} plan allows up to ${maxProjects} portfolio projects. You currently have ${totalProjects} projects.`
      );
      setShowLimitModal(true);
      return;
    }

    setPage(prev => {
      const projects = { ...prev.projects };
      const arr = [...(projects[categoryKey] || [])];
      arr.push({
        title: 'New Project',
        description: '',
        location: '',
        year: '',
        imageBase64: '',
        architects: '',
        area: '',
        photographs: '',
        manufacturers: '',
        category: '',
        city: '',
        country: '',
        additionalImages: [],
        projectInfo: {},
        productInfo: {},
        productDetails: {}
      });
      return { ...prev, projects: { ...projects, [categoryKey]: arr } };
    });
  }

  function removeProject(categoryKey, idx) {
    setPage(prev => {
      const projects = { ...prev.projects };
      const arr = [...(projects[categoryKey] || [])];
      arr.splice(idx, 1);
      return { ...prev, projects: { ...projects, [categoryKey]: arr } };
    });
  }

  function addCategory() {
    const name = prompt('Enter category name:');
    if (!name) return;
    const key = name.toLowerCase().replace(/\s+/g, '_');
    setPage(prev => ({
      ...prev,
      projectCategories: [...(prev.projectCategories || []), { name, key }],
      projects: { ...prev.projects, [key]: [] }
    }));
  }

  function removeCategory(key) {
    if (!confirm('Delete this category and all its projects?')) return;
    setPage(prev => {
      const categories = (prev.projectCategories || []).filter(c => c.key !== key);
      const projects = { ...prev.projects };
      delete projects[key];
      return { ...prev, projectCategories: categories, projects };
    });
  }

  function addTeamMember() {
    setPage(prev => ({
      ...prev,
      team: [...(prev.team || []), { name: '', role: '', bio: '', imageBase64: '' }]
    }));
  }

  function removeTeamMember(idx) {
    setPage(prev => {
      const arr = [...(prev.team || [])];
      arr.splice(idx, 1);
      return { ...prev, team: arr };
    });
  }

  function addAward() {
    setPage(prev => ({
      ...prev,
      awards: [...(prev.awards || []), { title: '', organization: '', year: '', imageBase64: '' }]
    }));
  }

  function removeAward(idx) {
    setPage(prev => {
      const arr = [...(prev.awards || [])];
      arr.splice(idx, 1);
      return { ...prev, awards: arr };
    });
  }

  function addMedia() {
    setPage(prev => ({
      ...prev,
      media: [...(prev.media || []), { title: '', description: '', date: '', imageBase64: '', link: '' }]
    }));
  }

  function removeMedia(idx) {
    setPage(prev => {
      const arr = [...(prev.media || [])];
      arr.splice(idx, 1);
      return { ...prev, media: arr };
    });
  }

  function addPublication() {
    setPage(prev => ({
      ...prev,
      publications: [...(prev.publications || []), { title: '', publisher: '', year: '', imageBase64: '', description: '' }]
    }));
  }

  function removePublication(idx) {
    setPage(prev => {
      const arr = [...(prev.publications || [])];
      arr.splice(idx, 1);
      return { ...prev, publications: arr };
    });
  }

  function showImage(src, fallback) {
    if (!src) return fallback;
    return src;
  }

  // Save architect/firm to saved list (for clients viewing)
  const handleSaveArchitect = async () => {
    const currentUserUID = localStorage.getItem("userUID");
    if (!currentUserUID) {
      alert("Please login to save architects");
      return;
    }

    try {
      // Get user ID from backend using userUID
      const userRes = await fetch(`https://archireach.onrender.com/api/users/by-uid/${currentUserUID}`);
      if (!userRes.ok) {
        throw new Error("Failed to get user info");
      }
      const userData = await userRes.json();

      // Save architect using the architect's userUID
      const saveRes = await fetch(`https://archireach.onrender.com/api/users/${userData.user._id}/save-architect`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ architectUID: currentUserId })
      });

      if (saveRes.ok) {
        alert("✅ Architect saved to your favorites!");
      } else {
        const errorData = await saveRes.json();
        alert(errorData.message || "Failed to save architect");
      }
    } catch (error) {
      console.error("Error saving architect:", error);
      alert("Failed to save architect. Please try again.");
    }
  };

  return (
    <>
      {/* ─── Plan Limit Upgrade Modal ─── */}
      {showLimitModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-8 animate-in fade-in zoom-in">
            {/* Modal Header */}
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>

            {/* Modal Title */}
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
              Portfolio Limit Reached
            </h3>

            {/* Modal Message */}
            <p className="text-gray-600 text-center mb-2">
              {limitModalMessage}
            </p>

            {/* Current Plan Info */}
            <div className="bg-gray-50 rounded-lg p-3 mb-6 text-center">
              <span className="text-sm text-gray-500">Current Plan: </span>
              <span className="text-sm font-semibold text-purple-600 capitalize">
                {subscription?.plan || 'Free'}
              </span>
              <span className="text-sm text-gray-500"> • </span>
              <span className="text-sm text-gray-500">
                {subscription?.maxPortfolioProjects || 2} projects max
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowLimitModal(false)}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowLimitModal(false);
                  navigate('/pricing');
                }}
                className="flex-1 px-4 py-2.5 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors shadow-sm"
              >
                Upgrade Plan
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        /* Premium SaaS Design System - Apple-Grade Minimalism */
        :root {
          --primary: #5B21B6;
          --primary-light: #7C4DFF;
          --primary-dark: #4C1D95;
          --accent: #06B6D4;
          --background: #FFFFFF;
          --surface: #FAFAFA;
          --surface-elevated: #FFFFFF;
          --border: #E5E7EB;
          --border-subtle: #F3F4F6;
          --text-primary: #111827;
          --text-secondary: #6B7280;
          --text-tertiary: #9CA3AF;
          --shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
          --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          --glass-bg: rgba(255, 255, 255, 0.72);
          --glass-border: rgba(255, 255, 255, 0.18);
        }
        
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Montserrat:wght@400;600;700&family=Poppins:wght@400;600&family=Inter:wght@400;500&family=Roboto:wght@400;500&display=swap');
        
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        body {
          background: transparent;
          color: var(--text-primary);
        }
        
        /* Premium Typography Scale - Unique Fonts */
        .text-h1 {
          font-family: 'Playfair Display', 'Georgia', serif;
          font-weight: 700;
          font-size: 2rem;
          line-height: 1.25;
          letter-spacing: -0.025em;
          color: var(--text-primary);
        }
        
        .text-h2 {
          font-family: 'Montserrat', 'Arial', sans-serif;
          font-weight: 700;
          font-size: 1.5rem;
          line-height: 1.33;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          text-transform: uppercase;
        }
        
        .text-h3 {
          font-family: 'Poppins', 'Arial', sans-serif;
          font-weight: 600;
          font-size: 1.125rem;
          line-height: 1.5;
          letter-spacing: 0.01em;
          color: var(--text-primary);
        }
        
        .text-body {
          font-family: 'Inter', 'Helvetica', sans-serif;
          font-weight: 400;
          font-size: 0.9375rem;
          line-height: 1.7;
          letter-spacing: 0.01em;
          color: var(--text-secondary);
        }
        
        .text-small {
          font-family: 'Roboto', 'Arial', sans-serif;
          font-weight: 400;
          font-size: 0.875rem;
          line-height: 1.6;
          letter-spacing: 0.02em;
          color: var(--text-secondary);
        }
        
        @media (min-width: 768px) {
          .text-h1 {
            font-size: 2.5rem;
          }
          .text-h2 {
            font-size: 1.875rem;
          }
          .text-h3 {
            font-size: 1.25rem;
          }
          .text-body {
            font-size: 1rem;
          }
        }
        
        @media (min-width: 1024px) {
          .text-h1 {
            font-size: 3rem;
          }
          .text-h2 {
            font-size: 2rem;
          }
        }
        
        /* Premium Card System - Transparent */
        .card {
          background: transparent;
          border-radius: 16px;
          border: none;
          box-shadow: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          padding: 16px;
        }
        
        .card:hover {
          transform: translateY(-2px);
        }
        
        .card-lg {
          border-radius: 20px;
          background: transparent;
          border: none;
          box-shadow: none;
          padding: 24px;
        }
        
        .card-lg:hover {
          transform: translateY(-2px);
        }
        
        /* Premium Button System */
        .btn {
          padding: 12px 24px;
          border-radius: 12px;
          font-size: 0.9375rem;
          font-weight: 500;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          border: none;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
          color: white;
          box-shadow: var(--shadow-sm);
        }
        
        .btn-primary:hover {
          transform: translateY(-1px);
          box-shadow: var(--shadow-md);
        }
        
        .btn-secondary {
          background: var(--surface-elevated);
          color: var(--text-primary);
          border: 1px solid var(--border);
        }
        
        .btn-secondary:hover {
          background: var(--surface);
          border-color: var(--border-subtle);
        }
        
        /* Premium Filter Chips */
        .chip {
          padding: 8px 16px;
          border-radius: 12px;
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid var(--border-subtle);
          background: var(--surface-elevated);
          color: var(--text-secondary);
          cursor: pointer;
          white-space: nowrap;
        }
        
        .chip.active {
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
          color: white;
          border-color: transparent;
          box-shadow: var(--shadow-sm);
        }
        
        .chip:hover:not(.active) {
          background: var(--surface);
          border-color: var(--border);
          color: var(--text-primary);
        }
        
        /* Premium Container */
        .container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 16px;
        }
        
        @media (min-width: 640px) {
          .container {
            padding: 0 24px;
          }
        }
        
        @media (min-width: 1024px) {
          .container {
            padding: 0 32px;
          }
        }
        
        /* Section Spacing - Compact Modern */
        .section {
          padding: 32px 0;
        }
        
        @media (min-width: 768px) {
          .section {
            padding: 40px 0;
          }
        }
        
        @media (min-width: 1024px) {
          .section {
            padding: 48px 0;
          }
        }
        
        /* Navigation - Transparent with Visibility on Scroll */
        .nav {
        
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(229, 231, 235, 0.5);
          z-index: 1000;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }
        
        /* Smooth Scroll */
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      <div className="min-h-screen" style={{ background: 'transparent' }}>
        {/* Premium Navigation Bar */}
        <nav className="nav">
          <div className="container">
            <div className="flex items-center justify-end">
              {/* Right Actions */}
              {/* <div className="flex items-center gap-3">
                {saveStatus && (
                  <span className="text-sm font-medium" style={{ color: '#10b981' }}>{saveStatus}</span>
                )}
                {!viewMode && (
                  <>
                    <button
                      onClick={toggleEdit}
                      className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium transition-all duration-300"
                      style={{ 
                        background: editMode ? 'var(--primary)' : 'transparent',
                        color: editMode ? 'white' : 'var(--text-primary)',
                        border: editMode ? '1px solid var(--primary)' : '1px solid rgba(229, 231, 235, 0.8)',
                        padding: '8px 16px',
                        fontSize: '0.875rem'
                      }}
                    >
                      {editMode ? "Preview" : "Edit"}
                    </button>
                    {editMode && (
                      <button
                        onClick={handleSave}
                        className="btn btn-primary"
                        style={{ padding: '8px 16px', fontSize: '0.875rem' }}
                      >
                        Save
                      </button>
                    )}
                  </>
                )}
                {viewMode && (
                  <button
                    onClick={handleSaveArchitect}
                    className="btn btn-primary"
                    style={{ padding: '8px 16px', fontSize: '0.875rem' }}
                  >
                    <span>💾</span> Save Architect
                  </button>
                )}
              </div> */}
            </div>
          </div>
        </nav>

        {/* Hero/Profile Section - First */}
        {profileComponent && (
          <section className="section" style={{ background: 'transparent', paddingTop: '32px' }}>
            <div className="container">
              {React.isValidElement(profileComponent)
                ? React.cloneElement(profileComponent, {
                  isEditing: activeEdit,
                  setIsEditing: setActiveEdit,
                  // preserve any editRef the caller already passed (e.g. editProfileRef from FirmDash)
                  editRef: profileComponent.props?.editRef ?? headerRef,
                })
                : profileComponent}
            </div>
          </section>
        )}

        {/* Premium Projects Grid - 3 Column */}
        <section className="section" style={{ background: 'transparent', paddingTop: '0' }} id="projects">
          <div className="container">
            {/* OUR PROJECTS Heading and Description */}
            <div className="text-center mb-8">
              <h2 className="text-[40px] font-bold text-gray-800 mb-4 tracking-wider capitalize" style={{ fontFamily: "'F Dillon', sans-serif" }}>Our projects</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
                Showcasing innovative architectural solutions that transform spaces and inspire communities.
              </p>
            </div>

            {/* Project Filters */}
            <div className="mb-8 flex p-4 rounded-2xl shadow-xl border border-gray-200  max-w-4xl justify-center item-center mx-auto flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`rounded-lg px-6 py-2.5 text-sm font-semibold transition-all duration-300 ${selectedCategory === 'all' ? 'bg-[#7B3FF2] text-white' : 'text-[#6B7280] bg-transparent'
                  }`}
              >
                All
              </button>
              {(page.projectCategories || []).map((cat) => (
                <div key={cat.key} className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => setSelectedCategory(cat.key)}
                    className={`rounded-lg px-6 py-2.5 text-sm font-semibold transition-all duration-300 ${selectedCategory === cat.key ? 'bg-[#7B3FF2] text-white' : 'text-[#6B7280] bg-transparent'
                      }`}
                  >
                    {cat.name}
                  </button>
                  {editMode && !viewMode && (
                    <button
                      onClick={() => removeCategory(cat.key)}
                      className="text-red-500 hover:text-red-700 text-xs ml-1"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              {editMode && !viewMode && (
                <button
                  onClick={addCategory}
                  className="rounded-lg px-6 py-2.5 text-sm font-semibold transition-all duration-300 text-[#6B7280] bg-transparent border-2 border-dashed border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                >
                  + Add
                </button>
              )}
            </div>

            {/* Add Project Button */}
            {editMode && !viewMode && (
              <div className="mb-6 flex items-center justify-center">
                <button
                  onClick={() => addProjectToPortfolio(selectedCategory === 'all' ? 'architecture' : selectedCategory)}
                  className="btn btn-primary"
                >
                  + Add Project
                </button>
              </div>
            )}

            {/* 📊 Subscription Stats Bar — shows plan, portfolio usage, and application credits */}
            {!viewMode && subscription && (
              <div className="mb-6 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
                {/* Plan Name */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Plan</span>
                  <span className="px-3 py-1 rounded-full text-sm font-bold bg-purple-100 text-purple-700 capitalize">
                    {subscription.plan || 'Free'}
                  </span>
                </div>
                {/* Portfolio Usage */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Portfolio</span>
                  <span className="text-sm font-semibold text-gray-800">
                    {Object.values(page?.projects || {}).reduce((sum, arr) => sum + (Array.isArray(arr) ? arr.length : 0), 0)}
                    <span className="text-gray-400"> / </span>
                    {subscription.maxPortfolioProjects || 2}
                  </span>
                </div>
                {/* Application Credits */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Applications</span>
                  <span className="text-sm font-semibold text-gray-800">
                    {subscription.applicationsUsed || 0}
                    <span className="text-gray-400"> / </span>
                    {subscription.maxApplicationsPerMonth || 0}
                    <span className="text-gray-400 text-xs ml-1">this month</span>
                  </span>
                </div>
              </div>
            )}

            {/* Project Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {((page.projects || {})[selectedCategory === 'all' ? 'architecture' : selectedCategory] || []).map((proj, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl overflow-hidden cursor-pointer group shadow-lg hover:shadow-2xl transform transition-all duration-300"
                  onClick={() => !editMode && !viewMode && openProjectModal(proj, selectedCategory === 'all' ? 'architecture' : selectedCategory, i)}
                >
                  {/* Image with Fixed Aspect Ratio & Hover Effect */}
                  <div className="relative w-full" style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      src={showImage(
                        proj.imageBase64,
                        'https://as2.ftcdn.net/v2/jpg/04/94/76/01/1000_F_494760101_uDYrDBavlxK8P7OLf0tKzTqqWH6QHkcm.jpg'
                      )}
                      alt={proj.title}
                    />

                    {/* ✅ Save Icon on Image (Secondary) */}
                    {viewMode && (
                      <div className="absolute top-3 right-3 z-30">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleSaveProject(proj);
                          }}
                          className={`p-2 backdrop-blur-sm rounded-full shadow-lg transition-all duration-300 pointer-events-auto ${isProjectSaved(proj.title) ? "bg-red-500 text-white" : "bg-white/90 text-red-500 hover:scale-110"
                            }`}
                          aria-label={isProjectSaved(proj.title) ? "Unsave Project" : "Save Project"}
                        >
                          <Heart className={`w-4 h-4 ${isProjectSaved(proj.title) ? "fill-current" : ""}`} />
                        </button>
                      </div>
                    )}

                    {/* Hover Overlay */}
                    {!editMode && !viewMode && (
                      <div
                        className="absolute inset-0 bg-black/0 bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex flex-col justify-end p-4"
                        onClick={(e) => {
                          e.stopPropagation();
                          openProjectModal(proj, selectedCategory === 'all' ? 'architecture' : selectedCategory, i);
                        }}
                      >
                      </div>
                    )}

                    {/* Edit Mode Image Overlay */}
                    {editMode && !viewMode && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                        {proj.imageBase64 && (
                          <img 
                            src={proj.imageBase64} 
                            alt="Preview" 
                            className="absolute inset-0 w-full h-full object-cover opacity-60" 
                          />
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            e.stopPropagation();
                            handleProjectImageChange(selectedCategory === 'all' ? 'architecture' : selectedCategory, i, e);
                          }}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          onClick={(e) => e.stopPropagation()}
                        />
                        <span className="text-white text-sm px-4 py-2 rounded pointer-events-none relative z-10">Change Image</span>
                      </div>
                    )}
                  </div>

                  {/* Project Info */}
                  <div className="p-4 space-y-2">
                    {editMode && !viewMode ? (
                      <>
                        <input
                          className="text-h3 w-full mb-2 focus:outline-none border-b-2 border-transparent focus:border-[#7B3FF2] bg-transparent"
                          value={proj.title}
                          onChange={(e) => {
                            e.stopPropagation();
                            const projects = { ...page.projects };
                            const arr = [...(projects[selectedCategory === 'all' ? 'architecture' : selectedCategory] || [])];
                            arr[i] = { ...arr[i], title: e.target.value };
                            setPage(prev => ({ ...prev, projects: { ...projects, [selectedCategory === 'all' ? 'architecture' : selectedCategory]: arr } }));
                          }}
                          onClick={(e) => e.stopPropagation()}
                          placeholder="Project Title"
                        />
                        <input
                          className="text-body w-full mb-1 focus:outline-none border-b-2 border-transparent focus:border-[#7B3FF2] bg-transparent"
                          value={proj.location}
                          onChange={(e) => {
                            e.stopPropagation();
                            const projects = { ...page.projects };
                            const arr = [...(projects[selectedCategory === 'all' ? 'architecture' : selectedCategory] || [])];
                            arr[i] = { ...arr[i], location: e.target.value };
                            setPage(prev => ({ ...prev, projects: { ...projects, [selectedCategory === 'all' ? 'architecture' : selectedCategory]: arr } }));
                          }}
                          onClick={(e) => e.stopPropagation()}
                          placeholder="Location"
                        />
                        <input
                          className="text-body font-medium focus:outline-none border-b-2 border-transparent focus:border-[#7B3FF2] bg-transparent w-24"
                          style={{ color: 'var(--primary)' }}
                          value={proj.year}
                          onChange={(e) => {
                            e.stopPropagation();
                            const projects = { ...page.projects };
                            const arr = [...(projects[selectedCategory === 'all' ? 'architecture' : selectedCategory] || [])];
                            arr[i] = { ...arr[i], year: e.target.value };
                            setPage(prev => ({ ...prev, projects: { ...projects, [selectedCategory === 'all' ? 'architecture' : selectedCategory]: arr } }));
                          }}
                          onClick={(e) => e.stopPropagation()}
                          placeholder="Year"
                        />


                        <div className="flex items-center justify-between mt-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openProjectModal(proj, selectedCategory === 'all' ? 'architecture' : selectedCategory, i);
                            }}
                            className="text-sm hover:underline"
                            style={{ color: 'var(--primary)' }}
                          >
                            Edit Details
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeProject(selectedCategory === 'all' ? 'architecture' : selectedCategory, i);
                            }}
                            className="text-sm hover:underline"
                            style={{ color: '#ef4444' }}
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <h3 className="text-h3 mb-2 line-clamp-2">{proj.title}</h3>
                        <p className="text-body mb-1">{proj.location}</p>
                        <p className="text-body font-medium" style={{ color: 'var(--primary)' }}>{proj.year}</p>
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openProjectModal(
                                proj,
                                selectedCategory === 'all' ? 'architecture' : selectedCategory,
                                i
                              );
                            }}
                            className="
                              flex-1
                              py-2
                              border-2 border-[#7A6BEB]
                              text-[#7A6BEB]
                              font-semibold
                              rounded-lg
                              text-sm
                              shadow
                              hover:scale-102
                              transition-all duration-300
                            "
                          >
                            View Details
                          </button>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleToggleSaveProject(proj);
                            }}
                            className={`
                              p-2
                              border-2 border-[#7A6BEB]
                              rounded-lg
                              transition-all duration-300
                              shadow
                              flex items-center justify-center
                              pointer-events-auto
                              relative
                              z-20
                              ${isProjectSaved(proj.title) ? "bg-[#7A6BEB] text-white" : "text-[#7A6BEB] hover:bg-[#7A6BEB] hover:text-white"}
                            `}
                            aria-label={isProjectSaved(proj.title) ? "Unsave Project" : "Save Project"}
                          >
                            <Bookmark className={`w-5 h-5 pointer-events-none ${isProjectSaved(proj.title) ? "fill-current" : ""}`} />
                          </button>
                        </div>

                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* Premium Awards Section - 4 Column Grid */}
        <section className="section" style={{ background: 'transparent' }} id="awards">
          <div className="container">

            {/* Section Title */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-4 mb-4">
                {editMode && !viewMode ? (
                  <>
                    <input
                      className="text-[40px] font-bold text-gray-900 bg-transparent border-b border-gray-300 focus:border-[#7B3FF2] focus:outline-none text-center"
                      style={{ fontFamily: "'F Dillon', sans-serif" }}
                      value={page.awardsTitle !== undefined ? page.awardsTitle : 'Awards & recognition'}
                      onChange={(e) => handleTextChange(['awardsTitle'], e.target.value)}
                    />
                    <button
                      onClick={() => {
                        if (confirm('Clear section heading and description?')) {
                          handleTextChange(['awardsTitle'], '');
                          handleTextChange(['awardsDescription'], '');
                        }
                      }}
                      className="whitespace-nowrap px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-sm font-semibold transition-all duration-300 border border-red-200"
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  (page.awardsTitle || page.awardsTitle === undefined) && (
                    <h2 className="text-[40px] font-bold text-gray-900 tracking-wider capitalize" style={{ fontFamily: "'F Dillon', sans-serif" }}>
                      {page.awardsTitle || 'Awards & recognition'}
                    </h2>
                  )
                )}
              </div>
              {editMode && !viewMode ? (
                <div className="max-w-2xl mx-auto">
                  <input
                    className="text-base text-gray-600 w-full leading-relaxed font-light bg-transparent border-b border-gray-300 focus:border-[#7B3FF2] focus:outline-none text-center"
                    value={page.awardsDescription !== undefined ? page.awardsDescription : 'Celebrating excellence in architectural design and innovation.'}
                    onChange={(e) => handleTextChange(['awardsDescription'], e.target.value)}
                    placeholder="Enter section description..."
                  />
                </div>
              ) : (
                (page.awardsDescription || page.awardsDescription === undefined) && (
                  <p className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
                    {page.awardsDescription || 'Celebrating excellence in architectural design and innovation.'}
                  </p>
                )
              )}
            </div>

            {/* Add Award Button */}
            {editMode && !viewMode && (
              <div className="mb-6 flex items-center justify-center">
                <button
                  onClick={addAward}
                  className="btn btn-primary"
                >
                  + Add Award
                </button>
              </div>
            )}

            {/* Award Grid */}
            <div className="flex flex-wrap justify-center gap-6">
              {(page.awards || []).map((award, i) => (
                <div
                  key={i}
                  onClick={() => !editMode && !viewMode && openAwardModal(award)}
                  className="bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.03] group cursor-pointer w-full sm:w-[280px]"
                >

                  {/* Image Section */}
                  <div className="relative w-full h-[240px] overflow-hidden">
                    {award.imageBase64 ? (
                      <img
                        src={award.imageBase64}
                        alt={award.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
                        <span className="text-white text-6xl opacity-80 group-hover:opacity-100 transition">🏆</span>
                      </div>
                    )}

                    {/* Hover Shine overlay */}
                    {!editMode && !viewMode && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    )}

                    {/* Edit Image Mode */}
                    {editMode && !viewMode && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            const dataUrl = await readFileAsDataURL(file);
                            const arr = [...(page.awards || [])];
                            arr[i] = { ...arr[i], imageBase64: dataUrl };
                            setPage(prev => ({ ...prev, awards: arr }));
                          }}
                          className="opacity-0 absolute inset-0 cursor-pointer"
                        />
                        <span className="text-white text-xs px-3 py-1.5 bg-black/40 rounded-lg pointer-events-none">
                          Change Image
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Text Section */}
                  <div className="p-5">

                    {/* EDIT MODE */}
                    {editMode && !viewMode ? (
                      <>
                        <input
                          className="text-lg font-bold w-full mb-3 bg-transparent border-b border-gray-200 focus:border-[#7B3FF2] focus:outline-none"
                          value={award.title}
                          onChange={(e) => {
                            const arr = [...(page.awards || [])];
                            arr[i] = { ...arr[i], title: e.target.value };
                            setPage(prev => ({ ...prev, awards: arr }));
                          }}
                          placeholder="Award Title"
                        />

                        <textarea
                          className="text-sm text-gray-600 w-full mb-3 bg-transparent border-b border-gray-200 focus:border-[#7B3FF2] focus:outline-none resize-none"
                          rows={3}
                          value={award.organization || ''}
                          onChange={(e) => {
                            const arr = [...(page.awards || [])];
                            arr[i] = { ...arr[i], organization: e.target.value };
                            setPage(prev => ({ ...prev, awards: arr }));
                          }}
                          placeholder="Organization / Description"
                        />

                        <div className="flex items-center justify-between mt-4">
                          <input
                            className="text-sm font-medium bg-transparent border-b border-gray-200 focus:border-[#7B3FF2] focus:outline-none w-24"
                            style={{ color: 'var(--primary)' }}
                            value={award.year}
                            onChange={(e) => {
                              const arr = [...(page.awards || [])];
                              arr[i] = { ...arr[i], year: e.target.value };
                              setPage(prev => ({ ...prev, awards: arr }));
                            }}
                            placeholder="Year"
                          />

                          <button
                            onClick={() => removeAward(i)}
                            className="text-sm hover:underline text-red-500"
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    ) : (

                      /* VIEW MODE */
                      <>
                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                          {award.title}
                        </h3>

                        <p className="text-sm text-gray-600 mb-3 line-clamp-3 leading-relaxed">
                          {award.organization}
                        </p>

                        {award.year && (
                          <p className="text-sm font-semibold" style={{ color: 'var(--primary)' }}>
                            {award.year}
                          </p>
                        )}
                      </>
                    )}

                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* Premium Media Coverage Section - 3 Column Grid */}
        <section className="section" style={{ background: 'transparent' }} id="media">
          <div className="container">

            {/* Section Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-4 mb-4">
                {editMode && !viewMode ? (
                  <>
                    <input
                      className="text-[40px] font-bold text-gray-900 bg-transparent border-b border-gray-300 focus:border-[#7B3FF2] focus:outline-none text-center"
                      style={{ fontFamily: "'F Dillon', sans-serif" }}
                      value={page.mediaTitle !== undefined ? page.mediaTitle : 'Media coverage'}
                      onChange={(e) => handleTextChange(['mediaTitle'], e.target.value)}
                    />
                    <button
                      onClick={() => {
                        if (confirm('Clear section heading and description?')) {
                          handleTextChange(['mediaTitle'], '');
                          handleTextChange(['mediaDescription'], '');
                        }
                      }}
                      className="whitespace-nowrap px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-sm font-semibold transition-all duration-300 border border-red-200"
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  (page.mediaTitle || page.mediaTitle === undefined) && (
                    <h2 className="text-[40px] font-bold text-gray-900 tracking-wider capitalize" style={{ fontFamily: "'F Dillon', sans-serif" }}>
                      {page.mediaTitle || 'Media coverage'}
                    </h2>
                  )
                )}
              </div>
              {editMode && !viewMode ? (
                <div className="max-w-2xl mx-auto">
                  <input
                    className="text-base text-gray-600 w-full leading-relaxed font-light bg-transparent border-b border-gray-300 focus:border-[#7B3FF2] focus:outline-none text-center"
                    value={page.mediaDescription !== undefined ? page.mediaDescription : 'Featured in leading publications and media outlets worldwide.'}
                    onChange={(e) => handleTextChange(['mediaDescription'], e.target.value)}
                    placeholder="Enter section description..."
                  />
                </div>
              ) : (
                (page.mediaDescription || page.mediaDescription === undefined) && (
                  <p className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
                    {page.mediaDescription || 'Featured in leading publications and media outlets worldwide.'}
                  </p>
                )
              )}
            </div>

            {/* Add Media Button */}
            {editMode && !viewMode && (
              <div className="mb-6 flex items-center justify-center">
                <button
                  onClick={addMedia}
                  className="btn btn-primary"
                >
                  + Add Media
                </button>
              </div>
            )}

            {/* Media Cards Grid */}
            <div className="flex flex-wrap justify-center gap-6">
              {(page.media || []).map((item, i) => (
                <div
                  key={i}
                  onClick={() => !editMode && !viewMode && openMediaModal(item)}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:scale-[1.03] transition-all duration-300 group cursor-pointer w-full sm:w-[280px]"
                >

                  {/* Image or Placeholder */}
                  <div className="relative w-full h-[240px] overflow-hidden">
                    {item.imageBase64 ? (
                      <img
                        src={item.imageBase64}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                        <span className="text-white text-6xl opacity-80 group-hover:opacity-100 transition">
                          📰
                        </span>
                      </div>
                    )}

                    {/* Hover Overlay */}
                    {!editMode && !viewMode && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    )}

                    {/* Edit Image Mode */}
                    {editMode && !viewMode && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;

                            const dataUrl = await readFileAsDataURL(file);
                            const arr = [...(page.media || [])];
                            arr[i] = { ...arr[i], imageBase64: dataUrl };
                            setPage(prev => ({ ...prev, media: arr }));
                          }}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        <span className="text-white text-xs px-3 py-1.5 bg-black/40 rounded-lg pointer-events-none">
                          Change Image
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Text Content */}
                  <div className="p-5">

                    {/* EDIT MODE */}
                    {editMode && !viewMode ? (
                      <>
                        <input
                          className="text-lg font-bold w-full mb-3 bg-transparent border-b border-gray-200 focus:border-[#7B3FF2] focus:outline-none"
                          value={item.title}
                          onChange={(e) => {
                            const arr = [...(page.media || [])];
                            arr[i] = { ...arr[i], title: e.target.value };
                            setPage(prev => ({ ...prev, media: arr }));
                          }}
                          placeholder="Publication / Media Title"
                        />

                        <textarea
                          className="text-sm text-gray-600 w-full mb-3 bg-transparent border-b border-gray-200 focus:border-[#7B3FF2] focus:outline-none resize-none"
                          rows={3}
                          value={item.description || ''}
                          onChange={(e) => {
                            const arr = [...(page.media || [])];
                            arr[i] = { ...arr[i], description: e.target.value };
                            setPage(prev => ({ ...prev, media: arr }));
                          }}
                          placeholder="Description"
                        />

                        <div className="flex items-center justify-between mt-4">
                          <input
                            className="text-sm font-medium bg-transparent border-b border-gray-200 focus:border-[#7B3FF2] focus:outline-none flex-1"
                            style={{ color: 'var(--primary)' }}
                            value={item.date}
                            onChange={(e) => {
                              const arr = [...(page.media || [])];
                              arr[i] = { ...arr[i], date: e.target.value };
                              setPage(prev => ({ ...prev, media: arr }));
                            }}
                            placeholder="Date"
                          />

                          <button
                            onClick={() => removeMedia(i)}
                            className="text-sm hover:underline text-red-500 whitespace-nowrap ml-4"
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    ) : (

                      /* VIEW MODE */
                      <>
                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                          {item.title}
                        </h3>

                        <p className="text-sm text-gray-600 mb-3 line-clamp-3 leading-relaxed">
                          {item.description}
                        </p>

                        {item.date && (
                          <p className="text-sm font-semibold" style={{ color: 'var(--primary)' }}>
                            {item.date}
                          </p>
                        )}
                      </>
                    )}
                  </div>

                </div>
              ))}
            </div>
          </div>
        </section>


        {/* Premium Publications Section - 3 Column */}
        <section className="section" style={{ background: 'transparent' }} id="publications">
          <div className="container">

            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-4 mb-4">
                {editMode && !viewMode ? (
                  <>
                    <input
                      className="text-[40px] font-bold text-gray-900 bg-transparent border-b border-gray-300 focus:border-[#7B3FF2] focus:outline-none text-center"
                      style={{ fontFamily: "'F Dillon', sans-serif" }}
                      value={page.publicationsTitle !== undefined ? page.publicationsTitle : 'Publications'}
                      onChange={(e) => handleTextChange(['publicationsTitle'], e.target.value)}
                    />
                    <button
                      onClick={() => {
                        if (confirm('Clear section heading and description?')) {
                          handleTextChange(['publicationsTitle'], '');
                          handleTextChange(['publicationsDescription'], '');
                        }
                      }}
                      className="whitespace-nowrap px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-sm font-semibold transition-all duration-300 border border-red-200"
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  (page.publicationsTitle || page.publicationsTitle === undefined) && (
                    <h2 className="text-[40px] font-bold text-gray-900 tracking-wider capitalize" style={{ fontFamily: "'F Dillon', sans-serif" }}>
                      {page.publicationsTitle || 'Publications'}
                    </h2>
                  )
                )}
              </div>
              {editMode && !viewMode ? (
                <div className="max-w-2xl mx-auto">
                  <input
                    className="text-base text-gray-600 w-full leading-relaxed font-light bg-transparent border-b border-gray-300 focus:border-[#7B3FF2] focus:outline-none text-center"
                    value={page.publicationsDescription !== undefined ? page.publicationsDescription : 'Our published works and contributions to architectural literature.'}
                    onChange={(e) => handleTextChange(['publicationsDescription'], e.target.value)}
                    placeholder="Enter section description..."
                  />
                </div>
              ) : (
                (page.publicationsDescription || page.publicationsDescription === undefined) && (
                  <p className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
                    {page.publicationsDescription || 'Our published works and contributions to architectural literature.'}
                  </p>
                )
              )}
            </div>

            {/* Add Publication Button */}
            {editMode && !viewMode && (
              <div className="mb-6 flex items-center justify-center">
                <button
                  onClick={addPublication}
                  className="btn btn-primary"
                >
                  + Add Publication
                </button>
              </div>
            )}

            {/* Publications Grid */}
            <div className="flex flex-wrap justify-center gap-6">
              {(page.publications || []).map((pub, i) => (
                <div
                  key={i}
                  onClick={() => !editMode && !viewMode && openPublicationModal(pub)}
                  className="
            bg-white rounded-2xl overflow-hidden shadow-md 
            hover:shadow-xl hover:scale-[1.03]
            transition-all duration-300 group cursor-pointer
            w-full sm:w-[300px]
          "
                >

                  {/* Image Section */}
                  <div className="relative w-full h-[260px] overflow-hidden">
                    {pub.imageBase64 ? (
                      <img
                        src={pub.imageBase64}
                        alt={pub.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                        <span className="text-white text-6xl opacity-80 group-hover:opacity-100 transition">
                          📚
                        </span>
                      </div>
                    )}

                    {/* Hover Overlay */}
                    {!editMode && !viewMode && (
                      <div className="
                absolute inset-0 
                bg-gradient-to-t from-black/40 to-transparent 
                opacity-0 group-hover:opacity-100 
                transition-opacity duration-300
              " />
                    )}

                    {/* Edit Image Mode */}
                    {editMode && !viewMode && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            const dataUrl = await readFileAsDataURL(file);
                            const arr = [...(page.publications || [])];
                            arr[i] = { ...arr[i], imageBase64: dataUrl };
                            setPage(prev => ({ ...prev, publications: arr }));
                          }}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        <span className="text-white text-xs px-3 py-1.5 bg-black/40 rounded-lg pointer-events-none">
                          Change Image
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Text Section */}
                  <div className="p-5">

                    {/* EDIT MODE */}
                    {editMode && !viewMode ? (
                      <>
                        <input
                          className="
                    text-lg font-bold w-full mb-3 
                    bg-transparent border-b border-gray-200 
                    focus:border-[#7B3FF2] focus:outline-none
                  "
                          value={pub.title}
                          onChange={(e) => {
                            const arr = [...(page.publications || [])];
                            arr[i] = { ...arr[i], title: e.target.value };
                            setPage(prev => ({ ...prev, publications: arr }));
                          }}
                          placeholder="Publication Title"
                        />

                        <textarea
                          className="
                    text-sm text-gray-600 w-full mb-3 
                    bg-transparent border-b border-gray-200 
                    focus:border-[#7B3FF2] focus:outline-none 
                    resize-none
                  "
                          rows={3}
                          value={pub.publisher || ''}
                          onChange={(e) => {
                            const arr = [...(page.publications || [])];
                            arr[i] = { ...arr[i], publisher: e.target.value };
                            setPage(prev => ({ ...prev, publications: arr }));
                          }}
                          placeholder="Publisher / Description"
                        />

                        <div className="flex items-center justify-between mt-4">
                          <input
                            className="
                              text-sm font-medium 
                              bg-transparent border-b border-gray-200 
                              focus:border-[#7B3FF2] focus:outline-none 
                              w-24
                            "
                            style={{ color: 'var(--primary)' }}
                            value={pub.year}
                            onChange={(e) => {
                              const arr = [...(page.publications || [])];
                              arr[i] = { ...arr[i], year: e.target.value };
                              setPage(prev => ({ ...prev, publications: arr }));
                            }}
                            placeholder="Year"
                          />

                          <button
                            onClick={() => removePublication(i)}
                            className="text-sm hover:underline text-red-500"
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    ) : (

                      /* VIEW MODE */
                      <>
                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                          {pub.title}
                        </h3>

                        <p className="text-sm text-gray-600 mb-3 line-clamp-3 leading-relaxed">
                          {pub.publisher}
                        </p>

                        {pub.year && (
                          <p className="text-sm font-semibold" style={{ color: 'var(--primary)' }}>
                            {pub.year}
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* Premium Team Section */}
        <section className="section" style={{ background: 'transparent' }} id="team">
          <div className="container">

            {/* Header */}
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-4 mb-4">
                {editMode && !viewMode ? (
                  <>
                    <input
                      className="text-[40px] font-bold text-gray-900 bg-transparent border-b border-gray-300 focus:border-[#7B3FF2] focus:outline-none text-center"
                      style={{ fontFamily: "'F Dillon', sans-serif" }}
                      value={page.teamTitle !== undefined ? page.teamTitle : 'Our team'}
                      onChange={(e) => handleTextChange(['teamTitle'], e.target.value)}
                    />
                    <button
                      onClick={() => {
                        if (confirm('Clear section heading and description?')) {
                          handleTextChange(['teamTitle'], '');
                          handleTextChange(['teamDescription'], '');
                        }
                      }}
                      className="whitespace-nowrap px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-sm font-semibold transition-all duration-300 border border-red-200"
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  (page.teamTitle || page.teamTitle === undefined) && (
                    <h2 className="text-[40px] font-bold text-gray-900 tracking-wider capitalize" style={{ fontFamily: "'F Dillon', sans-serif" }}>
                      {page.teamTitle || 'Our team'}
                    </h2>
                  )
                )}
              </div>
              {editMode && !viewMode ? (
                <div className="max-w-2xl mx-auto">
                  <input
                    className="text-lg text-gray-600 w-full leading-relaxed font-light bg-transparent border-b border-gray-300 focus:border-[#7B3FF2] focus:outline-none text-center"
                    value={page.teamDescription !== undefined ? page.teamDescription : 'Meet the talented professionals behind our innovative designs.'}
                    onChange={(e) => handleTextChange(['teamDescription'], e.target.value)}
                    placeholder="Enter section description..."
                  />
                </div>
              ) : (
                (page.teamDescription || page.teamDescription === undefined) && (
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
                    {page.teamDescription || 'Meet the talented professionals behind our innovative designs.'}
                  </p>
                )
              )}
            </div>

            {/* Add Member Button */}
            {editMode && !viewMode && (
              <div className="mb-10 flex items-center justify-center">
                <button
                  onClick={addTeamMember}
                  className="btn btn-primary"
                >
                  + Add Member
                </button>
              </div>
            )}

            {/* Premium Hover-Reveal Grid */}
            <div className="flex flex-wrap justify-center gap-8">
              {(page.team || []).map((member, i) => (
                <div
                  key={i}
                  className="
            group relative cursor-pointer
            bg-white rounded-2xl overflow-hidden
            shadow-md hover:shadow-2xl
            transition-all duration-500
            hover:-translate-y-3
            w-full sm:w-[280px]
          "
                >

                  {/* Image */}
                  <div className="relative w-full h-64 overflow-hidden">
                    {member.imageBase64 ? (
                      <img
                        src={member.imageBase64}
                        alt={member.name}
                        className="
                  w-full h-full object-cover
                  grayscale group-hover:grayscale-0
                  scale-100 group-hover:scale-110
                  transition-all duration-500
                "
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-6xl text-gray-300">
                        👤
                      </div>
                    )}

                    {/* Edit Mode Image Upload */}
                    {editMode && !viewMode && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            const dataUrl = await readFileAsDataURL(file);
                            const arr = [...(page.team || [])];
                            arr[i] = { ...arr[i], imageBase64: dataUrl };
                            setPage(prev => ({ ...prev, team: arr }));
                          }}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        <span className="text-white text-xs px-3 py-1.5 bg-black/30 rounded-lg pointer-events-none">
                          Change Photo
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Hover Reveal Content */}
                  {!editMode && !viewMode && (
                    <div
                      className="
                absolute inset-0
                 backdrop-blur-3xl
                opacity-0 group-hover:opacity-100
                transition-all duration-500
                flex flex-col justify-center p-6 text-center
              "
                    >
                      <div className=" text-black">
                        <h3 className="  text-xl font-semibold mb-1">{member.name}</h3>
                        <p className="text-[#7A6BEB] text-sm font-medium mb-3">{member.role}</p>
                        <p className="text-sm text-black/60 leading-relaxed max-h-24 overflow-y-auto">
                          {member.bio}
                        </p>
                      </div>

                      {/* Decorative top bar reveal */}
                      <div className="
                absolute top-0 left-0 w-full h-1
                bg-[#7A6BEB] scale-x-0
                group-hover:scale-x-100
                transform origin-left
                transition-all duration-500
              "></div>
                    </div>
                  )}

                  {/* Non-Edit Static Content (fallback for mobile) */}
                  {!editMode && !viewMode && (
                    <div className="p-5 text-center lg:hidden">
                      <h3 className="text-lg font-semibold">{member.name}</h3>
                      <p className="text-sm text-[#7A6BEB] font-medium">{member.role}</p>
                    </div>
                  )}

                  {/* Edit Mode Content */}
                  {editMode && !viewMode && (
                    <div className="p-5 text-center space-y-3">

                      <input
                        className="
                  text-lg font-semibold w-full text-center
                  bg-transparent border-b border-gray-200 pb-1
                  focus:outline-none focus:border-[#7B3FF2]
                "
                        value={member.name}
                        onChange={(e) => {
                          const arr = [...(page.team || [])];
                          arr[i] = { ...arr[i], name: e.target.value };
                          setPage(prev => ({ ...prev, team: arr }));
                        }}
                        placeholder="Full Name"
                      />

                      <input
                        className="
                  text-sm text-gray-600 w-full text-center
                  bg-transparent border-b border-gray-200 pb-1
                  focus:outline-none focus:border-[#7B3FF2]
                "
                        value={member.role}
                        onChange={(e) => {
                          const arr = [...(page.team || [])];
                          arr[i] = { ...arr[i], role: e.target.value };
                          setPage(prev => ({ ...prev, team: arr }));
                        }}
                        placeholder="Role / Position"
                      />

                      <textarea
                        rows={3}
                        className="
                  text-xs text-gray-500 w-full text-center
                  bg-transparent border border-gray-200 rounded-lg p-2
                  focus:outline-none focus:border-[#7B3FF2]
                "
                        value={member.bio}
                        onChange={(e) => {
                          const arr = [...(page.team || [])];
                          arr[i] = { ...arr[i], bio: e.target.value };
                          setPage(prev => ({ ...prev, team: arr }));
                        }}
                        placeholder="Short Bio"
                      />

                      <button
                        onClick={() => removeTeamMember(i)}
                        className="text-red-500 text-xs hover:underline mt-3"
                      >
                        Delete
                      </button>
                    </div>
                  )}

                </div>
              ))}
            </div>

          </div>
        </section>



        {/* Premium Services Section - 4 Column */}
        {/* Premium Services Section */}
        <section className="section" style={{ background: 'transparent' }} id="services">
          <div className="container">

            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-4 mb-4">
                {editMode && !viewMode ? (
                  <>
                    <input
                      className="text-[40px] font-bold text-gray-900 bg-transparent border-b border-gray-300 focus:border-[#7B3FF2] focus:outline-none text-center"
                      style={{ fontFamily: "'F Dillon', sans-serif" }}
                      value={page.servicesTitle !== undefined ? page.servicesTitle : 'Our services'}
                      onChange={(e) => handleTextChange(['servicesTitle'], e.target.value)}
                    />
                    <button
                      onClick={() => {
                        if (confirm('Clear section heading and description?')) {
                          handleTextChange(['servicesTitle'], '');
                          handleTextChange(['servicesDescription'], '');
                        }
                      }}
                      className="whitespace-nowrap px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-sm font-semibold transition-all duration-300 border border-red-200"
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  (page.servicesTitle || page.servicesTitle === undefined) && (
                    <h2 className="text-[40px] font-bold text-gray-900 tracking-wider capitalize" style={{ fontFamily: "'F Dillon', sans-serif" }}>
                      {page.servicesTitle || 'Our services'}
                    </h2>
                  )
                )}
              </div>
              {editMode && !viewMode ? (
                <div className="max-w-2xl mx-auto">
                  <input
                    className="text-lg text-gray-600 w-full leading-relaxed font-light bg-transparent border-b border-gray-300 focus:border-[#7B3FF2] focus:outline-none text-center"
                    value={page.servicesDescription !== undefined ? page.servicesDescription : 'Comprehensive architectural solutions tailored to your vision and needs.'}
                    onChange={(e) => handleTextChange(['servicesDescription'], e.target.value)}
                    placeholder="Enter section description..."
                  />
                </div>
              ) : (
                (page.servicesDescription || page.servicesDescription === undefined) && (
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
                    {page.servicesDescription || 'Comprehensive architectural solutions tailored to your vision and needs.'}
                  </p>
                )
              )}
            </div>

            {/* Add Service Button */}
            {editMode && !viewMode && (
              <div className="mb-10 flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => {
                    const newService = { title: 'New Service', imageBase64: '', description: '' };
                    handleTextChange(['services'], [...(page.services || []), newService]);
                  }}
                  className="btn btn-primary"
                >
                  + Add Service
                </button>
              </div>
            )}

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {(page.services || []).map((s, idx) => (
                <div
                  key={idx}
                  className="
            bg-white rounded-2xl shadow-sm 
            hover:shadow-xl hover:-translate-y-2
            transition-all duration-300 overflow-hidden
            border border-gray-100 group
          "
                >

                  {/* Image */}
                  <div className="relative w-full" style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
                    <img
                      alt={s.title}
                      className="
                w-full h-full object-cover rounded-t-2xl
                transition-transform duration-700 
                group-hover:scale-110
              "
                      src={showImage(
                        s.imageBase64,
                        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop'
                      )}
                    />

                    {/* Gradient Overlay */}
                    <div className="
              absolute inset-0 bg-gradient-to-t 
              from-black/70 via-black/20 to-transparent 
              opacity-0 group-hover:opacity-100 
              transition-all duration-500
            " />

                    {/* Edit Mode – Image Upload */}
                    {editMode && !viewMode && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            const dataUrl = await readFileAsDataURL(file);
                            const arr = [...(page.services || [])];
                            arr[idx] = { ...arr[idx], imageBase64: dataUrl };
                            setPage(prev => ({ ...prev, services: arr }));
                          }}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        <span className="text-white text-sm px-4 py-2 bg-black/30 rounded-md pointer-events-none">
                          Change Image
                        </span>
                      </div>
                    )}

                    {/* Icon Badge (Glass Effect) */}
                    <div
                      className="
                absolute top-4 right-4 w-12 h-12 rounded-full
                flex items-center justify-center shadow-md
                backdrop-blur-md border border-white/50
              "
                      style={{ background: 'rgba(255, 255, 255, 0.65)' }}
                    >
                      <span className="text-2xl">🏗️</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {editMode && !viewMode ? (
                      <>
                        <input
                          className="
                    text-xl font-semibold w-full mb-3
                    bg-transparent border-b border-gray-300 pb-1
                    focus:outline-none focus:border-[#7B3FF2]
                  "
                          value={s.title}
                          onChange={(e) => {
                            const arr = [...(page.services || [])];
                            arr[idx] = { ...arr[idx], title: e.target.value };
                            setPage(prev => ({ ...prev, services: arr }));
                          }}
                          placeholder="Service Title"
                        />

                        <textarea
                          rows={3}
                          className="
                    text-sm text-gray-600 w-full mb-3
                    bg-transparent border border-gray-300 rounded-lg p-2
                    focus:outline-none focus:border-[#7B3FF2]
                  "
                          value={s.description || ''}
                          onChange={(e) => {
                            const arr = [...(page.services || [])];
                            arr[idx] = { ...arr[idx], description: e.target.value };
                            setPage(prev => ({ ...prev, services: arr }));
                          }}
                          placeholder="Service description"
                        />
                      </>
                    ) : (
                      <>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                          {s.title}
                        </h3>

                        {s.description ? (
                          <p className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                            {s.description}
                          </p>
                        ) : (
                          <p className="text-sm text-gray-400 italic mb-4">
                            No description available
                          </p>
                        )}
                      </>
                    )}

                    {/* Learn More */}
                    {!editMode && !viewMode && s.description && (
                      <div
                        className="
                  mt-2 flex items-center gap-2 text-sm font-medium
                  text-[#7B3FF2] group-hover:underline cursor-pointer
                "
                      >
                        <span>Learn More</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    )}

                    {/* Delete */}
                    {editMode && !viewMode && (
                      <div className="flex justify-center mt-4">
                        <button
                          onClick={() => {
                            const arr = [...(page.services || [])];
                            arr.splice(idx, 1);
                            setPage(prev => ({ ...prev, services: arr }));
                          }}
                          className="text-sm hover:underline"
                          style={{ color: '#ef4444' }}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>

                </div>
              ))}
            </div>
          </div>
        </section>


        {/* More Information & Address & Contact Section */}
        <section className="section" style={{ background: 'transparent' }}>
          <div className="container">

            {/* New Two-Card Layout – Premium Look */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">

              {/* ======================== LEFT CARD — MORE INFO ======================== */}
              <div
                className="
          bg-white/70 backdrop-blur-md border border-gray-200
          rounded-2xl p-8 shadow-sm
          hover:shadow-xl hover:-translate-y-1
          transition-all duration-300
        "
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-xl">
                    ℹ️
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
                    More Information
                  </h3>
                </div>

                {editMode && !viewMode ? (
                  <div className="space-y-6">

                    {/* Type */}
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">Type</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                        value={page.moreInfo?.Type || ''}
                        onChange={(e) =>
                          setPage(prev => ({
                            ...prev,
                            moreInfo: { ...prev.moreInfo, Type: e.target.value }
                          }))
                        }
                        placeholder="e.g., Architecture Studio, Private Firm"
                      />
                    </div>

                    {/* Company Size */}
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">Company Size</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                        value={page.moreInfo?.['Company Size'] || ''}
                        onChange={(e) =>
                          setPage(prev => ({
                            ...prev,
                            moreInfo: { ...prev.moreInfo, 'Company Size': e.target.value }
                          }))
                        }
                        placeholder="e.g., 10–25 Employees"
                      />
                    </div>

                    {/* Website */}
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">Website</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                        value={page.moreInfo?.Website || ''}
                        onChange={(e) =>
                          setPage(prev => ({
                            ...prev,
                            moreInfo: { ...prev.moreInfo, Website: e.target.value }
                          }))
                        }
                        placeholder="e.g., https://www.example.com"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-5">

                    {page.moreInfo?.Type && (
                      <div>
                        <p className="text-sm text-gray-500">Type</p>
                        <p className="text-lg text-gray-900 font-medium">{page.moreInfo.Type}</p>
                      </div>
                    )}

                    {page.moreInfo?.['Company Size'] && (
                      <div>
                        <p className="text-sm text-gray-500">Company Size</p>
                        <p className="text-lg text-gray-900 font-medium">
                          {page.moreInfo['Company Size']}
                        </p>
                      </div>
                    )}

                    {page.moreInfo?.Website && (
                      <div>
                        <p className="text-sm text-gray-500">Website</p>
                        <a
                          href={page.moreInfo.Website.startsWith('http') ? page.moreInfo.Website : `https://${page.moreInfo.Website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#7A6BEB] hover:text-[#6c5fe0] underline text-lg font-medium"
                        >
                          {page.moreInfo.Website}
                        </a>
                      </div>
                    )}

                    {!page.moreInfo?.Type &&
                      !page.moreInfo?.['Company Size'] &&
                      !page.moreInfo?.Website && (
                        <p className="text-sm text-gray-500 italic">No information available</p>
                      )}
                  </div>
                )}
              </div>

              {/* ======================== RIGHT CARD — CONTACT ======================== */}
              <div
                className="
          bg-white/70 backdrop-blur-md border border-gray-200
          rounded-2xl p-8 shadow-sm
          hover:shadow-xl hover:-translate-y-1
          transition-all duration-300
        "
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-xl">
                    📍
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
                    Address & Contact
                  </h3>
                </div>

                {editMode && !viewMode ? (
                  <div className="space-y-6">

                    {/* Address */}
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">Address</label>
                      <textarea
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 resize-none"
                        value={page.address?.lines?.join('\n') || ''}
                        onChange={(e) =>
                          setPage(prev => ({
                            ...prev,
                            address: {
                              lines: e.target.value.split('\n').filter(line => line.trim())
                            }
                          }))
                        }
                        placeholder="Enter full address, one line per row"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">Phone</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                        value={page.contact?.phone || ''}
                        onChange={(e) =>
                          setPage(prev => ({
                            ...prev,
                            contact: { ...prev.contact, phone: e.target.value }
                          }))
                        }
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">Email</label>
                      <input
                        type="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                        value={page.contact?.email || ''}
                        onChange={(e) =>
                          setPage(prev => ({
                            ...prev,
                            contact: { ...prev.contact, email: e.target.value }
                          }))
                        }
                        placeholder="hello@example.com"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-5">

                    {page.address?.lines && page.address.lines.length > 0 && (
                      <div>
                        <p className="text-sm text-gray-500">Address</p>
                        <p className="text-lg text-gray-900 font-medium leading-relaxed">
                          {page.address.lines.map((line, idx) => (
                            <span key={idx}>
                              {line}
                              {idx < page.address.lines.length - 1 && <br />}
                            </span>
                          ))}
                        </p>
                      </div>
                    )}

                    {page.contact?.phone && (
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <a
                          href={`tel:${page.contact.phone}`}
                          className="text-lg font-medium text-[#7A6BEB] hover:text-[#6c5fe0]"
                        >
                          {page.contact.phone}
                        </a>
                      </div>
                    )}

                    {page.contact?.email && (
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <a
                          href={`mailto:${page.contact.email}`}
                          className="text-lg font-medium text-[#7A6BEB] hover:text-[#6c5fe0]"
                        >
                          {page.contact.email}
                        </a>
                      </div>
                    )}

                    {(!page.address?.lines || page.address.lines.length === 0) &&
                      !page.contact?.phone &&
                      !page.contact?.email && (
                        <p className="text-sm text-gray-500 italic">No contact information available</p>
                      )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>


        {/* Premium Service Description Section */}
        <section className="section" style={{ background: 'transparent' }}>
          <div className="container max-w-4xl mx-auto">

            {/* Header */}
            <div className="text-center mb-10">
              <h2 className="text-[40px] font-bold text-gray-900 tracking-wider mb-3 capitalize" style={{ fontFamily: "'F Dillon', sans-serif" }}>
                Service description
              </h2>
              <div className="w-30 h-1 bg-[#7A6BEB] mx-auto rounded-full"></div>
            </div>

            {/* Luxury Card Wrapper */}
            <div
              className="
        bg-white/70 backdrop-blur-md
        border border-gray-200
        rounded-2xl p-6 shadow-sm
        shadow-xl transition-all duration-300
        mx-auto
        max-w-4xl
      "
            >
              {editMode && !viewMode ? (
                // ======================= EDIT MODE =======================
                <textarea
                  className="
            w-full p-5 text-base leading-relaxed
            bg-white/40 backdrop-blur-md
            border border-gray-300
            rounded-xl
            focus:outline-none focus:border-purple-500
            transition
          "
                  style={{ minHeight: '200px', color: 'var(--text-primary)' }}
                  value={page.serviceText}
                  onChange={(e) => setPage(prev => ({ ...prev, serviceText: e.target.value }))}
                  placeholder="Describe your services, process, philosophy, and approach..."
                />
              ) : (
                // ======================= VIEW MODE =======================
                <div className="text-gray-800 text-lg leading-relaxed whitespace-pre-line">
                  {page.serviceText?.trim() ? (
                    page.serviceText
                  ) : (
                    <p className="text-gray-500 italic">
                      No service description provided yet.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>


        {modalProject && (
          <ProjectModal
            project={modalProject}
            isOpen={true}
            onClose={closeProjectModal}
            editMode={editMode}
            onUpdate={updateProjectInModal}
            categoryKey={modalCategoryKey}
            index={modalIndex}
            viewMode={viewMode}
            onDelete={(categoryKey, index) => {
              removeProject(categoryKey, index);
              closeProjectModal();
            }}
          />
        )}

        {/* Award Modal */}
        {selectedAward && (
          <AwardModal
            award={selectedAward}
            isOpen={awardModalOpen}
            onClose={closeAwardModal}
          />
        )}

        {/* Media Modal */}
        {selectedMedia && (
          <MediaModal
            media={selectedMedia}
            isOpen={mediaModalOpen}
            onClose={closeMediaModal}
          />
        )}

        {/* Publication Modal */}
        {selectedPublication && (
          <PublicationModal
            publication={selectedPublication}
            isOpen={publicationModalOpen}
            onClose={closePublicationModal}
          />
        )}
      </div>
    </>
  );
}