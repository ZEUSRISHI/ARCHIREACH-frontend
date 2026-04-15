import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getProject, getProjects } from "../api/dashboardApi";
import { saveProject, unsaveProject } from "../api/dashboardApi";
import { Heart, ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function PortfolioView() {
  const { projectId, firmId } = useParams();
  const { user } = useAuth();
  const [project, setProject] = useState(null);
  const [firmProjects, setFirmProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (projectId) {
      loadProject();
    } else if (firmId) {
      loadFirmProjects();
    }
  }, [projectId, firmId]);

  useEffect(() => {
    if (user && project) {
      checkIfSaved();
    }
  }, [user, project]);

  const loadProject = async () => {
    try {
      setLoading(true);
      const response = await getProject(projectId);
      if (response.success) {
        setProject(response.data);
        if (response.data.firmId?._id) {
          loadFirmProjects(response.data.firmId._id);
        }
      }
    } catch (error) {
      console.error("Error loading project:", error);
      toast.error("Failed to load project");
    } finally {
      setLoading(false);
    }
  };

  const loadFirmProjects = async (fId = firmId) => {
    try {
      const response = await getProjects({ firmId: fId, limit: 10 });
      if (response.success) {
        setFirmProjects(response.data || []);
      }
    } catch (error) {
      console.error("Error loading firm projects:", error);
    }
  };

  const checkIfSaved = () => {
    // This would need to check user's savedProjects array
    // For now, we'll assume it's not saved
    setIsSaved(false);
  };

  const handleSaveToggle = async () => {
    if (!user) {
      toast.info("Please login to save projects");
      return;
    }

    try {
      if (isSaved) {
        await unsaveProject(user._id, project._id);
        setIsSaved(false);
        toast.success("Project removed from saved");
      } else {
        await saveProject(user._id, project._id);
        setIsSaved(true);
        toast.success("Project saved");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save/unsave project");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading project...</div>
      </div>
    );
  }

  if (!project && !firmProjects.length) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Project not found</div>
      </div>
    );
  }

  // Single project view
  if (project) {
    // Check if the current user is the owner of this project
    // Compare user's uid with project's userId
    const isOwner = user && (
      project.userId === user.uid ||
      project.userId === user._id ||
      project.firmId?.uid === user.uid ||
      project.firmId?._id === user._id
    );

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Link
              to="/pages/ExploreDrop/FindProjects"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Projects
            </Link>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{project.title}</h1>
                {project.firmId && (
                  <p className="text-gray-600 mt-1">
                    by {project.firmId.company || project.firmId.fullName}
                  </p>
                )}
              </div>
              {/* Only show save button if user is logged in and NOT the owner */}
              {!isOwner && user && (
                <button
                  onClick={handleSaveToggle}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${isSaved
                    ? "bg-red-100 text-red-600 hover:bg-red-200"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                >
                  <Heart className={`w-5 h-5 ${isSaved ? "fill-current" : ""}`} />
                  {isSaved ? "Saved" : "Save Project"}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Images */}
          {project.images && project.images.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {project.images.map((img, idx) => (
                <div key={idx} className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
                  <img src={img} alt={`${project.title} - ${idx + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}

          {/* Description */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {project.description}
            </p>
          </div>

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Note: Edit controls are hidden because isOwner is false for public view */}
        </div>
      </div>
    );
  }

  // Firm portfolio view (all projects)
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Portfolio</h1>
        {firmProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {firmProjects.map((proj) => (
              <Link
                key={proj._id}
                to={`/projects/${proj._id}`}
                className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-lg transition-shadow"
              >
                {proj.images && proj.images.length > 0 && (
                  <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 overflow-hidden">
                    <img
                      src={proj.images[0]}
                      alt={proj.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <h3 className="text-xl font-bold text-gray-900 mb-2">{proj.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-3">{proj.description}</p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
            <p className="text-gray-600">No projects available</p>
          </div>
        )}
      </div>
    </div>
  );
}






