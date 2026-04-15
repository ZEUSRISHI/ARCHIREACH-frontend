import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome to ArchiReach
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Connect with architects, find projects, and build your network
          </p>

          {!isAuthenticated ? (
            <div className="flex justify-center space-x-4">
              <Link
                to="/signup"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 text-lg font-medium"
              >
                Get Started
              </Link>
              <Link
                to="/signin"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg border-2 border-blue-600 hover:bg-blue-50 text-lg font-medium"
              >
                Login
              </Link>
            </div>
          ) : (
            <Link
              to="/dashboard"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 text-lg font-medium"
            >
              Go to Dashboard
            </Link>
          )}
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Find Architects</h3>
            <p className="text-gray-600">
              Discover talented architects and connect with professionals in your area.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Post Projects</h3>
            <p className="text-gray-600">
              Share your projects and get matched with the right architects.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Build Network</h3>
            <p className="text-gray-600">
              Connect with clients, students, and professionals in the architecture industry.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

