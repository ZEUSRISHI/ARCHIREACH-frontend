import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { X } from "lucide-react";

const SharedNavbar = ({ onLoginClick, onSignUpClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleLogin = () => {
    closeMobileMenu();
    if (onLoginClick) {
      onLoginClick();
      return;
    }

    navigate("/signin");
  };

  const handleSignUp = () => {
    closeMobileMenu();
    if (onSignUpClick) {
      onSignUpClick();
      return;
    }

    navigate("/signup");
  };

  return (
    <>
      <header className="bg-white max-w-6xl shadow-md mx-auto border border-gray-100 rounded-4xl z-50 sticky top-0">
        <div className="rounded-4xl overflow-visible">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-1 sm:py-2">

              {/* Left side - Logo + Nav */}
              <div className="flex items-center space-x-4 sm:space-x-8 lg:space-x-12">
                <Link
                  to="/"
                  className="text-2xl font-extrabold text-gray-900 hover:text-[rgb(122,107,235)] transition-colors"
                >
                  ARCHIREACH
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
                  <Link to="/" className="font-bold text-gray-700 hover:text-[rgb(122,107,235)]">Home</Link>
                  <Link to="/pages/ExploreDrop/FindArch" className="font-bold text-gray-700 hover:text-[rgb(122,107,235)]">Find Architects</Link>
                  <Link to="/pages/ExploreDrop/FindProjects" className="font-bold text-gray-700 hover:text-[rgb(122,107,235)]">Find Projects</Link>
                  <Link
                    to="/pricing"
                    className={`font-bold text-gray-700 hover:text-[rgb(122,107,235)]`}
                  >
                    Pricing
                  </Link>
                  <Link to="/blog" className="font-bold text-gray-700 hover:text-[rgb(122,107,235)]">Blog</Link>
                  <Link to="/about" className="font-bold text-gray-700 hover:text-[rgb(122,107,235)]">About</Link>
                </nav>
              </div>

              {/* Right side - Auth + Contact */}
              <div className="hidden md:flex items-center space-x-4">
                <button
                  onClick={handleLogin}
                  className="border-2 border-[rgb(122,107,235)] text-[rgb(122,107,235)]
                       px-5 py-2.5 rounded-3xl font-bold text-sm
                       hover:bg-[rgb(122,107,235)/10]"
                >
                  Sign In
                </button>

                <button
                  onClick={handleSignUp}
                  className="bg-[rgb(122,107,235)] text-white px-5 py-2.5 rounded-3xl font-bold text-sm shadow-md"
                >
                  Sign Up
                </button>

                <Link to="/contact" className="font-bold text-gray-700 hover:text-[rgb(122,107,235)] ml-4">
                  Contact
                </Link>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button onClick={toggleMobileMenu} className="p-2 text-gray-600">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>

            </div>
          </div>
        </div>
      </header>


      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={closeMobileMenu}
          ></div>

          <div className="bg-white rounded-xl shadow-2xl mx-4 w-full max-w-sm transform transition-all duration-300 ease-in-out scale-100 relative z-50">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <Link
                to="/"
                onClick={closeMobileMenu}
                className="text-2xl font-extrabold text-gray-900 hover:text-[#7a6beb] transition-colors"
              >
                ARCHIREACH
              </Link>
              <button
                onClick={closeMobileMenu}
                className="text-gray-500 hover:text-gray-700 p-1"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="py-4 max-h-[70vh] overflow-y-auto">
              <div className="space-y-1">
                <Link
                  to="/"
                  onClick={closeMobileMenu}
                  className="block px-6 py-3.5 text-base font-bold text-gray-700 hover:text-[#7a6beb] hover:bg-[#7a6beb]/10 transition-colors rounded-lg mx-2"
                >
                  Home
                </Link>
                <Link
                  to="/pages/ExploreDrop/FindArch"
                  onClick={closeMobileMenu}
                  className="block px-6 py-3.5 text-base font-bold text-gray-700 hover:text-[#7a6beb] hover:bg-[#7a6beb]/10 transition-colors rounded-lg mx-2"
                >
                  Find Architects
                </Link>
                <Link
                  to="/pages/ExploreDrop/FindProjects"
                  onClick={closeMobileMenu}
                  className="block px-6 py-3.5 text-base font-bold text-gray-700 hover:text-[#7a6beb] hover:bg-[#7a6beb]/10 transition-colors rounded-lg mx-2"
                >
                  Find Projects
                </Link>
                <Link
                  to="/blog"
                  onClick={closeMobileMenu}
                  className="block px-6 py-3.5 text-base font-bold text-gray-700 hover:text-[#7a6beb] hover:bg-[#7a6beb]/10 transition-colors rounded-lg mx-2"
                >
                  Blog
                </Link>
                <Link
                  to="/about"
                  onClick={closeMobileMenu}
                  className="block px-6 py-3.5 text-base font-bold text-gray-700 hover:text-[#7a6beb] hover:bg-[#7a6beb]/10 transition-colors rounded-lg mx-2"
                >
                  About
                </Link>
                <Link
                  to="/pricing"
                  onClick={closeMobileMenu}
                  className={`block px-6 py-3.5 text-base font-bold transition-colors rounded-lg mx-2 ${location.pathname === '/pricing'
                      ? 'text-[#7a6beb] bg-[#7a6beb]/10'
                      : 'text-gray-700 hover:text-[#7a6beb] hover:bg-[#7a6beb]/10'
                    }`}
                >
                  Pricing
                </Link>
                <Link
                  to="/contact"
                  onClick={closeMobileMenu}
                  className="block px-6 py-3.5 text-base font-bold text-gray-700 hover:text-[#7a6beb] hover:bg-[#7a6beb]/10 transition-colors rounded-lg mx-2"
                >
                  Contact
                </Link>
              </div>

              <div className="px-4 pt-4 space-y-3 border-t border-gray-200 mt-4">
                <button
                  onClick={handleLogin}
                  className="w-full text-[#7a6beb] hover:text-[#6b5dd8] px-4 py-3 border-2 border-[#7a6beb] rounded-lg transition-colors font-bold text-sm hover:bg-[#7a6beb]/10"
                >
                  Sign In
                </button>
                <button
                  onClick={handleSignUp}
                  className="w-full bg-[#7a6beb] hover:bg-[#6b5dd8] text-white px-4 py-3 rounded-lg transition-colors font-bold text-sm shadow-md"
                >
                  Sign Up
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default SharedNavbar;

