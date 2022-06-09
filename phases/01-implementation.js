class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}
//[fe , dv]
class HashTable { // get O(1), set O(1), deleteKey O(1)

  constructor(numBuckets = 8) {
    this.capacity = numBuckets;
    this.count = 0;
    this.data = new Array(this.capacity).fill(null);
  }

  hash(key) {
    let hashValue = 0;

    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i);
    }

    return hashValue;
  }

  hashMod(key) {
    // Get index after hashing
    return this.hash(key) % this.capacity;
  }


  insert(key, value) {
    const index = this.hashMod(key);
    let curr = this.data[index];
    while (curr && curr.key !== key) {
      curr = curr.next;
    }
    if (curr) {
      curr.value = value;
    }
    else {
      let newNode = new KeyValuePair(key, value);
      if (!this.data[index]) {
        this.data[index] = newNode;
      }
      else {
        newNode.next = this.data[index];
        this.data[index] = newNode;
      }
    }
    this.count++;
  }


  read(key) {
    const index = this.hashMod(key);
    let curr = this.data[index];
    while (curr && curr.key !== key) {
      curr = curr.next;
    }
    if (curr) {
      return curr.value;
    } else return undefined;
  }
  // hash table property changes should occur first:
  // copy data to preserve old elements
  // reassign capacity to double its previous value
  // re-instantiate this.data to an array with its new size filled with null
  // reset count (calling insert will re-increment count)

  // iterate over old data
  // iterate over each element in old data, looking for nested nodes
  // insert every node back into our new data buckets

  resize() {
    let olddata = this.data;
    this.capacity *= 2;
    this.data = new Array(this.capacity).fill(null);
    this.count = 0;

    let currentpair;
    for (let i = 0; i < olddata.length; i++) {
      currentpair = olddata[i];
      //console.log(currentpair);
      while (currentpair) {
        this.insert(currentpair.key, currentpair.value);
        currentpair = currentpair.next;
      }
    }
  }


  delete(key) {
    const index = this.hashMod(key);
    let curr = this.data[index];
    let prev;
    while (curr && curr.key !== key) {
      prev = curr;
      curr = curr.next;
    }
    if (!curr) return `Key not found`;
    else {
      if (!prev) {
        this.data[index] = curr;
        curr.key = undefined;
        curr.value = undefined;
      }
      else prev.next = curr.next;
      curr.key = undefined;
      curr.value = undefined
    }
    this.count--;
  }
}


module.exports = HashTable;
