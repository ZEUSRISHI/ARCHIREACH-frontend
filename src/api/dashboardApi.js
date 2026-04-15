import axiosClient from "./axiosClient";

// Dashboard API
export const getDashboard = async (userId) => {
  const response = await axiosClient.get(`/users/${userId}/dashboard`);
  return response.data;
};

// Projects API
export const createProject = async (projectData) => {
  const response = await axiosClient.post("/projects", projectData);
  return response.data;
};

export const updateProject = async (projectId, projectData) => {
  const response = await axiosClient.put(`/projects/${projectId}`, projectData);
  return response.data;
};

export const deleteProject = async (projectId) => {
  const response = await axiosClient.delete(`/projects/${projectId}`);
  return response.data;
};

export const getProject = async (projectId) => {
  const response = await axiosClient.get(`/projects/${projectId}`);
  return response.data;
};

export const getProjects = async (params = {}) => {
  const response = await axiosClient.get("/projects", { params });
  return response.data;
};

// Contact API
export const submitContact = async (contactData) => {
  const response = await axiosClient.post("/contact", contactData);
  return response.data;
};

export const getContactRequests = async (params = {}) => {
  const response = await axiosClient.get("/contact/requests", { params });
  return response.data;
};

// Save API
export const saveProject = async (clientId, projectId) => {
  const response = await axiosClient.post(`/users/${clientId}/save-project`, { projectId });
  return response.data;
};

export const unsaveProject = async (clientId, projectId) => {
  const response = await axiosClient.post(`/users/${clientId}/unsave-project`, { projectId });
  return response.data;
};

export const saveArchitect = async (clientId, firmId) => {
  const response = await axiosClient.post(`/users/${clientId}/save-architect`, { firmId });
  return response.data;
};

export const unsaveArchitect = async (clientId, firmId) => {
  const response = await axiosClient.post(`/users/${clientId}/unsave-architect`, { firmId });
  return response.data;
};

// Find Architects API
export const findArchitects = async (params = {}) => {
  const response = await axiosClient.get("/find-architects", { params });
  return response.data;
};

// Admin API
export const getAdminNotifications = async (params = {}) => {
  const response = await axiosClient.get("/admin/notifications", { params });
  return response.data;
};

export const markNotificationRead = async (notificationId, read = true) => {
  const response = await axiosClient.patch(`/admin/notifications/${notificationId}/read`, { read });
  return response.data;
};

export const getAdminContactQueries = async (params = {}) => {
  const response = await axiosClient.get("/admin/contact-queries", { params });
  return response.data;
};

