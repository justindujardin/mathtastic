import { BinaryTreeNode, BinarySearchTree, STOP } from '../src/treeNode'

// This is the test-suite for [binary-trunk](./index.html).

// **should accept children in the constructor**

// check that the children passed in the constructor are properly assigned,
// and that their `parent` variables are also set to the root node properly.
describe('BinaryTreeNode.constructor', () => {
  const tree = new BinaryTreeNode(new BinaryTreeNode(), new BinaryTreeNode())
  //"children assigned properly by constructor"
  expect(tree.left !== null && tree.right !== null).toBeTruthy()
  let count = 0
  tree.visitInorder(node => count++)
  expect(count).toBe(3) //, "expected tree node count");
  if (!tree.left) {
    throw new Error('invalid')
  }
  expect(tree.left.parent).toBe(tree) //, true, "left child parent assigned properly");
  if (!tree.right) {
    throw new Error('invalid state')
  }
  return expect(tree.right.parent).toBe(tree)
  //   true,
  //   "right child parent assigned properly"
  // );
})

// **should be able to be cloned to form copies of existing trees**

// check to be sure that when we clone off a known node of the tree
// that its children, and only its children, are still searchable
// from the cloned tree.
test('BinaryTreeNode.clone', function() {
  const tree = new BinarySearchTree(0)
  for (let i = 0; i <= 25; i++) {
    tree.insert(i)
  }
  const fifteen = tree.find(15)
  if (!fifteen) {
    throw new Error('invalid state')
  }
  expect(fifteen).not.toBeNull()
  const clone = fifteen.clone()
  // clone node becomes root
  expect(clone.getRoot()).toBe(clone)
  let count = 0
  clone.visitInorder(() => count++)
  // clone node has expected 11 remaining nodes
  return expect(count).toBe(11)
})

// **should support identifying as a leaf node**

// check that the known extremes of a tree are reported as leaf nodes
// and that all other known non-extremes are not.
test('BinaryTreeNode.isLeaf', function() {
  const tree = new BinarySearchTree(0)
  for (let i = -1, asc = -1 <= 5; asc ? i <= 5 : i >= 5; asc ? i++ : i--) {
    tree.insert(i)
  }
  const negNode = tree.find(-1)
  if (!negNode) {
    throw new Error('invalid test state')
  }
  expect(negNode.isLeaf()).toBe(true)
  const fiveNode = tree.find(5)
  if (!fiveNode) {
    throw new Error('invalid test state')
  }
  expect(fiveNode.isLeaf()).toBe(true)
  const values = [0, 1, 2, 3, 4]
  values.forEach(n => {
    const node = tree.find(n)
    if (!node) {
      throw new Error('invalid test state')
    }
    expect(node.isLeaf()).toBe(false)
  })
})

// **should support node rotations**

// test to ensure that rotations do not compromise the search tree
// by randomly rotating nodes, and verifying that all known numbers
// can still be found.
test('BinaryTreeNode.rotate', function() {
  const values = __range__(-5, 5, true)
  const tree = new BinarySearchTree(0)
  for (var i of values) {
    tree.insert(i)
  }
  for (let i = 1; i <= 10000; i++) {
    const index = Math.floor(Math.random() * values.length)
    const node = tree.find(values[index])
    if (!node) {
      continue
    }
    node.rotate()
    if (node.parent) {
      node.parent.getSide(node)
    }
  }
  values.forEach(v => expect(tree.find(v)).not.toBeNull())
})

// **should support preorder visiting**

// check the order in which the nodes are visited against what is
// expected for a preorder tree visit.
describe('BinaryTreeNode.visitPreorder', function() {
  const values = [-1, 0, 1]
  const order = [0, -1, 1]
  const tree = new BinarySearchTree(0)
  for (let i of values) {
    tree.insert(i)
  }
  tree.visitPreorder<BinarySearchTree>(node => expect(node.key).toBe(order.shift()))
})

// check that returning `node.STOP` cancels visits.
describe('BinaryTreeNode.visit[Pre/In/Post]order (Stop)', function() {
  const values = [-1, 0, 1]
  const tree = new BinarySearchTree(0)
  for (let i of values) {
    tree.insert(i)
  }

  let total = 0
  tree.visitPreorder<BinarySearchTree>(function(node) {
    total += 1
    if (node.key === -1) {
      return STOP
    }
  })
  // preorder stops at second node
  expect(total).toBe(2)

  total = 0
  tree.visitInorder<BinarySearchTree>(function(node) {
    total += 1
    if (node.key === -1) {
      return STOP
    }
  })
  // inorder stops at first node
  expect(total).toBe(1)

  total = 0
  tree.visitPostorder<BinarySearchTree>(function(node) {
    total += 1
    if (node.key === -1) {
      return STOP
    }
  })
  // postorder stops at first node
  expect(total).toBe(1)
})

// **should support inorder visiting**

// check the order in which the nodes are visited against what is
// expected for a inorder tree visit.
describe('BinaryTreeNode.visitInorder', function() {
  const values = [-1, 0, 1]
  const order = [-1, 0, 1]
  const tree = new BinarySearchTree(0)
  for (let i of values) {
    tree.insert(i)
  }
  tree.visitInorder<BinarySearchTree>(node => expect(node.key).toBe(order.shift()))
})

// **should support postorder visiting**

// check the order in which the nodes are visited against what is
// expected for a postorder tree visit.
describe('BinaryTreeNode.visitPostorder', function() {
  const values = [-1, 0, 1]
  const order = [-1, 1, 0]
  const tree = new BinarySearchTree(0)
  for (let i of values) {
    tree.insert(i)
  }
  tree.visitPostorder<BinarySearchTree>(node => expect(node.key).toBe(order.shift()))
})

