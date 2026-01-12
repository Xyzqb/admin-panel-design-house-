import { Users, ShoppingCart, CreditCard, Star } from "lucide-react";

export default function RecentActivity({ darkMode }) {
  const activities = [
    { text: "New client registered", time: "2 mins ago", icon: Users },
    { text: "Order #1234 completed", time: "15 mins ago", icon: ShoppingCart },
    { text: "Payment received", time: "1 hour ago", icon: CreditCard },
    { text: "New review submitted", time: "2 hours ago", icon: Star },
  ];

  return (
    <div
      className={`p-6 rounded-2xl shadow-lg ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Icon className="text-white" size={18} />
              </div>
              <div>
                <p
                  className={`font-medium ${
                    darkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  {item.text}
                </p>
                <p className="text-sm text-gray-500">{item.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
