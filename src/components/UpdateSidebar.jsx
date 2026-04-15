// src/components/UpdateSidebar.jsx
import React from 'react';

const UpdateSidebar = ({ isOpen, onClose }) => {
  return (
    <div className={`fixed top-0 right-0 h-full w-[500px] bg-white shadow-2xl transform transition-transform duration-300 z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <h2 className="text-lg font-semibold text-gray-800">Update Details</h2>
        <svg onClick={onClose} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800">
          <path d="M18 6 6 18"></path>
          <path d="m6 6 12 12"></path>
        </svg>
      </div>
      <div className="overflow-y-auto h-[calc(100%-4rem)] px-6 py-4">
        <div className="mb-6">
          <label className="flex items-center text-lg font-medium text-gray-700 mb-3 h-8">
            <span></span> Full Name
          </label>
          <textarea name="about" placeholder="Write about yourself" className="w-full h-24 px-4 py-4 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm resize-none"></textarea>
        </div>
        <div className="mb-6">
          <label className="flex items-center text-lg font-medium text-gray-700 mb-3 h-8">
            <span></span> Course/Degree
          </label>
          <input type="text" name="experience" placeholder="Your work experience" className="w-full h-14 px-4 py-4 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm" />
        </div>
        <div className="mb-6">
          <label className="flex items-center text-lg font-medium text-gray-700 mb-3 h-8">
            <span className="mr-2 text-xl">⚡</span> Course Duration
          </label>
          <input type="text" name="skills" placeholder="Enter your skills" className="w-full h-14 px-4 py-4 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm" />
        </div>
        <div className="mb-6">
          <label className="flex items-center text-lg font-medium text-gray-700 mb-3 h-8">
            <span></span> College Name
          </label>
          <input type="text" name="projects" placeholder="Enter your projects" className="w-full h-14 px-4 py-4 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm" />
        </div>
        <div className="mb-6">
          <label className="flex items-center text-lg font-medium text-gray-700 mb-3 h-8">
            <span></span> Preferred Job Type
          </label>
          <input type="text" name="certifications" placeholder="Enter certifications" className="w-full h-14 px-4 py-4 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm" />
        </div>
        <div className="mb-6">
          <label className="flex items-center text-lg font-medium text-gray-700 mb-3 h-8">
            <span></span> City
          </label>
          <input type="text" name="projects" placeholder="Enter your projects" className="w-full h-14 px-4 py-4 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm" />
        </div>
        <div className="mb-6">
          <label className="flex items-center text-lg font-medium text-gray-700 mb-3 h-8">
            <span></span> Instagram
          </label>
          <input type="text" name="projects" placeholder="Enter your projects" className="w-full h-14 px-4 py-4 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm" />
        </div>
        <div className="mb-6">
          <label className="flex items-center text-lg font-medium text-gray-700 mb-3 h-8">
            <span></span> LinkedIn
          </label>
          <input type="text" name="projects" placeholder="Enter your projects" className="w-full h-14 px-4 py-4 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm" />
        </div>
        <div className="mb-6">
          <label className="flex items-center text-lg font-medium text-gray-700 mb-3 h-8">
            <span></span> Personal Details
          </label>
          <input type="text" name="projects" placeholder="Enter your projects" className="w-full h-14 px-4 py-4 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm" />
        </div>
        <div className="mb-6">
          <label className="flex items-center text-lg font-medium text-gray-700 mb-3 h-8">
            <span className="mr-2 text-xl">📄</span> Resume Upload
          </label>
          <input type="file" name="resume" accept=".pdf,.doc,.docx" className="hidden" id="resume-upload" />
          <label htmlFor="resume-upload" className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed rounded-lg cursor-pointer hover:bg-purple-50 transition">
            <span className="text-sm font-medium">Click to upload resume</span>
            <span className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX (Max 5MB)</span>
          </label>
        </div>
        <div className="mb-6">
          <label className="flex items-center text-lg font-medium text-gray-700 mb-3 h-8">
            <span className="mr-2 text-xl">📄</span> Portfolio Upload
          </label>
          <input type="file" name="portfolio" accept=".pdf,.doc,.docx" className="hidden" id="portfolio-upload" />
          <label htmlFor="portfolio-upload" className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed rounded-lg cursor-pointer hover:bg-purple-50 transition">
            <span className="text-sm font-medium">Click to upload Portfolio</span>
            <span className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX (Max 5MB)</span>
          </label>
        </div>
        <div className="mt-6">
          <button className="w-full bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 transition">Update Profile</button>
        </div>
      </div>
    </div>
  );
};

export default UpdateSidebar;