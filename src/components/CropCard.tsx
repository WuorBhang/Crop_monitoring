import React from 'react';
import { Droplets, ThermometerSun } from 'lucide-react';
import type { CropData } from '../types';

interface CropCardProps {
  crop: CropData;
}

export function CropCard({ crop }: CropCardProps) {
  const statusColors = {
    healthy: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    critical: 'bg-red-100 text-red-800'
  };

  // Use a fallback if the status is not in the expected list
  const statusClass = statusColors[crop.status] || 'bg-gray-100 text-gray-800';

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{crop.name}</h3>
          <p className="text-sm text-gray-500">{crop.location}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm ${statusClass}`}>
          {crop.status}
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Droplets className="w-5 h-5 text-blue-500" />
          <span className="text-gray-600">{crop.moisture}%</span>
        </div>
        <div className="flex items-center gap-2">
          <ThermometerSun className="w-5 h-5 text-orange-500" />
          <span className="text-gray-600">{crop.temperature}°C</span>
        </div>
      </div>

      <div className="flex justify-between text-sm text-gray-500">
        <span>Area: {crop.area} ha</span>
        <span>Type: {crop.type}</span>
      </div>
    </div>
  );
}
