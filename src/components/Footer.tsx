import React from 'react';
import { Heart, Instagram, Facebook, Twitter } from 'lucide-react';
import logoUrl from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-brown-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj0ErRVT0PXcRG3caOFtfHsAjJzX-9pREzkw&s'} alt="Trigos Logo" className="h-16 mb-4" />
            <p className="text-white/70 mb-4">
              Tradición artesanal desde 1989. Calidad y sabor en cada producto.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/70 hover:text-gold transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white/70 hover:text-gold transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white/70 hover:text-gold transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-medium mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li><a href="#inicio" className="text-white/70 hover:text-gold transition-colors">Inicio</a></li>
              <li><a href="#nosotros" className="text-white/70 hover:text-gold transition-colors">Nosotros</a></li>
              <li><a href="#productos" className="text-white/70 hover:text-gold transition-colors">Productos</a></li>
              <li><a href="#ubicaciones" className="text-white/70 hover:text-gold transition-colors">Ubicaciones</a></li>
              <li><a href="#contacto" className="text-white/70 hover:text-gold transition-colors">Contacto</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-medium mb-4">Servicios</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/70 hover:text-gold transition-colors">Panadería</a></li>
              <li><a href="#" className="text-white/70 hover:text-gold transition-colors">Pastelería</a></li>
              <li><a href="#" className="text-white/70 hover:text-gold transition-colors">Cafetería</a></li>
              <li><a href="#" className="text-white/70 hover:text-gold transition-colors">Domicilios</a></li>
              <li><a href="#" className="text-white/70 hover:text-gold transition-colors">Eventos</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-medium mb-4">Contacto</h3>
            <p className="text-white/70 mb-2">
              Carrera 11 No. 11-04, Centro, Sogamoso
            </p>
            <p className="text-white/70 mb-2">
              Teléfono: 312 6548790
            </p>
            <p className="text-white/70 mb-2">
              Whatsapp: 313 2488837
            </p>
            <p className="text-white/70">
              Email: contacto@trigos.com
            </p>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-8 text-center">
          <p className="text-white/60 flex items-center justify-center">
            © {new Date().getFullYear()} Panadería Trigos. Todos los derechos reservados. Hecho con <Heart className="text-gold mx-1 fill-gold" size={16} /> en Sogamoso, Colombia.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;