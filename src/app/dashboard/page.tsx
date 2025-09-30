'use client';

import React, { useState } from 'react';
import TileCanvas from '../../components/TileCanvas';
import { tileRegistry } from '../../components/tileRegistry';

const initialTiles = [
  { id: '1', type: 'ClockTile', position: { x: 0, y: 0 }, size: { w: 2, h: 2 } },
  { id: '2', type: 'WeatherTile', position: { x: 2, y: 0 }, size: { w: 2, h: 2 } },
  { id: '3', type: 'NewsTile', position: { x: 4, y: 0 }, size: { w: 2, h: 2 } },
  {
    id: '4',
    type: 'HttpTile',
    position: { x: 0, y: 2 },
    size: { w: 2, h: 2 },
    config: { title: 'My API', url: 'https://example.com' },
  },
  {
    id: '5',
    type: 'PingTile',
    position: { x: 2, y: 2 },
    size: { w: 2, h: 2 },
    config: { title: 'Ping Test', url: 'https://example.com' },
  },
  {
    id: '6',
    type: 'LinkTile',
    position: { x: 4, y: 2 },
    size: { w: 2, h: 2 },
    config: { title: 'My Link', url: 'https://example.com' },
  },
];

export default function DashboardPage() {
  const [tiles, setTiles] = useState(initialTiles);

  return (
    <main className="w-full h-screen overflow-auto">
      <TileCanvas tiles={tiles} tileRegistry={tileRegistry} />
    </main>
  );
}
