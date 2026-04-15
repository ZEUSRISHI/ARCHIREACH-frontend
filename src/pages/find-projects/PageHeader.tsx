import {
  FileText,
  DollarSign,
  MapPin,
  Clock,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Reveal from "../../components/Reveal";

export function PageHeader() {
  const themeColor = "rgb(122,107,235)"; // theme color

  return (
    <section className="w-full bg-white pt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
          {/* Left Info */}
          <div className="flex-1 max-w-3xl space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-2 bg-[rgb(122,107,235)]/10 border border-[rgb(122,107,235)] text-[rgb(122,107,235)] font-bold px-4 py-1.5 rounded-full text-xs sm:text-sm shadow-sm">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">
                Premium Project Marketplace
              </span>
              <span className="sm:hidden">Premium Projects</span>
            </div>

            <Reveal
              as="h1"
              delay={0}
              className="text-3xl sm:text-4xl lg:text-[40px] font-semibold leading-tight text-gray-900 tracking-tight"
            >
              Discover Architecture Projects Curated For You
            </Reveal>

            <p className="text-sm sm:text-base lg:text-lg text-gray-700 font-semibold leading-relaxed">
              Access verified briefs posted by serious clients across India.
              Filter opportunities by budget, location, discipline, or project
              complexity and build your pipeline with work that aligns with your
              expertise.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
              {[
                {
                  icon: FileText,
                  label: "Projects",
                  value: "500+",
                  subtitle: "Active this week",
                },
                {
                  icon: DollarSign,
                  label: "Budget Pool",
                  value: "₹50 Cr+",
                  subtitle: "Across all briefs",
                },
                {
                  icon: MapPin,
                  label: "Cities",
                  value: "50+",
                  subtitle: "Pan-India coverage",
                },
                {
                  icon: Clock,
                  label: "Response Time",
                  value: "24 hrs",
                  subtitle: "Average client reply",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white border rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 shadow-sm"
                  style={{ borderColor: `${themeColor}33` }}
                >
                  <div
                    className="flex items-center gap-1.5 sm:gap-2 font-bold text-xs sm:text-sm"
                    style={{ color: themeColor }}
                  >
                    <item.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="truncate">{item.label}</span>
                  </div>
                  <p
                    className="text-[20px] font-bold text-[#111729] mt-1"
                    style={{ fontFamily: "'Public Sans', sans-serif" }}
                  >
                    {item.value}
                  </p>
                  <p className="text-[10px] sm:text-xs font-semibold text-gray-500">
                    {item.subtitle}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Info / Features */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-[rgb(122,107,235)]/10 border-2 border-[rgb(122,107,235)] rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 text-[rgb(122,107,235)] font-extrabold text-lg mb-4">
                <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                <span className="text-sm sm:text-base lg:text-lg">
                  Why architects choose Archireach
                </span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-gray-700 font-semibold">
                <li className="flex gap-2">
                  <span className="text-[rgb(122,107,235)] font-bold flex-shrink-0 mt-0.5">
                    •
                  </span>
                  <span>
                    Only verified and curated project briefs make it to the
                    marketplace.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[rgb(122,107,235)] font-bold flex-shrink-0 mt-0.5">
                    •
                  </span>
                  <span>
                    Transparent budgets, timelines, and client expectations for
                    every listing.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[rgb(122,107,235)] font-bold flex-shrink-0 mt-0.5">
                    •
                  </span>
                  <span>
                    Save filters, get instant alerts, and manage your pipeline
                    in one place.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
