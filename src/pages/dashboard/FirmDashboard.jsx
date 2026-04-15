import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { 
  getDashboard, 
  createProject, 
  updateProject, 
  deleteProject 
} from "../../api/dashboardApi";
import { getVerificationStatus } from "../../api/verificationApi";
import { Plus, Edit, Trash2, Eye, Save, X, CheckCircle, AlertCircle, FileCheck, TrendingUp, Image as ImageIcon, Tag } from "lucide-react";
import { toast } from "react-toastify";
import VerificationForm from "../../components/VerificationForm";
// import villa1 from "../../assets/villa1.jpg";
// import villa2 from "../../assets/villa2.jpg";
// import villa3 from "../../assets/villa3.jpg";

export default function FirmDashboard() {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showVerificationForm, setShowVerificationForm] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const [viewingProject, setViewingProject] = useState(null);
  const [showProjectDetails, setShowProjectDetails] = useState(false);
  const [savedProjects, setSavedProjects] = useState(new Set()); // Track saved projects
  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    images: [],
    tags: [],
    clientVisible: true
  });

  useEffect(() => {
    if (user?._id) {
      loadDashboard();
      checkVerificationStatus();
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

  const checkVerificationStatus = async () => {
    try {
      if (user?.uid) {
        const response = await getVerificationStatus(user.uid);
        if (response.success && response.data) {
          setVerificationStatus(response.data);
        }
      }
    } catch (error) {
      // User might not have submitted verification yet
      console.log("No verification found or error:", error);
    }
  };

  const handleCreateProject = async () => {
    try {
      const response = await createProject(projectForm);
      if (response.success) {
        toast.success("Project created successfully");
        setShowProjectForm(false);
        resetForm();
        loadDashboard();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create project");
    }
  };

  const handleUpdateProject = async () => {
    try {
      const response = await updateProject(editingProject._id, projectForm);
      if (response.success) {
        toast.success("Project updated successfully");
        setEditingProject(null);
        resetForm();
        loadDashboard();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update project");
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (!window.confirm("Are you sure you want to delete this project?")) {
      return;
    }

    try {
      const response = await deleteProject(projectId);
      if (response.success) {
        toast.success("Project deleted successfully");
        loadDashboard();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete project");
    }
  };

  const resetForm = () => {
    setProjectForm({
      title: "",
      description: "",
      images: [],
      tags: [],
      clientVisible: true
    });
  };

  const handleSaveProject = (projectId) => {
    setSavedProjects(prev => {
      const newSaved = new Set(prev);
      if (newSaved.has(projectId)) {
        newSaved.delete(projectId);
        toast.success("Project removed from saved");
      } else {
        newSaved.add(projectId);
        toast.success("Project saved successfully");
      }
      return newSaved;
    });
  };

  const startEdit = (project) => {
    setEditingProject(project);
    setProjectForm({
      title: project.title,
      description: project.description,
      images: project.images || [],
      tags: project.tags || [],
      clientVisible: project.meta?.clientVisible ?? true
    });
    setShowProjectForm(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-gray-600">Loading dashboard...</div>
        </div>
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

  // Show verification form if modal is open
  if (showVerificationForm) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => setShowVerificationForm(false)}
            className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <X className="w-5 h-5" />
            Back to Dashboard
          </button>
          <VerificationForm />
        </div>
      </div>
    );
  }

  const isVerified = verificationStatus?.isApproved && verificationStatus?.status === 'approved';
  const isPending = verificationStatus?.status === 'pending';
  const isRejected = verificationStatus?.status === 'rejected';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Enhanced Header with Gradient */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="text-white">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {dashboardData.user?.company || dashboardData.user?.fullName}'s Dashboard
              </h1>
              <p className="text-blue-100 text-lg">
                Manage your projects and portfolio
              </p>
              {user?.uid && (
                <p className="text-blue-200 text-sm mt-2 font-mono">
                  UID: {user.uid}
                </p>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              {!isVerified && (
                <button
                  onClick={() => setShowVerificationForm(true)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl ${
                    isRejected
                      ? "bg-red-500 hover:bg-red-600 text-white"
                      : isPending
                      ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                      : "bg-white text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  <FileCheck className="w-5 h-5" />
                  {isPending ? "Verification Pending" : isRejected ? "Resubmit Verification" : "Get Verified"}
                </button>
              )}
              <button
                onClick={() => {
                  setEditingProject(null);
                  resetForm();
                  setShowProjectForm(true);
                }}
                className="flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl"
              >
                <Plus className="w-5 h-5" />
                New Project
              </button>
            </div>
          </div>

          {/* Verification Status Banner */}
          {isVerified && (
            <div className="mt-6 bg-green-500/20 backdrop-blur-sm border border-green-300/50 rounded-xl p-4 flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-300" />
              <div>
                <p className="text-green-100 font-semibold">Firm Verified ✓</p>
                <p className="text-green-200 text-sm">Your verification has been approved</p>
              </div>
            </div>
          )}

          {isPending && (
            <div className="mt-6 bg-yellow-500/20 backdrop-blur-sm border border-yellow-300/50 rounded-xl p-4 flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-yellow-300" />
              <div>
                <p className="text-yellow-100 font-semibold">Verification Under Review</p>
                <p className="text-yellow-200 text-sm">Your application is being reviewed by our team</p>
              </div>
            </div>
          )}

          {/* Enhanced Stats Cards */}
          {dashboardData.stats && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-blue-100 text-sm font-medium">Total Projects</p>
                  <TrendingUp className="w-5 h-5 text-blue-200" />
                </div>
                <p className="text-3xl font-bold">
                  {dashboardData.stats.totalProjects || 0}
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-blue-100 text-sm font-medium">Visible Projects</p>
                  <Eye className="w-5 h-5 text-blue-200" />
                </div>
                <p className="text-3xl font-bold">
                  {dashboardData.stats.visibleProjects || 0}
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-blue-100 text-sm font-medium">Verification</p>
                  <FileCheck className="w-5 h-5 text-blue-200" />
                </div>
                <p className="text-lg font-semibold">
                  {isVerified ? "Verified ✓" : isPending ? "Pending..." : "Not Verified"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Project Form Modal */}
      {showProjectForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 flex justify-between items-center">
              <h2 className="text-xl font-bold">
                {editingProject ? "Edit details" : "Create New Project"}
              </h2>
              <button
                onClick={() => {
                  setShowProjectForm(false);
                  setEditingProject(null);
                  resetForm();
                }}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Title</label>
                <input
                  type="text"
                  value={projectForm.title}
                  onChange={(e) =>
                    setProjectForm({ ...projectForm, title: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Project title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Description
                </label>
                <textarea
                  value={projectForm.description}
                  onChange={(e) =>
                    setProjectForm({
                      ...projectForm,
                      description: e.target.value
                    })
                  }
                  rows={6}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none transition-all"
                  placeholder="Project description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  Project Images
                </label>
                <div className="space-y-3">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      const newImages = [];
                      files.forEach((file) => {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          newImages.push(reader.result);
                          if (newImages.length === files.length) {
                            setProjectForm({
                              ...projectForm,
                              images: [...projectForm.images, ...newImages]
                            });
                          }
                        };
                        reader.readAsDataURL(file);
                      });
                    }}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                  {projectForm.images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-1 mt-3">
                      {projectForm.images.map((image, idx) => (
                        <div key={idx} className="relative group">
                          <div className="w-full h-32 bg-gray-200 rounded-lg overflow-hidden">
                            <img
                              src={image}
                              alt={`Preview ${idx + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              const newImages = projectForm.images.filter((_, i) => i !== idx);
                              setProjectForm({ ...projectForm, images: newImages });
                            }}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Tags
                </label>
                <input
                  type="text"
                  value={projectForm.tags.join(", ")}
                  onChange={(e) =>
                    setProjectForm({
                      ...projectForm,
                      tags: e.target.value
                        .split(",")
                        .map((t) => t.trim())
                        .filter((t) => t)
                    })
                  }
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Comma-separated tags (e.g., residential, modern, sustainable)"
                />
              </div>

              <div className="flex items-center gap-2 p-4 bg-blue-50 rounded-xl">
                <input
                  type="checkbox"
                  id="clientVisible"
                  checked={projectForm.clientVisible}
                  onChange={(e) =>
                    setProjectForm({
                      ...projectForm,
                      clientVisible: e.target.checked
                    })
                  }
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <label htmlFor="clientVisible" className="text-sm text-gray-700 font-medium">
                  Visible to clients
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowProjectForm(false);
                    setEditingProject(null);
                    resetForm();
                  }}
                  className="flex-1 border-2 border-gray-300 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={editingProject ? handleUpdateProject : handleCreateProject}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-medium shadow-lg hover:shadow-xl"
                >
                  {editingProject ? "Update" : "Create"} Project
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Project Details Modal */}
      {showProjectDetails && viewingProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl my-8 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 flex justify-between items-center z-10">
              <h2 className="text-2xl font-bold">Project Details</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setViewingProject(null);
                    startEdit(viewingProject);
                    setShowProjectDetails(false);
                  }}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
                >
                  <Edit className="w-4 h-4" />
                  Edit details
                </button>
                <button
                  onClick={() => {
                    setShowProjectDetails(false);
                    setViewingProject(null);
                  }}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Project Title & Basic Info */}
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {viewingProject.title}
                </h1>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <span className="font-medium">Status:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      viewingProject.meta?.clientVisible 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {viewingProject.meta?.clientVisible ? 'Visible to Clients' : 'Hidden'}
                    </span>
                  </span>
                  {viewingProject.createdAt && (
                    <span className="flex items-center gap-1">
                      <span className="font-medium">Created:</span>
                      {new Date(viewingProject.createdAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>

              {/* Images Gallery */}
              {viewingProject.images && viewingProject.images.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <ImageIcon className="w-5 h-5" />
                    Project Images
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
                    {viewingProject.images.map((image, idx) => (
                      <div key={idx} className="relative group">
                        <div className="w-full h-48 bg-gray-200 rounded-xl overflow-hidden">
                          <img
                            src={image}
                            alt={`${viewingProject.title} - Image ${idx + 1}`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {viewingProject.description || 'No description provided.'}
                  </p>
                </div>
              </div>

              {/* Tags */}
              {viewingProject.tags && viewingProject.tags.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Tag className="w-5 h-5" />
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {viewingProject.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Project Information Section */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Project Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <p className="text-sm text-gray-600 mb-1">Project ID</p>
                    <p className="text-sm font-mono text-gray-900">{viewingProject._id}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <p className="text-sm text-gray-600 mb-1">Visibility</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {viewingProject.meta?.clientVisible ? 'Public' : 'Private'}
                    </p>
                  </div>
                  {viewingProject.createdAt && (
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <p className="text-sm text-gray-600 mb-1">Created Date</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {new Date(viewingProject.createdAt).toLocaleString()}
                      </p>
                    </div>
                  )}
                  {viewingProject.updatedAt && (
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <p className="text-sm text-gray-600 mb-1">Last Updated</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {new Date(viewingProject.updatedAt).toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Product Details Section */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Product Details</h3>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Total Images</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {viewingProject.images?.length || 0}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Total Tags</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {viewingProject.tags?.length || 0}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Description Length</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {viewingProject.description?.length || 0} characters
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Project Status</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {viewingProject.meta?.clientVisible ? 'Active' : 'Draft'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-7 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setShowProjectDetails(false);
                    startEdit(viewingProject);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium"
                >
                  <Edit className="w-4 h-4" />
                  Edit details
                </button>
                <button
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this project?")) {
                      handleDeleteProject(viewingProject._id);
                      setShowProjectDetails(false);
                      setViewingProject(null);
                    }
                  }}
                  className="flex items-center justify-center gap-2 border-2 border-red-300 text-red-600 px-4 py-3 rounded-xl hover:bg-red-50 transition-colors font-medium"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Projects Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {dashboardData.projects && dashboardData.projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboardData.projects.map((project, index) => (
              <div
                key={project._id}
                className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {index === 0 ? (
                  <div className="w-full h-48 bg-red-500 rounded-xl mb-4 overflow-hidden flex items-center justify-center" style={{background: `hsl(${Date.now() % 360}, 70%, 50%)`}}>
                    <span className="text-white text-lg font-bold">FIRST CARD - No Images</span>
                  </div>
                ) : index === 1 ? (
                  <div className="space-y-3">
                    <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl overflow-hidden">
                      <img
                        src="/villa1.jpg"
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="w-full h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg overflow-hidden">
                        <img
                          src="/villa2.jpg"
                          alt={`${project.title} - Image 2`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="w-full h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg overflow-hidden">
                        <img
                          src="/villa3.jpg"
                          alt={`${project.title} - Image 3`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl mb-4 overflow-hidden">
                    <img
                      src="/villa2.jpg"
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
                        className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-xs rounded-full font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex gap-2 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => {
                      setViewingProject(project);
                      setShowProjectDetails(true);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-xl hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                  <button
                    onClick={() => handleSaveProject(project._id)}
                    className={`flex items-center justify-center gap-2 px-3 py-2 rounded-xl transition-colors text-sm font-medium border-2 ${
                      savedProjects.has(project._id)
                        ? 'bg-green-50 border-green-300 text-green-600 hover:bg-green-100'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                    title={savedProjects.has(project._id) ? 'Remove from saved' : 'Save project'}
                  >
                    <Save className="w-4 h-4" />
                    <span className="hidden sm:inline">
                      {savedProjects.has(project._id) ? 'Saved' : 'Save'}
                    </span>
                  </button>
                  <button
                    onClick={() => startEdit(project)}
                    className="flex items-center justify-center gap-2 border-2 border-gray-300 px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium"
                    title="Edit details"
                  >
                    <Edit className="w-4 h-4" />
                    <span className="hidden sm:inline">Edit details</span>
                  </button>
                  <button
                    onClick={() => handleDeleteProject(project._id)}
                    className="flex items-center justify-center gap-2 border-2 border-red-300 text-red-600 px-3 py-2 rounded-xl hover:bg-red-50 transition-colors text-sm font-medium"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="space-y-3">
                <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl overflow-hidden">
                  <img
                    src={villa1}
                    alt="Villa Project"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="w-full h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg overflow-hidden">
                    <img
                      src={villa2}
                      alt="Villa Image 2"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-full h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg overflow-hidden">
                    <img
                      src={villa3}
                      alt="Villa Image 3"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 mt-4">
                Luxury Villa Project
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                Modern villa design with contemporary architecture and premium finishes
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-xs rounded-full font-medium">
                  Residential
                </span>
                <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-xs rounded-full font-medium">
                  Modern
                </span>
              </div>
              <div className="flex gap-2 pt-4 border-t border-gray-100">
                <button
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-xl hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
