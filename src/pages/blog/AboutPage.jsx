import React, { useState } from 'react';
import { FaStar, FaUser } from 'react-icons/fa';
import SharedNavbar from '../../components/Layout/SharedNavbar';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Milestone, CheckCircle as CheckCircleIcon, Users as UsersIcon, Clock, Zap, Lock, CheckCircle, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { useEffect, useRef } from "react";
import Footer from '../../components/Footer';
import Reveal from '../../components/Reveal';
import missionImg from '../../assets/mission.jpeg';
import visionImg from '../../assets/vision.jpeg';
import aboutHeroImg from '../../assets/about.jpeg';
import whyBuilt1Img from '../../assets/arch.jpg';
import whyBuilt2Img from '../../assets/arch2.jpg';
import whyBuilt3Img from '../../assets/arch3.jpg';
import registerImg from '../../assets/register.png';
import NavbarAll from '../../components/NavbarAll';

// Animated Counter Component
const AnimatedCounter = ({ target, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;

            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                setCount(target);
                clearInterval(timer);
              } else {
                setCount(Math.floor(current));
              }
            }, 16);

            return () => clearInterval(timer);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [target]);

  return (
    <span ref={counterRef}>
      {count}{suffix}
    </span>
  );
};

const testimonials = [
  { name: "Alice Johnson", title: "Architect", quote: "Great platform! It has streamlined communication with clients and made project management so much easier.", rating: 5 },
  { name: "Bob Smith", title: "Student", quote: "Loved it! The resources and community support are amazing for learning architecture.", rating: 4 },
  { name: "Carla Williams", title: "Interior Designer", quote: "A must-have tool for every design professional. It helps me connect with clients efficiently.", rating: 5 },
  { name: "David Lee", title: "Firm Owner", quote: "The platform has significantly increased our project visibility. Highly recommend!", rating: 5 },
  { name: "Emma Davis", title: "Architecture Student", quote: "Incredible learning opportunities and feedback from professionals. So helpful for my portfolio.", rating: 4 },
  { name: "Frank Turner", title: "Civil Engineer", quote: "Collaborating with architects has never been this smooth. Love the intuitive interface.", rating: 5 },
  { name: "Grace Kim", title: "Interior Architect", quote: "The community and features are top-notch. It keeps me updated on trends and client needs.", rating: 5 },
  { name: "Henry Thompson", title: "Project Manager", quote: "Efficient, easy-to-use, and professional. It's become an essential tool for our team.", rating: 4 },
  { name: "Isabella Martinez", title: "Landscape Architect", quote: "Connecting with clients and sharing project ideas is now effortless. Great platform!", rating: 5 },
  { name: "Jack Wilson", title: "Urban Planner", quote: "Very intuitive and supportive community. Helps me stay organized and inspired.", rating: 4 }
];

