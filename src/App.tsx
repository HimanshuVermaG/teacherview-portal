
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
import NotFound from "./pages/NotFound";
import Layout from "./components/layout/Layout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/teacher" element={<Index />} />
            <Route path="/teacher/class/:classId" element={<ClassPage />} />
            <Route path="/teacher/class/:classId/subject/:subjectId" element={<SubjectPage />} />
            <Route path="/teacher/create" element={<CreateContentPage />} />
            <Route path="/teacher/reports" element={<ReportsPage />} />
            <Route path="/teacher/student/:studentId" element={<StudentDetailPage />} />
            <Route path="/teacher/manage-students" element={<ManageStudentsPage />} />
            <Route path="/teacher/activity" element={<ActivityPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
