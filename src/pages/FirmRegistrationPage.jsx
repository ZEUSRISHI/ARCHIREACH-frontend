import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, X } from "lucide-react";
import SharedNavbar from "../components/Layout/SharedNavbar";
import registerImage from "../assets/register.png";
import axiosClient from "../api/axiosClient";

export default function FirmRegistrationPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (!formData.agreeToTerms) {
      setError('You must agree to the Terms of Service and Privacy Policy');
      setIsLoading(false);
      return;
    }

    try {
       const referralCode = sessionStorage.getItem("referralCode");

      const res = await axiosClient.post("/auth/signup", {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        password: formData.password.trim(),
        userType: "firm",
        referralCode: referralCode || null,
      });

     const data = res.data;

     if (data.success) {
        // Redirect to sign-in page with success message
        navigate('/verify-otp', {
          state: {
            email: data.email,
            userId: data.userId,
            message: 'Firm registration successful! Please verify your email.'
          }
        });
      } else {
        setError(data.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#ECEBFB' }}>
      <SharedNavbar />

      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
        <div className="w-full max-w-4xl">
          {/* Top Section - Image */}
          <div className="mb-8 flex justify-center">
            <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-lg">
              <img
                src={registerImage}
                alt="Register Firm"
                className="w-full h-auto rounded"
              />
            </div>
          </div>

          {/* Bottom Section - Registration Form */}
          <div className="flex justify-center">
            <div className="w-full max-w-sm bg-white rounded-lg shadow-lg p-6 lg:p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Firm Registration</h2>
              <p className="text-gray-700 mb-6">Create your firm account to get started</p>

              {error && (
                <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="inline mr-2 h-4 w-4" />
                    Full Name
                  </label>
                  <input
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your firm name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(122,107,235)] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="inline mr-2 h-4 w-4" />
                    Email Address
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(122,107,235)] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Lock className="inline mr-2 h-4 w-4" />
                    Password
                  </label>
                  <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter password (min. 6 characters)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(122,107,235)] focus:border-transparent"
                    required
                    minLength={6}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Lock className="inline mr-2 h-4 w-4" />
                    Confirm Password
                  </label>
                  <input
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(122,107,235)] focus:border-transparent"
                    required
                  />
                </div>

                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="terms"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    className="h-5 w-5 text-[rgb(122,107,235)] focus:ring-[rgb(122,107,235)] border-gray-300 rounded mt-1"
                    required
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    I agree to the{" "}
                    <a href="#" className="text-[rgb(122,107,235)] hover:underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-[rgb(122,107,235)] hover:underline">
                      Privacy Policy
                    </a>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[rgb(122,107,235)] hover:bg-[#947dee] text-white py-3 rounded-lg text-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating Account...
                    </span>
                  ) : (
                    "Create Account"
                  )}
                </button>

                <p className="text-sm text-center text-gray-700 pt-2">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => navigate('/signin')}
                    className="text-[rgb(122,107,235)] hover:text-[rgb(100,90,220)] font-semibold"
                  >
                    Sign in
                  </button>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
