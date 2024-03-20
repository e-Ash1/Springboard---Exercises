class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  push(val) {
    const newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
  }

  unshift(val) {
    const newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
  }

  pop() {
    if (!this.head) return undefined;
    
    let current = this.head;
    let newTail = current;

    while (current.next) {
      newTail = current;
      current = current.next;
    }

    this.tail = newTail;
    this.tail.next = null;
    this.length--;

    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }

    return current.val;
  }

  shift() {
    if (!this.head) return undefined;
    const oldHead = this.head;
    this.head = this.head.next;
    this.length--;
    if (this.length === 0) {
      this.tail = null;
    }
    return oldHead.val;
  }

  getAt(idx) {
    if (idx < 0 || idx >= this.length) return null;
    let counter = 0;
    let current = this.head;

    while (counter !== idx) {
      current = current.next;
      counter++;
    }

    return current.val;
  }

  setAt(idx, val) {
    if (idx < 0 || idx >= this.length) return false;
    let current = this.head;
    let counter = 0;

    while (counter !== idx) {
      current = current.next;
      counter++;
    }

    current.val = val;
    return true;
  }

  insertAt(idx, val) {
    if (idx < 0 || idx > this.length) return false;
    if (idx === 0) return !!this.unshift(val);
    if (idx === this.length) return !!this.push(val);

    const newNode = new Node(val);
    let previous = this.head;
    let counter = 0;

    while (counter !== idx - 1) {
      previous = previous.next;
      counter++;
    }

    newNode.next = previous.next;
    previous.next = newNode;
    this.length++;
    return true;
  }

  removeAt(idx) {
    if (idx < 0 || idx >= this.length) return undefined;
    if (idx === 0) return this.shift();
    if (idx === this.length - 1) return this.pop();

    let previous = this.head;
    let counter = 0;

    while (counter !== idx - 1) {
      previous = previous.next;
      counter++;
    }

    const removed = previous.next;
    previous.next = removed.next;
    this.length--;
    return removed.val;
  }

  average() {
    if (!this.head) return 0;
    let sum = 0;
    let current = this.head;

    while (current) {
      sum += current.val;
      current = current.next;
    }

    return sum / this.length;
  }
}

module.exports = LinkedList;
