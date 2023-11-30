import Node from './node.js';

export default class LinkedList {
  constructor() {
    this.listHead = null;
  }

  /**
   * Adds a new node containing value to the end of the list.
   * @param {number} value - Passed in value to add.
   */
  append(value) {
    if (this.listHead !== null) this.prepend(value);
    else {
      let temp = this.listHead;
      while (temp.nextNode !== null) temp = temp.nextNode;
      temp.nextNode = new Node(value);
    }
  }

  /**
   * Adds a new node containing value to the start of the list.
   * @param {number} value - Passed in value to add.
   */
  prepend(value) {
    let temp = null;
    if (this.listHead !== null) temp = this.listHead;
    this.listHead = new Node(value);
    this.listHead.nextNode = temp;
  }

  /**
   * @returns {number} The total number of nodes in the list.
   */
  size() {
    let temp = this.listHead;
    let listSize = 0;
    while (temp !== null) {
      temp = temp.nextNode;
      listSize++;
    }
    return listSize;
  }

  /**
   * @returns {number} The first node in the list.
   */
  head() {
    return this.listHead;
  }

  /**
   * @returns {number} The last node in the list.
   */
  tail() {
    let tail = this.listHead;
    while (tail.nextNode !== null) tail = tail.nextNode;
    return tail;
  }

  /**
   * @param {number} index - Passed in index to check.
   * @returns The node at the given index.
   */
  at(index) {
    let currIndex = this.listHead;
    for (let i = 0; i < index; i++) {
      currIndex = currIndex.nextNode;
      if (currIndex === null) return;
    }
    return currIndex;
  }

  /**
   * Removes the last element from the list.
   */
  pop() {
    let prev = null;
    let curr = this.listHead;
    while (curr.nextNode !== null) {
      prev = curr;
      curr = curr.nextNode;
    }
    prev.nextNode = null;
  }

  /**
   * @param {number} value - Passed in value to check.
   * @returns {boolean} true if the value is in the list, false if not.
   */
  contains(value) {
    let temp = this.listHead;
    while (temp !== null) {
      if (temp.value === value) return true;
      temp = temp.nextNode;
    }
    return false;
  }

  find(value) {}

  toString() {}

  insertAt(value, index) {}

  removeAt(index) {}
}
