export const randomIndex = <T>(array: T[]): number =>
  Math.floor(Math.random() * array.length);

export const randomElement = <T>(array: T[]): T => {
  return array[randomIndex(array)];
};
