import Node from './node.js';

/**
 * A linked list is a linear collection of data elements called
 * nodes that "point" to the next node by means of a pointer.
 *
 * Each node holds a single element of data and
 * a link or pointer to the next node in the list.
 *
 * A head node is the first node in the list,
 * a tail node is the last node in the list.
 */
export default class LinkedList {
  constructor() {
    this.listHead = null;
  }

  // Add commands

  /**
   * Adds a new node containing value to the end of the list.
   * @param {string} value - Passed in value to add.
   * @returns {string} String on success.
   */
  append(value) {
    if (this.listHead === null) return this.prepend(value);
    else {
      let temp = this.listHead;

      while (temp.nextNode !== null) temp = temp.nextNode;
      temp.nextNode = new Node(value);

      return 'Node added to the end';
    }
  }

  /**
   * Adds a new node containing value to the start of the list.
   * @param {string} value - Passed in value to add.
   * @returns {string} String on success.
   */
  prepend(value) {
    let temp = null;

    if (this.listHead !== null) temp = this.listHead;
    this.listHead = new Node(value);
    this.listHead.nextNode = temp;

    return 'Node added to the start';
  }

  /**
   * Inserts a new node with the provided value at the passed index.
   * @param {string} value - Passed in value to be assigned.
   * @param {number} index - Node index to add and be assigned to.
   * @returns {string} String on success.
   */
  insert(value, index) {
    index = ~~+index;
    if (this.listHead === null) return this.prepend(value);
    else {
      let prev = null;
      let curr = this.listHead;

      for (let i = 0; i < index; i++) {
        prev = curr;
        if (curr === null) break;
        curr = curr.nextNode;
      }

      const temp = new Node(value);

      if (prev === null) {
        if (index <= 0) return this.prepend(value);
        else return this.append(value);
      }

      prev.nextNode = temp;
      temp.nextNode = curr;

      return `Node added at the index ${index}`;
    }
  }

  // Delete commands

  /**
   * Removes the node at the passed index.
   * @param {number} index - Passed in index to remove.
   * @returns {string} String on removal at the passed index.
   */
  remove(index) {
    index = ~~+index;
    if (this.listHead === null) return 'List is empty';
    let curr = this.listHead;
    let prev = null;

    for (let i = 0; i < index; i++) {
      prev = curr;
      if (curr === null) break;
      curr = curr.nextNode;
    }

    if (prev === null || curr === null) return this.pop();
    prev.nextNode = curr.nextNode;

    return 'Node removed';
  }

  /**
   * Removes the last element from the list.
   * @returns {string} String on removal of last element.
   */
  pop() {
    if (this.listHead === null) return 'List is empty';
    let prev = null;
    let curr = this.listHead;

    while (curr.nextNode !== null) {
      prev = curr;
      curr = curr.nextNode;
    }

    if (prev === null) return this.clear();
    prev.nextNode = null;

    return 'Last node removed';
  }

  /**
   * Clears all elements from the list.
   * @returns {string} String on successful clear.
   */
  clear() {
    this.listHead = null;

    return 'List has been cleared';
  }

  // View commands

  /**
   * @param {string} value - Passed in value to check.
   * @returns {boolean} true if the value is in the list, false if not.
   */
  has(value) {
    let temp = this.listHead;

    while (temp !== null) {
      if (temp.value === value) return true;
      temp = temp.nextNode;
    }

    return false;
  }

  /**
   * @param {string} value - Passed in value to find.
   * @returns {(number | string)} Index of the node containing value,
   * or string if not found.
   */
  find(value) {
    let temp = this.listHead;
    let index = 0;

    while (temp !== null) {
      if (temp.value === value) return index;
      temp = temp.nextNode;
      index++;
    }

    return 'not found';
  }

  /**
   * @param {number} index - Passed in index to check.
   * @returns {string} Value at the passed index.
   */
  at(index) {
    index = ~~+index;
    let currIndex = this.listHead;

    for (let i = 0; i < index; i++) {
      currIndex = currIndex?.nextNode;
      if (currIndex === null || currIndex === undefined) return 'not found';
    }

    if (currIndex === null) return 'not found';

    return currIndex.value;
  }

  /**
   * @returns {string} First value in the list.
   */
  head() {
    if (this.listHead === null) return 'empty';

    return this.listHead.value;
  }

  /**
   * @returns {string} Last value in the list.
   */
  tail() {
    if (this.listHead === null) return 'empty';
    let tail = this.listHead;

    while (tail.nextNode !== null) tail = tail.nextNode;

    return tail.value;
  }

  /**
   * @returns {number} Total number of nodes in the list.
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
   * @returns {string} Linked list objects as strings.
   */
  show() {
    let temp = this.listHead;
    let stringList = '';

    while (temp !== null) {
      stringList += `( ${temp.value} ) -> `;
      temp = temp.nextNode;
    }

    return (stringList += 'null');
  }
}
