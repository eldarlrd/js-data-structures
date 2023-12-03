/**
 * BST node to assign values and children to.
 * @param {string} value - Passed in value to assign the node with.
 * @param {number} left - Left children of root.
 * @param {number} right - Right children of root.
 */
export default class Node {
  constructor(value, left, right) {
    this.value = value || null;
    this.left = left;
    this.right = right;
  }
}
