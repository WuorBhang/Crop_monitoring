import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Layout, Search } from 'lucide-react';
import { WeatherWidget } from './components/WeatherWidget';
import { CropCard } from './components/CropCard';
import { SensorChart } from './components/SensorChart';
import { AuthForm } from './components/AuthForm';
import type { CropData, WeatherData, SensorData, User, LoginData, RegisterData } from './types';

const api = axios.create({
  baseURL: 'http://localhost:3000/api'
});

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [weatherData] = useState<WeatherData>({
    temperature: 24,
    humidity: 65,
    description: 'partly cloudy',
    windSpeed: 12
  });

  const [crops, setCrops] = useState<CropData[]>([]);
  const [moistureData, setMoistureData] = useState<SensorData[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUserProfile();
    }

    // Fetch real-time crop data
    const fetchCrops = async () => {
      try {
        const response = await api.get('/crops'); // Assuming endpoint for crops
        setCrops(response.data);
      } catch (error) {
        console.error('Error fetching crops data:', error);
      }
    };

    // Fetch real-time moisture data
    const fetchMoistureData = async () => {
      try {
        const response = await api.get('/moisture-data'); // Assuming endpoint for moisture data
        setMoistureData(response.data);
      } catch (error) {
        console.error('Error fetching moisture data:', error);
      }
    };

    fetchCrops();
    fetchMoistureData();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await api.get('/farmer-profile');
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      localStorage.removeItem('token');
    }
  };

  const handleLogin = async (data: LoginData) => {
    try {
      const response = await api.post('/login', data);
      localStorage.setItem('token', response.data.token);
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      setUser(response.data.user);
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  const handleRegister = async (data: RegisterData) => {
    try {
      const response = await api.post('/register', data);
      localStorage.setItem('token', response.data.token);
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      await fetchUserProfile();
      alert('Registration successful! Welcome aboard.');
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    delete api.defaults.headers.common['Authorization'];
  };

  if (!user) {
    return <AuthForm onLogin={handleLogin} onRegister={handleRegister} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Layout className="w-8 h-8 text-green-600" />
              <h1 className="text-2xl font-bold text-gray-900">AgriTech Monitor</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search crops..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Welcome, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm text-white bg-green-600 rounded-md hover:bg-green-700"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <div className="grid sm:grid-cols-2 gap-6">
              {crops.map(crop => (
                <CropCard key={crop.id} crop={crop} />
              ))}
            </div>
          </div>
          <div>
            <WeatherWidget data={weatherData} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SensorChart
            data={moistureData}
            title="Soil Moisture Trends"
            color="#3B82F6"
          />
          <SensorChart
            data={moistureData.map(d => ({ ...d, value: d.value - 20 }))}
            title="Temperature Trends"
            color="#EF4444"
          />
        </div>
      </main>
    </div>
  );
}

export default App;
