
// Base API URL
const API_BASE_URL = "http://localhost:8000/api/v1";

// Helper function to get auth token from localStorage
const getAuthToken = () => localStorage.getItem("token");

/**
 * Function to handle API requests
 */
export const apiRequest = async (
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  data?: any,
  requiresAuth: boolean = true
) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  // Add auth token if required
  if (requiresAuth) {
    const token = getAuthToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const config: RequestInit = {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
  };

  try {
    const response = await fetch(url, config);
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || "Something went wrong");
    }

    return responseData;
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
};

// Student API endpoints
export const studentApi = {
  create: (studentData: any) => 
    apiRequest("/student/create", "POST", studentData, false),
  
  login: (credentials: { sirNumber: string; password: string }) => 
    apiRequest("/student/login", "POST", credentials, false),
  
  getDetails: (studentId: string) => 
    apiRequest(`/student/${studentId}`),
  
  update: (studentId: string, data: any) => 
    apiRequest(`/student/${studentId}`, "PUT", data),
};
