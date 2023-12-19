import { useState } from 'react';
import { Point } from '@feyroads/math/graph';

const initialPoints = [
  new Point(200, 200),
  new Point(500, 200),
  new Point(400, 400),
  new Point(100, 300),
];

export const usePoints = () => {
  const [points] = useState(initialPoints);

  return { points };
};
