// src/App.jsx
import { useState } from 'react';
import Header from '../../components/Header';

import Footer from '../../components/Footer';

// import MainContent from '../../components/MainContent';
import CEditSidebar from '../../components/CEditSidebar';
import CUpdateSidebar from '../../components/CUpdateSidebar';
import Carousel from '../../components/Carousel';
import CarouselBtn from '../../components/CarouselBtn';




//  COMPONENTS : 

const MainContent = ({ onEditClick, onUpdateClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  return (
    <div className="min-h-screen bg-white ">
      {/* Violet Cloth Banner */}
      <div className="relative h-48 bg-gray-300 overflow-hidden">
        <img alt="Banner" className="w-full h-full object-cover" src="https://delightful-conkies-ead2c8.netlify.app/assets/Banner2-DvVUESq3.png" />
      </div>

      <div className="min-h-screen">
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-end lg:justify-end gap-3">
            {/* Desktop Buttons */}
            <div className="hidden lg:flex flex-wrap justify-end items-center gap-3">
              <button className="px-6 py-2 border-2 border-purple-500 text-purple-600 text-sm font-medium rounded-lg hover:bg-purple-50 transition-colors">Find Jobs</button>
              <button id="edit-btn" onClick={onEditClick} className="px-6 py-2 border-2 border-purple-500 text-purple-600 text-sm font-medium rounded-lg hover:bg-purple-50 transition-colors">Edit</button>
              <button id="update-btn" onClick={onUpdateClick} className="px-6 py-2 border-2 border-purple-500 text-purple-600 text-sm font-medium rounded-lg hover:bg-purple-50 transition-colors">Update</button>
              <button className="px-6 py-2 border-2 border-purple-500 text-purple-600 text-sm font-medium rounded-lg hover:bg-purple-50 transition-colors">Events</button>
              <button className="px-6 py-2 border-2 border-purple-500 text-purple-600 text-sm font-medium rounded-lg hover:bg-purple-50 transition-colors">Course</button>
              <button className="px-6 py-2 border-2 border-purple-500 text-purple-600 text-sm font-medium rounded-lg hover:bg-purple-50 transition-colors">Features</button>
            </div>
            
            {/* Mobile Menu symb (hamburger) */}
            <div className="lg:hidden flex justify-end">
              <button id="menuToggle" onClick={toggleMenu} className="p-3 rounded-lg border-2 border-purple-500 text-purple-600 hover:bg-purple-50 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu w-6 h-6" aria-hidden="true">
                  <path d="M4 12h16"></path>
                  <path d="M4 18h16"></path>
                  <path d="M4 6h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
            <div id="mobileMenu2" className="lg:hidden fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black transition-opacity" onClick={closeMenu}></div>
            {/* Menu Card */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm transform transition-all duration-300 scale-100">
              {/* Close Button */}
              <button id="menuClose" onClick={closeMenu} className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors z-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x w-5 h-5" aria-hidden="true">
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </button>
              {/* Nav Links */}
              <div className="py-8 px-6">
                <nav className="space-y-3">
                  <button onClick={closeMenu} className="w-full text-left px-4 py-3 rounded-xl text-gray-700 hover:bg-purple-600 hover:text-white transition-all duration-300 font-medium">Find Jobs</button>
                  <button onClick={closeMenu} className="w-full text-left px-4 py-3 rounded-xl text-gray-700 hover:bg-purple-600 hover:text-white transition-all duration-300 font-medium">Events</button>
                  <button onClick={closeMenu} className="w-full text-left px-4 py-3 rounded-xl text-gray-700 hover:bg-purple-600 hover:text-white transition-all duration-300 font-medium">Course</button>
                  <button onClick={closeMenu} className="w-full text-left px-4 py-3 rounded-xl text-gray-700 hover:bg-purple-600 hover:text-white transition-all duration-300 font-medium">Features</button>
                </nav>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
      
        <div className="w-full p-6">
          <img alt="SRM Institute of Science and Technology Campus" className="w-full h-auto object-cover rounded-lg" src="/assets/College.png" />
        </div>
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                </div>
                <h2 className="text-xl font-bold text-gray-800">SRM Institute of Science and Technology</h2>
              </div>
              <h3 className="text-lg font-semibold text-blue-600 mb-3">One of India's Best Ranked Universities</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">SRM Institute of Sr,alli in TN, Modinagar in UP & Sonipat in Haryana - total of which is 85 years old.</p>
              <p className="text-gray-600 text-sm leading-relaxed">SRM University offers a wide range of undergraduate, postgraduate and doctoral programs in its faculties - Engineering & Technology, Management, Medicine & Health sciences, Science & Humanities, Law and Agricultural Sciences.</p>
            </div>

            <div className="bg-white rounded-lg shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                </div>
                <h2 className="text-xl font-bold text-gray-800">Vision</h2>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">"To emerge as a World – Class University in creating and disseminating knowledge and providing students a unique learning experience in Science, Technology, Medicine, Management and other areas of Scholarship that will best serve the world and the betterment of mankind."</p>
            </div>

            <div className="bg-white rounded-lg shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </div>
                <h2 className="text-xl font-bold text-gray-800">Mission</h2>
              </div>
              <div className="space-y-3">
                <p className="text-gray-600 text-sm leading-relaxed"><span className="font-semibold">MOVE UP</span> through international alliances and collaborative initiatives to achieve global excellence.</p>
                <p className="text-gray-600 text-sm leading-relaxed"><span className="font-semibold">ACCOMPLISH</span> a process to advance knowledge in a rigorous academic and research environment.</p>
                <p className="text-gray-600 text-sm leading-relaxed"><span className="font-semibold">ATTRACT AND RETAIN PEOPLE</span> in a rewarding and an insption.</p>
              </div>
            </div>
          </div>
        </div>
        

        <div className="max-w-6xl mx-auto p-6 min-h-screen">
          {/* Courses Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">COURSES</h1>
          </div>
          <div className="space-y-6">
            {/* B.ARCH Card */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3">
                  <img alt="Architecture Building" className="w-full h-64 md:h-full object-cover" src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" />
                </div>
                <div className="md:w-2/3 p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-2">B.ARCH</h2>
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">5 YEAR UNDER GRADUATE COURSE</h3>
                  <h4 className="text-md font-medium text-gray-600 mb-3">ELIGIBILITY</h4>
                  <p className="text-gray-600 leading-relaxed">
                    All candidates shall be admitted to Architecture course either by the passed 10+2 or equivalent examination with Mathematics as compulsory subject along with either Chemistry or Biology or Technical Vocational subject or Computer Science or Information Technology.
                  </p>
                </div>
              </div>
            </div>

            {/* B.DES Card */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3">
                  <img alt="Design Studio" className="w-full h-64 md:h-full object-cover" src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" />
                </div>
                <div className="md:w-2/3 p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-2">B.DES</h2>
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">4 YEAR UNDER GRADUATE COURSE</h3>
                  <h4 className="text-md font-medium text-gray-600 mb-3">ELIGIBILITY</h4>
                  <p className="text-gray-600 leading-relaxed">
                    All candidates shall be admitted to Architecture course either by the passed 10+2 or equivalent examination with Physics and Mathematics or Biology or Technical Vocational subject or Computer Science or Information Technology.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Academics Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Academics</h2>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3">
                  <img alt="Modern Building" className="w-full h-64 md:h-full object-cover" src="https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" />
                </div>
                <div className="md:w-2/3 p-6">
                  <p className="text-gray-600 leading-relaxed">
                    SPARSH's engineering programs emphasize to be at the forefront of innovation. They also learn more development collaborations aimed at solving the most pressing global problems.
                  </p>
                  <p className="text-gray-600 leading-relaxed mt-3">
                    Our courses are designed to be a small technology and systems. We believe that engineers should not only possess deep technical excellence, but also develop a deep appreciation for the social contexts in which they operate that cover from exposure to creative, liberal arts.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sports Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Sports</h2>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3">
                  <img alt="Sports Activities" className="w-full h-64 md:h-full object-cover" src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" />
                </div>
                <div className="md:w-2/3 p-6">
                  <p className="text-gray-600 leading-relaxed">Monthly Sports Achievements</p>
                  <p className="text-gray-600 leading-relaxed mt-2">
                    Monthly Sports Achievements: July 2021 is scheduled of conducting different types of sports activities among other multidisciplinary international invitational, hymn, international; More than 1km Men's Kabaddi tournament in Odisha. More than 2km Gold Road Medal in Sports.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  
  );
};





function CollegeDash() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEditSidebarOpen, setIsEditSidebarOpen] = useState(false);
  const [isUpdateSidebarOpen, setIsUpdateSidebarOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };


  return (
    <div className="min-h-screen bg-white">
      <Header
        toggleMobileMenu={toggleMobileMenu}
        isMobileMenuOpen={isMobileMenuOpen}
      />
     
        
       <main>
        <MainContent 
          onEditClick={() => setIsEditSidebarOpen(true)}
          onUpdateClick={() => setIsUpdateSidebarOpen(true)}
        />
        <Carousel />
        <CarouselBtn />
      </main>
      
      
      <Footer />

      {/* Dynamic Sidebars */}
      <CEditSidebar isOpen={isEditSidebarOpen} onClose={() => setIsEditSidebarOpen(false)} />
      <CUpdateSidebar isOpen={isUpdateSidebarOpen} onClose={() => setIsUpdateSidebarOpen(false)} />
      
    </div>
  );
}

export default CollegeDash;