import React from 'react';

export default function ClockTile() {
  return (
    <div className="flex items-center justify-center h-full bg-zinc-800 text-white rounded-xl p-4 shadow-lg">
      <div className="text-center">
        <div className="text-2xl font-bold">🕒 Clock</div>
        <div className="text-sm text-neutral-300">12:34 PM</div>
      </div>
    </div>
  );
}
