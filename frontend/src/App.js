import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import InitiativesGrid from "./components/InitiativesGrid";
import BlogSection from "./components/BlogSection";
import Footer from "./components/Footer";
import DonationPage from "./components/DonationPage";
import DonationValuePage from "./components/DonationValuePage";

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
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/doacao" element={<DonationPage />} />
          <Route path="/doacao/valor" element={<DonationValuePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;