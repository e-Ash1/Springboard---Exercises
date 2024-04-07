class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  };

  // insert(val): Insert a new node into the BST with value val.
  // Returns the tree. Uses iteration.
  insert(val) {
    const newNode = new Node(val);

    // If the tree is empty, set the new node as the root
    if (!this.root) {
      this.root = newNode;
      return this;
    }

    // Otherwise, find the correct position for the new node
    let current = this.root;
    while (true) {
      // If the new value is less, go left
      if (val < current.val) {
        if (!current.left) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else if (val > current.val) { // If the new value is more, go right
        if (!current.right) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      } else {
        // If the value already exists, return the tree
        return this;
      }
    }
  };

   /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

   insertRecursively(val, current = this.root) {
    if (!current) {
        // If there's no root, create a new node as the root
        if (!this.root) {
            this.root = new Node(val);
            return this;
        } else {
            // If the current node is null during recursion, create and return a new node
            return new Node(val);
        }
    }
    // Go left or right based on the value
    if (val < current.val) {
        if (!current.left) {
            current.left = new Node(val);
        } else {
            current.left = this.insertRecursively(val, current.left);
        }
    } else if (val > current.val) {
        if (!current.right) {
            current.right = new Node(val);
        } else {
            current.right = this.insertRecursively(val, current.right);
        }
    }
    return this;
}

  // find(val): Search the tree for a node with value val.
  // Return the node, if found; else null. Uses iteration.
  find(val) {
    let current = this.root;
    while (current) {
      if (current.val === val) {
        return current;
      }
      current = current.val > val ? current.left : current.right;
    }
    return null;
  };

  // findRecursively(val): Search the tree for a node with value val.
  // Return the node, if found; else null. Uses recursion.
  findRecursively(val) {
    const findIn = (current) => {
      if (!current) return null;
      if (current.val === val) return current;
      return val < current.val ? findIn(current.left) : findIn(current.right);
    };

    return findIn(this.root);
  };

  // dfsPreOrder(): Traverse the tree using pre-order DFS.
  // Return an array of visited nodes.
  dfsPreOrder() {
    let result = [];
    const traverse = (node) => {
      if (!node) return;
      result.push(node.val); // Visit the node
      traverse(node.left); // Go left
      traverse(node.right); // Go right
    };
    traverse(this.root);
    return result;
  };

  // dfsInOrder(): Traverse the tree using in-order DFS.
  // Return an array of visited nodes.
  dfsInOrder() {
    let result = [];
    const traverse = (node) => {
      if (!node) return;
      traverse(node.left); // Go left
      result.push(node.val); // Visit the node
      traverse(node.right); // Go right
    };
    traverse(this.root);
    return result;
  };

  // dfsPostOrder(): Traverse the tree using post-order DFS.
  // Return an array of visited nodes.
  dfsPostOrder() {
    let result = [];
    const traverse = (node) => {
      if (!node) return;
      traverse(node.left); // Go left
      traverse(node.right); // Go right
      result.push(node.val); // Visit the node
    };
    traverse(this.root);
    return result;
  };

  // bfs(): Traverse the tree using BFS.
  // Return an array of visited nodes.
  bfs() {
    let result = [];
    let queue = [];
    if (this.root) queue.push(this.root);

    while (queue.length > 0) {
      let current = queue.shift();
      result.push(current.val); // Visit the node
      if (current.left) queue.push(current.left); // Go left
      if (current.right) queue.push(current.right); // Go right
    }

    return result;
  };

  remove(val) {
    this.root = this._removeNode(this.root, val);
    return this;
  };

    _removeNode(node, val) {
        if (node === null) {
            return undefined;
        }

        if (val < node.val) {
            node.left = this._removeNode(node.left, val);
        } else if (val > node.val) {
            node.right = this._removeNode(node.right, val);
        } else {
            // Node with only one child or no child
            if (node.left == null) {
                return node.right;
            } else if (node.right == null) {
                return node.left;
            }

            // Node with two children: Get the inorder successor
            node.val = this._findMinNode(node.right).val;
            node.right = this._removeNode(node.right, node.val);
        }

        return node;
    };

    _findMinNode(node) {
        let current = node;
        while (current && current.left !== null) {
            current = current.left;
        }
        return current;
    };
   

     

  isBalanced() {
      const checkHeight = (node) => {
          if (node === null) return -1; // Base case: height of empty subtree is -1
    
          let leftHeight = checkHeight(node.left); // Check height of left subtree
          if (leftHeight === Number.MIN_VALUE) return Number.MIN_VALUE; // Left subtree is unbalanced
    
          let rightHeight = checkHeight(node.right); // Check height of right subtree
          if (rightHeight === Number.MIN_VALUE) return Number.MIN_VALUE; // Right subtree is unbalanced
    
          if (Math.abs(leftHeight - rightHeight) > 1) {
              return Number.MIN_VALUE; // Current node is unbalanced
          }
          return Math.max(leftHeight, rightHeight) + 1; // Return height of current subtree
      };
    
      return checkHeight(this.root) !== Number.MIN_VALUE; // Check if the whole tree is balanced
  };
    

  findSecondHighest() {
    if (!this.root || (!this.root.left && !this.root.right)) {
        // Tree is empty or has only one node, so no second highest value exists
        return null;
    }

    let current = this.root;
    let parent = null;

    // Find the rightmost node (highest value)
    while (current.right) {
        parent = current;
        current = current.right;
    }

    // If the rightmost node has a left subtree,
    // the second highest value is the rightmost node in that subtree
    if (current.left) {
        current = current.left;
        while (current.right) {
            current = current.right;
        }
        return current.val;
    }

    // Otherwise, the second highest value is the parent of the rightmost node
    return parent.val;
  };

};

//Debug Cases:
const bst = new BinarySearchTree();
bst.insert("E");
bst.insert("B");
bst.insert("G");
bst.insert("A");
bst.insert("D");
bst.insert("F");

console.log(bst.dfsPreOrder()); // Output: [E, B, A, D, G, F]
console.log(bst.dfsInOrder()); // Output: [A, B, D, E, F, G]

module.exports = { 
  Node,
  BinarySearchTree
};
