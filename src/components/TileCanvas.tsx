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
  return (
    <div className="grid grid-cols-8 grid-rows-8 grid-flow-none gap-0 w-full h-full p-0">
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
            className={`col-span-${tile.size.w} row-span-${tile.size.h} `}
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
  );
}