function TestimonialsDropdown() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        {/* Heading */}
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            What Our Community Says
          </h2>
          <p className="text-gray-600 text-lg sm:text-lg max-w-2xl mx-auto">
            Hear from architects, firms, students, and institutions who have joined our platform.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 relative z-10">
          {testimonials.map((t, i) => {
            const isOpen = openIndex === i;

            return (
              <div
                key={i}
                className={`relative bg-white shadow-lg transition-all duration-500
                  ${isOpen ? "rounded-t-2xl" : "rounded-2xl"}
                `}
              >
                {/* Header */}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between p-5 cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center space-x-4">
                    {/* User Icon */}
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                      style={{
                        background: 'linear-gradient(to top right, rgb(122,107,235), rgb(140,125,240))',
                      }}
                    >
                      <FaUser className="w-6 h-6 text-white" />
                    </div>

                    <div>
                      {/* Name and Title */}
                      <div className="flex items-center space-x-2">
                        <p className="font-semibold text-gray-900">{t.name}</p>
                        <p className="text-gray-500 text-sm">{t.title}</p>
                      </div>

                      {/* Rating Stars */}
                      <div className="flex items-center space-x-1 mt-1">
                        {[...Array(t.rating)].map((_, i) => (
                          <FaStar key={i} className="w-4 h-4" style={{ color: 'rgb(122,107,235)' }} />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Chevron Icon */}
                  <span
                    className={`transform transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
                    style={{ color: 'rgb(122,107,235)' }}
                  >
                    ▼
                  </span>
                </button>

                {/* Expandable Content */}
                <div
                  className={`absolute left-0 right-0 top-full bg-white rounded-b-2xl shadow-lg px-5 py-5 z-20 transition-all duration-300 origin-top transform ${isOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
                    }`}
                >
                  <p className="text-gray-700 text-base leading-relaxed italic">{t.quote}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Decorative Shapes */}
        <div
          className="absolute top-0 left-0 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl -z-10"
          style={{ backgroundColor: 'rgb(122,107,235)', opacity: 0.2 }}
        ></div>
        <div
          className="absolute bottom-0 right-0 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl -z-10"
          style={{ backgroundColor: 'rgb(140,125,240)', opacity: 0.2 }}
        ></div>
      </div>
    </section>
  );
}

function MilestoneStepper() {
  const milestones = [
    { quarter: "2024 Q1", title: "Archireach Founded", desc: "Problem identified. Team assembled. Vision set." },
    { quarter: "2024 Q2", title: "Product Launch", desc: "First version of Archireach platform released. Positive initial feedback." },
    { quarter: "2024 Q3", title: "New Feature", desc: "Added tools to improve architect-client interaction." },
    { quarter: "2024 Q4", title: "Achievements", desc: "Reached 500+ verified architects and 1,000+ projects." },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate milestones gradually only when the component enters viewport
            let step = 0;
            const interval = setInterval(() => {
              setCurrentStep(step);
              step++;
              if (step >= milestones.length) clearInterval(interval);
            }, 800);
            observer.unobserve(containerRef.current);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, []);

  const progressPercent = ((currentStep + 1) / milestones.length) * 100;

  return (
    <div className="w-full py-24 flex flex-col items-center" ref={containerRef}>
      <div className="max-w-7xl w-full mx-auto text-center px-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/60 backdrop-blur px-4 py-2 text-xs font-semibold tracking-[0.25em] uppercase text-black/60">
          Milestones
        </div>
        <h2 className="mt-5 text-4xl md:text-5xl font-extrabold text-gray-900 mb-10 tracking-tight">
          Archireach Milestones
        </h2>

        {/* Progress Bar */}
        <div className="relative w-full max-w-4xl mx-auto">
          <div className="relative w-full h-2 bg-white/70 border border-black/5 rounded-full mb-10 overflow-hidden">
            <div
              className="absolute h-2 rounded-full top-0 left-0 transition-all duration-500 ease-in-out"
              style={{
                width: `${progressPercent}%`,
                background: 'linear-gradient(to right, rgb(122,107,235), rgb(140,125,240))',
              }}
            ></div>
          </div>
        </div>

        {/* Milestones */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full relative">
          {milestones.map((item, idx) => {
            const isCompleted = idx <= currentStep;
            return (
              <div key={idx} className="flex flex-col items-center text-center w-full relative z-10">
                {/* Circle Step */}
                <div
                  className={`w-6 h-6 rounded-full mb-2 border-2 transition-colors duration-500 flex items-center justify-center`}
                  style={{
                    borderColor: isCompleted ? 'rgb(122,107,235)' : 'rgb(200,200,200)',
                  }}
                >
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{
                      backgroundColor: isCompleted ? 'rgb(122,107,235)' : 'white',
                    }}
                  ></div>
                </div>

                {/* Texts */}
                <p
                  className="text-sm font-semibold mb-1"
                  style={{ color: isCompleted ? 'rgb(51,51,51)' : 'rgb(150,150,150)' }}
                >
                  {item.quarter}
                </p>
                <h3
                  className="text-lg font-bold"
                  style={{ color: isCompleted ? 'rgb(51,51,51)' : 'rgb(130,130,130)' }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-sm"
                  style={{ color: isCompleted ? 'rgb(80,80,80)' : 'rgb(150,150,150)' }}
                >
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function TeamCarousel() {
  const team = [
    {
      role: "Founder & CEO",
      name: "Founder & CEO",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRau_w6d5bqXyxAGkQdzEEGzvjZ8VfqIc4fgQ&s",
      title: "Architecture enthusiast | Tech entrepreneur | Vision-driven",
      desc: "Started Archireach to solve the trust problem in Indian architecture. Believes every architect deserves a platform."
    },
    {
      role: "Co-founder & CTO",
      img: "https://www.profilebakery.com/wp-content/uploads/2023/04/AI-Profile-Picture.jpg",
      title: "Platform architect | 10+ years in tech | Product-focused",
      desc: "Builds the technology that powers trust. Passionate about creating tools architects love."
    },
    {
      role: "Architecture Advisor",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLEECebQPd8rGavqsOhrKrLpauVWYNel4whg&s",
      title: "Registered Architect | Former COA committee member | Standards expert",
      desc: "Ensures Archireach aligns with COA standards and serves the profession. Committed to professional excellence."
    },
    {
      role: "Community Manager",
      img: "https://cdn.prod.website-files.com/6600e1eab90de089c2d9c9cd/662c092880a6d18c31995dfd_66236531e8288ee0657ae7a7_Business%2520Professional.webp",
      title: "Community builder | Customer success obsessed | India operations",
      desc: "Makes sure architects and clients feel supported and heard. Your voice matters to us."
    },
  ];

  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent(current === 0 ? team.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === team.length - 1 ? 0 : current + 1);
  };

  return (
    <div className="w-full py-24 flex flex-col items-center">
      <div className="max-w-7xl w-full px-6 mx-auto text-center mb-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/60 backdrop-blur px-4 py-2 text-xs font-semibold tracking-[0.25em] uppercase text-black/60">
          Team
        </div>
        <h2 className="mt-5 text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 tracking-tight">
          Meet the Team Behind Archireach
        </h2>
        <p className="text-gray-700 text-base md:text-lg">
          A passionate group building the future of Indian architecture.
        </p>
      </div>

      {/* Team Card */}
      <div className="w-full max-w-5xl px-6 relative">
        <div className="relative bg-white/70 backdrop-blur-xl border border-black/5 shadow-[0_18px_55px_rgba(15,23,42,0.10)] p-8 rounded-3xl text-center transition duration-500">
          {/* Image */}
          <div className="mx-auto mb-5 w-60 h-60 rounded-full overflow-hidden border-2 border-[rgb(122,107,235)] shadow-lg">
            <img
              src={team[current].img}
              alt={team[current].role}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Role / Title / Description */}
          <h3 className="font-semibold mb-1" style={{ color: 'rgb(122,107,235)' }}>
            {team[current].role}
          </h3>
          <h4 className="mb-3 text-sm" style={{ color: 'rgb(100,90,220)' }}>
            {team[current].title}
          </h4>
          <p className="text-sm" style={{ color: 'rgb(80,70,180)' }}>{team[current].desc}</p>

          {/* Prev Button */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/70 backdrop-blur border border-black/10 text-gray-800 shadow-md hover:bg-white transition-all duration-300"
            aria-label="Previous Slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/70 backdrop-blur border border-black/10 text-gray-800 shadow-md hover:bg-white transition-all duration-300"
            aria-label="Next Slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Join Team Section */}
      <div className="max-w-7xl w-full px-6 mt-16">
        <div className="bg-white/70 backdrop-blur-xl border border-black/5 shadow-[0_18px_55px_rgba(15,23,42,0.10)] p-12 rounded-3xl text-center">
          <p className="text-gray-700 text-lg mb-6">
            Join a team building the future of Indian architecture. We're looking for passionate individuals.
          </p>
          <a
            href="/careers"
            className="inline-block bg-[rgb(122,107,235)] text-white font-semibold px-6 py-3 rounded-full text-lg hover:bg-[rgb(100,90,220)] transition"
          >
            View Open Positions →
          </a>
        </div>
      </div>
    </div>
  );
}

function CoreValues() {
  const cards = [
    {
      title: "Trust",
      content:
        "Every professional verified. Every standard maintained. Your confidence is our foundation.",
      gradient: "from-gray-900 to-gray-700",
      text: "text-gray-900",
      iconBg: "bg-gray-100",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 1.104-.895 2-2 2s-2-.896-2-2 .895-2 2-2 2 .896 2 2zm0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
    },
    {
      title: "Excellence",
      content:
        "We set high standards. We support quality. We celebrate professional growth.",
      gradient: "from-purple-600 to-indigo-600",
      text: "text-purple-700",
      iconBg: "bg-purple-100",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2l3 7h7l-5.5 4 2 7-6-4-6 4 2-7L2 9h7l3-7z" />
        </svg>
      ),
    },
    {
      title: "Community",
      content:
        "We believe in collaboration. We strengthen the profession. We support each other's success.",
      gradient: "from-gray-800 to-gray-600",
      text: "text-gray-900",
      iconBg: "bg-gray-100",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M12 12a5 5 0 100-10 5 5 0 000 10z" />
        </svg>
      ),
    },
    {
      title: "Innovation",
      content:
        "We embrace technology. We simplify complexity. We build better tools for architecture.",
      gradient: "from-purple-600 to-fuchsia-600",
      text: "text-purple-700",
      iconBg: "bg-purple-100",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="relative w-full py-24">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/60 backdrop-blur px-4 py-2 text-xs font-semibold tracking-[0.25em] uppercase text-black/60">
          Values
        </div>
        <h2 className="mt-5 text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
          Our Core Values
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-gray-600">
          The principles that guide our platform, our professionals, and our future.
        </p>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="group relative bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-black/5 shadow-[0_14px_45px_rgba(15,23,42,0.10)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_18px_55px_rgba(15,23,42,0.14)]"
            >
              {/* Icon + Skew Accent */}
              <div className="relative mb-6 flex justify-center">
                {/* Skewed Background */}
                <div
                  className={`
      absolute -bottom-2 w-16 h-16 rounded-xl
      bg-gradient-to-br ${card.gradient}
      opacity-15 group-hover:opacity-30
      transform skew-x-[-12deg]
      transition duration-300
    `}
                />

                {/* Icon */}
                <div
                  className={`
      relative z-10 w-14 h-14 flex items-center justify-center
      rounded-xl ${card.iconBg} text-gray-900
    `}
                >
                  {card.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className={`relative text-xl font-semibold mb-3 ${card.text}`}>
                {card.title}
              </h3>

              {/* Description */}
              <p className="relative text-sm leading-relaxed text-gray-600">
                {card.content}
              </p>

              {/* Bottom Skew Line */}
              <div
                className={`relative mt-6 h-1 w-full bg-gradient-to-r ${card.gradient} transform skew-x-[-12deg] rounded-full`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const faqs = [
  {
    question: "What is Archireach?",
    answer: "Archireach is India's trusted platform for discovering verified architects. We connect clients with professionals and strengthen the architecture community."
  },
  {
    question: "Is every architect on Archireach verified?",
    answer: "Yes. Every architect is verified with the Council of Architecture (COA). This ensures they are registered, qualified, and compliant with professional standards."
  },
  {
    question: "How does Archireach make money?",
    answer: "Archireach earns revenue through premium listings and verified client leads. We do not charge commissions on project fees, keeping the platform fair for architects."
  },
  {
    question: "How do I get verified as an architect?",
    answer: "Architects can apply through our verification process on the platform. We confirm COA registration and professional credentials to issue a verified badge."
  },
  {
    question: "What cities are covered?",
    answer: "Archireach currently covers 50+ cities across India. We continue to expand to make verified architects accessible nationwide."
  },
  {
    question: "How is Archireach different from other platforms?",
    answer: "Archireach combines COA verification, ratings, and client reviews. We focus on India-specific architecture standards and a professional ecosystem."
  },
  {
    question: "Do you charge commissions on projects?",
    answer: "No, we do not take commissions. Architects receive 100% of project fees while benefiting from verified leads."
  },
  {
    question: "How do I contact support?",
    answer: "You can reach us via the contact form or email listed on our platform. Our team ensures timely assistance for both clients and architects."
  }
];

function FAQAccordion({ faqs }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full py-24">
      <div className="max-w-7xl w-full mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/60 backdrop-blur px-4 py-2 text-xs font-semibold tracking-[0.25em] uppercase text-black/60">
          FAQs
        </div>
        <h2 className="mt-5 text-[44px] leading-tight font-extrabold text-gray-900 mb-12 tracking-tight" style={{ fontFamily: "'FS Dillon', sans-serif" }}>
          Frequently Asked Questions
        </h2>

        <div className="flex flex-col gap-4 text-left">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl shadow-md cursor-pointer hover:shadow-lg transition-all duration-500 overflow-hidden border-l-4 ${openIndex === index
                  ? "border-[rgb(122,107,235)]"
                  : "border-transparent"
                }`}
              onClick={() => toggle(index)}
            >
              <div className="flex justify-between items-center p-6">
                <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                  {faq.question}
                </h3>
                <ChevronDownIcon
                  className={`h-6 w-6 text-gray-600 transform transition-transform duration-500 ${openIndex === index ? "rotate-180" : "rotate-0"
                    }`}
                />
              </div>

              <div
                className={`px-6 pb-6 text-gray-600 text-sm transition-all duration-500 ease-in-out ${openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
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

const headerNav = [
  { name: 'Services', href: '#' },
  { name: 'Platform', href: '#' },
  { name: 'Our Work', href: '#' },
  { name: 'About', href: '#' },
];

const heroImage = {
  alt: 'Archireach About Hero',
  src: aboutHeroImg,
};

const visionStatement = {
  heading: 'We help you evolve your vision into a landmark project by using the unrivaled expertise of our highly qualified design and construction team.',
  paragraph: 'Our comprehensive services, spanning from architecture to structural engineering, sustainable materials, urban planning, smart infrastructure, and more help you expand your architectural footprint and create spaces that stand the test of time.',
};

const mission = {
  heading: 'Mission',
  paragraph: 'We aim at transforming the spatial experience of our clients into cost-effective, functional, user-centric, and innovative architectural solutions. Operational recognition and adaptability are the cornerstones of our design philosophy, empowering clients to realize their presence in the built environment.',
  image: {
    alt: 'Traditional Architecture Details',
    src: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
};

const vision = {
  heading: 'Vision',
  paragraph: 'We envision becoming a global leader in delivering world-class architectural and construction solutions. Our eye for detail, dedication to sustainability, and commitment to excellence, craftsmen and designers help projects evolve into enduring and valuable assets.',
  image: {
    alt: 'Traditional Islamic Architecture with Minarets',
    src: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
};

const infoCards = [
  {
    heading: 'Building world class teams and infrastructure',
    paragraph: 'We are committed to bring premium infrastructure and top 3% innovative architects with bandwidth of 500+ employees that help in inhouse development team with their experience.',
  },
  {
    heading: 'Who we are, how to join us and partnership',
    paragraph: 'We are a curious team of creative IT people who understand the importance of entrepreneurship and enterprises by providing scalable, cost-effective and reliable software solutions.',
  },
  {
    heading: 'Excellence in architectural innovation',
    paragraph: 'We foster innovation through cutting-edge design methodologies and sustainable practices, creating architectural solutions that meet modern challenges while preserving timeless aesthetic values.',
  },
];

const communitySection = {
  heading: 'Join the ArchConnect Community Today',
  paragraph: 'Connect with architects, share design insights, and advance your architectural knowledge. Join our growing community of professionals.',
  ctaButtons: [
    { text: 'Create Account', href: '#', style: 'bg-white text-gray-800 hover:bg-gray-50' },
    { text: 'Contact Us', href: '#', style: 'bg-purple-600 text-white hover:bg-purple-700' },
  ],
};

const footerLinks = [
  {
    title: 'Quick Links',
    links: [
      { name: 'Home', href: '#' },
      { name: 'About', href: '#' },
      { name: 'Projects', href: '#' },
      { name: 'Services', href: '#' },
      { name: 'Contact', href: '#' },
    ],
  },
  {
    title: 'For Users',
    links: [
      { name: 'Architects', href: '#' },
      { name: 'Firms', href: '#' },
      { name: 'Students', href: '#' },
      { name: 'Builders', href: '#' },
      { name: 'Designers', href: '#' },
    ],
  },
];

const socialLinks = [
  { name: 'f', href: '#' },
  { name: 't', href: '#' },
  { name: 'in', href: '#' },
];

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 fill-gray-300'}`}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
      </svg>
    );
  }
  return <div className="flex space-x-1 mb-4">{stars}</div>;
};

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
        onClick={() => navigate('/pricing')}
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
        <UsersIcon className='h-6 w-6' />
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
        onClick={() => navigate('/pages/ExploreDrop/FindArch')}
        className='mt-auto bg-[rgb(122,107,235)] text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-[rgb(90,75,200)] transition w-full md:w-auto'
      >
        Find Professionals
      </button>
    </div>
  );
}

const AboutPage = () => {
  const [valueSlide, setValueSlide] = useState(0);
  const [activeStepCategory, setActiveStepCategory] = useState('professional');

  const missionVisionImages = {
    mission: missionImg,
    vision: visionImg,
  };

  const valueSlides = [
    {
      title: "Trust",
      description: "Every architect is verified. Every client is genuine. We build a platform earned through honest credentials and transparent work.",
      bullets: [
        "Every architect is verified",
        "Every client is genuine",
        "Honest credentials and transparent work",
      ],
      bg: "bg-amber-50",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 1.104-.895 2-2 2s-2-.896-2-2 .895-2 2-2 2 .896 2 2zm0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
      art: (
        <svg viewBox="0 0 320 220" className="w-full h-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <linearGradient id="trustG" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="rgba(122,107,235,0.22)" />
              <stop offset="1" stopColor="rgba(122,107,235,0.06)" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="320" height="220" rx="24" fill="url(#trustG)" />
          <path d="M160 42c28 14 56 14 56 14v62c0 46-36 70-56 78-20-8-56-32-56-78V56s28 0 56-14z" fill="rgba(122,107,235,0.18)" stroke="rgba(122,107,235,0.45)" strokeWidth="3" />
          <path d="M128 118l20 20 44-48" fill="none" stroke="rgba(122,107,235,0.9)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="64" cy="70" r="6" fill="rgba(122,107,235,0.35)" />
          <circle cx="256" cy="160" r="7" fill="rgba(122,107,235,0.28)" />
        </svg>
      ),
    },
    {
      title: "Opportunity",
      description: "Architects shouldn't compete on marketing budgets. They should compete on skill. We level the playing field.",
      bullets: [
        "Compete on skill, not marketing budgets",
        "Equal opportunity to be discovered",
        "Level playing field for every architect",
      ],
      bg: "bg-violet-50",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2l3 7h7l-5.5 4 2 7-6-4-6 4 2-7L2 9h7l3-7z" />
        </svg>
      ),
      art: (
        <svg viewBox="0 0 320 220" className="w-full h-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <linearGradient id="exG" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="rgba(122,107,235,0.20)" />
              <stop offset="1" stopColor="rgba(122,107,235,0.05)" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="320" height="220" rx="24" fill="url(#exG)" />
          <path d="M160 40l18 40 44 4-34 28 10 42-38-22-38 22 10-42-34-28 44-4 18-40z" fill="rgba(122,107,235,0.18)" stroke="rgba(122,107,235,0.5)" strokeWidth="3" />
          <rect x="92" y="160" width="136" height="20" rx="10" fill="rgba(122,107,235,0.18)" />
          <rect x="120" y="180" width="80" height="14" rx="7" fill="rgba(122,107,235,0.12)" />
          <circle cx="66" cy="156" r="7" fill="rgba(122,107,235,0.28)" />
          <circle cx="260" cy="70" r="6" fill="rgba(122,107,235,0.32)" />
        </svg>
      ),
    },
    {
      title: "Community",
      description: "Architecture is stronger together. We're building more than a marketplace—we're building the professional community architects deserve.",
      bullets: [
        "More than a marketplace",
        "A professional community for architects",
        "Grow stronger together",
      ],
      bg: "bg-sky-50",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M12 12a5 5 0 100-10 5 5 0 000 10z" />
        </svg>
      ),
      art: (
        <svg viewBox="0 0 320 220" className="w-full h-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <linearGradient id="comG" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="rgba(122,107,235,0.18)" />
              <stop offset="1" stopColor="rgba(122,107,235,0.04)" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="320" height="220" rx="24" fill="url(#comG)" />
          <circle cx="120" cy="96" r="26" fill="rgba(122,107,235,0.18)" />
          <circle cx="200" cy="90" r="22" fill="rgba(122,107,235,0.15)" />
          <circle cx="160" cy="126" r="30" fill="rgba(122,107,235,0.22)" />
          <path d="M70 176c12-26 36-42 66-42s54 16 66 42" fill="none" stroke="rgba(122,107,235,0.65)" strokeWidth="6" strokeLinecap="round" />
          <path d="M140 176c10-22 28-34 52-34 16 0 30 6 42 18" fill="none" stroke="rgba(122,107,235,0.40)" strokeWidth="6" strokeLinecap="round" />
          <circle cx="62" cy="72" r="6" fill="rgba(122,107,235,0.30)" />
          <circle cx="260" cy="158" r="7" fill="rgba(122,107,235,0.26)" />
        </svg>
      ),
    },
  ];

  const nextValueSlide = () => setValueSlide((v) => (v + 1) % valueSlides.length);
  const prevValueSlide = () => setValueSlide((v) => (v - 1 + valueSlides.length) % valueSlides.length);

  return (
    <div id="root">
      <div className="about-page-typography">
        <style>{`
          .about-page-typography {
            font-family: 'Public Sans', sans-serif !important;
            font-weight: 400 !important;
          }

          .about-page-typography h1,
          .about-page-typography h2 {
            font-family: 'FS Dillon', sans-serif !important;
            font-size: 40px !important;
            font-weight: 600 !important;
            line-height: 1.1 !important;
          }

          .about-page-typography h3,
          .about-page-typography h4 {
            font-family: 'Public Sans', sans-serif !important;
            font-size: 36px !important;
            line-height: 1.15 !important;
          }

          .about-page-typography .about-heading-40 {
            font-size: 40px !important;
            font-weight: 600 !important;
          }

          .about-page-typography p,
          .about-page-typography li {
            font-family: 'Public Sans', sans-serif !important;
            font-size: 16px !important;
            line-height: 1.5 !important;
          }

          .about-page-typography .why-built-content p {
            font-size: 20px !important;
            line-height: 1.6 !important;
          }
        `}</style>
        <div className="min-h-screen bg-white">
          <div className="bg-[#ECEBFB] pt-4">
            <NavbarAll/>
          </div>

          {/* Banner Section */}
          <div className="relative w-full overflow-hidden">
            <div className="absolute inset-0 bg-[#ECEBFB]" />
            <div className="absolute -top-28 -left-28 w-[420px] h-[420px] rounded-full blur-3xl" style={{ backgroundColor: 'rgba(122,107,235,0.18)', opacity: 0 }} />
            <div className="absolute -bottom-28 -right-28 w-[420px] h-[420px] rounded-full blur-3xl" style={{ backgroundColor: 'rgba(122,107,235,0.14)', opacity: 0 }} />
            <div className="pointer-events-none absolute bottom-0 left-0 w-full h-20 bg-gradient-to-b from-transparent to-white" />

            <div className="relative max-w-7xl mx-auto px-6 py-8 md:py-12">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
                <div className="md:col-span-6">
                  <Reveal as="h1" delay={0} className="font-semibold text-[44px] leading-tight text-gray-900 tracking-tight" style={{ fontFamily: "'FS Dillon', sans-serif" }}>
                    Transforming
                    <br />
                    <span style={{ color: 'rgb(122,107,235)' }}>Architecture</span>
                    <br />
                    in India
                  </Reveal>
                  <p className="mt-5 text-[36px] font-semibold text-gray-700 leading-relaxed">
                    Every architect deserves access to clients. Every client deserves verified professionals. Archireach connects them- all verified, all trustworthy, all building India's future.
                  </p>
                </div>

                <div className="md:col-span-6 flex justify-center md:justify-end">
                  <div className="relative w-fit rounded-[28px] p-px bg-gradient-to-br from-[rgb(122,107,235)]/35 via-black/10 to-transparent shadow-[0_18px_55px_rgba(15,23,42,0.14)]">
                    <div className="relative rounded-[27px] overflow-hidden bg-white/60 backdrop-blur">
                      <img
                        src={aboutHeroImg}
                        alt="About"
                        className="w-full max-w-[440px] max-h-[280px] h-auto object-contain md:max-w-[570px] md:max-h-[440px]"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section className="w-full pt-10 pb-8 md:pt-12 md:pb-10">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-12">
                <h2
                  className="text-center font-semibold text-[40px] sm:text-5xl leading-tight text-gray-900 tracking-tight"
                  style={{ fontFamily: "'FS Dillon', sans-serif" }}
                >
                  FOUNDER STORY
                </h2>
                <p className="mt-4 text-base md:text-lg text-center text-gray-700 max-w-2xl mx-auto">
                  As an architect with 7+ years of practice experience, I watched talented architects struggle. Not because they weren’t skilled. Not because they couldn’t deliver. They struggled because they couldn’t find clients, and clients couldn’t find qualified architects in their city. The architecture profession was missing something critical—visibility.
                </p>
              </div>
            </div>
          </section>

          <section className="w-full pt-10 pb-8 md:pt-12 md:pb-10">
            <div className="max-w-7xl mx-auto px-6">
              {/* Centered heading + subheading, matching Founder Story styling */}
              <div className="text-center mb-12">
                <h2
                  className="text-center font-semibold text-[40px] sm:text-5xl leading-tight text-gray-900 tracking-tight"
                  style={{ fontFamily: "'FS Dillon', sans-serif" }}
                >
                  What We Do
                </h2>
                <p className="mt-4 text-base md:text-lg text-center text-gray-700 max-w-2xl mx-auto">
                  Archireach is India's trusted platform connecting clients with licensed architects. We help
                  architects build practices. We help clients find the right design expertise. And we're changing how
                  India thinks about architecture.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
                <div className="lg:col-span-5 flex">
                  <div className="bg-white/80 backdrop-blur-xl rounded-[28px] border border-black/5 shadow-[0_18px_55px_rgba(15,23,42,0.10)] p-6 md:p-7 w-full h-full min-h-0 flex flex-col justify-center">
                    <h3 className="text-[22px] leading-tight font-semibold tracking-tight text-gray-900">
                      Every architect
                      <span className="block">deserves access to</span>
                      <span className="block">clients.</span>
                      <span className="block" style={{ color: 'rgb(122,107,235)' }}>
                        Every client deserves
                      </span>
                      <span className="block" style={{ color: 'rgb(122,107,235)' }}>
                        verified
                      </span>
                      <span className="block" style={{ color: 'rgb(122,107,235)' }}>
                        professionals.
                      </span>
                    </h3>
                  </div>
                </div>
                <div className="lg:col-span-7 flex flex-col">
                  <div className="mt-6 lg:mt-0 grid grid-cols-1 md:grid-cols-3 gap-4 w-full flex-1 min-h-0 md:items-stretch">
                    <div className="rounded-2xl bg-white/80 backdrop-blur border border-black/5 shadow-[0_14px_45px_rgba(15,23,42,0.08)] p-6 md:h-full flex flex-col">
                      <h3 className="text-[22px] font-semibold text-gray-900">For Architects</h3>
                      <p className="mt-3 text-gray-700 leading-relaxed flex-1">
                        Find verified leads, showcase your portfolio, and grow your practice without the marketing overhead
                      </p>
                    </div>

                    <div className="rounded-2xl bg-white/80 backdrop-blur border border-black/5 shadow-[0_14px_45px_rgba(15,23,42,0.08)] p-6 md:h-full flex flex-col">
                      <h3 className="text-[22px] font-semibold text-gray-900">For Clients</h3>
                      <p className="mt-3 text-gray-700 leading-relaxed flex-1">
                        Discover qualified architects who understand your city, your climate, and your design style
                      </p>
                    </div>

                    <div className="rounded-2xl bg-white/80 backdrop-blur border border-black/5 shadow-[0_14px_45px_rgba(15,23,42,0.08)] p-6 md:h-full flex flex-col">
                      <h3 className="text-[22px] font-semibold text-gray-900">For the Industry</h3>
                      <p className="mt-3 text-gray-700 leading-relaxed flex-1">
                        Build community, visibility, and trust in Indian architecture
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full pb-16 md:pb-20">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
                <div className="relative rounded-2xl bg-gradient-to-br from-white via-white to-[rgb(122,107,235)]/5 border border-black/5 shadow-[0_18px_55px_rgba(15,23,42,0.10)] overflow-hidden">
                  <div className="p-6">
                    <h5 className="text-[18px] sm:text-[20px] leading-tight font-bold text-gray-900 tracking-tight">
                      How Architecture Lost Its Voice
                    </h5>
                    <p className="mt-3 text-[13px] leading-relaxed text-gray-700">
                      I saw architects spending precious time and resources chasing leads through outdated channels, focusing more on marketing than design. Clients were often confused about how to find a qualified architect. The entire Indian architecture community was fragmented, with no central space for architects to be discovered, verified, and trusted.
                    </p>
                    <p className="mt-4 text-[13px] leading-relaxed text-gray-700">
                      The disconnect was clear: architects had the skills, clients needed those skills, but there was no simple way to connect. That frustration became the foundation of Archireach.
                    </p>
                  </div>
                </div>

                <div className="relative rounded-2xl bg-gradient-to-br from-white via-white to-[rgb(122,107,235)]/5 border border-black/5 shadow-[0_18px_55px_rgba(15,23,42,0.10)] overflow-hidden">
                  <div className="p-6">
                    <h5 className="text-[18px] sm:text-[20px] leading-tight font-bold text-gray-900 tracking-tight">
                      Why I Built This
                    </h5>
                    <p className="mt-3 text-[13px] leading-relaxed text-gray-700">
                      Seven years in practice gave me firsthand insight into the industry's real pain points. I've managed client relationships, collaborated with other licensed architects, and understood what clients truly value in design expertise. That experience showed me exactly what the profession needed.
                    </p>
                  </div>
                </div>

                <div className="relative rounded-2xl bg-gradient-to-br from-white via-white to-[rgb(122,107,235)]/5 border border-black/5 shadow-[0_18px_55px_rgba(15,23,42,0.10)] overflow-hidden">
                  <div className="p-6">
                    <h5 className="text-[18px] sm:text-[20px] leading-tight font-bold text-gray-900 tracking-tight">
                      Archireach Isn't Just Another Platform
                    </h5>
                    <p className="mt-3 text-[13px] leading-relaxed text-gray-700">
                      It's built by an architect who understands your struggles, the time and money lost to marketing, the difficulty of building a sustainable practice, the challenge of standing out in a crowded, unorganized market. I built it to solve what the architecture community actually needed: a place where clients can easily find licensed architects, and architects can focus on their work instead of endless marketing.
                    </p>
                    <p className="mt-4 text-[13px] leading-relaxed text-gray-700">
                      Today, Archireach is building the platform the architecture industry deserves.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full pb-10 md:pb-12">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                <div className="lg:col-span-4">
                  <div className="rounded-[28px] bg-[rgb(122,107,235)]/10 border border-black/5 shadow-[0_18px_55px_rgba(15,23,42,0.10)] p-7 h-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-6">
                      <div className="flex flex-col justify-center">
                        <h3 className="about-heading-40 leading-tight font-semibold text-gray-900">Our Mission</h3>
                        <p className="mt-4 text-gray-700 text-sm leading-relaxed">
                          Help architects build sustainable practices by connecting them with the right clients.
                        </p>
                      </div>
                      <div className="rounded-2xl overflow-hidden bg-white/60 border border-black/5 aspect-[4/3] mt-6 md:mt-8">
                        <img src={missionImg} alt="Our Mission" className="w-full h-full object-cover" loading="lazy" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h3 className="about-heading-40 leading-tight font-semibold text-gray-900">Our Vision</h3>
                        <p className="mt-4 text-gray-700 text-sm leading-relaxed">
                          Create the largest community of verified architects and transform how India discovers design excellence.
                        </p>
                      </div>
                      <div className="rounded-2xl overflow-hidden bg-white/60 border border-black/5 aspect-[4/3] mt-6 md:mt-8">
                        <img src={visionImg} alt="Our Vision" className="w-full h-full object-cover" loading="lazy" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-8">
                  <div className="rounded-[32px] bg-[#fbf6e3] border border-black/5 shadow-[0_18px_55px_rgba(15,23,42,0.10)] p-8 h-full">
                    <div className="flex items-start justify-between">
                      <div className="text-xs font-semibold tracking-[0.25em] uppercase text-black/50">
                        Our Values
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={prevValueSlide}
                          className="w-9 h-9 rounded-full bg-white/80 border border-black/10 shadow-sm flex items-center justify-center"
                          aria-label="Previous"
                        >
                          <span className="text-lg">‹</span>
                        </button>
                        <button
                          type="button"
                          onClick={nextValueSlide}
                          className="w-9 h-9 rounded-full bg-white/80 border border-black/10 shadow-sm flex items-center justify-center"
                          aria-label="Next"
                        >
                          <span className="text-lg">›</span>
                        </button>
                      </div>
                    </div>

                    <div className="mt-7 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                      <div className="md:col-span-7">
                        <h3 className="about-heading-40 leading-tight font-semibold text-gray-900 tracking-tight">
                          {String(valueSlide + 1).padStart(2, '0')}. {valueSlides[valueSlide].title}
                        </h3>
                        <p className="mt-4 text-gray-700 text-sm md:text-base leading-relaxed max-w-xl">
                          {valueSlides[valueSlide].description}
                        </p>
                        <ul className="mt-5 space-y-2 text-sm text-gray-700">
                          {valueSlides[valueSlide].bullets.map((b, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <span className="mt-2 w-2 h-2 rounded-full" style={{ backgroundColor: 'rgb(122,107,235)' }} />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="md:col-span-5">
                        <div className="w-full max-w-sm md:ml-auto rounded-[26px] bg-white/75 border border-black/5 shadow-[0_14px_45px_rgba(15,23,42,0.08)] p-6">
                          <div className="w-full rounded-2xl overflow-hidden bg-[rgb(122,107,235)]/10 aspect-[16/10] flex items-center justify-center">
                            {valueSlides[valueSlide].art}
                          </div>
                          <div className="mt-4 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-[rgb(122,107,235)]/10 text-[rgb(122,107,235)] flex items-center justify-center">
                              {valueSlides[valueSlide].icon}
                            </div>
                            <div className="text-sm font-semibold text-gray-900">{valueSlides[valueSlide].title}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full pt-10 pb-10 md:pt-12 md:pb-12">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-[40px] leading-tight font-semibold text-center text-gray-900 tracking-tight" style={{ fontFamily: "'FS Dillon', sans-serif" }}>
                Why We Built This
              </h2>

              <div className="mt-10">
                <div className="max-w-3xl mx-auto">
                  <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                    <div className="why-built-content space-y-6 text-gray-700 leading-relaxed text-base md:text-lg text-center">
                      <p>
                        Architects spend <span className="font-semibold" style={{ color: 'rgb(122,107,235)' }}>30%</span> of their time chasing leads instead of creating design.
                      </p>
                      <p>
                        Clients don't know where to look for qualified architects.
                      </p>
                      <p>
                        Public awareness about architecture as a profession is minimal.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>






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
                    <button className='w-full sm:w-auto px-7 py-3 rounded-full text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200 bg-[rgb(122,107,235)]'>
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
                    <button className='w-full sm:w-auto px-7 py-3 rounded-full text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200 bg-[rgb(122,107,235)]'>
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

        </div>

        {/* Footer Section */}
        <Footer />
      </div>
    </div>
  );
};

export default AboutPage;