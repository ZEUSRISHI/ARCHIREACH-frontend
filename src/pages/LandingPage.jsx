import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';

import { Users, MessageCircle, MapPin, CheckCircleIcon, XCircleIcon, ClockIcon, UsersIcon, Globe, ChartPie, Building, DollarSign, Search, X, User, GraduationCap, Compass, Zap, Star, Mail, Lock, CheckCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import sustainableArchImage from '../../src/assets/Sustainable.png'
import digitalToolsImage from '../../src/assets/DigitalTools.png'
import urbanPlanningImage from '../../src/assets/UrbanPlanning.png'
import HomeHeroImg from '../../src/assets/home.jpeg'

import Footer from '../components/Footer';
import NavbarAll from '../components/NavbarAll';
import Reveal from '../components/Reveal';

const fallbackArticles = [
  {
    id: 1,
    date: 'Nov 15, 2024',
    title: 'The Future of Sustainable Architecture in India: 2025 Trends',
    description: 'Sustainability is no longer optional. Discover the materials, methods, and smart design strategies shaping India’s architectural future.',
    image: sustainableArchImage,
    readMoreLink: '/blog',
  },
  {
    id: 2,
    date: 'Nov 10, 2024',
    title: 'Biophilic Design: Bringing Nature Into Modern Architecture',
    description: 'Learn how biophilic principles transform residential and commercial projects by integrating nature into built environments.',
    image: urbanPlanningImage,
    readMoreLink: '/blog',
  },
  {
    id: 3,
    date: 'Nov 5, 2024',
    title: 'Digital Tools Changing the Way Architects Work',
    description: 'From BIM to generative design—explore the tools modern practices use to improve speed, quality, and collaboration.',
    image: digitalToolsImage,
    readMoreLink: '/blog',
  },
];

const LatestArticlesCarousel = ({ articles }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(0);

  useEffect(() => {
    const updateCardWidth = () => {
      if (containerRef.current) {
        const firstCard = containerRef.current.querySelector('.carousel-card');
        if (firstCard) {
          const cardWidth = firstCard.offsetWidth;
          // Check if this is the second article (index 1) which is wider
          const isSecondArticleWider = window.innerWidth >= 1024; // lg breakpoint
          setCardWidth(cardWidth + 16); // 16px for padding (px-2 on each side)
        }
      }
    };

    updateCardWidth();
    window.addEventListener('resize', updateCardWidth);
    return () => window.removeEventListener('resize', updateCardWidth);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? articles.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === articles.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className='bg-[linear-gradient(to_bottom,rgba(122,107,235,0.06)_0%,#fff_180px)] pt-8 pb-8 px-4'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10 m-2'>
          <div className='text-center md:text-left'>
            <Reveal as='h1' delay={60} className='text-[32px] sm:text-[40px] leading-tight font-semibold mb-2' style={{ fontFamily: "'FS Dillon', sans-serif" }}>
              <span className='text-black'>Latest</span>{" "}
              <span className='text-[rgb(122,107,235)]'>Articles</span>
            </Reveal>
            <p className='text-lg text-black/70 max-w-2xl'>Stay updated with the ions in architecture</p>
          </div>

          <div className='flex space-x-2 justify-center sm:justify-end'>
            <button onClick={prevSlide} className='text-3xl sm:text-4xl text-black p-2 sm:p-3 rounded-full'>
              &#8592;
            </button>
            <button onClick={nextSlide} className='text-3xl sm:text-4xl text-black p-2 sm:p-3 rounded-full'>
              &#8594;
            </button>
          </div>
        </div>

        <div className='overflow-hidden relative' ref={containerRef}>
          <div
            className='flex transition-transform duration-500 ease-in-out'
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {articles.map((article, index) => (
              <div key={article.id} className='carousel-card w-full flex-shrink-0 px-2 py-8'>
                <div className={`bg-[rgba(122,107,235,0.1)] rounded-2xl shadow-lg overflow-hidden hover:shadow-xl flex flex-col lg:flex-row transition-transform duration-300 min-h-[350px] lg:min-h-[300px] ${index === 1 ? 'lg:max-w-[110%] lg:mx-auto' : ''}`}>
                  <div className={`w-full ${index === 1 ? 'lg:w-2/5' : 'lg:w-1/2'} h-60 lg:h-auto overflow-hidden`}>
                    <img
                      src={article.image}
                      alt={article.title}
                      className='w-full h-60 sm:h-[350px] object-cover hover:scale-105 transition-transform duration-300'
                    />
                  </div>

                  <div className={`w-full ${index === 1 ? 'lg:w-3/5' : 'lg:w-1/2'} p-8 flex flex-col justify-center`}>
                    <p className='text-sm mb-3 font-medium opacity-80'>{article.date}</p>
                    <h3 className='text-xl font-normal mb-3 leading-tight'>{article.title}</h3>
                    <p className='text-sm leading-relaxed mb-4 opacity-90'>{article.description}</p>
                    <a
                      href={article.readMoreLink}
                      className='inline-flex items-center text-[rgb(122,107,235)] font-medium text-sm transition-colors duration-200'
                    >
                      Read More
                      <svg className='ml-2 w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

function FeaturedProjects() {
  const [showAll, setShowAll] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await axios.get('https://archireach.onrender.com/api/featured-projects');
        if (data.success) {
          setProjects(data.projects);
        }
      } catch (err) {
        console.error("Error fetching featured projects:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleProjectClick = (userUID) => {
    if (userUID) {
      sessionStorage.setItem("viewUserUID", userUID);
      sessionStorage.setItem("viewMode", "true");
      navigate("/pages/blog/FirmProfile");
    } else {
      toast.error("Error: Missing UserUID");
      alert("This project has no associated userUID to open the firm dashboard.");
    }
  };


  if (loading) {
    return (
      <div className='bg-[#ECEBFB] pt-6 pb-6 px-4 min-h-[400px] flex items-center justify-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-[rgb(122,107,235)]'></div>
      </div>
    );
  }

  const visibleProjects = showAll ? projects : projects.slice(0, 3);


  return (
    <div className='bg-[#ECEBFB] pt-6 pb-6 px-4'>
      <div className='max-w-6xl mx-auto'>
        <div className='text-center mb-16'>
          <Reveal as='h1' delay={0} className='text-[32px] sm:text-[40px] font-semibold mb-4 leading-tight'>
            <span className='text-black'>Featured</span>{" "}
            <span className='text-[rgb(122,107,235)]'>Projects</span>
          </Reveal>
          <p className='text-black/70 text-lg max-w-2xl mx-auto'>
            Explore our curated collection of iconic architectural works
            <br />
            <span className='font-semibold text-[rgb(122,107,235)]'>Archreach</span>
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 relative'>


          {visibleProjects.map((project) => (
            <div
              key={project._id || project.id}
              onClick={() => handleProjectClick(project.userUID)}
              className='relative bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer'
            >
              <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 overflow-hidden relative">
                <img
                  src={project.image || project.img}
                  alt={project.alt || project.title}
                  className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                />

                <div className='absolute inset-0 bg-black/40 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                  <span className="text-white text-xs font-semibold uppercase tracking-wider bg-black/20 backdrop-blur-sm px-2 py-1 rounded w-fit">
                    View Project
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2 truncate">
                {project.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                {project.description}
              </p>

              <div
                className="inline-flex items-center text-[rgb(122,107,235)] text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity hover:underline"
                onClick={(e) => {
                  e.stopPropagation();
                  handleProjectClick(project.userUID);
                }}
              >
                Explore Dashboard →
              </div>
            </div>
          ))}

        </div>

        <div className='text-center'>
          <button
            type='button'
            onClick={() => setShowAll((v) => !v)}
            className='bg-[rgb(122,107,235)] hover:opacity-90 text-white font-bold px-8 py-3 rounded-[14px] shadow-xl transition'
          >
            {showAll ? 'Show Less' : 'View All'}
          </button>
        </div>
      </div>
    </div>
  );
}

function ArchitectCard() {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const items = [
    'Professional licenses verified and validated',
    'Build portfolio with completed platform projects',
    'Earn badges (Verified, Trusted, Elite)',
    'Get quality client leads (2-3/month)',
    'No commission—flat-rate subscriptions only',
  ];

  const visibleItems = isExpanded ? items : items.slice(0, 1);

  return (
    <div className='flex-1 bg-transparent border border-[rgb(122,107,235)]/60 rounded-lg p-6 hover:shadow-xl transition flex flex-col items-start min-h-[350px]'>
      <div className='w-12 h-12 bg-[rgb(122,107,235)] text-white rounded-full flex items-center justify-center mb-4'>
        <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
          <path d='M3 21v-9h18v9' />
          <path d='M5 12l7-9 7 9' />
          <path d='M9 21V9h6v12' />
        </svg>
      </div>

      <h3 className='text-xl font-normal text-black mb-2 uppercase'>FOR ARCHITECTS & INTERIOR DESIGNERS</h3>

      <p className={`text-black/70 mb-4 font-medium ${isExpanded ? '' : 'max-h-[72px] overflow-hidden'}`}>
        Build your professional reputation on Archireach with verified credentials and real client projects. Get access to serious client leads, grow your practice, and unlock badges that prove your expertise.
      </p>

      <div className='space-y-2 mb-3'>
        {visibleItems.map((item, i) => (
          <div key={i} className='flex items-start gap-2 text-sm text-black/70'>
            <span className='text-[rgb(122,107,235)] font-bold'>✓</span>
            <span>{item}</span>
          </div>
        ))}
      </div>

      <button
        type='button'
        onClick={() => setIsExpanded((v) => !v)}
        className='text-sm font-semibold text-[rgb(122,107,235)] hover:text-[rgb(90,75,200)]'
      >
        {isExpanded ? 'Show less' : 'Show more'}
      </button>

      <button
        type='button'
        onClick={() => navigate('/signup')}
        className='mt-auto bg-[rgb(122,107,235)] text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-[rgb(90,75,200)] transition w-full md:w-auto'
      >
        Become a Member
      </button>
    </div>
  );
}

function FirmCard() {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const items = [
    'Every professional is licensed and professionally verified',
    'Post your project brief and get proposals within 24 hours',
    'Browse verified architects & interior designers in your city',
    'Read authentic client reviews & ratings (1-5 stars)',
    'View completed projects',
    "Connect securely without sharing contact details until you're ready",
  ];

  const visibleItems = isExpanded ? items : items.slice(0, 1);

  return (
    <div className='flex-1 bg-transparent border border-[rgb(122,107,235)]/60 rounded-lg p-6 hover:shadow-xl transition flex flex-col items-start min-h-[350px]'>
      <div className='w-12 h-12 bg-[rgb(122,107,235)] text-white rounded-full flex items-center justify-center mb-4'>
        <Users className='h-6 w-6' />
      </div>

      <h3 className='text-xl font-normal text-black mb-2 uppercase'>FOR CLIENTS</h3>

      <p className={`text-black/70 mb-4 font-medium ${isExpanded ? '' : 'max-h-[72px] overflow-hidden'}`}>
        Hire verified architects and interior designers with complete confidence. Every professional on Archireach has been thoroughly verified, ensuring you work only with licensed, credentialed experts who understand your project needs.
      </p>

      <div className='space-y-2 mb-3'>
        {visibleItems.map((item, i) => (
          <div key={i} className='flex items-start gap-2 text-sm text-black/70'>
            <span className='text-[rgb(122,107,235)] font-bold'>✓</span>
            <span>{item}</span>
          </div>
        ))}
      </div>

      <button
        type='button'
        onClick={() => setIsExpanded((v) => !v)}
        className='text-sm font-semibold text-[rgb(122,107,235)] hover:text-[rgb(90,75,200)]'
      >
        {isExpanded ? 'Show less' : 'Show more'}
      </button>

      <button
        type='button'
        onClick={() => navigate('/signup')}
        className='mt-auto bg-[rgb(122,107,235)] text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-[rgb(90,75,200)] transition w-full md:w-auto'
      >
        Find Professionals
      </button>
    </div>
  );
}

const professionalFaqs = [
  {
    question: 'How do I join Archireach as a professional?',
    answer: `Joining is simple:

1. Sign up using your email
2. Upload professional credentials and license
3. Complete your portfolio
4. Choose a subscription plan
5. Get verified within 24–48 hours and go live

You can browse project briefs immediately, but verification is required to respond to clients.`,
  },
  {
    question: 'How quickly can I start receiving enquiries?',
    answer: `Most professionals receive their first enquiry within 1–2 weeks of going live.

This depends on:
• Profile completeness
• Selected subscription plan
• Specialization match
• Location demand

Pro tip: Profiles with 10–15 strong projects receive significantly more enquiries.`,
  },
  {
    question: 'What does my subscription give me?',
    answer: `Your subscription includes:
• A public professional profile
• Portfolio showcase
• Access to live client projects
• Ability to apply to projects

There are no commissions—you keep 100% of your project fees. Plans are designed to cost less than website hosting or OTT subscriptions, while actively generating leads.`,
  },
  {
    question: 'How do clients find my profile?',
    answer: `Clients discover professionals through:
• Location, budget, and specialization search
• Profile comparisons
• Shortlisting based on experience and reviews

Better profiles get better visibility.`,
  },
  {
    question: 'Can I work with clients outside Archireach?',
    answer: `Yes, but off-platform work does not contribute to:
• Client reviews or ratings
• Portfolio project count
• Trust badges
• Legal templates and platform protection

Work completed on Archireach builds your long-term reputation and visibility.`,
  },
  {
    question: 'What are "Verified", "Trusted", and "Elite" badges?',
    answer: `Verified:
Automatically assigned after approval

Trusted:
• 5+ completed projects on Archireach
• 4.0+ average client rating

Elite:
• 20+ completed projects on Archireach
• 4.5+ rating
• 70%+ client satisfaction

Badges significantly improve profile visibility. Only clients who have worked with you on Archireach can rate or review.`,
  },
  {
    question: 'Is this better than running ads or building a website?',
    answer: `Archireach complements your existing presence. Instead of paying repeatedly for ads or relying only on SEO, you get consistent visibility inside a marketplace where clients are already searching for architects and designers.`,
  },
  {
    question: 'Can I improve my chances of getting leads?',
    answer: `Yes. Completing your profile, showcasing strong projects, selecting the right services, and keeping information updated significantly improves visibility and enquiry quality.`,
  },
];

const clientFaqs = [
  {
    question: 'How do I post a project?',
    answer: `Posting a project takes about 10 minutes:

1. Create a project brief
2. Add budget, timeline, and location
3. Upload references (optional)
4. Pay a small token amount to verify authenticity
5. Go live

Qualified professionals typically respond within 24 hours.`,
  },
  {
    question: 'Are all professionals on Archireach verified?',
    answer: `Yes. Every architect and designer on Archireach is verified through:
• Professional license checks
• Portfolio review
• Experience validation
• Past work authenticity

You only interact with legitimate professionals.`,
  },
  {
    question: 'Is communication and payment secure?',
    answer: `Communication:
All initial communication must stay on Archireach until a professional is finalized. If users choose to move communication outside the platform, Archireach is not responsible for outcomes.

Payments:
• Secure payment gateway
• SSL/TLS encryption
• Transparent documentation

You stay in control at every step.`,
  },
];

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState('professional');

  const currentFaqs = activeCategory === 'professional' ? professionalFaqs : clientFaqs;

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className='w-full py-12 bg-white'>
      <div className='max-w-4xl mx-auto px-6'>
        <div className='mb-10 text-center'>
          <Reveal as='h2' delay={60} className='text-[32px] sm:text-[40px] font-semibold text-black mb-2 leading-tight'>
            Questions? We've Got Answers
          </Reveal>
          <p className='text-gray-600 text-lg'>Everything you need to know about Archireach</p>
        </div>

        <div className='flex justify-center mb-8'>
          <div className='bg-gray-100 p-1 rounded-xl inline-flex shadow-inner'>
            <button
              type='button'
              onClick={() => {
                setActiveCategory('professional');
                setOpenIndex(null);
              }}
              className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${activeCategory === 'professional'
                ? 'bg-white text-[rgb(122,107,235)] shadow-md'
                : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              For Professionals
            </button>
            <button
              type='button'
              onClick={() => {
                setActiveCategory('client');
                setOpenIndex(null);
              }}
              className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${activeCategory === 'client'
                ? 'bg-white text-[rgb(122,107,235)] shadow-md'
                : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              For Clients
            </button>
          </div>
        </div>

        <div className='flex flex-col gap-4'>
          {currentFaqs.map((faq, index) => (
            <div
              key={`${activeCategory}-${index}`}
              onClick={() => toggle(index)}
              className={`bg-white rounded-2xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-all duration-300 overflow-hidden ${openIndex === index ? 'ring-2 ring-[rgb(122,107,235)] ring-opacity-50' : ''
                }`}
            >
              <div className='flex justify-between items-center p-6'>
                <h3 className='text-[18px] leading-tight font-normal text-gray-800'>{faq.question}</h3>
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full bg-[rgb(122,107,235)]/10 flex items-center justify-center transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''
                    }`}
                >
                  <ChevronDownIcon className='h-5 w-5 text-[rgb(122,107,235)]' />
                </div>
              </div>

              <div
                className={`transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-[800px] opacity-100 border-t border-gray-50' : 'max-h-0 opacity-0'
                  }`}
              >
                <div className='p-6 text-gray-600 text-sm leading-relaxed whitespace-pre-line'>{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Online logo URLs
const logos = [
  "https://upload.wikimedia.org/wikipedia/en/f/fc/Study_Webs_of_Active-Learning_for_Young_Aspiring_Minds_%28SWAYAM%29_logo.png",
  "https://iiec.edu.in/wp-content/uploads/2023/08/aicte_rectangle.png",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxsBccnSKRW8TxLC6J0h-xyBOWaoUYyLZ1YA&s",
  "https://brand.autodesk.com/wp-content/uploads/2025/02/logo-03-variations-alternate-421x237@2x.png",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_TaZ8rQH1SSqsdGMeurZehbVwSRY7qytYyw&s",];

const logoSizes = [
  { width: 115.05, height: 56 },
  { width: 86.28, height: 56 },
  { width: 56, height: 56 },
  { width: 99.47, height: 56 },
  { width: 247.54, height: 56 },
];


const PartnershipsSlider = () => {
  return (
    <div className="pt-6 pb-10 overflow-hidden bg-[#ECEBFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl sm:text-3xl font-semibold text-black mb-6">
          Our Accreditations & Partnerships
        </h2>

        {/* Slider */}
        <div className="relative w-full overflow-hidden">
          <div className="flex animate-marquee space-x-14">
            {logos.concat(logos).map((logo, idx) => (
              <div
                key={idx}
                className="flex-shrink-0"
                style={{
                  width: `${logoSizes[idx % logos.length].width}px`,
                  height: `${logoSizes[idx % logos.length].height}px`,
                }}
              >
                <img
                  src={logo}
                  alt={`partner-${idx}`}
                  className="
                w-full h-full object-contain
                transition-all duration-300
                opacity-60
                hover:opacity-100
              "
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};



/* TESTIMONICAL CARDS*/
const testimonials = [
  {
    rating: 5,
    testimonial:
      'ArchiConnect has transformed how our firm discovers talent. The verification process ensures we only connect with qualified professionals, saving us time and resources.',
    name: 'Vikram Patel',
    title: 'Principal Architect, Horizon Designs'
  },
  {
    rating: 5,
    testimonial:
      'As a student, finding internships was always challenging. ArchiConnect connected me with verified firms that align with my interests. The platform has been instrumental in starting my career.',
    name: 'Aisha Khan',
    title: 'Architecture Student, Delhi School of Planning'
  },
  {
    rating: 5,
    testimonial:
      'Our college has established valuable industry connections through ArchiConnect. The platform has helped our students find quality placements and brought practicing architects to mentor our programs.',
    name: 'Dr. Sunil Verma',
    title: 'Dean, College of Architecture, Mumbai'
  }, {
    rating: 5,
    testimonial:
      'ArchiConnect has transformed how our firm discovers talent. The verification process ensures we only connect with qualified professionals, saving us time and resources.',
    name: 'Vikram Patel',
    title: 'Principal Architect, Horizon Designs'
  }, {
    rating: 5,
    testimonial:
      'ArchiConnect has transformed how our firm discovers talent. The verification process ensures we only connect with qualified professionals, saving us time and resources.',
    name: 'Vikram Patel',
    title: 'Principal Architect, Horizon Designs'
  },
]

const TestimonialCard = ({ rating, testimonial, name, title, avatar, className }) => {
  return (
    <div className={`bg-[rgba(122,107,235,0.1)] text-[rgb(122,107,235)] rounded-2xl p-6 shadow-lg border border-[rgba(122,107,235,0.3)] h-full flex flex-col justify-between hover:shadow-xl transition-all duration-300 ${className || ''}`}>


      {/* Star Rating */}
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-white/50'}`}
          />
        ))}
      </div>

      {/* Testimonial Text */}
      <p className="text-sm leading-relaxed mb-6 flex-grow">
        "{testimonial}"
      </p>

      {/* User Info */}
      <div className="flex items-center mt-4">
        <div className="w-10 h-10 bg-[rgb(122,107,235)] rounded-full flex items-center justify-center mr-3">
          {avatar ? (
            <img src={avatar} alt={name} className="w-10 h-10 rounded-full" />
          ) : (
            <User className="w-5 h-5 text-white" />
          )}
        </div>
        <div>
          <h4 className="font-normal text-black text-sm">{name}</h4>
          <p className="text-gray-500 text-xs">{title}</p>
        </div>
      </div>
    </div>
  );
};






function LandingPage() {
  const navigate = useNavigate();

  // =================== STATES ===================
  const [searchTarget, setSearchTarget] = useState('architects');
  const [email, setEmail] = useState("");
  const [dynamicTestimonials, setDynamicTestimonials] = useState([]);
  const [articles, setArticles] = useState(fallbackArticles); // Articles from DB, fallback to hardcoded
  const testimonialsScrollRef = React.useRef(null);

  // Loading States
  const [activeStepCategory, setActiveStepCategory] = useState('professional'); // 'professional' or 'client'

  // =================== HANDLERS ===================
  const scrollTestimonials = (direction) => {
    const el = testimonialsScrollRef.current;
    if (!el) return;

    const scrollAmount = Math.max(260, Math.floor(el.clientWidth * 0.7));
    el.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
  };

  const handleSubscribe = () => {
    if (email) {
      alert(`Subscribed with email: ${email}`);
      setEmail("");
    }
  };

  React.useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data } = await axios.get('https://archireach.onrender.com/api/testimonials');
        if (data.success) {
          setDynamicTestimonials(data.testimonials);
        }
      } catch (err) {
        console.error("Error fetching testimonials:", err);
      }
    };
    fetchTestimonials();
  }, []);

  /**
   * Fetch published articles from the DB.
   * Maps DB fields (createdAt) to carousel-expected fields (date).
   * Falls back to hardcoded articles if DB returns empty.
   */
  React.useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data } = await axios.get('https://archireach.onrender.com/api/articles?status=published&limit=6');
        if (data.success && data.articles.length > 0) {
          const mapped = data.articles.map((a) => ({
            id: a._id,
            date: new Date(a.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            title: a.title,
            description: a.description,
            image: a.image || sustainableArchImage,
            readMoreLink: '/blog',
          }));
          setArticles(mapped);
        }
      } catch (err) {
        console.error('Error fetching articles:', err);
        // Keep fallback articles on error
      }
    };
    fetchArticles();
  }, []);






  const verificationSteps = [
    {
      id: 'A',
      title: 'Architect Verification',
      description:
        'We verify architects using Council of Architecture (COA) credentials to ensure authenticity and uphold professional standards in the field.',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600'
    },
    {
      id: 'B',
      title: 'Firm Verification',
      description:
        'Architectural firms are verified through registration, portfolio review, client testimonials to ensure credibility and professionalism.',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600'
    },
    {
      id: 'C',
      title: 'Student Verification',
      description:
        'Students are verified through academic credentials from recognized architecture colleges to support their academic development.',
      bgColor: 'bg-green-100',
      textColor: 'text-green-600'
    },
    {
      id: 'D',
      title: 'College Verification',
      description:
        'Educational institutions are verified through accreditation checks, faculty credentials, and curriculum validation.',
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-600'
    }
  ]

  return (
    <div className="bg-[rgba(122,107,235,0.1)] pt-4">
      <div className="overflow-x-hidden bg-[#ECEBFB]">
        <NavbarAll />

        {/* Hero Section */}
        <div className="relative overflow-hidden pt-10 pb-8 bg-[#ECEBFB]">
          <style>{`
            @keyframes quiboHomeHeroFloat {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-10px); }
            }
            @keyframes quiboHomeHeroFade {
              from { opacity: 0; transform: translateY(10px) scale(0.995); }
              to { opacity: 1; transform: translateY(0) scale(1); }
            }
            .quibo-home-hero-anim {
              animation: quiboHomeHeroFade 700ms ease-out both;
              will-change: transform, opacity;
            }
            .quibo-home-hero-hover:hover .quibo-home-hero-hover-img {
              animation: quiboHomeHeroFloat 2.8s ease-in-out infinite;
            }
            @media (prefers-reduced-motion: reduce) {
              .quibo-home-hero-anim { animation: none; }
              .quibo-home-hero-hover:hover .quibo-home-hero-hover-img { animation: none; }
            }
          `}</style>
          <div className="pointer-events-none absolute -top-28 -left-24 h-80 w-80 rounded-full bg-[rgb(122,107,235)]/10 blur-3xl opacity-0" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

            {/* ================= MOBILE HERO ================= */}
            <div className="block lg:hidden">
              {/* Image */}
              <div className="flex justify-center pt-6 pb-4 px-4">
                <div className="quibo-home-hero-hover group relative w-fit transition-transform duration-500 ease-out group-hover:-translate-y-2 group-hover:scale-[1.02]">
                  <img
                    src={HomeHeroImg}
                    alt="Professional person"
                    className="w-full max-w-[400px] max-h-[250px] h-auto object-contain quibo-home-hero-anim quibo-home-hero-hover-img drop-shadow-[0_24px_55px_rgba(15,23,42,0.14)]"
                    onError={() => handleImageError('person')}
                  />
                </div>
              </div>

              {/* Text */}
              <div className="text-center px-4">
                <Reveal as="h1" delay={0} className="font-semibold text-[32px] sm:text-[40px] leading-tight text-[#0B0D14] tracking-tight">
                  Clients Connect with <br />
                  <span className="text-[rgb(102,91,215)]">Verified Architects & Interior Designers</span>
                </Reveal>

                <p className="mt-4 text-[16px] leading-[26px] font-normal text-[#111729]">
                  A simple way for clients to discover architects <br />
                  and for architects to find new projects — all in one place. <br />
                  Discover new opportunities, showcase your work, and be part of a global architectural community.
                </p>

                <div className="mt-6">
                  <button
                    onClick={() => navigate('/signup')}
                    className="bg-[rgb(122,107,235)] hover:opacity-90
                       text-white font-bold w-full sm:w-[170px] h-[50px]
                       rounded-[12px] shadow-lg transition"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>

            {/* ================= DESKTOP HERO ================= */}
            <div className="hidden lg:block">
              <div className="flex items-center justify-between gap-10">

                {/* Left Content */}
                <div className="flex-1 max-w-3xl">
                  <Reveal as="h1" delay={0} className="font-semibold text-[40px] leading-tight text-[#0F172A] tracking-tight">
                    Where Clients Connect with <br />
                    <span className="text-[rgb(102,91,215)]">Verified Architects & <br /> Interior Designers</span>
                  </Reveal>

                  <p className="mt-6 text-lg leading-relaxed text-[#111729] max-w-2xl ">
                    A simple way for clients to discover architects and for <br />
                    architects to find new projects — all in one place. Discover new <br />
                    opportunities, showcase your work, and be part of a global architectural community.
                  </p>

                  <div className="mt-8">
                    <button
                      onClick={() => navigate('/signup')}
                      className="bg-[rgb(122,107,235)] hover:opacity-90
                         text-white font-bold w-[180px] h-[54px]
                         rounded-[14px] shadow-xl transition"
                    >
                      Get Started
                    </button>
                  </div>
                </div>

                {/* Right Image */}
                <div className="relative flex items-center justify-center flex-shrink-0 w-full max-w-[460px]">
                  <div className="quibo-home-hero-hover group relative w-fit transition-transform duration-500 ease-out group-hover:-translate-y-2 group-hover:scale-[1.02]">
                    <img
                      src={HomeHeroImg}
                      alt="Professional person"
                      className="w-full h-auto max-h-[380px] object-contain quibo-home-hero-anim quibo-home-hero-hover-img drop-shadow-[0_28px_70px_rgba(15,23,42,0.16)]"
                      onError={() => handleImageError('person')}
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Our Accreditations & Partnerships */}
        <PartnershipsSlider />
      </div>

      {/* Search Section */}
      <section className="relative py-10 sm:py-12 lg:py-16 bg-[linear-gradient(to_bottom,rgba(122,107,235,0.02)_0%,#fff_260px)]">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 sm:h-20 bg-gradient-to-b from-transparent via-[rgba(122,107,235,0.03)] to-[rgba(122,107,235,0.08)]" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-6">
            <div className="bg-gray-100 p-1 rounded-xl inline-flex shadow-inner">
              <button
                type="button"
                onClick={() => setSearchTarget('architects')}
                className={`px-8 py-2.5 rounded-lg text-sm transition-all duration-300 ${searchTarget === 'architects'
                  ? 'bg-white text-[rgb(122,107,235)] shadow-md font-bold'
                  : 'text-gray-500 hover:text-gray-700 font-semibold'
                  }`}
              >
                Find Architects
              </button>
              <button
                type="button"
                onClick={() => setSearchTarget('projects')}
                className={`px-8 py-2.5 rounded-lg text-sm transition-all duration-300 ${searchTarget === 'projects'
                  ? 'bg-white text-[rgb(122,107,235)] shadow-md font-bold'
                  : 'text-gray-500 hover:text-gray-700 font-semibold'
                  }`}
              >
                Find Projects
              </button>
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-10 sm:mb-12">
            <Reveal as="h2" delay={60} className="text-[32px] sm:text-[40px] font-semibold text-gray-900 mb-4 leading-tight">
              Find <span className="text-[rgb(122,107,235)]">Verified</span> Architects & Interior Designers
            </Reveal>

            <p className="text-lg text-gray-700 max-w-3xl mx-auto px-4 font-normal sm:whitespace-nowrap">
              {searchTarget === 'projects'
                ? 'Access real project briefs from clients actively looking for architects and interior designers.'
                : 'Connect with licensed professionals who match your project, budget, and style.'}
            </p>
          </div>

          {/* Search Form */}
          <div className="max-w-4xl mx-auto mb-10 sm:mb-12">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch">
              {searchTarget === 'projects' ? (
                <>
                  {/* Project Type */}
                  <div className="flex-1 relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[rgb(122,107,235)] w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Project Type"
                      className="w-full pl-10 pr-4 py-3 sm:py-4 bg-transparent border-0 rounded-none text-gray-700 text-base focus:outline-none"
                    />
                  </div>

                  {/* Location */}
                  <div className="flex-1 relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[rgb(122,107,235)] w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Location"
                      className="w-full pl-10 pr-4 py-3 sm:py-4 bg-transparent border-0 rounded-none text-gray-700 text-base focus:outline-none"
                    />
                  </div>

                  {/* Budget Range */}
                  <div className="flex-1 relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[rgb(122,107,235)] w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Budget Range"
                      className="w-full pl-10 pr-4 py-3 sm:py-4 bg-transparent border-0 rounded-none text-gray-700 text-base focus:outline-none"
                    />
                  </div>

                  {/* Timeline */}
                  <div className="flex-1 relative">
                    <ClockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[rgb(122,107,235)] w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Timeline"
                      className="w-full pl-10 pr-4 py-3 sm:py-4 bg-transparent border-0 rounded-none text-gray-700 text-base focus:outline-none"
                    />
                  </div>
                </>
              ) : (
                <>
                  {/* Location */}
                  <div className="flex-1 relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[rgb(122,107,235)] w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Location"
                      className="w-full pl-10 pr-4 py-3 sm:py-4 bg-transparent border-0 rounded-none text-gray-700 text-base focus:outline-none"
                    />
                  </div>

                  {/* Project Type */}
                  <div className="flex-1 relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[rgb(122,107,235)] w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Project Type"
                      className="w-full pl-10 pr-4 py-3 sm:py-4 bg-transparent border-0 rounded-none text-gray-700 text-base focus:outline-none"
                    />
                  </div>

                  {/* Budget Range */}
                  <div className="flex-1 relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[rgb(122,107,235)] w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Budget Range"
                      className="w-full pl-10 pr-4 py-3 sm:py-4 bg-transparent border-0 rounded-none text-gray-700 text-base focus:outline-none"
                    />
                  </div>
                </>
              )}

              <button
                type="button"
                onClick={() => navigate(searchTarget === 'architects' ? '/pages/ExploreDrop/FindArch' : '/pages/ExploreDrop/FindProjects')}
                className="bg-[rgb(122,107,235)] hover:bg-[rgb(122,107,235)/90] text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg transition-colors font-bold flex items-center justify-center gap-2 w-full sm:w-[190px] whitespace-nowrap shadow-md hover:shadow-lg"
              >
                <Search className="w-5 h-5" />
                <span className="sm:inline">{searchTarget === 'architects' ? 'Find Architects' : 'Find Projects'}</span>
              </button>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 max-w-5xl mx-auto">
            {/* Discover Card */}
            <div className="flex items-start gap-4 sm:gap-6">
              <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-[rgb(122,107,235)] mt-1 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="text-lg sm:text-xl font-normal text-gray-900 mb-2 uppercase">DISCOVER</h3>
                <p className="text-gray-700 leading-relaxed text-sm font-medium">
                  {searchTarget === 'projects'
                    ? 'Browse active project briefs posted by verified clients. Explore opportunities across residential, commercial, institutional, and interior projects—filtered by location, budget, and scope.'
                    : <>
                      Browse architects and interior designers verified by
                      licensed registration and professional credentials. Filter by
                      specialization, years of experience, project types, and
                      service areas.
                    </>}
                </p>
              </div>
            </div>

            {/* Compare Card */}
            <div className="flex items-start gap-4 sm:gap-6">
              <ChartPie className="w-5 h-5 sm:w-6 sm:h-6 text-[rgb(122,107,235)] mt-1 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="text-lg sm:text-xl font-normal text-gray-900 mb-2 uppercase">{searchTarget === 'projects' ? 'EVALUATE' : 'COMPARE'}</h3>
                <p className="text-gray-700 leading-relaxed text-sm font-medium">
                  {searchTarget === 'projects'
                    ? 'Review detailed project requirements, timelines, and client expectations before applying. Assess whether a project aligns with your expertise, availability, and business goals.'
                    : <>
                      Review detailed portfolios showing completed projects,
                      client reviews, and professional credentials. Compare
                      architects’ to find the best fit for your project scope and budget.
                    </>}
                </p>
              </div>
            </div>

            {/* Connect Card */}
            <div className="flex items-start gap-4 sm:gap-6">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 text-[rgb(122,107,235)] mt-1 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="text-lg sm:text-xl font-normal text-gray-900 mb-2 uppercase">{searchTarget === 'projects' ? 'APPLY & CONNECT' : 'CONNECT'}</h3>
                <p className="text-gray-700 leading-relaxed text-sm font-medium">
                  {searchTarget === 'projects'
                    ? 'Submit your interest directly through Archireach. Connect with clients once shortlisted, with your professional profile, portfolio, and credentials working in your favor.'
                    : <>
                      Once you find the right professional, request a quote or proposal directly through Archireach. Your contact details
                      stay protected until both parties are ready to connect.
                    </>}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verification Section */}
      <div className='bg-[rgba(122,107,235,0.1)] py-16 px-4'>
        <div className='max-w-6xl mx-auto'>
          {/* Header Section */}
          <div className='text-center mb-16'>
            <h1 className='text-4xl sm:text-5xl font-extrabold mb-4 '>
              <span className='text-black'>Trusted</span>{' '}
              <span className='text-[rgb(122,107,235)]'>Verification Process</span>
            </h1>

            <p className='text-black/80 max-w-2xl mx-auto font-semibold'>
              Every architect and interior designer firm on Archireach is professionally licensed and credential-verified. No fakes. No spam. Only authentic professionals.
            </p>
          </div>

          {/* Cards Section */}

          <div className="flex flex-col md:flex-row gap-8 items-stretch">
            <ArchitectCard />
            <FirmCard />
          </div>

        </div>
        {/* Three Steps Section */}

        {/* Three Steps Section */}
        <div className="max-w-5xl mx-auto py-16 px-4">

          {/* Heading */}
          <div className="max-w-6xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">
              Three Simple Steps to Your Next Project
            </h2>
            <p className="text-black/70 mt-2 text-lg">
              Getting started with Archireach is quick and straightforward.
            </p>
          </div>

          {/* Category Switcher */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-100 p-1 rounded-xl inline-flex shadow-inner">
              <button
                onClick={() => setActiveStepCategory('professional')}
                className={`px-8 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${activeStepCategory === 'professional'
                  ? 'bg-white text-[rgb(122,107,235)] shadow-md'
                  : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                For Professionals
              </button>
              <button
                onClick={() => setActiveStepCategory('client')}
                className={`px-8 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${activeStepCategory === 'client'
                  ? 'bg-white text-[rgb(122,107,235)] shadow-md'
                  : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                For Clients
              </button>
            </div>
          </div>

          {/* Steps Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {activeStepCategory === 'professional' ? (
              <>
                {/* Pro Step 1 */}
                <div className="bg-transparent border border-[rgb(122,107,235)]/40 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center relative group">
                  <div className="w-14 h-14 bg-white border-2 border-[rgb(122,107,235)] text-[rgb(122,107,235)] font-bold rounded-full flex items-center justify-center absolute -top-7 text-xl shadow-lg group-hover:scale-110 transition-transform">
                    01
                  </div>
                  <h3 className="text-xl font-bold mt-6 mb-4 text-gray-900 uppercase tracking-tight">
                    CREATE YOUR PROFILE
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Set up your professional profile to showcase your skills, experience, and completed projects. Verify your credentials and build your reputation on the platform.
                  </p>
                  <div className="mt-auto inline-flex items-center bg-[rgb(122,107,235)]/10 text-[rgb(122,107,235)] text-sm font-bold px-4 py-1.5 rounded-full">
                    <ClockIcon className="w-4 h-4 mr-2" />
                    24–48 hours (to verify)
                  </div>
                </div>

                {/* Pro Step 2 */}
                <div className="bg-transparent border border-[rgb(122,107,235)]/40 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center relative group">
                  <div className="w-14 h-14 bg-white border-2 border-[rgb(122,107,235)] text-[rgb(122,107,235)] font-bold rounded-full flex items-center justify-center absolute -top-7 text-xl shadow-lg group-hover:scale-110 transition-transform">
                    02
                  </div>
                  <h3 className="text-xl font-bold mt-6 mb-4 text-gray-900 uppercase tracking-tight">
                    FIND QUALIFIED LEADS
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Browse verified project briefs from serious clients actively looking for professionals like you. Filter by budget, project type, location, and complexity.
                  </p>
                  <div className="mt-auto inline-flex items-center bg-green-50 text-green-700 text-sm font-bold px-4 py-1.5 rounded-full border border-green-100">
                    <CheckCircleIcon className="w-4 h-4 mr-2" />
                    Real budgets, verified clients
                  </div>
                </div>

                {/* Pro Step 3 */}
                <div className="bg-transparent border border-[rgb(122,107,235)]/40 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center relative group">
                  <div className="w-14 h-14 bg-white border-2 border-[rgb(122,107,235)] text-[rgb(122,107,235)] font-bold rounded-full flex items-center justify-center absolute -top-7 text-xl shadow-lg group-hover:scale-110 transition-transform">
                    03
                  </div>
                  <h3 className="text-xl font-bold mt-6 mb-4 text-gray-900 uppercase tracking-tight">
                    SECURE THE PROJECT
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Propose your expertise directly to clients, negotiate terms, and finalize agreements through the platform. Start working with confidence and build your portfolio.
                  </p>
                  <div className="mt-auto inline-flex items-center bg-[rgb(122,107,235)] text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-md">
                    <Zap className="w-4 h-4 mr-2" />
                    Go Live Today
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Client Step 1 */}
                <div className="bg-transparent border border-[rgb(122,107,235)]/40 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center relative group">
                  <div className="w-14 h-14 bg-white border-2 border-[rgb(122,107,235)] text-[rgb(122,107,235)] font-bold rounded-full flex items-center justify-center absolute -top-7 text-xl shadow-lg group-hover:scale-110 transition-transform">
                    01
                  </div>
                  <h3 className="text-xl font-bold mt-6 mb-4 text-gray-900 uppercase tracking-tight">
                    POST YOUR PROJECT BRIEF
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Describe your project—what you need, budget, and timeline. Provide detail so architects can understand your vision and submit relevant proposals.
                  </p>
                  <div className="mt-auto inline-flex items-center bg-[rgb(122,107,235)]/10 text-[rgb(122,107,235)] text-sm font-bold px-4 py-1.5 rounded-full">
                    <ClockIcon className="w-4 h-4 mr-2" />
                    10 minutes to post
                  </div>
                </div>

                {/* Client Step 2 */}
                <div className="bg-transparent border border-[rgb(122,107,235)]/40 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center relative group">
                  <div className="w-14 h-14 bg-white border-2 border-[rgb(122,107,235)] text-[rgb(122,107,235)] font-bold rounded-full flex items-center justify-center absolute -top-7 text-xl shadow-lg group-hover:scale-110 transition-transform">
                    02
                  </div>
                  <h3 className="text-xl font-bold mt-6 mb-4 text-gray-900 uppercase tracking-tight">
                    BROWSE ARCHITECT RESPONSES
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Licensed architects submit proposals. View their credentials, completed projects, and reviews. Compare professionals to find your perfect match.
                  </p>
                  <div className="mt-auto inline-flex items-center bg-blue-50 text-blue-700 text-sm font-bold px-4 py-1.5 rounded-full border border-blue-100">
                    <Zap className="w-4 h-4 mr-2" />
                    Responses within 24 hours
                  </div>
                </div>

                {/* Client Step 3 */}
                <div className="bg-transparent border border-[rgb(122,107,235)]/40 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center relative group">
                  <div className="w-14 h-14 bg-white border-2 border-[rgb(122,107,235)] text-[rgb(122,107,235)] font-bold rounded-full flex items-center justify-center absolute -top-7 text-xl shadow-lg group-hover:scale-110 transition-transform">
                    03
                  </div>
                  <h3 className="text-xl font-bold mt-6 mb-4 text-gray-900 uppercase tracking-tight">
                    HIRE & BEGIN YOUR PROJECT
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Select your architect, finalize agreements through Archireach, and start with confidence. All communication happens on-platform for your protection.
                  </p>
                  <div className="mt-auto inline-flex items-center bg-[rgb(122,107,235)] text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-md">
                    <Lock className="w-4 h-4 mr-2" />
                    Secure & Protected
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

      </div>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <Reveal as="h2" delay={60} className="text-[32px] sm:text-[40px] font-semibold text-gray-900 mb-4 leading-tight">
              How <span className="text-[rgb(122,107,235)]">It Works</span>
            </Reveal>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Get started in three simple steps, whether you're looking to hire or seeking opportunities.
            </p>
          </div>

          {/* Toggle Buttons */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-100 p-1 rounded-xl inline-flex shadow-inner">
              <button
                onClick={() => setActiveStepCategory('professional')}
                className={`px-8 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${activeStepCategory === 'professional'
                  ? 'bg-white text-[rgb(122,107,235)] shadow-md'
                  : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                For Professionals
              </button>
              <button
                onClick={() => setActiveStepCategory('client')}
                className={`px-8 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${activeStepCategory === 'client'
                  ? 'bg-white text-[rgb(122,107,235)] shadow-md'
                  : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                For Clients
              </button>
            </div>
          </div>

          {/* Steps Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activeStepCategory === 'professional' ? (
              <>
                {/* Pro Step 1 */}
                <div className="bg-transparent border border-[rgb(122,107,235)]/40 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center relative group">
                  <div className="w-14 h-14 bg-white border-2 border-[rgb(122,107,235)] text-[rgb(122,107,235)] font-bold rounded-full flex items-center justify-center absolute -top-7 text-xl shadow-lg group-hover:scale-110 transition-transform">
                    01
                  </div>
                  <h3 className="text-xl font-normal mt-6 mb-4 text-gray-900 uppercase tracking-tight">
                    CREATE YOUR PROFILE
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Set up your professional profile to showcase your skills, experience, and completed projects. Verify your credentials and build your reputation on the platform.
                  </p>
                  <div className="mt-auto inline-flex items-center bg-[rgb(122,107,235)]/10 text-[rgb(122,107,235)] text-sm font-bold px-4 py-1.5 rounded-full">
                    <ClockIcon className="w-4 h-4 mr-2" />
                    24–48 hours (to verify)
                  </div>
                </div>

                {/* Pro Step 2 */}
                <div className="bg-transparent border border-[rgb(122,107,235)]/40 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center relative group">
                  <div className="w-14 h-14 bg-white border-2 border-[rgb(122,107,235)] text-[rgb(122,107,235)] font-bold rounded-full flex items-center justify-center absolute -top-7 text-xl shadow-lg group-hover:scale-110 transition-transform">
                    02
                  </div>
                  <h3 className="text-xl font-normal mt-6 mb-4 text-gray-900 uppercase tracking-tight">
                    FIND QUALIFIED LEADS
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Browse verified project briefs from serious clients actively looking for professionals like you. Filter by budget, project type, location, and complexity.
                  </p>
                  <div className="mt-auto inline-flex items-center bg-green-50 text-green-700 text-sm font-bold px-4 py-1.5 rounded-full border border-green-100">
                    <CheckCircleIcon className="w-4 h-4 mr-2" />
                    Real budgets, verified clients
                  </div>
                </div>

                {/* Pro Step 3 */}
                <div className="bg-transparent border border-[rgb(122,107,235)]/40 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center relative group">
                  <div className="w-14 h-14 bg-white border-2 border-[rgb(122,107,235)] text-[rgb(122,107,235)] font-bold rounded-full flex items-center justify-center absolute -top-7 text-xl shadow-lg group-hover:scale-110 transition-transform">
                    03
                  </div>
                  <h3 className="text-xl font-normal mt-6 mb-4 text-gray-900 uppercase tracking-tight">
                    SECURE THE PROJECT
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Propose your expertise directly to clients, negotiate terms, and finalize agreements through the platform. Start working with confidence and build your portfolio.
                  </p>
                  <div className="mt-auto inline-flex items-center bg-[rgb(122,107,235)] text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-md">
                    <Zap className="w-4 h-4 mr-2" />
                    Go Live Today
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Client Step 1 */}
                <div className="bg-transparent border border-[rgb(122,107,235)]/40 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center relative group">
                  <div className="w-14 h-14 bg-white border-2 border-[rgb(122,107,235)] text-[rgb(122,107,235)] font-bold rounded-full flex items-center justify-center absolute -top-7 text-xl shadow-lg group-hover:scale-110 transition-transform">
                    01
                  </div>
                  <h3 className="text-xl font-normal mt-6 mb-4 text-gray-900 uppercase tracking-tight">
                    POST YOUR PROJECT BRIEF
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Describe your project—what you need, budget, and timeline. Provide detail so architects can understand your vision and submit relevant proposals.
                  </p>
                  <div className="mt-auto inline-flex items-center bg-[rgb(122,107,235)]/10 text-[rgb(122,107,235)] text-sm font-bold px-4 py-1.5 rounded-full">
                    <ClockIcon className="w-4 h-4 mr-2" />
                    10 minutes to post
                  </div>
                </div>

                {/* Client Step 2 */}
                <div className="bg-transparent border border-[rgb(122,107,235)]/40 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center relative group">
                  <div className="w-14 h-14 bg-white border-2 border-[rgb(122,107,235)] text-[rgb(122,107,235)] font-bold rounded-full flex items-center justify-center absolute -top-7 text-xl shadow-lg group-hover:scale-110 transition-transform">
                    02
                  </div>
                  <h3 className="text-xl font-normal mt-6 mb-4 text-gray-900 uppercase tracking-tight">
                    BROWSE ARCHITECT RESPONSES
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Licensed architects submit proposals. View their credentials, completed projects, and reviews. Compare professionals to find your perfect match.
                  </p>
                  <div className="mt-auto inline-flex items-center bg-blue-50 text-blue-700 text-sm font-bold px-4 py-1.5 rounded-full border border-blue-100">
                    <Zap className="w-4 h-4 mr-2" />
                    Responses within 24 hours
                  </div>
                </div>

                {/* Client Step 3 */}
                <div className="bg-transparent border border-[rgb(122,107,235)]/40 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center relative group">
                  <div className="w-14 h-14 bg-white border-2 border-[rgb(122,107,235)] text-[rgb(122,107,235)] font-bold rounded-full flex items-center justify-center absolute -top-7 text-xl shadow-lg group-hover:scale-110 transition-transform">
                    03
                  </div>
                  <h3 className="text-xl font-normal mt-6 mb-4 text-gray-900 uppercase tracking-tight">
                    HIRE & BEGIN YOUR PROJECT
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Select your architect, finalize agreements through Archireach, and start with confidence. All communication happens on-platform for your protection.
                  </p>
                  <div className="mt-auto inline-flex items-center bg-[rgb(122,107,235)] text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-md">
                    <Lock className="w-4 h-4 mr-2" />
                    Secure & Protected
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* featured projects */}

      <FeaturedProjects />


      {/* Latest Articles Carousel */}
      <LatestArticlesCarousel articles={articles} />


      <div className='bg-white py-6 px-4'>
        <div className='max-w-6xl mx-auto'>
          {/* Header */}
          <div className='relative mb-10'>
            <div className='text-center'>
              <Reveal as='h2' delay={60} className='text-3xl md:text-4xl font-semibold text-black mb-4'>
                Trusted by <span className='text-[rgb(122,107,235)]'>1,000+ Architects Across India</span>
              </Reveal>
              <p className='text-black/70 max-w-2xl mx-auto'>
                Architects use Archireach to grow their practice, connect with verified clients, and find projects faster.
              </p>
            </div>

            <div className='hidden md:flex items-center gap-3 absolute right-0 top-1/2 -translate-y-1/2'>
              <button
                type="button"
                onClick={() => scrollTestimonials(-1)}
                aria-label="Scroll testimonials left"
                className='w-11 h-11 rounded-full bg-white border border-black/10 shadow-sm flex items-center justify-center hover:bg-gray-50 transition'
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-black">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => scrollTestimonials(1)}
                aria-label="Scroll testimonials right"
                className='w-11 h-11 rounded-full bg-white border border-black/10 shadow-sm flex items-center justify-center hover:bg-gray-50 transition'
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-black">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
          {/* Testimonials Horizontal Scroll */}
          <div ref={testimonialsScrollRef} className="overflow-x-auto flex space-x-6 px-4 py-8 scrollbar-hide scroll-smooth">
            {(dynamicTestimonials.length > 0 ? dynamicTestimonials : testimonials).map((testimonial, index) => (
              <div key={index} className="flex-shrink-0 w-80 md:w-96">
                <TestimonialCard
                  rating={testimonial.rating}
                  testimonial={testimonial.comment || testimonial.testimonial}
                  name={testimonial.clientName || testimonial.name}
                  title={testimonial.company || testimonial.title}
                  avatar={testimonial.avatar}
                />
              </div>
            ))}
          </div>




          {/* Metrics Grid */}
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4 text-center mt-5 justify-items-center max-w-5xl mx-auto'>
            {/* Card 1 */}
            <div className='bg-white text-black border border-purple-200 hover:border-[rgb(122,107,235)] rounded-xl px-4 py-3 flex flex-col items-center shadow-sm w-full max-w-[185px]'>
              <h3 className='text-3xl font-normal mb-0.5'>1,000+</h3>
              <p className='text-xs opacity-90'>Verified Architects</p>
              <p className='text-[11px] mt-0.5 opacity-70'>Joined in the last 2 weeks</p>
            </div>

            {/* Card 2 */}
            <div className='bg-white text-black border border-purple-200 hover:border-[rgb(122,107,235)] rounded-xl px-4 py-3 flex flex-col items-center shadow-sm w-full max-w-[185px]'>
              <h3 className='text-3xl font-normal mb-0.5'>2,500+</h3>
              <p className='text-xs opacity-90'>Projects Posted</p>
              <p className='text-[11px] mt-0.5 opacity-70'>Every month on Archireach</p>
            </div>

            {/* Card 3 */}
            <div className='bg-white text-black border border-purple-200 hover:border-[rgb(122,107,235)] rounded-xl px-4 py-3 flex flex-col items-center shadow-sm w-full max-w-[185px]'>
              <h3 className='text-3xl font-normal mb-0.5'>95%</h3>
              <p className='text-xs opacity-90'>Success Rate</p>
              <p className='text-[11px] mt-0.5 opacity-70'>Projects completed successfully</p>
            </div>

            {/* Card 4 */}
            <div className='bg-white text-black border border-purple-200 hover:border-[rgb(122,107,235)] rounded-xl px-4 py-3 flex flex-col items-center shadow-sm w-full max-w-[185px]'>
              <h3 className='text-3xl font-normal mb-0.5'>24 hrs</h3>
              <p className='text-xs opacity-90'>Average Lead Time</p>
              <p className='text-[11px] mt-0.5 opacity-70'>Architects get qualified leads</p>
            </div>
          </div>


        </div>
      </div>


      <FAQAccordion />

      <div className='bg-white py-10 sm:py-14 px-4'>
        <div className='max-w-6xl mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>

            <div className='bg-white rounded-2xl border border-purple-100 shadow-sm p-6 sm:p-8'>
              <div className='inline-flex items-center px-3 py-1 rounded-full border border-gray-200 text-[10px] tracking-[0.25em] font-extrabold text-gray-700'>
                ARCHITECTS
              </div>

              <div className='mt-4 flex items-start gap-3'>
                <CheckCircle className='w-7 h-7 text-[rgb(122,107,235)] flex-shrink-0 mt-0.5' />
                <h3 className='text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 leading-tight'>
                  Ready to start your project?
                </h3>
              </div>

              <div className='mt-5 space-y-4 text-gray-700'>
                <div className='flex items-start gap-3'>
                  <Users className='w-5 h-5 text-[rgb(122,107,235)] flex-shrink-0 mt-0.5' />
                  <p className='text-sm leading-relaxed'>
                    Find licensed, verified architects for your project in your city. Post your requirements once and get responses from the right professionals.
                  </p>
                </div>

                <div className='flex items-start gap-3'>
                  <CheckCircle className='w-5 h-5 text-[rgb(122,107,235)] flex-shrink-0 mt-0.5' />
                  <p className='text-sm leading-relaxed'>
                    Join 500+ firms already hiring through Archireach.
                  </p>
                </div>
              </div>

              <div className='mt-7'>
                <button
                  onClick={() => navigate('/signup')}
                  className='w-full sm:w-auto px-7 py-3 rounded-full text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200 bg-[rgb(122,107,235)]'>
                  Post a Project
                </button>
              </div>
            </div>

            <div className='bg-white rounded-2xl border border-purple-100 shadow-sm p-6 sm:p-8'>
              <div className='inline-flex items-center px-3 py-1 rounded-full border border-gray-200 text-[10px] tracking-[0.25em] font-extrabold text-gray-700'>
                PROJECTS
              </div>

              <div className='mt-4 flex items-start gap-3'>
                <CheckCircle className='w-7 h-7 text-[rgb(122,107,235)] flex-shrink-0 mt-0.5' />
                <h3 className='text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 leading-tight'>
                  Ready to grow your practice?
                </h3>
              </div>

              <div className='mt-5 space-y-4 text-gray-700'>
                <div className='flex items-start gap-3'>
                  <Users className='w-5 h-5 text-[rgb(122,107,235)] flex-shrink-0 mt-0.5' />
                  <p className='text-sm leading-relaxed'>
                    Get matched with serious, pre-qualified clients and projects that fit your skills, location, and budget range. Build a steady pipeline of quality work.
                  </p>
                </div>

                <div className='flex items-start gap-3'>
                  <CheckCircle className='w-5 h-5 text-[rgb(122,107,235)] flex-shrink-0 mt-0.5' />
                  <p className='text-sm leading-relaxed'>
                    Join 1,000+ architects already getting clients on Archireach.
                  </p>
                </div>
              </div>

              <div className='mt-7'>
                <button
                  onClick={() => navigate('/signup')}
                  className='w-full sm:w-auto px-7 py-3 rounded-full text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200 bg-[rgb(122,107,235)]'>
                  Join as Architect - Start Free Trial
                </button>
                <p className='text-[11px] text-gray-500 mt-3'>
                  3 months free. No credit card required. Cancel anytime.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>


      {/* Join the ArchConnect Community Today + footer*/}

      <div className="bg-white pt-0 pb-32">
        <div className="mt-0">
          <div className="relative bg-[rgba(162,142,245,0.4)] py-6 px-4 mx-auto max-w-5xl rounded-3xl">
            {/* Main Content */}
            <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-4">
              <Reveal as="h1" delay={60} className="text-[32px] font-semibold text-black">
                Join the Archireach Community Today
              </Reveal>
              <p className="text-base text-black/70 max-w-2xl leading-relaxed">
                Connect with architects, find projects, and grow your practice with real opportunities in your city. Join our growing network of verified professionals.
              </p>
            </div>
            {/* Button overlapping bottom edge */}
            <div className="static mt-6 flex justify-center md:absolute md:mt-0 md:bottom-[-20px] md:left-1/2 md:-translate-x-1/2">
              <button
                onClick={() => navigate('/community')}
                className="px-5 py-2.5 bg-[rgb(122,107,235)] text-white rounded-full font-semibold shadow-md hover:bg-[rgb(90,75,200)] transition-all duration-200 flex items-center space-x-2">
                Create Account
              </button>

            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>

  );
}

export default LandingPage;
