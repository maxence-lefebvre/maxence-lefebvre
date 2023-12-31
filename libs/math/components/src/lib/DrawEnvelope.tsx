import { memo } from 'react';
import { DrawPolygon } from './DrawPolygon';
import { Envelope } from '@feyroads/math/graph';

export type DrawEnvelopProps = {
  envelope: Envelope;
};

export const DrawEnvelope = memo(function DrawEnvelop({
  envelope,
}: DrawEnvelopProps) {
  return <DrawPolygon polygon={envelope.polygon} />;
});
