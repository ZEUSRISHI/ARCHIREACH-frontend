// src/App.jsx
import { useState } from 'react';
import Header from '../../components/Header';
import StudentDashboardContent from '../../components/StudentDashboardContent';

// import ExperienceSection from '../../components/ExperienceSection';
import SocialLinks from '../../components/SocialLinks';
import Footer from '../../components/Footer';

import SEditSidebar from '../../components/SEditSidebar';//S-student
import SUpdateSidebar from '../../components/UpdateSidebar'; 


//  COMPONENTS : 

const ProfileSection = ({ toggleEditSidebar, toggleUpdateSidebar }) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const closeMenu = () => setIsProfileMenuOpen(false);

  return (
    <div className="relative">
      {/* Banner */}
      <div className="relative h-32 md:h-38 bg-gray-300 overflow-hidden">
        <div
          className="w-full h-full"
          style={{
            background: 'linear-gradient(135deg, rgb(102, 126, 234) 0%, rgb(118, 75, 162) 100%)',
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 md:py-6 relative">
        <div className="flex items-center justify-between">
          {/* Left: Avatar + Greeting */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Profile Image */}
            <div className="relative -mt-8 md:-mt-12">
              <input
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                type="file"
              />
              <div className="w-20 h-20 md:w-28 md:h-28 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-gray-200 cursor-pointer hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 md:w-24 md:h-24 bg-gray-100 rounded-xl flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="lucide lucide-camera w-6 h-6 md:w-10 md:h-10 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                    <circle cx="12" cy="13" r="3" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Greeting */}
            <div className="flex items-center">
              <span className="text-lg md:text-2xl font-medium text-gray-800 mr-1 md:mr-2">HI</span>
              <span className="text-lg md:text-2xl">👋</span>
            </div>
          </div>

          {/* Right: Buttons */}
          <div className="flex items-center space-x-2 md:space-x-4">
            

            {/* Desktop buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <button className="px-6 py-2 border-2 border-purple-500 text-purple-600 text-sm font-medium rounded-lg transition hover:scale-105 hover:bg-purple-50 hover:shadow-md active:scale-95">Find Internship</button>
              <button className="px-6 py-2 border-2 border-purple-500 text-purple-600 text-sm font-medium rounded-lg transition hover:scale-105 hover:bg-purple-50 hover:shadow-md active:scale-95">Course</button>
              <button onClick={toggleEditSidebar} className="px-6 py-2 border-2 border-purple-500 text-purple-600 text-sm font-medium rounded-lg transition hover:scale-105 hover:bg-purple-50 hover:shadow-md active:scale-95">Edit</button>
              <button onClick={toggleUpdateSidebar} className="px-6 py-2 border-2 border-purple-500 text-purple-600 text-sm font-medium rounded-lg transition hover:scale-105 hover:bg-purple-50 hover:shadow-md active:scale-95">Update</button>
              <button className="px-6 py-2 border-2 border-purple-500 text-purple-600 text-sm font-medium rounded-lg transition hover:scale-105 hover:bg-purple-50 hover:shadow-md active:scale-95">Courses</button>
              <button className="px-6 py-2 border-2 border-purple-500 text-purple-600 text-sm font-medium rounded-lg transition hover:scale-105 hover:bg-purple-50 hover:shadow-md active:scale-95">Notifications</button>

              <button className="px-6 py-2 border-2 border-purple-500 text-purple-600 text-sm font-medium rounded-lg transition hover:scale-105 hover:bg-purple-50 hover:shadow-md active:scale-95">Features</button>
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                className="p-2 rounded-full hover:bg-gray-100 transition-all duration-200 transform hover:scale-110 active:scale-95"
                aria-label="3 new notifications"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="lucide lucide-bell w-6 h-6 text-gray-600 hover:text-gray-800"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M10.268 21a2 2 0 0 0 3.464 0"></path>
                  <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"></path>
                </svg>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-pulse">3</span>
              </button>
            </div>

            {/* Hamburger Menu (Mobile only) */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle mobile menu"
              onClick={() => setIsProfileMenuOpen(true)}
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
              >
                <path d="M4 12h16" />
                <path d="M4 18h16" />
                <path d="M4 6h16" />
              </svg>
            </button>
            
          </div>
        </div>
      </div>

      {/* Fullscreen Mobile Menu */}
      {isProfileMenuOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={closeMenu}
          ></div>

          {/* Menu Card */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm transform transition-all duration-300 scale-100">
            {/* Close Button */}
            <button
              onClick={closeMenu}
              className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors z-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-x w-5 h-5"
              >
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </button>

            {/* Menu Links */}
            <div className="py-8 px-6">
              <nav className="space-y-3">
                <button className="w-full text-left px-4 py-3 rounded-xl text-gray-700 hover:bg-purple-600 hover:text-white font-medium transition-all">Find Internship</button>
                <button onClick={() => {
                    toggleEditSidebar();
                    closeMenu();
                  }}
                  className="w-full text-left px-4 py-3 rounded-xl text-gray-700 hover:bg-purple-600 hover:text-white font-medium transition-all"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    toggleUpdateSidebar();
                    closeMenu();
                  }}
                  className="w-full text-left px-4 py-3 rounded-xl text-gray-700 hover:bg-purple-600 hover:text-white font-medium transition-all"
                >
                  Update
                </button>
                <button className="w-full text-left px-4 py-3 rounded-xl text-gray-700 hover:bg-purple-600 hover:text-white font-medium transition-all">Features</button>
                <button className="w-full text-left px-4 py-3 rounded-xl text-gray-700 hover:bg-purple-600 hover:text-white font-medium transition-all">Messages</button>
                <button className="w-full text-left px-4 py-3 rounded-xl text-gray-700 hover:bg-purple-600 hover:text-white font-medium transition-all">Notifications</button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};




const ExperienceSection = () => {
  return (

    <div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 mb-6 md:mb-8">
      <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 md:mb-6">EXPERIENCE</h2>
      <div className="flex items-start space-x-3 md:space-x-4 mb-4 md:mb-6">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-lg border-2 border-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
          <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center text-white text-xs font-bold">G</div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-800 text-sm md:text-base">Product Designer Lead - ARBI</h3>
          <p className="text-gray-600 text-xs md:text-sm">Google Pay • Full-time</p>
          <p className="text-gray-500 text-xs md:text-sm">Dec 2019 - Present • 4 yrs 1 mo</p>
          <p className="text-gray-600 text-xs md:text-sm mt-2 leading-relaxed">
            I am working on User experience design and User interface design of different web and mobile applications and also work on mobile apps prototyping and testing.
          </p>
        </div>
      </div>
      <div className="flex items-start space-x-3 md:space-x-4 mb-4 md:mb-6">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-lg border-2 border-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
          <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">P</div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-800 text-sm md:text-base">Associate UI Designer</h3>
          <p className="text-gray-600 text-xs md:text-sm">Paytm • Full-time</p>
          <p className="text-gray-500 text-xs md:text-sm">Dec 2018 - Nov 2019 • 1 yr</p>
          <p className="text-gray-600 text-xs md:text-sm mt-2 leading-relaxed">
            Paytm India, help users to make easy digital and UPI payments for online and offline transactions. Design Web application and mobile application.
          </p>
        </div>
      </div>
      <div className="mt-4 md:mt-6">
        <button className="w-full py-3 px-4 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-all duration-300 ease-in-out group">
          <span className="text-purple-600 font-medium text-sm group-hover:text-purple-700 inline-flex items-center justify-center">
            Show all 7 Experience
            <svg className="w-4 h-4 ml-2 transform transition-transform duration-300 ease-in-out group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </span>
        </button>
      </div>
      </div>

      {/*  */}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 mb-6 md:mb-8">
      <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 md:mb-6">SKILLS</h2>
      <div className="flex items-start space-x-3 md:space-x-4 mb-4 md:mb-6">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-lg border-2 border-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
          <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center text-white text-xs font-bold">G</div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-800 text-sm md:text-base">Product Designer Lead - ARBI</h3>
          <p className="text-gray-600 text-xs md:text-sm">Google Pay • Full-time</p>
          <p className="text-gray-500 text-xs md:text-sm">Dec 2019 - Present • 4 yrs 1 mo</p>
          <p className="text-gray-600 text-xs md:text-sm mt-2 leading-relaxed">
            I am working on User experience design and User interface design of different web and mobile applications and also work on mobile apps prototyping and testing.
          </p>
        </div>
      </div>
      <div className="flex items-start space-x-3 md:space-x-4 mb-4 md:mb-6">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-lg border-2 border-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
          <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">P</div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-800 text-sm md:text-base">Associate UI Designer</h3>
          <p className="text-gray-600 text-xs md:text-sm">Paytm • Full-time</p>
          <p className="text-gray-500 text-xs md:text-sm">Dec 2018 - Nov 2019 • 1 yr</p>
          <p className="text-gray-600 text-xs md:text-sm mt-2 leading-relaxed">
            Paytm India, help users to make easy digital and UPI payments for online and offline transactions. Design Web application and mobile application.
          </p>
        </div>
      </div>
      <div className="mt-4 md:mt-6">
        <button className="w-full py-3 px-4 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-all duration-300 ease-in-out group">
          <span className="text-purple-600 font-medium text-sm group-hover:text-purple-700 inline-flex items-center justify-center">
            Show all 7 Experience
            <svg className="w-4 h-4 ml-2 transform transition-transform duration-300 ease-in-out group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </span>
        </button>
      </div>
      </div>

        {/*  */}

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 mb-6 md:mb-8">
      <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 md:mb-6">INTERESTS</h2>
      <div className="flex items-start space-x-3 md:space-x-4 mb-4 md:mb-6">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-lg border-2 border-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
          <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center text-white text-xs font-bold">G</div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-800 text-sm md:text-base">Product Designer Lead - ARBI</h3>
          <p className="text-gray-600 text-xs md:text-sm">Google Pay • Full-time</p>
          <p className="text-gray-500 text-xs md:text-sm">Dec 2019 - Present • 4 yrs 1 mo</p>
          <p className="text-gray-600 text-xs md:text-sm mt-2 leading-relaxed">
            I am working on User experience design and User interface design of different web and mobile applications and also work on mobile apps prototyping and testing.
          </p>
        </div>
      </div>
      <div className="flex items-start space-x-3 md:space-x-4 mb-4 md:mb-6">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-lg border-2 border-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
          <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">P</div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-800 text-sm md:text-base">Associate UI Designer</h3>
          <p className="text-gray-600 text-xs md:text-sm">Paytm • Full-time</p>
          <p className="text-gray-500 text-xs md:text-sm">Dec 2018 - Nov 2019 • 1 yr</p>
          <p className="text-gray-600 text-xs md:text-sm mt-2 leading-relaxed">
            Paytm India, help users to make easy digital and UPI payments for online and offline transactions. Design Web application and mobile application.
          </p>
        </div>
      </div>
      <div className="mt-4 md:mt-6">
        <button className="w-full py-3 px-4 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-all duration-300 ease-in-out group">
          <span className="text-purple-600 font-medium text-sm group-hover:text-purple-700 inline-flex items-center justify-center">
            Show all 7 Experience
            <svg className="w-4 h-4 ml-2 transform transition-transform duration-300 ease-in-out group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </span>
        </button>
      </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 mb-6 md:mb-8">
      <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 md:mb-6">PROJECTS</h2>
      <div className="flex items-start space-x-3 md:space-x-4 mb-4 md:mb-6">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-lg border-2 border-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
          <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center text-white text-xs font-bold">G</div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-800 text-sm md:text-base">Product Designer Lead - ARBI</h3>
          <p className="text-gray-600 text-xs md:text-sm">Google Pay • Full-time</p>
          <p className="text-gray-500 text-xs md:text-sm">Dec 2019 - Present • 4 yrs 1 mo</p>
          <p className="text-gray-600 text-xs md:text-sm mt-2 leading-relaxed">
            I am working on User experience design and User interface design of different web and mobile applications and also work on mobile apps prototyping and testing.
          </p>
        </div>
      </div>
      <div className="flex items-start space-x-3 md:space-x-4 mb-4 md:mb-6">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-lg border-2 border-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
          <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">P</div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-800 text-sm md:text-base">Associate UI Designer</h3>
          <p className="text-gray-600 text-xs md:text-sm">Paytm • Full-time</p>
          <p className="text-gray-500 text-xs md:text-sm">Dec 2018 - Nov 2019 • 1 yr</p>
          <p className="text-gray-600 text-xs md:text-sm mt-2 leading-relaxed">
            Paytm India, help users to make easy digital and UPI payments for online and offline transactions. Design Web application and mobile application.
          </p>
        </div>
      </div>
      <div className="mt-4 md:mt-6">
        <button className="w-full py-3 px-4 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-all duration-300 ease-in-out group">
          <span className="text-purple-600 font-medium text-sm group-hover:text-purple-700 inline-flex items-center justify-center">
            Show all 7 Experience
            <svg className="w-4 h-4 ml-2 transform transition-transform duration-300 ease-in-out group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </span>
        </button>
      </div>
      </div>



      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 mb-6 md:mb-8">
      <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 md:mb-6">CERTIFICATIONS</h2>
      <div className="flex items-start space-x-3 md:space-x-4 mb-4 md:mb-6">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-lg border-2 border-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
          <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center text-white text-xs font-bold">G</div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-800 text-sm md:text-base">Product Designer Lead - ARBI</h3>
          <p className="text-gray-600 text-xs md:text-sm">Google Pay • Full-time</p>
          <p className="text-gray-500 text-xs md:text-sm">Dec 2019 - Present • 4 yrs 1 mo</p>
          <p className="text-gray-600 text-xs md:text-sm mt-2 leading-relaxed">
            I am working on User experience design and User interface design of different web and mobile applications and also work on mobile apps prototyping and testing.
          </p>
        </div>
      </div>
      <div className="flex items-start space-x-3 md:space-x-4 mb-4 md:mb-6">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-lg border-2 border-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
          <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">P</div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-800 text-sm md:text-base">Associate UI Designer</h3>
          <p className="text-gray-600 text-xs md:text-sm">Paytm • Full-time</p>
          <p className="text-gray-500 text-xs md:text-sm">Dec 2018 - Nov 2019 • 1 yr</p>
          <p className="text-gray-600 text-xs md:text-sm mt-2 leading-relaxed">
            Paytm India, help users to make easy digital and UPI payments for online and offline transactions. Design Web application and mobile application.
          </p>
        </div>
      </div>
      <div className="mt-4 md:mt-6">
        <button className="w-full py-3 px-4 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-all duration-300 ease-in-out group">
          <span className="text-purple-600 font-medium text-sm group-hover:text-purple-700 inline-flex items-center justify-center">
            Show all 7 Experience
            <svg className="w-4 h-4 ml-2 transform transition-transform duration-300 ease-in-out group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </span>
        </button>
      </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 mb-6 md:mb-8">
      <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 md:mb-6">EDUCATION</h2>
      <div className="flex items-start space-x-3 md:space-x-4 mb-4 md:mb-6">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-lg border-2 border-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
          <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center text-white text-xs font-bold">G</div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-800 text-sm md:text-base">Product Designer Lead - ARBI</h3>
          <p className="text-gray-600 text-xs md:text-sm">Google Pay • Full-time</p>
          <p className="text-gray-500 text-xs md:text-sm">Dec 2019 - Present • 4 yrs 1 mo</p>
          <p className="text-gray-600 text-xs md:text-sm mt-2 leading-relaxed">
            I am working on User experience design and User interface design of different web and mobile applications and also work on mobile apps prototyping and testing.
          </p>
        </div>
      </div>
      <div className="flex items-start space-x-3 md:space-x-4 mb-4 md:mb-6">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-lg border-2 border-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
          <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">P</div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-800 text-sm md:text-base">Associate UI Designer</h3>
          <p className="text-gray-600 text-xs md:text-sm">Paytm • Full-time</p>
          <p className="text-gray-500 text-xs md:text-sm">Dec 2018 - Nov 2019 • 1 yr</p>
          <p className="text-gray-600 text-xs md:text-sm mt-2 leading-relaxed">
            Paytm India, help users to make easy digital and UPI payments for online and offline transactions. Design Web application and mobile application.
          </p>
        </div>
      </div>
      <div className="mt-4 md:mt-6">
        <button className="w-full py-3 px-4 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-all duration-300 ease-in-out group">
          <span className="text-purple-600 font-medium text-sm group-hover:text-purple-700 inline-flex items-center justify-center">
            Show all 7 Experience
            <svg className="w-4 h-4 ml-2 transform transition-transform duration-300 ease-in-out group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </span>
        </button>
      </div>
      </div>


      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 mb-6 md:mb-8">
      <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 md:mb-6">ACHIEVEMENTS</h2>
      <div className="flex items-start space-x-3 md:space-x-4 mb-4 md:mb-6">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-lg border-2 border-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
          <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center text-white text-xs font-bold">G</div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-800 text-sm md:text-base">Product Designer Lead - ARBI</h3>
          <p className="text-gray-600 text-xs md:text-sm">Google Pay • Full-time</p>
          <p className="text-gray-500 text-xs md:text-sm">Dec 2019 - Present • 4 yrs 1 mo</p>
          <p className="text-gray-600 text-xs md:text-sm mt-2 leading-relaxed">
            I am working on User experience design and User interface design of different web and mobile applications and also work on mobile apps prototyping and testing.
          </p>
        </div>
      </div>
      <div className="flex items-start space-x-3 md:space-x-4 mb-4 md:mb-6">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-lg border-2 border-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
          <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">P</div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-800 text-sm md:text-base">Associate UI Designer</h3>
          <p className="text-gray-600 text-xs md:text-sm">Paytm • Full-time</p>
          <p className="text-gray-500 text-xs md:text-sm">Dec 2018 - Nov 2019 • 1 yr</p>
          <p className="text-gray-600 text-xs md:text-sm mt-2 leading-relaxed">
            Paytm India, help users to make easy digital and UPI payments for online and offline transactions. Design Web application and mobile application.
          </p>
        </div>
      </div>
      <div className="mt-4 md:mt-6">
        <button className="w-full py-3 px-4 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-all duration-300 ease-in-out group">
          <span className="text-purple-600 font-medium text-sm group-hover:text-purple-700 inline-flex items-center justify-center">
            Show all 7 Experience
            <svg className="w-4 h-4 ml-2 transform transition-transform duration-300 ease-in-out group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </span>
        </button>
      </div>
      </div>

    </div>
    
  );
};

// <!--  Open Position section-->

const jobList = [
  {
    id: 1,
    company: 'Freepik',
    location: 'China',
    logo: 'data:image/png;base64,', // Replace with real base64 or URL
    title: 'Visual Designer',
    type: 'Full Time',
    salary: '$10K-$15K',
    featured: true,
  },
  {
    id: 2,
    company: 'Instagram',
    location: 'Australia',
    logo: '/assets/Insta-CAkpIuSd.png',
    title: 'Front End Developer',
    type: 'Contract Basis',
    salary: '$50K-$80K',
    featured: false,
  },
  {
    id: 3,
    company: 'Upwork',
    location: 'Remote',
    logo: 'data:image/png;base64,...', // Replace with real base64 or URL
    title: 'Backend Developer',
    type: 'Remote',
    salary: '$40K-$70K',
    featured: false,
  },
  {
    id: 4,
    company: 'Freepik',
    location: 'China',
    logo: 'data:image/png;base64,...',
    title: 'Visual Designer',
    type: 'Full Time',
    salary: '$10K-$15K',
    featured: true,
  },
  {
    id: 5,
    company: 'Freepik',
    location: 'China',
    logo: 'data:image/png;base64,...',
    title: 'Visual Designer',
    type: 'Full Time',
    salary: '$10K-$15K',
    featured: true,
  },
];

const OpenPositions = () => {
  return (
    <div className="max-w-6xl mx-auto p-6  mb-12">
      {/* Section Title */}
      <h1 className="text-2xl font-bold text-gray-800 mb-8 text-left">
        Open Positions ({jobList.length.toString().padStart(2, '0')})
      </h1>

      {/* Cards Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {jobList.map((job) => (
          <div key={job.id} className="bg-white  rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
            <div className="p-6 flex-1">
              {/* Company Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-white shadow-sm">
                    <img src={job.logo} alt={`${job.company} logo`} className="w-8 h-8 object-contain" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-gray-800">{job.company}</h3>
                      {job.featured && (
                        <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full font-medium">
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="flex items-center text-gray-500 text-sm mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <span>{job.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Job Title */}
              <h2 className="text-lg font-semibold text-gray-900 mb-3">{job.title}</h2>

              {/* Type & Salary */}
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span className="bg-gray-100 px-3 py-1 rounded-full">{job.type}</span>
                <span className="font-medium text-gray-800">{job.salary}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};




function BrandDash() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEditSidebarOpen, setIsEditSidebarOpen] = useState(false);
  const [isUpdateSidebarOpen, setIsUpdateSidebarOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleEditSidebar = () => {
    setIsEditSidebarOpen(!isEditSidebarOpen);
    setIsUpdateSidebarOpen(false); // Close other sidebar
  };

  const toggleUpdateSidebar = () => {
    setIsUpdateSidebarOpen(!isUpdateSidebarOpen);
    setIsEditSidebarOpen(false); // Close other sidebar
  };

  return (
    <div>
      <Header
        toggleMobileMenu={toggleMobileMenu}
        isMobileMenuOpen={isMobileMenuOpen}
      />
      <ProfileSection
        toggleEditSidebar={toggleEditSidebar}
        toggleUpdateSidebar={toggleUpdateSidebar}
      />
      
<div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-8">
  <StudentDashboardContent />


  <div className="max-w-2xl mx-auto">
    <ExperienceSection />
    <SocialLinks />
  </div>

  <OpenPositions />

</div>

      <Footer />

      {/* Dynamic Sidebars */}
      <SEditSidebar isOpen={isEditSidebarOpen} onClose={toggleEditSidebar} />
      <SUpdateSidebar isOpen={isUpdateSidebarOpen} onClose={toggleUpdateSidebar} />
    </div>
  );
}

export default BrandDash;