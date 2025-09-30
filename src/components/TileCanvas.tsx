import React from 'react';

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
  const tileCount = tiles.length;

  let cols = 6;
  if (tileCount <= 6) cols = 3;
  else if (tileCount <= 12) cols = 4;
  else if (tileCount <= 20) cols = 5;

  const rows = Math.ceil(tileCount / cols);

  return (
    <div className="flex flex-col w-full h-full">
      {/* Top bar section */}
      <div className="w-full h-16 bg-zinc-900 border-b border-zinc-700 flex items-center px-4">
        <span className="text-white text-sm">Top Bar Widget Area</span>
      </div>

      {/* Main grid */}
      <div className="flex-1 flex items-center justify-center">
        <div
          className={`grid grid-cols-${cols} grid-rows-${rows} grid-flow-dense gap-2 p-4`}
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
              <div
                key={tile.id}
                className={`col-span-${tile.size.w} row-span-${tile.size.h}`}
                style={{
                  gridColumnStart: tile.position.x + 1,
                  gridRowStart: tile.position.y + 1,
                }}
              >
                <TileComponent {...tile.config} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
