import axiosClient from "./axiosClient";

/**
 * Subscription API Client
 * -----------------------
 * Provides methods to interact with the subscription endpoints:
 *   - createOrder:         Create a Razorpay order for a paid plan
 *   - verifyPayment:       Verify payment and activate subscription
 *   - activateFreePlan:    Activate the free plan (no payment)
 *   - getUserSubscription: Fetch the user's active subscription
 *   - useCredit:           Consume one application credit
 *   - checkPortfolioLimit: Check if user can add more portfolio projects
 */

export const createOrder = async (userId, plan, billingPeriod, referralCode = null) => {
    const response = await axiosClient.post("/subscriptions/create-order", {
        userId,
        plan,
        billingPeriod,
        referralCode
    });
    return response.data;
};

/**
 * Verify Razorpay payment and activate the subscription.
 * @param {Object} paymentData - Contains razorpay_order_id, razorpay_payment_id,
 *                                razorpay_signature, userId, plan, billingPeriod
 * @returns {Promise<Object>} Subscription activation result
 */
export const verifyPayment = async (paymentData) => {
    const response = await axiosClient.post("/subscriptions/verify-payment", paymentData);
    return response.data;
};

/**
 * Activate the free plan for a user (no payment required).
 * @param {string} userId - The user's MongoDB _id
 * @returns {Promise<Object>} Free plan activation result
 */
export const activateFreePlan = async (userId) => {
    const response = await axiosClient.post("/subscriptions/activate-free", { userId });
    return response.data;
};

/**
 * Fetch the active subscription for a given user.
 * Returns free plan defaults if no subscription exists.
 * @param {string} userId - The user's MongoDB _id
 * @returns {Promise<Object>} Active subscription details
 */
export const getUserSubscription = async (userId) => {
    const response = await axiosClient.get(`/subscriptions/user/${userId}`);
    return response.data;
};

/**
 * Consume one application credit when user applies to a project.
 * Returns remaining credits or error if limit reached.
 * @param {string} userId - The user's MongoDB _id
 * @returns {Promise<Object>} Credit usage result with remaining count
 */
export const useCredit = async (userId) => {
    const response = await axiosClient.post("/subscriptions/use-credit", { userId });
    return response.data;
};

/**
 * Check if the user can add more portfolio projects under their plan.
 * @param {string} userId - The user's MongoDB _id
 * @returns {Promise<Object>} { canAdd, currentCount, maxProjects, plan }
 */
export const checkPortfolioLimit = async (userId) => {
    const response = await axiosClient.get(`/subscriptions/check-portfolio-limit/${userId}`);
    return response.data;
};

/**
 * Initiate a plan change (upgrade/downgrade).
 * For free plan: directly switches without payment.
 * For paid plans: returns a Razorpay order for payment.
 * @param {string} userId - The user's MongoDB _id
 * @param {string} newPlan - Target plan: free | starter | professional | premium
 * @param {string} billingPeriod - Billing cycle: monthly | quarterly | yearly
 * @returns {Promise<Object>} Order details or direct activation result
 */
export const changePlan = async (userId, newPlan, billingPeriod, referralCode = null) => {
    const response = await axiosClient.post("/subscriptions/change-plan", {
        userId,
        newPlan,
        billingPeriod,
        referralCode,
    });
    return response.data;
};

/**
 * Check if a client user can post project briefs.
 * Verifies active subscription, paid plan, and endDate not expired.
 * @param {string} userId - The user's MongoDB _id
 * @returns {Promise<Object>} { canPost, reason, message, plan, endDate }
 */
export const checkBriefAccess = async (userId) => {
    const response = await axiosClient.get(`/subscriptions/check-brief-access/${userId}`);
    return response.data;
};

/**
 * Verify Razorpay payment for a plan change and activate the new plan.
 * @param {Object} paymentData - Contains razorpay_order_id, razorpay_payment_id,
 *                                razorpay_signature, userId, newPlan, billingPeriod
 * @returns {Promise<Object>} Plan change verification result
 */
export const verifyPlanChange = async (paymentData) => {
    const response = await axiosClient.post("/subscriptions/verify-plan-change", paymentData);
    return response.data;
};

/**
 * Check if the client has a valid (paid, unused, not-expired) brief payment.
 * @param {string} userId - The user's MongoDB _id
 * @returns {Promise<Object>} { hasValidPayment, briefPaymentId, expiresAt }
 */
export const checkBriefPayment = async (userId) => {
    const response = await axiosClient.get(`/subscriptions/check-brief-payment/${userId}`);
    return response.data;
};

export const createBriefOrder = async (userId, referralCode = null) => {
    const response = await axiosClient.post("/subscriptions/create-brief-order", { userId, referralCode });
    return response.data;
};

export const verifyBriefPayment = async (paymentData) => {
    const response = await axiosClient.post("/subscriptions/verify-brief-payment", paymentData);
    return response.data;
};

/**
 * Validate a referral code and get its discount value.
 * @param {string} code - The alphanumeric referral code
 * @returns {Promise<Object>} { success, discount, code, message }
 */
export const validateReferralCode = async (code) => {
    const response = await axiosClient.post("/referrals/validate", { code });
    return response.data;
};
