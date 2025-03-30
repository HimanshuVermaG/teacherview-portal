
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ClassPage from "./pages/ClassPage";
import SubjectPage from "./pages/SubjectPage";
import CreateContentPage from "./pages/CreateContentPage";
import ReportsPage from "./pages/ReportsPage";
import StudentDetailPage from "./pages/StudentDetailPage";
import ManageStudentsPage from "./pages/ManageStudentsPage";
import ActivityPage from "./pages/ActivityPage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import NotFound from "./pages/NotFound";
import Layout from "./components/layout/Layout";
import RouteGuard from "./components/auth/RouteGuard";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            
            {/* Protected routes */}
            <Route element={<RouteGuard />}>
              <Route element={<Layout />}>
                <Route path="/" element={<Index />} />
                <Route path="/class/:classId" element={<ClassPage />} />
                <Route path="/class/:classId/subject/:subjectId" element={<SubjectPage />} />
                <Route path="/create" element={<CreateContentPage />} />
                <Route path="/reports" element={<ReportsPage />} />
                <Route path="/student/:studentId" element={<StudentDetailPage />} />
                <Route path="/manage-students" element={<ManageStudentsPage />} />
                <Route path="/activity" element={<ActivityPage />} />
              </Route>
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
