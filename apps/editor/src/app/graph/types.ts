import { Segment } from '@feyroads/math/graph';
import { KonvaNodeEvents } from 'react-konva/ReactKonvaCore';
import { UseBoolStateValue } from '@feyroads/ext/react/hooks';

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

export type DebugMode = UseBoolStateValue<'debugMode'>;
