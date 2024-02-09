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
