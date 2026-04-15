import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { Badge } from "../ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Filter, X, Search } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { useState, useEffect } from "react";

interface FilterSidebarProps {
  filters: any;
  setFilters: (filters: any) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function FilterSidebar({
  filters,
  setFilters,
  isOpen,
  setIsOpen,
}: FilterSidebarProps) {
  const [showAllLocations, setShowAllLocations] = useState(false);
  const [searchFilterQuery, setSearchFilterQuery] = useState("");

  const ChipButton = ({
    label,
    selected,
    onClick,
  }: {
    label: string;
    selected?: boolean;
    onClick: () => void;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 inline-flex items-center justify-center ${
        selected
          ? "bg-[rgb(122,107,235)] text-white shadow-sm"
          : "bg-[#F1F4F9] text-[#4D5E80] hover:bg-[#E2E8F0]"
      }`}
    >
      {label}
    </button>
  );

  // local states for UI management
  const [selectedExperience, setSelectedExperience] = useState<string | null>(
    "All"
  );
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);
  const [selectedSpecs, setSelectedSpecs] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<string[]>([]);
  const [selectedProjectTypes, setSelectedProjectTypes] = useState<string[]>(
    []
  );
  const [verificationFilter, setVerificationFilter] = useState<"COA" | "All">(
    "COA"
  );
  const [availabilityFilter, setAvailabilityFilter] = useState<string[]>([]);
  const [budgetRange, setBudgetRange] = useState([0, 100]);

  const locations = [
    { name: "Mumbai", count: "50+" },
    { name: "Bangalore", count: "45+" },
    { name: "Delhi", count: "38+" },
    { name: "Hyderabad", count: "30+" },
    { name: "Chennai", count: "25+" },
    { name: "Pune", count: "22+" },
    { name: "Kochi", count: "20+" },
    { name: "Kolkata", count: "18+" },
  ];

  const projectTypes = [
    { name: "Residential", count: "200+" },
    { name: "Commercial", count: "150+" },
    { name: "Institutional", count: "80+" },
    { name: "Industrial", count: "40+" },
    { name: "Mixed-Use", count: "60+" },
    { name: "Interior", count: "90+" },
    { name: "Landscape", count: "50+" },
    { name: "Restoration", count: "30+" },
  ];

  const specializations = [
    "Sustainable Design",
    "Heritage Restoration",
    "Interior Design",
    "Landscape Design",
    "Smart Homes",
    "Government Approved",
  ];

  const experienceChips = ["All", "0-5 years", "5-15 years", "15+ years"];
  const budgetChips = ["Budget-Friendly", "Mid-Range", "Premium"];

  const handleClearAll = () => {
    setSelectedLocations([]);
    setSelectedProjectTypes([]);
    setSelectedExperience("All");
    setSelectedBudget(null);
    setSelectedSpecs([]);
    setSelectedRatings([]);
    setVerificationFilter("COA");
    setAvailabilityFilter([]);
    setBudgetRange([0, 100]);
    setSearchFilterQuery("");

    // Notify parent if needed, though this is currently a controlled-ish component
    if (typeof setFilters === "function") {
      try {
        setFilters({
          locations: [],
          projectTypes: [],
          budgetRange: [0, 100],
          specializations: [],
          verifiedOnly: true,
        });
      } catch (e) {
        console.log("Error resetting filters via prop", e);
      }
    }
  };

  const toggleArrayFilter = (
    current: string[],
    value: string,
    setter: (val: string[]) => void
  ) => {
    if (current.includes(value)) {
      setter(current.filter((v) => v !== value));
    } else {
      setter([...current, value]);
    }
  };

  const filteredLocations = locations.filter((loc) =>
    loc.name.toLowerCase().includes(searchFilterQuery.toLowerCase())
  );

  const filteredProjectTypes = projectTypes.filter((type) =>
    type.name.toLowerCase().includes(searchFilterQuery.toLowerCase())
  );

  const FilterContent = () => (
    <ScrollArea className="h-full pr-4">
      <div className="space-y-8 pb-10">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <p
              className="text-[12px] font-bold text-[#8F9BB3] uppercase tracking-[0.2em] mb-1"
              style={{ fontFamily: "'Public Sans', sans-serif" }}
            >
              Filters
            </p>
            <h3
              className="text-[20px] font-semibold text-[#111729]"
              style={{ fontFamily: "'Public Sans', sans-serif" }}
            >
              Refine results
            </h3>
          </div>
          <button
            onClick={handleClearAll}
            className="text-[15px] font-bold text-[rgb(122,107,235)] hover:bg-[rgb(122,107,235)]/5 px-3 py-1 rounded-lg transition-colors"
          >
            Clear
          </button>
        </div>

        {/* Search Search Filter Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8F9BB3]" />
          <input
            type="text"
            placeholder="Search filters (location, type...)"
            value={searchFilterQuery}
            onChange={(e) => setSearchFilterQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[rgb(122,107,235)]/20 transition-all text-sm"
          />
        </div>

        {/* Location Filter */}
        <div className="space-y-4">
          <p
            className="text-[12px] font-bold text-[#8F9BB3] uppercase tracking-[0.2em]"
            style={{ fontFamily: "'Public Sans', sans-serif" }}
          >
            Location
          </p>
          <div className="flex flex-wrap gap-2.5">
            {filteredLocations
              .slice(0, showAllLocations ? filteredLocations.length : 8)
              .map((location) => (
                <ChipButton
                  key={location.name}
                  label={location.name}
                  selected={selectedLocations.includes(location.name)}
                  onClick={() =>
                    toggleArrayFilter(
                      selectedLocations,
                      location.name,
                      setSelectedLocations
                    )
                  }
                />
              ))}
          </div>
          {filteredLocations.length > 8 && (
            <button
              onClick={() => setShowAllLocations(!showAllLocations)}
              className="text-[rgb(122,107,235)] font-bold text-sm hover:underline flex items-center gap-1"
            >
              {showAllLocations ? "Show Less" : "View More"}
            </button>
          )}
        </div>

        <Separator className="bg-[#E2E8F0]" />

        {/* Project Type Filter */}
        <div className="space-y-4">
          <p
            className="text-[12px] font-bold text-[#8F9BB3] uppercase tracking-[0.2em]"
            style={{ fontFamily: "'Public Sans', sans-serif" }}
          >
            Project Type
          </p>
          <div className="flex flex-wrap gap-2.5">
            {filteredProjectTypes.map((type) => (
              <ChipButton
                key={type.name}
                label={type.name}
                selected={selectedProjectTypes.includes(type.name)}
                onClick={() =>
                  toggleArrayFilter(
                    selectedProjectTypes,
                    type.name,
                    setSelectedProjectTypes
                  )
                }
              />
            ))}
          </div>
        </div>

        <Separator className="bg-[#E2E8F0]" />

        {/* Budget Range Slider */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p
              className="text-[12px] font-bold text-[#8F9BB3] uppercase tracking-[0.2em]"
              style={{ fontFamily: "'Public Sans', sans-serif" }}
            >
              Budget Range (₹L)
            </p>
            <span className="text-sm font-bold text-[#111729]">
              {budgetRange[0]}L - {budgetRange[1]}L
            </span>
          </div>
          <Slider
            value={budgetRange}
            onValueChange={setBudgetRange}
            max={100}
            step={1}
            className="py-4 budget-range-slider"
          />
        </div>

        <Separator className="bg-[#E2E8F0]" />

        {/* Experience Filter */}
        <div className="space-y-4">
          <p
            className="text-[12px] font-bold text-[#8F9BB3] uppercase tracking-[0.2em]"
            style={{ fontFamily: "'Public Sans', sans-serif" }}
          >
            Years of Experience
          </p>
          <div className="flex flex-wrap gap-2.5">
            {experienceChips.map((chip) => (
              <ChipButton
                key={chip}
                label={chip}
                selected={selectedExperience === chip}
                onClick={() => setSelectedExperience(chip)}
              />
            ))}
          </div>
        </div>

        <Separator className="bg-[#E2E8F0]" />

        {/* Rating Filter */}
        <div className="space-y-4">
          <p
            className="text-[12px] font-bold text-[#8F9BB3] uppercase tracking-[0.2em]"
            style={{ fontFamily: "'Public Sans', sans-serif" }}
          >
            Rating
          </p>
          <div className="grid grid-cols-1 gap-2">
            {[
              { label: "5 Stars (⭐5.0)", value: "5" },
              { label: "4+ Stars (⭐4.0+)", value: "4" },
              { label: "3+ Stars (⭐3.0+)", value: "3" },
            ].map((rating) => (
              <button
                key={rating.value}
                onClick={() =>
                  toggleArrayFilter(
                    selectedRatings,
                    rating.value,
                    setSelectedRatings
                  )
                }
                className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                  selectedRatings.includes(rating.value)
                    ? "border-[rgb(122,107,235)] bg-[rgb(122,107,235)]/5 text-[rgb(122,107,235)]"
                    : "border-[#E2E8F0] hover:border-[rgb(122,107,235)]/50"
                }`}
              >
                <span className="text-sm font-medium">{rating.label}</span>
                {selectedRatings.includes(rating.value) && (
                  <div className="w-2 h-2 rounded-full bg-[rgb(122,107,235)]" />
                )}
              </button>
            ))}
          </div>
        </div>

        <Separator className="bg-[#E2E8F0]" />

        {/* Specialization */}
        <div className="space-y-4">
          <p
            className="text-[12px] font-bold text-[#8F9BB3] uppercase tracking-[0.2em]"
            style={{ fontFamily: "'Public Sans', sans-serif" }}
          >
            Specialization
          </p>
          <div className="flex flex-wrap gap-2.5">
            {specializations.map((spec) => (
              <ChipButton
                key={spec}
                label={spec}
                selected={selectedSpecs.includes(spec)}
                onClick={() =>
                  toggleArrayFilter(selectedSpecs, spec, setSelectedSpecs)
                }
              />
            ))}
          </div>
        </div>

        {/* Reset All Button */}
        <Button
          onClick={handleClearAll}
          variant="outline"
          className="w-full h-12 rounded-2xl border-2 border-[rgb(122,107,235)] text-[rgb(122,107,235)] font-bold hover:bg-[rgb(122,107,235)] hover:text-white transition-all duration-300 shadow-sm"
        >
          Reset All Filters
        </Button>
      </div>
    </ScrollArea>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block lg:w-[340px] xl:w-[360px] h-full sticky top-[96px] self-start">
        <div className="bg-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#F1F5F9] p-6 xl:p-8 h-[calc(100vh-120px)] overflow-hidden">
          <FilterContent />
        </div>
      </aside>

      {/* Mobile Filter Button & Sheet */}
      <div className="lg:hidden fixed bottom-6 right-4 sm:right-6 z-50">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button className="bg-[rgb(122,107,235)] hover:bg-[rgb(90,75,200)] text-white rounded-full w-14 h-14 shadow-2xl flex items-center justify-center group transition-all duration-300 hover:scale-110">
              <Filter className="w-6 h-6 group-hover:rotate-12 transition-transform" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="bottom"
            className="h-[90vh] rounded-t-[40px] px-8 pt-10 border-none"
          >
            <SheetHeader className="hidden">
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <FilterContent />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
export default FilterSidebar;
