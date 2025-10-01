import React, { useState, useEffect } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

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
  const [windowWidth, setWindowWidth] = useState(1200);
  const [windowHeight, setWindowHeight] = useState(800);

  useEffect(() => {
    const updateSize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const topBarHeight = 128;
  const rowHeight = Math.max(Math.floor((windowHeight - topBarHeight - (4 * 9)) / 8), 60);

  const layout = tiles.map(tile => ({
    i: tile.id,
    x: tile.position.x,
    y: tile.position.y,
    w: tile.size.w,
    h: tile.size.h,
    static: false,
  }));

  return (
    <div className="flex flex-col w-full h-full">
      {/* Top bar section */}
      <div className="w-full h-32 bg-zinc-900 border-b border-zinc-700 flex items-center px-4">
        <span className="text-white text-sm">Top Bar Widget Area</span>
      </div>

      {/* Main grid */}
      <div className="flex-1 overflow-auto">
        <ResponsiveGridLayout
          className="layout"
          layouts={{ lg: layout }}
          breakpoints={{ lg: 1200, md: 996, sm: 768 }}
          cols={{ lg: 8, md: 8, sm: 8 }}
          rowHeight={rowHeight}
          margin={[4, 4]}
          width={windowWidth}
          isDraggable={true}
          isResizable={true}
          useCSSTransforms={true}
        >
          {tiles.map(tile => {
            const TileComponent = tileRegistry[tile.type];
            if (!TileComponent) {
              return (
                <div key={tile.id} className="bg-red-500 text-white p-2 rounded">
                  Unknown tile: {tile.type}
                </div>
              );
            }
            return (
              <div key={tile.id}>
                <TileComponent {...tile.config} />
              </div>
            );
          })}
        </ResponsiveGridLayout>
      </div>
    </div>
  );
}
