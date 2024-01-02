import { Segment } from '@feyroads/math/graph';
import { KonvaNodeEvents } from 'react-konva/ReactKonvaCore';

export type GraphEditor = {
  creatingSegment: Segment | null;
  onClickCanvas: NonNullable<KonvaNodeEvents['onClick']>;
  onContextMenuCanvas: NonNullable<KonvaNodeEvents['onContextMenu']>;
  onMouseMoveCanvas: NonNullable<KonvaNodeEvents['onMouseMove']>;
  onWheelCanvas: NonNullable<KonvaNodeEvents['onWheel']>;
  onDragStartPoint: NonNullable<KonvaNodeEvents['onDragStart']>;
  onDragMovePoint: NonNullable<KonvaNodeEvents['onDragMove']>;
  onDragEndPoint: NonNullable<KonvaNodeEvents['onDragEnd']>;
};
