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

const StudBody = () => {
  return (
    <div className="p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800"></h1>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            Find Job
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Jobs
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-800">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-5 5v-5z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 7H4l5-5v5z"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            Latest Remote Internships for Students
          </h1>
        </div>

        {/* Main Content Wrapper */}
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-1/4 space-y-6">
            {/* Save Alert */}
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="flex items-center gap-2 text-base text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                </svg>
                <span>Save this search as alert</span>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="font-medium text-gray-900 mb-6 text-center text-lg">
                Filters
              </h3>
              <div className="space-y-6">
                {/* Profile */}
                <div>
                  <label className="block text-base font-medium text-gray-700 mb-3">
                    Profile
                  </label>
                  <select className="w-full p-3 border border-gray-300 rounded-md bg-white">
                    <option>Select Profile</option>
                    <option value="telecalling">Telecalling</option>
                    <option value="sales">Sales</option>
                    <option value="marketing">Marketing</option>
                  </select>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-base font-medium text-gray-700 mb-3">
                    Location
                  </label>
                  <select className="w-full p-3 border border-gray-300 rounded-md bg-white">
                    <option>Select Location</option>
                    <option value="remote">Remote</option>
                    <option value="mumbai">Mumbai</option>
                    <option value="delhi">Delhi</option>
                    <option value="bangalore">Bangalore</option>
                  </select>
                </div>

                {/* Checkboxes */}
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded"
                    />
                    <span className="ml-3 text-base text-gray-700">
                      Work from home
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded"
                    />
                    <span className="ml-3 text-base text-gray-700">
                      Part time
                    </span>
                  </label>
                </div>

                {/* Desired Min Stipend */}
                <div>
                  <label className="block text-base font-medium text-gray-700 mb-3">
                    Desired minimum monthly
                  </label>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 flex-1">
                      0
                    </button>
                    <button className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 flex-1">
                      2k
                    </button>
                    <button className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 flex-1">
                      4k
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Keyword Search */}
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <label className="block font-medium text-gray-700 mb-3 text-center text-lg">
                Keyword search
              </label>
              <input
                placeholder="Enter keywords"
                type="text"
                className="w-full p-3 border border-gray-300 rounded-md bg-white"
              />
            </div>
          </aside>

          {/* Internship Listings */}
          <main className="flex-1 space-y-6">
            {/* Promo Box */}
            <div
              className="border border-purple-200 rounded-lg p-4"
              style={{ backgroundColor: "rgb(243, 232, 255)" }}
            >
              <h3
                className="font-semibold mb-2"
                style={{ color: "rgb(99, 0, 179)" }}
              >
                Get Internship and Job Preparation Training FREE!!
              </h3>
              <p className="text-sm mb-3" style={{ color: "rgb(124, 58, 237)" }}>
                By enrolling in trainings at FLAT 55%+10% OFF!
              </p>
              <p className="text-sm mb-3" style={{ color: "rgb(124, 58, 237)" }}>
                Choose from Web Dev, Python, Data Science, Marketing & more
              </p>
              <p className="text-sm mb-3" style={{ color: "rgb(124, 58, 237)" }}>
                Government Certified Training
              </p>
              <button
                className="text-white px-4 py-2 rounded-md text-sm font-medium hover:opacity-90"
                style={{ backgroundColor: "rgb(99, 0, 179)" }}
              >
                Enroll Now
              </button>
            </div>

            {/* Internship Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Card */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow flex flex-col">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Digital Marketing Intern
                  </h3>
                  <p className="text-gray-600 mb-3">TechCorp Solutions</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>Remote</span>
                    <span className="font-medium">₹5,000/month</span>
                    <span>3 months</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Posted 2 hours ago</p>
                </div>
                <div className="flex gap-2 justify-end mt-4">
                  <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                    View Details
                  </button>
                  <button
                    className="px-4 py-2 text-white rounded-md text-sm font-medium hover:opacity-90"
                    style={{ backgroundColor: "rgb(99, 0, 179)" }}
                  >
                    Apply
                  </button>
                </div>
              </div>

              {/* Card */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow flex flex-col">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Digital Marketing Intern
                  </h3>
                  <p className="text-gray-600 mb-3">TechCorp Solutions</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>Remote</span>
                    <span className="font-medium">₹5,000/month</span>
                    <span>3 months</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Posted 2 hours ago</p>
                </div>
                <div className="flex gap-2 justify-end mt-4">
                  <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                    View Details
                  </button>
                  <button
                    className="px-4 py-2 text-white rounded-md text-sm font-medium hover:opacity-90"
                    style={{ backgroundColor: "rgb(99, 0, 179)" }}
                  >
                    Apply
                  </button>
                </div>
              </div>

              {/* Example: Content Writing Intern */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow flex flex-col">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Content Writing Intern
                  </h3>
                  <p className="text-gray-600 mb-3">CreativeHub</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>Work from home</span>
                    <span className="font-medium">₹8,000/month</span>
                    <span>6 months</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Posted 5 hours ago</p>
                </div>
                <div className="flex gap-2 justify-end mt-4">
                  <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                    View Details
                  </button>
                  <button
                    className="px-4 py-2 text-white rounded-md text-sm font-medium hover:opacity-90"
                    style={{ backgroundColor: "rgb(99, 0, 179)" }}
                  >
                    Apply
                  </button>
                </div>
              </div>

              {/* Another Content Writing Intern */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow flex flex-col">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Content Writing Intern
                  </h3>
                  <p className="text-gray-600 mb-3">CreativeHub</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>Work from home</span>
                    <span className="font-medium">₹8,000/month</span>
                    <span>6 months</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Posted 5 hours ago</p>
                </div>
                <div className="flex gap-2 justify-end mt-4">
                  <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                    View Details
                  </button>
                  <button
                    className="px-4 py-2 text-white rounded-md text-sm font-medium hover:opacity-90"
                    style={{ backgroundColor: "rgb(99, 0, 179)" }}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};




function StudInternship() {

    return ( 
        <div>
        <div class="min-h-screen bg-white">

<Navbar/>

<Banner/> {/* banner */}

    <div class="min-h-screen bg-gray-50">

{/* stud body */}
<StudBody/>
</div>


<Carousel/>
<CarouselBtn/>

        </div>  {/* tell carouel */}
        
<Footer/>
</div>
    );
}; export default StudInternship;