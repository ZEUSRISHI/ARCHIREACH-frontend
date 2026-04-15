import { useState } from "react";
import { Star, Heart, Share2, CheckCircle } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

export interface Project {
  id: string;
  title: string;
  clientName: string;
  clientVerified: boolean;
  clientRating: number;
  budget: string;
  location: string;
  deadline: string;
  projectType: string[];
  description: string;
  proposalCount: number;
  shortlistedCount: number;
  matchPercentage?: number;
  featured?: boolean;
  postedDate: string;
}

interface ProjectCardProps {
  project: Project;
  onViewDetails: (project: Project) => void;
  isLoggedIn?: boolean;
}

const StatTile = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div className="bg-[#F7F8FC] border border-[#E4E7F1] rounded-xl px-3 py-2 flex flex-col">
    <span className="text-[11px] uppercase tracking-[0.3em] text-[#94A3B8] font-semibold">
      {label}
    </span>
    <span className="text-sm font-semibold text-[#111729]">{value}</span>
  </div>
);

const Metric = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div className="text-center border border-[#EDF1FB] rounded-xl py-1.5 flex flex-col items-center justify-center">
    <p className="text-base font-semibold text-[#7C3AED] leading-none">
      {value}
    </p>
    <p className="mt-1 text-[10px] uppercase text-[#94A3B8] font-semibold leading-none whitespace-nowrap tracking-[0.2em]">
      {label}
    </p>
  </div>
);

