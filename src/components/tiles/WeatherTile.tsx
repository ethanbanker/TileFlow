import Tile from '@/components/ui/Tile';

export default function WeatherTile() {
  return (
    <Tile
      title="Weather"
      subtitle="Forecast"
      status="ok"
      statusText="72°F • Sunny"
      footer={<div className="text-neutral-300">Upland, CA</div>}
    >
      {/* Additional weather details can go here */}
    </Tile>
  );
}
