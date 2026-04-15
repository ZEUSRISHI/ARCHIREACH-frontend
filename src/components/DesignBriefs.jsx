import { useState, useEffect } from "react";
import { Plus, Clock, MapPin, MessageSquare, ChevronRight, Briefcase } from "lucide-react";
import axiosClient from "../api/axiosClient";
import { useAuth } from "../hooks/useAuth";

export function DesignBriefs({ onPostBrief }) {
    const { user } = useAuth();
    const [briefs, setBriefs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBriefs = async () => {
            if (!user?._id) return;
            try {
                const response = await axiosClient.get(`/project-briefs/client/${user._id}`);
                if (response.data.success) {
                    setBriefs(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching briefs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBriefs();
    }, [user]);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 border-4 border-[#7a6beb] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (briefs.length === 0) {
        return (
            <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-12 text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Design Briefs Yet</h3>
                <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                    Post your first design brief to start receiving proposals from talented architects.
                </p>
                <button
                    onClick={onPostBrief}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#7a6beb] text-white rounded-xl font-bold hover:bg-[#6c5fe0] transition-all"
                >
                    <Plus className="w-5 h-5" />
                    Post a Design Brief
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Your Design Briefs</h3>
                <button
                    onClick={onPostBrief}
                    className="flex items-center gap-2 px-4 py-2 bg-[#7a6beb] text-white rounded-lg text-sm font-bold hover:bg-[#6c5fe0] transition-all"
                >
                    <Plus className="w-4 h-4" />
                    New Brief
                </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {briefs.map((brief) => (
                    <div
                        key={brief._id}
                        className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all group cursor-pointer"
                    >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${(brief.status ?? '') === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                                        }`}>
                                        {brief.status ?? '—'}
                                    </span>
                                    <span className="text-xs text-gray-400 flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {brief.createdAt ? new Date(brief.createdAt).toLocaleDateString() : '—'}
                                    </span>
                                </div>
                                <h4 className="text-lg font-bold text-gray-900 group-hover:text-[#7a6beb] transition-colors mb-2">
                                    {brief.title ?? 'Untitled Brief'}
                                </h4>
                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                                    <div className="flex items-center gap-1.5">
                                        <MapPin className="w-4 h-4 text-gray-400" />
                                        {brief.location?.city ?? '—'}, {brief.location?.state ?? '—'}
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Briefcase className="w-4 h-4 text-gray-400" />
                                        {brief.projectType ?? '—'}
                                    </div>
                                    <div className="flex items-center gap-1.5 font-semibold text-[#7a6beb]">
                                        <MessageSquare className="w-4 h-4" />
                                        {brief.proposalCount ?? 0} Proposals
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right hidden md:block">
                                    <div className="text-xs text-gray-400 mb-1">Budget Range</div>
                                    <div className="font-bold text-gray-900">
                                        ₹{(brief.budget?.min ?? 0).toLocaleString()} - ₹{(brief.budget?.max ?? 0).toLocaleString()}
                                    </div>
                                </div>
                                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#7a6beb] transition-all transform group-hover:translate-x-1" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
