import { useCallback, useState } from 'react';
import { Point } from '@feyroads/math/graph';
import { randomElement } from '@feyroads/ext/array';
import { without } from 'lodash';

const initialPoints = [
  new Point(200, 200),
  new Point(500, 200),
  new Point(400, 400),
  new Point(100, 300),
];

export const usePoints = () => {
  const [points, setPoints] = useState(initialPoints);

  const addRandomPoint = useCallback(() => {
    const randomPoint = new Point(Math.random() * 600, Math.random() * 600);

    if (points.some((point) => point.equals(randomPoint))) {
      return;
    }

    setPoints((prev) => [...prev, randomPoint]);
  }, [points]);

  const removeRandomPoint = useCallback(() => {
    if (points.length === 0) {
      return;
    }

    setPoints((prev) => without(prev, randomElement(prev)));
  }, [points]);

  const removeAllPoints = useCallback(() => setPoints([]), []);

  return {
    points,
    addRandomPoint,
    removeRandomPoint,
    removeAllPoints,
  };
};
