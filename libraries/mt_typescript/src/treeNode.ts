// ## Constants

// Return this from a node visit function to abort a tree visit.
export const STOP = 'stop'
// The constant representing the left child side of a node.
export const LEFT = 'left'
// The constant representing the right child side of a node.
export const RIGHT = 'right'

export type NodeVisitFunction<T extends BinaryTreeNode = BinaryTreeNode> = (node: T, depth: number, data?: any) => any

/**
 * The binary tree node is the base node for all of our trees, and provides a
 * rich set of methods for constructing, inspecting, and modifying them.
 *
 * The node itself defines the structure of the binary tree, having left and right
 * children, and a parent.
 */
export class BinaryTreeNode {
  //  Allow specifying children in the constructor
  constructor(
    public left: BinaryTreeNode | null = null,
    public right: BinaryTreeNode | null = null,
    public parent: BinaryTreeNode | null = null
  ) {
    if (left) {
      this.setLeft(left)
    }
    if (right) {
      this.setRight(right)
    }
  }

  /** Create a clone of this tree */
  public clone() {
    const result = new (this.constructor as any)()
    if (this.left) {
      result.setLeft(this.left.clone())
    }
    if (this.right) {
      result.setRight(this.right.clone())
    }
    return result
  }

  /** Is this node a leaf?  A node is a leaf if it has no children. */
  public isLeaf() {
    return !this.left && !this.right
  }

  /** Serialize the node as a string */
  public toString() {
    return `${this.left} ${this.right}`
  }

  /** Human readable name for this node. */
  public getName() {
    return 'BinaryTreeNode'
  }

  /** Serialize the node as JSON */
  public toJSON(): any {
    return {
      name: this.getName(),
      children: this.getChildren().map(c => c.toJSON())
    }
  }

  /**
   * Rotate a node, changing the structure of the tree, without modifying
   * the order of the nodes in the tree.
   */
  public rotate() {
    const node = this
    const { parent } = this
    if (!node || !parent) {
      return
    }
    const grandParent = parent.parent
    if (node === parent.left) {
      parent.setLeft(node.right)
      node.right = parent
      parent.parent = node
    } else {
      parent.setRight(node.left)
      node.left = parent
      parent.parent = node
    }
    node.parent = grandParent
    if (!grandParent) {
      return
    }
    if (parent === grandParent.left) {
      return (grandParent.left = node)
    }

    return (grandParent.right = node)
  }

  // **Tree Traversal**
  //
  // Each visit method accepts a function that will be invoked for each node in the
  // tree.  The callback function is passed three arguments: the node being
  // visited, the current depth in the tree, and a user specified data parameter.
  //
  // *Traversals may be canceled by returning `STOP` from any visit function.*

  // Preorder : *Visit -> Left -> Right*
  public visitPreorder<T extends BinaryTreeNode = BinaryTreeNode>(
    visitFunction: NodeVisitFunction<T>,
    depth = 0,
    data?: any
  ): 'stop' | undefined {
    if (visitFunction && visitFunction(this as any, depth, data) === STOP) {
      return STOP
    }
    if (this.left && this.left.visitPreorder(visitFunction, depth + 1, data) === STOP) {
      return STOP
    }
    if (this.right && this.right.visitPreorder(visitFunction, depth + 1, data) === STOP) {
      return STOP
    }
  }
  // Inorder : *Left -> Visit -> Right*
  public visitInorder<T extends BinaryTreeNode = BinaryTreeNode>(
    visitFunction: NodeVisitFunction<T>,
    depth = 0,
    data?: any
  ): 'stop' | undefined {
    if (this.left && this.left.visitInorder(visitFunction, depth + 1, data) === STOP) {
      return STOP
    }
    if (visitFunction && visitFunction(this as any, depth, data) === STOP) {
      return STOP
    }
    if (this.right && this.right.visitInorder(visitFunction, depth + 1, data) === STOP) {
      return STOP
    }
  }
  // Postorder : *Left -> Right -> Visit*
  public visitPostorder<T extends BinaryTreeNode = BinaryTreeNode>(
    visitFunction: NodeVisitFunction<T>,
    depth = 0,
    data?: any
  ): 'stop' | undefined {

    if (this.left && this.left.visitPostorder(visitFunction, depth + 1, data) === STOP) {
      return STOP
    }
    if (this.right && this.right.visitPostorder(visitFunction, depth + 1, data) === STOP) {
      return STOP
    }
    if (visitFunction && visitFunction(this as any, depth, data) === STOP) {
      return STOP
    }
  }

