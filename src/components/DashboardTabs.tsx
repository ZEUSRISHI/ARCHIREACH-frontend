import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../pages/ui/tabs";
import { MessageCircle, Bell, CheckCircle, MapPin, Star, Heart, Bookmark, ChevronLeft, ChevronRight, Trash2, Grid3x3, List, Plus, Edit2, Share2, Circle } from "lucide-react";
import { DesignBriefs } from "./DesignBriefs";
import { Badge } from "../pages/ui/badge";
import { Button } from "../pages/ui/button";
import { ImageWithFallback } from "../pages/figma/ImageWithFallback";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../pages/ui/select";
import { useEditContext } from "../context/EditContext";
import { Progress } from "../pages/ui/progress";
import { ProjectModal } from "./FArchitecturePage";

interface Architect {
    id: number;
    name: string;
    image: string;
    rating: number;
    reviews: number;
    specialization: string[];
    experience: string;
    location: string;
    category?: string;
    originalId?: string;
}

interface Project {
    id: number;
    image: string;
    title: string;
    architect: string;
    category: string;
    description: string;
    likes: number;
    comments: number;
    shares: number;
    collection: string;
    location?: string;
    year?: string;
    architects?: string;
    imageBase64?: string;
    firmUID?: string;
}

// import { MessageCircle, Bell, CheckCircle } from "lucide-react";

// import { MessageCircle, Bell, CheckCircle } from "lucide-react";

