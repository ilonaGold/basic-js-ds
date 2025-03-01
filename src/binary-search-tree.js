const { NotImplementedError } = require("../extensions/index.js");
const { Node } = require("../extensions/list-tree.js");

// const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    const newNode = new Node(data);
    if (this._root === null) {
      this._root = newNode;
      return this;
    }

    let current = this._root;
    while (true) {
      if (data < current.data) {
        if (current.left === null) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }

  has(data) {
    return this.find(data) !== null;
  }

  find(data) {
    let current = this._root;
    while (current !== null) {
      if (data === current.data) return current;
      current = data < current.data ? current.left : current.right;
    }
    return null;
  }

  remove(data) {
    const findMin = (node) => {
      while (node.left !== null) node = node.left;
      return node;
    };

    const removeNode = (node, data) => {
      if (node === null) return null;
      if (data < node.data) {
        node.left = removeNode(node.left, data);
      } else if (data > node.data) {
        node.right = removeNode(node.right, data);
      } else {
        if (node.left === null) return node.right;
        if (node.right === null) return node.left;
        node.data = findMin(node.right).data;
        node.right = removeNode(node.right, node.data);
      }
      return node;
    };

    this._root = removeNode(this._root, data);
    return this;
  }

  min() {
    if (this._root === null) return null;
    let current = this._root;
    while (current.left !== null) current = current.left;
    return current.data;
  }

  max() {
    if (this._root === null) return null;
    let current = this._root;
    while (current.right !== null) current = current.right;
    return current.data;
  }
}

module.exports = {
  BinarySearchTree,
};
