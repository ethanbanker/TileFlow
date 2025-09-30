import Tile from '@/components/ui/Tile';

export default function ClockTile() {
  return (
    <Tile
      title="Clock"
      subtitle="Time"
      status="ok"
      statusText="12:34 PM"
      footer={<div className="text-neutral-300">Upland, CA</div>}
    >
      {/* Additional clock details can go here */}
    </Tile>
  );
}
