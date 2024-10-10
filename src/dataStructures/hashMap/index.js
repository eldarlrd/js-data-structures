import Node, { SetNode } from './node.js';

/**
 * Hash Maps are data structures that
 * allow storing and retrieving key-value pairs.
 *
 * A hash function is used to map keys to an array,
 * where their values are stored. The function serves to
 * generate a hash code which determines the value index.
 */
export default class HashMap {
  constructor(initCapacity = 16, loadFactor = 0.75) {
    this.buckets = new Array(initCapacity).fill(null).map(() => []);
    this.loadFactor = loadFactor;
    this.size = 0;
  }

  // Add command

  /**
   * Sets the key-value pair to the map.
   * @param {string} key - Passed in key.
   * @param {string} value - Value assigned to this key.
   * @returns {string} String on set attempt.
   */
  set(key, value) {
    const bucket = this.#findBucket(key);
    if (bucket) {
      const currNode = bucket.find(node => node.key === key);
      if (currNode) currNode.value = value;
      else {
        bucket.push(new Node(key, value));
        this.size += 1;

        if (this.size / this.buckets.length > this.loadFactor) this.#resize();
        return 'Pair added to the map';
      }
    }
    return 'Incorrect key-value pair';
  }

  // Delete commands

  /**
   * Removes the key-value pair from the map.
   * @param {string} key - Key of the pair to remove.
   * @returns {boolean} Status of removal.
   */
  remove(key) {
    const bucket = this.#findBucket(key);
    if (bucket) {
      const index = bucket.findIndex(node => node.key === key);
      if (index !== -1) {
        bucket.splice(index, 1);
        this.size -= 1;
        return true;
      }
      return false;
    }
    return false;
  }

  /**
   * Clears all entries from the map.
   * @returns {string} String on successful clear.
   */
  clear() {
    this.buckets = new Array(this.buckets.length).fill(null).map(() => []);
    this.size = 0;
    return 'Map has been cleared';
  }

  // View commands

  /**
   * @param {string} key - Passed in key to check.
   * @returns {boolean} true if the key is in the map, false if not.
   */
  has(key) {
    const bucket = this.#findBucket(key);
    return bucket ? bucket.some(node => node.key === key) : false;
  }

  /**
   * @param {string} key - Passed in key to get.
   * @returns {string} Value associated with the key.
   */
  get(key) {
    const bucket = this.#findBucket(key);
    if (bucket) {
      const currNode = bucket.find(node => node.key === key);
      return currNode ? currNode.value : 'not found';
    }
    return 'not found';
  }

  /**
   * @returns {number} Length of the map.
   */
  length() {
    return this.size;
  }

  /**
   * @returns {string[]} An array of map keys.
   */
  keys() {
    return this.entries().map(entry => entry[0]);
  }

  /**
   * @returns {string[]} An array of map values.
   */
  values() {
    return this.entries().map(entry => entry[1]);
  }

  /**
   * @returns {string[][]} An array of key-value pairs.
   */
  entries() {
    const entryArr = [];
    this.buckets.forEach(bucket => {
      bucket.forEach(node => {
        entryArr.push([node.key, node.value]);
      });
    });
    return entryArr;
  }

  // Utility methods

  /**
   * Produces a hash code.
   * @param {string} key - Passed in key to hash.
   * @returns {number} Hash code.
   */
  #hash(key, bucketLength = this.buckets.length) {
    let hashCode = 0;
    const primeNumber = 31;
    if (!key) return -1;
    for (let i = 0; i < key.length; i++)
      hashCode =
        (primeNumber * hashCode + key.charCodeAt(i)) % bucketLength;
    return hashCode;
  }

  /**
   * Finds the bucket with the key.
   * @param {string} key - Passed in key to find.
   * @returns {({ key: string, value: string }[] | null)} A bucket with the pair.
   */
  #findBucket(key) {
    const index = this.#hash(key);
    if (index < 0 || index >= this.buckets.length) return null;
    return this.buckets[index];
  }

  /**
   * Resizes the map to accomodate for the load factor.
   */
  #resize() {
    const newCapacity = this.buckets.length * 2;
    const newBuckets = new Array(newCapacity).fill(null).map(() => []);

    this.buckets.forEach(bucket => {
      for (const node of bucket) {
        const newIndex = this.#hash(node.key, newBuckets.length);
        newBuckets[newIndex].push(node);
      }
    });

    this.buckets = newBuckets;
  }
}

