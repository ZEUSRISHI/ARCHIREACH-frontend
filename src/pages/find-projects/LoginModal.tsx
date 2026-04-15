import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, User } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '../ui/dialog';
import { useAuth } from '../../hooks/useAuth';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
  initialMode?: 'login' | 'signup';
}

export function LoginModal({ isOpen, onClose, onLogin, initialMode = 'login' }: LoginModalProps) {
  const [isSignup, setIsSignup] = useState(initialMode === 'signup');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phone: '',
    confirmPassword: '',
    coaNumber: '',
    firmName: '',
    specializations: [] as string[],
    agreeToTerms: false
  });

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setIsSignup(initialMode === 'signup');
    } else {
      setIsSignup(false);
      setFormData({
        email: '',
        password: '',
        fullName: '',
        phone: '',
        confirmPassword: '',
        coaNumber: '',
        firmName: '',
        specializations: [],
        agreeToTerms: false
      });
      setError('');
    }
  }, [isOpen, initialMode]);

  const specializations = [
    'Residential',
    'Commercial',
    'Sustainable',
    'Interior',
    'Heritage'
  ];

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth() as any;
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (!isSignup) {
        // Sign In using AuthContext
        const result = await login(formData.email, formData.password);

        if (result.success) {
          // Success is handled in AuthContext (localStorage set, state updated)
          onLogin();
          onClose();
        } else {
          setError(result.error || 'Sign in failed. Please check your credentials.');
        }
      } else {
        // ... rest of signup logic (signup might not be in useAuth yet or handled differently)
        // For now keep the sign up as is or move to useAuth as well
        const response = await fetch('https://archireach.onrender.com/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            fullName: formData.fullName,
            email: formData.email,
            password: formData.password,
            phone: formData.phone,
            userType: 'architect',
            coaNumber: formData.coaNumber,
            firmName: formData.firmName || '',
            specializations: formData.specializations,
          }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          alert('Account created successfully! Please verify your email.');
          setIsSignup(false);
          setFormData({
            email: formData.email,
            password: '',
            fullName: '',
            phone: '',
            confirmPassword: '',
            coaNumber: '',
            firmName: '',
            specializations: [],
            agreeToTerms: false,
          });
        } else {
          setError(data.message || 'Registration failed. Please try again.');
        }
      }
    } catch (err) {
      console.error('Auth error:', err);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent showCloseButton={false} className="p-0 border-none bg-transparent shadow-none max-w-md w-full">
        <DialogTitle className="sr-only">
          {isSignup ? 'Create Account' : 'Sign In'}
        </DialogTitle>
        <DialogDescription className="sr-only">
          {isSignup ? 'Register for a new account' : 'Sign in to your existing account'}
        </DialogDescription>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-h-[90vh] overflow-y-auto w-full">
          {/* Modal Header */}
          <div
            className="flex items-center justify-between p-6"
            style={{ backgroundColor: 'rgba(122, 107, 235, 0.85)' }}
          >
            <h2 className="text-2xl font-bold text-white">
              {isSignup ? 'Create Account' : 'Sign In'}
            </h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
              disabled={isLoading}
            >
              <X size={24} />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {!isSignup && (
              <p className="text-sm text-gray-600 text-center">
                Sign in to view full project details, client contact information, and submit proposals.
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {!isSignup ? (
                <>
                  {/* Sign In Form */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="inline mr-2 h-4 w-4" />
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        setError('');
                      }}
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[rgba(122,107,235,0.85)] focus:outline-none transition"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Lock className="inline mr-2 h-4 w-4" />
                      Password
                    </label>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => {
                        setFormData({ ...formData, password: e.target.value });
                        setError('');
                      }}
                      placeholder="Enter your password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[rgba(122,107,235,0.85)] focus:outline-none transition"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <a
                    href="#"
                    className="text-xs text-[rgba(122, 107, 235, 0.85)] hover:text-[rgba(122,107,235,1)] hover:underline block"
                  >
                    Forgot Password?
                  </a>

                  <button
                    type="submit"
                    disabled={isLoading}
                    style={{
                      backgroundColor: 'rgba(122, 107, 235, 0.85)',
                      transition: 'all 0.2s',
                    }}
                    className="w-full text-white font-semibold py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[rgba(122,107,235,1)]"
                  >
                    {isLoading ? 'Signing In...' : 'Sign In'}
                  </button>

                  <p className="text-sm text-center text-gray-600 pt-2">
                    Don't have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setIsSignup(true)}
                      className="text-[rgba(122, 107, 235, 0.85)] hover:text-[rgba(122,107,235,1)] font-medium transition-colors"
                      disabled={isLoading}
                    >
                      Sign Up
                    </button>
                  </p>
                </>
              ) : (
                <>
                  {/* Sign Up Form */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="inline mr-2 h-4 w-4" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => {
                        setFormData({ ...formData, fullName: e.target.value });
                        setError('');
                      }}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgba(122,107,235,0.85)] focus:border-transparent"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="inline mr-2 h-4 w-4" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        setError('');
                      }}
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgba(122,107,235,0.85)] focus:border-transparent"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        setError('');
                      }}
                      placeholder="+91 00000 00000"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgba(122,107,235,0.85)] focus:border-transparent"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Lock className="inline mr-2 h-4 w-4" />
                      Password (min. 8 characters)
                    </label>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => {
                        setFormData({ ...formData, password: e.target.value });
                        setError('');
                      }}
                      placeholder="Enter password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgba(122,107,235,0.85)] focus:border-transparent"
                      required
                      minLength={8}
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Lock className="inline mr-2 h-4 w-4" />
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => {
                        setFormData({ ...formData, confirmPassword: e.target.value });
                        setError('');
                      }}
                      placeholder="Confirm password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgba(122,107,235,0.85)] focus:border-transparent"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      COA Registration Number
                    </label>
                    <input
                      type="text"
                      value={formData.coaNumber}
                      onChange={(e) => {
                        setFormData({ ...formData, coaNumber: e.target.value });
                        setError('');
                      }}
                      placeholder="e.g., AR-12345"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgba(122,107,235,0.85)] focus:border-transparent"
                      required
                      disabled={isLoading}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      We verify all registration numbers with COA database
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Architecture Firm Name (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.firmName}
                      onChange={(e) => {
                        setFormData({ ...formData, firmName: e.target.value });
                        setError('');
                      }}
                      placeholder="Your firm or practice name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgba(122,107,235,0.85)] focus:border-transparent"
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Specialization
                    </label>
                    <div className="space-y-2">
                      {specializations.map((spec) => (
                        <div key={spec} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={`spec-${spec}`}
                            checked={formData.specializations.includes(spec)}
                            onChange={(e) => {
                              if (!isLoading) {
                                if (e.target.checked) {
                                  setFormData({
                                    ...formData,
                                    specializations: [...formData.specializations, spec]
                                  });
                                } else {
                                  setFormData({
                                    ...formData,
                                    specializations: formData.specializations.filter(s => s !== spec)
                                  });
                                }
                              }
                            }}
                            disabled={isLoading}
                            className="h-4 w-4 text-[rgba(122,107,235,0.85)] focus:ring-[rgba(122,107,235,0.85)] border-gray-300 rounded"
                          />
                          <label
                            htmlFor={`spec-${spec}`}
                            className={`text-sm text-gray-700 ${isLoading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                          >
                            {spec}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={formData.agreeToTerms}
                      onChange={(e) => {
                        if (!isLoading) {
                          setFormData({ ...formData, agreeToTerms: e.target.checked });
                        }
                      }}
                      required
                      disabled={isLoading}
                      className="h-5 w-5 text-[rgba(122,107,235,0.85)] focus:ring-[rgba(122,107,235,0.85)] border-gray-300 rounded mt-1"
                    />
                    <label htmlFor="terms" className={`text-sm text-gray-600 ${isLoading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}>
                      I agree to the{" "}
                      <a href="#" className="text-[rgba(122, 107, 235, 0.85)] hover:text-[rgba(122,107,235,1)] hover:underline">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-[rgba(122, 107, 235, 0.85)] hover:text-[rgba(122,107,235,1)] hover:underline">
                        Privacy Policy
                      </a>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    style={{
                      backgroundColor: 'rgba(122, 107, 235, 0.85)',
                      transition: 'all 0.2s',
                    }}
                    className="w-full text-white py-3 rounded-lg text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[rgba(122,107,235,1)]"
                  >
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </button>

                  <p className="text-sm text-center text-gray-600 pt-2">
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setIsSignup(false)}
                      className="text-[rgba(122, 107, 235, 0.85)] hover:text-[rgba(122,107,235,1)] font-medium transition-colors"
                      disabled={isLoading}
                    >
                      Sign In
                    </button>
                  </p>
                </>
              )}
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
