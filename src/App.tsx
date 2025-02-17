import React, { useState } from 'react';
import { Search, MapPin, Star, Heart, Filter } from 'lucide-react';
import Navbar from './components/Navbar';
import PropertyCard from './components/PropertyCard';
import PropertyDetail from './components/PropertyDetail';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProperty, setSelectedProperty] = useState<number | null>(null);

  const properties = [
    {
      id: 1,
      title: "Luxury Beach Villa",
      location: "Malibu, California",
      price: 450,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1000",
      description: "Experience luxury living in this stunning beachfront villa. Wake up to panoramic ocean views and fall asleep to the sound of waves. This modern villa features 4 bedrooms, a private pool, and direct beach access.",
      amenities: ["Pool", "Beach Access", "WiFi", "Kitchen", "4 Bedrooms", "3 Bathrooms", "Ocean View", "Air Conditioning"],
      host: {
        name: "Sarah Johnson",
        rating: 4.95,
        responseTime: "within an hour",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
      }
    },
    {
      id: 2,
      title: "Mountain Retreat Cabin",
      location: "Aspen, Colorado",
      price: 275,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=1000",
      description: "Escape to this cozy mountain cabin surrounded by nature. Perfect for skiing in winter and hiking in summer. Features a rustic interior with modern amenities and a hot tub overlooking the mountains.",
      amenities: ["Hot Tub", "Fireplace", "WiFi", "Kitchen", "2 Bedrooms", "2 Bathrooms", "Mountain View", "Heating"],
      host: {
        name: "Mike Anderson",
        rating: 4.88,
        responseTime: "within a day",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"
      }
    },
    {
      id: 3,
      title: "Modern City Loft",
      location: "New York City, NY",
      price: 320,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1000",
      description: "Stay in the heart of Manhattan in this stylish loft apartment. High ceilings, exposed brick, and contemporary furnishings create the perfect urban retreat. Walking distance to major attractions.",
      amenities: ["City View", "WiFi", "Kitchen", "1 Bedroom", "1 Bathroom", "Air Conditioning", "Gym Access", "Doorman"],
      host: {
        name: "Emily Chen",
        rating: 4.92,
        responseTime: "within hours",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200"
      }
    },
  ];

  const selectedPropertyData = properties.find(p => p.id === selectedProperty);

  return (
    <div className="min-h-screen bg-white">
      <Navbar onLogoClick={() => setSelectedProperty(null)} />
      
      {selectedProperty === null ? (
        <>
          {/* Hero Section */}
          <div className="relative h-[500px] bg-gradient-to-r from-purple-500 to-pink-500">
            <div className="absolute inset-0 bg-black opacity-40"></div>
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
              <h1 className="text-5xl font-bold mb-6 text-center">Find Your Perfect Getaway</h1>
              <div className="w-full max-w-2xl bg-white rounded-full shadow-lg flex items-center p-2">
                <Search className="w-5 h-5 text-gray-500 ml-3" />
                <input
                  type="text"
                  placeholder="Search destinations..."
                  className="w-full px-4 py-2 text-gray-800 focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="bg-rose-500 text-white px-6 py-2 rounded-full hover:bg-rose-600 transition">
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-semibold">Featured Properties</h2>
              <button className="flex items-center gap-2 px-4 py-2 border rounded-full hover:bg-gray-50">
                <Filter className="w-4 h-4" />
                Filters
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((property) => (
                <PropertyCard 
                  key={property.id} 
                  property={property} 
                  onClick={() => setSelectedProperty(property.id)}
                />
              ))}
            </div>
          </div>
        </>
      ) : (
        selectedPropertyData && <PropertyDetail property={selectedPropertyData} onBack={() => setSelectedProperty(null)} />
      )}
    </div>
  );
}

export default App;