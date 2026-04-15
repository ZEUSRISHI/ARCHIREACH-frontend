import { Button } from "../ui/button";
import { Search } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex-1 bg-white rounded-xl p-20 text-center">
      <div className="max-w-[600px] mx-auto">
        {/* Icon */}
        <Search className="w-16 h-16 mx-auto mb-6 text-[#9CA3AF]" />

        {/* Title */}
        <h2 className="text-[#1F2937] mb-3">
          No architects found
        </h2>

        {/* Message */}
        <p className="text-[#4B5563] mb-6">
          We didn't find any architects matching your filters. Try adjusting your 
          search criteria or explore all architects.
        </p>

        {/* Helpful Suggestions */}
        <div className="bg-[#F5F5F5] rounded-lg p-6 mb-6 text-left">
          <h3 className="text-[#1F2937] mb-3" style={{ fontWeight: 700 }}>
            Why no results?
          </h3>
          <ul className="space-y-2 text-[#6B7280]">
            <li>• Location might be too specific - try 'All Locations'</li>
            <li>• Try broadening project type filters</li>
            <li>• Reset filters to see all available architects</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            style={{ backgroundColor: "#7B3FF2" }}
            className="text-white w-full sm:w-[240px] h-11 hover:opacity-90"
          >
            Reset Filters & Browse All
          </Button>
          <Button
            variant="outline"
            style={{ borderColor: "#7B3FF2", color: "#7B3FF2" }}
            className="w-full sm:w-[240px] h-11 hover:bg-[#F3E8FF]"
          >
            Contact Support
          </Button>
        </div>

        {/* Back Link */}
        <a
          href="/"
          className="inline-block mt-6 text-[#7B3FF2] hover:underline"
        >
          ← Back to Home
        </a>
      </div>
    </div>
  );
}
