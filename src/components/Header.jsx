// src/components/Header.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";


const Header = ({ toggleMobileMenu, isMobileMenuOpen }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  // ✅ Get user info on mount
  useEffect(() => {
    // Example: reading user from localStorage after login/registration
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserName(parsedUser.fullName || 'User');
      } catch (err) {
        console.error('Error parsing user from localStorage:', err);
      }
    }
  }, []);

  // ✅ Logout function
  const handleLogout = () => {
    // Clear token and user from localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');

    // Navigate to landing page
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* LEFT SECTION - Logo or Menu */}
          <div className="flex items-center space-x-12">
            <div className="text-lg font-bold text-purple-600 cursor-pointer" onClick={() => navigate('/')}>
              MyApp
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                  to="/LandingPage"
                  className='text-gray-600 hover:text-gray-900 transition-colors font-medium'
                >
                  Home
                </Link>
                <a
                  href='#'
                  className='text-gray-600 hover:text-gray-900 transition-colors font-medium'
                >
                  Jobs
                </a>
                 <Link
                  to="/BlogPage"
                  className='text-gray-600 hover:text-gray-900 transition-colors font-medium'
                >
                  Blog
                </Link>

                <Link
                  to="/AboutPage"
                  className='text-gray-600 hover:text-gray-900 transition-colors font-medium'
                >
                  About
                </Link>
              <div className="relative group">
                <button className="text-gray-600 hover:text-gray-900 transition-colors font-medium flex items-center">
                  Explore
                  <svg
                    className="ml-1 h-4 w-4 transform group-hover:rotate-180 transition-transform duration-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-1">
                  <div className="py-2">
                    <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-purple-600 transition-colors font-medium">
                      Jobs
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-purple-600 transition-colors font-medium">
                      College
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-purple-600 transition-colors font-medium">
                      Student
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-purple-600 transition-colors font-medium">
                      Find Architect
                    </button>
                  </div>
                </div>
              </div>
              
            </nav>
          </div>

          {/* RIGHT SECTION - User info & Logout */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <img
                alt={userName}
                className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 hover:border-purple-400 transition-colors cursor-pointer"
                src="https://via.placeholder.com/40x40?text=U"
              />
              <span className="text-sm font-medium text-gray-700">{userName}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-red-600 hover:text-red-700 px-4 py-2 border border-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span>Logout</span>
            </button>
          </div>

          {/* MOBILE MENU ICON */}
          <div className="md:hidden">
            <button onClick={toggleMobileMenu} className="text-gray-600 hover:text-gray-900 p-2">
              <svg
                className="h-6 w-6 transform transition-transform duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isMobileMenuOpen
                      ? 'M6 18L18 6M6 6l12 12'
                      : 'M4 6h16M4 12h16M4 18h16'
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        id="mobile-menu"
        className={`md:hidden bg-white border-t border-gray-200 ${isMobileMenuOpen ? '' : 'hidden'}`}
      >
        <div className="px-4 py-2 space-y-1">
          {/* ...your mobile menu buttons... */}
          <div className="pt-2 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="block w-full text-left px-3 py-2 text-red-600 font-medium hover:bg-red-50 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
