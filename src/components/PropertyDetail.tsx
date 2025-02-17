import React, { useState, useEffect } from 'react';
import { Star, MapPin, ArrowLeft, User, Clock, Award } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import { format, isWithinInterval, addDays } from 'date-fns';
import { supabase } from '../lib/supabase';
import 'react-day-picker/dist/style.css';

interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  amenities: string[];
  host: {
    name: string;
    rating: number;
    responseTime: string;
    image: string;
  };
}

interface PropertyDetailProps {
  property: Property;
  onBack: () => void;
}

interface Booking {
  start_date: string;
  end_date: string;
}

const TEMP_USER_ID = '00000000-0000-0000-0000-000000000000';

const PropertyDetail = ({ property, onBack }: PropertyDetailProps) => {
  const [selectedRange, setSelectedRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined
  });
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBookings();
  }, [property.id]);

  const fetchBookings = async () => {
    const { data, error } = await supabase
      .from('bookings')
      .select('start_date, end_date')
      .eq('property_id', property.id);

    if (error) {
      console.error('Error fetching bookings:', error);
      return;
    }

    setBookings(data || []);
  };

  const isDateDisabled = (date: Date) => {
    return bookings.some(booking => 
      isWithinInterval(date, {
        start: new Date(booking.start_date),
        end: new Date(booking.end_date)
      })
    );
  };

  const handleBooking = async () => {
    if (!selectedRange.from || !selectedRange.to) {
      setError('Please select a date range');
      return;
    }

    setIsLoading(true);
    setError(null);

    const { error: bookingError } = await supabase
      .from('bookings')
      .insert({
        property_id: property.id,
        user_id: TEMP_USER_ID,
        start_date: format(selectedRange.from, 'yyyy-MM-dd'),
        end_date: format(selectedRange.to, 'yyyy-MM-dd')
      });

    if (bookingError) {
      setError('Failed to create booking. Please try again.');
      console.error('Booking error:', bookingError);
    } else {
      // Refresh bookings
      await fetchBookings();
      // Reset selection
      setSelectedRange({ from: undefined, to: undefined });
    }

    setIsLoading(false);
  };

  const numberOfNights = selectedRange.from && selectedRange.to
    ? Math.ceil((selectedRange.to.getTime() - selectedRange.from.getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  const totalPrice = numberOfNights * property.price;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to listings
      </button>

      {/* Property Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
        <div className="flex items-center gap-4 text-gray-600">
          <div className="flex items-center gap-1">
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            <span>{property.rating} rating</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-5 h-5" />
            <span>{property.location}</span>
          </div>
        </div>
      </div>

      {/* Property Image */}
      <div className="rounded-2xl overflow-hidden mb-8">
        <img 
          src={property.image} 
          alt={property.title}
          className="w-full h-[600px] object-cover"
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          {/* Description */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">About this place</h2>
            <p className="text-gray-600 leading-relaxed">{property.description}</p>
          </div>

          {/* Amenities */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">What this place offers</h2>
            <div className="grid grid-cols-2 gap-4">
              {property.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-600">
                  <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                  {amenity}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Booking Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <span className="text-2xl font-bold">${property.price}</span>
                <span className="text-gray-600"> / night</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span>{property.rating}</span>
              </div>
            </div>

            {/* Calendar */}
            <div className="border rounded-lg p-4 mb-4">
              <DayPicker
                mode="range"
                selected={selectedRange}
                onSelect={(range) => setSelectedRange(range || { from: undefined, to: undefined })}
                disabled={isDateDisabled}
                modifiers={{
                  booked: (date) => isDateDisabled(date)
                }}
                modifiersStyles={{
                  booked: { textDecoration: 'line-through', color: '#999' }
                }}
                styles={{
                  caption: { color: '#111' },
                  head_cell: { color: '#666' }
                }}
                fromDate={new Date()}
              />
            </div>

            {selectedRange.from && selectedRange.to && (
              <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span>
                    ${property.price} x {numberOfNights} nights
                  </span>
                  <span>${totalPrice}</span>
                </div>
                <div className="border-t pt-2 mt-2 font-semibold flex justify-between">
                  <span>Total</span>
                  <span>${totalPrice}</span>
                </div>
              </div>
            )}

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button 
              className={`w-full bg-rose-500 text-white py-3 rounded-lg font-semibold hover:bg-rose-600 transition mb-4 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={handleBooking}
              disabled={isLoading || !selectedRange.from || !selectedRange.to}
            >
              {isLoading ? 'Processing...' : 'Reserve'}
            </button>

            <p className="text-center text-sm text-gray-500">
              You won't be charged yet
            </p>
          </div>
        </div>
      </div>

      {/* Host Information */}
      <div className="mt-12 border-t pt-8">
        <div className="flex items-center gap-4 mb-4">
          <img 
            src={property.host.image} 
            alt={property.host.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h3 className="text-xl font-semibold">Hosted by {property.host.name}</h3>
            <div className="flex items-center gap-4 text-gray-600 mt-1">
              <div className="flex items-center gap-1">
                <Award className="w-4 h-4" />
                <span>{property.host.rating} rating</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>Responds {property.host.responseTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;