import React from 'react';
import { Cloud, Droplets, Thermometer, Wind } from 'lucide-react';
import type { WeatherData } from '../types';

interface WeatherWidgetProps {
  data: WeatherData;
}

export function WeatherWidget({ data }: WeatherWidgetProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Cloud className="w-6 h-6 text-blue-500" />
        Weather Conditions
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <Thermometer className="w-5 h-5 text-red-500" />
          <span className="text-gray-600">{data.temperature}°C</span>
        </div>
        <div className="flex items-center gap-2">
          <Droplets className="w-5 h-5 text-blue-500" />
          <span className="text-gray-600">{data.humidity}%</span>
        </div>
        <div className="flex items-center gap-2">
          <Wind className="w-5 h-5 text-gray-500" />
          <span className="text-gray-600">{data.windSpeed} km/h</span>
        </div>
        <div className="text-gray-600 capitalize">{data.description}</div>
      </div>
    </div>
  );
}