import React, { useEffect } from 'react';
import { useInView } from '../hooks/useInView';
import { Wheat } from 'lucide-react';

const About = () => {
  const { ref, inView } = useInView({ threshold: 0.2 });

  return (
    <section id="nosotros" className="py-20 bg-cream" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Image side */}
          <div className={`md:w-1/2 transition-all duration-1000 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/8472392/pexels-photo-8472392.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Panaderia Trigos interior" 
                className="rounded-lg shadow-xl w-full h-auto object-cover"
                style={{ maxHeight: '500px' }}
              />
              <div className="absolute -bottom-6 -right-6 bg-gold p-4 rounded-lg shadow-lg hidden md:block">
                <p className="text-white font-serif text-xl">Desde 1989</p>
              </div>
            </div>
          </div>
          
          {/* Text side */}
          <div className={`md:w-1/2 transition-all duration-1000 delay-300 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="flex items-center mb-4">
              <Wheat className="text-gold mr-3" size={24} />
              <h2 className="font-serif text-3xl text-brown-dark">Nuestra Historia</h2>
            </div>
            <h3 className="text-4xl font-bold text-brown-dark mb-6">
              Tradición artesanal y pasión por la excelencia
            </h3>
            <p className="text-brown mb-4 text-lg">
              Fundada en 1989 por Miguel Chaparro, Panadería Trigos nació inspirada en la alta calidad de la panadería europea, con el objetivo de ofrecer productos artesanales y un espacio acogedor para nuestros clientes.
            </p>
            <p className="text-brown mb-6 text-lg">
              Hoy contamos con 18 locales distribuidos en varias ciudades de Boyacá, incluyendo Sogamoso, ofreciendo no solo panadería, sino también pastelería, cafetería, heladería y restaurantes en algunas sedes.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-serif text-gold text-2xl mb-2">Calidad</h4>
                <p className="text-brown">Utilizamos maquinaria importada de Europa y contamos con asesoría internacional.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-serif text-gold text-2xl mb-2">Compromiso</h4>
                <p className="text-brown">Apoyamos el talento local y la inclusión de mujeres cabeza de familia.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;