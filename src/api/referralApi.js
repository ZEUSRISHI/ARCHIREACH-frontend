import axiosClient from "./axiosClient";

// Get user's referral code and link
export const getMyReferralCode = async () => {
    const response = await axiosClient.get("/referrals/my-code");
    return response.data;
};

// Get user's referral statistics
export const getMyReferralStats = async () => {
    const response = await axiosClient.get("/referrals/stats");
    return response.data;
};

// Validate a referral code (before registration)
export const validateReferralCode = async (referralCode) => {
    const response = await axiosClient.post("/referrals/validate-user-referral", {
        referralCode,
    });
    return response.data;
};

// Apply referral code (after registration)
export const applyReferralCode = async (referralCode, newUserId) => {
    const response = await axiosClient.post("/referrals/apply", {
        referralCode,
        newUserId,
    });
    return response.data;
};

// Admin: Get all users with referral data
export const getAllReferralData = async () => {
    const response = await axiosClient.get("/referrals/admin/all");
    return response.data;
};

// Admin: Get referral statistics summary
export const getReferralSummary = async () => {
    const response = await axiosClient.get("/referrals/admin/summary");
    return response.data;
};

export default {
    getMyReferralCode,
    getMyReferralStats,
    validateReferralCode,
    applyReferralCode,
    getAllReferralData,
    getReferralSummary,
};
