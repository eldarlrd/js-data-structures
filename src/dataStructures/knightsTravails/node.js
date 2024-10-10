/**
 * A node representing the knight.
 * @param {number[]} position - Passed in position on the board.
 * @param {number[][]} path - Passed in destination.
 * @returns {{ position: number[], path: number[][] }} A piece with attached paths.
 */
export default function Node(position, path) {
  if (
    position[0] < 0 ||
    position[0] > 7 ||
    position[1] < 0 ||
    position[1] > 7
  ) {
    return null;
  }
  return { position, path };
}
