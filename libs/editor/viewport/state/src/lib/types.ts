import { Point } from '@feyroads/math/graph';
import Konva from 'konva';
import { RefObject } from 'react';
import { KonvaNodeEvents } from 'react-konva/ReactKonvaCore';

export type Viewport = {
  canvasRef: RefObject<Konva.Stage>;
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
  onDragMoveCanvas: NonNullable<KonvaNodeEvents['onDragMove']>;
  onDragEndCanvas: NonNullable<KonvaNodeEvents['onDragEnd']>;
};
