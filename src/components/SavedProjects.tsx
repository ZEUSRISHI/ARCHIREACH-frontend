import { ImageWithFallback } from "../pages/figma/ImageWithFallback";
import { Button } from "../pages/ui/button";
import { Badge } from "../pages/ui/badge";
import { Heart, MessageCircle, Share2, Trash2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../pages/ui/tabs";

export function SavedProjects() {
  const projects = [
    {
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&h=350&fit=crop",
      title: "Modern Office Design",
      architect: "Ar. Rajesh Kumar",
      category: "Commercial",
      description: "Contemporary office space with open floor plan and natural lighting throughout the workspace.",
      likes: 245,
      comments: 32,
      shares: 15,
      collection: "Inspiration"
    },
    {
      image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=500&h=350&fit=crop",
      title: "Minimalist Apartment Interior",
      architect: "Ar. Priya Sharma",
      category: "Residential",
      description: "Clean, minimal design with smart storage solutions for small spaces.",
      likes: 189,
      comments: 24,
      shares: 12,
      collection: "Inspiration"
    },
    {
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&h=350&fit=crop",
      title: "Sustainable Green Building",
      architect: "Ar. Vikram Patel",
      category: "Institutional",
      description: "Eco-friendly architecture with rainwater harvesting and solar panels.",
      likes: 312,
      comments: 48,
      shares: 25,
      collection: "For Discussion"
    }
  ];

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-[#1F2937] text-3xl font-semibold mb-2 tracking-wide">
          My Saved Projects
        </h2>
        <p className="text-[#6B7280] text-sm">3 projects saved</p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6 border-b border-gray-200">
          <TabsTrigger value="all" className="text-gray-600 font-medium">All Projects (3)</TabsTrigger>
          <TabsTrigger value="inspiration" className="text-gray-600 font-medium">Inspiration (2)</TabsTrigger>
          <TabsTrigger value="discussion" className="text-gray-600 font-medium">For Discussion (1)</TabsTrigger>
          <TabsTrigger value="add" className="text-[#7A6BEB] font-bold">+ Create Collection</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                
                {/* Image */}
                <div className="relative group">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-[280px] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <button
                    aria-label="Favorite project"
                    title="Favorite project"
                    className="absolute top-4 right-4 bg-white rounded-full p-2.5 hover:bg-red-50 shadow-lg hover:scale-110 transition-transform duration-300"
                  >
                    <Heart className="w-5 h-5 text-[#EF4444] fill-current" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6">
                  <Badge className="bg-[#ECEBFB] text-[#7A6BEB] border border-[#cfc9ff] mb-3 hover:bg-[#E1DDFD] transition-colors duration-300 text-xs font-semibold px-3 py-1">
                    {project.category}
                  </Badge>

                  <h4 className="text-[#1F2937] mb-2 text-lg font-semibold truncate">{project.title}</h4>
                  <p className="text-[#7A6BEB] mb-3 font-semibold text-sm">By {project.architect}</p>

                  <p className="text-[#4B5563] mb-5 line-clamp-2 leading-relaxed text-sm">
                    {project.description}
                  </p>

                  {/* Engagement */}
                  <div className="flex items-center gap-5 text-[#6B7280] mb-5 pb-4 border-b border-gray-200">
                    <span className="flex items-center gap-1.5 text-sm hover:text-red-500 cursor-pointer transition-colors duration-300">
                      <Heart className="w-4 h-4" />
                      <span className="font-medium">{project.likes}</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-sm hover:text-blue-500 cursor-pointer transition-colors duration-300">
                      <MessageCircle className="w-4 h-4" />
                      <span className="font-medium">{project.comments}</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-sm hover:text-green-500 cursor-pointer transition-colors duration-300">
                      <Share2 className="w-4 h-4" />
                      <span className="font-medium">{project.shares}</span>
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3 mb-3">
                    <Button 
                      style={{ backgroundColor: "#7A6BEB" }}
                      className="w-full text-white hover:opacity-90 hover:shadow-lg transition-all duration-300 font-semibold py-2.5"
                    >
                      View Full Project
                    </Button>
                    <Button 
                      variant="outline"
                      className="w-full border-[#cfc9ff] hover:bg-[#ECEBFB] hover:border-[#bfb8ff] transition-all duration-300 py-2.5"
                    >
                      Contact Architect
                    </Button>
                  </div>

                  {/* Collection Info */}
                  <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                    <span className="text-[#6B7280] text-sm font-medium">
                      Collection: <span className="text-[#7A6BEB]">{project.collection}</span>
                    </span>
                    <button
                      aria-label="Remove project"
                      title="Remove project"
                      className="text-[#EF4444] hover:bg-red-50 p-2 rounded-lg transition-all duration-300 hover:scale-110"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="inspiration">
          <p className="text-[#6B7280]">Projects in Inspiration collection...</p>
        </TabsContent>

        <TabsContent value="discussion">
          <p className="text-[#6B7280]">Projects in For Discussion collection...</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
