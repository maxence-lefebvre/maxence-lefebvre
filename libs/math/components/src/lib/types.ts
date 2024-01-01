import { Graph, Point } from '@feyroads/math/graph';

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
