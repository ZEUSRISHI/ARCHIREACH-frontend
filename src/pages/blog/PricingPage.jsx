import React, { useState, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useSubscription } from '../../context/SubscriptionContext';
import { createOrder, verifyPayment, activateFreePlan, changePlan as changePlanApi, verifyPlanChange as verifyPlanChangeApi, createBriefOrder, verifyBriefPayment, validateReferralCode } from '../../api/subscriptionApi';
import { toast } from 'react-toastify';
import Footer from '../../components/Footer';
import { ChevronDownIcon, TicketIcon, XMarkIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import Reveal from '../../components/Reveal';
import NavbarAll from '../../components/NavbarAll';

/**
 * ReferralModal Component
 * ----------------------
 * Allows users to enter and validate a referral code before payment.
 */
const ReferralModal = ({ isOpen, onClose, onApply, onSkip, plan, billingPeriod }) => {
  const [code, setCode] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!isOpen) return null;

  const handleValidate = async () => {
    if (!code) {
      setError('Please enter a code');
      return;
    }
    setIsValidating(true);
    setError('');
    setSuccess('');
    try {
      const data = await validateReferralCode(code);
      if (data.success) {
        setSuccess(`Success! ₹${data.discount} discount applied.`);
        setTimeout(() => {
          onApply(code, data.discount);
        }, 1500);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid or expired code');
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors">
          <XMarkIcon className="w-6 h-6 text-gray-500" />
        </button>

        <div className="p-8">
          <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 mx-auto">
            <TicketIcon className="w-8 h-8 text-purple-600" />
          </div>

          <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">Have a Referral Code?</h3>
          <p className="text-gray-500 text-center mb-8">Enter your 7-character code to get a discount on your purchase.</p>

          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="ENTER CODE"
                maxLength={7}
                className={`w-full px-6 py-4 bg-gray-50 border-2 rounded-xl text-lg font-mono font-bold tracking-widest outline-none transition-all ${error ? 'border-red-300 focus:border-red-500' :
                  success ? 'border-green-300 focus:border-green-500' :
                    'border-gray-100 focus:border-purple-500'
                  }`}
              />
              {success && <CheckCircleIcon className="w-6 h-6 text-green-500 absolute right-4 top-1/2 -translate-y-1/2" />}
            </div>

            {error && <p className="text-red-500 text-sm font-medium text-center">{error}</p>}
            {success && <p className="text-green-600 text-sm font-medium text-center">{success}</p>}

            <button
              onClick={handleValidate}
              disabled={isValidating || success}
              className="w-full py-4 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isValidating ? 'Validating...' : 'Apply Code'}
            </button>

            <button
              onClick={onSkip}
              className="w-full py-4 text-gray-500 font-semibold hover:text-gray-700 transition-colors"
            >
              Continue Without Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * FAQAccordion Component
 * ----------------------
 * Renders a collapsible FAQ section with smooth animations.
 * @param {Array} faqs - Array of { question, answer } objects
 */
function FAQAccordion({ faqs }) {
  const [openIndex, setOpenIndex] = useState(null);

  /** Toggle FAQ item open/closed */
  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2
          className="text-[40px] leading-tight font-semibold text-gray-800 mb-12"
          style={{ fontFamily: "'FS Dillon', sans-serif" }}
        >
          Frequently Asked Questions
        </h2>

        <div className="flex flex-col gap-4 text-left max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl shadow-md cursor-pointer hover:shadow-lg transition-all duration-500 overflow-hidden border-l-4 ${openIndex === index ? "border-purple-600" : "border-transparent"
                }`}
              onClick={() => toggle(index)}
            >
              <div className="flex justify-between items-center p-6">
                <div className="text-[18px] leading-tight font-normal text-gray-800 flex-1 pr-4">
                  {faq.question}
                </div>
                <ChevronDownIcon
                  className={`h-6 w-6 text-gray-600 transform transition-transform duration-500 flex-shrink-0 ${openIndex === index ? "rotate-180" : "rotate-0"
                    }`}
                />
              </div>

              <div
                className={`px-6 pb-6 text-gray-600 text-sm leading-relaxed whitespace-pre-line transition-all duration-500 ease-in-out overflow-hidden ${openIndex === index ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
                  }`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * PricingPage Component
 * ---------------------
 * Main pricing page with plan selection, Razorpay payment integration,
 * and authentication-gated checkout flow.
 *
 * Flow:
 *   1. User selects a plan and clicks CTA button
 *   2. If not signed in → redirect to /signin with return URL
 *   3. If signed in and free plan → activate free plan directly
 *   4. If signed in and paid plan → create Razorpay order → open payment modal
 *   5. On successful payment → verify on server → redirect to /dashboard
 *   6. Server sends notification to admin panel
 *
 * Plan Conditions:
 *   - Free:         2 portfolio projects, 0 applications, read-only briefs
 *   - Starter:      5 portfolio projects, 5 applications/month
 *   - Professional: 15 portfolio projects, 10 applications/month
 *   - Premium:      30 portfolio projects, 10 applications/month
 */
const PricingPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, isAuthenticated } = useAuth();
  const { subscription, refreshSubscription } = useSubscription();

  // Auto-select client category when redirected from client dashboard (?category=client)
  const initialCategory = searchParams.get('category') === 'client' ? 'client' : 'architect';

  const [billingPeriod, setBillingPeriod] = useState('monthly');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [isProcessing, setIsProcessing] = useState(false);

  // Referral states
  const [showReferralModal, setShowReferralModal] = useState(false);
  const [activeReferralCode, setActiveReferralCode] = useState(null);
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [pendingPlanForReferral, setPendingPlanForReferral] = useState(null);

  /**
   * Get the correct dashboard route based on user type.
   * Maps userType to the corresponding dashboard path.
   * @returns {string} Dashboard route path
   */
  const getDashboardRoute = () => {
    const type = user?.userType || user?.role || '';
    switch (type.toLowerCase()) {
      case 'client': return '/pages/blog/ClientDash';
      case 'student': return '/pages/blog/StudentDash';
      case 'college': return '/pages/blog/CollegeDash';
      case 'brand': return '/pages/blog/BrandDash';
      case 'architect': return '/pages/blog/ArchitectDash';
      case 'firm':
      default: return '/pages/blog/FirmDash';
    }
  };

  /* ─── Plans Data Configuration ─── */
  const plansData = {
    architect: [
      {
        name: 'Free — Discovery Plan',
        planKey: 'free', // key used for API calls
        basePrice: 0,
        description: 'Explore the platform and get discovered',
        features: [
          'Public profile listing',
          'Basic visibility in search',
          'Add up to 2 portfolio projects',
          'View live project briefs (read-only)',
          'Explore architects, clients & brands',
          '❌ Cannot apply to projects',
          '❌ No direct client contact',
          'Upgrade anytime to start applying to projects',
        ],
        cta: 'Get Started',
        popular: false,
      },
      {
        name: 'Starter',
        planKey: 'starter',
        basePrice: 299,
        description: 'For independent and new practices',
        features: [
          'Full professional profile',
          'Portfolio with up to 5 projects',
          'Apply to 5 live projects per month',
          'Direct client communication',
          'Standard support',
          'No commission on projects',
        ],
        cta: 'Start Subscription',
        popular: false,
      },
      {
        name: 'Professional',
        planKey: 'professional',
        basePrice: 599,
        description: 'For growing studios',
        features: [
          'Portfolio with up to 15 projects',
          'Apply to 10 live projects per month',
          'Improved discoverability',
          'Profile analytics',
          'Email support',
          'Best balance of cost and opportunity',
        ],
        cta: 'Most Popular',
        popular: true,
      },
      {
        name: 'Premium',
        planKey: 'premium',
        basePrice: 799,
        description: 'For established practices',
        features: [
          'Portfolio with up to 30 projects',
          'Apply to 10 live projects per month',
          'Maximum visibility across relevant searches',
          'Advanced analytics',
          'Badge eligibility',
          'Priority support',
          'Built for consistent enquiries',
        ],
        cta: 'Go Premium',
        popular: false,
      },
    ],
    client: [
      {
        name: 'FREE — Browse & Discover',
        planKey: 'free',
        basePrice: 0,
        description: 'Explore architects before posting a project',
        features: [
          '✔ Browse verified architects & interior designers',
          '✔ View portfolios, experience & specializations',
          '✔ Shortlist professionals',
          '✔ Compare profiles before posting a project',
          'Post a project to connect with architects',
        ],
        cta: 'Join Now',
        popular: false,
        isFreeClient: true,
      },
      {
        name: 'Post a Project',
        planKey: 'brief_post',
        basePrice: 99,
        perPost: true,
        description: 'Pay only when you post — ₹99 per brief, no subscription',
        features: [
          '✔ One project brief posting',
          '✔ 7-day live listing to verified architects',
          '✔ Receive proposals within 24 hours',
          '✔ Direct contact with professionals',
          '✔ No commission on hiring',
          '✔ Pay again only when you post next',
        ],
        cta: 'Pay ₹99 & Post Brief',
        popular: true,
      },
    ],
  };

  /** Determine which plans to display based on selected category */
  const pricingPlans =
    selectedCategory === 'architect'
      ? plansData.architect
      : plansData.client;

  /**
   * Calculate display price based on billing period.
   * For architect plans: applies quarterly (5% off) and yearly (20% off) discounts.
   * For client plans: uses basePrice directly (already set per billing period).
   * @param {Object} plan - Plan object with basePrice
   * @returns {{ price: string, period: string }}
   */
  const calculatePrice = (plan) => {
    if (plan.basePrice === 0) return { price: '₹0', period: '' };
    if (plan.basePrice === null) return { price: 'Custom', period: '' };

    const basePrice = plan.basePrice;
    let price, period;

    // Client per-post plans: flat ₹99 per brief
    if (plan.perPost) {
      return { price: '₹99', period: 'per post' };
    }

    // Architect plans: apply billing period multipliers
    switch (billingPeriod) {
      case 'quarterly':
        price = Math.round(basePrice * 3 * 0.95);
        period = 'quarter';
        break;
      case 'yearly':
        price = Math.round(basePrice * 12 * 0.8);
        period = 'year';
        break;
      default:
        price = basePrice;
        period = 'month';
    }

    return {
      price: `₹${price.toLocaleString('en-IN')}`,
      period: period,
    };
  };

  /**
   * Load Razorpay checkout script dynamically.
   * @returns {Promise<boolean>} true if script loaded successfully
   */
  const loadRazorpayScript = useCallback(() => {
    return new Promise((resolve) => {
      // Check if already loaded
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }, []);

  /**
   * Handle Razorpay payment flow for subscriptions.
   */
  const handleRazorpayPayment = async (plan, referralCode = null) => {
    setIsProcessing(true);
    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        toast.error('Failed to load payment gateway');
        setIsProcessing(false);
        return;
      }

      const orderData = await createOrder(user._id, plan.planKey, billingPeriod, referralCode);

      const options = {
        key: orderData.key,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: 'Archireach',
        description: `${plan.name} Subscription (${billingPeriod})`,
        order_id: orderData.order.id,
        prefill: {
          name: user.fullName || orderData.user.name,
          email: user.email || orderData.user.email,
        },
        handler: async (response) => {
          try {
            const verifyData = await verifyPayment({
              ...response,
              userId: user._id,
              plan: plan.planKey,
              billingPeriod,
            });

            if (verifyData.success) {
              toast.success('Subscription activated successfully!');
              refreshSubscription();
              setTimeout(() => navigate(getDashboardRoute()), 1500);
            }
          } catch (error) {
            toast.error(error.response?.data?.message || 'Payment verification failed');
          } finally {
            setIsProcessing(false);
          }
        },
        modal: { ondismiss: () => setIsProcessing(false) },
        theme: { color: '#7a6beb' },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to initiate payment');
      setIsProcessing(false);
    }
  };

  /**
   * Handle ₹99 per-post payment flow for clients.
   */
  const handleBriefPostPayment = async (referralCode = null) => {
    setIsProcessing(true);
    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        toast.error('Failed to load payment gateway');
        setIsProcessing(false);
        return;
      }

      const data = await createBriefOrder(user._id, referralCode);

      const options = {
        key: data.key,
        amount: data.order.amount,
        currency: data.order.currency,
        name: 'Archireach',
        description: 'Single Project Brief Post',
        order_id: data.order.id,
        prefill: {
          name: user.fullName,
          email: user.email,
        },
        handler: async (response) => {
          try {
            const verifyData = await verifyBriefPayment({
              ...response,
              userId: user._id
            });

            if (verifyData.success) {
              toast.success('Payment successful! You can now post your brief.');
              navigate('/pages/blog/ClientDash?openPostBrief=true');
            }
          } catch (err) {
            toast.error(err.response?.data?.message || 'Verification failed');
          } finally {
            setIsProcessing(false);
          }
        },
        modal: { ondismiss: () => setIsProcessing(false) },
        theme: { color: '#7a6beb' }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to start payment');
      setIsProcessing(false);
    }
  };

  /**
   * Handle changing a plan (Upgrade/Downgrade).
   */
  const handlePlanChange = async (plan, referralCode = null) => {
    setIsProcessing(true);
    try {
      // If downgrading to free, no payment needed
      if (plan.planKey === 'free' || plan.basePrice === 0) {
        const data = await activateFreePlan(user._id);
        if (data.success) {
          toast.success('Switched to Free plan successfully!');
          await refreshSubscription();
          navigate(getDashboardRoute());
        }
        setIsProcessing(false);
        return;
      }

      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        toast.error('Failed to load payment gateway');
        setIsProcessing(false);
        return;
      }

      const data = await changePlanApi(user._id, plan.planKey, billingPeriod, referralCode);

      if (data.order) {
        const options = {
          key: data.key,
          amount: data.order.amount,
          currency: data.order.currency,
          name: 'Archireach',
          description: `Switching to ${plan.name}`,
          order_id: data.order.id,
          prefill: {
            name: user.fullName,
            email: user.email,
          },
          handler: async (response) => {
            try {
              const verifyData = await verifyPlanChangeApi({
                ...response,
                userId: user._id,
                newPlan: plan.planKey,
                billingPeriod,
              });

              if (verifyData.success) {
                toast.success(`Plan updated to ${plan.name}!`);
                refreshSubscription();
                setTimeout(() => navigate(getDashboardRoute()), 1500);
              }
            } catch (err) {
              toast.error(err.response?.data?.message || 'Plan switch verification failed');
            } finally {
              setIsProcessing(false);
            }
          },
          modal: { ondismiss: () => setIsProcessing(false) },
          theme: { color: '#7a6beb' },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        toast.success(`Plan updated to ${plan.name}!`);
        refreshSubscription();
        setIsProcessing(false);
        navigate(getDashboardRoute());
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Plan change failed');
      setIsProcessing(false);
    }
  };

  /**
   * Handle free plan activation.
   */
  const handleFreePlanActivation = async () => {
    setIsProcessing(true);
    try {
      const data = await activateFreePlan(user._id);
      if (data.success) {
        toast.success('Free plan activated!');
        refreshSubscription();
        navigate(getDashboardRoute());
      }
    } catch (error) {
      toast.error('Failed to activate free plan');
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * Main CTA click handler.
   */
  const handleCTAClick = (plan) => {
    if (!isAuthenticated || !user) {
      sessionStorage.setItem('pendingPlan', JSON.stringify({
        planKey: plan.planKey,
        billingPeriod,
        category: selectedCategory,
      }));
      toast.info('Please sign in to continue');
      navigate('/signin?redirect=/pricing');
      return;
    }

    if (plan.isFreeClient) {
      navigate('/pages/blog/ClientDash');
      return;
    }

    // Step 3: Show referral modal for ANY paid action
    if (plan.basePrice > 0 || plan.planKey === 'brief_post' || plan.perPost) {
      setPendingPlanForReferral(plan);
      setShowReferralModal(true);
      return;
    }

    // Free plan activation
    if (plan.planKey === 'free' || plan.basePrice === 0) {
      handleFreePlanActivation();
      return;
    }

    // Architect paid plans (direct, if any)
    const currentPlan = subscription?.plan || 'free';
    const currentBilling = subscription?.billingPeriod || 'monthly';
    if (currentPlan === plan.planKey && currentBilling === billingPeriod) {
      toast.info('You are already on this plan');
      return;
    }

    if (subscription && subscription.plan && subscription.plan !== 'free') {
      handlePlanChange(plan);
    } else {
      handleRazorpayPayment(plan);
    }
  };

  /**
   * Final Step: Carry out the payment with referral discount applied.
   */
  const handleContinueWithReferral = (appliedCode = null, discount = 0) => {
    const plan = pendingPlanForReferral;
    setShowReferralModal(false);
    setPendingPlanForReferral(null);

    if (!plan) return;

    if (plan.planKey === 'brief_post' || plan.perPost) {
      handleBriefPostPayment(appliedCode);
    } else {
      const currentPlan = subscription?.plan || 'free';
      if (subscription && subscription.plan && currentPlan !== 'free') {
        handlePlanChange(plan, appliedCode);
      } else {
        handleRazorpayPayment(plan, appliedCode);
      }
    }
  };

  /* ─── FAQ Data ─── */
  const faqs = [
    {
      question: 'What does my Archireach subscription include?',
      answer:
        'Every plan includes a professional public profile, portfolio hosting, and access to live projects posted by clients. Paid plans allow you to apply to projects, communicate with clients directly, and showcase more work through an expanded portfolio.',
    },
    {
      question: 'Do you charge any commission on projects?',
      answer:
        'No. Archireach does not charge any commission. You keep 100% of your project fees. Pricing is simple and flat, with no hidden charges.',
    },
    {
      question: 'How is Archireach priced so affordably?',
      answer:
        'Archireach is priced lower than basic website hosting and even OTT subscriptions. Instead of spending repeatedly on ads or marketing, you get consistent visibility and access to real projects inside a focused architecture marketplace.',
    },
    {
      question: 'How does Archireach compare to social media ads or building a website?',
      answer:
        'Social media ads require continuous spending with unpredictable results, while websites depend heavily on SEO, traffic, and ongoing maintenance.\n\nArchireach gives you steady exposure inside a marketplace where clients are actively searching for architects and interior designers.',
    },
    {
      question: 'Can I upgrade or downgrade my plan later?',
      answer:
        'Yes. You can upgrade your plan at any time, and the changes apply immediately. Downgrades take effect from the next billing cycle, allowing you to use your current plan benefits until then.',
    },
    {
      question: 'Is Archireach suitable for new or small practices?',
      answer:
        'Yes. Archireach is ideal for new and growing practices that want visibility, credibility, and access to project enquiries without heavy marketing costs.',
    },
    {
      question: 'How do payments work?',
      answer:
        'Subscriptions are billed monthly. You can pay securely using UPI, cards, or net banking through Razorpay. You can cancel anytime before the next billing date to avoid renewal.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="relative w-full pt-4">
        {/* Half-background starting from page top, full width */}
        <div className="absolute top-0 left-0 w-full sm:h-[50vh] md:h-[90vh] bg-[#ECEBFB] z-0"></div>

        <div className="pricing-page-typography">
          <style>{`
            .pricing-page-typography {
              font-family: 'Public Sans', sans-serif !important;
              font-weight: 400 !important;
            }
            .pricing-page-typography h1,
            .pricing-page-typography h2 {
              font-family: 'FS Dillon', sans-serif !important;
              font-size: 40px !important;
              font-weight: 600 !important;
              line-height: 1.1 !important;
            }
            .pricing-page-typography h3,
            .pricing-page-typography h4 {
              font-family: 'Public Sans', sans-serif !important;
              font-size: 36px !important;
              line-height: 1.15 !important;
            }
            .pricing-page-typography .pricing-h3-40 {
              font-size: 40px !important;
              font-weight: 600 !important;
            }
            .pricing-page-typography p,
            .pricing-page-typography li {
              font-family: 'Public Sans', sans-serif !important;
              font-size: 16px !important;
              line-height: 1.5 !important;
            }
          `}</style>

          <main className="relative w-full">
            <NavbarAll />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 relative z-10">
              {/* Hero Section */}
              <header className="text-center -mt-4 mb-8 sm:mb-10 lg:mb-12">
                <Reveal
                  as="h1"
                  delay={0}
                  className="text-[40px] font-semibold leading-tight text-gray-900 tracking-tight"
                >
                  Simple, Transparent Pricing
                </Reveal>
                <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                  Choose the right plan for your architecture practice. All plans include our core
                  features with flexible options to scale as you grow.
                </p>
              </header>

              {/* Category Selector (Architect / Client) */}
              <div className="flex justify-center mb-6">
                <div className="bg-slate-100 p-1.5 rounded-xl inline-flex shadow-inner">
                  <button
                    onClick={() => setSelectedCategory('architect')}
                    className={`px-8 py-3 rounded-lg text-sm sm:text-base font-bold transition-all duration-300 ${selectedCategory === 'architect'
                      ? 'bg-white text-slate-900 shadow-md transform scale-105'
                      : 'text-slate-500 hover:text-slate-800'
                      }`}
                  >
                    For Architects
                  </button>
                  <button
                    onClick={() => setSelectedCategory('client')}
                    className={`px-8 py-3 rounded-lg text-sm sm:text-base font-bold transition-all duration-300 ${selectedCategory === 'client'
                      ? 'bg-white text-slate-900 shadow-md transform scale-105'
                      : 'text-slate-500 hover:text-slate-800'
                      }`}
                  >
                    For Clients
                  </button>
                </div>
              </div>

              {/* Billing Period Selector — only shown for Architect plans */}
              {selectedCategory === 'architect' && (
                <div className="flex justify-center mb-8 sm:mb-12">
                  <div className="inline-flex items-center bg-white rounded-lg p-1.5 shadow-md border border-slate-200">
                    <button
                      onClick={() => setBillingPeriod('monthly')}
                      className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-md text-sm sm:text-base font-semibold transition-all duration-200 ${billingPeriod === 'monthly'
                        ? 'bg-[#7a6beb] text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                        }`}
                    >
                      Monthly
                    </button>
                    <button
                      onClick={() => setBillingPeriod('quarterly')}
                      className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-md text-sm sm:text-base font-semibold transition-all duration-200 ${billingPeriod === 'quarterly'
                        ? 'bg-[#7a6beb] text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                        }`}
                    >
                      Quarterly
                    </button>
                    <button
                      onClick={() => setBillingPeriod('yearly')}
                      className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-md text-sm sm:text-base font-semibold transition-all duration-200 relative ${billingPeriod === 'yearly'
                        ? 'bg-[#7a6beb] text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                        }`}
                    >
                      Yearly
                      {billingPeriod === 'yearly' && (
                        <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                          Save 20%
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              )}
              {/* Client per-post pricing badge */}
              {selectedCategory === 'client' && (
                <div className="flex justify-center mb-8 sm:mb-12">
                  <div className="inline-flex items-center gap-3 bg-[#7a6beb]/10 border border-[#7a6beb]/30 px-6 py-3 rounded-full">
                    <svg className="w-5 h-5 text-[#7a6beb]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span className="text-[#7a6beb] font-semibold text-sm">No subscription — Pay only when you post</span>
                  </div>
                </div>
              )}

              {/* ─── Pricing Cards Section ─── */}
              <section className="relative mb-16 sm:mb-20 lg:mb-24">
                <div
                  className={`grid gap-6 lg:gap-8 items-start w-full mx-auto ${selectedCategory === 'client'
                    ? 'max-w-4xl grid-cols-1 md:grid-cols-2'
                    : 'max-w-7xl grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
                    }`}
                >
                  {pricingPlans.map((plan) => {
                    const priceInfo = calculatePrice(plan);
                    /** Check if this is the user's current active plan AND billing period */
                    const isCurrentPlan = !plan.perPost && !plan.isFreeClient && isAuthenticated && subscription?.plan === plan.planKey && subscription?.billingPeriod === billingPeriod;
                    /** Determine dynamic CTA button text */
                    const ctaText = isCurrentPlan
                      ? 'Current Plan'
                      : plan.perPost || plan.isFreeClient
                        ? plan.cta
                        : isAuthenticated && subscription?.plan
                          ? (plan.planKey === 'free' ? 'Downgrade' : 'Change Plan')
                          : plan.cta;
                    return (
                      <div key={plan.name} className="flex flex-col h-full">
                        {/* Membership Label */}
                        <div className="mb-3 flex flex-col items-center justify-center w-full relative z-0">
                          <div className="flex flex-col items-center">
                            <div className="h-[24px] flex items-center justify-center">
                              {plan.name !== 'Free — Discovery Plan' && (
                                <div className="text-sm sm:text-base font-bold text-slate-800 tracking-widest uppercase text-center w-full">
                                  {plan.name === 'Starter' && 'Starter Membership'}
                                  {plan.name === 'Professional' && 'Professional Membership'}
                                  {plan.name === 'Premium' && 'Premium Membership'}
                                  {(plan.name === 'Post a Project — ₹99' ||
                                    plan.name === 'Post a Project') &&
                                    'Project Posting'}
                                </div>
                              )}
                            </div>
                            <div className="h-[28px] flex items-center justify-center">
                              {plan.popular ? (
                                <span className="bg-[#7a6beb] text-white text-xs font-semibold px-4 py-1.5 rounded-full text-center">
                                  Most Popular
                                </span>
                              ) : (
                                <div className="h-[28px]"></div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Pricing Card */}
                        <div
                          className={`relative bg-white border-2 flex flex-col shadow-sm flex-1 h-full
                            ${plan.popular ? 'border-[#7a6beb] shadow-lg' : 'border-slate-200'}
                            rounded-[50px_0_50px_0] transition-all duration-200 hover:translate-y-[-4px]`}
                        >
                          <div className="p-6 sm:p-8 flex-1 flex flex-col h-full">
                            {/* Plan Content */}
                            <div className="mb-6">
                              {/* Plan Name with Skewed Background */}
                              <h5 className="text-[29px] font-semibold text-slate-900 mb-2 relative text-center">
                                <span className="absolute inset-x-0 inset-y-0 -skew-x-12 bg-[#7a6beb]/20 z-0 rounded-md px-2 -ml-4"></span>
                                <span className="relative z-10 px-8 inline-block">
                                  {plan.name}
                                </span>
                              </h5>

                              <p className="text-sm text-slate-600 mb-6">{plan.description}</p>
                              <div className="mb-6">
                                {plan.isEnterprise ? (
                                  <div className="text-3xl font-bold text-slate-900">Custom</div>
                                ) : (
                                  <div className="flex items-baseline">
                                    <span className="text-4xl font-bold text-slate-900">
                                      {priceInfo.price}
                                    </span>
                                    <span className="text-slate-600 ml-2">
                                      /{priceInfo.period}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Feature List */}
                            <ul className="space-y-3 mb-8 flex-1">
                              {plan.features.map((feature, i) => (
                                <li key={i} className="flex items-start">
                                  {!feature.startsWith('❌') && (
                                    <svg
                                      className="w-5 h-5 text-[#7a6beb] mr-3 flex-shrink-0 mt-0.5"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                      aria-hidden="true"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                      />
                                    </svg>
                                  )}
                                  <span className="text-sm text-[#7A6BEB]">{feature}</span>
                                </li>
                              ))}
                            </ul>

                            {/* CTA Button with loading state and current plan indicator */}
                            <button
                              onClick={() => handleCTAClick(plan)}
                              disabled={isProcessing || isCurrentPlan}
                              className={`w-full h-11 font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center ${isCurrentPlan
                                ? 'bg-green-100 border-2 border-green-500 text-green-700 cursor-default'
                                : plan.isEnterprise
                                  ? 'bg-white border-2 border-[#7a6beb] text-[#7a6beb] hover:bg-[#7a6beb]/10 focus:ring-[#7a6beb]'
                                  : 'bg-[#7a6beb] hover:bg-[#6b5dd8] text-white shadow-sm hover:shadow-md focus:ring-[#7a6beb]'
                                } ${isProcessing ? 'opacity-60 cursor-not-allowed' : ''}`}
                            >
                              {isProcessing ? (
                                <span className="flex items-center gap-2">
                                  <svg
                                    className="animate-spin h-4 w-4"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                  >
                                    <circle
                                      className="opacity-25"
                                      cx="12"
                                      cy="12"
                                      r="10"
                                      stroke="currentColor"
                                      strokeWidth="4"
                                    />
                                    <path
                                      className="opacity-75"
                                      fill="currentColor"
                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                    />
                                  </svg>
                                  Processing...
                                </span>
                              ) : (
                                ctaText
                              )}
                            </button>

                            {/* Current Plan Badge */}
                            {isCurrentPlan && (
                              <div className="mt-2 text-center">
                                <span className="text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                                  ✓ Your active plan
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* ─── Payment & Billing Section ─── */}
              <section className="mb-16 sm:mb-20 lg:mb-24">
                <div className="max-w-3xl mx-auto">
                  <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 sm:p-8 lg:p-10 relative">
                    {/* Heading */}
                    <h2 className="text-[40px] font-semibold text-slate-900 mb-8 text-center relative inline-block">
                      Payment & Billing
                      <span className="absolute left-1/2 bottom-0 w-20 h-1 bg-gradient-to-r from-[#7a6beb] via-[#8c7ee9] to-[#7a6beb] rounded-full -translate-x-1/2"></span>
                    </h2>

                    {/* Payment Methods */}
                    <div className="space-y-6">
                      <div>
                        <h3 className="pricing-h3-40 text-slate-900 mb-3">
                          Accepted Payment Methods
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-700">
                          {/* Credit / Debit Cards */}
                          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-[#7a6beb]/30 to-[#8c7ee9]/60 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-default">
                            <span className="w-2 h-2 bg-[#7a6beb] rounded-full"></span>
                            <span className="font-medium">Credit / Debit Cards</span>
                          </div>

                          {/* UPI */}
                          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-[#7a6beb]/30 to-[#8c7ee9]/60 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-default">
                            <span className="w-2 h-2 bg-[#7a6beb] rounded-full"></span>
                            <span className="font-medium">UPI</span>
                          </div>

                          {/* Net Banking */}
                          <div className="flex items-center gap-3 bg-gradient-to-r from-[#7a6beb]/30 to-[#8c7ee9]/60 p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-default">
                            <span className="w-2 h-2 bg-[#7a6beb] rounded-full"></span>
                            <span className="font-medium">Net Banking</span>
                          </div>

                          {/* Invoicing (Enterprise) with Tooltip */}
                          <div className="relative flex items-center gap-3 p-3 bg-gradient-to-r from-[#7a6beb]/30 to-[#8c7ee9]/60 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 group cursor-pointer">
                            <span className="w-2 h-2 bg-[#7a6beb] rounded-full"></span>
                            <span className="font-medium">Invoicing (Enterprise)</span>

                            {/* Tooltip */}
                            <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-56 bg-[#7a6beb]/90 text-white text-sm rounded-lg p-2 shadow-lg z-50 pointer-events-none">
                              Includes: PO support, custom net-30 terms, flexible billing options
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Billing Notes + Highlighted Savings */}
                      <div className="pt-6 border-t border-slate-200 text-center sm:text-left relative">
                        <p className="text-slate-600 leading-relaxed">
                          All plans are billed monthly. You can cancel or change your plan at any
                          time.
                          <span className="inline-block ml-2 px-2 py-0.5 bg-[#7a6beb] text-white text-xs font-semibold rounded-full animate-pulse">
                            Save 20% annually
                          </span>
                          Enterprise customers can arrange annual billing and custom payment terms
                          through our sales team.
                        </p>
                      </div>

                      {/* Razorpay Security Badge */}
                      <div className="flex items-center justify-center gap-2 pt-4 border-t border-slate-100">
                        <svg
                          className="w-5 h-5 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          />
                        </svg>
                        <span className="text-sm text-slate-500">
                          Payments secured by <strong className="text-slate-700">Razorpay</strong> —
                          PCI DSS compliant
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* FAQ Section */}
              <FAQAccordion faqs={faqs} />
            </div>
          </main>
        </div>

        {/* Referal Modal */}
        <ReferralModal
          isOpen={showReferralModal}
          onClose={() => setShowReferralModal(false)}
          onApply={handleContinueWithReferral}
          onSkip={() => handleContinueWithReferral(null, 0)}
          plan={pendingPlanForReferral}
          billingPeriod={billingPeriod}
        />

        {/* Footer */}
        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
