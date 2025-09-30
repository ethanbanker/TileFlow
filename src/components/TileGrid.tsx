import type { PropsWithChildren } from "react";

export default function TileGrid({ cols = 4, children }: PropsWithChildren<{ cols?: number }>) {
  return (
    <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
      {children}
    </div>
  );
