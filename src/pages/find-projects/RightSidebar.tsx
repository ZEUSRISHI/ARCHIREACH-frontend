import { TrendingUp, Star, HelpCircle, Bookmark } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

export function RightSidebar() {
  const targetTitles = new Set([
    '3BHK Apartment Extension – Andheri',
    'Commercial Office Space Design',
    'Sustainable Housing Complex',
    'Luxury Villa Design',
    'Heritage Building Restoration',
    'Smart Home Office Design',
  ]);

  const targetBudgets = new Set([
    '₹50L - ₹80L',
    '₹8L - ₹12L',
    '₹2Cr - ₹5Cr',
    '₹30L - ₹50L',
    '₹15L - ₹25L',
    '₹80L - ₹1.2Cr',
  ]);

  const featuredProjects = [
    {
      title: 'Commercial Office Space Design',
      budget: '₹30L - ₹50L',
      location: 'Bangalore'
    },
    {
      title: 'Luxury Villa Architecture',
      budget: '₹80L - ₹1.2Cr',
      location: 'Mumbai'
    },
    {
      title: 'Sustainable Housing Complex',
      budget: '₹2Cr - ₹5Cr',
      location: 'Pune'
    }
  ];

  const recentSearches = [
    'Residential projects in Mumbai',
    'Sustainable design, 10L-20L budget',
    'Commercial architecture, Delhi'
  ];

  return (
    <div className="hidden xl:block w-[300px] flex-shrink-0">
      <div className="flex flex-col gap-4 sticky top-[100px] h-fit">
      {/* Project Statistics */}
      <div className="bg-white p-4 border border-[#E5E7EB] rounded-xl shadow-sm">
        <h3 className="text-sm text-[#1F2937] mb-3 flex items-center gap-2 font-bold">
          <TrendingUp className="w-4 h-4" />
          Project Insights
        </h3>
        <div className="space-y-2 text-xs text-[#4B5563]">
          <div className="flex items-start gap-2">
            <span className="text-[#10B981]">✓</span>
            <span>
              <span className="text-[20px] font-bold text-[#111729]" style={{ fontFamily: "'Public Sans', sans-serif" }}>500+</span>{' '}
              <span>active projects</span>
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#10B981]">✓</span>
            <span>
              <span className="text-[20px] font-bold text-[#111729]" style={{ fontFamily: "'Public Sans', sans-serif" }}>₹50 Cr+</span>{' '}
              <span>total budget</span>
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#10B981]">✓</span>
            <span>
              <span className="text-[20px] font-bold text-[#111729]" style={{ fontFamily: "'Public Sans', sans-serif" }}>50+</span>{' '}
              <span>cities covered</span>
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#10B981]">✓</span>
            <span>Average 12 proposals per project</span>
          </div>
        </div>
      </div>

      {/* Featured Projects */}
      <div className="bg-white p-4 border border-[#E5E7EB] rounded-xl shadow-sm">
        <h3 className="text-sm text-[#1F2937] mb-3 flex items-center gap-2 font-semibold">
          <Star className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
          Featured Projects
        </h3>
        <div className="space-y-3">
          {featuredProjects.map((project, idx) => (
            <div key={idx} className="pb-3 border-b border-[#E5E7EB] last:border-0 last:pb-0">
              <h4
                className={`${targetTitles.has(project.title) ? 'text-[20px] font-semibold' : 'text-xs font-semibold'} text-[#1F2937] mb-1.5 line-clamp-2`}
                style={targetTitles.has(project.title) ? { fontFamily: "'Public Sans', sans-serif" } : undefined}
              >
                {project.title}
              </h4>
              <p
                className={`${targetBudgets.has(project.budget) ? 'text-[20px] font-semibold' : 'text-xs'} text-[#6B7280] mb-1`}
                style={targetBudgets.has(project.budget) ? { fontFamily: "'Public Sans', sans-serif" } : undefined}
              >
                {project.budget}
              </p>
              <p className="text-xs text-[#6B7280] mb-2">{project.location}</p>
              <Badge className="bg-[#F59E0B] text-white text-[10px] px-2 py-0.5 mb-1.5">
                Featured ⭐
              </Badge>
              <a href="#" className="block text-[10px] text-[#7B3FF2] hover:underline font-medium">
                View Project →
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* How to Apply */}
      <div className="bg-[#F3E8FF] p-4 rounded-xl shadow-sm border border-purple-100">
        <h3 className="text-sm text-[#1F2937] mb-3 flex items-center gap-2 font-bold">
          <HelpCircle className="w-4 h-4" />
          How to Apply
        </h3>
        <ol className="space-y-1.5 text-xs text-[#4B5563]">
          <li>1. Browse projects and filter</li>
          <li>2. Click 'View Details' to see full brief</li>
          <li>3. Create profile & get COA verified</li>
          <li>4. Submit your proposal with portfolio</li>
          <li>5. Track application status</li>
        </ol>
      </div>

      {/* Saved Projects */}
      <div className="bg-white p-4 border border-[#E5E7EB] rounded-xl shadow-sm">
        <h3 className="text-sm text-[#1F2937] mb-3 flex items-center gap-2 font-bold">
          <Bookmark className="w-4 h-4" />
          Saved Projects
        </h3>
        <Button className="w-full bg-[#10B981] hover:bg-[#059669] text-white h-9 text-xs font-semibold">
          View Saved
        </Button>
        <p className="text-[10px] text-[#6B7280] mt-1.5 text-center">(12 projects saved)</p>
      </div>

      {/* Recent Searches */}
      <div className="bg-white p-4 border border-[#E5E7EB] rounded-xl shadow-sm">
        <h3 className="text-sm text-[#1F2937] mb-3 font-bold">Recent Searches</h3>
        <div className="space-y-1.5">
          {recentSearches.map((search, idx) => (
            <a
              key={idx}
              href="#"
              className="block text-xs text-[#7B3FF2] hover:underline line-clamp-1"
            >
              {search}
            </a>
          ))}
        </div>
        <button className="text-[10px] text-[#6B7280] hover:underline mt-2">
          Clear history
        </button>
      </div>
      </div>
    </div>
  );
}
