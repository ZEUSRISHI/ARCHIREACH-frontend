import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Building2, Home, Globe, Star, CheckCircle, TrendingUp } from "lucide-react";

export function RightSidebar() {
  const featuredArchitects = [
    { name: "Ar. Ramesh Kumar", rating: 5.0, badge: "Featured ⭐" },
    { name: "Ar. Sneha Patel", rating: 4.9, badge: "Featured ⭐" },
    { name: "Ar. Arun Nair", rating: 4.8, badge: "Featured ⭐" },
  ];

  const recentSearches = [
    "Residential architects in Mumbai",
    "Commercial architects, Bangalore",
    "Sustainable design specialists",
  ];

  return (
    <aside className="hidden xl:block w-[280px] space-y-4 lg:space-y-6 sticky top-[70px] h-fit">
      {/* Search Statistics */}
      <div className="bg-[#F5F5F5] rounded-lg p-5 border border-[#E5E7EB]">
        <h3 className="text-[#1F2937] mb-4" style={{ fontWeight: 700 }}>
          Search Insights
        </h3>
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <Building2 className="w-4 h-4 text-[#10B981] mt-0.5" />
            <span className="text-[#4B5563]">500+ verified architects available</span>
          </div>
          <div className="flex items-start gap-2">
            <Home className="w-4 h-4 text-[#10B981] mt-0.5" />
            <span className="text-[#4B5563]">1,000+ completed projects</span>
          </div>
          <div className="flex items-start gap-2">
            <Globe className="w-4 h-4 text-[#10B981] mt-0.5" />
            <span className="text-[#4B5563]">50+ cities covered</span>
          </div>
          <div className="flex items-start gap-2">
            <Star className="w-4 h-4 text-[#10B981] mt-0.5" />
            <span className="text-[#4B5563]">4.8★ average rating</span>
          </div>
        </div>
      </div>

      {/* Featured Architects */}
      <div className="bg-white rounded-lg p-5 border border-[#E5E7EB]">
        <h3 className="text-[#1F2937] mb-4" style={{ fontWeight: 700 }}>
          Featured This Week
        </h3>
        <div className="space-y-4">
          {featuredArchitects.map((architect, index) => (
            <div key={index} className="flex items-center gap-3">
              <Avatar className="w-12 h-12 bg-[#F5F5F5]">
                <AvatarFallback className="text-[#7B3FF2]">
                  {architect.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="text-[#1F2937]" style={{ fontWeight: 700 }}>
                  {architect.name}
                </div>
                <div className="flex items-center gap-1 text-[#F59E0B]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3" fill="currentColor" />
                  ))}
                  <span className="text-[#4B5563] ml-1">{architect.rating}</span>
                </div>
                <Badge className="bg-[#FEF3C7] text-[#92400E] text-xs mt-1">
                  {architect.badge}
                </Badge>
              </div>
            </div>
          ))}
        </div>
        <Button
          variant="link"
          className="w-full mt-4 text-[#7B3FF2]"
        >
          View All Featured →
        </Button>
      </div>

      {/* How to Choose */}
      <div className="bg-[#F3E8FF] rounded-lg p-5">
        <h3 className="text-[#1F2937] mb-4" style={{ fontWeight: 700 }}>
          How to Choose
        </h3>
        <div className="space-y-2 text-[#4B5563]">
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-[#10B981] mt-0.5" />
            <span>Check COA verification</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-[#10B981] mt-0.5" />
            <span>Read client reviews</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-[#10B981] mt-0.5" />
            <span>Compare experience</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-[#10B981] mt-0.5" />
            <span>Message before committing</span>
          </div>
        </div>
      </div>

      {/* Comparison Tool */}
      <div className="bg-white rounded-lg p-5 border border-[#E5E7EB]">
        <h3 className="text-[#1F2937] mb-4" style={{ fontWeight: 700 }}>
          Compare Architects
        </h3>
        <Button
          style={{ backgroundColor: "#10B981" }}
          className="w-full text-white h-10 hover:opacity-90"
        >
          <TrendingUp className="w-4 h-4 mr-2" />
          Start Comparison
        </Button>
        <p className="text-[#6B7280] text-center mt-2">
          (Add architects to compare)
        </p>
      </div>

      {/* Recent Searches */}
      <div className="bg-white rounded-lg p-5 border border-[#E5E7EB]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[#1F2937]" style={{ fontWeight: 700 }}>
            Recent Searches
          </h3>
        </div>
        <div className="space-y-2">
          {recentSearches.map((search, index) => (
            <a
              key={index}
              href="#"
              className="block text-[#7B3FF2] hover:underline"
            >
              {search}
            </a>
          ))}
        </div>
        <button className="text-[#6B7280] text-xs mt-3 hover:underline">
          Clear history
        </button>
      </div>
    </aside>
  );
}
