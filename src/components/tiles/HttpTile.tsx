"use client";

import React, { useState, useEffect } from 'react';
import { BaseTileProps } from '../../types/tile';
import Tile from '@/components/ui/Tile';

interface HttpConfig {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  interval?: number;
}

const HttpTile: React.FC<BaseTileProps & { config: HttpConfig }> = ({ size, config = {} }) => {
  const [status, setStatus] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  useEffect(() => {
    if (!config?.url || !config?.method) {
      return;
    }

    const checkStatus = async () => {
      setLoading(true);
      try {
        const response = await fetch(config.url, { method: config.method });
        setStatus(response.status);
      } catch {
        setStatus(null);
      }
      setLoading(false);
      setLastChecked(new Date());
    };

    checkStatus();
    const intervalTime = config?.interval || 60000;
    const interval = setInterval(checkStatus, intervalTime);
    
    return () => clearInterval(interval);
  }, [config]);

  const renderContent = () => {
    switch (size) {
      case 'small':
        return (
          <div className={`text-2xl ${status === 200 ? 'text-green-500' : 'text-red-500'}`}>
            {status || '❌'}
          </div>
        );
      
      case 'medium':
        return (
          <div className="flex flex-col items-center gap-2">
            <div className={`text-3xl ${status === 200 ? 'text-green-500' : 'text-red-500'}`}>
              {status || '❌'}
            </div>
            <div className="text-sm text-zinc-400">{config?.method || 'N/A'}</div>
          </div>
        );
      
      case 'large':
        return (
          <div className="flex flex-col gap-4 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xl font-medium">HTTP Status</span>
              <span className={`text-3xl ${status === 200 ? 'text-green-500' : 'text-red-500'}`}>
                {status || '❌'}
              </span>
            </div>
            <div className="flex flex-col gap-2 text-sm text-zinc-400">
              <div className="flex justify-between">
                <span>Method</span>
                <span>{config?.method || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span>URL</span>
                <span className="truncate ml-2">{config?.url || 'N/A'}</span>
              </div>
              {lastChecked && (
                <div className="flex justify-between">
                  <span>Last Checked</span>
                  <span>{lastChecked.toLocaleTimeString()}</span>
                </div>
              )}
            </div>
            {loading && (
              <div className="text-sm text-zinc-500 animate-pulse">
                Checking...
              </div>
            )}
          </div>
        );
    }
  };

  return <Tile>{renderContent()}</Tile>;
};

export default HttpTile;