import Tile from '@/components/ui/Tile';

export default function NewsTile() {
  return (
    <Tile
      title="News"
      subtitle="Headlines"
      status="ok"
      statusText="3 stories"
      footer={
        <ul className="text-neutral-300 text-sm space-y-1">
          <li>• TileFlow launches customizable dashboard</li>
          <li>• Tailwind v4 brings CSS-first design</li>
          <li>• AI tools reshape web development</li>
        </ul>
      }
    >
      {/* Additional news details can go here */}
    </Tile>
  );
}