/**
 * Hash Sets are data structures that
 * only allow storing keys using a hash function.
 *
 * It provides efficient storage and
 * retrieval of said keys after hashing them.
 */
export class HashSet {
  constructor(initCapacity = 16, loadFactor = 0.75) {
    this.buckets = new Array(initCapacity).fill(null).map(() => []);
    this.loadFactor = loadFactor;
    this.size = 0;
  }

  // Add command

  /**
   * Adds the key to the set.
   * @param {string} key - Passed in key.
   * @returns {string} String on set attempt.
   */
  add(key) {
    const bucket = this.#findBucket(key);
    if (bucket) {
      const currNode = bucket.some(node => node.key === key);
      if (!currNode) {
        bucket.push(new SetNode(key));
        this.size += 1;

        if (this.size / this.buckets.length > this.loadFactor) this.#resize();
        return 'Key added to the set';
      }
    }
    return 'Incorrect key';
  }

  // Delete commands

  /**
   * Removes the key from the set.
   * @param {string} key - Passed in key.
   * @returns {boolean} Status of removal.
   */
  remove(key) {
    const bucket = this.#findBucket(key);
    if (bucket) {
      const index = bucket.findIndex(node => node.key === key);
      if (index !== -1) {
        bucket.splice(index, 1);
        this.size -= 1;
        return true;
      }
      return false;
    }
    return false;
  }

  /**
   * Clears all keys from the set.
   * @returns {string} String on successful clear.
   */
  clear() {
    this.buckets = new Array(this.buckets.length).fill(null).map(() => []);
    this.size = 0;
    return 'Set has been cleared';
  }

  // View commands

  /**
   * @param {string} key - Passed in key to check.
   * @returns {boolean} true if the key is in the set, false if not.
   */
  has(key) {
    const bucket = this.#findBucket(key);
    return bucket ? bucket.some(node => node.key === key) : false;
  }

  /**
   * @returns {number} Length of the set.
   */
  length() {
    return this.size;
  }

  /**
   * @returns {string[]} An array of set keys.
   */
  keys() {
    const keyArr = [];
    this.buckets.forEach(bucket => {
      bucket.forEach(node => {
        keyArr.push(node.key);
      });
    });
    return keyArr;
  }

  // Utility methods

  /**
   * Produces a hash code.
   * @param {string} key - Passed in key to hash.
   * @returns {number} Hash code.
   */
  #hash(key, bucketLength = this.buckets.length) {
    let hashCode = 0;
    const primeNumber = 31;
    if (!key) return -1;
    for (let i = 0; i < key.length; i++)
      hashCode =
        (primeNumber * hashCode + key.charCodeAt(i)) % bucketLength;
    return hashCode;
  }

  /**
   * Finds the bucket with the key.
   * @param {string} key - Passed in key to find.
   * @returns {({ key: string }[] | null)} A bucket with the key.
   */
  #findBucket(key) {
    const index = this.#hash(key);
    if (index < 0 || index >= this.buckets.length) return null;
    return this.buckets[index];
  }

  /**
   * Resizes the set to accommodate for the load factor.
   */
  #resize() {
    const newCapacity = this.buckets.length * 2;
    const newBuckets = new Array(newCapacity).fill(null).map(() => []);

    this.buckets.forEach(bucket => {
      for (const node of bucket) {
        const newIndex = this.#hash(node.key, newBuckets.length);
        newBuckets[newIndex].push(node);
      }
    });

    this.buckets = newBuckets;
  }
}
