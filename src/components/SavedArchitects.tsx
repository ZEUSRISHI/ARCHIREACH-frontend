import { Badge } from "../pages/ui/badge";
import { Button } from "../pages/ui/button";
import { ImageWithFallback } from "../pages/figma/ImageWithFallback";
import { MapPin, Star, Trash2, Grid3x3, List } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../pages/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../pages/ui/tabs";
import { useState } from "react";

export function SavedArchitects() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const architects = [
    {
      name: "Ar. Rajesh Kumar",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop",
      rating: 4.9,
      reviews: 124,
      specialization: ["Sustainable Design", "Residential"],
      experience: "15+ years",
      location: "Mumbai, Maharashtra",
      category: "Shortlisted"
    },
    {
      name: "Ar. Priya Sharma",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop",
      rating: 4.8,
      reviews: 98,
      specialization: ["Interior Design", "Commercial"],
      experience: "12+ years",
      location: "Bangalore, Karnataka",
      category: "Shortlisted"
    },
    {
      name: "Ar. Vikram Patel",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
      rating: 5.0,
      reviews: 156,
      specialization: ["Heritage Restoration"],
      experience: "20+ years",
      location: "Delhi, NCR",
      category: "Interested"
    }
  ];

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end mb-8 gap-4">
        <div className="text-right">
          <h2 className="text-[#1F2937] text-3xl font-semibold mb-1 tracking-wide">
            My Saved Architects
          </h2>
          <p className="text-[#6B7280] text-sm">12 architects saved</p>
        </div>

        <div className="flex items-center gap-3">
          <Select defaultValue="date">
            <SelectTrigger className="w-[220px] rounded-lg border border-gray-300 shadow-sm">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Date saved (newest)</SelectItem>
              <SelectItem value="rating">Rating (highest)</SelectItem>
              <SelectItem value="experience">Experience</SelectItem>
              <SelectItem value="name">Name (A-Z)</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-1 border border-gray-300 rounded-lg p-1 shadow-sm">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-[#7B3FF2] text-white shadow-md' : 'text-gray-500 hover:bg-gray-100'}`}
              aria-label="Switch to grid view"
              title="Grid view"
            >
              <Grid3x3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-[#7B3FF2] text-white shadow-md' : 'text-gray-500 hover:bg-gray-100'}`}
              aria-label="Switch to list view"
              title="List view"
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6 border-b border-gray-200">
          <TabsTrigger value="all" className="text-gray-600 font-medium">All Architects (12)</TabsTrigger>
          <TabsTrigger value="shortlisted" className="text-gray-600 font-medium">Shortlisted (5)</TabsTrigger>
          <TabsTrigger value="interested" className="text-gray-600 font-medium">Interested (4)</TabsTrigger>
          <TabsTrigger value="not-suitable" className="text-gray-600 font-medium">Not Suitable (3)</TabsTrigger>
          <TabsTrigger value="add" className="text-[#7B3FF2] font-bold">+ Add Category</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {architects.map((architect, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                {/* Profile Header */}
                <div className="flex items-start gap-4 mb-5">
                  <div className="relative">
                    <ImageWithFallback
                      src={architect.image}
                      alt={architect.name}
                      className="w-20 h-20 rounded-full object-cover border-2 border-purple-200 shadow-sm"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[#1F2937] text-lg font-semibold mb-1 truncate">{architect.name}</h4>
                    <div className="flex items-center gap-1.5 text-[#10B981]">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="font-semibold text-sm">{architect.rating}</span>
                      <span className="text-[#6B7280] text-xs">({architect.reviews} reviews)</span>
                    </div>
                  </div>
                  <button 
                    className="text-[#EF4444] hover:bg-red-50 p-2 rounded-lg transition-all duration-300 hover:scale-110"
                    aria-label={`Remove ${architect.name} from saved architects`}
                    title="Remove architect"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Specializations */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {architect.specialization.map((spec, i) => (
                    <Badge key={i} className="bg-[#F3E8FF] text-[#7B3FF2] border border-purple-200 hover:bg-purple-100 transition-colors duration-300 text-xs font-medium px-3 py-1">
                      {spec}
                    </Badge>
                  ))}
                </div>

                {/* Location & Experience */}
                <div className="text-[#6B7280] mb-3 flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-purple-400" />
                  <span className="font-medium">{architect.location}</span>
                </div>
                <p className="text-[#6B7280] text-sm font-medium mb-5">{architect.experience} experience</p>

                {/* Action Buttons */}
                <div className="space-y-3 mb-3">
                  <Button 
                    style={{ backgroundColor: "#7B3FF2" }}
                    className="w-full text-white hover:opacity-90 hover:shadow-lg transition-all duration-300 font-semibold py-2.5"
                  >
                    View Profile
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-full border-purple-200 hover:bg-purple-50 hover:border-purple-300 transition-all duration-300 py-2.5"
                  >
                    Send Message
                  </Button>
                </div>

                {/* Category Selector */}
                <Select defaultValue={architect.category}>
                  <SelectTrigger className="w-full h-10 rounded-lg border border-gray-300 shadow-sm">
                    <SelectValue placeholder="Add to category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Shortlisted">Shortlisted</SelectItem>
                    <SelectItem value="Interested">Interested</SelectItem>
                    <SelectItem value="Not Suitable">Not Suitable</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="shortlisted">
          <p className="text-[#6B7280]">Architects in Shortlisted category...</p>
        </TabsContent>

        <TabsContent value="interested">
          <p className="text-[#6B7280]">Architects in Interested category...</p>
        </TabsContent>

        <TabsContent value="not-suitable">
          <p className="text-[#6B7280]">Architects in Not Suitable category...</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
