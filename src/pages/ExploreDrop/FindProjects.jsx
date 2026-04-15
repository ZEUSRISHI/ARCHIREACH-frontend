import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SharedNavbar from '../../components/Layout/SharedNavbar';
import Footer from '../../components/Footer';
import { PageHeader } from '../find-projects/PageHeader';
import { EnhancedSearchBar } from '../find-projects/EnhancedSearchBar';
import { FilterSidebar } from '../find-projects/FilterSidebar';
import { ResultsSection } from '../find-projects/ResultsSection';
import { RightSidebar } from '../find-projects/RightSidebar';
import { LoginModal } from '../find-projects/LoginModal';
import { ProjectDetailsModal } from '../find-projects/ProjectDetailsModal';
import NavbarAll from '../../components/NavbarAll';
import { useAuth } from '../../hooks/useAuth';
import { useSubscription } from '../../context/SubscriptionContext';
import { submitContact } from '../../api/dashboardApi';

// 🧱 Mock data for projects
const mockProjects = [
  {
    id: '1',
    title: '3BHK Apartment Extension – Andheri',
    clientName: 'Priya Sharma',
    clientVerified: true,
    clientRating: 4.8,
    budget: '₹15L - ₹25L',
    location: 'Mumbai, Andheri',
    deadline: 'Closes in 7 days',
    projectType: ['Residential', 'Renovation', 'Interior'],
    description: 'Seeking architect for complete apartment redesign with modern aesthetics and space optimization. Need someone experienced in residential projects.',
    proposalCount: 12,
    shortlistedCount: 3,
    matchPercentage: 92,
    postedDate: '2 days ago'
  },
  {
    id: '2',
    title: 'Commercial Office Space Design',
    clientName: 'Tech Innovations Ltd',
    clientVerified: true,
    clientRating: 4.9,
    budget: '₹30L - ₹50L',
    location: 'Bangalore, Whitefield',
    deadline: 'Closes in 14 days',
    projectType: ['Commercial', 'Office', 'Interior'],
    description: 'Looking for an architect to design a modern office space for 100+ employees. Should include collaborative spaces, meeting rooms, and amenities.',
    proposalCount: 18,
    shortlistedCount: 5,
    matchPercentage: 85,
    featured: true,
    postedDate: '1 day ago'
  },
  {
    id: '3',
    title: 'Sustainable Housing Complex',
    clientName: 'Green Homes Pvt Ltd',
    clientVerified: true,
    clientRating: 4.7,
    budget: '₹2Cr - ₹5Cr',
    location: 'Pune, Hinjewadi',
    deadline: 'Closes in 21 days',
    projectType: ['Residential', 'Sustainable', 'Mixed-Use'],
    description: 'Large-scale sustainable housing project with eco-friendly materials and renewable energy integration. Experience with green building certifications required.',
    proposalCount: 25,
    shortlistedCount: 8,
    matchPercentage: 78,
    featured: true,
    postedDate: '3 days ago'
  },
  {
    id: '4',
    title: 'Luxury Villa Design',
    clientName: 'Rajesh Patel',
    clientVerified: true,
    clientRating: 4.6,
    budget: '₹80L - ₹1.2Cr',
    location: 'Gurgaon, DLF Phase 5',
    deadline: 'Closes in 10 days',
    projectType: ['Residential', 'Luxury', 'Landscape'],
    description: 'High-end villa design with integrated landscape architecture. Looking for contemporary design with traditional Indian elements.',
    proposalCount: 15,
    shortlistedCount: 4,
    matchPercentage: 88,
    postedDate: '5 days ago'
  },
  {
    id: '5',
    title: 'Heritage Building Restoration',
    clientName: 'Cultural Heritage Trust',
    clientVerified: true,
    clientRating: 5.0,
    budget: '₹50L - ₹80L',
    location: 'Jaipur, Old City',
    deadline: 'Closes in 30 days',
    projectType: ['Heritage', 'Restoration', 'Institutional'],
    description: 'Restoration of 100-year-old heritage building. Need architect with experience in conservation and heritage projects.',
    proposalCount: 8,
    shortlistedCount: 2,
    matchPercentage: 65,
    postedDate: '1 week ago'
  },
  {
    id: '6',
    title: 'Smart Home Office Design',
    clientName: 'Anita Desai',
    clientVerified: true,
    clientRating: 4.5,
    budget: '₹8L - ₹12L',
    location: 'Chennai, OMR',
    deadline: 'Closes in 5 days',
    projectType: ['Residential', 'Smart Homes', 'Interior'],
    description: 'Convert existing space into modern home office with smart home integration. Need compact and efficient design.',
    proposalCount: 20,
    shortlistedCount: 6,
    matchPercentage: 90,
    postedDate: '4 days ago'
  }
];

