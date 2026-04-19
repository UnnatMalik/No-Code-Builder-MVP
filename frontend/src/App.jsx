import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SocialProof from './components/SocialProof';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import CTA from './components/CTA';
import Footer from './components/Footer';
import FloatingToolbar from './components/FloatingToolbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function LandingPage() {
  return (
    <main>
      <Hero />
      <SocialProof />
      <Features />
      <HowItWorks />
      <CTA />
      <Footer />
      <FloatingToolbar />
    </main>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-surface selection:bg-primary/10 selection:text-primary pt-20">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
