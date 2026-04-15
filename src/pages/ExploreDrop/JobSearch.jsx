import { useState } from 'react';
import '../../index.css';
import SharedNavbar from '../../components/Layout/SharedNavbar';



// components :

const Header = () => {
  return (
    <div className="border-gray-200 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-center text-gray-900 mb-3 tracking-tight">
          Find your Dream Job Now
        </h1>
        <p className="text-center text-gray-700 mb-8 text-lg font-semibold">
          5 lakh+ jobs for you to explore
        </p>

        <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
          {/* Skills Input */}
          <div className="flex-1 relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="m21 21-4.34-4.34"></path>
              <circle cx="11" cy="11" r="8"></circle>
            </svg>
            <input
              type="text"
              placeholder="Enter skills / designations / companies"
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 font-semibold"
            />
          </div>

          {/* Experience Dropdown */}
          <div className="relative w-full md:w-48">
            <select className="w-full appearance-none bg-white border-2 border-gray-300 rounded-lg px-4 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-purple-500 font-semibold">
              <option>Select experience</option>
              <option>0-1 years</option>
              <option>1-3 years</option>
              <option>3-6 years</option>
              <option>6-10 years</option>
              <option>10+ years</option>
            </select>
            <svg
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="m6 9 6 6 6-6"></path>
            </svg>
          </div>

          {/* Location Input */}
          <div className="flex-1 relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <input
              type="text"
              placeholder="Enter location"
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 font-semibold"
            />
          </div>

          {/* Search Button */}
          <button className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 font-bold text-base shadow-md hover:shadow-lg transition-all w-full md:w-auto">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};



const Filter = () => {
  return (
    <div className="w-80 flex-shrink-0">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-extrabold text-gray-900">
            Filters related to job
          </h2>
          <span className="text-xs text-purple-600 font-bold cursor-pointer hover:text-purple-800">
            + PREMIUM FILTERS
          </span>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-200">
          <button className="text-sm text-purple-600 border-b-2 border-purple-600 pb-2 font-bold">
            All Filters
          </button>
          <button className="text-sm text-gray-600 pb-2 hover:text-gray-800 font-semibold">
            Applied (0)
          </button>
        </div>

        {/* Filters Section */}
        <div>
          {/* Experience */}
          <div className="mb-6">
            <h3 className="font-bold mb-3 text-gray-900">Experience</h3>
            <div className="relative mb-4">
              <input
                type="range"
                min="0"
                max="30"
                defaultValue="0"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-600 mt-2">
                <span>0 years</span>
                <span className="font-medium text-blue-600">0 years</span>
                <span>30+ years</span>
              </div>
            </div>
          </div>

          {/* Salary */}
          <div className="mb-6">
            <h3 className="font-bold mb-3 text-gray-900">Salary</h3>
            <div className="space-y-2">
              {[
                "0-3 Lakhs (83)",
                "3-6 Lakhs (140)",
                "6-10 Lakhs (98)",
                "10-15 Lakhs (49)",
              ].map((item, i) => (
                <label
                  key={i}
                  className="flex items-center text-sm cursor-pointer hover:bg-gray-50 -mx-2 px-2 py-1 rounded"
                >
                  <input
                    type="checkbox"
                    className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">{item}</span>
                </label>
              ))}
            </div>
            <button className="text-sm text-purple-600 mt-2 hover:text-purple-800 font-bold">
              View More
            </button>
          </div>

          {/* Department */}
          <div className="mb-6">
            <h3 className="font-bold mb-3 text-gray-900">Department</h3>
            <div className="space-y-2">
              {[
                "Engineering - Software & QA (129)",
                "Sales & Business Development (100)",
                "Data Science & Analytics (45)",
                "All Software & Data (28)",
              ].map((item, i) => (
                <label
                  key={i}
                  className="flex items-center text-sm cursor-pointer hover:bg-gray-50 -mx-2 px-2 py-1 rounded"
                >
                  <input
                    type="checkbox"
                    className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">{item}</span>
                </label>
              ))}
            </div>
            <button className="text-sm text-purple-600 mt-2 hover:text-purple-800 font-bold">
              View More
            </button>
          </div>

          <div className="mb-6">
            <h3 className="font-medium mb-3 text-gray-900">Department</h3>
            <div className="space-y-2">
              {[
                "Engineering - Software & QA (129)",
                "Sales & Business Development (100)",
                "Data Science & Analytics (45)",
                "All Software & Data (28)",
              ].map((item, i) => (
                <label
                  key={i}
                  className="flex items-center text-sm cursor-pointer hover:bg-gray-50 -mx-2 px-2 py-1 rounded"
                >
                  <input
                    type="checkbox"
                    className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">{item}</span>
                </label>
              ))}
            </div>
            <button className="text-sm text-purple-600 mt-2 hover:text-purple-800 font-bold">
              View More
            </button>
          </div>

        </div>

        {/* Apply Button */}
        <div className="mt-4 pt-3 border-t border-gray-200">
          <button className="w-full bg-purple-600 text-white py-2.5 px-3 rounded-md hover:bg-purple-700 transition-colors font-bold text-sm shadow-md">
            Apply Filters (0)
          </button>
        </div>
      </div>
    </div>
  );
};


const Center = () => {
  return (
    <div className="w-2/4 bg-white p-4 rounded-lg">
      {/* AI Mock Interview Banner */}
      <div className="bg-gradient-to-r from-teal-400 to-blue-500 rounded-lg p-6 mb-6 text-white relative overflow-hidden">
        <div className="flex items-center justify-between">
          {/* Left Content */}
          <div className="flex flex-col justify-center">
            <h3 className="text-xl font-extrabold mb-2">Give customised mock interview with AI</h3>
            <p className="text-sm opacity-90 mb-3 font-semibold">Get AI generated personalised feedback</p>
            <button className="bg-white text-purple-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-purple-50 transition-colors">
              Start Interview
            </button>
          </div>

          {/* Right Content */}
          <div className="flex flex-col items-center text-right">
            <div className="bg-white bg-opacity-20 rounded-full p-3 inline-flex items-center justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                strokeLinejoin="round" className="lucide lucide-users w-8 h-8" aria-hidden="true">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <path d="M16 3.128a4 4 0 0 1 0 7.744"></path>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <circle cx="9" cy="7" r="4"></circle>
              </svg>
            </div>
            <div className="text-xs opacity-75">noukai.ai</div>
          </div>
        </div>
      </div>

      {/* Filter Tags */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {[
          { icon: "🏠", text: "Remote" },
          { icon: "💼", text: "MNC" },
          { icon: "🚀", text: "Product Mgr..." },
          { icon: "📊", text: "Analytics" },
          { icon: "💻", text: "Software D..." },
          { icon: "⚙️", text: "Engineering" },
          { icon: "📈", text: "Marketing" },
          { icon: "🔧", text: "Startup" },
          { icon: "💰", text: "Data Scien..." },
          { icon: "🏦", text: "Banking &..." },
          { icon: "👥", text: "Fresher" }
        ].map((tag, index) => (
          <span key={index} className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm font-medium hover:bg-gray-50 cursor-pointer">
            <span>{tag.icon}</span> {tag.text}
          </span>
        ))}
      </div>

      {/* Salary Filter */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm font-medium text-orange-700">Filter jobs by salary</span>
        </div>
        <div className="flex flex-wrap gap-3">
          {["₹ 0-3 Lakhs", "₹ 3-6 Lakhs", "₹ 6-10 Lakhs", "₹ 10-15 Lakhs"].map((salary, index) => (
            <button key={index} className="bg-white border border-orange-300 rounded-full px-5 py-2 text-sm font-medium text-orange-700 hover:bg-orange-100">
              {salary}
            </button>
          ))}
        </div>
      </div>

      {/* Job Listings */}
      <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <JobCard key={index} />
        ))}
      </div>

      {/* Roles from top companies */}
      <div className="mb-8 text-left">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
          Roles from top companies
        </h2>
        <p className="text-gray-700 font-semibold">
          Discover exciting opportunities from leading organizations
        </p>
      </div>

      {/* Horizontal Scroll Job Cards */}
      <div className="common-card-scroll overflow-x-auto max-h-[80vh]">
  <div className="scroll-track flex flex-row gap-6">
    {[...Array(4)].map((_, index) => (
      <ScrollJobCard key={index} />
    ))}
  </div>
</div>


      {/* Top Companies */}
      <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-6 px-4 tracking-tight">Top Companies</h2>
     <div className="common-card-scroll overflow-x-auto">
  <div className="scroll-track flex flex-row gap-6">
          {[
            { title: "Security Assistant", company: "Besant Technologies", description: "Do what you love. To be successful in this role you will...", color: "blue" },
            { title: "Frontend Developer", company: "Infosys", description: "Work on cutting-edge projects using React, TailwindCSS and more...", color: "green" },
            { title: "Data Analyst", company: "Accenture", description: "Analyze data trends, build dashboards and support business insights...", color: "yellow" },
            { title: "Software Engineer", company: "TCS", description: "Kickstart your career in software development and grow with a global leader...", color: "purple" }
          ].map((job, index) => (
            <CommonCard key={index} job={job} />
          ))}
        </div>
      </div>

      {/* Featured Companies */}
      <FeaturedCompanyCard/>

      {/* Sponsored Companies */}
      <SponsoredCompanies />

      {/* View All Companies Button */}
      <div className="flex justify-center mt-8">
        <button className="px-6 py-3 border-2 border-purple-600 text-purple-600 rounded-md hover:bg-purple-50 transition-colors font-bold">
          View all companies
        </button>
      </div>
    </div>
  );
};

// Job Card Component
const JobCard = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        {/* Left Section */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" 
                   viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" 
                   strokeLinecap="round" strokeLinejoin="round" 
                   className="w-6 h-6 text-blue-600">
                <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path>
                <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path>
                <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path>
                <path d="M10 6h4M10 10h4M10 14h4M10 18h4"></path>
              </svg>
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-gray-800">Security Assistant</h3>
              <p className="text-gray-600 font-semibold">Besant Technologies</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-gray-600 mb-3">
            <div className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" 
                   viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" 
                   strokeLinecap="round" strokeLinejoin="round" 
                   className="w-4 h-4">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <path d="M16 3.128a4 4 0 0 1 0 7.744"></path>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <circle cx="9" cy="7" r="4"></circle>
              </svg>
              <span>0-5 yrs</span>
            </div>
            <div className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" 
                   viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" 
                   strokeLinecap="round" strokeLinejoin="round" 
                   className="w-4 h-4">
                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>Chennai, Hyderabad, Be...</span>
            </div>
          </div>

          <p className="text-sm text-gray-700 mb-4">
            Do what you love. To be a successful in this role you will... More Information :...
          </p>

          <div className="flex gap-2">
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-bold shadow-md">
              Apply Now
            </button>
            <button className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-bold">
              Save Job
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="ml-6 flex flex-col items-end">
          <img src="../../src/assets/Building.png" 
               alt="Security Assistant at Besant Technologies" 
               className="w-20 h-20 object-cover rounded-lg border border-gray-200 mb-4" />

          <div className="flex items-center gap-1 text-yellow-500 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" 
                 viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" 
                 strokeLinecap="round" strokeLinejoin="round" 
                 className="w-4 h-4 fill-current">
              <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
            </svg>
            <span className="text-sm font-medium">4.3</span>
          </div>

          <div className="flex items-center gap-1 text-xs text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" 
                 viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" 
                 strokeLinecap="round" strokeLinejoin="round" 
                 className="w-3 h-3">
              <path d="M12 6v6l4 2"></path>
              <circle cx="12" cy="12" r="10"></circle>
            </svg>
            <span>5 days ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Scroll Job Card Component
const ScrollJobCard = () => {
  return (
    <div className="w-72 flex-shrink-0">
      <div className="max-w-sm w-full bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 mx-auto border border-gray-100">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              T
            </div>
            <div>
              <h3 className="font-extrabold text-gray-900 text-lg">Admin Experience Manager</h3>
              <p className="text-gray-600 text-sm font-semibold">Tech Innovations Inc</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-1 justify-end">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-yellow-400 fill-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
              </svg>
              <span className="text-sm font-medium">4.5</span>
            </div>
            <p className="text-xs text-gray-500">120 reviews</p>
          </div>
        </div>

        <div className="space-y-3 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" /><circle cx="12" cy="10" r="3" /></svg>
            <span>San Francisco, CA</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" /><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" /><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" /><path d="M10 6h4" /><path d="M10 10h4" /><path d="M10 14h4" /><path d="M10 18h4" /></svg>
            <span>Operations</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><path d="M16 3.128a4 4 0 0 1 0 7.744" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><circle cx="9" cy="7" r="4" /></svg>
            <span>10-15 people</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 6v6l4 2" /><circle cx="12" cy="12" r="10" /></svg>
            <span>2-4 years</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {["Admin", "Management", "Analytics", "Communication"].map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">{tag}</span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-bold text-gray-900">$75,000</p>
            <p className="text-xs text-gray-500">per year</p>
          </div>
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full font-bold hover:from-purple-700 hover:to-pink-700 transition duration-200 shadow-md hover:shadow-lg">
            Apply now
          </button>
        </div>
      </div>
    </div>

  );
};

// Common Card Component
const CommonCard = ({ job }) => {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    yellow: "bg-yellow-100 text-yellow-600",
    purple: "bg-purple-100 text-purple-600"
  };

  return (
    <div className="card">
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-12 h-12 ${colorClasses[job.color]} rounded-lg flex items-center justify-center`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
          </svg>
        </div>
            <div>
              <h3 className="font-extrabold text-lg text-gray-800">{job.title}</h3>
              <p className="text-gray-600 font-semibold">{job.company}</p>
            </div>
      </div>
      <p className="text-sm text-gray-700 mb-4">{job.description}</p>
      <div className="flex gap-2">
        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 font-bold shadow-md">Apply Now</button>
        <button className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 font-bold">Save Job</button>
      </div>
    </div>
  );
};

// Featured Company Card Component
const FeaturedCompanyCard = () => {
  const featuredCompanies = [
    { title: "Software Engineer", type: "B2C", desc: "Consumer Focused", logos: ["Netflix", "Spotify", "Airbnb"] },
    { title: "Data Scientist", type: "B2B", desc: "Enterprise Driven", logos: ["Google", "Amazon", "Microsoft"] },
    { title: "Product Manager", type: "Tech", desc: "Product Ownership", logos: ["Uber", "Lyft", "DoorDash"] },
  ];

  return (
    <div>
      {/* Heading */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6 px-4">
        Featured Companies
      </h2>

      {/* Scroll wrapper */}
      <div className="common-card-scroll overflow-x-auto">
        <div className="scroll-track grid grid-rows-1 grid-flow-col auto-cols-max gap-4 w-fit">
          {featuredCompanies.map((job, i) => (
            <div
              key={i}
              className="w-72 bg-white rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-shadow flex-shrink-0"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-purple-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-gray-800">
                    {job.title}
                  </h3>
                  <p className="text-gray-600 font-semibold">{job.type}</p>
                </div>
              </div>

              <p className="text-sm text-gray-700 mb-4">{job.desc}</p>

              <div className="flex flex-wrap gap-3">
                {job.logos.map((company, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-white border border-gray-200 cursor-pointer hover:scale-110 transition-transform shadow-sm"
                    title={company}
                  >
                    <img
                      alt={company}
                      className="w-8 h-8 rounded-full object-contain"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDqRhAQQPlWT_eHFC9y0VO7uMLK5mR0vJinw&s"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-4 flex justify-end">
                <button className="text-purple-600 text-sm font-bold hover:text-purple-700 transition-colors">
                  View all →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Sponsored Companies Component
const SponsoredCompanies = () => {
  const companies = [
    { name: "BYJU'S", sector: "Ed-tech", description: "Leading educational technology company offering online learning platforms.", logo: "byjus-logo.png" },
    { name: "Dow Chemical International", sector: "Chemical", description: "Global chemical corporation specializing in performance materials.", logo: "dow-logo.png" },
    { name: "Kioxly Knowledge Partners", sector: "Consulting", description: "Advisory and training solutions for corporate clients.", logo: "kioxly-logo.png" },
    { name: "Infosys", sector: "Technology", description: "Global leader in consulting, technology, and outsourcing solutions.", logo: "infosys-logo.png" },
    { name: "Tata Motors", sector: "Automobile", description: "Leading manufacturer of automobiles and commercial vehicles.", logo: "tata-logo.png" }
  ];

  const sectors = [
    "All sectors", "Technology", "Healthcare & Life Sciences", 
    "Manufacturing, Transport & Logistics", "Manufacturing & Production", "BFSI", "Others"
  ];

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-6 tracking-tight">Sponsored companies</h2>
      
      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {sectors.map((sector, index) => (
          <span key={index} className={`px-3 py-1 rounded-full text-sm ${
            index === 0 
              ? "bg-blue-100 text-blue-800 border border-blue-300" 
              : "bg-gray-100 text-gray-600 hover:bg-gray-200 cursor-pointer"
          }`}>
            {sector}
          </span>
        ))}
      </div>

      <div className="relative">
        <div className="common-card-scroll overflow-x-auto">
          <div className="scroll-track grid grid-rows-2 grid-flow-col auto-cols-max gap-4 w-fit">
            {companies.map((company, index) => (
              <div key={index} className="w-72 bg-white rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-shadow flex-shrink-0">
                <div className="flex items-center gap-4">
                  <img src={company.logo} alt={company.name} className="h-10 w-20 object-contain flex-shrink-0" />
                  <div className="flex-grow min-w-0">
                    <h3 className="font-bold text-gray-900 text-sm truncate">{company.name}</h3>
                    <p className="text-xs text-gray-600 mb-1 font-semibold">{company.sector}</p>
                    <p className="text-xs text-gray-500 line-clamp-2">{company.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


const Right = () => {
  return (
    <div className="flex flex-col gap-4 w-72">
      {/* Card 1 */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h4 className="font-bold mb-3">See 34 jobs in Featured Companies</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm">Cognizant</span>
            <span className="text-xs text-purple-600 font-bold">34 jobs</span>
          </div>
          <div className="text-xs text-gray-500">View all openings</div>
        </div>
      </div>

      {/* Card 2 */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-start justify-between">
        <div className="flex-1">
          <h4 className="font-bold mb-3">Virtusa</h4>
          <div className="space-y-2">
            <div className="text-xs text-gray-600">Get 5X more profile views from recruiters</div>
            <div className="text-xs text-purple-600 hover:text-purple-800 cursor-pointer font-bold">
              Upgrade your profile
            </div>
          </div>
        </div>
        <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center ml-3">
          <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

function JobSearch() {
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  const openFilterMenu = () => setIsFilterMenuOpen(true);
  const closeFilterMenu = () => setIsFilterMenuOpen(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <SharedNavbar />
      <Header />

      {/* Mobile Filter Button (visible on small screens only) */}
      <div className="sm:hidden px-4 py-3">
        <button
          className="w-full bg-purple-600 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
          onClick={openFilterMenu}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M4 6h16M6 12h12M8 18h8" />
          </svg>
          Filters
        </button>
      </div>

      {/* Main Layout for md and up */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6 items-start">
        {/* Filter column hidden on small screens */}
        <div className="hidden sm:block">
          <Filter />
        </div>
        <Center />
        <Right />
      </div>

      {/* Mobile Filter Modal */}
      {isFilterMenuOpen && (
        <div className="fixed inset-0 z-50 sm:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-transparent"
            onClick={closeFilterMenu}
          ></div>
          {/* Slide-in Filter Panel */}
          <div
            className="fixed top-0 left-0 h-full w-100 max-w-full bg-white shadow-2xl p-6 z-50 transition-transform duration-300"
            style={{ transform: isFilterMenuOpen ? 'translateX(0)' : 'translateX(-100%)' }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-extrabold text-gray-900">Filters</h2>
              <button
                onClick={closeFilterMenu}
                className="text-gray-500 hover:text-gray-700 p-1"
                aria-label="Close"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {/* Make filter scrollable */}
            <div className="overflow-y-auto h-[calc(100vh-4rem)] pr-2 scrollbar-hide">
              <Filter />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default JobSearch;