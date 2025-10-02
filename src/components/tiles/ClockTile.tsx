import React from 'react';
import { BaseTileProps } from '../../types/tile';
import Tile from '@/components/ui/Tile';

const ClockTile: React.FC<BaseTileProps> = ({ size }) => {
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const renderContent = () => {
    switch (size) {
      case 'small':
        return (
          <div className="text-2xl font-medium">
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        );
      case 'medium':
        return (
          <div className="flex flex-col items-center gap-1">
            <div className="text-3xl font-medium">
              {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="text-sm text-zinc-400">
              {time.toLocaleDateString([], { weekday: 'long' })}
            </div>
          </div>
        );
      case 'large':
        return (
          <div className="flex flex-col items-center gap-4 p-4">
            <div className="text-5xl font-medium">
              {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </div>
            <div className="text-xl text-zinc-400">
              {time.toLocaleDateString([], { 
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            <div className="text-sm text-zinc-500">
              {Intl.DateTimeFormat().resolvedOptions().timeZone}
            </div>
          </div>
        );
    }
  };

  return <Tile>{renderContent()}</Tile>;
};

export default ClockTile;