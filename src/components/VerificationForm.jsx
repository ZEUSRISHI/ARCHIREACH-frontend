import React, { useState, useEffect } from "react";
import {
  User, Building, FileText, CreditCard,
  Phone, Mail, Upload, CheckCircle, XCircle,
  AlertCircle, Loader2
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import axiosClient from "../api/axiosClient";

export default function FirmVerificationForm({ onClose }) {
  const { user } = useAuth();
  const [userId, setUserId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    firmName: "",
    registrationDocs: null,
    gst: "",
    pan: "",
    incorporationCert: null,
    bankAccount: "",
    coaCert: null,
    aadhaarPan: null,
    phone: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [existingApplication, setExistingApplication] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get userId from user context (uid)
    if (user?.uid) {
      setUserId(user.uid);
      checkExistingApplication(user.uid);
      // Prefill form with user data
      setFormData(prev => ({
        ...prev,
        name: user.fullName || prev.name,
        firmName: user.company || prev.firmName,
        email: user.email || prev.email
      }));
    } else {
      setError("User UID not found. Please log in again.");
    }
  }, [user]);

  const checkExistingApplication = async (uid) => {
    try {
      const response = await axiosClient.get(`/verification/status/${uid}`);
      if (response.data.success && response.data.data) {
        setExistingApplication(response.data.data);
      }
    } catch (err) {
      // User might not have submitted verification yet
      console.log("No verification found:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("User ID not found. Please log in again.");
      return;
    }

    setLoading(true);
    setSubmissionStatus(null);

    const formDataToSend = new FormData();
    formDataToSend.append("userId", userId);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("firmName", formData.firmName);
    formDataToSend.append("gst", formData.gst);
    formDataToSend.append("pan", formData.pan);
    formDataToSend.append("bankAccount", formData.bankAccount);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("email", formData.email);

    if (formData.registrationDocs) {
      formDataToSend.append("registrationDocs", formData.registrationDocs);
    }
    if (formData.incorporationCert) {
      formDataToSend.append("incorporationCert", formData.incorporationCert);
    }
    if (formData.coaCert) {
      formDataToSend.append("coaCert", formData.coaCert);
    }
    if (formData.aadhaarPan) {
      formDataToSend.append("aadhaarPan", formData.aadhaarPan);
    }

    console.log("Submitting verification for userId:", userId);

    try {
      const response = await axiosClient.post("/verification/submit", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      if (response.data.success) {
        setSubmissionStatus("success");
        console.log("Verification submitted successfully:", response.data);
        setTimeout(() => {
          checkExistingApplication(userId);
        }, 1500);
      } else {
        setSubmissionStatus("error");
        alert(response.data.message || "Submission failed");
        console.error("Submission error:", response.data.message);
      }
    } catch (err) {
      console.error("Submission error:", err);
      setSubmissionStatus("error");
      alert(err.response?.data?.message || "Failed to submit form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 max-w-md w-full text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
            Error
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mb-6">
            {error}
          </p>
          <button
            onClick={() => window.location.href = '/signin'}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 max-w-md w-full text-center">
          <Loader2 className="w-16 h-16 text-blue-500 mx-auto mb-4 animate-spin" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (existingApplication) {
    const { status, isApproved, rejectionReason } = existingApplication;

    if (isApproved && status === 'approved') {
      return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 max-w-md w-full text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
              Application Approved!
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-6">
              Your firm verification has been successfully approved. You can now access all features.
            </p>
            <button
              onClick={() => {
                if (onClose) onClose();
                else window.location.href = '/pages/blog/FirmDash';
              }}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors w-full sm:w-auto"
            >
              Continue to Dashboard
            </button>
          </div>
        </div>
      );
    }

    if (status === "rejected") {
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 max-w-md w-full">
            <div className="flex justify-center mb-4">
              <XCircle className="w-16 h-16 text-red-500" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 text-center">
              Application Rejected
            </h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-sm font-medium text-red-800 mb-1">Reason:</p>
              <p className="text-sm text-red-700">{rejectionReason || "Missing or incorrect documents"}</p>
            </div>
            <p className="text-sm sm:text-base text-gray-600 text-center mb-6">
              Please fix the issues and resubmit your application.
            </p>
            <button
              onClick={() => {
                setExistingApplication(null);
                setFormData({
                  name: "",
                  firmName: "",
                  registrationDocs: null,
                  gst: "",
                  pan: "",
                  incorporationCert: null,
                  bankAccount: "",
                  coaCert: null,
                  aadhaarPan: null,
                  phone: "",
                  email: "",
                });
              }}
              className="w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Resubmit Application
            </button>
          </div>
        </div>
      );
    }

    if (status === "pending") {
      return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-blue-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 max-w-md w-full text-center">
            <div className="flex justify-center mb-4">
              <AlertCircle className="w-16 h-16 text-yellow-500" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
              Application Under Review
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-6">
              Your application is being reviewed by our team. You will be notified once it is processed.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                Submitted: {existingApplication.submittedAt ? new Date(existingApplication.submittedAt).toLocaleDateString() : 'Recently'}
              </p>
            </div>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-6 sm:py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-2xl rounded-2xl sm:rounded-3xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 sm:px-10 py-6 sm:py-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-2">
              Firm Verification Form
            </h2>
            <p className="text-blue-100 text-center text-xs sm:text-sm">
              Complete all fields to verify your firm
            </p>
          </div>

          {submissionStatus === "success" && (
            <div className="mx-4 sm:mx-10 mt-6 bg-green-50 border border-green-200 rounded-xl p-3 sm:p-4 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm sm:text-base text-green-800 font-medium">Form submitted successfully!</p>
                <p className="text-xs sm:text-sm text-green-700">Your application is now under review.</p>
              </div>
            </div>
          )}

          {submissionStatus === "error" && (
            <div className="mx-4 sm:mx-10 mt-6 bg-red-50 border border-red-200 rounded-xl p-3 sm:p-4 flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm sm:text-base text-red-800 font-medium">Submission failed</p>
                <p className="text-xs sm:text-sm text-red-700">Please check your information and try again.</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-4 sm:p-6 md:p-10">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="flex items-center text-gray-700 font-medium mb-2 text-sm">
                    <User className="mr-2 text-blue-600 w-4 h-4" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="flex items-center text-gray-700 font-medium mb-2 text-sm">
                    <Building className="mr-2 text-blue-600 w-4 h-4" />
                    Firm Name
                  </label>
                  <input
                    type="text"
                    name="firmName"
                    value={formData.firmName}
                    onChange={handleChange}
                    placeholder="Enter firm name"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="flex items-center text-gray-700 font-medium mb-2 text-sm">
                    <FileText className="mr-2 text-blue-600 w-4 h-4" />
                    Registration Documents
                  </label>
                  <input
                    type="file"
                    name="registrationDocs"
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="flex items-center text-gray-700 font-medium mb-2 text-sm">
                    <FileText className="mr-2 text-blue-600 w-4 h-4" />
                    Incorporation Certificate
                  </label>
                  <input
                    type="file"
                    name="incorporationCert"
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 text-sm"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="flex items-center text-gray-700 font-medium mb-2 text-sm">
                    <CreditCard className="mr-2 text-blue-600 w-4 h-4" />
                    GST Number
                  </label>
                  <input
                    type="text"
                    name="gst"
                    value={formData.gst}
                    onChange={handleChange}
                    placeholder="22AAAAA0000A1Z5"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="flex items-center text-gray-700 font-medium mb-2 text-sm">
                    <CreditCard className="mr-2 text-blue-600 w-4 h-4" />
                    PAN Number
                  </label>
                  <input
                    type="text"
                    name="pan"
                    value={formData.pan}
                    onChange={handleChange}
                    placeholder="ABCDE1234F"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="flex items-center text-gray-700 font-medium mb-2 text-sm">
                    <Building className="mr-2 text-blue-600 w-4 h-4" />
                    Bank Account Number
                  </label>
                  <input
                    type="text"
                    name="bankAccount"
                    value={formData.bankAccount}
                    onChange={handleChange}
                    placeholder="Enter bank account number"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="flex items-center text-gray-700 font-medium mb-2 text-sm">
                    <FileText className="mr-2 text-blue-600 w-4 h-4" />
                    COA Certificate
                  </label>
                  <input
                    type="file"
                    name="coaCert"
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 text-sm"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="flex items-center text-gray-700 font-medium mb-2 text-sm">
                    <FileText className="mr-2 text-blue-600 w-4 h-4" />
                    Aadhaar or PAN Document
                  </label>
                  <input
                    type="file"
                    name="aadhaarPan"
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="flex items-center text-gray-700 font-medium mb-2 text-sm">
                    <Phone className="mr-2 text-blue-600 w-4 h-4" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center text-gray-700 font-medium mb-2 text-sm">
                  <Mail className="mr-2 text-blue-600 w-4 h-4" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                  required
                />
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 sm:py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5" />
                      Submit Verification
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}