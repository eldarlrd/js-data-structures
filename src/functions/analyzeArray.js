export const analyzeArray = arr => ({
  average: arr.reduce((acc, num) => acc + num, 0) / arr.length,
  min: Math.min(...arr),
  max: Math.max(...arr),
  length: arr.length
});
