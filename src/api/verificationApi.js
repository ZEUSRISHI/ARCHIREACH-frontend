import axiosClient from "./axiosClient";

// Get verification status
export const getVerificationStatus = async (userId) => {
  const response = await axiosClient.get(`/verification/status/${userId}`);
  return response.data;
};

// Submit verification
export const submitVerification = async (formData) => {
  const response = await axiosClient.post("/verification/submit", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  return response.data;
};

