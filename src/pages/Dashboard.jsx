import { useAuth } from "../context/AuthContext";
import FirmDashboard from "./dashboard/FirmDashboard";
import ClientDashboard from "./dashboard/ClientDashboard";

const Dashboard = () => {
  const { user } = useAuth();

  // Route to appropriate dashboard based on role
  if (user?.role === "firm_user") {
    return <FirmDashboard />;
  } else if (user?.role === "client_user") {
    return <ClientDashboard />;
  } else if (user?.role === "admin") {
    // Admin dashboard can be added later
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600">Admin dashboard coming soon...</p>
          </div>
        </div>
      </div>
    );
  }

  // Fallback for users without role or loading
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Welcome, {user?.fullName}!</h2>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

