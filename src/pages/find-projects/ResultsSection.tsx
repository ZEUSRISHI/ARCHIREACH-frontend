import { useState } from "react";
import {
  Grid,
  List,
  Map,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
} from "lucide-react";
import { ProjectCard, Project } from "./ProjectCard";
import { EmptyState } from "./EmptyState";
import { LoadingState } from "./LoadingState";
import { ProjectDetailsModal } from "./ProjectDetailsModal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";

interface ResultsSectionProps {
  projects: Project[];
  isLoading: boolean;
  onViewDetails?: (project: Project) => void; // optional because modal handles it
  isLoggedIn?: boolean;
}

type ViewMode = "grid" | "list" | "map";
type SortOption = "relevant" | "newest" | "budget" | "deadline" | "matched";

export function ResultsSection({
  projects,
  isLoading,
  onViewDetails,
  isLoggedIn,
}: ResultsSectionProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortBy, setSortBy] = useState<SortOption>("relevant");
  const [currentPage, setCurrentPage] = useState(1);

  const projectsPerPage = 12;

  if (isLoading) return <LoadingState />;
  if (projects.length === 0) return <EmptyState />;

  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const currentProjects = projects.slice(startIndex, endIndex);

  const handleCardClick = (project: Project) => {
    if (onViewDetails) {
      onViewDetails(project);
    }
  };

  return (
    <div className="flex-1 min-w-0 w-full">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8 bg-white border border-[#E4E7F1] rounded-[28px] shadow-sm p-6">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-[#8F9BB3] uppercase tracking-[0.25em]">
            Available projects
          </p>
          <h2 className="text-xl font-semibold text-[#111729]">
            Showing{" "}
            <span className="text-[#7C3AED]">
              {startIndex + 1}-{Math.min(endIndex, projects.length)}
            </span>{" "}
            of {projects.length} briefs
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full lg:w-auto">
          {/* Sorting */}
          <div className="flex w-full sm:w-auto items-center justify-between gap-2 bg-[#F5F7FB] border border-[#E4E7F1] rounded-full px-4 py-2">
            <SlidersHorizontal className="w-4 h-4 text-[#7C3AED]" />
            <Select
              value={sortBy}
              onValueChange={(value) => setSortBy(value as SortOption)}
            >
              <SelectTrigger className="h-8 w-full sm:w-44 rounded-full border-none bg-transparent text-sm text-[#111729] font-semibold">
                <SelectValue placeholder="Most relevant" />
              </SelectTrigger>
              <SelectContent align="end">
                <SelectItem value="relevant">Most relevant</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="budget">Budget high → low</SelectItem>
                <SelectItem value="deadline">Closest deadline</SelectItem>
                <SelectItem value="matched">Best match</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* View Mode */}
          <div className="flex items-center justify-center gap-1 bg-[#F5F7FB] border border-[#E4E7F1] rounded-full p-1">
            {(
              [
                { key: "grid", icon: Grid, label: "Grid" },
                { key: "list", icon: List, label: "List" },
                { key: "map", icon: Map, label: "Map" },
              ] as const
            ).map(({ key, icon: Icon, label }) => (
              <button
                key={key}
                onClick={() => setViewMode(key)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                  viewMode === key
                    ? "bg-white shadow text-[#111729]"
                    : "text-[#64748B] hover:text-[#7C3AED]"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-10 justify-items-center">
          {currentProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onViewDetails={handleCardClick}
              isLoggedIn={isLoggedIn}
            />
          ))}
        </div>
      ) : viewMode === "list" ? (
        <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-10">
          {currentProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onViewDetails={handleCardClick}
              isLoggedIn={isLoggedIn}
            />
          ))}
        </div>
      ) : (
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-16 mb-8 sm:mb-10 border-2 border-dashed border-purple-200 text-center">
          <Map className="w-10 h-10 sm:w-14 sm:h-14 mx-auto mb-3 sm:mb-4 text-purple-400" />
          <p className="text-base sm:text-lg font-bold text-gray-700">
            Interactive map view launching soon.
          </p>
          <p className="text-xs sm:text-sm font-semibold text-gray-500">
            Follow this space to explore briefs geo-tagged across India.
          </p>
        </div>
      )}

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Button
          variant="outline"
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="h-11 px-4 rounded-xl border-purple-200 text-gray-700 font-bold disabled:opacity-50"
        >
          <ChevronLeft className="w-4 h-4 mr-1" /> Previous
        </Button>

        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(
              (page) =>
                page <= 3 ||
                page === totalPages ||
                Math.abs(page - currentPage) <= 1
            )
            .map((page, idx, arr) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                onClick={() => setCurrentPage(page)}
                className={`h-11 w-11 rounded-xl font-bold ${
                  currentPage === page
                    ? "bg-[rgb(122,107,235)] text-white border-none shadow-md hover:opacity-90"
                    : "border-purple-200 text-gray-700 hover:border-purple-400"
                }`}
              >
                {page}
              </Button>
            ))}
          {totalPages > 6 &&
            ![totalPages, totalPages - 1].includes(currentPage) && (
              <span className="px-2 text-sm font-bold text-gray-500">…</span>
            )}
        </div>

        <Button
          variant="outline"
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="h-11 px-4 rounded-xl border-purple-200 text-gray-700 font-bold disabled:opacity-50"
        >
          Next <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>

      <p className="mt-4 text-sm text-gray-500 font-semibold text-center">
        Page {currentPage} of {totalPages}
      </p>
    </div>
  );
}
