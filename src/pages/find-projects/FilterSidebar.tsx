import { useState, type ReactNode } from "react";
import { Filter } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { ScrollArea } from "../ui/scroll-area";
import { Slider } from "../ui/slider";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Badge } from "../ui/badge";

export interface ProjectFilters {
  locations: string[];
  projectTypes: string[];
  budgetRange: [number, number];
  deadline: string;
  specializations: string[];
  verifiedOnly: boolean;
  applicationStatus: string[];
}

interface FilterSidebarProps {
  filters: ProjectFilters;
  onFilterChange: (filters: ProjectFilters) => void;
}

const locationOptions = ["Mumbai", "Bangalore", "Delhi", "Hyderabad", "Chennai", "Pune", "Kochi", "Kolkata"];
const projectTypeOptions = [
  "Residential",
  "Commercial",
  "Institutional",
  "Industrial",
  "Mixed-Use",
  "Interior",
  "Landscape",
  "Restoration",
];
const specializationOptions = [
  "Sustainable Design",
  "Smart Homes",
  "Heritage",
  "Luxury",
  "Affordable Housing",
  "Hospitality",
  "Urban Planning",
];
const deadlineOptions = [
  { value: "urgent", label: "Urgent (7 days)" },
  { value: "14days", label: "Within 2 weeks" },
  { value: "1-3months", label: "1-3 months" },
  { value: "3-6months", label: "3-6 months" },
  { value: "flexible", label: "Flexible timeline" },
];
const statusOptions = ["Applied", "Shortlisted", "Awaiting Response", "Declined"];
const budgetPresets: { label: string; range: [number, number] }[] = [
  { label: "₹0-₹5L", range: [0, 5] },
  { label: "₹5L-₹20L", range: [5, 20] },
  { label: "₹20L-₹50L", range: [20, 50] },
  { label: "₹50L+", range: [50, 100] },
];

