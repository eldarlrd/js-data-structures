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

  find(value, rootNode = this.root) {
    if (rootNode === null || rootNode.value === value) return rootNode;

    if (rootNode.value > value) return this.find(value, rootNode.left);
    else return this.find(value, rootNode.right);
  }

  levelOrder(callback) {
    const queue = [this.root];
    const levelOrderArr = [];
    while (queue.length > 0) {
      const rootNode = queue.shift();
      callback ? callback(rootNode) : levelOrderArr.push(rootNode.value);

      const queueArr = [rootNode?.left, rootNode?.right].filter(value => value);

      queue.push(...queueArr);
    }
    if (levelOrderArr.length > 0) return levelOrderArr;
  }

  inOrder(callback, rootNode = this.root, inOrderArr = []) {
    if (rootNode === null) return;

    this.inOrder(callback, rootNode.left, inOrderArr);
    callback ? callback(rootNode) : inOrderArr.push(rootNode.value);
    this.inOrder(callback, rootNode.right, inOrderArr);

    if (inOrderArr.length > 0) return inOrderArr;
  }

  preOrder(callback, rootNode = this.root, preOrderArr = []) {
    if (rootNode === null) return;

    callback ? callback(rootNode) : preOrderArr.push(rootNode.value);
    this.preOrder(callback, rootNode.left, preOrderArr);
    this.preOrder(callback, rootNode.right, preOrderArr);

    if (preOrderArr.length > 0) return preOrderArr;
  }

  postOrder(callback, rootNode = this.root, postOrderArr = []) {
    if (rootNode === null) return;

    this.postOrder(callback, rootNode.left, postOrderArr);
    this.postOrder(callback, rootNode.right, postOrderArr);
    callback ? callback(rootNode) : postOrderArr.push(rootNode.value);

    if (postOrderArr.length > 0) return postOrderArr;
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
}
