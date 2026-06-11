/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import OnboardingPage from './pages/OnboardingPage';
import DirectOnboardingPage from './pages/DirectOnboardingPage';
import DashboardPage from './pages/DashboardPage';
import FullServicesPage from './pages/FullServicesPage';
import OurClientsPage from './pages/OurClientsPage';
import EditorialCampaignPage from './pages/EditorialCampaignPage';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/services" element={<FullServicesPage />} />
        <Route path="/clients" element={<OurClientsPage />} />
        <Route path="/our-clients" element={<OurClientsPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/onboarding-direct" element={<DirectOnboardingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/campaign" element={<EditorialCampaignPage />} />
      </Routes>
    </Router>
  );
}
