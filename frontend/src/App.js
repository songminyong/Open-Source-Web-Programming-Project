import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import KoreaPage from './pages/KoreaPage';
import MongoliaPage from './pages/MongoliaPage';
import DestinationsPage from './pages/DestinationsPage';
import DestinationDetailPage from './pages/DestinationDetailPage';
import BudgetPlannerPage from './pages/BudgetPlannerPage';
import CommunityPage from './pages/CommunityPage';
import WishlistPage from './pages/WishlistPage';
import PlanTripPage from './pages/PlanTripPage';
import GalleryPage from './pages/GalleryPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="korea" element={<KoreaPage />} />
            <Route path="mongolia" element={<MongoliaPage />} />
            <Route path="destinations" element={<DestinationsPage />} />
            <Route path="destinations/:id" element={<DestinationDetailPage />} />
            <Route path="budget-planner" element={<BudgetPlannerPage />} />
            <Route path="community" element={<CommunityPage />} />
            <Route path="wishlist" element={<WishlistPage />} />
            <Route path="plan" element={<PlanTripPage />} />
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
