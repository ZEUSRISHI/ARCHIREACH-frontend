import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { Badge } from "../ui/badge";
import { useState } from "react";

  interface EnhancedSearchBarProps {
  onSearch: (query: string) => void;
  onTagClick: (tag: string) => void;
}

export function EnhancedSearchBar({
  onSearch,
  onTagClick,
}: EnhancedSearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const quickTags = [
    "Residential",
    "Commercial",
    "Experienced",
    "High-Rated",
    "New on Platform"
  ];
  
  const suggestions = [
    "Architects in Mumbai",
    "Residential design specialists",
    "Best rated architects near you"
  ];


   const handleSearch = () => {
    onSearch(searchTerm);
    setShowSuggestions(false);
  };


  return (
     <div className="bg-transparent py-6 px-4 sm:px-6">
  <div className="max-w-4xl mx-auto bg-white border border-[#E4E7F1] rounded-3xl shadow-[0_15px_40px_rgba(15,23,42,0.08)] p-5 sm:p-7">
    
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="flex-1 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[rgb(122,107,235)]" />
        <input
          type="text"
          placeholder="Search by project name, budget, or client…"
          className="w-full h-12 rounded-full border border-transparent bg-[#F5F7FB] pl-12 pr-4 text-sm text-[#111729] focus:outline-none focus:ring-2 focus:ring-[rgb(122,107,235)]"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowSuggestions(e.target.value.length > 0);
          }}
          onFocus={() => setShowSuggestions(searchTerm.length > 0)}
        />
        {showSuggestions && (
          <div className="absolute top-[110%] left-0 right-0 bg-white border border-[#E4E7F1] rounded-2xl shadow-lg z-10 max-h-60 overflow-y-auto">
            {suggestions
              .filter((s) =>
                s.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((suggestion, idx) => (
                <button
                  type="button"
                  key={idx}
                  className="w-full text-left px-4 py-3 text-sm text-[#475467] hover:bg-[#F5F7FB] transition-colors"
                  onClick={() => {
                    setSearchTerm(suggestion);
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
        className="h-12 px-6 rounded-full bg-gradient-to-r from-[rgb(122,107,235)] to-[rgb(122,107,235)]/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
      >
        Search Architects
      </button>
    </div>

    <div className="flex flex-wrap gap-2 mt-4">
      {quickTags.map((tag) => (
        <button
          key={tag}
          onClick={() => onTagClick(tag)}
          className="px-3 py-1.5 rounded-full text-xs font-semibold bg-[#F5F7FB] text-[#475467] border border-[#E4E7F1] hover:border-[rgb(122,107,235)] hover:text-[rgb(122,107,235)] transition-all"
        >
          {tag}
        </button>
      ))}
    </div>
    
  </div>
</div>

  );
}