// **should have a convenience for root location**

// verify that `getRoot` is working as expected by checking that
// every node in the tree returns the same value when it is invoked.
describe('BinaryTreeNode.getRoot', function() {
  const values = __range__(-5, 5, true)
  const tree = new BinarySearchTree(0)
  for (let i of values) {
    tree.insert(i)
  }
  values.forEach(n => {
    const node = tree.find(n)
    if (!node) {
      throw new Error('invalid test state')
    }
    expect(node.getRoot()).toBe(tree)
  })
})

// **should have a left child setter**

// verify that the left child setter properly assigns parent link.
describe('BinaryTreeNode.setLeft', function() {
  const one = new BinaryTreeNode()
  const two = new BinaryTreeNode()
  one.setLeft(two)
  expect(one.left).toBe(two)
  // parent is properly assigned
  expect(two.parent).toBe(one)
})

// **should have a right child setter**

// verify that the right child setter properly assigns parent link.
describe('BinaryTreeNode.setRight', function() {
  const one = new BinaryTreeNode()
  const two = new BinaryTreeNode()
  one.setRight(two)
  expect(one.right).toBe(two)
  // parent is properly assigned
  expect(two.parent).toBe(one)
})

// **should be able to return which side of a parent this node is on**

// check that a node reports the side as expected from a tree with a
// known structure.  Because of the insertion order all numbers less
// than 0 should be left children of their parents, and all numbers
// greater than 0 should be right children of theirs.
//
// In the event that a node is passed that is not a child, an exception
// will be thrown.
describe('BinaryTreeNode.getSide', function() {
  const values = [-1, -2, -3, -4, 1, 2, 3, 4]
  const tree = new BinarySearchTree(0)
  for (let i of values) {
    tree.insert(i)
  }
  let node = tree.find(-4)
  if (!node || !node.parent) {
    throw new Error('invalid test state')
  }
  // found child on expected side of parent
  expect(node.parent.getSide(node) === 'left').toBeTruthy()
  node = tree.find(4)
  if (!node || !node.parent) {
    throw new Error('invalid test state')
  }
  // found child on expected side of parent
  expect(node.parent.getSide(node) === 'right').toBeTruthy()
  return expect(() => {
    // @ts-ignore
    node.parent.getSide(tree)
  }).toThrow()
})

// **should be able to set a child to a given side by side name**

// check that a child node, assigned with `setSide` is assigned to
// the proper left or right node on the new parent.
//
// check that an exception is thrown when a bad side string is passed.
describe('BinaryTreeNode.setSide', function() {
  const tree = new BinaryTreeNode()
  const one = new BinaryTreeNode()
  const two = new BinaryTreeNode()
  tree.setSide(one, 'left')
  expect(tree.left).toBe(one)
  tree.setSide(two, 'right')
  // child assigned to right properly
  expect(tree.right).toBe(two)
  return expect(() => tree.setSide(one, 'rihgt' as any)).toThrow()
})

// **should be able to return children as a list**

// check a few permutations of expected results from getChildren.
describe('BinaryTreeNode.getChildren', function() {
  const values = [-2, -1, -3, 0, 1, 2]
  const tree = new BinarySearchTree(0)
  for (let i of values) {
    tree.insert(i)
  }
  const negNode = tree.find(-2)
  if (!negNode) {
    throw new Error('invalid test state')
  }
  const neg = negNode.getChildren<BinarySearchTree>()
  expect(neg.length).toBe(2) // , 'expect two children of -1')
  expect(neg[0].key).toBe(-3) // , 'expect left child of -1 to first')
  expect(neg[1].key).toBe(-1) // , 'expect right child of -1 to second')
  const oneNode = tree.find(1)
  if (!oneNode) {
    throw new Error('invalid test state')
  }
  const one = oneNode.getChildren<BinarySearchTree>()
  expect(one.length).toBe(1) // , 'expect one child of 1')
  expect(one[0].key).toBe(2) // , 'expect child of 1 to be 2')
  const twoNode = tree.find(2)
  if (!twoNode) {
    throw new Error('invalid test state')
  }
  const two = twoNode.getChildren<BinarySearchTree>()
  expect(two.length).toBe(0) // , 'expect no children for 2')
})

// **should have a convenience for getting a node's sibling**

// check that siblings are reported properly for a known tree
// structure.
describe('BinaryTreeNode.getSibling', function() {
  const tree = new BinaryTreeNode(new BinaryTreeNode(), new BinaryTreeNode())
  // @ts-ignore
  expect(tree.left.getSibling()).toBe(tree.right) // , true, 'left sibling is right')
  // @ts-ignore
  expect(tree.right.getSibling()).toBe(tree.left) // , true, 'right sibling is left')
  expect(tree.getSibling()).toBeNull() // , undefined, 'root has no sibling')
})

// **should support serializing to JSON**

// check to be sure recursive node JSON format matches expectations
describe('BinaryTreeNode.toJSON', function() {
  const tree = new BinaryTreeNode(new BinaryTreeNode(), new BinaryTreeNode())
  const json = tree.toJSON()
  expect(json.children.length).toBe(2)
  expect(json.children[0].children.length).toBe(0)
  expect(json.children[1].children.length).toBe(0)
})

function __range__(left: number, right: number, inclusive: boolean) {
  let range: number[] = []
  let ascending = left < right
  let end = !inclusive ? right : ascending ? right + 1 : right - 1
  for (let i = left; ascending ? i < end : i > end; ascending ? i++ : i--) {
    range.push(i)
  }
  return range
}