export default function FindProjects() {
  const [filters, setFilters] = useState({
    locations: [],
    projectTypes: [],
    budgetRange: [0, 100],
    deadline: '',
    specializations: [],
    verifiedOnly: true,
    applicationStatus: []
  });

  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth(); // Get user from auth context
  const navigate = useNavigate(); // Navigation for redirects
  const { subscription, useApplicationCredit, getRemainingCredits, getPlanName } = useSubscription(); // Subscription context for credit checks
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showProjectDetails, setShowProjectDetails] = useState(false);
  const [showLimitModal, setShowLimitModal] = useState(false); // Application limit exceeded modal
  const [limitModalMessage, setLimitModalMessage] = useState(''); // Dynamic limit modal message

  // Helper: format budget for display (supports both rupees and lakhs)
  const formatBudget = (brief) => {
    const b = brief?.budget;
    if (b == null || (b.min == null && b.max == null)) return 'Budget not specified';
    const minVal = Number(b.min);
    const maxVal = Number(b.max);
    const minNum = !isNaN(minVal) ? minVal : !isNaN(maxVal) ? maxVal : null;
    const maxNum = !isNaN(maxVal) ? maxVal : !isNaN(minVal) ? minVal : null;
    if (minNum == null && maxNum == null) return 'Budget not specified';
    const min = minNum ?? maxNum ?? 0;
    const max = maxNum ?? minNum ?? 0;
    const inLakhs = min < 1000 && max < 1000;
    const minStr = inLakhs ? `${min}` : `${(min / 100000).toFixed(0)}`;
    const maxStr = inLakhs ? `${max}` : `${(max / 100000).toFixed(0)}`;
    return `₹${minStr}L - ₹${maxStr}L`;
  };

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);

      try {
        const queryParams = new URLSearchParams();
        queryParams.append('status', 'active');
        queryParams.append('limit', '50');

        if (filters.projectTypes.length > 0) {
          queryParams.append('projectType', filters.projectTypes[0]);
        }

        if (filters.locations.length > 0) {
          const location = filters.locations[0];
          const parts = location.split(',');
          if (parts[0]) queryParams.append('city', parts[0].trim());
          if (parts[1]) queryParams.append('state', parts[1].trim());
        }

        if (filters.budgetRange && filters.budgetRange[0] > 0) {
          queryParams.append(
            'minBudget',
            String(filters.budgetRange[0] * 100000)
          );
        }

        if (filters.budgetRange && filters.budgetRange[1] < 100) {
          queryParams.append(
            'maxBudget',
            String(filters.budgetRange[1] * 100000)
          );
        }

        const response = await fetch(
          `https://archireach.onrender.com/api/project-briefs?${queryParams.toString()}`,
          { credentials: 'include' }
        );

        const data = await response.json();

        if (data.success && Array.isArray(data.data)) {
          const transformedProjects = data.data.map(brief => {
            const userUID = brief.clientId?.uid;
            const username = brief.clientId?.fullName;
            const email = brief.clientId?.email;

            // 🔥 REQUIRED LOG
            console.log('Client User Info:', {
              userUID,
              username,
              email,
            });

            return {
              id: brief._id,
              title: brief.title,
              clientName: username || 'Client',
              clientUID: userUID,
              clientEmail: email,
              clientVerified: true,
              clientRating: 4.5,
              budget: formatBudget(brief),
              location:
                `${brief.location?.city ?? ''}, ${brief.location?.state ?? ''}`.trim() ||
                'Location not specified',
              deadline: brief.timeline?.deadline
                ? `Closes in ${Math.ceil(
                  (new Date(brief.timeline.deadline) - new Date()) /
                  (1000 * 60 * 60 * 24)
                )} days`
                : 'Open',
              projectType: [brief.projectType],
              description: brief.description,
              proposalCount: brief.proposalCount || 0,
              shortlistedCount: brief.shortlistedArchitects?.length || 0,
              matchPercentage: 85,
              postedDate: brief.createdAt
                ? new Date(brief.createdAt).toLocaleDateString()
                : 'Recently',
            };
          });

          setProjects(transformedProjects);
        } else {
          setProjects(mockProjects);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        setProjects(mockProjects);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [filters.projectTypes, filters.locations, filters.budgetRange]);
  // 🔍 Search handler
  const handleSearch = (query) => {
    console.log('Searching for:', query);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  // 🏷️ Tag click handler
  const handleTagClick = (tag) => {
    console.log('Tag clicked:', tag);
  };

  // 📁 View project details handler
  const handleViewDetails = (project) => {
    if (!user) {
      setShowLoginModal(true);
      setSelectedProject(project);
    } else {
      setSelectedProject(project);
      setShowProjectDetails(true);
    }
  };

  // 🔐 Login modal handler
  const handleLogin = () => {
    // Logic handled by AuthContext now, but we can set local state if needed
    setShowLoginModal(false);
    if (selectedProject) {
      setShowProjectDetails(true);
    }
  };

  /**
   * 📨 Apply handler — checks subscription credit before submitting.
   * Free plan users cannot apply at all.
   * Paid plan users must have remaining credits (Starter=5, Professional=10, Premium=15).
   * On success, one credit is consumed and the application is sent.
   */
  const handleApply = async (applicationData) => {
    const project = selectedProject;
    if (!user || !project || !applicationData) return;

    // --- Credit / plan gate ---
    const planName = getPlanName(); // e.g. "Free", "Starter", etc.
    const remaining = getRemainingCredits(); // credits left this month
    const currentPlan = subscription?.plan || 'free';

    // Free plan users cannot apply to projects
    if (currentPlan === 'free') {
      setLimitModalMessage(
        'Your Free plan does not allow applying to projects. Upgrade to a paid plan to start applying.'
      );
      setShowLimitModal(true);
      return;
    }

    // Paid plan users with 0 remaining credits
    if (remaining <= 0) {
      setLimitModalMessage(
        `You have used all ${subscription?.maxApplicationsPerMonth || 0} application credits for this month on the ${planName} plan. Upgrade your plan for more credits.`
      );
      setShowLimitModal(true);
      return;
    }

    try {
      // Consume one application credit on the server (returns true/false)
      const creditUsed = await useApplicationCredit();
      if (!creditUsed) {
        setLimitModalMessage(
          'Could not use application credit. Please try again or check your plan.'
        );
        setShowLimitModal(true);
        return;
      }

      // Build contact payload
      const contactData = {
        toFirmId: project.id,
        toFirmUID: project.clientUID,
        toFirmName: project.clientName,
        toFirmEmail: project.clientEmail || "",
        userName: applicationData.name || user.fullName || "Architect",
        userEmail: applicationData.email || user.email,
        userPhone: user.phone || "",
        userId: user.uid || localStorage.getItem('userUID'),
        message: applicationData.message,
        extraQuery: ""
      };

      console.log("Sending application notification to clientUID dashboard:", project.clientUID);
      const response = await submitContact(contactData);

      if (response.success) {
        alert(`✅ Application sent to ${project.clientName}! (${remaining - 1} credits remaining this month)`);
        setShowProjectDetails(false);
      } else {
        alert(response.message || "Failed to send application.");
      }
    } catch (error) {
      console.error("Application submission error:", error);
      alert(error.response?.data?.message || "Failed to send application. Please try again.");
    }
  };

  return (
    <div className="min-h-screen pt-4 bg-white text-[#111729]">

      <NavbarAll />

      <main className="flex-1">
        <PageHeader />

        <EnhancedSearchBar
          onSearch={handleSearch}
          onTagClick={handleTagClick}
        />

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 px-4 sm:px-6 lg:px-12 pb-10 lg:pb-16 max-w-7xl mx-auto">
          {/* Left: Enhanced Filters */}
          <FilterSidebar
            filters={filters}
            onFilterChange={setFilters}
          />

          {/* Center: Project Listings (2-grid) - Expanded */}
          <div className="flex-1 min-w-0 max-w-full">
            <ResultsSection
              projects={projects}
              isLoading={isLoading}
              onViewDetails={handleViewDetails}
              isLoggedIn={!!user}
            />
          </div>
        </div>

      </main>

      <Footer />

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => {
          setShowLoginModal(false);
        }}
        onLogin={handleLogin}
        initialMode={'login'}
      />

      {/* 🔒 Application Limit Modal — shown when user exceeds plan credits */}
      {showLimitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4 text-center">
            <div className="text-5xl mb-4">⚠️</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Application Limit Reached</h2>
            <p className="text-gray-600 mb-6">{limitModalMessage}</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setShowLimitModal(false)}
                className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
              >
                Close
              </button>
              <button
                onClick={() => navigate('/pricing')}
                className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Upgrade Plan
              </button>
            </div>
          </div>
        </div>
      )}

      <ProjectDetailsModal
        project={selectedProject}
        isOpen={showProjectDetails}
        onClose={() => setShowProjectDetails(false)}
        onApply={handleApply}
      />
    </div>
  );
}
