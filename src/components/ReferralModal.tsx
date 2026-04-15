import React, { useState, useEffect } from "react";
import { Copy, Check, X, Users, Link as LinkIcon, Share2 } from "lucide-react";
import { getMyReferralCode } from "../api/referralApi";
import { toast } from "react-toastify";

interface ReferredUser {
    fullName?: string;
    email?: string;
    userType?: string;
    _id?: string;
}

interface ReferralData {
    referralCode: string;
    referralLink: string;
    referralCount: number;
    referredUsers: ReferredUser[];
}

const ReferralModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [referralData, setReferralData] = useState<ReferralData | null>(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);
    const [activeTab, setActiveTab] = useState<"link" | "stats">("link");

    useEffect(() => {
        if (isOpen) {
            fetchReferralData();
        }
    }, [isOpen]);

    const fetchReferralData = async () => {
        try {
            setLoading(true);
            const response = await getMyReferralCode();
            if (response.success) {
                setReferralData(response.data);
            }
        } catch (error) {
            console.error("Error fetching referral data:", error);
            toast.error("Failed to load referral data");
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = async () => {
        if (referralData?.referralLink) {
            try {
                await navigator.clipboard.writeText(referralData.referralLink);
                setCopied(true);
                toast.success("Referral link copied to clipboard!");
                setTimeout(() => setCopied(false), 2000);
            } catch (error) {
                toast.error("Failed to copy link");
            }
        }
    };

    const shareReferral = async () => {
        if (referralData?.referralLink) {
            const shareData = {
                title: "Join me on AN Industries!",
                text: `Use my referral link to sign up for AN Industries - The Architecture Platform`,
                url: referralData.referralLink,
            };

            if (navigator.share) {
                try {
                    await navigator.share(shareData);
                } catch (error: any) {
                    if (error.name !== "AbortError") {
                        copyToClipboard();
                    }
                }
            } else {
                copyToClipboard();
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-[#7A6BEB] to-[#6c5fe0] px-6 py-5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white/20 rounded-lg">
                                <Share2 className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white">Referral Program</h2>
                                <p className="text-white/80 text-sm">
                                    Invite friends & earn rewards
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5 text-white" />
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b">
                    <button
                        onClick={() => setActiveTab("link")}
                        className={`flex-1 py-3 text-sm font-semibold transition-colors ${activeTab === "link"
                                ? "text-[#7A6BEB] border-b-2 border-[#7A6BEB]"
                                : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        <LinkIcon className="w-4 h-4 inline-block mr-2" />
                        Get Link
                    </button>
                    <button
                        onClick={() => setActiveTab("stats")}
                        className={`flex-1 py-3 text-sm font-semibold transition-colors ${activeTab === "stats"
                                ? "text-[#7A6BEB] border-b-2 border-[#7A6BEB]"
                                : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        <Users className="w-4 h-4 inline-block mr-2" />
                        My Stats
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {loading ? (
                        <div className="flex items-center justify-center py-8">
                            <div className="w-8 h-8 border-4 border-[#7A6BEB] border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : activeTab === "link" ? (
                        <div className="space-y-4">
                            {/* Referral Code Display */}
                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                                    Your Referral Code
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-bold text-[#7A6BEB] tracking-wider">
                                        {referralData?.referralCode || "Loading..."}
                                    </span>
                                    <button
                                        onClick={copyToClipboard}
                                        className="p-2 bg-[#7A6BEB] text-white rounded-lg hover:bg-[#6c5fe0] transition-colors"
                                        title="Copy code"
                                    >
                                        {copied ? (
                                            <Check className="w-4 h-4" />
                                        ) : (
                                            <Copy className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Referral Link */}
                            <div>
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                                    Share This Link
                                </p>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        readOnly
                                        value={referralData?.referralLink || ""}
                                        className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none"
                                    />
                                    <button
                                        onClick={copyToClipboard}
                                        className="px-4 py-2 bg-[#7A6BEB] text-white rounded-lg hover:bg-[#6c5fe0] transition-colors flex items-center gap-2"
                                    >
                                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                        {copied ? "Copied!" : "Copy"}
                                    </button>
                                </div>
                            </div>

                            {/* Share Button */}
                            <button
                                onClick={shareReferral}
                                className="w-full py-3 bg-gradient-to-r from-[#7A6BEB] to-[#6c5fe0] text-white font-semibold rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
                            >
                                <Share2 className="w-5 h-5" />
                                Share via Apps
                            </button>

                            <p className="text-xs text-gray-500 text-center">
                                When someone signs up using your link, they'll be connected to your
                                account!
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {/* Stats Cards */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gradient-to-br from-[#7A6BEB]/10 to-[#7A6BEB]/5 rounded-xl p-4 border border-[#7A6BEB]/20">
                                    <div className="text-3xl font-bold text-[#7A6BEB]">
                                        {referralData?.referralCount || 0}
                                    </div>
                                    <p className="text-sm text-gray-600">Total Referrals</p>
                                </div>
                                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
                                    <div className="text-3xl font-bold text-green-600">
                                        {referralData?.referredUsers?.filter((u: any) => u).length || 0}
                                    </div>
                                    <p className="text-sm text-gray-600">Signed Up</p>
                                </div>
                            </div>

                            {/* Referred Users List */}
                            <div>
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                                    Recent Referrals
                                </p>
                                <div className="max-h-48 overflow-y-auto space-y-2">
                                    {referralData?.referredUsers && referralData.referredUsers.length > 0 ? (
                                        referralData.referredUsers
                                            .filter((u: any) => u)
                                            .map((user: any, index: number) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                                                >
                                                    <div className="w-8 h-8 bg-[#7A6BEB]/20 rounded-full flex items-center justify-center">
                                                        <span className="text-[#7A6BEB] font-bold text-sm">
                                                            {user.fullName?.[0] || "?"}
                                                        </span>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-gray-900 truncate">
                                                            {user.fullName || "Unknown"}
                                                        </p>
                                                        <p className="text-xs text-gray-500 truncate">
                                                            {user.email || "No email"}
                                                        </p>
                                                    </div>
                                                    <span className="text-xs text-green-600 font-medium">
                                                        {user.userType || "User"}
                                                    </span>
                                                </div>
                                            ))
                                    ) : (
                                        <div className="text-center py-8 text-gray-500">
                                            <Users className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                                            <p className="text-sm">No referrals yet</p>
                                            <p className="text-xs">
                                                Share your link to start earning!
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReferralModal;
