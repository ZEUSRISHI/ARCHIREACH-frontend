import axios from "axios";
import Cookies from "js-cookie";




let apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
// Create axios instance with base configuration
const axiosClient = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true, // Important for cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - add token to requests
axiosClient.interceptors.request.use(
  (config) => {
    // Get token from cookie or localStorage
    const token = Cookies.get("token") || localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const userId = localStorage.getItem("userId");
    const userUID = localStorage.getItem("userUID");

    if (userId) config.headers["x-user-id"] = userId;
    if (userUID) config.headers["x-user-uid"] = userUID;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle 401 errors
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.log(`[AXIOS INTERCEPTOR] 401 Unauthorized for URL: ${error.config?.url}`);
      console.log(`[AXIOS INTERCEPTOR] Sent Headers:`, error.config?.headers);

      // Clear auth data
      Cookies.remove("token");
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Redirect to login if not already there
      if (window.location.pathname !== "/signin" && window.location.pathname !== "/signup") {
        window.location.href = "/signin";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;

