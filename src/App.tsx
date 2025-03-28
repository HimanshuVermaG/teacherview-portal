
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ClassPage from "./pages/ClassPage";
import CreateContentPage from "./pages/CreateContentPage";
import ReportsPage from "./pages/ReportsPage";
import StudentDetailPage from "./pages/StudentDetailPage";
import ManageStudentsPage from "./pages/ManageStudentsPage";
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
            <Route path="/" element={<Index />} />
            <Route path="/class/:classId" element={<ClassPage />} />
            <Route path="/create" element={<CreateContentPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/student/:studentId" element={<StudentDetailPage />} />
            <Route path="/manage-students" element={<ManageStudentsPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
