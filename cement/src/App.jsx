import { Routes, Route } from "react-router-dom";
import PublicLayout from "./Components/layout/PublicLayout";
import MainLayout from "./Components/layout/MainLayout";
import AdminRoute from "./Components/auth/AdminRoute";

// Public pages
import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";
import PricingPage from "./pages/PricingPage";
import FaqPage from "./pages/FaqPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import LegalInfoPage from "./pages/LegalInfoPage";
import NotFoundPage from "./pages/NotFoundPage";

// Family archive pages
import DashboardPage from "./pages/DashboardPage";
import FamilyTreePage from "./pages/FamilyTreePage";
import ProfilesPage from "./pages/ProfilesPage";
import ProfilePage from "./pages/ProfilePage";
import LifeStoryPage from "./pages/LifeStoriesPage";
import CommunityPage from "./pages/CommunityPage";
import FamilyFeedPage from "./pages/FamilyFeedPage";
import FamilyHistoryPage from "./pages/FamilyHistoryPage";
import GalleryPage from "./pages/GalleryPage";
import ImageSearchPage from "./pages/ImageSearchPage";
import TimelinePage from "./pages/TimelinePage";
import EventsPage from "./pages/EventsPage";
import RecipesPage from "./pages/RecipesPage";
import TraditionsPage from "./pages/TraditionsPage";
import DocumentsPage from "./pages/DocumentsPage";
import PropertiesPage from "./pages/PropertiesPage";
import AnnouncementsPage from "./pages/AnnouncementsPage";
import FamilyHubPage from "./pages/FamilyHubPage";
import ChatPage from "./pages/ChatPage";
import MemorialPage from "./pages/MemorialPage";
import SearchPage from "./pages/SearchPage";
import EmergencyPage from "./pages/EmergencyPage";
import SettingsPage from "./pages/SettingsPage";
import AdminPage from "./pages/AdminPage";
import NotificationsPage from "./pages/NotificationsPage";

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/terms" element={<LegalInfoPage />} />
        <Route path="/privacy" element={<LegalInfoPage />} />
        <Route path="/contact" element={<LegalInfoPage />} />
      </Route>

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />

      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/family-tree" element={<FamilyTreePage />} />
        <Route path="/profiles" element={<ProfilesPage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/life-story" element={<LifeStoryPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/family-feed" element={<FamilyFeedPage />} />
        <Route path="/family-history" element={<FamilyHistoryPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/image-search" element={<ImageSearchPage />} />
        <Route path="/timeline" element={<TimelinePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/traditions" element={<TraditionsPage />} />
        <Route path="/documents" element={<DocumentsPage />} />
        <Route path="/properties" element={<PropertiesPage />} />
        <Route path="/announcements" element={<AnnouncementsPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/family-hub" element={<FamilyHubPage />} />
        <Route path="/memorial" element={<MemorialPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/emergency" element={<EmergencyPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
