import { ChevronRight } from "lucide-react";

export function Breadcrumb() {
  return (
    <div className="px-4 sm:px-6 lg:px-12 py-3 sm:py-4 lg:py-5 border-b border-[#E5E7EB]">
      <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-[#6B7280]">
        <a href="/" className="hover:text-[#7B3FF2] transition-colors">
          Home
        </a>
        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
        <span className="text-[#1F2937]">Find Architects</span>
      </div>
    </div>
  );
}
