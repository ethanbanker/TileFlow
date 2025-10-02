import React from 'react';
import { BaseTileProps } from '../../types/tile';
import Tile from '@/components/ui/Tile';

interface LinkConfig {
  url: string;
  title: string;
  description?: string;
}

const LinkTile: React.FC<BaseTileProps & { config: LinkConfig }> = ({ size, config = {} }) => {
  const renderContent = () => {
    switch (size) {
      case 'small':
        return (
          <a href={config?.url || '#'} target="_blank" rel="noopener noreferrer" 
             className="flex items-center justify-center">
            <span className="text-xl">🔗</span>
          </a>
        );
      
      case 'medium':
        return (
          <a href={config?.url || '#'} target="_blank" rel="noopener noreferrer" 
             className="flex flex-col items-center gap-2">
            <span className="text-2xl">🔗</span>
            <span className="text-sm font-medium truncate">{config?.title || 'No Title'}</span>
          </a>
        );
      
      case 'large':
        return (
          <a href={config?.url || '#'} target="_blank" rel="noopener noreferrer" 
             className="flex flex-col gap-4 p-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🔗</span>
              <span className="text-xl font-medium">{config?.title || 'No Title'}</span>
            </div>
            {config?.description && (
              <p className="text-sm text-zinc-400">{config.description}</p>
            )}
            <div className="text-xs text-zinc-500 truncate">{config?.url || 'No URL'}</div>
          </a>
        );
    }
  };

  return <Tile>{renderContent()}</Tile>;
};

export default LinkTile;