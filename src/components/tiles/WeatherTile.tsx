import React from 'react';

export default function WeatherTile() {
  return (
    <div className="flex items-center justify-center h-full bg-zinc-800 text-white rounded-xl p-4 shadow-lg">
      <div className="text-center">
        <div className="text-2xl font-bold">🌤️ Weather</div>
        <div className="text-sm text-neutral-300">Upland, CA — 72°F</div>
      </div>
    </div>
  );
}
