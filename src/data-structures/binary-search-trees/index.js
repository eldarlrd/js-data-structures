import Node from './node.js';

/**
 * Binary Search Trees are a group of
 * data items represented as a tree full of nodes,
 * with each left node being "lower" than each right node.
 *
 * The tree starts with the "root node" and
 * any node with no children is called a “leaf node”.
 */
export default class BinarySearchTrees {
  constructor(arr) {
    const sortedArr = [...new Set(arr)].sort((a, b) => a - b);
    this.root = this.buildTree(sortedArr);
  }

  #next(nodeChild) {
    let rootNode = nodeChild;
    while (rootNode.left) rootNode = rootNode.left;
    return rootNode;
  }

  #remove(rootNode) {
    if (rootNode.left && rootNode.right) {
      const nextNode = this.#next(rootNode.right);
      rootNode.value = nextNode.value;
      rootNode.right = this.delete(nextNode.value, rootNode.right);
      return rootNode;
    } else {
      const swapNode = rootNode.right || rootNode.left;
      rootNode = null;
      return swapNode;
    }
  }

  buildTree(sortedArr) {
    if (sortedArr.length === 0) return null;

    const halfIndex = ~~(sortedArr.length / 2);
    const rootNode = new Node(
      sortedArr[halfIndex],
      this.buildTree(sortedArr.slice(0, halfIndex)),
      this.buildTree(sortedArr.slice(halfIndex + 1))
    );
    return rootNode;
  }

  insert(value, rootNode = this.root) {
    if (rootNode === null) return rootNode;
    if (rootNode.value === value) return;

    if (rootNode.value > value)
      rootNode.left = this.insert(value, rootNode.left);
    else rootNode.right = this.insert(value, rootNode.right);
    return rootNode;
  }

  delete(value, rootNode = this.root) {
    if (rootNode === null) return rootNode;
    if (rootNode.value === value) rootNode = this.#remove(rootNode);

    if (rootNode.value > value)
      rootNode.left = this.delete(value, rootNode.left);
    else rootNode.right = this.delete(value, rootNode.right);
  }
}
