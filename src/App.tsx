/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import OnboardingPage from './pages/OnboardingPage';

export default function App() {
  const basename = import.meta.env.BASE_URL.replace(/\/$/, "");
  return (
    <Router basename={basename || "/"}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/services" element={<LandingPage />} /> {/* Placeholder */}
        <Route path="/onboarding" element={<OnboardingPage />} />
      </Routes>
    </Router>
  );
}
