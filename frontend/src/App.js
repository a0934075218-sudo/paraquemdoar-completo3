import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ProjectFinder from "./components/ProjectFinder";
import InitiativesGrid from "./components/InitiativesGrid";
import BlogSection from "./components/BlogSection";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <main>
          <HeroSection />
          <ProjectFinder />
          <InitiativesGrid />
          <BlogSection />
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;