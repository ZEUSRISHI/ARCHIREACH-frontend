import { Menu, LogOut } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface User {
  fullName?: string;
  userType?: string;
}

export function DashboardHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth() as { user: User | null };
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userUID");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <header className="z-50 px-4 pt-4 sm:px-6 lg:px-0">
      <div className="max-w-7xl mx-auto bg-white shadow-md border border-gray-100 rounded-[28px] sm:rounded-[32px] px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[64px] items-center justify-between gap-3">
          {/* Left: Logo */}
          <Link to="/" className='text-lg sm:text-2xl font-extrabold text-gray-900 hover:text-purple-600 transition-colors'>
            ARCHIREACH
          </Link>

          {/* Navigation Links - Desktop only */}
          <nav className='hidden lg:flex items-center space-x-5 xl:space-x-7'>
            <Link
              to="/"
              className='text-gray-700 hover:text-purple-600 transition-colors font-bold text-sm'
            >
              Home
            </Link>
            <Link
              to="/pages/ExploreDrop/FindArch"
              className='text-gray-700 hover:text-purple-600 transition-colors font-bold text-sm'
            >
              Find Architects
            </Link>
            <Link
              to="/pages/ExploreDrop/FindProjects"
              className='text-gray-700 hover:text-purple-600 transition-colors font-bold text-sm'
            >
              Find Projects
            </Link>
            <Link
              to="/pricing"
              className='text-gray-700 hover:text-purple-600 transition-colors font-bold text-sm'
            >
              Pricing
            </Link>
            <Link
              to="/blog"
              className='text-gray-700 hover:text-purple-600 transition-colors font-bold text-sm'
            >
              Blog
            </Link>
            <Link
              to="/about"
              className='text-gray-700 hover:text-purple-600 transition-colors font-bold text-sm'
            >
              About
            </Link>
            <Link
              to="/contact"
              className='text-gray-700 hover:text-purple-600 transition-colors font-bold text-sm'
            >
              Contact
            </Link>
          </nav>

          {/* Right: Profile and Logout */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div
                onClick={() => {
                  if (user?.userType === "firm") {
                    navigate("/pages/blog/FirmDash");
                  } else if (user?.userType === "client") {
                    navigate("/pages/blog/ClientDash");
                  }
                }}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-purple-300 bg-purple-100 
             flex items-center justify-center text-purple-600 font-bold 
             cursor-pointer"
              >
                {user?.fullName?.[0]?.toUpperCase() || "C"}
              </div>
              <div className="hidden md:block min-w-0">
                <p className="text-xs text-gray-600">{user?.userType}</p>
                <p className="truncate text-sm font-semibold text-gray-900 max-w-[140px]">{user?.fullName || "client 1"}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-3 sm:px-4 py-2 border-2 border-red-500 text-red-600 rounded-3xl hover:bg-red-50 transition-colors text-sm font-bold flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-6 h-6 text-[#1F2937]" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[#E5E7EB]">
            <div className="flex flex-col gap-3">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 hover:bg-gray-50 rounded">Home</Link>
              <Link to="/pages/ExploreDrop/FindArch" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 hover:bg-gray-50 rounded">Find Architects</Link>
              <Link to="/pages/ExploreDrop/FindProjects" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 hover:bg-gray-50 rounded">Find Projects</Link>
              <Link to="/pricing" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 hover:bg-gray-50 rounded">Pricing</Link>
              <Link to="/blog" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 hover:bg-gray-50 rounded">Blog</Link>
              <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 hover:bg-gray-50 rounded">About</Link>
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 hover:bg-gray-50 rounded">Contact</Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
