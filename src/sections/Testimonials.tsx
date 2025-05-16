import React from 'react';
import { useInView } from '../hooks/useInView';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Carolina Rodríguez',
    testimonial: 'El mejor pan de Sogamoso, sin duda. La atención es excelente y el ambiente muy acogedor. Mis domingos no son lo mismo sin el pan campesino de Trigos.',
    stars: 5,
    image: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 2,
    name: 'Juan Pérez',
    testimonial: 'Las tortas de Trigos son increíbles. Siempre encargo aquí los postres para las celebraciones familiares y nunca me han decepcionado.',
    stars: 5,
    image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 3,
    name: 'María Gómez',
    testimonial: 'El café es delicioso y los meseros son muy amables. Es mi lugar favorito para reunirme con amigas. Recomiendo probar los croissants, son espectaculares.',
    stars: 4,
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];

const Testimonials = () => {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section id="testimonios" className="py-20 bg-white relative" ref={ref}>
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-gold/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-gold/10 rounded-full translate-x-1/2 translate-y-1/2"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl text-brown-dark mb-4">Nuestros Clientes Opinan</h2>
          <p className="text-brown max-w-2xl mx-auto">
            La satisfacción de nuestros clientes es nuestro mayor orgullo. Conoce lo que opinan de nosotros.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className={`bg-cream p-6 rounded-lg shadow-md transition-all duration-1000 ${
                inView 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="flex mb-4">
                {[...Array(testimonial.stars)].map((_, i) => (
                  <Star key={i} className="text-gold fill-gold" size={20} />
                ))}
                {[...Array(5 - testimonial.stars)].map((_, i) => (
                  <Star key={i + testimonial.stars} className="text-gold" size={20} />
                ))}
              </div>
              
              <p className="text-brown mb-6 italic">"{testimonial.testimonial}"</p>
              
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <p className="font-medium text-brown-dark">{testimonial.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;