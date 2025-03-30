import axios from "axios";

// Set backend API base URL
const API = axios.create({
  baseURL: "http://localhost:5000/api", // Update this if deployed
  withCredentials: true, // For authentication cookies
});

// ✅ AUTHENTICATION API CALLS
export const registerUser = async (userData) => {
  try {
    const response = await API.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    console.error("Error registering:", error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await API.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

// ✅ AUTHENTICATION API CALLS
export const getUserProfile = async (token) => {
  try {
    const response = await API.get("/auth/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};

export const updateUserProfile = async (token, profileData) => {
  try {
    const response = await API.put("/auth/profile", profileData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await API.post("/auth/forgot-password", { email });
    return response.data; // Return only response.data
  } catch (error) {
    console.error("Error sending reset email:", error);
    throw error.response?.data || { message: "Failed to send reset email" };
  }
};

export const resetPassword = async (resetData) => {
  try {
    const response = await API.post("/auth/reset-password", resetData);
    return response.data;
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error;
  }
};

// ✅ EVENT MANAGEMENT API CALLS
export const getAllEvents = async () => {
  try {
    const response = await API.get("/events");
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

export const getEventById = async (eventId) => {
  try {
    const response = await API.get(`/events/${eventId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching event:", error);
    throw error;
  }
};

export const createEvent = async (token, eventData) => {
  try {
    const response = await API.post("/events", eventData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};

export const updateEvent = async (token, eventId, updatedData) => {
  try {
    const response = await API.put(`/events/${eventId}`, updatedData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
};

export const deleteEvent = async (token, eventId) => {
  try {
    const response = await API.delete(`/events/${eventId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting event:", error);
    throw error;
  }
};

// ✅ OTP VERIFICATION API CALLS (Fixed)
export const verifyOtp = async (email, otp) => {
  try {
    const response = await API.post("/auth/verify-otp", { email, otp }); // ✅ Use API instance
    return response.data;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw error.response?.data || { message: "Something went wrong" };
  }
};

export const resendOtp = async (email) => {
  try {
    const response = await API.post("/auth/resend-otp", { email }); // ✅ Use API instance
    return response.data;
  } catch (error) {
    console.error("Error resending OTP:", error);
    throw error.response?.data || { message: "Failed to resend OTP" };
  }
};
export const getDashboardData = async (token) => {
  try {
    console.log("Fetching dashboard data..."); // Log to check if it's running twice
    const response = await API.get("/dashboard", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
}