export const matchesColor = (
  input: [number, number, number],
  actual: string,
  tolerance: number
): boolean => {
  if (!actual) return false;
  const [r, g, b] = actual.split(",").map(v => parseInt(v.trim(), 10));
  const [ir, ig, ib] = input;

  if ([r, g, b].some(Number.isNaN)) return false;

  return (
    (Number.isNaN(ir) || Math.abs(ir - r) <= tolerance) &&
    (Number.isNaN(ig) || Math.abs(ig - g) <= tolerance) &&
    (Number.isNaN(ib) || Math.abs(ib - b) <= tolerance)
  );
};