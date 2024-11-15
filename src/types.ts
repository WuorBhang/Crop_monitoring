export interface CropData {
  id: string;
  name: string;
  status: 'healthy' | 'warning' | 'critical';
  moisture: number;
  temperature: number;
  lastUpdated: string;
  location: string;
  type: string;
  area: number;
}

export interface WeatherData {
  temperature: number;
  humidity: number;
  description: string;
  windSpeed: number;
}

export interface SensorData {
  timestamp: string;
  value: number;
}

export interface User {
  id: number;
  email: string;
  name: string;
  farmName: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData extends LoginData {
  name: string;
  farmName: string;
}