  // Return the root element of this tree
  public getRoot<T extends BinaryTreeNode>(): T {
    let result: BinaryTreeNode = this
    while (result.parent) {
      result = result.parent
    }
    return result as T
  }

  // **Child Management**
  //
  // Methods for setting the children on this expression.  These take care of
  // making sure that the proper parent assignments also take place.

  // Set the left node to the passed `child`
  public setLeft<T extends BinaryTreeNode>(child: T | null) {
    this.left = child
    if (this.left) {
      this.left.parent = this
    }
    return this
  }

  // Set the right node to the passed `child`
  public setRight<T extends BinaryTreeNode>(child: T | null) {
    this.right = child
    if (this.right) {
      this.right.parent = this
    }
    return this
  }

  // Determine whether the given `child` is the left or right child of this node
  public getSide<T extends BinaryTreeNode>(child: T | null) {
    if (child === this.left) {
      return LEFT
    }
    if (child === this.right) {
      return RIGHT
    }
    throw new Error('BinaryTreeNode.getSide: not a child of this node')
  }

  // Set a new `child` on the given `side`
  public setSide<T extends BinaryTreeNode>(child: T | null, side: 'left' | 'right') {
    if (side === LEFT) {
      return this.setLeft(child)
    }
    if (side === RIGHT) {
      return this.setRight(child)
    }
    throw new Error('BinaryTreeNode.setSide: Invalid side')
  }

  // Get children as an array.  If there are two children, the first object will
  // always represent the left child, and the second will represent the right.
  public getChildren<T extends BinaryTreeNode = BinaryTreeNode>(): T[] {
    const result: T[] = []
    if (this.left) {
      result.push(this.left as T)
    }
    if (this.right) {
      result.push(this.right as T)
    }
    return result
  }

  // Get the sibling node of this node.  If there is no parent, or the node has no
  // sibling, the return value will be undefined.
  public getSibling(): BinaryTreeNode | null {
    if (!this.parent) {
      return null
    }
    if (this.parent.left === this) {
      return this.parent.right
    }
    if (this.parent.right === this) {
      return this.parent.left
    }
    return null
  }
}

/**
 * A very simple binary search tree that relies on keys that support
 * operator value comparison.
 * @class
 */
export class BinarySearchTree extends BinaryTreeNode {
  constructor(public key: string | number) {
    super()
  }
  public clone() {
    const result = super.clone()
    result.key = this.key
    return result
  }

  // Insert a node in the tree with the specified key.
  public insert(key: string | number) {
    let node = this.getRoot<BinarySearchTree>()
    while (node) {
      if (key > node.key) {
        if (!node.right) {
          node.setRight(new BinarySearchTree(key))
          break
        }
        node = node.right as BinarySearchTree
      } else if (key < node.key) {
        if (!node.left) {
          node.setLeft(new BinarySearchTree(key))
          break
        }
        node = node.left as BinarySearchTree
      } else {
        break
      }
    }
    return this
  }
  // Find a node in the tree by its key and return it.  Return null if the key
  // is not found in the tree.
  public find(key: string | number) {
    let node = this.getRoot<BinarySearchTree>()
    while (node) {
      if (key > node.key) {
        if (!node.right) {
          return null
        }
        node = node.right as BinarySearchTree
        continue
      }
      if (key < node.key) {
        if (!node.left) {
          return null
        }
        node = node.left as BinarySearchTree
        continue
      }
      if (key === node.key) {
        return node
      }
      return null
    }
    return null
  }
}
