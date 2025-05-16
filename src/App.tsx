import React from 'react';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Products from './sections/Products';
import Locations from './sections/Locations';
import Testimonials from './sections/Testimonials';
import ChatbotSection from './sections/ChatbotSection';
import Contact from './sections/Contact';
import Footer from './components/Footer';
import ChatbotWidget from './components/ChatbotWidget';

function App() {
  return (
    <div className="font-sans bg-cream min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Products />
        <Locations />
        <Testimonials />
        <ChatbotSection />
        <Contact />
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
}

export default App;