function RecentActivity() {
    const activities = [
        {
            icon: MessageCircle,
            text: "Ar. Rajesh Kumar responded to your message",
            time: "Today at 3:45 PM",
            action: "View message",
            color: "#7A6BEB",
            highlight: false,
        },
        {
            icon: Bell,
            text: "Architect profile updated: Ar. Priya Sharma",
            time: "Today at 10:20 AM",
            action: null,
            color: "#10B981",
            highlight: false,
        },
        {
            icon: CheckCircle,
            text: "Your design brief received 3 offers",
            time: "Yesterday",
            action: "View offers",
            color: "#7A6BEB",
            highlight: true,
        },
    ];

    return (
        <section className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-gray-200 mx-auto transition-all duration-300 flex flex-col min-h-[560px]">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-gray-900 font-bold text-xl tracking-tight">
                    Recent Activity
                </h3>
                <span className="text-gray-500 text-xs">Latest updates</span>
            </div>

            {/* Activity List */}
            <div className="relative pl-6 space-y-6 flex-1">
                {/* Vertical timeline line */}

                {activities.map((activity, idx) => {
                    const Icon = activity.icon;
                    return (

                        <div
                            key={idx}
                            className="relative flex items-start gap-8 p-4 rounded-xl bg-white/50 shadow-sm hover:shadow-lg hover:-translate-y-1 transform transition-all duration-300 group cursor-pointer"
                        >
                            {/* Timeline Dot */}

                            {/* Icon */}
                            <div
                                className="flex-shrink-0 p-3 rounded-xl transition-transform duration-300 group-hover:scale-110"
                                style={{
                                    backgroundColor: `${activity.color}20`,
                                }}
                            >
                                <Icon className="w-5 h-9" style={{ color: activity.color }} />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <p
                                    className={`font-semibold text-sm transition-colors duration-300 ${activity.highlight
                                        ? "text-[#7A6BEB]"
                                        : "text-gray-900 group-hover:text-[#7A6BEB]"
                                        }`}
                                >
                                    {activity.text}
                                </p>
                                <p className="text-gray-500 text-xs mt-1">{activity.time}</p>

                                {activity.action && (
                                    <a
                                        href="#"
                                        className="mt-2 inline-flex items-center gap-1 text-[#7A6BEB] text-sm font-semibold group-hover:text-[#6c5fe0] transition-colors"
                                    >
                                        {activity.action} <span className="transition-transform group-hover:translate-x-1">→</span>
                                    </a>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Footer */}
            <div className="mt-auto border-t border-gray-200 pt-4 text-right">
                <a
                    href="#"
                    className="inline-flex items-center gap-1 text-[#7A6BEB] text-sm font-semibold hover:text-[#6c5fe0] transition-colors group"
                >
                    View all activities
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                </a>
            </div>
        </section>
    );
}

export default RecentActivity;

function RecommendedArchitects() {
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
                <button
                    className="text-gray-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-all duration-300"
                    aria-label={`Remove ${architect.name} from saved architects`}
                    title="Remove from saved architects"
                >
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
                <div>{architect.experience} experience</div>
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
                        aria-label="Scroll recommended architects left"
                        title="Scroll left"
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
                        aria-label="Scroll recommended architects right"
                        title="Scroll right"
                    >
                        <ChevronRight className="w-6 h-6 text-purple-600" />
                    </button>
                </div>
            )}
        </section>
    );
}



export function SavedArchitects() {
    const navigate = useNavigate();
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [editingId, setEditingId] = useState<number | null>(null);
    const { isEditing, savedArchitects, updateArchitect, deleteArchitect, addArchitect } = useEditContext();
    const [newArchForm, setNewArchForm] = useState(false);

    const handleAddArchitect = () => {
        const newArch: Architect = {
            id: Date.now(),
            name: "New Architect",
            image: "https://via.placeholder.com/200",
            rating: 0,
            reviews: 0,
            specialization: [],
            experience: "0+ years",
            location: "Location",
            category: "Shortlisted"
        };
        addArchitect(newArch);
        setNewArchForm(false);
    };




    return (
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center mb-8 gap-4">
                <div className="w-full text-center">
                    <h2 className="text-[#1F2937] text-3xl font-semibold mb-1 tracking-wide">
                        My Saved Architects
                    </h2>
                    <p className="text-[#6B7280] text-sm">{savedArchitects.length} architects saved</p>
                </div>



                <div className="flex items-center gap-3">

                    {isEditing && (
                        <button
                            onClick={handleAddArchitect}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" /> Add Architect
                        </button>
                    )}

                    <Select defaultValue="date" aria-label="Sort saved architects">
                        <SelectTrigger className="w-[210px] rounded-lg border border-white shadow-xl">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="date">Date saved (newest)</SelectItem>
                            <SelectItem value="rating">Rating (highest)</SelectItem>
                            <SelectItem value="experience">Experience</SelectItem>
                            <SelectItem value="name">Name (A-Z)</SelectItem>
                        </SelectContent>
                    </Select>

                    <div className="flex items-center gap-2 rounded-lg p-2 shadow-xl">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-[#7B3FF2] text-white shadow-md' : 'text-gray-500 hover:bg-gray-100'}`}
                            aria-label="Grid view"
                            title="Grid view"
                        >
                            <Grid3x3 className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-[#7B3FF2] text-white shadow-md' : 'text-gray-500 hover:bg-gray-100'}`}
                            aria-label="List view"
                            title="List view"
                        >
                            <List className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="all" className="w-full flex flex-col items-center">
                <TabsList className="mb-6 border-b shadow-xl border-gray-300 p-4 rounded-2xl gap-5 w-fit justify-center">
                    <TabsTrigger value="all" className=" text-gray-600 hover:bg-gray-200  font-medium">All Architects ({savedArchitects.length})</TabsTrigger>
                    <TabsTrigger value="shortlisted" className="text-gray-600 font-medium">Shortlisted ({savedArchitects.filter((a: any) => a.category === 'Shortlisted').length})</TabsTrigger>
                    <TabsTrigger value="interested" className="text-gray-600 font-medium">Interested ({savedArchitects.filter((a: any) => a.category === 'Interested').length})</TabsTrigger>
                    <TabsTrigger value="not-suitable" className="text-gray-600 font-medium">Not Suitable ({savedArchitects.filter((a: any) => a.category === 'Not Suitable').length})</TabsTrigger>
                    <TabsTrigger value="add" className="text-[#7B3FF2] font-bold">+ Add Category</TabsTrigger>
                </TabsList>

                <TabsContent value="all">
                    <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>

                        {savedArchitects.map((architect: Architect) => (
                            <div
                                key={architect.id}
                                className="bg-white border border-gray-200 rounded-[2rem] p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center h-full relative"
                            >
                                {/* Edit/Delete buttons - only show in edit mode */}
                                {isEditing && (
                                    <div className="absolute top-4 right-4 flex gap-2 z-20">
                                        <button
                                            onClick={() => setEditingId(editingId === architect.id ? null : architect.id)}
                                            className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-all"
                                            title="Edit"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => deleteArchitect(architect.id)}
                                            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}

                                {/* Editing mode content (same as before) */}
                                {editingId === architect.id && isEditing ? (
                                    <div className="space-y-3 w-full">
                                        <div>
                                            <label className="text-xs font-semibold text-gray-600">Name</label>
                                            <input
                                                type="text"
                                                value={architect.name}
                                                onChange={(e) => updateArchitect(architect.id, { name: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                                placeholder="Architect name"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs font-semibold text-gray-600">Location</label>
                                            <input
                                                type="text"
                                                value={architect.location}
                                                onChange={(e) => updateArchitect(architect.id, { location: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                                placeholder="Location"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs font-semibold text-gray-600">Rating</label>
                                            <input
                                                type="number"
                                                value={architect.rating}
                                                onChange={(e) => updateArchitect(architect.id, { rating: parseFloat(e.target.value) || 0 })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                                placeholder="Rating"
                                                step="0.1"
                                                max="5"
                                                min="0"
                                            />
                                        </div>
                                        <button
                                            onClick={() => setEditingId(null)}
                                            className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold text-sm"
                                        >
                                            Done Editing
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        {/* Avatar with Verified Badge */}
                                        <div className="relative mb-4">
                                            <div className="w-24 h-24 rounded-full p-1 border-2 border-[#7A6BEB]">
                                                <ImageWithFallback
                                                    src={architect.image}
                                                    alt={architect.name}
                                                    className="w-full h-full rounded-full object-cover"
                                                />
                                            </div>
                                            <div className="absolute top-0 right-0 bg-[#7A6BEB] text-white rounded-full p-1 border-2 border-white shadow-sm">
                                                <CheckCircle className="w-4 h-4" />
                                            </div>
                                            {/* Quick Unsave */}
                                            <button
                                                onClick={() => deleteArchitect(architect.id)}
                                                className="absolute -top-2 -left-2 bg-white text-red-500 rounded-full p-1.5 shadow-md border border-red-100 hover:scale-110 transition-transform"
                                                title="Remove from saved"
                                            >
                                                <Heart className="w-3.5 h-3.5 fill-current" />
                                            </button>
                                        </div>

                                        {/* Name & Subtitle */}
                                        <h3
                                            className="text-gray-900 mb-1 text-center"
                                            style={{
                                                fontFamily: "'Public Sans', sans-serif",
                                                fontSize: "20px",
                                                fontWeight: "400"
                                            }}
                                        >
                                            {architect.name}
                                        </h3>
                                        <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-2">
                                            <MapPin className="w-4 h-4" />
                                            <span>{architect.location}</span>
                                        </div>

                                        {/* Rating */}
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="flex gap-0.5">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-4 h-4 ${i < Math.floor(architect.rating) ? "fill-[#7A6BEB] text-[#7A6BEB]" : "fill-gray-200 text-gray-200"}`}
                                                    />
                                                ))}
                                            </div>
                                            <span className="font-semibold text-gray-700 text-sm">{architect.rating}</span>
                                            <span className="text-gray-400 text-xs">•</span>
                                            <span className="text-gray-500 text-sm">{architect.reviews} reviews</span>
                                        </div>

                                        {/* Tags */}
                                        <div className="flex flex-wrap justify-center gap-2 mb-4">
                                            {architect.specialization.slice(0, 3).map((spec, i) => (
                                                <span
                                                    key={i}
                                                    className="px-3 py-1 rounded-full text-xs font-medium text-[#7A6BEB] bg-white border border-[#7A6BEB] shadow-sm"
                                                >
                                                    {spec}
                                                </span>
                                            ))}
                                        </div>

                                        {/* View Profile Button */}
                                        <button
                                            onClick={() => {
                                                navigate("/pages/blog/FirmProfile", {
                                                    state: { architect: { ...architect, id: architect.originalId || architect.id, specializations: architect.specialization } }
                                                });
                                            }}
                                            className="w-full bg-[#7A6BEB] hover:bg-[#695ACD] text-white py-2.5 rounded-xl font-bold text-md shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                                        >
                                            View Profile
                                        </button>
                                    </>
                                )}
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



function SavedProjects() {
    const navigate = useNavigate();
    const { isEditing, savedProjects, updateProject, deleteProject, addProject } = useEditContext();
    const [editingId, setEditingId] = useState<number | null>(null);
    const [modalProject, setModalProject] = useState<Project | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    const openProjectModal = (project: Project) => {
        setModalProject(project);
        setModalOpen(true);
    };

    const closeProjectModal = () => {
        setModalOpen(false);
        setModalProject(null);
    };

    const handleAddProject = () => {
        addProject();
    };

    return (
        <>
            <style>{`
                .firm-dash-style {
                  --primary: #7A6BEB;
                  --text-primary: #1F2937;
                  --text-secondary: #6B7280;
                }
                .text-h3 {
                  font-family: 'Poppins', sans-serif;
                  font-weight: 600;
                  font-size: 1.125rem;
                  line-height: 1.5;
                  color: var(--text-primary);
                }
                .text-body {
                  font-family: 'Inter', sans-serif;
                  font-weight: 400;
                  font-size: 0.9375rem;
                  line-height: 1.7;
                  color: var(--text-secondary);
                }
            `}</style>
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 firm-dash-style">
                {/* Header */}
                <div className="mb-8 flex justify-between items-center">
                    <div className="w-full text-center">
                        <h2 className="text-[#1F2937] text-3xl font-semibold mb-2 tracking-wide">
                            My Saved Projects
                        </h2>
                        {/* <p className="text-[#6B7280] text-sm">{savedProjects.length} projects saved</p> */}
                    </div>
                    {isEditing && (
                        <button
                            onClick={handleAddProject}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" /> Add Project
                        </button>
                    )}
                </div>

                <Tabs defaultValue="all" className="w-full">
                    <TabsList className="mb-6">
                        <TabsTrigger value="all" className="text-gray-600 font-medium">All Projects ({savedProjects.length})</TabsTrigger>
                    </TabsList>

                    <TabsContent value="all">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {savedProjects.map((project: Project) => (
                                <div key={project.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 relative">

                                    {/* Edit/Delete buttons */}
                                    {isEditing && (
                                        <div className="absolute top-4 right-4 z-10 flex gap-2">
                                            <button
                                                onClick={() => setEditingId(editingId === project.id ? null : project.id)}
                                                className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-all"
                                                aria-label="Edit saved project"
                                                title="Edit project"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => deleteProject(project.id)}
                                                className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all"
                                                aria-label="Delete saved project"
                                                title="Delete project"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    )}

                                    {editingId === project.id && isEditing ? (
                                        <div className="p-6 space-y-3">
                                            {/* ... editing inputs ... */}
                                            <div>
                                                <label className="text-xs font-semibold text-gray-600">Title</label>
                                                <input
                                                    type="text"
                                                    value={project.title}
                                                    onChange={(e) => updateProject(project.id, { title: e.target.value })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                                    placeholder="Project title"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs font-semibold text-gray-600">Architect</label>
                                                <input
                                                    type="text"
                                                    value={project.architect}
                                                    onChange={(e) => updateProject(project.id, { architect: e.target.value })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                                    placeholder="Architect name"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs font-semibold text-gray-600">Category</label>
                                                <input
                                                    type="text"
                                                    value={project.category}
                                                    onChange={(e) => updateProject(project.id, { category: e.target.value })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                                    placeholder="Category"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs font-semibold text-gray-600">Description</label>
                                                <textarea
                                                    value={project.description}
                                                    onChange={(e) => updateProject(project.id, { description: e.target.value })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                                    placeholder="Description"
                                                    rows={3}
                                                />
                                            </div>
                                            <button
                                                onClick={() => setEditingId(null)}
                                                className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold text-sm"
                                            >
                                                Done Editing
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="bg-white rounded-2xl overflow-hidden cursor-pointer group shadow-lg hover:shadow-2xl transform transition-all duration-300 h-full flex flex-col">
                                            {/* Image Section */}
                                            <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/9' }}>
                                                <ImageWithFallback
                                                    src={project.imageBase64 || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop'}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />

                                                {/* Category Badge on Image Overlay (like Firm Dash) */}
                                                <div className="absolute top-3 left-3 z-10">
                                                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[#7A6BEB] text-[10px] font-bold rounded-full shadow-sm">
                                                        {project.category}
                                                    </span>
                                                </div>

                                                {/* Heart / Save Overlay */}
                                                <div className="absolute top-3 right-3 z-10">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            deleteProject(project.id);
                                                        }}
                                                        className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg text-red-500 hover:scale-110 transition-all duration-300"
                                                        aria-label="Remove Project"
                                                        title="Remove from saved"
                                                    >
                                                        <Heart className="w-4 h-4 fill-current" />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Project Info Section (Identical to Firm Dashboard style) */}
                                            <div className="p-4 flex flex-col flex-1 bg-white space-y-2">
                                                <h3 className="text-h3 mb-2 line-clamp-2 group-hover:text-[#7A6BEB] transition-colors">
                                                    {project.title}
                                                </h3>

                                                <p className="text-body mb-1 line-clamp-1">
                                                    {project.location || `By ${project.architect}`}
                                                </p>

                                                <p className="text-body font-medium" style={{ color: '#7A6BEB' }}>
                                                    {project.year || '2024'}
                                                </p>

                                                {/* Buttons Grid */}
                                                <div className="flex flex-col gap-2 mt-auto pt-2">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            openProjectModal(project);
                                                        }}
                                                        className="w-full py-2 border-2 border-[#7A6BEB] text-[#7A6BEB] font-semibold rounded-lg text-xs shadow hover:scale-102 transition-all duration-300"
                                                    >
                                                        Quick View
                                                    </button>
                                                    {project.firmUID && (
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                navigate("/pages/blog/FirmProfile", {
                                                                    state: {
                                                                        architect: {
                                                                            originalData: { userUID: project.firmUID },
                                                                            name: project.architect || "Architect",
                                                                            firm: project.architect || "Firm"
                                                                        }
                                                                    }
                                                                });
                                                            }}
                                                            className="w-full py-2 bg-[#7A6BEB] text-white font-semibold rounded-lg text-xs shadow hover:bg-[#695ACD] transition-all duration-300"
                                                        >
                                                            View on Firm Profile
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>

                {/* Project Modal */}
                {modalProject && (
                    <ProjectModal
                        project={modalProject}
                        isOpen={modalOpen}
                        onClose={closeProjectModal}
                        editMode={false}
                        viewMode={true}
                        onUpdate={() => { }}
                        categoryKey="saved"
                        index={0}
                        onDelete={() => { }}
                    />
                )}
            </div>
        </>
    );
}

export function ProfileProgress() {
    const items = [
        { label: "Profile photo", complete: false, optional: true },
        { label: "Phone verification", complete: true, optional: false },
        { label: "Add saved addresses", complete: false, optional: true },
        { label: "Set notification preferences", complete: true, optional: true }
    ];

    const completedCount = items.filter(item => item.complete).length;
    const progress = (completedCount / items.length) * 100;

    return (
        <div className="bg-gradient-to-br from-[#F3E8FF] via-[#E9D5FF] to-[#E0E7FF] rounded-2xl p-8 shadow-xl border border-purple-200">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
                <h3 className="text-[#1F2937] text-2xl sm:text-3xl font-semibold tracking-tight">
                    Complete Your Profile
                </h3>
                <p className="text-[#7B3FF2] text-lg sm:text-xl font-bold">{Math.round(progress)}% Complete</p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
                <Progress value={progress} className="h-4 rounded-full shadow-inner transition-all duration-500" />
            </div>

            {/* Items List */}
            <div className="space-y-4 mb-6">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-4 bg-white/70 backdrop-blur-md rounded-xl p-4 border border-purple-100 shadow hover:shadow-lg transition-all duration-300"
                    >
                        {item.complete ? (
                            <CheckCircle className="w-6 h-6 text-[#10B981] flex-shrink-0 transition-transform duration-300 hover:scale-110" />
                        ) : (
                            <Circle className="w-6 h-6 text-[#9CA3AF] flex-shrink-0 transition-transform duration-300 hover:scale-110" />
                        )}

                        <div className="flex-1 min-w-0 flex flex-col gap-1">
                            <p
                                className={`text-sm sm:text-base ${item.complete ? "text-[#6B7280] line-through" : "text-[#1F2937] font-medium"
                                    }`}
                            >
                                {item.label} {item.optional && <span className="text-xs sm:text-sm text-gray-400">(optional)</span>}
                            </p>
                            {!item.complete && (
                                <button
                                    className="mt-1 text-[#7B3FF2] hover:text-purple-600 font-semibold text-xs sm:text-sm transition-colors duration-300"
                                    aria-label={`Complete ${item.label}`}
                                    title="Complete this step"
                                >
                                    Complete →
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <p className="text-[#4B5563] text-sm sm:text-base leading-relaxed">
                Completing your profile ensures you get personalized recommendations and unlock all features.
            </p>
        </div>
    );
}



interface DashboardTabsProps {
    activeTab: string;
    setActiveTab: (tab: any) => void;
    showPostBrief: boolean;
    setShowPostBrief: (show: boolean) => void;
    /** Optional callback for posting brief (with subscription check) */
    onPostBrief?: () => void;
}

export function DashboardTabs({ activeTab, setActiveTab, showPostBrief, setShowPostBrief, onPostBrief }: DashboardTabsProps) {
    const { savedArchitects, savedProjects } = useEditContext();
    return (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center mb-10">
                <TabsList className="bg-white h-full w-full  border border-gray-200 rounded-xl p-3 inline-flex shadow-xl">
                    <TabsTrigger
                        value="dashboard"
                        className="data-[state=active]:bg-[#7A6BEB] data-[state=active]:text-white data-[state=inactive]:text-[#6B7280] data-[state=inactive]:bg-transparent rounded-lg px-6 py-2.5 text-sm font-semibold transition-all duration-300"
                    >
                        Dashboard
                    </TabsTrigger>
                    <TabsTrigger
                        value="saved-architects"
                        className="data-[state=active]:bg-[#7A6BEB] data-[state=active]:text-white data-[state=inactive]:text-[#6B7280] data-[state=inactive]:bg-transparent rounded-lg px-6 py-2.5 text-sm font-semibold transition-all duration-300"
                    >
                        Saved Architects ({savedArchitects.length})
                    </TabsTrigger>
                    <TabsTrigger
                        value="saved-projects"
                        className="data-[state=active]:bg-[#7A6BEB] data-[state=active]:text-white data-[state=inactive]:text-[#6B7280] data-[state=inactive]:bg-transparent rounded-lg px-6 py-2.5 text-sm font-semibold transition-all duration-300"
                    >
                        Saved Projects ({savedProjects.length})
                    </TabsTrigger>
                    <TabsTrigger
                        value="my-design-brief"
                        className="data-[state=active]:bg-[#7A6BEB] data-[state=active]:text-white data-[state=inactive]:text-[#6B7280] data-[state=inactive]:bg-transparent rounded-lg px-6 py-2.5 text-sm font-semibold transition-all duration-300"
                    >
                        My Design Brief
                    </TabsTrigger>
                </TabsList>
            </div>

            <TabsContent value="dashboard" className="mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <RecentActivity />
                    </div>
                    <div className="lg:col-span-1">
                        <div className="sticky top-30">
                            <ProfileProgress />
                        </div>
                    </div>
                </div>
            </TabsContent>

            <TabsContent value="saved-architects" className="mt-0">
                <SavedArchitects />
            </TabsContent>

            <TabsContent value="saved-projects" className="mt-0">
                <SavedProjects />
            </TabsContent>

            <TabsContent value="my-design-brief" className="mt-0">
                <DesignBriefs onPostBrief={onPostBrief || (() => setShowPostBrief(true))} />
            </TabsContent>
        </Tabs>
    );
}
