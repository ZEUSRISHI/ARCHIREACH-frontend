import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { X, User, PersonStandingIcon } from 'lucide-react';
import SharedNavbar from '../components/Layout/SharedNavbar';
import { toast } from 'react-toastify';

const userTypes = [
  {
    id: 'client',
    title: 'Client',
    icon: User,
    description: 'Looking for services',
    color: 'bg-blue-500',
  },
  {
    id: 'firm',
    title: 'Firm',
    icon: PersonStandingIcon,
    description: 'Advertising agency or firm',
    color: 'bg-blue-500',
  },
];

export default function SignupPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showFooterDetails, setShowFooterDetails] = useState(false);
  const referralCode = searchParams.get('ref');

  // Store referral code in session for use during registration
  useEffect(() => {
    if (referralCode) {
      sessionStorage.setItem('referralCode', referralCode);
      toast.info('You have a referral code! It will be applied after registration.');
    }
  }, [referralCode]);

  const handleAccountTypeSelect = (userType) => {
    if (userType.id === 'client') {
      navigate('/client-registration');
    } else if (userType.id === 'firm') {
      navigate('/firm-registration');
    } else {
      sessionStorage.setItem('pendingUserType', userType.id);
      navigate('/?signup=true');
    }
  };
  return (
    <div className="min-h-screen bg-white">
      <div className="pt-4">
        <SharedNavbar />
      </div>

      <style>{`
        @keyframes quiboFadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .quibo-signup-fade-up { animation: quiboFadeUp 520ms ease-out both; }
        @media (prefers-reduced-motion: reduce) {
          .quibo-signup-fade-up { animation: none; }
        }
      `}</style>

      <div className="px-4 py-8 sm:py-10">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 quibo-signup-fade-up" style={{ animationDelay: '40ms' }}>
              <h2 className="text-2xl font-bold text-gray-800">Choose Your Account Type</h2>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 quibo-signup-fade-up" style={{ animationDelay: '90ms' }}>
              <p className="text-gray-600 mb-6 text-center">
                Select the option that best describes you to get started
              </p>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
                  {userTypes.map((userType) => {
                    const IconComponent = userType.icon;
                    return (
                      <div
                        key={userType.id}
                        onClick={() => handleAccountTypeSelect(userType)}
                        className="bg-white border-2 border-gray-200 rounded-lg p-6 cursor-pointer hover:border-purple-500 hover:shadow-lg transition-all duration-200 group"
                      >
                        <div className="text-center">
                          <div
                            className={`${userType.color} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-200`}
                          >
                            <IconComponent className="text-white" size={24} />
                          </div>
                          <h3 className="font-semibold text-gray-800 mb-2">{userType.title}</h3>
                          <p className="text-sm text-gray-600">{userType.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>


            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <p className="text-sm text-gray-500 text-center quibo-signup-fade-up" style={{ animationDelay: '180ms' }}>
                Don't worry, you can change this later in your profile settings
              </p>

              {showFooterDetails && (
                <div className="mt-6 text-center quibo-signup-fade-up" style={{ animationDelay: '220ms' }}>
                  <p className="text-sm text-gray-700 font-medium">
                    New user? <span className="text-gray-500 font-normal">Choose an account type above to continue.</span>
                  </p>
                  <button
                    type="button"
                    onClick={() => navigate('/signin')}
                    className="mt-2 text-sm font-semibold text-[rgb(122,107,235)] hover:text-[rgb(100,90,220)]"
                  >
                    Already have an account? Sign In
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
