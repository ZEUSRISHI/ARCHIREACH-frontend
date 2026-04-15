import { createContext, useContext, useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check if user is authenticated on mount
    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const token = Cookies.get("token") || localStorage.getItem("token");
            const storedUser = localStorage.getItem("user");

            if (token && storedUser) {
                setUser(JSON.parse(storedUser));
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error("Auth check error:", error);
            logout();
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData) => {
        try {
            const response = await axiosClient.post("/auth/register", userData);

            if (response.data.success) {
                toast.success(response.data.message || "Registration successful! Please check your email for OTP.");
                return {
                    success: true,
                    userId: response.data.userId,
                    email: response.data.email,
                };
            }

            throw new Error(response.data.message || "Registration failed");
        } catch (error) {
            const message = error.response?.data?.message || error.message || "Registration failed";
            toast.error(message);
            return {
                success: false,
                error: message,
            };
        }
    };

    const login = async (email, password) => {
        try {
            const response = await axiosClient.post("/auth/login", { email, password });

            if (response.data.success || response.data.token) {
                const userData = {
                    _id: response.data._id,
                    uid: response.data.uid,
                    fullName: response.data.fullName,
                    email: response.data.email,
                    userType: response.data.userType,
                    role: response.data.role,
                    bio: response.data.bio,
                    company: response.data.company,
                    location: response.data.location,
                    phone: response.data.phone,
                    profileImageUrl: response.data.profileImageUrl,
                    joinDate: response.data.joinDate,
                    lastLogin: response.data.lastLogin,
                };

                // Store token in cookie (preferred) and localStorage (fallback)
                if (response.data.token) {
                    Cookies.set("token", response.data.token, { expires: 7 });
                    localStorage.setItem("token", response.data.token);
                }

                // Store user data
                localStorage.setItem("user", JSON.stringify(userData));
                localStorage.setItem("userUID", userData.uid);
                setUser(userData);
                setIsAuthenticated(true);

                toast.success("Login successful! Welcome back!");
                return {
                    success: true,
                    user: userData,
                };
            }

            throw new Error(response.data.message || "Login failed");
        } catch (error) {
            const message = error.response?.data?.message || error.message || "Login failed";

            // Check for verification requirement
            if (error.response?.status === 403 && error.response?.data?.requiresVerification) {
                return {
                    success: false,
                    error: message,
                    requiresVerification: true,
                    userId: error.response.data.userId
                };
            }

            toast.error(message);
            return {
                success: false,
                error: message,
            };
        }
    };

    const verifyOTP = async (userId, otp) => {
        try {
            const response = await axiosClient.post("/auth/verify-otp", { userId, otp });

            if (response.data.success) {
                const userData = response.data.user;

                // Store token
                if (response.data.token) {
                    Cookies.set("token", response.data.token, { expires: 7 });
                    localStorage.setItem("token", response.data.token);
                }

                // Store user data
                localStorage.setItem("user", JSON.stringify(userData));
                localStorage.setItem("userUID", userData.uid);
                setUser(userData);
                setIsAuthenticated(true);

                toast.success(response.data.message || "Email verified successfully!");
                return {
                    success: true,
                    user: userData,
                };
            }

            throw new Error(response.data.message || "OTP verification failed");
        } catch (error) {
            const message = error.response?.data?.message || error.message || "OTP verification failed";
            toast.error(message);
            return {
                success: false,
                error: message,
            };
        }
    };

    const resendOTP = async (userId) => {
        try {
            const response = await axiosClient.post("/auth/resend-otp", { userId });

            if (response.data.success) {
                toast.success(response.data.message || "OTP sent successfully!");
                return { success: true };
            }

            throw new Error(response.data.message || "Failed to resend OTP");
        } catch (error) {
            const message = error.response?.data?.message || error.message || "Failed to resend OTP";
            toast.error(message);
            return {
                success: false,
                error: message,
            };
        }
    };

    const logout = async () => {
        try {
            await axiosClient.post("/auth/logout");
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            // Clear all auth data
            Cookies.remove("token");
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("userUID");
            setUser(null);
            setIsAuthenticated(false);
            toast.info("Logged out successfully");
        }
    };

    const refreshUser = async () => {
        if (!user?._id) return;
        try {
            const response = await axiosClient.get(`/users/${user._id}`);
            if (response.data.success) {
                const updatedUser = response.data.user;
                localStorage.setItem("user", JSON.stringify(updatedUser));
                setUser(updatedUser);
            }
        } catch (error) {
            console.error("Error refreshing user:", error);
        }
    };


    const value = {
        user,
        loading,
        isAuthenticated,
        register,
        login,
        logout,
        verifyOTP,
        resendOTP,
        checkAuth,
        refreshUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export default AuthContext;

