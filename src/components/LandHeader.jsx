import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

import {
  MapPin,
  Building,
  DollarSign,
  Search,
  User,
  GraduationCap,
  Compass,
  Zap,
  Star,
  PersonStandingIcon
} from 'lucide-react'



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
    icon: PersonStandingIcon,
    description: 'Advertising agency or firm',
    color: 'bg-blue-500'
  }
]

const LandHeader = () => {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState(null);


  useEffect(() => {
    const openHandler = () => setIsSignUpModalOpen(true);
    window.addEventListener('openSignUp', openHandler);
    return () => window.removeEventListener('openSignUp', openHandler);
  }, []);

  const navigate = useNavigate();

  const openSignUpModal = () => setIsSignUpModalOpen(true);
  const closeSignUpModal = () => setIsSignUpModalOpen(false);
  const openRegistrationModal = () => setIsRegistrationModalOpen(true);
  const closeRegistrationModal = () => setIsRegistrationModalOpen(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleCardClick = (userType) => {
    setSelectedUserType(userType);
    closeSignUpModal();
    openRegistrationModal();
  };

  const handleRegistrationSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const registrationData = {
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
      terms: formData.get('terms'),
      userType: selectedUserType?.id,
    };

    if (!registrationData.fullName || !registrationData.email || !registrationData.password) {
      alert('Please fill in all required fields');
      return;
    }

    if (registrationData.password !== registrationData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (!registrationData.terms) {
      alert('Please accept the terms and conditions');
      return;
    }

    closeRegistrationModal();

    // For demo purposes, redirect to main signin
    navigate('/signin');
    alert(
      `Registration successful! Welcome to your ${selectedUserType?.title} dashboard, ${registrationData.fullName}!`
    );
  };

  return (
    <>
      {/* Header */}
      <header className='bg-white shadow-sm sticky top-0 z-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center py-4'>
            {/* Logo */}
            <div className='flex items-center space-x-12'>
              <div className='text-2xl font-bold text-gray-900'>ARCHIREACH</div>

              {/* Nav links - Desktop */}
              <nav className='hidden md:flex items-center space-x-8'>
                <a href='#' className='text-gray-600 hover:text-gray-900 font-medium'>Home</a>
                <a href='/pages/blog/Jobpage' className='text-gray-600 hover:text-gray-900 font-medium'>Jobs</a>
                <a href='/pages/blog/Blogpage' className='text-gray-600 hover:text-gray-900 font-medium'>Blog</a>
                <a href='/pages/blog/Aboutpage' className='text-gray-600 hover:text-gray-900 font-medium'>About</a>

                <div className='relative group'>
                  <button className='text-gray-600 hover:text-gray-900 font-medium flex items-center'>
                    Explore
                    <svg className='ml-1 h-4 w-4 transform group-hover:rotate-180 transition-transform' viewBox='0 0 24 24' stroke='currentColor'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7' />
                    </svg>
                  </button>
                  <div className='absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all'>
                    <div className='py-2'>
                      <a href='/pages/ExploreDrop/JobSearch'><button className='block w-full text-left px-4 py-2 hover:bg-gray-50 hover:text-purple-600'>Jobs</button></a>
                      <a href='/pages/ExploreDrop/CollegeCourse'><button className='block w-full text-left px-4 py-2 hover:bg-gray-50 hover:text-purple-600'>College</button></a>
                      <a href='/pages/ExploreDrop/StudIntership'><button className='block w-full text-left px-4 py-2 hover:bg-gray-50 hover:text-purple-600'>Student</button></a>
                      <a href='/pages/ExploreDrop/FindArch'><button className='block w-full text-left px-4 py-2 hover:bg-gray-50 hover:text-purple-600'>Find Architect</button></a>
                    </div>
                  </div>
                </div>
              </nav>
            </div>

            {/* Right - Desktop */}
            <div className='hidden md:flex items-center space-x-4'>
              <button className='text-purple-600 hover:text-purple-700 border border-purple-600 px-4 py-2 rounded-lg'>Sign In</button>
              <button onClick={openSignUpModal} className='bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg'>Sign Up</button>
              <a href='/pages/blog/Contactpage' className='text-gray-600 hover:text-gray-900 ml-4'>Contact</a>
            </div>

            {/* Mobile Menu Button */}
            <div className='md:hidden'>
              <button onClick={toggleMobileMenu} className='text-gray-600 hover:text-gray-900 p-2'>
                <svg className='h-6 w-6' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h16' />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {/* Mobile Menu Modal */} {isMobileMenuOpen && (<div className='fixed inset-0 z-50 md:hidden flex items-center justify-center'>
        {/* Backdrop */}
        <div className='fixed inset-0 bg-black bg-opacity-50' onClick={closeMobileMenu}>
        </div> {/* Modal Content */}
        <div className='bg-white rounded-xl shadow-2xl mx-4 w-full max-w-sm transform transition-all duration-300 ease-in-out scale-100'>
          {/* Modal Header */}
          <div className='flex justify-between items-center p-6 border-b border-gray-100'>
            <div className='text-xl font-bold text-gray-900'>Menu</div>
            <button onClick={closeMobileMenu} className='text-gray-500 hover:text-gray-700 p-1'> <X size={20} /> </button>
          </div> {/* Navigation Links */}
          <nav className='py-4'>
            <div className='space-y-1'>
              <a href="#" onClick={closeMobileMenu} className='block px-6 py-3 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors rounded-lg mx-2'>Home</a>
              <a href="/pages/blog/Jobpage" onClick={closeMobileMenu} className='block px-6 py-3 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors rounded-lg mx-2'>Jobs</a>
              <a href="/pages/blog/Blogpage" onClick={closeMobileMenu} className='block px-6 py-3 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors rounded-lg mx-2'>Blog</a>
              <a href="/pages/blog/Aboutpage" onClick={closeMobileMenu} className='block px-6 py-3 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors rounded-lg mx-2'>About</a>
              <a href="#" onClick={closeMobileMenu} className='block px-6 py-3 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors rounded-lg mx-2'>Explore</a>
            </div> {/* Mobile Auth Buttons */}
            <div className='px-4 pt-4 space-y-3 border-t border-gray-100 mt-4'>
              <button onClick={closeMobileMenu} className='w-full text-purple-600 hover:text-purple-700 px-4 py-2.5 border border-purple-600 rounded-lg transition-colors font-medium text-sm'>Sign In</button>
              <button onClick={() => { closeMobileMenu(); openSignUpModal(); }} className='w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2.5 rounded-lg transition-colors font-medium text-sm'>Sign Up</button>
            </div>
          </nav>
        </div>
      </div>
      )}

      {/* Sign Up Modal */}
      {isSignUpModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[60]'>
          {/* Modal Content */}
          <div className='bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
            {/* Modal Header */}
            <div className='flex items-center justify-between p-6 border-b border-gray-200'>
              <h2 className='text-2xl font-bold text-gray-800'>
                Choose Your Account Type
              </h2>
              <button
                onClick={closeSignUpModal}
                className='text-gray-400 hover:text-gray-600 transition-colors duration-200'
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className='p-6'>
              <p className='text-gray-600 mb-6 text-center'>
                Select the option that best describes you to get started
              </p>

              {/* Cards Grid */}
              <div className='space-y-4'>
                {/* First Row - 3 Cards */}
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                  {userTypes.slice(0, 3).map(userType => {
                    const IconComponent = userType.icon
                    return (
                      <div
                        key={userType.id}
                        onClick={() => handleCardClick(userType)}
                        className='bg-white border-2 border-gray-200 rounded-lg p-6 cursor-pointer hover:border-purple-500 hover:shadow-lg transition-all duration-200 group'
                      >
                        <div className='text-center'>
                          <div
                            className={`${userType.color} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-200`}
                          >
                            <IconComponent className='text-white' size={24} />
                          </div>
                          <h3 className='font-semibold text-gray-800 mb-2'>
                            {userType.title}
                          </h3>
                          <p className='text-sm text-gray-600'>
                            {userType.description}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Second Row - 2 Cards */}
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 '>
                  {userTypes.slice(3, 6).map(userType => {
                    const IconComponent = userType.icon
                    return (
                      <div
                        key={userType.id}
                        onClick={() => handleCardClick(userType)}
                        className='bg-white border-2 border-gray-200 rounded-lg p-6 cursor-pointer hover:border-purple-500 hover:shadow-lg transition-all duration-200 group'
                      >
                        <div className='text-center'>
                          <div
                            className={`${userType.color} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-200`}
                          >
                            <IconComponent className='text-white' size={24} />
                          </div>
                          <h3 className='font-semibold text-gray-800 mb-2'>
                            {userType.title}
                          </h3>
                          <p className='text-sm text-gray-600'>
                            {userType.description}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className='p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl'>
              <p className='text-sm text-gray-500 text-center'>
                Don't worry, you can change this later in your profile settings
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Registration Modal */}
      {isRegistrationModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[70]'>
          {/* Modal Content */}
          <div className='bg-white rounded-xl shadow-2xl max-w-md w-full'>
            {/* Modal Header */}
            <div className='flex items-center justify-between p-6 border-b border-gray-200'>
              <h2 className='text-2xl font-bold text-gray-800'>
                {selectedUserType?.title} Registration
              </h2>
              <button
                onClick={closeRegistrationModal}
                className='text-gray-400 hover:text-gray-600 transition-colors duration-200'
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className='p-6'>
              <form className='space-y-4' onSubmit={handleRegistrationSubmit} >
                {/* Full Name Field */}
                <div>
                  <label
                    htmlFor='fullName'
                    className='block text-sm font-medium text-gray-700 mb-2'
                  >
                    Full Name
                  </label>
                  <input
                    type='text'
                    id='fullName'
                    name='fullName' // <-- add this
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    placeholder='Enter your full name'
                  />
                </div>

                {/* Email Address Field */}
                <div>
                  <label
                    htmlFor='email'
                    className='block text-sm font-medium text-gray-700 mb-2'
                  >
                    Email Address
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email' // <-- add this
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    placeholder='Enter your email address'
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label
                    htmlFor='password'
                    className='block text-sm font-medium text-gray-700 mb-2'
                  >
                    Password
                  </label>
                  <input
                    type='password'
                    id='password'
                    name='password' // <-- add this
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    placeholder='Create a password'
                  />
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label
                    htmlFor='confirmPassword'
                    className='block text-sm font-medium text-gray-700 mb-2'
                  >
                    Confirm Password
                  </label>
                  <input
                    type='password'
                    id='confirmPassword'
                    name='confirmPassword' // <-- add this
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    placeholder='Confirm your password'
                  />
                </div>

                {/* Terms and Conditions */}
                <div className='flex items-start space-x-3 pt-2'>
                  <input
                    type='checkbox'
                    id='terms'
                    name='terms' // <-- add this
                    className='h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-0.5'
                  />
                  <label
                    htmlFor='terms'
                    className='text-sm text-gray-600 leading-relaxed'
                  >
                    I agree to the{' '}
                    <a
                      href='#'
                      className='text-blue-600 hover:text-blue-700 underline'
                    >
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a
                      href='#'
                      className='text-blue-600 hover:text-blue-700 underline'
                    >
                      Privacy Policy
                    </a>
                  </label>
                </div>

                {/* Submit Button */}
                <div className='pt-4'>
                  <button
                    type='submit'

                    className='w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors font-medium text-lg'
                  >
                    Create Account
                  </button>
                </div>

                {/* Sign In Link */}
                <div className='text-center pt-4 border-t border-gray-200'>
                  <p className='text-sm text-gray-600'>
                    Already have an account?{' '}
                    <button
                      type='button'
                      onClick={closeRegistrationModal}
                      className='text-blue-600 hover:text-blue-700 font-medium'
                    >
                      Sign in
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LandHeader;
