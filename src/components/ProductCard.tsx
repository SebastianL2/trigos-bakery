import React from 'react';

interface Product {
  id: number;
  name: string;
  image: string;
  description: string;
  items: string[];
}

interface ProductCardProps {
  product: Product;
  delay: number;
  inView: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, delay, inView }) => {
  return (
    <div 
      className={`bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-1000 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-all duration-500 hover:scale-110"
        />
      </div>
      
      <div className="p-6">
        <h3 className="font-serif text-xl text-brown-dark mb-2">{product.name}</h3>
        <p className="text-brown mb-4">{product.description}</p>
        
        <h4 className="font-medium text-brown-dark mb-2">Productos destacados:</h4>
        <ul className="space-y-1 mb-6">
          {product.items.map((item, index) => (
            <li key={index} className="text-brown flex items-center">
              <span className="mr-2 text-gold">•</span>
              {item}
            </li>
          ))}
        </ul>
        
        <a 
          href="#" 
          className="inline-block bg-gold/10 text-gold px-4 py-2 rounded-md transition-colors hover:bg-gold/20"
        >
          Ver productos
        </a>
      </div>
    </div>
  );
};

export default ProductCard;