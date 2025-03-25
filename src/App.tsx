import React, { useState, useEffect } from 'react';
import { StarMap } from './components/StarMap';
import { AstronomyQA } from './components/AstronomyQA';
import { Telescope, MapPin, Star } from 'lucide-react';
import type { Coordinates, CelestialObject } from './types';

// Mockup data - in a real app, this would come from an astronomy API
const mockCelestialObjects: CelestialObject[] = [
  { name: "Polaris", rightAscension: 37.95, declination: 89.26, magnitude: 1.97, type: "star" },
  { name: "Vega", rightAscension: 279.23, declination: 38.78, magnitude: 0.03, type: "star" },
  { name: "Mars", rightAscension: 200, declination: 45, magnitude: 1.8, type: "planet" },
];

function App() {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gray-900 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3">
            <Telescope className="h-8 w-8 text-blue-400" />
            <h1 className="text-2xl font-bold">AI Astronomy Explorer</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Location Display */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="text-blue-500" />
            <h2 className="text-xl font-semibold">Your Location</h2>
          </div>
          <p className="text-gray-600">
            {coordinates 
              ? `${coordinates.latitude.toFixed(4)}°N, ${coordinates.longitude.toFixed(4)}°E`
              : "Requesting location access..."}
          </p>
        </div>

        {/* Star Map and Q&A Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Star Map Section */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Star className="text-blue-500" />
              <h2 className="text-xl font-semibold">Live Star Map</h2>
            </div>
            <StarMap
              width={800}
              height={600}
              objects={mockCelestialObjects}
            />
          </div>

          {/* Q&A Section */}
          <div className="lg:col-span-1">
            <AstronomyQA />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>© 2024 AI Astronomy Explorer. Powered by NASA APIs and OpenAI.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
