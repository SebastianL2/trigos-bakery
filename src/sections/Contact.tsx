import React, { useState } from 'react';
import { useInView } from '../hooks/useInView';
import { Send, Instagram, Facebook, MapPin } from 'lucide-react';

const Contact = () => {
  const { ref, inView } = useInView({ threshold: 0.2 });
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [subscribeEmail, setSubscribeEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally send the data to your backend
    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      setEmail('');
      setMessage('');
      alert('¡Mensaje enviado! Gracias por contactarnos.');
    }, 1500);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate subscription
    setTimeout(() => {
      setSubscribed(true);
      setSubscribeEmail('');
    }, 1000);
  };

  return (
    <section id="contacto" className="py-20 bg-cream" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl text-brown-dark mb-4">Contáctanos</h2>
          <p className="text-brown max-w-2xl mx-auto">
            Estamos aquí para atender tus preguntas, sugerencias o pedidos especiales. No dudes en ponerte en contacto con nosotros.
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Contact info */}
          <div className={`lg:w-1/3 transition-all duration-1000 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <div className="bg-white p-8 rounded-lg shadow-lg h-full">
              <h3 className="font-serif text-2xl text-brown-dark mb-6">Información de Contacto</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="text-gold mt-1 mr-3 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-medium text-brown-dark">Dirección Principal</h4>
                    <p className="text-brown">Carrera 11 No. 11-04, Centro, Sogamoso</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-brown-dark mb-2">Teléfonos</h4>
                  <p className="text-brown mb-1">Sogamoso: 312 6548790</p>
                  <p className="text-brown">Whatsapp: 313 2488837</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-brown-dark mb-2">Horarios</h4>
                  <p className="text-brown mb-1">Lunes a Sábado: 7:00 am - 8:00 pm</p>
                  <p className="text-brown">Domingos: 8:00 am - 6:00 pm</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-brown-dark mb-3">Síguenos</h4>
                  <div className="flex space-x-4">
                    <a href="#" className="bg-gold/10 p-3 rounded-full text-gold hover:bg-gold/20 transition-colors">
                      <Instagram size={20} />
                    </a>
                    <a href="#" className="bg-gold/10 p-3 rounded-full text-gold hover:bg-gold/20 transition-colors">
                      <Facebook size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact form */}
          <div className={`lg:w-2/3 transition-all duration-1000 delay-300 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="font-serif text-2xl text-brown-dark mb-6">Envíanos un Mensaje</h3>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-brown-dark mb-2">Nombre</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold/50"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-brown-dark mb-2">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold/50"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label htmlFor="subject" className="block text-brown-dark mb-2">Asunto</label>
                    <input 
                      type="text" 
                      id="subject" 
                      className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold/50"
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label htmlFor="message" className="block text-brown-dark mb-2">Mensaje</label>
                    <textarea 
                      id="message" 
                      rows={4} 
                      className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold/50"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    ></textarea>
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  className="bg-gold text-white px-6 py-3 rounded-md font-medium text-lg inline-flex items-center hover:bg-gold/90 transition-colors disabled:bg-gold/50 disabled:cursor-not-allowed"
                  disabled={submitting}
                >
                  {submitting ? 'Enviando...' : (
                    <>
                      <Send className="mr-2" size={18} />
                      Enviar Mensaje
                    </>
                  )}
                </button>
              </form>
              
              {/* Newsletter subscription */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="font-serif text-2xl text-brown-dark mb-4">Suscríbete a Nuestro Boletín</h3>
                <p className="text-brown mb-4">
                  Recibe noticias, promociones y eventos especiales directamente en tu bandeja de entrada.
                </p>
                
                {subscribed ? (
                  <div className="bg-green-50 text-green-800 p-4 rounded-lg">
                    ¡Gracias por suscribirte! Pronto recibirás nuestras novedades.
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                    <input 
                      type="email" 
                      placeholder="Tu correo electrónico" 
                      className="flex-1 p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold/50"
                      value={subscribeEmail}
                      onChange={(e) => setSubscribeEmail(e.target.value)}
                      required
                    />
                    <button 
                      type="submit" 
                      className="bg-gold text-white px-6 py-3 rounded-md font-medium inline-flex items-center justify-center hover:bg-gold/90 transition-colors whitespace-nowrap"
                    >
                      Suscribirse
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;