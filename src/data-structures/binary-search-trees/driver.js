import BinarySearchTrees from './index.js';

export default function driverScript() {
  const randomArr = size =>
    Array.from({ length: size }, () => ~~(Math.random() * 100));

  const tree = new BinarySearchTrees(randomArr(20));

  console.log(tree.isBalanced());

  console.log(tree.levelOrder());
  console.log(tree.inOrder());
  console.log(tree.preOrder());
  console.log(tree.postOrder());

  tree.insert(300);
  tree.insert(400);
  tree.insert(500);

  console.log(tree.isBalanced());
  tree.rebalance();
  console.log(tree.isBalanced());

  console.log(tree.levelOrder());
  console.log(tree.inOrder());
  console.log(tree.preOrder());
  console.log(tree.postOrder());

  tree.prettyPrint();
}
