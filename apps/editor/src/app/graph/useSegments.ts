import { Point, Segment } from '@feyroads/math/graph';
import { useCallback, useEffect, useRef, useState } from 'react';
import { without } from 'lodash';
import { randomElement } from '@feyroads/ext/array';

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

  const addRandomSegment = useCallback(() => {
    const p1 = randomElement(points);
    const p2 = randomElement(points);

    if (p1.equals(p2)) {
      return;
    }

    const randomSegment = new Segment(p1, p2);

    if (segments.some((segment) => segment.equals(randomSegment))) {
      return;
    }

    setSegments((prev) => [...prev, randomSegment]);
  }, [points, segments]);

  const removeRandomSegment = useCallback(() => {
    if (segments.length === 0) {
      return;
    }

    setSegments((prev) => without(prev, randomElement(prev)));
  }, []);

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

  return { segments, addRandomSegment, removeRandomSegment };
};
