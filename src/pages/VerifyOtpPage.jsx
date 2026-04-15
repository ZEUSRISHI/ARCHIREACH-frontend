import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import SharedNavbar from '../components/Layout/SharedNavbar';
import { Lock } from 'lucide-react';

export default function VerifyOtpPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [resendStatus, setResendStatus] = useState('');

    const { verifyOTP, resendOTP } = useAuth();

    // Get email and userId from navigation state
    const { email, userId, message } = location.state || {};

    useEffect(() => {
        if (!email || !userId) {
            // If accessed directly without state, redirect to signin
            navigate('/signin');
        }
    }, [email, userId, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const res = await verifyOTP(userId, otp.trim());

            if (res.success) {
                const user = res.user;

                // Ensure legacy IDs are set
                localStorage.setItem('currentUserId', user._id);
                localStorage.setItem('userUID', user.uid);

                if (user.userType === 'architect') localStorage.setItem('architectId', user._id);
                if (user.userType === 'firm') localStorage.setItem('firmId', user._id);
                if (user.userType === 'client') localStorage.setItem('clientId', user._id);

                // Redirect based on userType
                if (user.userType === 'architect') {
                    navigate('/pages/blog/ArchitectDash');
                } else if (user.userType === 'firm') {
                    navigate('/pages/blog/FirmDash');
                } else if (user.userType === 'client') {
                    navigate('/pages/blog/ClientDash');
                } else if (user.userType === 'student') {
                    navigate('/pages/blog/StudentDash');
                } else if (user.userType === 'college') {
                    navigate('/pages/blog/CollegeDash');
                } else if (user.userType === 'brands') {
                    navigate('/pages/blog/BrandDash');
                } else {
                    navigate('/');
                }
            } else {
                setError(res.error || 'Verification failed.');
            }
        } catch (err) {
            setError(err?.message || 'Network error. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendOtp = async () => {
        setResendStatus('Sending...');
        try {
            const res = await resendOTP(userId);
            if (res.success) {
                setResendStatus('OTP sent successfully!');
            } else {
                setResendStatus(res.error || 'Failed to send OTP');
            }
        } catch (error) {
            setResendStatus('Network error');
        }
    };

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#ECEBFB' }}>
            <SharedNavbar />

            <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
                <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 lg:p-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Verify Email</h2>
                    <p className="text-gray-700 mb-6">
                        We've sent a code to <span className="font-semibold">{email}</span>
                    </p>

                    {message && (
                        <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                            {message}
                        </div>
                    )}

                    {error && (
                        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <Lock className="inline mr-2 h-4 w-4" />
                                Verification Code
                            </label>
                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[rgb(122,107,235)] focus:border-[rgb(122,107,235)] focus:outline-none text-center text-2xl tracking-widest"
                                placeholder="123456"
                                maxLength={6}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[rgb(122,107,235)] hover:bg-[#947dee] text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Verifying...' : 'Verify Email'}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-600 mb-2">Didn't receive the code?</p>
                        <button
                            onClick={handleResendOtp}
                            type="button"
                            className="text-[rgb(122,107,235)] hover:text-[rgb(100,90,220)] font-medium"
                        >
                            Resend OTP
                        </button>
                        {resendStatus && <p className="text-sm mt-2 text-gray-500">{resendStatus}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}
