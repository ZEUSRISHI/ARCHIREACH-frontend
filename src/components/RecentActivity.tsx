import { MessageCircle, Bell, CheckCircle } from "lucide-react";

export function RecentActivity() {
  const activities = [
    {
      icon: MessageCircle,
      text: "Ar. Rajesh Kumar responded to your message",
      time: "Today at 3:45 PM",
      action: "View message →",
      color: "#7A6BEB",
    },
    {
      icon: Bell,
      text: "Architect profile updated: Ar. Priya Sharma",
      time: "Today at 10:20 AM",
      action: null,
      color: "#10B981",
    },
    {
      icon: CheckCircle,
      text: "Your design brief got 3 offers",
      time: "Yesterday",
      action: "View offers →",
      color: "#7A6BEB",
    },
  ];

  return (
    <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100  mx-auto">
      <h3 className="text-gray-900 mb-6 text-xl font-bold">
        Your Recent Activity
      </h3>

      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = activity.icon;
          return (
            <div
              key={index}
              className="flex items-start gap-4 p-5 rounded-xl bg-gray-50 hover:bg-white border border-gray-100 hover:border-[#cfc9ff] transition-all duration-300 shadow-sm hover:shadow-md group"
            >
              <div
                className="flex-shrink-0 p-3 rounded-lg bg-opacity-20 shadow-sm group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: `${activity.color}33` }} // slightly transparent
              >
                <Icon className="w-5 h-5" style={{ color: activity.color }} aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-gray-900 mb-1.5 font-medium leading-relaxed">
                  {activity.text}
                </p>
                <p className="text-gray-500 text-sm">{activity.time}</p>
                {activity.action && (
                  <a
                    href="#"
                    className="mt-2 inline-block text-[#7A6BEB] hover:text-[#6c5fe0] font-semibold transition-colors duration-300 underline"
                    aria-label={activity.action}
                  >
                    {activity.action}
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <a
        href="#"
        className="mt-6 inline-block text-[#7A6BEB] hover:text-[#6c5fe0] font-semibold transition-colors duration-300 underline"
      >
        View all activities →
      </a>
    </section>
  );
}
