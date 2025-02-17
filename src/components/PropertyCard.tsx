import React from 'react';
import { MapPin, Star, Heart } from 'lucide-react';

interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  description?: string;
  amenities?: string[];
  host?: {
    name: string;
    rating: number;
    responseTime: string;
    image: string;
  };
}

interface PropertyCardProps {
  property: Property;
  onClick: () => void;
}

const PropertyCard = ({ property, onClick }: PropertyCardProps) => {
  return (
    <div 
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative">
        <img 
          src={property.image} 
          alt={property.title}
          className="w-full h-64 object-cover group-hover:scale-105 transition duration-300"
        />
        <button 
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition"
          onClick={(e) => {
            e.stopPropagation();
            // Handle favoriting
          }}
        >
          <Heart className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-semibold">{property.title}</h3>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span>{property.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1 text-gray-500 mb-4">
          <MapPin className="w-4 h-4" />
          <span>{property.location}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold">${property.price}</span>
            <span className="text-gray-500"> / night</span>
          </div>
          <button 
            className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition"
            onClick={(e) => {
              e.stopPropagation();
              // Handle booking
            }}
          >
            Book now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;