/** TreeNode: node for a general tree. */
class TreeNode {
  constructor(val, children = []) {
    // Initialize a tree node with value and optional children
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    // Initialize a tree with an optional root node
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */
  sumValues() {
    // Recursive function to calculate the sum of values in the tree
    const sum = (node) => {
      if (!node) return 0; // Base case: if node is null, return 0
      let total = node.val; // Start with the node's value
      for (const child of node.children) { // Iterate over children
        total += sum(child); // Recursively add the value of each child
      }
      return total; // Return the total sum
    };
    return sum(this.root); // Start the recursion from the root
  }

  /** countEvens(): count all of the nodes in the tree with even values. */
  countEvens() {
    // Recursive function to count nodes with even values
    const count = (node) => {
      if (!node) return 0; // Base case: if node is null, return 0
      let total = node.val % 2 === 0 ? 1 : 0; // Start with 1 if node's value is even, else 0
      for (const child of node.children) { // Iterate over children
        total += count(child); // Recursively count even-valued children
      }
      return total; // Return the total count
    };
    return count(this.root); // Start the recursion from the root
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */
  numGreater(lowerBound) {
    // Recursive function to count nodes with values greater than lowerBound
    const count = (node) => {
      if (!node) return 0; // Base case: if node is null, return 0
      let total = node.val > lowerBound ? 1 : 0; // Start with 1 if node's value is greater than lowerBound, else 0
      for (const child of node.children) { // Iterate over children
        total += count(child); // Recursively count children with values greater than lowerBound
      }
      return total; // Return the total count
    };
    return count(this.root); // Start the recursion from the root
  }
}

module.exports = { Tree, TreeNode };
