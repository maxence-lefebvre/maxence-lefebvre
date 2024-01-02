import { Envelope } from '@feyroads/math/graph';
import { memo } from 'react';

import { DrawPolygon, DrawPolygonProps } from './DrawPolygon';

export type DrawEnvelopProps = Omit<DrawPolygonProps, 'polygon'> & {
  envelope: Envelope;
};

export const DrawEnvelope = memo(function DrawEnvelop({
  envelope,
  ...props
}: DrawEnvelopProps) {
  return <DrawPolygon polygon={envelope.polygon} {...props} />;
});
