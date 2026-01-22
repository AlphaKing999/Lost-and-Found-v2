import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ItemsProvider } from '@/app/contexts/ItemsContext';
import { AuthProvider } from '@/app/contexts/AuthContext';
import { ThemeProvider, useTheme } from '@/app/contexts/ThemeContext';
import { NotificationsProvider } from '@/app/contexts/NotificationsContext';
import { ClaimsProvider } from '@/app/contexts/ClaimsContext';
import { Toaster } from '@/app/components/ui/sonner';
import { NavBar } from '@/app/components/NavBar';
import { ScrollToTop } from '@/app/components/ScrollToTop';
import { HomePage } from '@/app/components/HomePage';
import { SubmitItemPage } from '@/app/components/SubmitItemPage';
import { ItemsListingPage } from '@/app/components/ItemsListingPage';
import { ItemDetailPage } from '@/app/components/ItemDetailPage';
import { AdminPage } from '@/app/components/AdminPage';
import { LoginPage } from '@/app/components/LoginPage';
import { ClaimsPage } from '@/app/components/ClaimsPage';
import { NotificationsPage } from '@/app/components/NotificationsPage';
import { SecurityPage } from '@/app/components/SecurityPage';
import { ProtectedRoute } from '@/app/components/ProtectedRoute';

function AppContent() {
  const { getColor } = useTheme();
  
  return (
    <div className="min-h-screen" style={{ backgroundColor: getColor('bgPrimary') }}>
      <ScrollToTop />
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/items" element={<ItemsListingPage />} />
        <Route path="/item/:id" element={<ItemDetailPage />} />
        <Route path="/submit" element={<SubmitItemPage />} />
        <Route path="/claims" element={<ClaimsPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/security" element={<SecurityPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          } 
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <NotificationsProvider>
            <ClaimsProvider>
              <ItemsProvider>
                <AppContent />
              </ItemsProvider>
            </ClaimsProvider>
          </NotificationsProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}