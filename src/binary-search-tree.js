const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
	constructor() {
		this.rootNode = null;
	}

	root() {
		return this.rootNode;
	}

	insertNodeToTree(node, newNode) {
		if (newNode.data < node.data) {
			if (!node.left) node.left = newNode;
			else this.insertNodeToTree(node.left, newNode);
		} else {
			if (!node.right) node.right = newNode;
			else this.insertNodeToTree(node.right, newNode);
		}
	}
	add(data) {
		const node = new Node(data);
		if (!this.rootNode) {
			this.rootNode = node;
		} else {
			this.insertNodeToTree(this.rootNode, node);
		}
	}
	searchData(root, data) {
		if (!root) {
			return null;
		}
		if (root.data && root.data === data) {
			return root;
		}
		if (root.data > data) {
			if (!root.left) {
				return null;
			}
			return this.searchData(root.left, data);
		}
		if (root.data < data) {
			if (!root.right) {
				return null;
			}
			return this.searchData(root.right, data);
		}
		return null;
	}

	has(data) {
		return this.searchData(this.rootNode, data) !== null;
	}

	find(data) {
		return this.searchData(this.rootNode, data);
	}

	remove(data) {
		this.rootNode = this.newRootNodeRemoved(this.rootNode, data);
	}
	newRootNodeRemoved(root, value) {
		if (!root) return null;
		else if (value < root.data) {
			root.left = this.newRootNodeRemoved(root.left, value);
			return root;
		} else if (value > root.data) {
			root.right = this.newRootNodeRemoved(root.right, value);
			return root;
		} else {
			if (root.left === null && root.right === null) {
				root = null;
				return root;
			}
			if (root.left === null) {
				root = root.right;
				return root;
			} else if (root.right === null) {
				root = root.left;
				return root;
			}

			let current = root.right;
			while (current.left) {
				current = current.left;
			}
			console.log(current);
			root.data = current.data;

			root.right = this.newRootNodeRemoved(root.right, current.data);
			return root;
		}
	}
	min() {
		let current = this.rootNode;
		if (!current) return null;

		while (current.left) {
			current = current.left;
		}
		return current.data;
	}

	max() {
		let current = this.rootNode;
		if (!current) return null;
		while (current.right) {
			current = current.right;
		}
		return current.data;
	}
}

const tree = new BinarySearchTree();
tree.add(9);
tree.add(14);
tree.add(54);
tree.add(2);
tree.add(6);
// tree.add(8);
// tree.add(31);
// tree.add(1);
// console.log(tree.has(54), true);
// console.log(tree.has(8), true);
// console.log(tree.has(7), false);
// console.log(tree.has(4), false);
//console.log(tree.root());

module.exports = {
	BinarySearchTree,
};
