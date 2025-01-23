import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TransitionProvider from './components/TransitionProvider';
import LandingPage from './pages/LandingPage';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import FullSurvivalKit from './pages/FullSurvivalKit';
import Order from './pages/Order';
import BunkerOrder from './pages/BunkerOrder';
import BunkerThankYou from './pages/BunkerThankYou';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import ThankYou from './pages/ThankYou';
import Bunker from './pages/Bunker';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <TransitionProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/full-survival-kit" element={<FullSurvivalKit />} />
        <Route path="/services/:serviceId" element={<ServiceDetail />} />
        <Route path="/services/:serviceId/order/:packageName" element={<Order />} />
        <Route path="/bunker" element={<Bunker />} />
        <Route path="/bunker/order/:packageName" element={<BunkerOrder />} />
        <Route path="/bunker/thank-you" element={<BunkerThankYou />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
      <ScrollToTop />
    </TransitionProvider>
  );
}

export default App;