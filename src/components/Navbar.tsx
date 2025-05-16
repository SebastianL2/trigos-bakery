import React, { useState, useEffect } from 'react';
import { Menu, X, Coffee, ShoppingBag } from 'lucide-react';
import logoUrl from '../assets/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ease-in-out ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj0ErRVT0PXcRG3caOFtfHsAjJzX-9pREzkw&s'} alt="Trigos Logo" className="h-16" />
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#inicio" className="text-brown-dark hover:text-gold transition-colors font-medium">Inicio</a>
            <a href="#nosotros" className="text-brown-dark hover:text-gold transition-colors font-medium">Nosotros</a>
            <a href="#productos" className="text-brown-dark hover:text-gold transition-colors font-medium">Productos</a>
            <a href="#ubicaciones" className="text-brown-dark hover:text-gold transition-colors font-medium">Ubicaciones</a>
            <a href="#contacto" className="text-brown-dark hover:text-gold transition-colors font-medium">Contacto</a>
            <button className="bg-gold text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gold/90 transition-colors">
              <Coffee size={18} />
              <span>Ordenar</span>
            </button>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-brown-dark p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="flex flex-col py-4 px-4 space-y-3">
            <a href="#inicio" className="text-brown-dark py-2 hover:text-gold transition-colors" onClick={() => setIsOpen(false)}>Inicio</a>
            <a href="#nosotros" className="text-brown-dark py-2 hover:text-gold transition-colors" onClick={() => setIsOpen(false)}>Nosotros</a>
            <a href="#productos" className="text-brown-dark py-2 hover:text-gold transition-colors" onClick={() => setIsOpen(false)}>Productos</a>
            <a href="#ubicaciones" className="text-brown-dark py-2 hover:text-gold transition-colors" onClick={() => setIsOpen(false)}>Ubicaciones</a>
            <a href="#contacto" className="text-brown-dark py-2 hover:text-gold transition-colors" onClick={() => setIsOpen(false)}>Contacto</a>
            <button className="bg-gold text-white px-4 py-2 rounded-md flex items-center gap-2 justify-center hover:bg-gold/90 transition-colors">
              <Coffee size={18} />
              <span>Ordenar</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;