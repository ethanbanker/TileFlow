import type { DashboardConfig } from "@/lib/types";

const config: DashboardConfig = {
  title: "TileFlow",
  sections: [
    {
      title: "Core Services",
      cols: 4,
      tiles: [
        { type: "link", title: "Portal", url: "http://portal.ebself.loan" },
        { type: "link", title: "Home Assistant", url: "http://homeassistant.local:8123" },
      ],
    },
    {
      title: "Infrastructure",
      cols: 4,
      tiles: [
        { type: "ping", title: "NAS", target: "192.168.50.10", intervalSec: 30 },
        { type: "http", title: "Scrypted", url: "http://192.168.50.17/", method: "HEAD", timeoutMs: 2500, intervalSec: 30 },
      ],
    },
  ],
};

export default config;
