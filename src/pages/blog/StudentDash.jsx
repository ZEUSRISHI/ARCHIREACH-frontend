// src/App.jsx
import { useState ,useEffect} from 'react';
import Header from '../../components/Header';
// import ProfileSection from '../../components/ProfileSection';
import StudentDashboardContent from '../../components/StudentDashboardContent';

// import ExperienceSection from '../../components/ExperienceSection';
import SocialLinks from '../../components/SocialLinks';
import Footer from '../../components/Footer';

import SEditSidebar from '../../components/SEditSidebar';//S-student
import SUpdateSidebar from '../../components/UpdateSidebar'; 


//  COMPONENTS : 
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
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
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
            <div className="hidden lg:flex items-center space-x-4">
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
      <div id="mobileMenu" className={`lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50 ${isProfileMenuOpen ? '' : 'hidden'}`}>
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



import { Pencil } from "lucide-react";
// ADDED edit,delete,save,cancel options 

const ExperienceSection = () => {
  const [experiences, setExperiences] = useState([
    {
      id: 1,
      title: "Product Designer Lead - ARBI",
      company: "Google Pay • Full-time",
      duration: "Dec 2019 - Present • 4 yrs 1 mo",
      description:
        "I am working on User experience design and User interface design of different web and mobile applications and also work on mobile apps prototyping and testing.",
      logoColor: "bg-red-500",
      short: "G",
    },
    {
      id: 2,
      title: "Associate UI Designer",
      company: "Paytm • Full-time",
      duration: "Dec 2018 - Nov 2019 • 1 yr",
      description:
        "Paytm India, help users to make easy digital and UPI payments for online and offline transactions. Design Web application and mobile application.",
      logoColor: "bg-blue-500",
      short: "P",
    },
  ]);

  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    duration: "",
    description: "",
  });

  const handleDelete = (id) => {
    setExperiences(experiences.filter((exp) => exp.id !== id));
    setEditId(null);
  };

  const handleEdit = (exp) => {
    setEditId(exp.id);
    setFormData(exp);
  };

  const handleSave = () => {
    setExperiences(
      experiences.map((exp) =>
        exp.id === editId ? { ...formData, id: editId } : exp
      )
    );
    setEditId(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 mb-6 md:mb-8">
      <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 md:mb-6">
        EXPERIENCE
      </h2>

      {experiences.map((exp) => (
        <div
          key={exp.id}
          className="flex items-start space-x-3 md:space-x-4 mb-4 md:mb-6"
        >
          <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-lg border-2 border-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
            <div
              className={`w-8 h-8 ${exp.logoColor} rounded flex items-center justify-center text-white text-xs font-bold`}
            >
              {exp.short}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            {editId === exp.id ? (
              <>
                <input
                  className="w-full border p-1 mb-2 rounded"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
                <input
                  className="w-full border p-1 mb-2 rounded"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                />
                <input
                  className="w-full border p-1 mb-2 rounded"
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData({ ...formData, duration: e.target.value })
                  }
                />
                <textarea
                  className="w-full border p-1 mb-2 rounded"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />

                {/* Edit mode actions */}
                <div className="mt-2 space-x-2">
                  <button
                    className="px-3 py-1 bg-green-500 text-white rounded"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                  <button
                    className="px-3 py-1 bg-gray-400 text-white rounded"
                    onClick={() => setEditId(null)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded"
                    onClick={() => handleDelete(exp.id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-800 text-sm md:text-base">
                    {exp.title}
                  </h3>
                  <button
                    onClick={() => handleEdit(exp)}
                    className="text-gray-500 hover:text-blue-600"
                  >
                    <Pencil size={16} />
                  </button>
                </div>
                <p className="text-gray-600 text-xs md:text-sm">{exp.company}</p>
                <p className="text-gray-500 text-xs md:text-sm">
                  {exp.duration}
                </p>
                <p className="text-gray-600 text-xs md:text-sm mt-2 leading-relaxed">
                  {exp.description}
                </p>
                
              </>
            )}
          </div>
        </div>
        
      ))}

      <div className="mt-4 md:mt-6">
        <button className="w-full py-3 px-4 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-all duration-300 ease-in-out group">
          <span className="text-purple-600 font-medium text-sm group-hover:text-purple-700 inline-flex items-center justify-center">
            Show all Experience
            <svg
              className="w-4 h-4 ml-2 transform transition-transform duration-300 ease-in-out group-hover:rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}; 




// ADDED edit,delete,save,cancel options 
const SkillsSection = () => {
  const [skills, setSkills] = useState(() => {
    const saved = localStorage.getItem("skills");
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        title: "Product Designer Lead - ARBI",
        skill: "Google Pay • Full-time",
        duration: "Dec 2019 - Present • 4 yrs 1 mo",
        description:
          "I am working on User experience design and User interface design...",
        logoColor: "bg-red-500",
        short: "G",
      },
      {
        id: 2,
        title: "Associate UI Designer",
        skill: "Paytm • Full-time",
        duration: "Dec 2018 - Nov 2019 • 1 yr",
        description:
          "Paytm India, help users to make easy digital and UPI payments...",
        logoColor: "bg-blue-500",
        short: "P",
      },
    ];
  });

  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    skill: "",
    duration: "",
    description: "",
  });

  // 🔹 Save skills to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("skills", JSON.stringify(skills));
  }, [skills]);

  const handleDelete = (id) => {
    setSkills(skills.filter((ski) => ski.id !== id));
    setEditId(null);
  };

  const handleEdit = (ski) => {
    setEditId(ski.id);
    setFormData(ski);
  };

  const handleSave = () => {
    setSkills(
      skills.map((ski) =>
        ski.id === editId ? { ...formData, id: editId } : ski
      )
    );
    setEditId(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 mb-6 md:mb-8">
      <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 md:mb-6">
        SKILLS
      </h2>

      {skills.map((ski) => (
        <div
          key={ski.id}
          className="flex items-start space-x-3 md:space-x-4 mb-4 md:mb-6"
        >
          <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-lg border-2 border-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
            <div
              className={`w-8 h-8 ${ski.logoColor} rounded flex items-center justify-center text-white text-xs font-bold`}
            >
              {ski.short}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            {editId === ski.id ? (
              <>
                <input
                  className="w-full border p-1 mb-2 rounded"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
                <input
                  className="w-full border p-1 mb-2 rounded"
                  value={formData.skill}
                  onChange={(e) =>
                    setFormData({ ...formData, skill: e.target.value })
                  }
                />
                <input
                  className="w-full border p-1 mb-2 rounded"
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData({ ...formData, duration: e.target.value })
                  }
                />
                <textarea
                  className="w-full border p-1 mb-2 rounded"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />

                {/* Edit mode actions */}
                <div className="mt-2 space-x-2">
                  <button
                    className="px-3 py-1 bg-green-500 text-white rounded"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                  <button
                    className="px-3 py-1 bg-gray-400 text-white rounded"
                    onClick={() => setEditId(null)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded"
                    onClick={() => handleDelete(ski.id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-800 text-sm md:text-base">
                    {ski.title}
                  </h3>
                  <button
                    onClick={() => handleEdit(ski)}
                    className="text-gray-500 hover:text-blue-600"
                  >
                    <Pencil size={16} />
                  </button>
                </div>
                <p className="text-gray-600 text-xs md:text-sm">{ski.skill}</p>
                <p className="text-gray-500 text-xs md:text-sm">
                  {ski.duration}
                </p>
                <p className="text-gray-600 text-xs md:text-sm mt-2 leading-relaxed">
                  {ski.description}
                </p>
              </>
            )}
          </div>
        </div>
        
      ))}
      <div className="mt-4 md:mt-6">
        <button className="w-full py-3 px-4 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-all duration-300 ease-in-out group">
          <span className="text-purple-600 font-medium text-sm group-hover:text-purple-700 inline-flex items-center justify-center">
            Show all Experience
            <svg
              className="w-4 h-4 ml-2 transform transition-transform duration-300 ease-in-out group-hover:rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
};








function StudentDash() {
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
    <div className="min-h-screen bg-gray-50">
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
    <SkillsSection/>
    <SocialLinks />
  </div>
</div>
      <Footer />

      {/* Dynamic Sidebars */}
      <SEditSidebar isOpen={isEditSidebarOpen} onClose={toggleEditSidebar} />
      <SUpdateSidebar isOpen={isUpdateSidebarOpen} onClose={toggleUpdateSidebar} />
    </div>
  );
}

export default StudentDash;