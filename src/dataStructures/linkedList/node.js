/**
 * Linked list node to assign values to.
 * @param {string} value - Passed in value to assign the node with.
 */
export default class Node {
  constructor(value) {
    this.value = value || null;
    this.nextNode = null;
  }
}
