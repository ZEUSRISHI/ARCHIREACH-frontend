import { useEffect, useState, useRef } from "react";
import SharedNavbar from "../../components/Layout/SharedNavbar";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

import Footer from "../../components/Footer";
import Reveal from "../../components/Reveal";

import { Filter, Megaphone, Twitter, Linkedin, Facebook } from "lucide-react";
import blogImg from "../../assets/blog.jpg";
import sustainableImg from "../../assets/Sustainable.png";
import commercialImg from "../../assets/commercial.jpg";
import NavbarAll from "../../components/NavbarAll";

function ArticleGrid({ articles, view }) {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const lowContrastTitles = new Set([
    "Understanding COA Professional Conduct Regulations: What Architects Need to Know",
    "Biophilic Design: Bringing Nature Into Modern Architecture",
  ]);

  const handleReadClick = (article) => {
    setSelectedArticle(article);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedArticle(null);
  };

  return (
    <>
      {/* ARTICLE GRID OR LIST */}
      <div
        className={
          view === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"
            : "flex flex-col gap-5"
        }
      >
        {articles.map((article, index) => (
          <article
            key={index}
            className={`group relative p-px bg-gradient-to-br from-[rgb(122,107,235)]/35 via-black/10 to-transparent shadow-[0_10px_28px_rgba(15,23,42,0.10)] hover:shadow-[0_18px_55px_rgba(15,23,42,0.16)] transition-all duration-500 h-full ${view === "grid" ? "w-full max-w-[520px] mx-auto" : ""}`}
          >
            <div className="absolute inset-0 -z-10 bg-[rgb(122,107,235)]/25 blur-3xl opacity-0 group-hover:opacity-100 transition duration-500" />

            <div
              className={`relative overflow-hidden bg-white h-full rounded-2xl ${view === "list" ? "flex gap-4 p-3" : "flex flex-col"}`}
            >
              {/* IMAGE PANEL */}
              <div
                className={
                  view === "list"
                    ? "w-56 h-32 relative overflow-hidden flex-shrink-0"
                    : "w-full h-32 relative overflow-hidden"
                }
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition duration-700 ease-out group-hover:scale-110 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/55 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition duration-700" />
              </div>

              {/* CONTENT PANEL */}
              <div
                className={`flex flex-col flex-1 ${view === "grid" ? "p-3" : "py-1 pr-2"}`}
              >
                {/* META */}
                <div className="flex items-center justify-between text-xs text-black/50 mb-2">
                  <span className="inline-flex items-center gap-2">
                    <span
                      className="inline-flex items-center rounded-full border border-black/10 bg-[rgb(122,107,235)]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
                      style={{ color: "rgb(122,107,235)" }}
                    >
                      {article.category}
                    </span>
                  </span>
                  <span className="text-xs text-black/45">{article.date}</span>
                </div>

                {/* TITLE */}
                <h3
                  className={`${lowContrastTitles.has(article.title) ? "text-[20px]" : "text-[24px]"} leading-tight font-normal break-words line-clamp-2 ${lowContrastTitles.has(article.title) ? "text-black/80" : "text-slate-900"} transition-colors duration-300 group-hover:text-[rgb(122,107,235)]`}
                  style={{ fontFamily: "'FS Dillon', sans-serif" }}
                >
                  {article.title}
                </h3>

                {/* SUMMARY */}
                <p
                  className={`mt-2 text-black/65 text-base sm:text-[15px] leading-relaxed line-clamp-1`}
                >
                  {article.summary}
                </p>

                {/* AUTHOR + READ TIME */}
                <div className="mt-3 text-sm text-black/50 flex items-center gap-2 flex-row">
                  <span
                    className="font-semibold"
                    style={{ color: "rgb(122,107,235)" }}
                  >
                    {article.author}
                  </span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>

                {/* ACTION BAR */}
                <div className="mt-auto py-3 flex flex-row flex-wrap items-center justify-between gap-2 border-t border-black/5">
                  <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-black/50 leading-none">
                    <span className="inline-flex items-center gap-1">
                      <span aria-hidden>👍</span>
                      <span>{article.likes}</span>
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <span aria-hidden>💬</span>
                      <span>{article.comments}</span>
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <span aria-hidden>↗</span>
                      <span>{article.shares}</span>
                    </span>
                  </div>

                  <button
                    onClick={() => handleReadClick(article)}
                    className="inline-flex items-center gap-2 rounded-full px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold border border-black/10 bg-white hover:bg-[rgb(122,107,235)]/10 transition whitespace-nowrap"
                    style={{ color: "rgb(122,107,235)" }}
                  >
                    Read Article
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 12h14M12 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* MODAL */}
      {showModal && selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={handleCloseModal}
          />

          {/* Modal Content */}
          <div className="relative bg-white rounded-2xl shadow-xl max-w-3xl w-[90%] p-6 z-10 overflow-y-hidden max-h-[90vh]">
            <h2 className="text-xl font-bold mb-2">{selectedArticle.title}</h2>
            <p className="text-sm text-black/70 mb-4">
              {selectedArticle.summary}
            </p>

            <div className="flex items-center gap-2 text-xs text-black/50 mb-4">
              <span style={{ color: "rgb(122,107,235)", fontWeight: 500 }}>
                {selectedArticle.author}
              </span>
              <span>•</span>
              <span>{selectedArticle.date}</span>
              <span>•</span>
              <span>{selectedArticle.readTime}</span>
            </div>

            <img
              src={selectedArticle.image}
              alt={selectedArticle.title}
              className="w-full h-52 object-cover rounded-lg mb-4"
            />

            <div className="flex justify-end">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 rounded-lg bg-[rgb(122,107,235)] text-white font-semibold hover:bg-[rgb(102,91,215)] transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Categories() {
  const categories = [
    {
      icon: "🏛️",
      title: "Architecture Insights",
      count: 12,
      description:
        "In-depth articles on modern architecture, design trends, and industry best practices",
    },
    {
      icon: "🎨",
      title: "Design Trends",
      count: 8,
      description:
        "Stay updated with latest design movements, aesthetics, and innovations",
    },
    {
      icon: "✓",
      title: "COA Compliance",
      count: 6,
      description: "Guidance on Indian regulations and professional standards",
    },
    {
      icon: "📸",
      title: "Case Studies",
      count: 9,
      description: "Real projects with full documentation and outcomes",
    },
    {
      icon: "📖",
      title: "How-To Guides",
      count: 10,
      description: "Step-by-step guides to enhance your architecture practice",
    },
    {
      icon: "📰",
      title: "Industry News",
      count: 15,
      description:
        "Latest updates, policies, and events shaping Indian architecture",
    },
    {
      icon: "❓",
      title: "Q&A",
      count: 7,
      description: "Expert answers to architect queries",
    },
    {
      icon: "🌱",
      title: "Sustainable Architecture",
      count: 5,
      description:
        "Green building, sustainable materials, eco-forward design trends",
    },
  ];

  return (
    <section className="relative mt-20 mb-12 px-6 sm:px-10 py-12 rounded-[32px] bg-gradient-to-br from-white via-[#faf9ff] to-[#f3f1ff] border border-black/5 shadow-[0_20px_60px_rgba(15,23,42,0.10)] overflow-hidden">
      {/* Subtle RGB Glow */}
      <div
        className="absolute -top-12 -right-12 w-44 h-44 blur-3xl rounded-full pointer-events-none"
        style={{ backgroundColor: "rgba(122,107,235,0.2)" }}
      />
      <div
        className="absolute -bottom-12 -left-12 w-36 h-36 blur-2xl rounded-full pointer-events-none"
        style={{ backgroundColor: "rgba(122,107,235,0.2)" }}
      />

      {/* Heading */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
        <div>
          <p className="text-xs font-semibold tracking-[0.35em] uppercase text-black/50">
            Browse topics
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-black mt-2">
            Explore by Category
          </h2>
          <span
            className="block w-16 h-1 mt-4 rounded-full"
            style={{ backgroundColor: "rgb(122,107,235)" }}
          />
        </div>
        <p className="max-w-xl text-sm md:text-base text-black/60 leading-relaxed">
          Curated collections to help you learn faster, stay compliant, and
          discover inspiring work.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
        {categories.map((category, idx) => (
          <CategoryCard
            key={idx}
            category={category}
            rgbColor="rgb(122,107,235)"
          />
        ))}
      </div>
    </section>
  );
}

function CategoryCard({ category }) {
  const mainRGB = "rgb(122,107,235)";
  const lightRGB = "rgba(122,107,235,0.1)";
  const lighterRGB = "rgba(122,107,235,0.05)";

  return (
    <div className="group relative rounded-3xl p-px bg-gradient-to-br from-[rgb(122,107,235)]/35 via-black/10 to-transparent shadow-[0_10px_28px_rgba(15,23,42,0.10)] hover:shadow-[0_18px_55px_rgba(15,23,42,0.16)] transition-all duration-500 hover:-translate-y-1 cursor-pointer">
      <div className="absolute inset-0 -z-10 rounded-3xl bg-[rgb(122,107,235)]/25 blur-3xl opacity-0 group-hover:opacity-100 transition duration-500" />

      <div className="relative rounded-[23px] bg-white p-6 flex flex-col h-full">
        {/* Top Row: Icon + Count */}
        <div className="flex items-center justify-between mb-6">
          {/* Icon Badge */}
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl border border-black/5 shadow-sm"
            style={{ backgroundColor: lightRGB, color: mainRGB }}
          >
            {category.icon}
          </div>

          {/* Count */}
          <span
            className="text-[11px] font-semibold px-3 py-1 rounded-full border border-black/5"
            style={{ backgroundColor: lighterRGB, color: mainRGB }}
          >
            {category.count} Articles
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-slate-900 leading-snug transition-colors duration-300 group-hover:text-[rgb(122,107,235)]">
          {category.title}
        </h3>

        {/* Divider */}
        <div className="my-4 h-px w-full bg-black/5" />

        {/* Description */}
        <p className="text-sm text-black/65 leading-relaxed flex-1">
          {category.description}
        </p>

        {/* Bottom Accent */}
        <div
          className="mt-6 h-0.5 w-10 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:w-16"
          style={{ backgroundColor: mainRGB }}
        />
      </div>
    </div>
  );
}

const articles = [
  {
    category: "Design Trends",
    title: "Biophilic Design: Bringing Nature Into Modern Architecture",
    summary:
      "Clients increasingly demand spaces that connect with nature. Learn how biophilic design principles are transforming residential and commercial projects.",
    author: "Ar. Priya Sharma",
    date: "Nov 10, 2024",
    readTime: "6 min",
    likes: 189,
    comments: 24,
    shares: 12,
    image: sustainableImg,
  },
  {
    category: "COA Compliance",
    title:
      "Understanding COA Professional Conduct Regulations: What Architects Need to Know",
    summary:
      "Navigate India's COA regulations with clarity. This guide covers key requirements, compliance standards, and best practices for registered architects.",
    author: "COA Advisor",
    date: "Nov 5, 2024",
    readTime: "7 min",
    likes: 245,
    comments: 35,
    shares: 18,
    image: blogImg,
  },
  {
    category: "COA Compliance",
    title:
      "Understanding COA Professional Conduct Regulations: What Architects Need to Know",
    summary:
      "Navigate India's COA regulations with clarity. This guide covers key requirements, compliance standards, and best practices for registered architects.",
    author: "COA Advisor",
    date: "Nov 5, 2024",
    readTime: "7 min",
    likes: 245,
    comments: 35,
    shares: 18,
    image: commercialImg,
  },
  {
    category: "COA Compliance",
    title:
      "Understanding COA Professional Conduct Regulations: What Architects Need to Know",
    summary:
      "Navigate India's COA regulations with clarity. This guide covers key requirements, compliance standards, and best practices for registered architects.",
    author: "COA Advisor",
    date: "Nov 5, 2024",
    readTime: "7 min",
    likes: 245,
    comments: 35,
    shares: 18,
    image: blogImg,
  },
  {
    category: "COA Compliance",
    title:
      "Understanding COA Professional Conduct Regulations: What Architects Need to Know",
    summary:
      "Navigate India's COA regulations with clarity. This guide covers key requirements, compliance standards, and best practices for registered architects.",
    author: "COA Advisor",
    date: "Nov 5, 2024",
    readTime: "7 min",
    likes: 245,
    comments: 35,
    shares: 18,
    image: commercialImg,
  },

  {
    category: "COA Compliance",
    title:
      "Understanding COA Professional Conduct Regulations: What Architects Need to Know",
    summary:
      "Navigate India's COA regulations with clarity. This guide covers key requirements, compliance standards, and best practices for registered architects.",
    author: "COA Advisor",
    date: "Nov 5, 2024",
    readTime: "7 min",
    likes: 245,
    comments: 35,
    shares: 18,
    image: blogImg,
  },
  {
    category: "COA Compliance",
    title:
      "Understanding COA Professional Conduct Regulations: What Architects Need to Know",
    summary:
      "Navigate India's COA regulations with clarity. This guide covers key requirements, compliance standards, and best practices for registered architects.",
    author: "COA Advisor",
    date: "Nov 5, 2024",
    readTime: "7 min",
    likes: 245,
    comments: 35,
    shares: 18,
    image: sustainableImg,
  },
  {
    category: "COA Compliance",
    title:
      "Understanding COA Professional Conduct Regulations: What Architects Need to Know",
    summary:
      "Navigate India's COA regulations with clarity. This guide covers key requirements, compliance standards, and best practices for registered architects.",
    author: "COA Advisor",
    date: "Nov 5, 2024",
    readTime: "7 min",
    likes: 245,
    comments: 35,
    shares: 18,
    image: commercialImg,
  },
];

const faqs = [
  {
    question: "What is Archireach?",
    answer:
      "Archireach is a trusted Indian platform that helps clients discover licensed architects and enables professionals to access genuine project enquiries.",
  },
  {
    question: "Is every architect on Archireach verified?",
    answer:
      "Yes. Every professional is verified for licensing, experience, and portfolio authenticity before being listed.",
  },
  {
    question: "How does Archireach make money?",
    answer:
      "Archireach earns through subscriptions and project listings. We do not charge commissions on project fees.",
  },
  {
    question: "How is Archireach different from other platforms?",
    answer:
      "Unlike generic directories, Archireach focuses on licensed professionals, verified projects, client reviews, and India-specific industry standards.",
  },
  {
    question: "Is Archireach suitable for new practices?",
    answer:
      "Yes. Archireach is especially useful for new and growing practices looking to increase visibility, build credibility, and access project enquiries without heavy marketing costs.",
  },
  {
    question: "How do I get verified?",
    answer:
      "After signup, professionals submit credentials and portfolios, which are reviewed before verification is granted.",
  },
  {
    question: "Do you charge commissions?",
    answer: "No. Professionals keep 100% of what they earn.",
  },
  {
    question: "How can I contact support?",
    answer:
      "Support is available via the contact form or official email listed on the platform.",
  },
];
function FAQAccordion({ faqs }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="font-semibold text-5xl leading-tight text-gray-900 tracking-tight">
          Frequently Asked Questions
        </h2>

        <div className="flex flex-col gap-4 text-left">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl shadow-md cursor-pointer hover:shadow-lg transition-all duration-500 overflow-hidden border-l-4 ${
                openIndex === index
                  ? "border-[rgb(122,107,235)]"
                  : "border-transparent"
              }`}
              onClick={() => toggle(index)}
            >
              <div className="flex justify-between items-center p-6">
                <h3 className="text-[18px] leading-tight font-normal text-gray-800">
                  {faq.question}
                </h3>
                <ChevronDownIcon
                  className={`h-6 w-6 text-gray-600 transform transition-transform duration-500 ${
                    openIndex === index ? "rotate-180" : "rotate-0"
                  }`}
                />
              </div>

              <div
                className={`px-6 pb-6 text-gray-600 text-sm transition-all duration-500 ease-in-out ${
                  openIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
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

const blogData = {
  hero: {
    image:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?ixlib=rb-4.0.3&amp;auto=format&amp;fit=crop&amp;w=400&amp;q=80",
    alt: "Curved Modern Architecture",
  },
  navbar: [
    { label: "Explore", active: true },
    { label: "View more", active: false },
    { label: "Options", active: false },
    { label: "Subscribe", active: false },
  ],
  header: {
    title: "Connecting Architecture Professionals Worldwide",
    description:
      "Anthropic has unveiled a significant enhancement to its Claude design framework, enabling it to support larger blueprints and better serve the needs of architects and urban developers. In a bid to cement its dominance in the architectural innovation space, Anthropic has expanded the scale of resources that Claude, its flagship design system, can accommodate, positioning it as a transformative force in shaping modern construction and urban landscapes.",
  },
  articles: [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?ixlib=rb-4.0.3&amp;auto=format&amp;fit=crop&amp;w=400&amp;q=80",
      alt: "Glass Building",
      date: "Nov 12, 2024",
      comments: 25,
      title: "Proin sit amet massa eget odio consectetur ultrices",
      description:
        "Integer imperdiet massa quis erat rhoncus, quis molestie est commodo. Vivamus sit vulputate odio. Maecenas porta elit vel magna bibendum ornare venenatis.",
    },
    {
      id: 2,
      image: "",
      alt: "Glass Building",
      date: "Nov 10, 2024",
      comments: 32,
      title: "Proin sit amet massa eget odio consectetur ultrices",
      description:
        "Integer imperdiet massa quis erat rhoncus, quis hendrerit est commodo. Vivamus sit vulputate odio. Maecenas porta elit vel magna bibendum ornare venenatis.",
    },
  ],
  latestUpdates: [
    {
      id: 1,
      image: "./src/assets/Building1.avif",
      alt: "Modern architecture",
      text: "The demand for bespoke living spaces is growing at an impressive rate, as people seek personalised, human-centered interactions with their surroundings.",
    },
    {
      id: 2,
      image: "./images/Building1.avif",
      alt: "Modern architecture",
      text: "The demand for bespoke living spaces is growing at an impressive rate, as people seek personalised, human-centered interactions with their surroundings.",
    },
    {
      id: 3,
      image: "./images/Building1.avif",
      alt: "Modern architecture",
      text: "The demand for bespoke living spaces is growing at an impressive rate, as people seek personalised, human-centered interactions with their surroundings.",
    },
    {
      id: 4,
      image: "./images/Building1.avif",
      alt: "Modern architecture",
      text: "The demand for bespoke living spaces is growing at an impressive rate, as people seek personalised, human-centered interactions with their surroundings.",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?ixlib=rb-4.0.3&amp;auto=format&amp;fit=crop&amp;w=400&amp;q=80",
      alt: "Modern architecture",
      text: "The demand for bespoke living spaces is growing at an impressive rate, as people seek personalised, human-centered interactions with their surroundings.",
    },
    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      alt: "Modern architecture",
      text: "The demand for bespoke living spaces is growing at an impressive rate, as people seek personalised, human-centered interactions with their surroundings.",
    },
  ],
  testimonials: [
    {
      id: 1,
      rating: 5,
      quote:
        "ArchConnect has transformed how our firm discovers talent. The verification process ensures we work with the best, and the platform's user-friendly interface makes collaboration effortless.",
      user: "Vikram Patel",
      title: "Principal Architect, Horizon Designs",
    },
    {
      id: 2,
      rating: 5,
      quote:
        "ArchConnect has transformed how our firm discovers talent. The verification process ensures we work with the best, and the platform's user-friendly interface makes collaboration effortless.",
      user: "Vikram Patel",
      title: "Principal Architect, Horizon Designs",
    },
    {
      id: 3,
      rating: 5,
      quote:
        "ArchConnect has transformed how our firm discovers talent. The verification process ensures we work with the best, and the platform's user-friendly interface makes collaboration effortless.",
      user: "Vikram Patel",
      title: "Principal Architect, Horizon Designs",
    },
  ],
};

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 fill-gray-300"}`}
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

// Testimonials sections
const Testimonials = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            What Our Community Says
          </h2>
          <p className="text-gray-700 text-xl font-semibold">
            Hear from architects, firms, students, and institutions who have
            joined our platform.
          </p>
        </div>

        <div className="relative overflow-hidden">
          {/* Hidden checkbox controls animation */}
          <input type="checkbox" id="pauseToggle" className="peer hidden" />

          {/* Clickable overlay to resume animation when clicking outside */}
          <label
            htmlFor="pauseToggle"
            className="absolute inset-0 z-10 cursor-default"
          ></label>

          {/* Add custom animation in <style> */}
          <style>
            {`
      @keyframes slide-left {
        0% { transform: translateX(0%); }
        100% { transform: translateX(-50%); }
      }
    `}
          </style>

          {/* Carousel container: animate only when checkbox is NOT checked */}
          <div
            className="flex p-4 gap-10 peer-checked:animate-none animate-[slide-left_20s_linear_infinite]"
            style={{ width: "200%" }}
          >
            {[...blogData.testimonials, ...blogData.testimonials].map(
              (testimonial, index) => (
                <label
                  key={index}
                  htmlFor="pauseToggle" // Clicking on card pauses
                  className="w-full md:w-1/3 shrink-0 bg-gray-50 p-10 rounded-xl shadow-lg min-h-96 flex flex-col justify-between cursor-pointer z-20 relative"
                >
                  <div>
                    <StarRating rating={testimonial.rating} />
                    <p className="text-gray-700 text-base mb-8 leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mr-4">
                      {/* User Icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-6 h-6 text-gray-600"
                      >
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-base">
                        {testimonial.user}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {testimonial.title}
                      </p>
                    </div>
                  </div>
                </label>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const BlogPage = () => {
  const [view, setView] = useState("grid"); // grid or list
  return (
    <div id="root" className="min-h-screen pt-4">
      <div className="min-h-full bg-white rounded">
        <NavbarAll />

        {/* Hero Section */}
        <div className="relative bg-white max-w-full mx-auto rounded-2xl overflow-hidden">
          {/* Soft RGB Glow */}
          <div className="absolute -top-24 -left-24 w-80 h-80 bg-[rgb(122,107,235)/0.3] blur-[120px] rounded-full pointer-events-none"></div>
          <div className="absolute bottom-[-80px] right-[-60px] w-72 h-72 bg-[rgb(122,107,235)/0.2] blur-[100px] rounded-full pointer-events-none"></div>

          {/* Content */}
          <div className="relative z-10 p-4 sm:p-6 lg:p-10">
            {/* Heading */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 text-center">
              <Reveal
                as="h2"
                delay={0}
                className="text-[28px] sm:text-[36px] lg:text-[48px] leading-tight font-semibold text-black tracking-tight w-full text-center"
                style={{ fontFamily: "'FS Dillon', sans-serif" }}
              >
                Architecture Insights &{" "}
                <span className="text-[rgb(122,107,235)]">
                  Industry Updates
                </span>
              </Reveal>
            </div>

            {/* Article Hero Card */}
            <div className="mt-8 sm:mt-10 group max-w-6xl mx-auto">
              <div className="relative bg-white/90 backdrop-blur-sm border border-black/5 shadow-[0_20px_50px_rgba(0,0,0,0.08)] flex flex-col md:flex-row overflow-hidden rounded-[2.5rem_1.5rem_2.5rem_1.5rem]">
                {/* RGB Glow */}
                <div className="absolute inset-0 -z-10 bg-[rgb(122,107,235)/0.2] blur-3xl opacity-0" />

                {/* IMAGE PANEL */}
                <div className="w-full md:w-[38%] p-4 sm:p-6 md:p-8 flex items-center">
                  <div className="relative w-full rounded-[28px] p-px bg-gradient-to-br from-[rgb(122,107,235)]/35 via-black/10 to-transparent shadow-[0_18px_55px_rgba(15,23,42,0.14)]">
                    <div className="relative rounded-[27px] overflow-hidden bg-white/60 backdrop-blur">
                      <img
                        src="https://img.staticmb.com/mbcontent/images/crop/uploads/2022/9/green-buildings-the-future-of-sustainable-india_0_1200.jpg.webp"
                        alt="Sustainable Architecture"
                        className="w-full h-[200px] sm:h-[260px] md:h-[320px] object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* CONTENT PANEL */}
                <div className="w-full md:w-[62%] flex flex-col justify-center px-4 py-6 sm:px-6 sm:py-8 md:px-10">
                  <span className="inline-block w-fit text-[rgb(122,107,235)] text-xs font-bold uppercase tracking-wide bg-[rgb(122,107,235)/0.2] px-4 py-1.5 rounded-full mb-4">
                    Design Trends
                  </span>

                  <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-black leading-snug">
                    The Future of Sustainable Architecture in India: 2025 Trends
                  </h3>

                  <div className="text-black/60 mt-4 text-sm md:text-base flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-[rgb(122,107,235)]">
                      By Ar. Ramesh Kumar
                    </span>
                    <span>•</span>
                    Nov 15, 2024
                    <span>•</span>8 min read
                  </div>

                  <p className="mt-4 sm:mt-5 text-black/70 text-sm md:text-base leading-relaxed max-w-2xl">
                    Sustainability is no longer optional. Discover the
                    materials, methods, and smart design strategies shaping
                    India's architectural future.
                  </p>

                  <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-5">
                    <a
                      href="#"
                      className="bg-[rgb(122,107,235)] text-white px-6 sm:px-7 py-3 rounded-xl font-semibold text-sm shadow-lg flex items-center gap-2 w-fit"
                    >
                      Read Full Article
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 12h14M12 5l7 7-7 7"
                        />
                      </svg>
                    </a>

                    <div className="flex space-x-3 opacity-70">
                      {[Twitter, Linkedin, Facebook].map((Icon, i) => (
                        <a
                          key={i}
                          className="border border-black/10 rounded-full p-2 text-black/50"
                        >
                          <Icon className="w-4 h-4" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Search Filter Bar */}
            <div className="sticky top-16 z-50">
              <div className="bg-transparent">
                <div className="max-w-6xl mx-auto px-2 sm:px-6 py-4">
                  <div className="flex flex-col gap-3 sm:gap-4">
                    {/* SEARCH */}
                    <div className="relative w-full">
                      <input
                        type="text"
                        placeholder="Search articles, guides, news..."
                        className="w-full rounded-xl border border-black/10 bg-white py-3 pl-11 pr-4 text-sm text-black placeholder:text-black/40 shadow-sm transition-all duration-200 focus:outline-none hover:border-black/20"
                        style={{
                          outlineColor: "rgb(122,107,235)",
                          borderColor: "rgb(122,107,235)",
                        }}
                        onFocus={(e) =>
                          (e.currentTarget.style.boxShadow = `0 0 0 2px rgba(122,107,235,0.3)`)
                        }
                        onBlur={(e) =>
                          (e.currentTarget.style.boxShadow = "none")
                        }
                      />
                      <svg
                        className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-black/40"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1116.65 2a7.5 7.5 0 010 14.65z"
                        />
                      </svg>
                    </div>

                    {/* FILTER GROUP */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      {/* CATEGORY */}
                      <select
                        className="flex-1 min-w-[130px] rounded-xl border border-black/10 bg-white px-3 sm:px-4 py-3 text-sm text-black shadow-sm transition hover:border-black/20"
                        style={{ borderColor: "rgb(122,107,235)" }}
                        onFocus={(e) =>
                          (e.currentTarget.style.boxShadow = `0 0 0 2px rgba(122,107,235,0.3)`)
                        }
                        onBlur={(e) =>
                          (e.currentTarget.style.boxShadow = "none")
                        }
                      >
                        <option>All Categories</option>
                        <option>Articles</option>
                        <option>Guides</option>
                        <option>News</option>
                      </select>

                      {/* SORT */}
                      <select
                        className="flex-1 min-w-[110px] rounded-xl border border-black/10 bg-white px-3 sm:px-4 py-3 text-sm text-black shadow-sm transition hover:border-black/20"
                        style={{ borderColor: "rgb(122,107,235)" }}
                        onFocus={(e) =>
                          (e.currentTarget.style.boxShadow = `0 0 0 2px rgba(122,107,235,0.3)`)
                        }
                        onBlur={(e) =>
                          (e.currentTarget.style.boxShadow = "none")
                        }
                      >
                        <option>Latest</option>
                        <option>Oldest</option>
                        <option>Most Popular</option>
                      </select>

                      {/* ADVANCED FILTER */}
                      <button
                        className="flex items-center gap-2 text-white px-4 sm:px-5 py-3 rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transition-all whitespace-nowrap"
                        style={{ backgroundColor: "rgb(122,107,235)" }}
                      >
                        <Filter className="w-4 h-4" />
                        <span className="hidden xs:inline">Advanced</span> Filters
                      </button>

                      {/* CLEAR */}
                      <button
                        className="text-sm font-medium transition"
                        style={{ color: "rgb(122,107,235)" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "black")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "rgb(122,107,235)")
                        }
                      >
                        Clear All
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Articles + Sidebar */}
            <div className="max-w-6xl mx-auto px-2 sm:px-4 mt-6 sm:mt-10">
              <div className="flex flex-col lg:flex-row gap-6 items-start">
                {/* ARTICLES COLUMN */}
                <div className="w-full lg:flex-1 order-1">
                  {/* HEADER */}
                  <div className="flex justify-between items-center mb-6 sm:mb-8 flex-wrap gap-3 sm:gap-4">
                    <div>
                      <h2 className="font-semibold text-3xl sm:text-4xl lg:text-5xl leading-tight text-gray-900 tracking-tight">
                        Latest <span className="text-[#7A6BEB]">Articles</span>
                      </h2>
                      <p className="text-gray-500 text-sm mt-1">
                        Showing 1–{articles.length} of 47 articles
                      </p>
                    </div>

                    {/* VIEW SWITCHER */}
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setView("grid")}
                        className="p-2 border rounded-lg bg-white shadow-sm hover:bg-gray-50 transition"
                        style={{
                          borderColor:
                            view === "grid" ? "rgb(122,107,235)" : "#D1D5DB",
                          color:
                            view === "grid" ? "rgb(122,107,235)" : "#4B5563",
                        }}
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z"
                          />
                        </svg>
                      </button>

                      <button
                        onClick={() => setView("list")}
                        className="p-2 border rounded-lg bg-white shadow-sm hover:bg-gray-50 transition"
                        style={{
                          borderColor:
                            view === "list" ? "rgb(122,107,235)" : "#D1D5DB",
                          color:
                            view === "list" ? "rgb(122,107,235)" : "#4B5563",
                        }}
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 6h16M4 12h16M4 18h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="lg:max-h-[860px] lg:overflow-y-auto lg:pr-2 scrollbar-hide">
                    <ArticleGrid articles={articles} view={view} />

                    {/* PAGINATION */}
                    <div className="flex flex-wrap justify-center mt-8 sm:mt-10 gap-2">
                      <button className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm rounded-lg border shadow-sm bg-white text-gray-600 hover:bg-gray-50 whitespace-nowrap">
                        Previous
                      </button>

                      {[1, 2, 3, "...", 10].map((page, idx) => (
                        <button
                          key={idx}
                          className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm rounded-lg border shadow-sm"
                          style={
                            page === 1
                              ? {
                                  backgroundColor: "rgb(122,107,235)",
                                  borderColor: "rgb(122,107,235)",
                                  color: "white",
                                }
                              : {}
                          }
                        >
                          {page}
                        </button>
                      ))}

                      <button className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm rounded-lg border shadow-sm bg-white text-gray-600 hover:bg-gray-50 whitespace-nowrap">
                        Next
                      </button>
                    </div>
                  </div>
                </div>

                {/* SIDEBAR */}
                <div className="w-full lg:w-[230px] xl:w-[250px] shrink-0 order-2 lg:order-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 lg:gap-3 lg:h-[970px] lg:grid-rows-4">
                    {/* Most Discussed */}
                    <div className="group relative rounded-3xl p-px bg-gradient-to-br from-[rgb(122,107,235)]/35 via-black/10 to-transparent shadow-[0_10px_28px_rgba(15,23,42,0.10)] hover:shadow-[0_18px_55px_rgba(15,23,42,0.16)] transition-all duration-500">
                      <div className="absolute inset-0 -z-10 rounded-3xl bg-[rgb(122,107,235)]/25 blur-3xl opacity-0 group-hover:opacity-100 transition duration-500" />
                      <div className="relative rounded-[23px] bg-white p-4 h-full flex flex-col">
                        <h4 className="text-[12px] font-bold tracking-[0.32em] uppercase text-black/60 mb-2">
                          Most Discussed
                        </h4>
                        <ul className="space-y-2 text-[13px] text-slate-900">
                          <li className="cursor-pointer">
                            Biophilic Design in Modern Architecture
                            <div className="text-black/45 text-[10px] mt-1">
                              💬 38 comments
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* About This Blog */}
                    <div className="group relative rounded-3xl p-px bg-gradient-to-br from-[rgb(122,107,235)]/35 via-black/10 to-transparent shadow-[0_10px_28px_rgba(15,23,42,0.10)] hover:shadow-[0_18px_55px_rgba(15,23,42,0.16)] transition-all duration-500">
                      <div className="absolute inset-0 -z-10 rounded-3xl bg-[rgb(122,107,235)]/25 blur-3xl opacity-0 group-hover:opacity-100 transition duration-500" />
                      <div className="relative rounded-[23px] bg-white p-4 h-full flex flex-col">
                        <h4 className="text-[12px] font-bold tracking-[0.32em] uppercase text-black/60 mb-2">
                          About This Blog
                        </h4>
                        <p className="text-black/60 text-[13px] leading-relaxed">
                          Archireach publishes weekly insights on design,
                          sustainability, and India's architecture industry.
                        </p>
                        <a
                          href="#"
                          className="inline-flex items-center gap-2 mt-2 text-[12px] font-semibold text-[rgb(122,107,235)] hover:underline"
                        >
                          Start Reading →
                        </a>
                      </div>
                    </div>

                    {/* Popular Tags */}
                    <div className="group relative rounded-3xl p-px bg-gradient-to-br from-[rgb(122,107,235)]/35 via-black/10 to-transparent shadow-[0_10px_28px_rgba(15,23,42,0.10)] hover:shadow-[0_18px_55px_rgba(15,23,42,0.16)] transition-all duration-500">
                      <div className="absolute inset-0 -z-10 rounded-3xl bg-[rgb(122,107,235)]/25 blur-3xl opacity-0 group-hover:opacity-100 transition duration-500" />
                      <div className="relative rounded-[23px] bg-white p-4 h-full flex flex-col">
                        <h4 className="text-[12px] font-bold tracking-[0.32em] uppercase text-black/60 mb-2">
                          Popular Tags
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {[
                            "Sustainable Architecture",
                            "Design Trends",
                            "COA Compliance",
                            "Case Studies",
                            "Interior Design",
                            "Smart Buildings",
                          ].map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded-full text-[10px] font-semibold border border-black/10 bg-[rgb(122,107,235)]/10 text-[rgb(122,107,235)] hover:bg-[rgb(122,107,235)]/15 cursor-pointer transition"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Trending Now */}
                    <div className="group relative rounded-3xl p-px bg-gradient-to-br from-[rgb(122,107,235)]/35 via-black/10 to-transparent shadow-[0_10px_28px_rgba(15,23,42,0.10)] hover:shadow-[0_18px_55px_rgba(15,23,42,0.16)] transition-all duration-500">
                      <div className="absolute inset-0 -z-10 rounded-3xl bg-[rgb(122,107,235)]/25 blur-3xl opacity-0 group-hover:opacity-100 transition duration-500" />
                      <div className="relative rounded-[23px] bg-white p-4 h-full flex flex-col">
                        <h4 className="text-[12px] font-bold tracking-[0.32em] uppercase text-black/60 mb-2">
                          Trending Now
                        </h4>
                        <ol className="space-y-2 text-[13px] text-slate-900">
                          <li className="cursor-pointer">
                            The Future of Sustainable Architecture
                            <div className="text-black/45 text-[10px] mt-1">
                              Nov 15, 2024
                            </div>
                          </li>
                          <li className="cursor-pointer">
                            Understanding COA Professional Conduct Regulations
                            <div className="text-black/45 text-[10px] mt-1">
                              Nov 5, 2024
                            </div>
                          </li>
                          <li className="cursor-pointer">
                            Case Study: 500 sq ft Mumbai Apartment Redesign
                            <div className="text-black/45 text-[10px] mt-1">
                              Oct 30, 2024
                            </div>
                          </li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <FAQAccordion faqs={faqs} />

          {/* Footer Section */}
          <Footer />
        </div>
      </div>
    </div>
  );  
};

export default BlogPage;
