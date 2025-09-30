"use client";

import type { Tile as TileModel } from "@/lib/types";
import LinkTile from "@/components/tiles/LinkTile";
import PingTile from "@/components/tiles/PingTile";
import HttpTile from "@/components/tiles/HttpTile";

export default function Tile({ tile }: { tile: TileModel }) {
  switch (tile.type) {
    case "link":
      return <LinkTile {...tile} />;
    case "ping":
      return <PingTile {...tile} />;
    case "http":
      return <HttpTile {...tile} />;
    default:
      return (
        <div className="p-4 rounded-lg bg-red-900/30 text-red-100">
          Unknown tile type
        </div>
      );
  }
}
