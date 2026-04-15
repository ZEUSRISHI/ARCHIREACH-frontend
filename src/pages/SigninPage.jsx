import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import SharedNavbar from '../components/Layout/SharedNavbar';
import heroImage from '../assets/signin.png';

export default function SigninPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  /** Check for redirect URL from pricing page or other protected routes */
  const redirectUrl = searchParams.get('redirect');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const { login } = useAuth(); // Import useAuth hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await login(email.trim(), password.trim());

      if (res.success) {
        const { _id, uid, userType } = res.user;

        // Set type-specific IDs (legacy support if needed, though useAuth stores 'user')
        if (userType === 'architect') localStorage.setItem('architectId', _id);
        if (userType === 'firm') localStorage.setItem('firmId', _id);
        if (userType === 'client') localStorage.setItem('clientId', _id);

        // Ensure userUID is set for dashboards
        localStorage.setItem('userUID', uid);
        localStorage.setItem('currentUserId', _id);

        // If there's a redirect URL (e.g., from pricing page), go there first
        if (redirectUrl) {
          navigate(redirectUrl);
          return;
        }

        // Redirect based on userType
        if (userType === 'architect') {
          navigate('/pages/blog/ArchitectDash');
        } else if (userType === 'firm') {
          navigate('/pages/blog/FirmDash');
        } else if (userType === 'client') {
          navigate('/pages/blog/ClientDash');
        } else if (userType === 'student') {
          navigate('/pages/blog/StudentDash');
        } else if (userType === 'college') {
          navigate('/pages/blog/CollegeDash');
        } else if (userType === 'brands') {
          navigate('/pages/blog/BrandDash');
        } else {
          navigate('/');
        }
      } else if (res.requiresVerification) {
        navigate('/verify-otp', {
          state: {
            email: email,
            userId: res.userId,
            message: res.error
          }
        });
      } else {
        setError(res.error);
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#ECEBFB' }}>
      <div className="pt-4">
        <SharedNavbar />
      </div>

      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-80px)]">
        {/* Left Side - Hero Section */}
        <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center" style={{ backgroundColor: '#ECEBFB' }}>
          <div className="max-w-md mx-auto lg:ml-16 lg:mr-0">
            <h1 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-900">
              Welcome to Archireach
            </h1>
            <p className="text-lg mb-8 text-gray-700">
              Connect with India's finest architects and bring your dream projects to life.
            </p>

            {/* Benefits */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[rgb(122,107,235)] rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-lg text-gray-800">500+ verified COA architects</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[rgb(122,107,235)] rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-lg text-gray-800">2000+ successful projects</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[rgb(122,107,235)] rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-lg text-gray-800">End-to-end project support</span>
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[rgb(122,107,235)] rounded-full flex items-center justify-center mr-3">
                  <span className="text-xl font-semibold text-white">PS</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Priya Sharma</p>
                  <p className="text-sm text-gray-600">Homeowner</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Found the perfect architect for our dream home through Archireach. The verification process gave us complete confidence."
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Sign In Form */}
        <div className="lg:w-1/2 p-6 lg:p-8 flex flex-col justify-center">
          <div className="max-w-sm mx-auto w-full bg-white rounded-lg shadow-lg p-6 lg:p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h2>
            <p className="text-gray-700 mb-8">Welcome back! Please enter your details</p>

            {error ? (
              <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[rgb(122,107,235)] focus:border-[rgb(122,107,235)] focus:outline-none"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[rgb(122,107,235)] focus:border-[rgb(122,107,235)] focus:outline-none"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-[rgb(122,107,235)] border-gray-300 rounded focus:ring-[rgb(122,107,235)]"
                  />
                  <span className="ml-2 text-sm text-gray-600">Keep me logged in for 30 days</span>
                </label>
                <button
                  type="button"
                  className="text-sm text-[rgb(122,107,235)] hover:text-[rgb(100,90,220)] font-medium"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[rgb(122,107,235)] hover:bg-[#947dee] text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            {/* Social Login */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Google
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="#25D366" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  WhatsApp
                </button>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-700">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/signup')}
                  className="text-[rgb(122,107,235)] hover:text-[rgb(100,90,220)] font-semibold"
                >
                  Sign up here
                </button>
              </p>
              <p className="text-xs text-gray-500 mt-4">
                By signing in, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
