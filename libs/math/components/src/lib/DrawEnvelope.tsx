import { memo } from 'react';
import { DrawPolygon, DrawPolygonProps } from './DrawPolygon';
import { Envelope } from '@feyroads/math/graph';

export type DrawEnvelopProps = Omit<DrawPolygonProps, 'polygon'> & {
  envelope: Envelope;
};

export const DrawEnvelope = memo(function DrawEnvelop({
  envelope,
  ...props
}: DrawEnvelopProps) {
  return <DrawPolygon polygon={envelope.polygon} {...props} />;
});
