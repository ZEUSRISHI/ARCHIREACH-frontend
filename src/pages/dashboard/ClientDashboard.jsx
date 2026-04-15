import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { getDashboard, unsaveProject, unsaveArchitect } from "../../api/dashboardApi";
import { Heart, X, ExternalLink } from "lucide-react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function ClientDashboard() {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("projects"); // "projects" or "architects"

  useEffect(() => {
    if (user?._id) {
      loadDashboard();
    }
  }, [user]);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const response = await getDashboard(user._id);
      if (response.success) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.error("Error loading dashboard:", error);
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  const handleUnsaveProject = async (projectId) => {
    try {
      const response = await unsaveProject(user._id, projectId);
      if (response.success) {
        toast.success("Project removed from saved");
        loadDashboard();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to unsave project");
    }
  };

  const handleUnsaveArchitect = async (firmId) => {
    try {
      const response = await unsaveArchitect(user._id, firmId);
      if (response.success) {
        toast.success("Architect removed from saved");
        loadDashboard();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to unsave architect");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading dashboard...</div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Failed to load dashboard</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {dashboardData.user?.fullName}'s Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Your saved projects and architects
          </p>

          {/* Stats */}
          {dashboardData.stats && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">Saved Projects</p>
                <p className="text-2xl font-bold text-gray-900">
                  {dashboardData.stats.savedProjectsCount || 0}
                </p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">Saved Architects</p>
                <p className="text-2xl font-bold text-gray-900">
                  {dashboardData.stats.savedArchitectsCount || 0}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-4 border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab("projects")}
            className={`pb-3 px-4 font-medium transition-colors ${
              activeTab === "projects"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Saved Projects ({dashboardData.stats?.savedProjectsCount || 0})
          </button>
          <button
            onClick={() => setActiveTab("architects")}
            className={`pb-3 px-4 font-medium transition-colors ${
              activeTab === "architects"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Saved Architects ({dashboardData.stats?.savedArchitectsCount || 0})
          </button>
        </div>

        {/* Saved Projects */}
        {activeTab === "projects" && (
          <div>
            {dashboardData.savedProjects &&
            dashboardData.savedProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dashboardData.savedProjects.map((project) => (
                  <div
                    key={project._id}
                    className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-lg transition-shadow"
                  >
                    {project.images && project.images.length > 0 && (
                      <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 overflow-hidden">
                        <img
                          src={project.images[0]}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex gap-2">
                      <Link
                        to={`/projects/${project._id}`}
                        className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View
                      </Link>
                      <button
                        onClick={() => handleUnsaveProject(project._id)}
                        className="flex items-center justify-center gap-2 border border-red-300 text-red-600 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors text-sm"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
                <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">No saved projects yet</p>
                <Link
                  to="/pages/ExploreDrop/FindProjects"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Browse Projects →
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Saved Architects */}
        {activeTab === "architects" && (
          <div>
            {dashboardData.savedArchitects &&
            dashboardData.savedArchitects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dashboardData.savedArchitects.map((architect) => (
                  <div
                    key={architect._id}
                    className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      {architect.profileImageUrl ? (
                        <img
                          src={architect.profileImageUrl}
                          alt={architect.fullName}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
                          {architect.fullName?.[0]?.toUpperCase() || "A"}
                        </div>
                      )}
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">
                          {architect.fullName}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {architect.company || "Architect"}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        to={`/portfolio/${architect._id}`}
                        className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Portfolio
                      </Link>
                      <button
                        onClick={() => handleUnsaveArchitect(architect._id)}
                        className="flex items-center justify-center gap-2 border border-red-300 text-red-600 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors text-sm"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
                <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">No saved architects yet</p>
                <Link
                  to="/pages/ExploreDrop/FindArch"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Find Architects →
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