const ChipButton = ({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: ReactNode;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
      active
        ? "bg-[#E0EAFF] text-[#4C1D95] border-[#C7D2FE]"
        : "bg-[#F5F7FB] text-[#475467] border-transparent hover:border-[#D4D9F5]"
    }`}
  >
    {children}
  </button>
);

export function FilterSidebar({ filters, onFilterChange }: FilterSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const updateFilter = <K extends keyof ProjectFilters>(key: K, value: ProjectFilters[K]) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const toggleArrayFilter = (
    key: keyof Pick<ProjectFilters, "locations" | "projectTypes" | "specializations" | "applicationStatus">,
    value: string
  ) => {
    const current = filters[key];
    const updated = current.includes(value) ? current.filter((item) => item !== value) : [...current, value];
    updateFilter(key, updated);
  };

  const clearFilters = () => {
    onFilterChange({
      locations: [],
      projectTypes: [],
      budgetRange: [0, 100],
      deadline: "",
      specializations: [],
      verifiedOnly: true,
      applicationStatus: [],
    });
  };

 const themeColor = 'rgb(122,107,235)'; // theme color

const FilterContent = () => (
  <ScrollArea className="h-full pr-1">
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold text-[#8F9BB3] uppercase tracking-[0.25em]">Filters</p>
          <h3
            className="text-[24px] font-semibold text-[#111729]"
            style={{ fontFamily: "'Public Sans', sans-serif" }}
          >
            Refine results
          </h3>
        </div>
        <button onClick={clearFilters} className="text-sm font-semibold" style={{ color: themeColor }} >
          Clear
        </button>
      </div>

      {/* Location */}
      <section className="space-y-3">
        <p className="text-[12px] font-semibold text-[#8F9BB3] uppercase tracking-[0.2em]">Location</p>
        <div className="flex flex-wrap gap-2">
          {locationOptions.map((city) => (
            <ChipButton
              key={city}
              active={filters.locations.includes(city)}
              onClick={() => toggleArrayFilter("locations", city)}
            >
              {city}
            </ChipButton>
          ))}
        </div>
      </section>

      {/* Project Type */}
      <section className="space-y-3">
        <p className="text-[12px] font-semibold text-[#8F9BB3] uppercase tracking-[0.2em]">Project type</p>
        <div className="flex flex-wrap gap-2">
          {projectTypeOptions.map((type) => (
            <ChipButton
              key={type}
              active={filters.projectTypes.includes(type)}
              onClick={() => toggleArrayFilter("projectTypes", type)}
            >
              {type}
            </ChipButton>
          ))}
        </div>
      </section>

      {/* Budget */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-[12px] font-semibold text-[#8F9BB3] uppercase tracking-[0.2em]">Budget range (₹L)</p>
          <span className="text-xs text-[#475467] font-semibold">
            {filters.budgetRange[0]}L - {filters.budgetRange[1]}L
          </span>
        </div>
        <Slider
          value={filters.budgetRange}
          onValueChange={(value) => updateFilter("budgetRange", value as [number, number])}
          max={100}
          step={5}
          className="find-projects-budget-range-slider py-4"
        />
        <div className="flex flex-wrap gap-2">
          {budgetPresets.map((preset) => (
            <ChipButton
              key={preset.label}
              active={
                filters.budgetRange[0] === preset.range[0] &&
                filters.budgetRange[1] === preset.range[1]
              }
              onClick={() => updateFilter("budgetRange", preset.range)}
            >
              {preset.label}
            </ChipButton>
          ))}
        </div>
      </section>

      {/* Deadline */}
      <section className="space-y-3">
        <p className="text-[12px] font-semibold text-[#8F9BB3] uppercase tracking-[0.2em]">Deadline</p>
        <div className="flex flex-wrap gap-2">
          {deadlineOptions.map((deadline) => (
            <ChipButton
              key={deadline.value}
              active={filters.deadline === deadline.value}
              onClick={() => updateFilter("deadline", deadline.value)}
            >
              {deadline.label}
            </ChipButton>
          ))}
        </div>
      </section>

      {/* Specialization */}
      <section className="space-y-3">
        <p className="text-[12px] font-semibold text-[#8F9BB3] uppercase tracking-[0.2em]">Specialization</p>
        <div className="flex flex-wrap gap-2">
          {specializationOptions.map((spec) => (
            <ChipButton
              key={spec}
              active={filters.specializations.includes(spec)}
              onClick={() => toggleArrayFilter("specializations", spec)}
            >
              {spec}
            </ChipButton>
          ))}
        </div>
      </section>

      {/* Verified clients */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-[12px] font-semibold text-[#8F9BB3] uppercase tracking-[0.2em]">Verified clients</p>
          <Badge className="bg-[#10B981] text-white">COA</Badge>
        </div>
        <div className="flex items-center justify-between bg-[#F5F7FB] border rounded-2xl px-4 py-3" style={{ borderColor: `${themeColor}33` }}>
          <div>
            <p className="text-sm font-semibold text-[#111729]">Show verified only</p>
            <p className="text-xs text-[#64748B]">Extras curated by the platform</p>
          </div>
          <Switch
            checked={filters.verifiedOnly}
            onCheckedChange={(checked) => updateFilter("verifiedOnly", checked)}
          />
        </div>
      </section>

      {/* Application Status */}
      <section className="space-y-3">
        <p className="text-[12px] font-semibold text-[#8F9BB3] uppercase tracking-[0.2em]">Application status</p>
        <div className="flex flex-wrap gap-2">
          {statusOptions.map((status) => (
            <ChipButton
              key={status}
              active={filters.applicationStatus.includes(status)}
              onClick={() => toggleArrayFilter("applicationStatus", status)}
            >
              {status}
            </ChipButton>
          ))}
        </div>
      </section>

      <Button
        variant="ghost"
        className="w-full rounded-full border text-white font-semibold hover:bg-[#F4EDFF]"
        style={{ borderColor: `${themeColor}33`, color: themeColor }}
        onClick={clearFilters}
      >
        Reset filters
      </Button>
    </div>
  </ScrollArea>
);

return (
  <>
    {/* Desktop Sidebar */}
    <aside className="hidden lg:block w-[320px] flex-shrink-0">
      <div className="bg-white/95 backdrop-blur-sm rounded-[32px] shadow-[0_20px_60px_rgba(15,23,42,0.08)] sticky top-[96px] h-[calc(100vh-120px)] overflow-hidden" style={{ borderColor: `${themeColor}33` }}>
        <div className="h-full overflow-y-auto px-5 py-6">
          <FilterContent />
        </div>
      </div>
    </aside>

    {/* Mobile Filter Button */}
    <div className="lg:hidden fixed bottom-6 right-6 z-50">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <button aria-label="Open filters" title="Open filters" className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg text-white" style={{ background: `linear-gradient(to right, ${themeColor}, ${themeColor})` }}>
            <Filter className="w-6 h-6" />
          </button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[85vw] sm:w-[400px]">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <div className="mt-6 h-[calc(100vh-120px)]">
            <FilterContent />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  </>
);

}