export function ProjectCard({
  project,
  onViewDetails,
  isLoggedIn = false,
}: ProjectCardProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  // Check if user is logged in
  const userUID = localStorage.getItem("userUID");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const targetTitles = new Set([
    "3BHK Apartment Extension – Andheri",
    "Commercial Office Space Design",
    "Sustainable Housing Complex",
    "Luxury Villa Design",
    "Heritage Building Restoration",
    "Smart Home Office Design",
  ]);

  const targetBudgets = new Set([
    "₹50L - ₹80L",
    "₹8L - ₹12L",
    "₹2Cr - ₹5Cr",
    "₹30L - ₹50L",
    "₹15L - ₹25L",
    "₹80L - ₹1.2Cr",
  ]);

  const isTargetTitle = targetTitles.has(project.title);
  const isTargetBudget = targetBudgets.has(project.budget);

  return (
    <div
      className={`bg-white border border-[#E4E7F1] rounded-[28px] ${isExpanded ? "p-4 min-h-[320px]" : "p-3 min-h-[230px]"} shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col w-full max-w-[520px] mx-auto`}
    >
      <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div className="space-y-1 min-w-0">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#94A3B8] font-semibold">
            {project.postedDate}
          </p>
          <h3
            className={`${isTargetTitle ? "text-[20px] font-semibold" : "text-lg font-semibold"} text-[#111729] leading-tight hover:text-[#7C3AED] cursor-pointer`}
            style={
              isTargetTitle
                ? { fontFamily: "'Public Sans', sans-serif" }
                : undefined
            }
            onClick={() => onViewDetails(project)}
          >
            {project.title}
          </h3>
          <div className="text-sm text-[#475467] flex flex-wrap items-center gap-2">
            <span className="font-semibold">{project.clientName}</span>
            {project.clientVerified && (
              <span className="inline-flex items-center gap-1 text-[#10B981] text-xs font-semibold">
                <CheckCircle className="w-3.5 h-3.5" /> Verified
              </span>
            )}
            <span className="inline-flex items-center gap-1 text-[#F59E0B]">
              <Star className="w-4 h-4 fill-[#F59E0B]" />
              {project.clientRating}
            </span>
          </div>
        </div>
        <div className="w-full text-left sm:w-auto sm:text-right">
          <p className="text-xs text-[#94A3B8] uppercase tracking-[0.3em] font-semibold">
            Budget
          </p>
          <p
            className={`${isTargetBudget ? "text-[20px] font-semibold" : "text-xl font-semibold"} text-[#111729]`}
            style={
              isTargetBudget
                ? { fontFamily: "'Public Sans', sans-serif" }
                : undefined
            }
          >
            {project.budget}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        {project.projectType.slice(0, 3).map((type) => (
          <span
            key={type}
            className="px-3 py-1 rounded-full text-xs font-semibold bg-[#F5F7FB] text-[#475467] border border-[#E4E7F1]"
          >
            {type}
          </span>
        ))}
        {project.projectType.length > 3 && (
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#EFE9FF] text-[#6D28D9] border border-[#D1C4F6]">
            +{project.projectType.length - 3} more
          </span>
        )}
      </div>

      <p
        className={`text-sm text-[#475467] leading-relaxed mb-3 ${isExpanded ? "line-clamp-3" : "line-clamp-1"}`}
      >
        {project.description}
      </p>

      <button
        type="button"
        onClick={() => setIsExpanded((v) => !v)}
        className="-mt-1 mb-3 text-xs font-semibold text-[#7C3AED] hover:opacity-90 self-start"
      >
        {isExpanded ? "Show less" : "Show more"}
      </button>

      {!isExpanded && (
        <div className="flex flex-wrap items-center gap-2 mb-1 text-xs text-[#475467]">
          <span className="inline-flex items-center rounded-full border border-[#E4E7F1] bg-[#F7F8FC] px-3 py-1 font-semibold">
            {project.location}
          </span>
          <span className="inline-flex items-center rounded-full border border-[#E4E7F1] bg-[#F7F8FC] px-3 py-1 font-semibold">
            {project.deadline}
          </span>
        </div>
      )}

      {isExpanded && (
        <>
          <div className="grid grid-cols-2 gap-2.5 mb-3">
            <StatTile label="LOCATION" value={project.location} />
            <StatTile label="DEADLINE" value={project.deadline} />
            <StatTile label="PROJECT TYPE" value={project.projectType[0]} />
            <StatTile
              label="MATCH"
              value={`${project.matchPercentage ?? 85}%`}
            />
          </div>

          <div className="grid grid-cols-4 gap-2.5 mb-3">
            <Metric label="Proposals" value={project.proposalCount} />
            <Metric label="Shortlisted" value={project.shortlistedCount} />
            <Metric label="Rating" value={project.clientRating} />
            <Metric label="Status" value={isLoggedIn ? "Live" : "Login"} />
          </div>

          {isLoggedIn && project.matchPercentage && (
            <div className="flex items-center gap-2 bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl px-3 py-2 mb-3 text-xs font-semibold text-[#047857]">
              <CheckCircle className="w-4 h-4" />
              {project.matchPercentage}% match based on your profile
            </div>
          )}
        </>
      )}

      <div className="mt-auto flex flex-wrap gap-3 pt-4 border-t border-[#EEF1FB] sm:flex-nowrap">
        <Button
          onClick={() => {
            onViewDetails(project);
            if (!userUID || !token) {
              navigate("/signin");
              return;
            }
          }}
          className="h-10 min-w-[140px] flex-1 rounded-full bg-[rgb(122,107,235)] text-white font-semibold shadow hover:shadow-lg hover:opacity-90"
        >
          View Details
        </Button>
        <button
          aria-label="Save project"
          title="Save project"
          onClick={() => setIsSaved(!isSaved)}
          className={`h-10 w-10 rounded-full border transition-all ${
            isSaved
              ? "border-[#A855F7] bg-[#F4EDFF] text-[#7C3AED]"
              : "border-[#E4E7F1] text-[#94A3B8] hover:border-[#A855F7]"
          }`}
        >
          <Heart
            className={`w-4 h-4 mx-auto ${isSaved ? "fill-current" : ""}`}
          />
        </button>
        <button
          aria-label="Share project"
          title="Share project"
          className="h-10 w-10 rounded-full border border-[#E4E7F1] text-[#94A3B8] hover:text-[#7C3AED]"
        >
          <Share2 className="w-4 h-4 mx-auto" />
        </button>
      </div>
    </div>
  );
}
