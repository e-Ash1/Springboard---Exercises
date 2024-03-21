/** BinaryTreeNode: node for a binary tree. */
class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

/** BinaryTree: binary tree class. */
class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree. */
  minDepth() {
    // Base case: if tree is empty
    if (!this.root) return 0;

    // Recursive function to find minimum depth
    function findMinDepth(node) {
      if (!node) return Infinity;  // Base case for leaf's child
      if (!node.left && !node.right) return 1;  // If leaf node, depth is 1

      // Recur for left and right subtrees and add 1 for current node
      return 1 + Math.min(findMinDepth(node.left), findMinDepth(node.right));
    }

    return findMinDepth(this.root);
  }

  /** maxDepth(): return the maximum depth of the tree. */
  maxDepth() {
    // Base case: if tree is empty
    if (!this.root) return 0;

    // Recursive function to find maximum depth
    function findMaxDepth(node) {
      if (!node) return 0;  // Base case for leaf's child

      // Recurs for left and right subtrees and add 1 for current node
      return 1 + Math.max(findMaxDepth(node.left), findMaxDepth(node.right));
    }

    return findMaxDepth(this.root);
  }

  /** maxSum(): return the maximum sum from any path in the tree. */
  maxSum() {
    let result = -Infinity;

    // Recursive function to find maximum path sum
    function findMaxPathSum(node) {
      if (!node) return 0;

      // Calculate the maximum path sum passing through the left and right child
      const left = Math.max(findMaxPathSum(node.left), 0);
      const right = Math.max(findMaxPathSum(node.right), 0);

      // Updates the result if it's better to pass through the node
      result = Math.max(result, node.val + left + right);

      // Returns the maximum path sum without splitting
      return node.val + Math.max(left, right);
    }

    findMaxPathSum(this.root);
    return result;
  }

  /** nextLarger(lowerBound): return the smallest value larger than lowerBound. */
  nextLarger(lowerBound) {
    let result = null;

    // Recursive function to traverse the tree and find the next larger element
    function traverse(node) {
      if (!node) return;

      // If current node's value is greater than lowerBound and either result is null
      // or current node's value is smaller than result, update result
      if (node.val > lowerBound && (result === null || node.val < result)) {
        result = node.val;
      }

      traverse(node.left);
      traverse(node.right);
    }

    traverse(this.root);
    return result;
  }

  /** areCousins(node1, node2): check if node1 and node2 are cousins in the tree. */
  areCousins(node1, node2) {
    // Define a recursive function to find the depth and parent of a given node
    function findDepthAndParent(node, target, depth = 0, parent = null) {
      if (!node) return null;
      if (node === target) return { depth, parent };

      let left = findDepthAndParent(node.left, target, depth + 1, node);
      let right = findDepthAndParent(node.right, target, depth + 1, node);

      return left || right;
    }

    let node1Info = findDepthAndParent(this.root, node1);
    let node2Info = findDepthAndParent(this.root, node2);

    // Check if node1 and node2 are at the same depth but have different parents
    return node1Info && node2Info && node1Info.depth === node2Info.depth && node1Info.parent !== node2Info.parent;
  }

  /** serialize(): converts the tree into a string representation. */
  static serialize(tree) {
    // Recursive function to serialize the tree
    function serializeHelper(node) {
      if (!node) return 'null,';
      return `${node.val},${serializeHelper(node.left)}${serializeHelper(node.right)}`;
    }

    return serializeHelper(tree.root);
  }

  /** deserialize(stringTree): constructs a tree from a string representation. */
  static deserialize(data) {
    let list = data.split(',');
    let index = 0;

    // Recursive function to deserialize the string into a tree
    function deserializeHelper() {
      if (index >= list.length || list[index] === 'null') {
        index++;
        return null;
      }

      let node = new BinaryTreeNode(parseInt(list[index++]));
      node.left = deserializeHelper();
      node.right = deserializeHelper();
      return node;
    }

    return new BinaryTree(deserializeHelper());
  }

  /** lowestCommonAncestor(node1, node2): find the LCA of node1 and node2. */
  lowestCommonAncestor(node1, node2) {
    // Recursive function to find the lowest common ancestor
    function findLCA(node) {
      if (!node || node === node1 || node === node2) return node;

      let left = findLCA(node.left);
      let right = findLCA(node.right);

      if (left && right) return node;  // If node1 and node2 are on different sides
      return left || right;  // Else, one side is null, so return the non-null side
    }

    return findLCA(this.root);
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
