import { Progress } from "../pages/ui/progress";
import { CheckCircle, Circle } from "lucide-react";

export function ProfileProgress() {
  const items = [
    { label: "Profile photo", complete: false, optional: true },
    { label: "Phone verification", complete: true, optional: false },
    { label: "Add saved addresses", complete: false, optional: true },
    { label: "Set notification preferences", complete: true, optional: true }
  ];

  const completedCount = items.filter(item => item.complete).length;
  const progress = (completedCount / items.length) * 100;

  return (
    <div className="bg-[#ECEBFB] rounded-2xl p-8 shadow-xl border border-[#cfc9ff]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <h3 className="text-[#1F2937] text-2xl sm:text-3xl font-extrabold tracking-tight">
          Complete Your Profile
        </h3>
        <p className="text-[#7A6BEB] text-lg sm:text-xl font-bold">{Math.round(progress)}% Complete</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <Progress value={progress} className="h-4 rounded-full shadow-inner transition-all duration-500" />
      </div>

      {/* Items List */}
      <div className="space-y-4 mb-6">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 bg-white/70 backdrop-blur-md rounded-xl p-4 border border-purple-100 shadow hover:shadow-lg transition-all duration-300"
          >
            {item.complete ? (
              <CheckCircle className="w-6 h-6 text-[#10B981] flex-shrink-0 transition-transform duration-300 hover:scale-110" />
            ) : (
              <Circle className="w-6 h-6 text-[#9CA3AF] flex-shrink-0 transition-transform duration-300 hover:scale-110" />
            )}

            <div className="flex-1 min-w-0 flex flex-col gap-1">
              <p
                className={`text-sm sm:text-base ${
                  item.complete ? "text-[#6B7280] line-through" : "text-[#1F2937] font-medium"
                }`}
              >
                {item.label} {item.optional && <span className="text-xs sm:text-sm text-gray-400">(optional)</span>}
              </p>
              {!item.complete && (
                <button className="mt-1 text-[#7A6BEB] hover:text-[#6c5fe0] font-semibold text-xs sm:text-sm transition-colors duration-300">
                  Complete →
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <p className="text-[#4B5563] text-sm sm:text-base leading-relaxed">
        Completing your profile ensures you get personalized recommendations and unlock all features.
      </p>
    </div>
  );
}
