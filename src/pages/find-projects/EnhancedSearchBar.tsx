import { useState } from "react";
import { Search } from "lucide-react";

const quickTags = [
  "Residential",
  "Commercial",
  "Sustainable",
  "Urgent",
  "High Budget",
  "New",
];

const suggestions = [
  "Smart home office design",
  "Residential apartment complex",
  "Commercial interior renovation",
  "Recent projects in your area",
  "High-budget residential projects",
  "Sustainable design projects",
];

interface EnhancedSearchBarProps {
  onSearch: (query: string) => void;
  onTagClick: (tag: string) => void;
}

export function EnhancedSearchBar({
  onSearch,
  onTagClick,
}: EnhancedSearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const themeColor = "rgb(122,107,235)";

  const handleSearch = () => {
    onSearch(searchQuery);
    setShowSuggestions(false);
  };

  return (
    <div className="bg-transparent py-6 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto bg-white border border-[#E4E7F1] rounded-3xl shadow-[0_15px_40px_rgba(15,23,42,0.08)] p-5 sm:p-7">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: themeColor }} />
            <input
              type="text"
              placeholder="Search by project name, budget, or client…"
              className="w-full h-12 rounded-full border border-transparent bg-[#F5F7FB] pl-12 pr-4 text-sm text-[#111729] focus:outline-none"
              style={{ boxShadow: `0 0 0 2px ${themeColor}33` }}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(e.target.value.length > 0);
              }}
              onFocus={() => setShowSuggestions(searchQuery.length > 0)}
            />
            {showSuggestions && (
              <div className="absolute top-[110%] left-0 right-0 bg-white border border-[#E4E7F1] rounded-2xl shadow-lg z-10 max-h-60 overflow-y-auto">
                {suggestions
                  .filter((s) =>
                    s.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((suggestion, idx) => (
                    <button
                      type="button"
                      key={idx}
                      className="w-full text-left px-4 py-3 text-sm text-[#475467] hover:bg-[#F5F7FB]"
                      onClick={() => {
                        setSearchQuery(suggestion);
                        setShowSuggestions(false);
                      }}
                    >
                      {suggestion}
                    </button>
                  ))}
              </div>
            )}
          </div>
          <button
            onClick={handleSearch}
            className="h-12 px-6 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition-all"
            style={{ background: `linear-gradient(to right, ${themeColor}, ${themeColor})` }}
          >
            Search Projects
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {quickTags.map((tag) => (
            <button
              key={tag}
              onClick={() => onTagClick(tag)}
              className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all"
              style={{
                backgroundColor: "#F5F7FB",
                color: "#475467",
                borderColor: "#E4E7F1",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = themeColor;
                e.currentTarget.style.borderColor = themeColor;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#475467";
                e.currentTarget.style.borderColor = "#E4E7F1";
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
