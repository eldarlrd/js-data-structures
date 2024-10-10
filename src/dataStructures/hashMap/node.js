/**
 * Hash Map node to assign keys and values to.
 * @param {string} key - Passed in key.
 * @param {string} value - Passed in value.
 */
export default class Node {
  constructor(key, value = null) {
    this.key = key;
    this.value = value;
  }
}

/**
 * Hash Set node that only holds keys.
 * @param {string} key - Passed in key.
 */
export class SetNode {
  constructor(key) {
    this.key = key;
  }
}
