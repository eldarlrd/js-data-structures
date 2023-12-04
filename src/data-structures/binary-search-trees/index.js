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

  /**
   * Generates a balanced binary tree.
   * @param {number[]} sortedArr - Passed in array to start the tree.
   * @returns {number[]} Tree root.
   */
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

  /**
   * Adds a new element to the tree.
   * @param {number} value - Passed in value to add.
   * @returns {number[]} Tree root.
   */
  insert(value, rootNode = this.root) {
    if (rootNode === null) return new Node(value);
    if (rootNode.value === value) return;

    if (rootNode.value > value)
      rootNode.left = this.insert(value, rootNode.left);
    else rootNode.right = this.insert(value, rootNode.right);
    return rootNode;
  }

  /**
   * Retrieves the node with the value.
   * @param {number} value - Passed in value to find.
   * @returns {number[]} Node that holds the value.
   */
  find(value, rootNode = this.root) {
    if (rootNode === null || rootNode.value === value) return rootNode;

    if (rootNode.value > value) return this.find(value, rootNode.left);
    else return this.find(value, rootNode.right);
  }

  /**
   * Breadth-first level order.
   * @param {() => void} [callback] - An optional callback function.
   * @returns {number[]} Level ordered tree.
   */
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

  /**
   * Pre order.
   * @param {() => void} [callback] - An optional callback function.
   * @param {number[]} [preOrderArr] - An optional starting array.
   * @returns {number[]} Pre ordered tree.
   */
  preOrder(callback, rootNode = this.root, preOrderArr = []) {
    if (rootNode === null) return;

    callback ? callback(rootNode) : preOrderArr.push(rootNode.value);
    this.preOrder(callback, rootNode.left, preOrderArr);
    this.preOrder(callback, rootNode.right, preOrderArr);

    if (preOrderArr.length > 0) return preOrderArr;
  }

  /**
   * Post order.
   * @param {() => void} [callback] - An optional callback function.
   * @param {number[]} [postOrderArr] - An optional starting array.
   * @returns {number[]} Post ordered tree.
   */
  postOrder(callback, rootNode = this.root, postOrderArr = []) {
    if (rootNode === null) return;

    this.postOrder(callback, rootNode.left, postOrderArr);
    this.postOrder(callback, rootNode.right, postOrderArr);
    callback ? callback(rootNode) : postOrderArr.push(rootNode.value);

    if (postOrderArr.length > 0) return postOrderArr;
  }

  /**
   * Value order.
   * @param {() => void} [callback] - An optional callback function.
   * @param {number[]} [inOrderArr] - An optional starting array.
   * @returns {number[]} Value ordered tree.
   */
  inOrder(callback, rootNode = this.root, inOrderArr = []) {
    if (rootNode === null) return;

    this.inOrder(callback, rootNode.left, inOrderArr);
    callback ? callback(rootNode) : inOrderArr.push(rootNode.value);
    this.inOrder(callback, rootNode.right, inOrderArr);

    if (inOrderArr.length > 0) return inOrderArr;
  }

  /**
   * Height is defined as the number of edges in
   * the longest path from a given node to a leaf node.
   * @param {number[]} rootNode - Passed in node for the height.
   * @returns {number} Height of the element.
   */
  height(rootNode = this.root) {
    if (rootNode === null) return -1;

    const leftHeight = this.height(rootNode.left);
    const rightHeight = this.height(rootNode.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }

  /**
   * Depth is defined as the number of edges in
   * the path from a given node to the tree's root node.
   * @param {number} rootNodeValue - Passed in value for the depth.
   * @returns {number} Depth of the element.
   */
  depth(rootNodeValue, rootNode = this.root, edges = 0) {
    if (rootNode === null) return;
    if (rootNode.value === rootNodeValue) return edges;

    if (rootNode.value > rootNodeValue)
      return this.depth(rootNodeValue, rootNode.left, edges + 1);
    else return this.depth(rootNodeValue, rootNode.right, edges + 1);
  }

  /**
   * Checks if the tree is balanced.
   * A balanced tree is one where the difference between heights of
   * the left subtree and the right subtree of every node is not more than 1.
   * @param {number[]} [rootNode] - An optional parent node.
   * @returns {boolean} true if is balanced, otherwise false.
   */
  isBalanced(rootNode = this.root) {
    if (rootNode === null) return true;

    const heightDiff = Math.abs(
      this.height(rootNode.left) - this.height(rootNode.right)
    );

    return (
      heightDiff <= 1 &&
      this.isBalanced(rootNode.left) &&
      this.isBalanced(rootNode.right)
    );
  }

  /**
   * Rebalances the tree.
   */
  rebalance() {
    const inOrderArr = this.inOrder();
    this.root = this.buildTree(inOrderArr);
  }

  /**
   * Pretty Print for tree visualization by TOP.
   *
   * {@link https://theodinproject.com/lessons/javascript-binary-search-trees#assignment Provided in assignment.}
   */
  prettyPrint(rootNode = this.root, prefix = '', isLeft = true) {
    if (rootNode === null) return;
    if (rootNode.right !== null)
      this.prettyPrint(
        rootNode.right,
        `${prefix}${isLeft ? '│   ' : '    '}`,
        false
      );
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${rootNode.value}`);
    if (rootNode.left !== null)
      this.prettyPrint(
        rootNode.left,
        `${prefix}${isLeft ? '    ' : '│   '}`,
        true
      );
  }
}
