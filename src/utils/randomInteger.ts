export const randomInteger = (min: number, max: number) => {
  const rand = min + Math.random() * (max - min + 1);
  return Math.round(rand);
};
