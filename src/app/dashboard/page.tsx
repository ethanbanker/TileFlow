'use client';

import React, { useState } from 'react';
import TileCanvas from '../../components/TileCanvas';
import { tileRegistry } from '../../components/TileRegistry';

const initialTiles = [
  {
    id: '1',
    type: 'clock',
    position: { x: 0, y: 0 },
    size: { w: 2, h: 2 },
  },
  {
    id: '2',
    type: 'weather',
    position: { x: 2, y: 0 },
    size: { w: 3, h: 2 },
  },
  {
    id: '3',
    type: 'news',
    position: { x: 0, y: 2 },
    size: { w: 5, h: 3 },
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
