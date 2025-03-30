
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

type Student = {
  id: string;
  name: string;
  fatherName: string;
  schoolName: string;
  mobile: number;
  standard: number;
  sirNumber: string;
};

type AuthContextType = {
  user: Student | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (sirNumber: string, password: string) => Promise<boolean>;
  signup: (studentData: Omit<Student, "id"> & { password: string }) => Promise<boolean>;
  logout: () => void;
};

// Dummy account for testing
const dummyAccount = {
  id: "dummy123",
  name: "Test Student",
  fatherName: "Test Father",
  schoolName: "Test School",
  mobile: 1234567890,
  standard: 8,
  sirNumber: "test123",
  password: "password123"
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing auth token/user in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  const login = async (sirNumber: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    // Check if the input matches the dummy account
    if (sirNumber === dummyAccount.sirNumber && password === dummyAccount.password) {
      const userData = {
        id: dummyAccount.id,
        name: dummyAccount.name,
        fatherName: dummyAccount.fatherName,
        schoolName: dummyAccount.schoolName,
        mobile: dummyAccount.mobile,
        standard: dummyAccount.standard,
        sirNumber: dummyAccount.sirNumber,
      };
      
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", "dummy-token-for-testing");
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${userData.name}!`,
      });
      
      setLoading(false);
      return true;
    }
    
    try {
      const response = await fetch("http://localhost:8000/api/v1/student/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sirNumber, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast({
          title: "Login failed",
          description: data.message || "Invalid credentials",
          variant: "destructive",
        });
        setLoading(false);
        return false;
      }

      // Assuming the API returns user data and token
      const userData = {
        id: data.student._id,
        name: data.student.name,
        fatherName: data.student.fatherName,
        schoolName: data.student.schoolName,
        mobile: data.student.mobile,
        standard: data.student.standard,
        sirNumber: data.student.sirNumber,
      };

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      toast({
        title: "Login successful",
        description: `Welcome back, ${userData.name}!`,
      });
      
      setLoading(false);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: "An error occurred during login. Please try again.",
        variant: "destructive",
      });
      setLoading(false);
      return false;
    }
  };

  const signup = async (studentData: Omit<Student, "id"> & { password: string }): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/v1/student/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
      });

      const data = await response.json();

      if (!response.ok) {
        toast({
          title: "Signup failed",
          description: data.message || "Could not create account",
          variant: "destructive",
        });
        setLoading(false);
        return false;
      }

      toast({
        title: "Account created successfully",
        description: "You can now login with your credentials",
      });
      
      setLoading(false);
      return true;
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        title: "Signup failed",
        description: "An error occurred during signup. Please try again.",
        variant: "destructive",
      });
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
