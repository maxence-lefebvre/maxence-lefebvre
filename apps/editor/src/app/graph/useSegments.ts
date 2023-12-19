import { Point, Segment } from '@feyroads/math/graph';
import { useEffect, useRef, useState } from 'react';

export const useSegments = (points: Point[]) => {
  const previousPoints = useRef<Point[]>(points);

  const [segments, setSegments] = useState(() => {
    const [p1, p2, p3, p4] = points;
    return [
      new Segment(p1, p2),
      new Segment(p1, p3),
      new Segment(p1, p4),
      new Segment(p2, p3),
    ];
  });

  useEffect(() => {
    const previousLength = previousPoints.current.length;
    previousPoints.current = points;

    if (previousLength <= points.length) {
      // do nothing, points grew or are the same.
      return;
    }

    setSegments((prev) => {
      // remove segments containing a removed point = keep segments with both points existing
      const nextSegments = prev.filter(
        (segment) => points.includes(segment.p1) && points.includes(segment.p2)
      );

      return nextSegments.length === prev.length ? prev : nextSegments;
    });
  }, [points]);

  return { segments };
};
