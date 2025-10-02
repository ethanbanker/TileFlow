import { WidgetProps } from './widget';

export interface BaseTileProps extends WidgetProps {
  config?: Record<string, any>;
}