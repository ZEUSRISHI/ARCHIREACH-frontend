import { Search } from 'lucide-react';
import { Button } from '../ui/button';

interface EmptyStateProps {
  onResetFilters?: () => void;
  onBrowseAll?: () => void;
}

export function EmptyState({ onResetFilters, onBrowseAll }: EmptyStateProps) {
  return (
    <div className="flex-1 bg-white p-20 max-md:p-10 text-center">
      <Search className="w-16 h-16 mx-auto mb-5 text-[#6B7280]" />
      
      <h2 className="text-3xl text-[#1F2937] mb-2">No projects found</h2>
      
      <p className="text-base text-[#4B5563] mb-6 max-w-2xl mx-auto">
        We didn't find any projects matching your filters. Try adjusting your 
        search criteria or explore all projects.
      </p>

      <div className="mb-8">
        <p className="text-sm text-[#1F2937] mb-3">Why no results?</p>
        <ul className="text-sm text-[#6B7280] space-y-2 max-w-md mx-auto">
          <li>• Location might be too specific - try 'All Locations'</li>
          <li>• Try broadening specialization or budget filters</li>
          <li>• Reset filters to see all available projects</li>
        </ul>
      </div>

      <div className="flex gap-4 justify-center max-md:flex-col max-md:items-center">
        <Button
          onClick={onResetFilters}
          className="w-60 h-11 bg-[#7B3FF2] hover:bg-[#6A2FE2] text-white"
        >
          Reset Filters & Browse All
        </Button>
        
        <Button
          onClick={onBrowseAll}
          variant="outline"
          className="w-60 h-11 border-[#7B3FF2] text-[#7B3FF2] hover:bg-[#EDE9FE]"
        >
          Browse Featured Projects
        </Button>
      </div>

      <a href="/" className="text-sm text-[#7B3FF2] hover:underline mt-4 inline-block">
        ← Back to Home
      </a>
    </div>
  );
}
