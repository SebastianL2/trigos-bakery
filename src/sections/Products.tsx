import React from 'react';
import { useInView } from '../hooks/useInView';
import ProductCard from '../components/ProductCard';

const products = [
  {
    id: 1,
    name: 'Panadería Artesanal',
    image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Pan artesanal elaborado con ingredientes de la más alta calidad y técnicas tradicionales.',
    items: ['Pan Blandito', 'Pan Mantequilla', 'Pan Multicereal', 'Pan Campesino']
  },
  {
    id: 2,
    name: 'Pastelería',
    image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Deliciosos pasteles y postres para cualquier ocasión, elaborados con recetas tradicionales.',
    items: ['Tortas', 'Ponqués', 'Galletas', 'Pasteles Individuales']
  },
  {
    id: 3,
    name: 'Cafetería',
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'El mejor café colombiano acompañado de nuestros productos de panadería y pastelería.',
    items: ['Café Espresso', 'Cappuccino', 'Latte', 'Café Colombiano']
  },
  {
    id: 4,
    name: 'Restaurante',
    image: 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Deliciosas comidas preparadas con ingredientes frescos y recetas tradicionales.',
    items: ['Desayunos', 'Almuerzos', 'Platos Típicos', 'Ensaladas']
  }
];

const Products = () => {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section id="productos" className="py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl text-brown-dark mb-4">Nuestros Productos</h2>
          <p className="text-brown max-w-2xl mx-auto">
            En Trigos nos enfocamos en ofrecer productos de la más alta calidad, elaborados con ingredientes seleccionados y técnicas artesanales.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              delay={index * 100}
              inView={inView}
            />
          ))}
        </div>
        
        <div className={`mt-16 text-center transition-all duration-1000 delay-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <a 
            href="#" 
            className="bg-gold text-white px-8 py-3 rounded-md inline-block font-medium text-lg hover:bg-gold/90 transition-colors"
          >
            Ver Menú Completo
          </a>
        </div>
      </div>
    </section>
  );
};

export default Products;