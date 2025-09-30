import React from 'react';

export default function NewsTile() {
  return (
    <div className="flex flex-col justify-center h-full bg-zinc-800 text-white rounded-xl p-4 shadow-lg">
      <div className="text-xl font-bold mb-2">📰 News</div>
      <ul className="text-sm text-neutral-300 space-y-1">
        <li>• TileFlow launches customizable dashboard</li>
        <li>• Tailwind v4 brings CSS-first design</li>
        <li>• AI tools reshape web development</li>
      </ul>
    </div>
  );
}
