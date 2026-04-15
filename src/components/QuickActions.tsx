import { Search, Save, Edit } from "lucide-react";

interface QuickActionsProps {
  onPostBrief: () => void;
}

export function QuickActions({ onPostBrief }: QuickActionsProps) {
  const actions = [
    {
      icon: Search,
      title: "Find Architects",
      subtitle: "Browse verified professionals",
      bgColor: "#F3E8FF",
      borderColor: "#7B3FF2",
      onClick: () => window.dispatchEvent(new CustomEvent('navigate', { detail: 'find-architects' }))
    },
    {
      icon: Save,
      title: "My Saved Items",
      subtitle: "12 architects • 3 projects",
      bgColor: "#F0FDF4",
      borderColor: "#10B981",
      onClick: () => {}
    },
    {
      icon: Edit,
      title: "Post Design Brief",
      subtitle: "Get offers from architects",
      bgColor: "#F3E8FF",
      borderColor: "#7B3FF2",
      onClick: onPostBrief
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {actions.map((action, index) => {
        const Icon = action.icon;
        return (
          <button
            key={index}
            onClick={action.onClick}
            className="text-left p-4 rounded-2xl border hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group relative overflow-hidden min-h-[140px]"
            style={{ backgroundColor: action.bgColor, borderColor: action.borderColor }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="mb-3 inline-flex p-2.5 rounded-lg bg-white/60 backdrop-blur-sm group-hover:scale-105 transition-transform duration-300">
                <Icon className="w-5 h-5" style={{ color: action.borderColor }} />
              </div>
              <h3 className="text-[#1F2937] mb-1 text-base group-hover:text-[#7B3FF2] transition-colors duration-300" style={{ fontWeight: 700 }}>
                {action.title}
              </h3>
              <p className="text-[#4B5563] text-xs leading-relaxed">
                {action.subtitle}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
