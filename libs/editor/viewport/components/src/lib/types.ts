import { Point } from '@feyroads/math/graph';
import { KonvaNodeEvents } from 'react-konva/ReactKonvaCore';

export type Viewport = {
  origin: Point;
  center: Point;
  setOrigin: (point: Point) => void;
  zoom: number;
  setZoom: (zoom: number) => void;
  scale: Point;
  saveViewportState: VoidFunction;
  mousePosition: Point | null;
  setMousePosition: (position: Point | null) => void;
  getMousePositionOnViewport: (evt: MouseEvent) => Point;

  isStageDraggable: boolean;
  onDragEndCanvas: NonNullable<KonvaNodeEvents['onDragEnd']>;
};
