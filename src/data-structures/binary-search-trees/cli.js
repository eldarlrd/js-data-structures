import BinarySearchTrees from './index.js';

export default function binarySearchTreesCli(question, quit) {
  const randomArr = size =>
    Array.from({ length: size }, () => ~~(Math.random() * 100));

  const tree = new BinarySearchTrees(randomArr(20));

  console.log(tree.isBalanced());
  console.log();

  console.log(tree.levelOrder());
  console.log(tree.preOrder());
  console.log(tree.postOrder());
  console.log(tree.inOrder());
  console.log();

  tree.insert(128);
  tree.insert(256);
  tree.insert(512);
  console.log(tree.isBalanced());
  console.log();

  tree.rebalance();
  console.log(tree.isBalanced());
  console.log();

  console.log(tree.levelOrder());
  console.log(tree.preOrder());
  console.log(tree.postOrder());
  console.log(tree.inOrder());

  console.log(tree.find(128));
  console.log();

  console.log(tree.height(tree.find(256)));
  console.log(tree.depth(128));

  tree.prettyPrint();
  console.log();
  console.log(question, quit);
}

binarySearchTreesCli();
