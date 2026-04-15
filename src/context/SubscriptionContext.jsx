import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "./AuthContext";
import {
    getUserSubscription,
    useCredit as useCreditApi,
    checkPortfolioLimit as checkPortfolioLimitApi,
    checkBriefAccess as checkBriefAccessApi,
    changePlan as changePlanApi,
    verifyPlanChange as verifyPlanChangeApi,
} from "../api/subscriptionApi";
import { toast } from "react-toastify";

/**
 * SubscriptionContext
 * -------------------
 * Provides subscription state and helper methods to all child components.
 * Automatically fetches the active subscription when the user is authenticated.
 *
 * Exposed values:
 *   - subscription:        Current active subscription object
 *   - loading:             Whether subscription data is being fetched
 *   - refreshSubscription: Re-fetch subscription from server
 *   - useApplicationCredit: Consume one application credit
 *   - canAddPortfolio:     Check if user can add more portfolio projects
 *   - checkBriefAccess:    Check if client can post project briefs
 *   - changePlan:          Initiate a plan change (upgrade/downgrade)
 *   - getRemainingCredits: Get remaining application credits for the month
 *   - getPlanName:         Get human-readable plan name
 */
const SubscriptionContext = createContext(null);

export const SubscriptionProvider = ({ children }) => {
    const { user, isAuthenticated } = useAuth();
    const [subscription, setSubscription] = useState(null);
    const [loading, setLoading] = useState(false);

    /**
     * Fetch the user's active subscription from the server.
     * Called on mount and whenever the user changes.
     */
    const refreshSubscription = useCallback(async () => {
        if (!user?._id) return;

        setLoading(true);
        try {
            const data = await getUserSubscription(user._id);
            if (data.success) {
                setSubscription(data.subscription);
            }
        } catch (error) {
            console.error("Error fetching subscription:", error);
            // Default to free plan on error
            setSubscription({
                plan: "free",
                maxPortfolioProjects: 2,
                maxApplicationsPerMonth: 0,
                applicationsUsed: 0,
                canApplyToProjects: false,
                canContactClients: false,
                canPostBriefs: false,
                hasProfileAnalytics: false,
                hasPrioritySupport: false,
                hasBadgeEligibility: false,
            });
        } finally {
            setLoading(false);
        }
    }, [user?._id]);

    // Auto-fetch subscription when user authenticates
    useEffect(() => {
        if (isAuthenticated && user?._id) {
            refreshSubscription();
        } else {
            setSubscription(null);
        }
    }, [isAuthenticated, user?._id, refreshSubscription]);

    /**
     * Consume one application credit when user applies to a project.
     * Shows toast messages for success/failure.
     * @returns {Promise<boolean>} true if credit was used successfully
     */
    const useApplicationCredit = async () => {
        if (!user?._id) {
            toast.error("Please sign in to apply to projects");
            return false;
        }

        try {
            const data = await useCreditApi(user._id);
            if (data.success) {
                // Update local subscription state
                setSubscription((prev) => ({
                    ...prev,
                    applicationsUsed: data.applicationsUsed,
                }));
                toast.success(`Application submitted! ${data.remaining} credits remaining this month.`);
                return true;
            }
            return false;
        } catch (error) {
            const message = error.response?.data?.message || "Failed to use application credit";
            toast.error(message);
            return false;
        }
    };

    /**
     * Check if the user can add more portfolio projects.
     * @returns {Promise<Object>} { canAdd, currentCount, maxProjects }
     */
    const canAddPortfolio = async () => {
        if (!user?._id) return { canAdd: false, currentCount: 0, maxProjects: 2 };

        try {
            const data = await checkPortfolioLimitApi(user._id);
            return data;
        } catch (error) {
            console.error("Error checking portfolio limit:", error);
            return { canAdd: false, currentCount: 0, maxProjects: 2 };
        }
    };

    /**
     * Check if the user can post project briefs (client subscription gate).
     * Verifies active paid subscription and endDate not expired.
     * @returns {Promise<Object>} { canPost, reason, message, plan, endDate }
     */
    const checkBriefAccess = async () => {
        if (!user?._id) return { canPost: false, reason: "not_authenticated", message: "Please sign in" };

        try {
            const data = await checkBriefAccessApi(user._id);
            return data;
        } catch (error) {
            console.error("Error checking brief access:", error);
            return { canPost: false, reason: "error", message: "Failed to check subscription" };
        }
    };

    /**
     * Get remaining application credits for the current month.
     * @returns {number} remaining credits
     */
    const getRemainingCredits = () => {
        if (!subscription) return 0;
        return Math.max(0, subscription.maxApplicationsPerMonth - (subscription.applicationsUsed || 0));
    };

    /**
     * Get human-readable plan display name.
     * @returns {string} plan name with first letter capitalized
     */
    const getPlanName = () => {
        if (!subscription) return "Free";
        return subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1);
    };

    /**
     * Initiate a plan change (upgrade/downgrade).
     * For free plan: directly switches and refreshes subscription.
     * For paid plans: returns Razorpay order data for payment flow.
     * @param {string} newPlan - Target plan name
     * @param {string} billingPeriod - Billing cycle
     * @returns {Promise<Object>} API response with order or activation result
     */
    const changePlan = async (newPlan, billingPeriod = "monthly") => {
        if (!user?._id) {
            toast.error("Please sign in to change your plan");
            return null;
        }

        try {
            const data = await changePlanApi(user._id, newPlan, billingPeriod);

            // If switching to free, subscription is already activated server-side
            if (newPlan === "free" && data.success && data.subscription) {
                await refreshSubscription();
                toast.success("Switched to Free plan successfully");
            }

            return data;
        } catch (error) {
            const message = error.response?.data?.message || "Failed to change plan";
            toast.error(message);
            return null;
        }
    };

    /**
     * Verify Razorpay payment for a plan change and refresh subscription.
     * @param {Object} paymentData - Razorpay payment verification data
     * @returns {Promise<Object>} Verification result
     */
    const verifyPlanChange = async (paymentData) => {
        try {
            const data = await verifyPlanChangeApi(paymentData);
            if (data.success) {
                await refreshSubscription();
                toast.success(data.message || "Plan changed successfully!");
            }
            return data;
        } catch (error) {
            const message = error.response?.data?.message || "Plan change verification failed";
            toast.error(message);
            return null;
        }
    };

    const value = {
        subscription,
        loading,
        refreshSubscription,
        useApplicationCredit,
        canAddPortfolio,
        checkBriefAccess,
        getRemainingCredits,
        getPlanName,
        changePlan,
        verifyPlanChange,
    };

    return (
        <SubscriptionContext.Provider value={value}>
            {children}
        </SubscriptionContext.Provider>
    );
};

/**
 * Custom hook to access subscription context.
 * Must be used within a SubscriptionProvider.
 */
export const useSubscription = () => {
    const context = useContext(SubscriptionContext);
    if (!context) {
        throw new Error("useSubscription must be used within a SubscriptionProvider");
    }
    return context;
};

export default SubscriptionContext;
