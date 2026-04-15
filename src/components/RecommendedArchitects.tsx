import { useRef, useState } from "react";
import { Badge } from "../pages/ui/badge";
import { Button } from "../pages/ui/button";
import { ImageWithFallback } from "../pages/figma/ImageWithFallback";
import { MapPin, Star, Heart, ChevronLeft, ChevronRight } from "lucide-react";

export function RecommendedArchitects() {
  const [showAll, setShowAll] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const architects = [
    {
      name: "Ar. Rajesh Kumar",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop",
      rating: 4.9,
      reviews: 124,
      specialization: ["Sustainable Design", "Residential"],
      experience: "15+ years",
      location: "Mumbai, Maharashtra"
    },
    {
      name: "Ar. Priya Sharma",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop",
      rating: 4.8,
      reviews: 98,
      specialization: ["Interior Design", "Commercial"],
      experience: "12+ years",
      location: "Bangalore, Karnataka"
    },
    {
      name: "Ar. Vikram Patel",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
      rating: 5.0,
      reviews: 156,
      specialization: ["Heritage Restoration", "Institutional"],
      experience: "20+ years",
      location: "Delhi, NCR"
    },
    {
      name: "Ar. Meera Joshi",
      image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&h=200&fit=crop",
      rating: 4.7,
      reviews: 87,
      specialization: ["Landscape", "Residential"],
      experience: "10+ years",
      location: "Pune, Maharashtra"
    }
  ];

  const scrollNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  const scrollPrev = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const renderCard = (architect: typeof architects[0], idx: number) => (
    <div key={idx} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-2xl hover:-translate-y-2 transition-transform duration-300 group flex flex-col min-w-[320px]">
      {/* Profile Header */}
      <div className="flex items-start gap-4 mb-5">
        <div className="relative flex-shrink-0">
          <ImageWithFallback
            src={architect.image}
            alt={architect.name}
            className="w-20 h-20 rounded-2xl object-cover border-2 border-purple-200 group-hover:border-purple-400 shadow-sm transition-all duration-300"
          />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white shadow-md"></div>
        </div>
        <div className="flex-1 min-w-0 flex flex-col gap-1">
          <h4 className="text-gray-900 font-bold text-lg truncate">{architect.name}</h4>
          <div className="flex items-center gap-1 text-green-500">
            <Star className="w-4 h-4 fill-current" />
            <span className="font-semibold text-sm">{architect.rating}</span>
            <span className="text-gray-400 text-xs">({architect.reviews})</span>
          </div>
        </div>
        <button className="text-gray-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-all duration-300">
          <Heart className="w-5 h-5" />
        </button>
      </div>

      {/* Specializations */}
      <div className="flex flex-wrap gap-2 mb-4">
        {architect.specialization.map((spec, i) => (
          <Badge
            key={i}
            className="bg-purple-50 text-purple-600 border border-purple-200 px-3 py-1 text-xs font-medium hover:bg-purple-100 transition-colors duration-300"
          >
            {spec}
          </Badge>
        ))}
      </div>

      {/* Location & Experience */}
      <div className="mb-5 space-y-1 text-gray-500 text-sm">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-purple-400" />
          <span>{architect.location}</span>
        </div>
        <div>{architect.experience}</div>
      </div>

      {/* CTA Button */}
      <Button className="w-full bg-purple-600 text-white hover:bg-purple-700 transition-all duration-300 font-semibold py-2.5">
        View Profile
      </Button>
    </div>
  );

  return (
    <section className="bg-white rounded-2xl p-8 lg:p-10 shadow-md border border-gray-100">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h3 className="text-gray-900 text-2xl font-bold mb-2 tracking-tight">
            Recommended Architects for You
          </h3>
          <p className="text-gray-500 text-base max-w-xl">
            Based on your searches and saved items
          </p>
        </div>
        <Button
          onClick={() => setShowAll(!showAll)}
          className="bg-purple-600 text-white hover:bg-purple-700 transition-colors duration-300 font-semibold px-6 py-2.5"
        >
          {showAll ? "Show Less" : "View All"}
        </Button>
      </div>

      {/* All Cards Grid */}
      {showAll ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {architects.map(renderCard)}
        </div>
      ) : (
        <div className="relative">
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg hover:bg-purple-50 hover:scale-110 transition-transform duration-300"
          >
            <ChevronLeft className="w-6 h-6 text-purple-600" />
          </button>
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth py-2"
          >
            {architects.map(renderCard)}
          </div>
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg hover:bg-purple-50 hover:scale-110 transition-transform duration-300"
          >
            <ChevronRight className="w-6 h-6 text-purple-600" />
          </button>
        </div>
      )}
    </section>
  );
}
