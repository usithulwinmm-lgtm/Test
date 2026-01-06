import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { AuthPage } from "./pages/AuthPage";
import { TwoFaPage } from "./pages/TwoFaPage";
import { DashboardPage } from "./pages/DashboardPage";
import { MarketPage } from "./pages/MarketPage";
import { WalletPage } from "./pages/WalletPage";
import { SettingsPage } from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading, twoFaVerified } = useAuth();
  
  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center"><div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" /></div>;
  if (!user) return <Navigate to="/auth" replace />;
  if (!twoFaVerified) return <Navigate to="/2fa" replace />;
  
  return <>{children}</>;
};

const TwoFaRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading, twoFaVerified } = useAuth();
  
  if (loading) return null;
  if (!user) return <Navigate to="/auth" replace />;
  if (twoFaVerified) return <Navigate to="/dashboard" replace />;
  
  return <>{children}</>;
};

const AppRoutes = () => {
  const { user, twoFaVerified } = useAuth();
  
  return (
    <Routes>
      <Route path="/" element={user && twoFaVerified ? <Navigate to="/dashboard" replace /> : <Navigate to="/auth" replace />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/2fa" element={<TwoFaRoute><TwoFaPage /></TwoFaRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="/market" element={<ProtectedRoute><MarketPage /></ProtectedRoute>} />
      <Route path="/wallet" element={<ProtectedRoute><WalletPage /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
