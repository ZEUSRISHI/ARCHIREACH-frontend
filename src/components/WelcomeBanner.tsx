export function WelcomeBanner() {
  return (
    <div className="bg-gradient-to-r from-[#F3E8FF] via-[#E9D5FF] to-[#E0E7FF] rounded-2xl p-8 sm:p-10 mb-8 shadow-lg border border-purple-100 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-200/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Left Column */}
          <div className="flex-1">
            <h2 className="text-[#1F2937] mb-3 text-2xl sm:text-3xl font-bold">
              Welcome back, Priya! 👋
            </h2>

            <p className="text-[#4B5563] mb-5 leading-relaxed text-base sm:text-lg">
              You have 3 messages from architects. You saved 12 architects. Continue exploring?
            </p>

            {/* Status Indicators */}
            <div className="flex flex-wrap gap-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-lg text-[#10B981] font-semibold shadow-sm border border-green-200">
                <span className="text-lg">✓</span> Profile 85% complete
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-lg text-[#7B3FF2] font-semibold shadow-sm border border-purple-200">
                <span className="text-lg">📧</span> 3 new messages
              </span>
            </div>
          </div>

          {/* Right Column: Quick Stats */}
          <div className="flex gap-6 sm:gap-8">
            <button className="text-center hover:scale-110 transition-transform duration-300 group">
              <div className="text-[#7B3FF2] text-3xl sm:text-4xl font-bold mb-1 group-hover:drop-shadow-lg transition-all" style={{ fontWeight: 700 }}>
                12
              </div>
              <div className="text-[#6B7280] font-medium text-sm sm:text-base">Saved</div>
            </button>
            <button className="text-center hover:scale-110 transition-transform duration-300 group">
              <div className="text-[#7B3FF2] text-3xl sm:text-4xl font-bold mb-1 group-hover:drop-shadow-lg transition-all" style={{ fontWeight: 700 }}>
                3
              </div>
              <div className="text-[#6B7280] font-medium text-sm sm:text-base">Projects</div>
            </button>
            <button className="text-center hover:scale-110 transition-transform duration-300 group">
              <div className="text-[#7B3FF2] text-3xl sm:text-4xl font-bold mb-1 group-hover:drop-shadow-lg transition-all" style={{ fontWeight: 700 }}>
                1
              </div>
              <div className="text-[#6B7280] font-medium text-sm sm:text-base">Briefs</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
