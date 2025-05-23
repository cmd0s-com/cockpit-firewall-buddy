
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
// CSS will be loaded in main.tsx

// Get base URL from Cockpit
const getBasePath = () => {
  // When running in Cockpit, use the Cockpit base path
  if (window.location.pathname.includes("/cockpit/")) {
    return window.location.pathname.split("/").slice(0, -1).join("/");
  }
  // For development environment
  return "/";
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter basename={getBasePath()}>
      <Routes>
        <Route path="/" element={<Index />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
