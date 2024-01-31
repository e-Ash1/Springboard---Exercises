class Queue {
  constructor() {
    // Initializes an empty queue
    this.first = null; // No first node initially
    this.last = null;  // No last node initially
    this.size = 0;     // Size of the queue is 0
  }

  enqueue(val) {
    // Adds a value to the end of the queue
    let newNode = new Node(val); // Creates a new node with the given value
    if (!this.first) {
      // If the queue is empty:
      this.first = newNode; // Set the new node as the first node
      this.last = newNode;  // Also set it as the last node
    } else {
      // If the queue is not empty:
      this.last.next = newNode; // Link the current last node to the new node
      this.last = newNode;      // Update the last node to the new node
    }
      this.size++; // Increases the size of the queue and return it
  }

  dequeue() {
    // Removes and returns the value at the start of the queue
    if (!this.first) throw new Error("Queue is empty"); // Throws error if the queue is empty
    let temp = this.first; // Temporarily stores the first node
    if (this.first === this.last) {
      // If there is only one node in the queue:
      this.last = null; // Clear the last node
    }
    this.first = this.first.next; // Updates the first node to its next node
    this.size--; // Decreases the size of the queue
    return temp.value; // Return the value of the removed node
  }

  peek() {
    // Returns the value of the first node without removing it
    if (!this.first) throw new Error("Queue is empty"); // Throws an error if the queue is empty
    return this.first.value; // Returns the value of the first node
  }

  isEmpty() {
    // Check if the queue is empty:
    return this.size === 0; // Returns true if size is 0, otherwise false
  }
}

class Node {
  constructor(value) {
    // Define a node in the queue:
    this.value = value; // Value of the node
    this.next = null;   // Next node in the queue
  }
}

module.exports = Queue;
