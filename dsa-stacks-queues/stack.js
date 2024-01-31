/** Node: node for a stack. */
class Node {
  constructor(val) {
    this.val = val;   // The value of the node
    this.next = null; // The next node in the stack
  }
}

/** Stack: chained-together nodes where you can remove from the top or add to the top. */
class Stack {
  constructor() {
    this.first = null; // The top node of the stack
    this.last = null;  // The bottom node of the stack (not used in typical stacks)
    this.size = 0;     // The number of nodes in the stack
  }

  /** push(val): add new value to the top of the stack. */
  push(val) {
    let newNode = new Node(val); // Create a new node with the given value
    if (!this.first) {
      // If the stack is empty:
      this.first = newNode; // Set the new node as the top of the stack
      this.last = newNode;  // Also set it as the bottom of the stack
    } else {
      newNode.next = this.first; // Set the new node's next to the current top
      this.first = newNode;      // Update the top of the stack to the new node
    }
     this.size++; // Increases the stack size and return it
  }

  /** pop(): removes the node from the top of the stack and return its value. */
  pop() {
    if (!this.first) throw new Error("Stack is empty"); // Throw error if the stack is empty
    let temp = this.first; // Temporarily store the top node
    this.first = this.first.next; // Updates the top to the next node
    this.size--; // Decreases the size of the stack
    return temp.val; // Returns the value of the removed node
  }

  /** peek(): return the value of the top node in the stack. */
  peek() {
    if (!this.first) throw new Error("Stack is empty"); // Throw error if the stack is empty
    return this.first.val; // Return the value of the top node
  }

  /** isEmpty(): returns true if the stack is empty, otherwise false */
  isEmpty() {
    return this.size === 0; // Returns true if size is 0, otherwise false
  }
}

module.exports = Stack;
