import { Lightbulb, Search as SearchIcon, ShieldCheck, Users, Award } from "lucide-react";
import Reveal from '../../components/Reveal';

export function PageHeader() {
  return (
    <section className="px-4 sm:px-6 lg:px-12 py-6 sm:py-8 lg:py-10 bg-gradient-to-r from-teal-50 via-white to-purple-50 rounded-2xl sm:rounded-3xl border border-teal-100 shadow-sm">
      <div className="max-w-5xl space-y-4 sm:space-y-6">
        <div className="inline-flex items-center gap-2 bg-white/80 border border-teal-100 text-teal-700 font-bold px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm shadow-sm">
          <ShieldCheck className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">COA-Verified Talent Network</span>
          <span className="sm:hidden">COA-Verified</span>
        </div>

        <Reveal as="h1" delay={0} className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight">
          Hire India's Most Trusted Architects & Design Studios
        </Reveal>

        <p className="text-sm sm:text-base lg:text-lg text-gray-700 font-semibold leading-relaxed max-w-3xl">
          Browse a curated roster of Council of Architecture verified architects, interior designers, and boutique studios.
          Filter by experience, specialization, project scale, and availability to match your brief with the perfect partner.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div className="bg-white border border-teal-100 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 shadow-sm">
            <div className="flex items-center gap-1.5 sm:gap-2 text-teal-600 font-bold text-xs sm:text-sm">
              <Users className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="truncate">Verified Architects</span>
            </div>
            <p className="text-xl sm:text-2xl font-extrabold text-gray-900 mt-1">500+</p>
            <p className="text-[10px] sm:text-xs font-semibold text-gray-500">Pan-India network</p>
          </div>
          <div className="bg-white border border-teal-100 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 shadow-sm">
            <div className="flex items-center gap-1.5 sm:gap-2 text-teal-600 font-bold text-xs sm:text-sm">
              <Award className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="truncate">Collective Experience</span>
            </div>
            <p className="text-xl sm:text-2xl font-extrabold text-gray-900 mt-1">7,500+ yrs</p>
            <p className="text-[10px] sm:text-xs font-semibold text-gray-500">Across domains</p>
          </div>
          <div className="bg-white border border-teal-100 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 shadow-sm">
            <div className="flex items-center gap-1.5 sm:gap-2 text-teal-600 font-bold text-xs sm:text-sm">
              <Lightbulb className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="truncate">Specializations</span>
            </div>
            <p className="text-xl sm:text-2xl font-extrabold text-gray-900 mt-1">30+</p>
            <p className="text-[10px] sm:text-xs font-semibold text-gray-500">From heritage to smart homes</p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-sm space-y-2 sm:space-y-3">
          <h2 className="text-base sm:text-lg font-extrabold text-gray-900">How to shortlist faster</h2>
          <div className="grid sm:grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm text-gray-700 font-semibold">
            <div className="flex items-start gap-2">
              <Lightbulb className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600 mt-1 flex-shrink-0" />
              <span>Use experience and specialization filters to surface architects with matching portfolios.</span>
            </div>
            <div className="flex items-start gap-2">
              <SearchIcon className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600 mt-1 flex-shrink-0" />
              <span>Shortlist profiles, request proposals, and compare credentials side-by-side.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
