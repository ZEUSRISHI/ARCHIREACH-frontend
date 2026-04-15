import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import {
    Users, Mail, Lock, CheckCircle, X, User, GraduationCap, Compass, Zap, Building
} from 'lucide-react';
import registerImage from '../assets/register.png';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login, register, verifyOTP: verifyAccountOTP, resendOTP: resendAccountOTP } = useAuth();

    // =================== STATES ===================
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
    const [selectedUserType, setSelectedUserType] = useState(null);

    // Login State
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [isLoginLoading, setIsLoginLoading] = useState(false);

    // Registration State
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    // OTP Verification States
    const [isOTPModalOpen, setIsOTPModalOpen] = useState(false);
    const [otp, setOTP] = useState("");
    const [registeredUserId, setRegisteredUserId] = useState(null);
    const [registeredEmail, setRegisteredEmail] = useState("");
    const [isResendingOTP, setIsResendingOTP] = useState(false);
    const [otpTimer, setOTPTimer] = useState(600); // 10 minutes in seconds
    const [timerActive, setTimerActive] = useState(false);

    // Password Reset States
    const [isPasswordResetModalOpen, setIsPasswordResetModalOpen] = useState(false);
    const [isPasswordResetOTPModalOpen, setIsPasswordResetOTPModalOpen] = useState(false);
    const [resetPassword, setResetPassword] = useState("");
    const [resetConfirmPassword, setResetConfirmPassword] = useState("");
    const [resetOTP, setResetOTP] = useState("");
    const [resetUserId, setResetUserId] = useState(null);
    const [isResettingPassword, setIsResettingPassword] = useState(false);
    const [isRequestingReset, setIsRequestingReset] = useState(false);

    // =================== CONSTANTS ===================
    const userTypes = [
        {
            id: 'client',
            title: 'Client',
            icon: User,
            description: 'Looking for services',
            color: 'bg-blue-500'
        },
        {
            id: 'student',
            title: 'Student',
            icon: GraduationCap,
            description: 'Learning and growing',
            color: 'bg-green-500'
        },
        {
            id: 'college',
            title: 'College',
            icon: Building,
            description: 'Educational institution',
            color: 'bg-purple-500'
        },
        {
            id: 'architect',
            title: 'Architect',
            icon: Compass,
            description: 'Design professional',
            color: 'bg-orange-500'
        },
        {
            id: 'brands',
            title: 'Brands',
            icon: Zap,
            description: 'Business entity',
            color: 'bg-red-500'
        },
        {
            id: 'firm',
            title: 'Firm',
            icon: Users,
            description: 'Advertising agency or firm',
            color: 'bg-blue-900'
        }
    ];

    // =================== HANDLERS ===================
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    const openSignUpModal = () => setIsSignUpModalOpen(true);
    const closeSignUpModal = () => setIsSignUpModalOpen(false);

    const openLoginModal = () => setIsLoginModalOpen(true);
    const closeLoginModal = () => {
        setIsLoginModalOpen(false);
        setLoginEmail("");
        setLoginPassword("");
    };

    const openRegistrationModal = () => setIsRegistrationModalOpen(true);
    const closeRegistrationModal = () => {
        setIsRegistrationModalOpen(false);
        setFormData({
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
        });
    };

    const openOTPModal = () => setIsOTPModalOpen(true);
    const closeOTPModal = () => {
        setIsOTPModalOpen(false);
        setOTP("");
        setTimerActive(false);
    };

    const openPasswordResetModal = () => {
        setIsPasswordResetModalOpen(true);
        setRegisteredEmail(loginEmail);
    };

    const closePasswordResetModal = () => {
        setIsPasswordResetModalOpen(false);
        setResetPassword("");
        setResetConfirmPassword("");
        setResetOTP("");
        setResetUserId(null);
    };

    const closePasswordResetOTPModal = () => {
        setIsPasswordResetOTPModalOpen(false);
        setResetOTP("");
    };

    const handleCardClick = (userType) => {
        setSelectedUserType(userType);
        closeSignUpModal();
        openRegistrationModal();
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // =================== EFFECTS ===================
    // Timer for OTP expiration
    useEffect(() => {
        let interval;
        if (timerActive && otpTimer > 0) {
            interval = setInterval(() => {
                setOTPTimer((prev) => prev - 1);
            }, 1000);
        } else if (otpTimer === 0) {
            setTimerActive(false);
        }
        return () => clearInterval(interval);
    }, [timerActive, otpTimer]);

    // Check URL params for login/signup triggers
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);

        if (urlParams.get("login") === "true") {
            setIsLoginModalOpen(true);
            window.history.replaceState({}, "", window.location.pathname);
        }

        if (urlParams.get("signup") === "true") {
            setIsSignUpModalOpen(true);
            const pendingUserTypeId = sessionStorage.getItem("pendingUserType");
            if (pendingUserTypeId) {
                const match = userTypes.find((t) => t.id === pendingUserTypeId);
                if (match) {
                    setSelectedUserType(match);
                    setIsSignUpModalOpen(false);
                    setIsRegistrationModalOpen(true);
                }
                sessionStorage.removeItem("pendingUserType");
            }
            window.history.replaceState({}, "", window.location.pathname);
        }
    }, []);

    // =================== AUTH LOGIC ===================

    // Request Password Reset (Step 1: Send OTP)
    const handleRequestPasswordReset = async (e) => {
        e.preventDefault();
        setIsRequestingReset(true);

        const email = registeredEmail || loginEmail;
        if (!email) {
            alert("Please enter your email address");
            setIsRequestingReset(false);
            return;
        }

        try {
            console.log("🔑 Requesting password reset for:", email);

            const res = await fetch("https://archireach.onrender.com/api/auth/request-password-reset", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email: email }),
            });

            const data = await res.json();
            console.log("Password reset request response:", data);

            if (res.ok && data.success) {
                alert("✅ OTP sent to your email! Please check your inbox.");
                setResetUserId(data.userId);
                setIsPasswordResetModalOpen(false);
                setIsPasswordResetOTPModalOpen(true);
                setOTPTimer(600); // 10 minutes
                setTimerActive(true);
            } else {
                alert(data.message || "Failed to send OTP. Please try again.");
            }
        } catch (error) {
            console.error("Password reset request error:", error);
            alert(`Error: ${error.message || "Unable to request password reset. Please try again."}`);
        } finally {
            setIsRequestingReset(false);
        }
    };

    // Password Reset Handler (Step 2: Verify OTP and Reset Password)
    const handlePasswordReset = async (e) => {
        e.preventDefault();
        setIsResettingPassword(true);

        if (!resetOTP || resetOTP.length !== 6) {
            alert("Please enter a valid 6-digit OTP");
            setIsResettingPassword(false);
            return;
        }

        if (!resetPassword || !resetConfirmPassword) {
            alert("Please enter both password fields");
            setIsResettingPassword(false);
            return;
        }

        if (resetPassword.length < 6) {
            alert("Password must be at least 6 characters long");
            setIsResettingPassword(false);
            return;
        }

        if (resetPassword !== resetConfirmPassword) {
            alert("Passwords do not match");
            setIsResettingPassword(false);
            return;
        }

        if (!resetUserId) {
            alert("Session expired. Please request a new password reset.");
            setIsResettingPassword(false);
            closePasswordResetOTPModal();
            return;
        }

        try {
            console.log("🔑 Resetting password with OTP");

            const res = await fetch("https://archireach.onrender.com/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    userId: resetUserId,
                    otp: resetOTP.trim(),
                    newPassword: resetPassword,
                }),
            });

            const data = await res.json();
            console.log("Password reset response:", data);

            if (res.ok && data.success) {
                alert("✅ Password reset successfully! You can now login with your new password.");
                closePasswordResetOTPModal();
                setIsLoginModalOpen(true);
                setLoginPassword(""); // Clear password field
            } else {
                alert(data.message || "Failed to reset password. Please check your OTP and try again.");
            }
        } catch (error) {
            console.error("Password reset error:", error);
            alert(`Error: ${error.message || "Unable to reset password. Please try again."}`);
        } finally {
            setIsResettingPassword(false);
        }
    };

    // Login Handler
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setIsLoginLoading(true);

        try {
            const trimmedEmail = loginEmail?.trim();
            const trimmedPassword = loginPassword?.trim();

            if (!trimmedEmail || !trimmedPassword) {
                alert("Please enter both email and password");
                setIsLoginLoading(false);
                return;
            }

            console.log("🔵 Sending login request via AuthContext:", trimmedEmail);

            const result = await login(trimmedEmail, trimmedPassword);

            if (result.success) {
                const user = result.user;
                alert(`Welcome back, ${user.fullName || "User"}! 🎉`);
                closeLoginModal();

                // Redirect based on user type
                const dashboardMap = {
                    client: "/pages/blog/ClientDash",
                    student: "/pages/blog/StudentDash",
                    college: "/pages/blog/CollegeDash",
                    architect: "/pages/blog/ArchitectDash",
                    brands: "/pages/blog/BrandDash",
                    firm: "/pages/blog/FirmDash"
                };

                const targetDashboardPage = dashboardMap[user.userType] || "/";
                navigate(targetDashboardPage);
            } else if (result.requiresVerification) {
                alert("Please verify your email first. Check your inbox for the OTP.");
                setRegisteredUserId(result.userId);
                setRegisteredEmail(loginEmail);
                closeLoginModal();
                openOTPModal();
                setOTPTimer(600);
                setTimerActive(true);
            } else {
                alert(result.error || "Login failed.");
            }
        } catch (error) {
            console.error("❌ Login error:", error);
            alert(`Error: ${error.message || "Unable to login."}`);
        } finally {
            setIsLoginLoading(false);
        }
    };

    // Registration Handler
    const handleRegistrationSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const { fullName, email, password, confirmPassword } = formData;

        if (!fullName || !email || !password || !confirmPassword) {
            alert("Please fill all fields");
            setIsLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            setIsLoading(false);
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters long");
            setIsLoading(false);
            return;
        }

        if (!selectedUserType || !selectedUserType.id) {
            alert("Please select a user type");
            setIsLoading(false);
            return;
        }

        localStorage.clear();

        try {
            const res = await fetch("https://archireach.onrender.com/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    fullName,
                    email,
                    password,
                    userType: selectedUserType.id,
                }),
            });

            const data = await res.json();
            console.log("Registration response:", data);

            if (res.ok && data.success) {
                alert(`🎉 Registration successful! Please check your email (${email}) for the OTP to verify your account.`);
                setRegisteredUserId(data.userId);
                setRegisteredEmail(email);
                closeRegistrationModal();
                openOTPModal();
                setOTPTimer(600);
                setTimerActive(true);
            } else {
                alert(data.message || "Signup failed. Please try again.");
            }
        } catch (error) {
            console.error("Registration error:", error);
            alert(`Error: ${error.message || "Something went wrong"}`);
        } finally {
            setIsLoading(false);
        }
    };

    // OTP Verification Handler
    const handleOTPVerification = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const trimmedOTP = otp.trim();
        if (!trimmedOTP || trimmedOTP.length !== 6 || !/^\d{6}$/.test(trimmedOTP)) {
            alert("Please enter a valid 6-digit OTP");
            setIsLoading(false);
            return;
        }

        if (!registeredUserId) {
            alert("Session expired. Please sign up again.");
            setIsLoading(false);
            closeOTPModal();
            return;
        }

        try {
            const result = await verifyAccountOTP(registeredUserId, trimmedOTP);

            if (result.success) {
                const user = result.user;
                const dashboardMap = {
                    client: "/pages/blog/ClientDash", student: "/pages/blog/StudentDash",
                    college: "/pages/blog/CollegeDash", architect: "/pages/blog/ArchitectDash",
                    brands: "/pages/blog/BrandDash", firm: "/pages/blog/FirmDash"
                };

                const targetDashboardPage = dashboardMap[user.userType] || "/LandingPage";
                alert(`🎉 Email verified successfully! Welcome, ${user.fullName}!`);
                closeOTPModal();

                setTimeout(() => {
                    navigate(targetDashboardPage, { replace: true });
                }, 200);
            } else {
                alert(result.error || "OTP verification failed.");
            }
        } catch (error) {
            alert(`❌ Error: ${error.message || "Unable to verify OTP"}`);
        } finally {
            setIsLoading(false);
        }
    };

    // Resend OTP Handler
    const handleResendOTP = async () => {
        if (!registeredUserId) {
            alert("Session expired. Please sign up again.");
            return;
        }

        setIsLoading(true);
        try {
            const res = await fetch("https://archireach.onrender.com/api/auth/resend-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ userId: registeredUserId }),
            });

            const data = await res.json();
            if (res.ok && data.success) {
                alert("✅ New OTP sent to your email!");
            } else {
                alert(data.message || "Failed to resend OTP");
            }
        } catch (error) {
            console.error("Resend OTP error:", error);
            alert("❌ Failed to resend OTP. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className='fixed inset-0 z-50 md:hidden flex items-center justify-center'>
                    <div className='fixed inset-0 bg-black bg-opacity-50' onClick={closeMobileMenu}></div>
                    <div className='bg-white rounded-xl shadow-2xl mx-4 w-full max-w-sm transform transition-all duration-300 ease-in-out scale-100 relative z-50'>
                        <div className='flex justify-between items-center p-6 border-b border-gray-200'>
                            <Link to="/" onClick={closeMobileMenu} className='text-2xl font-normal text-gray-900 hover:text-purple-600 transition-colors'>
                                ARCHIREACH
                            </Link>
                            <button onClick={closeMobileMenu} className='text-gray-500 hover:text-gray-700 p-1'>
                                <X size={24} />
                            </button>
                        </div>

                        <nav className='py-4 max-h-[70vh] overflow-y-auto'>
                            <div className='space-y-1'>
                                <Link to="/" onClick={closeMobileMenu} className='block px-6 py-3.5 text-base font-normal text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-colors rounded-lg mx-2'>Home</Link>
                                <Link to="/pages/ExploreDrop/FindArch" onClick={closeMobileMenu} className='block px-6 py-3.5 text-base font-normal text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-colors rounded-lg mx-2'>Find Architects</Link>
                                <Link to="/pages/ExploreDrop/FindProjects" onClick={closeMobileMenu} className='block px-6 py-3.5 text-base font-normal text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-colors rounded-lg mx-2'>Find Projects</Link>
                                <Link to="/pricing" onClick={closeMobileMenu} className='block px-6 py-3.5 text-base font-normal text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-colors rounded-lg mx-2'>Pricing</Link>
                                <Link to="/blog" onClick={closeMobileMenu} className='block px-6 py-3.5 text-base font-normal text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-colors rounded-lg mx-2'>Blog</Link>
                                <Link to="/about" onClick={closeMobileMenu} className='block px-6 py-3.5 text-base font-normal text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-colors rounded-lg mx-2'>About</Link>
                                <Link to="/contact" onClick={closeMobileMenu} className='block px-6 py-3.5 text-base font-normal text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-colors rounded-lg mx-2'>Contact</Link>
                            </div>

                            <div className='px-4 pt-4 space-y-3 border-t border-gray-200 mt-4'>
                                <button
                                    onClick={() => { closeMobileMenu(); navigate('/signin'); }}
                                    className='w-full text-purple-600 hover:text-purple-700 px-4 py-3 border-2 border-purple-600 rounded-lg transition-colors font-normal text-sm hover:bg-purple-50'
                                >
                                    Sign In
                                </button>
                                <button
                                    onClick={() => { closeMobileMenu(); navigate('/signup'); }}
                                    className='w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg transition-colors font-normal text-sm shadow-md'
                                >
                                    Sign Up
                                </button>
                            </div>
                        </nav>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="px-4 pt-4 sm:px-6 lg:px-0">
                <header className="bg-white max-w-7xl mx-auto shadow-md border border-gray-100 rounded-4xl z-50">
                    <div className="rounded-4xl overflow-visible px-4 sm:px-6 lg:px-12">
                        <div className="flex justify-between items-center py-1 sm:py-2">
                            {/* Left side */}
                            <div className="flex items-center space-x-4 sm:space-x-8 lg:space-x-12">
                                <Link to="/" className="text-2xl font-extrabold text-gray-900 hover:text-[rgb(122,107,235)] transition-colors">
                                    ARCHIREACH
                                </Link>

                                {/* Desktop Nav */}
                                <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
                                    <Link to="/" className="font-bold text-gray-700 hover:text-[rgb(122,107,235)]">Home</Link>
                                    <Link to="/pages/ExploreDrop/FindArch" className="font-bold text-gray-700 hover:text-[rgb(122,107,235)]">Find Architects</Link>
                                    <Link to="/pages/ExploreDrop/FindProjects" className="font-bold text-gray-700 hover:text-[rgb(122,107,235)]">Find Projects</Link>
                                    <Link to="/pricing" className="font-bold text-gray-700 hover:text-[rgb(122,107,235)]">Pricing</Link>
                                    <Link to="/blog" className="font-bold text-gray-700 hover:text-[rgb(122,107,235)]">Blog</Link>
                                    <Link to="/about" className="font-bold text-gray-700 hover:text-[rgb(122,107,235)]">About</Link>
                                </nav>
                            </div>

                            {/* Right side */}
                            <div className="hidden md:flex items-center space-x-4">
                                <button
                                    onClick={() => navigate('/signin')}
                                    className="border-2 border-[rgb(122,107,235)] text-[rgb(122,107,235)] px-5 py-2.5 rounded-3xl font-bold text-sm hover:bg-[rgb(122,107,235)/10]"
                                >
                                    Sign In
                                </button>
                                <button
                                    onClick={() => navigate('/signup')}
                                    className="bg-[rgb(122,107,235)] text-white px-5 py-2.5 rounded-3xl font-bold text-sm shadow-md"
                                >
                                    Sign Up
                                </button>
                                <Link to="/contact" className="font-bold text-gray-700 hover:text-[rgb(122,107,235)] ml-4">
                                    Contact
                                </Link>
                            </div>

                            {/* Mobile Toggle */}
                            <div className="md:hidden">
                                <button onClick={toggleMobileMenu} className="p-2 text-gray-600">
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </header>
            </div>

            {/* =================== MODALS =================== */}

            {/* Sign Up Modal (Choose Account Type) */}
            {isSignUpModalOpen && (
                <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center p-4 z-[60]">
                    <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h2 className="text-2xl font-normal text-gray-800">Choose Your Account Type</h2>
                            <button onClick={closeSignUpModal} className="text-gray-400 hover:text-gray-600">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-6">
                            <p className="text-gray-600 mb-6 text-center">Select the option that best describes you to get started</p>
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {userTypes.slice(0, 3).map((userType) => {
                                        const IconComponent = userType.icon;
                                        return (
                                            <div key={userType.id} onClick={() => handleCardClick(userType)} className="bg-white border-2 border-gray-200 rounded-lg p-6 cursor-pointer hover:border-purple-500 hover:shadow-lg transition-all group">
                                                <div className="text-center">
                                                    <div className={`${userType.color} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition`}>
                                                        <IconComponent className="text-white" size={24} />
                                                    </div>
                                                    <h3 className="font-normal text-gray-800 mb-2">{userType.title}</h3>
                                                    <p className="text-sm text-gray-600">{userType.description}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {userTypes.slice(3, 6).map((userType) => {
                                        const IconComponent = userType.icon;
                                        return (
                                            <div key={userType.id} onClick={() => handleCardClick(userType)} className="bg-white border-2 border-gray-200 rounded-lg p-6 cursor-pointer hover:border-purple-500 hover:shadow-lg transition-all group">
                                                <div className="text-center">
                                                    <div className={`${userType.color} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition`}>
                                                        <IconComponent className="text-white" size={24} />
                                                    </div>
                                                    <h3 className="font-normal text-gray-800 mb-2">{userType.title}</h3>
                                                    <p className="text-sm text-gray-600">{userType.description}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-200 bg-gray-50">
                            <p className="text-sm text-gray-500 text-center">Don't worry, you can change this later in your profile settings</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Login Modal */}
            {isLoginModalOpen && (
                <div className="fixed inset-0 bg-black/60 bg-opacity-70 flex items-center justify-center p-4 z-[80]">
                    <div className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden">
                        <div className="flex items-center justify-between p-6" style={{ backgroundColor: "rgb(122, 107, 235)" }}>
                            <h2 className="text-2xl font-normal text-white">Sign In</h2>
                            <button onClick={closeLoginModal} className="text-white hover:text-gray-200 transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            <form onSubmit={handleLoginSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <Mail className="inline mr-2 h-4 w-4" /> Email
                                    </label>
                                    <input
                                        name="loginEmail" type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)}
                                        placeholder="Enter your email" required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[rgb(122,107,235)] focus:border-[rgb(122,107,235)] focus:outline-none transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <Lock className="inline mr-2 h-4 w-4" /> Password
                                    </label>
                                    <input
                                        name="loginPassword" type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)}
                                        placeholder="Enter your password" required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[rgb(122,107,235)] focus:border-[rgb(122,107,235)] focus:outline-none transition"
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button type="button" onClick={openPasswordResetModal} className="text-sm text-[rgb(122,107,235)] hover:text-purple-800 font-medium transition-colors">
                                        Forgot Password?
                                    </button>
                                </div>
                                <button type="submit" disabled={isLoginLoading} className="w-full bg-[rgb(122,107,235)] hover:bg-[#947dee] text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-50">
                                    {isLoginLoading ? "Signing In..." : "Sign In"}
                                </button>
                                <p className="text-sm text-center text-gray-600 pt-2">
                                    Don't have an account? <button type="button" onClick={() => { closeLoginModal(); navigate('/signup'); }} className="text-[rgb(122,107,235)] hover:text-purple-800 font-medium">Sign Up</button>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Registration Modal */}
            {isRegistrationModalOpen && (
                <div className="fixed inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center p-4 z-[70]">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                            <div className="relative block min-h-[220px] sm:min-h-[280px] md:min-h-full">
                                <img src={registerImage} alt="Register" className="absolute inset-0 w-full h-full object-cover" />
                            </div>
                            <div className="bg-white">
                                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                                    <h2 className="text-2xl font-normal text-gray-800">{selectedUserType?.title} Registration</h2>
                                    <button onClick={closeRegistrationModal} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
                                </div>
                                <div className="p-6">
                                    <form className="space-y-4" onSubmit={handleRegistrationSubmit}>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2"><User className="inline mr-2 h-4 w-4" /> Full Name</label>
                                            <input name="fullName" type="text" value={formData.fullName} onChange={handleChange} placeholder="Enter your full name" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" required />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2"><Mail className="inline mr-2 h-4 w-4" /> Email Address</label>
                                            <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" required />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2"><Lock className="inline mr-2 h-4 w-4" /> Password</label>
                                            <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Enter password (min. 6 characters)" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" required minLength={6} />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2"><Lock className="inline mr-2 h-4 w-4" /> Confirm Password</label>
                                            <input name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm password" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" required />
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <input type="checkbox" id="terms" className="h-5 w-5 text-purple-600 border-gray-300 rounded mt-1" required />
                                            <label htmlFor="terms" className="text-sm text-gray-600">I agree to the <a href="#" className="text-[#7A6BEB]">Terms of Service</a> and <a href="#" className="text-[#7A6BEB]">Privacy Policy</a></label>
                                        </div>
                                        <button type="submit" disabled={isLoading} className="w-full bg-[#7A6BEB] hover:bg-[#6B5DD8] text-white py-3 rounded-lg text-lg font-medium transition-colors disabled:opacity-50">
                                            {isLoading ? "Creating Account..." : "Create Account"}
                                        </button>
                                        <p className="text-sm text-center text-gray-600 pt-2">
                                            Already have an account? <button type="button" onClick={() => { closeRegistrationModal(); navigate('/signin'); }} className="text-[#7A6BEB] font-medium">Sign in</button>
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* OTP Modal */}
            {isOTPModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-[90]">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
                        <div className="flex items-center justify-between p-6 bg-gradient-to-r from-green-600 to-teal-600">
                            <div><h2 className="text-2xl font-normal text-white">Verify Email</h2><p className="text-green-100 text-sm mt-1">Check your inbox for the OTP</p></div>
                            <button onClick={closeOTPModal} className="text-white hover:text-gray-200"><X size={24} /></button>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <div className="flex items-start">
                                    <Mail className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                                    <div><p className="text-sm font-medium text-blue-900">OTP sent to:</p><p className="text-sm text-blue-700 font-semibold mt-1">{registeredEmail}</p></div>
                                </div>
                            </div>
                            <form onSubmit={handleOTPVerification} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Enter 6-Digit OTP</label>
                                    <input type="text" value={otp} onChange={(e) => { const val = e.target.value.replace(/\D/g, ''); if (val.length <= 6) setOTP(val); }} placeholder="000000" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none text-center text-2xl font-bold tracking-widest" maxLength={6} required />
                                </div>
                                {timerActive && otpTimer > 0 && (
                                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center"><p className="text-sm text-yellow-800">⏱️ Expires in: <span className="font-bold">{formatTime(otpTimer)}</span></p></div>
                                )}
                                {otpTimer === 0 && (
                                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center"><p className="text-sm text-red-800 font-medium">⚠️ OTP has expired.</p></div>
                                )}
                                <button type="submit" disabled={isLoading || otpTimer === 0} className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold py-3 rounded-lg disabled:opacity-50">
                                    {isLoading ? "Verifying..." : "Verify Email"}
                                </button>
                            </form>
                            <div className="border-t border-gray-200 pt-4">
                                <button onClick={handleResendOTP} disabled={isResendingOTP || (timerActive && otpTimer > 540)} className="w-full text-purple-600 font-medium py-2 disabled:opacity-50">
                                    {isResendingOTP ? "Sending..." : "📧 Resend OTP"}
                                </button>
                                {timerActive && otpTimer > 540 && <p className="text-xs text-gray-500 text-center mt-2">Resend available in {formatTime(otpTimer - 540)}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Password Reset Modal */}
            {isPasswordResetModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-[85]">
                    <div className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden">
                        <div className="flex items-center justify-between p-6 bg-gradient-to-r from-orange-600 to-red-600">
                            <h2 className="text-2xl font-normal text-white">Reset Password</h2>
                            <button onClick={closePasswordResetModal} className="text-white hover:text-gray-200"><X size={24} /></button>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4"><p className="text-sm text-blue-700 font-semibold">{registeredEmail || loginEmail}</p></div>
                            <form onSubmit={handlePasswordReset} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2"><Lock className="inline mr-2 h-4 w-4" /> New Password</label>
                                    <input type="password" value={resetPassword} onChange={(e) => setResetPassword(e.target.value)} placeholder="Min 6 chars" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500" required minLength={6} disabled={isResettingPassword} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2"><Lock className="inline mr-2 h-4 w-4" /> Confirm Password</label>
                                    <input type="password" value={resetConfirmPassword} onChange={(e) => setResetConfirmPassword(e.target.value)} placeholder="Confirm new password" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500" required minLength={6} disabled={isResettingPassword} />
                                </div>
                                <button type="submit" disabled={isResettingPassword} className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold py-3 rounded-lg disabled:opacity-50">
                                    {isResettingPassword ? "Resetting..." : "Reset Password"}
                                </button>
                                <p className="text-sm text-center text-gray-600 pt-2"><button type="button" onClick={() => { closePasswordResetModal(); setIsLoginModalOpen(true); }} className="text-orange-600 font-medium">Back to Login</button></p>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Password Reset OTP Modal */}
            {isPasswordResetOTPModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-[86]">
                    <div className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden">
                        <div className="flex items-center justify-between p-6 bg-gradient-to-r from-orange-600 to-red-600">
                            <h2 className="text-2xl font-normal text-white">Verify OTP & Reset</h2>
                            <button onClick={closePasswordResetOTPModal} className="text-white hover:text-gray-200"><X size={24} /></button>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4"><p className="text-sm text-blue-700 font-semibold">{registeredEmail || loginEmail}</p></div>
                            <form onSubmit={handlePasswordReset} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Enter 6-Digit OTP</label>
                                    <input type="text" value={resetOTP} onChange={(e) => { const val = e.target.value.replace(/\D/g, ''); if (val.length <= 6) setResetOTP(val); }} placeholder="000000" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 text-center text-2xl font-bold tracking-widest" maxLength={6} required disabled={isResettingPassword} />
                                </div>
                                <div><label className="block text-sm font-medium text-gray-700 mb-2">New Password</label><input type="password" value={resetPassword} onChange={(e) => setResetPassword(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500" required minLength={6} disabled={isResettingPassword} /></div>
                                <div><label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label><input type="password" value={resetConfirmPassword} onChange={(e) => setResetConfirmPassword(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500" required minLength={6} disabled={isResettingPassword} /></div>
                                <button type="submit" disabled={isResettingPassword} className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold py-3 rounded-lg disabled:opacity-50">{isResettingPassword ? "Resetting..." : "Reset Password"}</button>
                                <p className="text-sm text-center text-gray-600 pt-2"><button type="button" onClick={() => { closePasswordResetOTPModal(); setIsPasswordResetModalOpen(true); }} className="text-orange-600 font-medium">Back</button></p>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
