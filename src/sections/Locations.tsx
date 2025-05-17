import React from 'react';
import { useInView } from '../hooks/useInView';
import { MapPin, Phone, Clock } from 'lucide-react';

const locations = [
  {
    id: 1,
    name: 'Trigos Sogmoso',
    address: 'Carrera 11 No. 11-04, Centro',
    phone: '312 6548790',
    hours: 'Lun-Sáb: 7:00 - 20:00, Dom: 8:00 - 18:00',
    mapUrl: 'https://www.google.com/maps?q=Carrera+11+No.+11-04+Sogamoso'
  },
  {
    id: 2,
    name: 'Trigos Duiitama',
    address: 'Cl. 16 #14-34, Centro-Sur, Duitama, Boyacá0',
    phone: '312 7711553',
    hours: 'Lun-Dom: 8:00 - 20:00',
    mapUrl: 'https://www.google.com/maps?q=Carrera+11+14-14+C.C.+Meditropoli+Sogamoso'
  }
];

const Locations = () => {
  const { ref, inView } = useInView({ threshold: 0.2 });

  return (
    <section id="ubicaciones" className="py-20 bg-cream" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl text-brown-dark mb-4">Nuestras Ubicaciones</h2>
          <p className="text-brown max-w-2xl mx-auto">
            Encuentra la Panadería Trigos más cercana en Sogamoso y visítanos para disfrutar de nuestros productos.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {locations.map((location, index) => (
            <div 
              key={location.id}
              className={`bg-white p-6 rounded-lg shadow-lg transition-all duration-1000 ${
                inView 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <h3 className="font-serif text-2xl text-brown-dark mb-3">{location.name}</h3>
              
              <div className="flex items-start mb-3">
                <MapPin className="text-gold mt-1 mr-3 flex-shrink-0" size={20} />
                <p className="text-brown">{location.address}</p>
              </div>
              
              <div className="flex items-start mb-3">
                <Phone className="text-gold mt-1 mr-3 flex-shrink-0" size={20} />
                <p className="text-brown">{location.phone}</p>
              </div>
              
              <div className="flex items-start mb-5">
                <Clock className="text-gold mt-1 mr-3 flex-shrink-0" size={20} />
                <p className="text-brown">{location.hours}</p>
              </div>
              
              <a 
                href={location.mapUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-gold text-white px-4 py-2 rounded-md transition-colors hover:bg-gold/90"
              >
                Ver en Google Maps
              </a>
            </div>
          ))}
        </div>
        
        <div className={`mt-16 text-center bg-white p-8 rounded-lg shadow-lg transition-all duration-1000 delay-500 ${inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <h3 className="font-serif text-2xl text-brown-dark mb-4">Domicilios</h3>
          <p className="text-brown mb-6">
            ¿Prefieres disfrutar nuestros productos en casa? Llámanos para hacer tu pedido a domicilio.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8">
            <div className="flex items-center justify-center">
              <Phone className="text-gold mr-2" size={20} />
              <span className="text-brown-dark font-semibold">Sogamoso: 312 6548790</span>
            </div>
            <div className="flex items-center justify-center">
              <Phone className="text-gold mr-2" size={20} />
              <span className="text-brown-dark font-semibold">Whatsapp: 313 2488837</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Locations;