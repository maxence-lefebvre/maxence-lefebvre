import { Graph, Point } from '@feyroads/math/graph';
import { KonvaNodeEvents } from 'react-konva/ReactKonvaCore';

export type Viewport = {
  origin: Point;
  setOrigin: (point: Point) => void;
  zoom: number;
  setZoom: (zoom: number) => void;
  scale: Point;
  mousePosition: Point | null;
  setMousePosition: (position: Point | null) => void;
  getMousePositionOnViewport: (evt: MouseEvent) => Point;

  isStageDraggable: boolean;
  onDragEndCanvas: NonNullable<KonvaNodeEvents['onDragEnd']>;
};

export type GraphState = {
  graph: Graph;
  saveGraph: VoidFunction;
  disposeGraph: VoidFunction;
  selectedPoint: Point | null;
  hoveredPoint: Point | null;
  addOrSelectPoint: (point: Point) => void;
  hoverNearestPointIfClose: (point: Point) => void;
  unselectIfExistElseRemoveHoveredPoint: () => void;
  startDraggingPoint: () => void;
  moveDraggingPoint: (newPosition: Point) => void;
  dropDraggingPoint: (newPosition: Point) => void;
};
