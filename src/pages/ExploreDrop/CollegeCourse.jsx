import { useState } from 'react';
import Carousel from '../../components/Carousel';
import CarouselBtn from '../../components/CarouselBtn';
import Footer from '../../components/Footer';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
      <div className="text-2xl font-bold text-gray-800">ARCHIREACT</div>
      <div className="flex items-center space-x-8">
        <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">Home</a>
        <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">Find Jobs</a>
        <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">Companies</a>
        <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">Articles</a>
        <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">About Us</a>
        <a href="#" className="text-purple-600 hover:text-purple-800 border-b-2 border-purple-600 transition-colors">
          Contact Us
        </a>
        <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors">
          Login
        </button>
      </div>
    </nav>
  );
};

const Banner = ({ 
  src = "/assets/Banner2-DvVUESq3.png", 
  alt = "Banner",
  height = "h-48",
  className = "" 
}) => {
  return (
    <div className={`relative ${height} bg-gray-300 overflow-hidden ${className}`}>
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover" 
      />
    </div>
  );
};



const CollegeBody = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800"></h1>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">Find Job</button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">Jobs</button>
            <button className="p-2 text-gray-600 hover:text-gray-800">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5 5v-5z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7H4l5-5v5z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-gray-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div></div>
            <h1 className="text-3xl font-bold text-gray-900 text-center">Best BTech College in India 2025: Ranking...</h1>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort BY</span>
              <div className="flex items-center gap-1 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down w-4 h-4 text-gray-600" aria-hidden="true">
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex gap-6">

            {/* Sidebar Filters */}
            <div className="w-64 flex-shrink-0">
              {/* All Filters */}
              <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-funnel w-4 h-4" aria-hidden="true" style={{ color: 'rgb(99, 0, 179)' }}>
                      <path d="M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z"></path>
                    </svg>
                    <span className="font-medium">All Filters</span>
                  </div>
                  <button className="text-sm" style={{ color: 'rgb(99, 0, 179)' }}>Clear All</button>
                </div>
                <div className="flex gap-2 mb-4">
                  <button className="px-3 py-1 text-white rounded text-sm" style={{ backgroundColor: 'rgb(99, 0, 179)' }}>Cut off</button>
                  <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded text-sm flex items-center gap-1">
                    Full Time
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock w-3 h-3" aria-hidden="true">
                      <path d="M12 6v6l4 2"></path>
                      <circle cx="12" cy="12" r="10"></circle>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Location Filter */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h3 className="font-medium mb-3">Location</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input className="w-4 h-4 rounded" type="checkbox" style={{ accentColor: 'rgb(99, 0, 179)' }} />
                    <span className="text-sm text-gray-700">Chennai</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input className="w-4 h-4 rounded" type="checkbox" style={{ accentColor: 'rgb(99, 0, 179)' }} />
                    <span className="text-sm text-gray-700">Coimbatore</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input className="w-4 h-4 rounded" type="checkbox" style={{ accentColor: 'rgb(99, 0, 179)' }} />
                    <span className="text-sm text-gray-700">Madurai</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input className="w-4 h-4 rounded" type="checkbox" style={{ accentColor: 'rgb(99, 0, 179)' }} />
                    <span className="text-sm text-gray-700">Indian Staff</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1">
              <div className="flex flex-wrap gap-4 mb-8">

                {/* College Card: VIT Vellore */}
                <CollegeCard 
                  abbreviation="VIT"
                  name="VIT Vellore"
                  location="Vellore"
                  ranking="#11 NIRF"
                  courses="As Courses: 4"
                  exams="• VITEEE"
                  fees="₹8.87 L - ₹9 L"
                  rating="8.2"
                />

                {/* College Card: IIT Bombay (Repeated x3) */}
                <CollegeCard 
                  abbreviation="IIT"
                  name="IIT Bombay - Indian Institute of Technology"
                  location="Mumbai/Bombay"
                  courses="25 Courses: 6"
                  exams="• VITEEE"
                  fees="₹8.87 L - ₹9 L"
                  rating="8.2"
                />

                <CollegeCard 
                  abbreviation="IIT"
                  name="IIT Bombay - Indian Institute of Technology"
                  location="Mumbai/Bombay"
                  courses="25 Courses: 6"
                  exams="• VITEEE"
                  fees="₹8.87 L - ₹9 L"
                  rating="8.2"
                />

                <CollegeCard 
                  abbreviation="IIT"
                  name="IIT Bombay - Indian Institute of Technology"
                  location="Mumbai/Bombay"
                  courses="25 Courses: 6"
                  exams="• VITEEE"
                  fees="₹8.87 L - ₹9 L"
                  rating="8.2"
                />

              </div>

              {/* FAQ Section */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Commonly asked questions</h3>
                <p className="text-sm text-gray-600 mb-4">
                  On Best BTech Colleges in India 2025: Ranking, Fees, Courses, Admission, Placements, Cutoff
                </p>
                <div className="space-y-3">
                  <FAQItem question="Which is the No. 1 engineering college in India?" />
                  <FAQItem question="How many engineering colleges are there in India?" />
                  <FAQItem question="What is the difference between NIT and IIT?" />
                  <FAQItem question="Do most BTech colleges provide hostels and labs?" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// College Card Component
const CollegeCard = ({ abbreviation, name, location, ranking, courses, exams, fees, rating }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow flex-1 min-w-0 flex flex-col" style={{ flexBasis: 'calc(50% - 0.5rem)' }}>
      <div className="flex-1">
        <div className="flex gap-4 mb-4">
          <div className="w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgb(243, 232, 255)' }}>
            <span className="font-bold text-sm" style={{ color: 'rgb(99, 0, 179)' }}>{abbreviation}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-gray-900 truncate">{name}</h3>
              {ranking && <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded text-xs font-medium flex-shrink-0">{ranking}</span>}
            </div>
            <p className="text-gray-600 mb-4">{location}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
          <div>
            <span className="text-gray-500 text-xs uppercase tracking-wide">Courses Offered</span>
            <div className="font-medium text-gray-900 mt-1">{courses}</div>
          </div>
          <div>
            <span className="text-gray-500 text-xs uppercase tracking-wide">Exams Accepted</span>
            <div className="font-medium text-gray-900 mt-1">{exams}</div>
          </div>
          <div>
            <span className="text-gray-500 text-xs uppercase tracking-wide">Total Tuition Fees</span>
            <div className="font-medium text-gray-900 mt-1">{fees}</div>
          </div>
          <div>
            <span className="text-gray-500 text-xs uppercase tracking-wide">Placement Rating</span>
            <div className="font-medium text-gray-900 mt-1">{rating}</div>
          </div>
        </div>
      </div>
      <div className="flex gap-2 justify-end mt-6 pt-4 border-t border-gray-100">
        <button className="px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50">COMPARE</button>
        <button className="px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 text-white hover:opacity-90" style={{ backgroundColor: 'rgb(99, 0, 179)' }}>BROCHURE</button>
      </div>
    </div>
  );
};

// FAQ Item Component
const FAQItem = ({ question }) => {
  return (
    <div className="flex items-start gap-2">
      <span className="font-medium text-sm" style={{ color: 'rgb(99, 0, 179)' }}>Q:</span>
      <span className="text-sm hover:underline cursor-pointer" style={{ color: 'rgb(99, 0, 179)' }}>{question}</span>
    </div>
  );
};




function CollegeCourse() {

    return ( 
        <div>
        <div class="min-h-screen bg-white">

<Navbar/>

<Banner/> {/* banner */}

<CollegeBody/> {/* college body  */}


<Carousel/>
<CarouselBtn/>  {/* carousel button */}

        </div>  {/* tell carouel */}
        
<Footer/> {/* footer */}
</div>
    );
}; export default CollegeCourse;
