// Shared models for config-driven rendering
export type Tile = LinkTile | PingTile | HttpTile;

export interface LinkTile {
  type: "link";
  title: string;
  url: string;
  subtitle?: string;
  openInNewTab?: boolean;
}

export interface PingTile {
  type: "ping";
  title: string;
  target: string; // host or IP (ICMP)
  intervalSec?: number; // poll interval
}

export interface HttpTile {
  type: "http";
  title: string;
  url: string;        // http(s) URL to check
  method?: "HEAD" | "GET";
  timeoutMs?: number; // default 3000
  intervalSec?: number; // default 30
}

export interface Section {
  title: string;
  cols?: number; // columns in the grid for this section
  tiles: Tile[];
}

export interface DashboardConfig {
  title: string;
  sections: Section[];
}
