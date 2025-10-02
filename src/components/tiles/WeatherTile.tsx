import React from 'react';
import { WidgetProps } from '../../types/widget';
import Tile from '@/components/ui/Tile';

interface WeatherData {
  temperature: number;
  condition: string;
  high: number;
  low: number;
  humidity: number;
  wind: number;
  hourlyForecast: Array<{
    hour: string;
    temp: number;
  }>;
}

const mockWeatherData: WeatherData = {
  temperature: 72,
  condition: 'Sunny',
  high: 75,
  low: 65,
  humidity: 45,
  wind: 5,
  hourlyForecast: [
    { hour: '9AM', temp: 68 },
    { hour: '12PM', temp: 72 },
    { hour: '3PM', temp: 75 },
    { hour: '6PM', temp: 70 },
    { hour: '9PM', temp: 67 }
  ]
};

const WeatherVisual: React.FC<{ condition: string }> = ({ condition }) => {
  const getWeatherEmoji = () => {
    switch (condition.toLowerCase()) {
      case 'sunny': return (
        <div className="relative">
          <span className="text-6xl">☀️</span>
          <div className="absolute top-0 left-0 w-full h-full animate-pulse opacity-50">✨</div>
        </div>
      );
      case 'cloudy': return '☁️';
      case 'rainy': return '🌧️';
      default: return '🌤️';
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-full">
      {getWeatherEmoji()}
    </div>
  );
};

const HourlyGraph: React.FC<{ data: typeof mockWeatherData.hourlyForecast }> = ({ data }) => {
  const maxTemp = Math.max(...data.map(d => d.temp));
  const minTemp = Math.min(...data.map(d => d.temp));

  return (
    <div className="flex flex-col w-full h-32 mt-4 gap-2">
      <div className="text-sm text-zinc-400">Today's Forecast</div>
      <div className="flex justify-between items-end h-full relative">
        {data.map((hour, i) => {
          const height = ((hour.temp - minTemp) / (maxTemp - minTemp) * 100) + '%';
          return (
            <div key={hour.hour} className="flex flex-col items-center gap-1">
              <div className="text-xs text-zinc-400">{hour.temp}°</div>
              <div 
                className="w-2 bg-blue-500 rounded-t transition-all duration-500" 
                style={{ height }}
              />
              <div className="text-xs text-zinc-500">{hour.hour}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const WeatherTile: React.FC<WidgetProps> = ({ size }) => {
  const renderContent = () => {
    switch (size) {
      case 'small':
        return (
          <div className="flex items-center justify-center w-full h-full">
            <span className="text-2xl font-medium">{mockWeatherData.temperature}°</span>
          </div>
        );
      
      case 'medium':
        return (
          <div className="flex flex-col items-center justify-center w-full h-full gap-1">
            <span className="text-3xl font-medium">{mockWeatherData.temperature}°</span>
            <span className="text-sm text-zinc-400">{mockWeatherData.condition}</span>
            <div className="flex gap-2 text-xs text-zinc-500">
              <span>H: {mockWeatherData.high}°</span>
              <span>L: {mockWeatherData.low}°</span>
            </div>
          </div>
        );
      
      case 'large':
        return (
          <div className="flex flex-col w-full h-full p-4">
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <span className="text-4xl font-medium">{mockWeatherData.temperature}°</span>
                <span className="text-zinc-400">{mockWeatherData.condition}</span>
              </div>
              <WeatherVisual condition={mockWeatherData.condition} />
            </div>
            
            <div className="flex flex-col gap-2 text-sm text-zinc-400 mt-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="flex justify-between p-2 bg-zinc-800/50 rounded">
                  <span>High</span>
                  <span>{mockWeatherData.high}°</span>
                </div>
                <div className="flex justify-between p-2 bg-zinc-800/50 rounded">
                  <span>Low</span>
                  <span>{mockWeatherData.low}°</span>
                </div>
                <div className="flex justify-between p-2 bg-zinc-800/50 rounded">
                  <span>Humidity</span>
                  <span>{mockWeatherData.humidity}%</span>
                </div>
                <div className="flex justify-between p-2 bg-zinc-800/50 rounded">
                  <span>Wind</span>
                  <span>{mockWeatherData.wind} mph</span>
                </div>
              </div>
              <HourlyGraph data={mockWeatherData.hourlyForecast} />
            </div>
          </div>
        );
    }
  };

  return <Tile>{renderContent()}</Tile>;
};

export default WeatherTile;