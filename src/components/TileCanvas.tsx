"use client";

import React, { useState, useEffect } from 'react';
import { Responsive, WidthProvider, Layout } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import '../app/grid.css';  // Updated to correct relative path
import { WidgetSize } from '../types/widget';

const ResponsiveGridLayout = WidthProvider(Responsive);

// Add these constants
const GRID_ROW_HEIGHT = 100;
const DEFAULT_WINDOW_WIDTH = 1200;
const MIN_TILE_SIZE = 2;

type TileMeta = {
  id: string;
  type: string;
  position: { x: number; y: number };
  size: { w: number; h: number };
  config?: Record<string, any>;
};

type TileCanvasProps = {
  tiles: TileMeta[];
  tileRegistry: Record<string, React.ComponentType<any>>;
};

export default function TileCanvas({ tiles, tileRegistry }: TileCanvasProps) {
  const [currentLayout, setCurrentLayout] = useState<Layout[]>([]);
  const [windowWidth, setWindowWidth] = useState(DEFAULT_WINDOW_WIDTH);
  
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
const calculateSize = (w: number, h: number): WidgetSize => {
  const area = w * h;
  if (area <= 1) return 'small';
  return 'large';  // Everything larger than 1x1 gets full features
};

const layout = tiles.map(tile => ({
  i: tile.id,
  x: tile.position.x,
  y: tile.position.y,
  w: Math.max(tile.size.w, MIN_TILE_SIZE),
  h: Math.max(tile.size.h, MIN_TILE_SIZE),
  static: false,
  minW: MIN_TILE_SIZE,
  minH: MIN_TILE_SIZE,
  isBounded: true  // Add this to enforce boundaries
}));

// Update the ResponsiveGridLayout props
return (
  <div className="flex flex-col w-full h-full">
    <div className="flex-1 overflow-auto">
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layout }}
        breakpoints={{ lg: 1200, md: 996, sm: 768 }}
        cols={{ lg: 8, md: 8, sm: 8 }}
        rowHeight={GRID_ROW_HEIGHT}
        minH={MIN_TILE_SIZE}
        minW={MIN_TILE_SIZE}
        isBounded={true}
        preventCollision={true}
        onResizeStart={(layout, oldItem, newItem) => {
          if (newItem.h < MIN_TILE_SIZE || newItem.w < MIN_TILE_SIZE) {
            return false;
          }
        }}
        onResize={(layout, oldItem, newItem) => {
          newItem.h = Math.max(newItem.h, MIN_TILE_SIZE);
          newItem.w = Math.max(newItem.w, MIN_TILE_SIZE);
        }}
        draggableCancel=".non-draggable"
        resizeStop={(layout, oldItem, newItem) => {
          if (newItem.h < MIN_TILE_SIZE) {
            newItem.h = MIN_TILE_SIZE;
          }
        }}
      >
        {tiles.map(tile => {
          const TileComponent = tileRegistry[tile.type];
          const layoutItem = currentLayout.find(l => l.i === tile.id) || layout.find(l => l.i === tile.id);
          const size = layoutItem ? calculateSize(layoutItem.w, layoutItem.h) : 'small';

          return (
            <div key={tile.id}>
              <TileComponent {...tile.config} size={size} />
            </div>
          );
        })}
      </ResponsiveGridLayout>
    </div>
  </div>
);