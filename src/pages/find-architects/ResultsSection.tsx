import { ArchitectCard } from "./ArchitectCard";
import { EmptyState } from "./EmptyState";
import { LoadingState } from "./LoadingState";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Grid3x3,
  List,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
} from "lucide-react";
import { useState } from "react";

interface ResultsSectionProps {
  filters: any;
  firmPosts?: any[];
  isLoadingFirmPosts?: boolean;
  isSignedUp?: boolean;
  onOpenSignUp?: () => void;
}

type ViewMode = "grid" | "list" | "map";
type SortOption = "relevant" | "newest" | "budget" | "deadline" | "matched";

export function ResultsSection({
  filters,
  firmPosts = [],
  isLoadingFirmPosts = false,
  isSignedUp = false,
  onOpenSignUp,
}: ResultsSectionProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Transform firm posts to architect format
  const firmPostsAsArchitects = firmPosts.map((post, index) => ({
    id: post._id || `firm-${index}`,
    name: post.name || "Architect",
    firm: post.firmName || "Architecture Firm",
    rating: post.rating || 4.5,
    reviews: post.reviews || 0,
    experience: post.yearsExperience || 0,
    location: post.location || "Location not specified",
    projects: post.projects || 0,
    specializations: post.specializations || post.projectTypes || [],
    bio:
      post.description || "Professional architect with extensive experience.",
    coaVerified: true,
    isFirmPost: true,
    originalData: post,
  }));

  const architects = [...firmPostsAsArchitects];
  const totalResults = architects.length;
  const itemsPerPage = 12;
  const totalPages = Math.ceil(totalResults / itemsPerPage);

  if (isLoading || isLoadingFirmPosts) return <LoadingState />;
  if (totalResults === 0) return <EmptyState />;

  // Pagination calculation
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedArchitects = architects.slice(startIndex, endIndex);

  return (
    <section className="flex-1 min-w-0 w-full">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8 bg-white border border-[rgb(235,232,255)] rounded-[28px] shadow-sm p-6">
        <div className="space-y-1">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[rgb(122,107,235)]">
            Elite Architect Network
          </p>
          <h2
            className="text-[20px] font-semibold text-gray-900"
            style={{ fontFamily: "'Public Sans', sans-serif" }}
          >
            {totalResults} architects shortlisted for your filters
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full lg:w-auto">
          {/* Sort */}
          <div className="flex w-full sm:w-auto items-center justify-between gap-2 bg-[rgb(245,243,252)] border border-[rgb(235,232,255)] rounded-full px-4 py-2">
            <SlidersHorizontal className="w-4 h-4 text-[rgb(122,107,235)]" />
            <Select defaultValue="relevant">
              <SelectTrigger className="h-8 w-full sm:w-44 rounded-full border-none bg-transparent text-sm text-[#111729] font-semibold">
                <SelectValue placeholder="Most relevant" />
              </SelectTrigger>
              <SelectContent align="end">
                <SelectItem value="relevant">Most Relevant</SelectItem>
                <SelectItem value="highest-rated">Highest Rated</SelectItem>
                <SelectItem value="recent">Recently Active</SelectItem>
                <SelectItem value="experience">
                  Experience (High to Low)
                </SelectItem>
                <SelectItem value="newest">Newest on Platform</SelectItem>
                <SelectItem value="projects">
                  Most Projects Completed
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* View Mode */}
          <div className="flex items-center justify-center gap-1 bg-[rgb(245,243,252)] border border-[rgb(235,232,255)] rounded-full p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                viewMode === "grid"
                  ? "bg-white shadow text-[#111729]"
                  : "text-[#64748B] hover:text-[rgb(122,107,235)]"
              }`}
            >
              <Grid3x3 className="w-4 h-4" />
              <span className="hidden sm:inline">Grid</span>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                viewMode === "list"
                  ? "bg-white shadow text-[#111729]"
                  : "text-[#64748B] hover:text-[rgb(122,107,235)]"
              }`}
            >
              <List className="w-4 h-4" />
              <span className="hidden sm:inline">List</span>
            </button>
          </div>
        </div>
      </div>

      {/* Results Grid/List */}
      <div
        className={`grid gap-4 sm:gap-5 lg:gap-6 mb-8 sm:mb-10 ${
          viewMode === "grid" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
        }`}
      >
        {paginatedArchitects.map((a) => (
          <ArchitectCard
            key={a.id}
            architect={a}
            isSignedUp={isSignedUp}
            onOpenSignUp={onOpenSignUp}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="h-10 px-4 rounded-xl border-[rgb(122,107,235)] text-[rgb(122,107,235)] font-bold disabled:opacity-50"
        >
          <ChevronLeft className="w-4 h-4 mr-1" /> Previous
        </Button>

        <div className="flex flex-wrap items-center justify-center gap-1">
          {[...Array(totalPages)]
            .map((_, i) => i + 1)
            .filter(
              (page) =>
                page <= 3 ||
                page === totalPages ||
                Math.abs(page - currentPage) <= 1
            )
            .map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className={`h-10 w-10 rounded-xl text-sm font-bold ${
                  currentPage === page
                    ? "bg-[rgb(122,107,235)] text-white border-none shadow-md"
                    : "border-[rgb(122,107,235)] text-[rgb(122,107,235)] hover:border-[rgb(102,91,215)] hover:text-[rgb(102,91,215)]"
                }`}
              >
                {page}
              </Button>
            ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="h-10 px-4 rounded-xl border-[rgb(122,107,235)] text-[rgb(122,107,235)] font-bold disabled:opacity-50"
        >
          Next <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>

      <p className="mt-4 text-sm text-gray-500 font-semibold text-center">
        Page {currentPage} of {totalPages}
      </p>
    </section>
  );
}
