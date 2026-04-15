// src/components/ProfileSection.jsx
import React, { useState } from 'react';

const ProfileSection = ({ toggleEditSidebar, toggleUpdateSidebar }) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  return (
    <div className="relative">
      <div className="relative h-32 md:h-38 bg-gray-300 overflow-hidden">
        <div
          className="w-full h-full"
          style={{ background: 'linear-gradient(135deg, rgb(102, 126, 234) 0%, rgb(118, 75, 162) 100%)' }}
        ></div>
      </div>
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 md:py-6 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="relative -mt-8 md:-mt-12">
              <input
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                type="file"
              />
              <div
                className="w-20 h-20 md:w-28 md:h-28 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-gray-200 cursor-pointer hover:shadow-xl transition-shadow"
              >
                <div
                  className="w-16 h-16 md:w-24 md:h-24 bg-gray-100 rounded-xl flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="lucide lucide-camera w-6 h-6 md:w-10 md:h-10 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
                    <circle cx="12" cy="13" r="3"></circle>
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-lg md:text-2xl font-medium text-gray-800 mr-1 md:mr-2">HI</span>
              <span className="text-lg md:text-2xl">👋</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle mobile menu"
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="lucide lucide-menu w-6 h-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M4 12h16"></path>
                <path d="M4 18h16"></path>
                <path d="M4 6h16"></path>
              </svg>
            </button>
            <div className="hidden md:flex items-center space-x-4">
              <button className="px-6 py-2 border-2 border-purple-500 text-purple-600 text-sm font-medium rounded-lg transition-all duration-200 transform hover:scale-105 hover:bg-purple-50 hover:shadow-md active:scale-95">Find Internship</button>
              <button className="px-6 py-2 border-2 border-purple-500 text-purple-600 text-sm font-medium rounded-lg transition-all duration-200 transform hover:scale-105 hover:bg-purple-50 hover:shadow-md active:scale-95">Course</button>
              <button onClick={toggleEditSidebar} className="px-6 py-2 border-2 border-purple-500 text-purple-600 text-sm font-medium rounded-lg transition-all duration-200 transform hover:scale-105 hover:bg-purple-50 hover:shadow-md active:scale-95">Edit</button>
              <button onClick={toggleUpdateSidebar} className="px-6 py-2 border-2 border-purple-500 text-purple-600 text-sm font-medium rounded-lg transition-all duration-200 transform hover:scale-105 hover:bg-purple-50 hover:shadow-md active:scale-95">Update</button>
              <button className="px-6 py-2 border-2 border-purple-500 text-purple-600 text-sm font-medium rounded-lg transition-all duration-200 transform hover:scale-105 hover:bg-purple-50 hover:shadow-md active:scale-95">Features</button>
            </div>
            <div className="relative">
              <button className="p-2 rounded-full hover:bg-gray-100 transition-all duration-200 transform hover:scale-110 active:scale-95" aria-label="3 new notifications">
                <svg xmlns="http://www.w3.org/2000/svg" className="lucide lucide-bell w-6 h-6 text-gray-600 hover:text-gray-800 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M10.268 21a2 2 0 0 0 3.464 0"></path>
                  <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"></path>
                </svg>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-pulse">3</span>
              </button>
            </div>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-all duration-200 transform hover:scale-110 active:scale-95" aria-label="Add to favorites">
              <svg xmlns="http://www.w3.org/2000/svg" className="lucide lucide-star w-6 h-6 transition-colors text-gray-600 hover:text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div id="mobileMenu" className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50 ${isProfileMenuOpen ? '' : 'hidden'}`}>
        <div className="px-4 py-4 space-y-2">
          <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-purple-50 text-purple-600 font-medium transition-colors">Find Internship</button>
          <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-purple-50 text-purple-600 font-medium transition-colors">Course</button>
          <button onClick={toggleEditSidebar} className="w-full text-left px-4 py-3 rounded-lg hover:bg-purple-50 text-purple-600 font-medium transition-colors">Edit</button>
          <button onClick={toggleUpdateSidebar} className="w-full text-left px-4 py-3 rounded-lg hover:bg-purple-50 text-purple-600 font-medium transition-colors">Update</button>
          <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-purple-50 text-purple-600 font-medium transition-colors">Features</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;