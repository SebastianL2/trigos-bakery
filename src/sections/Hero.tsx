import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('nosotros');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="relative h-screen flex items-center">
      {/* Background image with overlay */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ 
        backgroundImage: 'url(https://images.pexels.com/photos/1855214/pexels-photo-1855214.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)',
        backgroundPosition: 'center'
      }}>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className={`max-w-2xl text-white transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4">
            Panadería <span className="text-gold">Trigos</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light">
            Tradición artesanal desde 1989. Sabor y calidad en cada bocado.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#productos" 
              className="bg-gold text-white px-6 py-3 rounded-md font-medium text-lg inline-flex items-center justify-center hover:bg-gold/90 transition-colors"
            >
              Ver Productos
            </a>
            <a 
              href="#ubicaciones" 
              className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-md font-medium text-lg inline-flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              Nuestras Ubicaciones
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll down button */}
      <button 
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown size={32} />
      </button>
    </section>
  );
};

export default Hero;