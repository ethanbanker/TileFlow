import React, { useState, useEffect } from 'react';
import { BaseTileProps } from '../../types/tile';
import Tile from '@/components/ui/Tile';

interface PingConfig {
  host: string;
  interval?: number;
}

const PingTile: React.FC<BaseTileProps & { config: PingConfig }> = ({ size, config = {} }) => {
  const [latency, setLatency] = useState<number | null>(null);
  const [status, setStatus] = useState<'good' | 'medium' | 'poor' | 'offline'>('offline');
  const [history, setHistory] = useState<number[]>([]);

  useEffect(() => {
    if (!config?.host) {
      return;
    }

    const ping = () => {
      const mockLatency = Math.random() * 100;
      setLatency(Math.round(mockLatency));
      setHistory(prev => [...prev.slice(-19), mockLatency]);
      
      if (mockLatency < 50) setStatus('good');
      else if (mockLatency < 100) setStatus('medium');
      else setStatus('poor');
    };

    ping();
    const intervalTime = config?.interval || 5000;
    const interval = setInterval(ping, intervalTime);
    
    return () => clearInterval(interval);
  }, [config]);

  const getStatusColor = () => {
    switch (status) {
      case 'good': return 'text-green-500';
      case 'medium': return 'text-yellow-500';
      case 'poor': return 'text-red-500';
      default: return 'text-zinc-500';
    }
  };

  const renderContent = () => {
    switch (size) {
      case 'small':
        return (
          <div className={`text-2xl font-medium ${getStatusColor()}`}>
            {latency ? `${latency}ms` : '---'}
          </div>
        );
      
      case 'medium':
        return (
          <div className="flex flex-col items-center gap-2">
            <div className={`text-3xl font-medium ${getStatusColor()}`}>
              {latency ? `${latency}ms` : '---'}
            </div>
            <div className="text-sm text-zinc-400">{config?.host || 'No Host'}</div>
          </div>
        );
      
      case 'large':
        return (
          <div className="flex flex-col gap-4 p-4">
            <div className="flex justify-between items-center">
              <div className="text-xl font-medium">Ping Status</div>
              <div className={`text-2xl font-medium ${getStatusColor()}`}>
                {latency ? `${latency}ms` : '---'}
              </div>
            </div>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between text-zinc-400">
                <span>Host</span>
                <span>{config?.host || 'No Host'}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Status</span>
                <span className={getStatusColor()}>{status}</span>
              </div>
            </div>
            {history.length > 0 && (
              <div className="h-20 flex items-end gap-1">
                {history.map((value, i) => (
                  <div
                    key={i}
                    className={`w-2 ${getStatusColor()} opacity-75`}
                    style={{ height: `${(value / Math.max(...history)) * 100}%` }}
                  />
                ))}
              </div>
            )}
          </div>
        );
    }
  };

  return <Tile>{renderContent()}</Tile>;
};

export default PingTile;