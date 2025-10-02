export type WidgetSize = 'small' | 'medium' | 'large';

export interface WidgetProps {
  size: WidgetSize;
  config?: Record<string, any>;
}