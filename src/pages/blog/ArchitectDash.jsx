// src/pages/blog/ArchitectDash.jsx
import React, { useEffect, useState } from "react";
import SharedNavbar from "../../components/Layout/SharedNavbar";
import Footer from "../../components/Footer";

function ArchitectDash() {
  const [uid, setUid] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ Get userUID from localStorage
    const storedUserUID = localStorage.getItem("userUID");
    if (storedUserUID) {
      setUid(storedUserUID);
      setLoading(false);
    } else {
      // 🚨 If userUID not found — redirect to home
      window.location.href = "/";
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 text-gray-600 text-lg font-bold">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SharedNavbar />
      
      <div className="pt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Architect Dashboard
            </h1>
            <p className="text-gray-700 font-semibold mb-8">
              Welcome to your architect dashboard. Manage your portfolio, view projects, and connect with clients.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-purple-50 rounded-lg p-6 border-2 border-purple-200">
                <h3 className="text-xl font-extrabold text-gray-900 mb-2">Portfolio</h3>
                <p className="text-gray-700 font-semibold">Manage your projects and showcase your work</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
                <h3 className="text-xl font-extrabold text-gray-900 mb-2">Projects</h3>
                <p className="text-gray-700 font-semibold">View and respond to project briefs</p>
              </div>
              <div className="bg-green-50 rounded-lg p-6 border-2 border-green-200">
                <h3 className="text-xl font-extrabold text-gray-900 mb-2">Messages</h3>
                <p className="text-gray-700 font-semibold">Communicate with clients</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ArchitectDash;

