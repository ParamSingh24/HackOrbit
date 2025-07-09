import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Chatbot from './components/Chatbot';
import Features from "./pages/Features";
import FeaturePage from './pages/FeaturePage';
import VoiceAssistantBubble from './components/VoiceAssistantBubble';
import Profile from './pages/Profile';
import DashboardResumeOptimization from './pages/DashboardResumeOptimization';
import DashboardApplicationTracking from './pages/DashboardApplicationTracking';
import DashboardSkillGapAnalysis from './pages/DashboardSkillGapAnalysis';
import DashboardEmailOutreach from './pages/DashboardEmailOutreach';
import DashboardAICareerCoaching from './pages/DashboardAICareerCoaching';



import DashboardAICareerCoaching1 from './pages/AICareerCoaching1';
import DashboardApplicationTracking1 from './pages/ApplicationTracking1';
import DashboardEmailOutreach1 from './pages/EmailOutreach1';
import DashboardJobTrendAnalysis1 from './pages/JobTrendAnalysis1';
import DashboardResumeOptimization1 from './pages/ResumeOptimization1';
import DashboardSkillGapAnalysis1 from './pages/SkillGapAnalysis1';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/features" element={<Features />} />
          <Route path="/feature/:slug" element={<FeaturePage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard/resume-optimization" element={<DashboardResumeOptimization />} />
          <Route path="/dashboard/application-tracking" element={<DashboardApplicationTracking />} />
          <Route path="/dashboard/skill-gap-analysis" element={<DashboardSkillGapAnalysis />} />
          <Route path="/dashboard/email-outreach" element={<DashboardEmailOutreach />} />
          <Route path="/dashboard/ai-career-coaching" element={<DashboardAICareerCoaching />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />













        <Route path="/1" element={<DashboardAICareerCoaching1 />} />
        <Route path="/2" element={<DashboardApplicationTracking1 />} />
        <Route path="/3" element={<DashboardEmailOutreach1 />} />
        <Route path="/4" element={<DashboardJobTrendAnalysis1 />} />
        <Route path="/5" element={<DashboardResumeOptimization1/>} />
        <Route path="/6" element={<DashboardSkillGapAnalysis1 />} />
        </Routes>
      </BrowserRouter>
      <Chatbot />
      <VoiceAssistantBubble />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
