export const linearInterpolation = (a: number, b: number, t: number) =>
  a + t * (b - a);

export type PointLike = {
  x: number;
  y: number;
};

export const linearInterpolation2D = (
  a: PointLike,
  b: PointLike,
  t: number,
) => ({
  x: linearInterpolation(a.x, b.x, t),
  y: linearInterpolation(a.y, b.y, t),
});
