import Node from './node.js';

export default class HashMap {
  constructor(initCapacity = 16, loadFactor = 0.75) {
    this.buckets = new Array(initCapacity).fill(null).map(() => []);
    this.loadFactor = loadFactor;
    this.size = 0;
  }

  /**
   * Produces a hash code.
   * @param {string} key - Passed in key for the code.
   * @returns {number} Hash code.
   */
  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++)
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    return hashCode % this.buckets.length;
  }

  /**
   * Sets the key-value pair to the map.
   * @param {string} key - Passed in key.
   * @param {*} value - Value assigned to this key.
   */
  set(key, value) {
    const index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) return;

    const bucket = this.buckets[index];
    const currNode = bucket.find(node => node.key === key);

    if (currNode) currNode.value = value;
    else {
      bucket.push(new Node(key, value));
      this.size += 1;

      if (this.size / this.buckets.length < this.loadFactor) this.#resize();
    }
  }

  get(key) {
    const index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) return;

    const bucket = this.buckets[index];
    const currNode = bucket.find(node => node.key === key);

    return currNode ? currNode.value : undefined;
  }

  #resize() {
    const newCapacity = this.buckets.length * 2;
    const newBuckets = new Array(newCapacity).fill(null).map(() => []);

    this.buckets.forEach(bucket => {
      for (const node of bucket) {
        const newIndex = this.hash(node.key);
        newBuckets[newIndex].push(node);
      }
    });

    this.buckets = newBuckets;
  }
}
