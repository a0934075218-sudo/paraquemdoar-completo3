import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import InitiativesGrid from "./components/InitiativesGrid";
import BlogSection from "./components/BlogSection";
import Footer from "./components/Footer";
import DonationPage from "./components/DonationPage";
import DonationValuePage from "./components/DonationValuePage";
import PixPaymentPage from "./components/PixPaymentPage";
import LoginPage from "./components/LoginPage";
import AdminDashboard from "./components/AdminDashboard";

import DonorDataPage from "./components/DonorDataPage";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const HomePage = () => {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <InitiativesGrid />
        <BlogSection />
      </main>
      <Footer />
    </>
  );
};

function App() {
  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    axios.post(`${API}/admin/visits/track`, { device: isMobile ? 'Mobile' : 'Desktop', origin: window.location.hostname }).catch(() => {});
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/doacao" element={<DonationPage />} />
          <Route path="/doacao/valor" element={<DonationValuePage />} />
          <Route path="/doacao/dados" element={<DonorDataPage />} />
          <Route path="/doacao/pix" element={<PixPaymentPage />} />
          <Route path="/donaspainel" element={<LoginPage />} />
          <Route path="/donaspainel/dashboard" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;