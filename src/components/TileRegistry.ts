import ClockTile from './tiles/ClockTile';
import WeatherTile from './tiles/WeatherTile';
import NewsTile from './tiles/NewsTile';
import HttpTile from './tiles/HttpTile';
import LinkTile from './tiles/LinkTile';
import PingTile from './tiles/PingTile';

export const tileRegistry = {
  clock: ClockTile,
  weather: WeatherTile,
  news: NewsTile,
  ping: PingTile,
  link: LinkTile,
  http: HttpTile,
};
