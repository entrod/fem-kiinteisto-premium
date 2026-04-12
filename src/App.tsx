import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/context/LanguageContext";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index.tsx";
import ServicePage from "./pages/ServicePage.tsx";
import PortalPage from "./pages/PortalPage.tsx";
import OmOssPage from "./pages/OmOssPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/tjanster/:slug" element={<ServicePage />} />
            <Route path="/portal" element={<PortalPage />} />
            <Route path="/om-oss" element={<OmOssPage />} />
            <Route path="/logga-in" element={<LoginPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
