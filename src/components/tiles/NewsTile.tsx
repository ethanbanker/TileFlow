import React, { useState, useEffect } from 'react';
import { BaseTileProps } from '../../types/tile';
import Tile from '@/components/ui/Tile';

interface NewsItem {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
}

interface NewsConfig {
  source: string;
  category?: string;
}

const NewsTile: React.FC<BaseTileProps & { config: NewsConfig }> = ({ size, config }) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!config?.source) {
      return;
    }

    const fetchNews = async () => {
      setLoading(true);
      // Mock news data - replace with actual API call
      setNews([
        {
          title: "Breaking News",
          description: "This is a sample news item with some interesting content.",
          url: "https://example.com",
          publishedAt: new Date().toISOString()
        }
      ]);
      setLoading(false);
    };

    fetchNews();
  }, [config]);
  
  const renderContent = () => {
    if (loading) {
      return <div className="animate-pulse">Loading news...</div>;
    }

    switch (size) {
      case 'small':
        return news[0] && (
          <div className="text-sm font-medium truncate">
            {news[0].title}
          </div>
        );
      
      case 'medium':
        return news[0] && (
          <div className="flex flex-col gap-2 p-2">
            <div className="text-base font-medium">{news[0].title}</div>
            <div className="text-xs text-zinc-400 truncate">
              {news[0].description}
            </div>
          </div>
        );
      
      case 'large':
        return (
          <div className="flex flex-col gap-4 p-4">
            <div className="text-xl font-medium">Latest News</div>
            <div className="space-y-4">
              {news.slice(0, 3).map((item, index) => (
                <a 
                  key={index} 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block hover:bg-zinc-800/50 rounded-lg p-2"
                >
                  <div className="font-medium">{item.title}</div>
                  <div className="text-sm text-zinc-400 mt-1">{item.description}</div>
                  <div className="text-xs text-zinc-500 mt-2">
                    {new Date(item.publishedAt).toLocaleTimeString()}
                  </div>
                </a>
              ))}
            </div>
          </div>
        );
    }
  };

  return <Tile>{renderContent()}</Tile>;
};

export default NewsTile;