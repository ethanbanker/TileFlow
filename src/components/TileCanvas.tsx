import React from 'react';

type TileMeta = {
  id: string;
  type: string;
  position: { x: number; y: number };
  size: { w: number; h: number };
};

type TileCanvasProps = {
  tiles: TileMeta[];
  tileRegistry: Record<string, React.ComponentType<any>>;
};

export default function TileCanvas({ tiles, tileRegistry }: TileCanvasProps) {
  return (
    <div className="grid grid-cols-8 grid-rows-8 gap-2 w-full h-full p-4">
      {tiles.map(tile => {
        const TileComponent = tileRegistry[tile.type];
        return (
          <div
            key={tile.id}
            className={`col-span-${tile.size.w} row-span-${tile.size.h}`}
            style={{
              gridColumnStart: tile.position.x + 1,
              gridRowStart: tile.position.y + 1,
            }}
          >
            <TileComponent />
          </div>
        );
      })}
    </div>
  );
}
