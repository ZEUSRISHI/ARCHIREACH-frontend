import { Button } from "../ui/button";
import { Building2, Menu, X } from "lucide-react";
import { useState } from "react";

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="max-w-[1920px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-[70px]">
          {/* Logo */}
          <button onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'home' }))} className="flex items-center gap-2">
            <Building2 className="w-8 h-8" style={{ color: "#7B3FF2" }} />
            <span className="text-[#1F2937]" style={{ fontWeight: 700 }}>Archireach</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <button onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'find-architects' }))} className="text-[#1F2937] hover:text-[#7B3FF2] transition-colors">
              Find Architects
            </button>
            <button onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'find-projects' }))} className="text-[#1F2937] hover:text-[#7B3FF2] transition-colors">
              Find Projects
            </button>
            <a href="#for-firms" className="text-[#1F2937] hover:text-[#7B3FF2] transition-colors">
              For Firms
            </a>
            <button onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'blog' }))} className="text-[#1F2937] hover:text-[#7B3FF2] transition-colors">
              Blog
            </button>
            <button onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'about' }))} className="text-[#1F2937] hover:text-[#7B3FF2] transition-colors">
              About
            </button>
            <button onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'contact' }))} className="text-[#1F2937] hover:text-[#7B3FF2] transition-colors">
              Contact
            </button>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Button variant="ghost" className="text-[#1F2937] hover:text-[#7B3FF2]">
              Sign In
            </Button>
            <Button 
              onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'post-brief' }))}
              style={{ backgroundColor: "#10B981" }} 
              className="text-white hover:opacity-90 transition-opacity"
            >
              Post Project
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-[#1F2937]" />
            ) : (
              <Menu className="w-6 h-6 text-[#1F2937]" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[#E5E7EB]">
            <div className="flex flex-col gap-4">
              <button onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'find-architects' }))} className="text-[#1F2937] hover:text-[#7B3FF2] py-2 text-left">
                Find Architects
              </button>
              <button onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'find-projects' }))} className="text-[#1F2937] hover:text-[#7B3FF2] py-2 text-left">
                Find Projects
              </button>
              <a href="#for-firms" className="text-[#1F2937] hover:text-[#7B3FF2] py-2">
                For Firms
              </a>
              <button onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'blog' }))} className="text-[#1F2937] hover:text-[#7B3FF2] py-2 text-left">
                Blog
              </button>
              <button onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'about' }))} className="text-[#1F2937] hover:text-[#7B3FF2] py-2 text-left">
                About
              </button>
              <button onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'contact' }))} className="text-[#1F2937] hover:text-[#7B3FF2] py-2 text-left">
                Contact
              </button>
              <div className="flex flex-col gap-2 pt-2">
                <Button variant="ghost" className="text-[#1F2937]">
                  Sign In
                </Button>
                <Button 
                  onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'post-brief' }))}
                  style={{ backgroundColor: "#10B981" }} 
                  className="text-white"
                >
                  Post Project
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
