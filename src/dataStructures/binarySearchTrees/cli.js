import clc from 'cli-color';

import { mainHelp, mainRun } from '../../main.js';

import BinarySearchTrees from './index.js';

export default function binarySearchTreesCli(question, quit) {
  const getRandomArr = size =>
    Array.from({ length: size }, () => ~~(Math.random() * 100));

  const help = () => {
    console.log(`
Demo for Binary Search Trees:`);

    console.log(
      clc.cyanBright(`
    "run {size}" - Generates a binary tree with a size between 1 and 100.`)
    );

    console.log(
      clc.yellowBright(`
    "b" to go back to the menu.
    "h" to see this list again.
    "q" to close the program.
`)
    );
  };

  const run = () =>
    question('Command: ')
      .then(answer => {
        const [command, args] = answer.split(/\s+/);
        let size, bst;

        switch (command) {
          case 'run':
            size = ~~+args;
            if (size < 1 || size > 100) {
              console.log(clc.redBright('Incorrect size'));

              return run();
            }
            bst = new BinarySearchTrees(getRandomArr(size));
            console.log();
            console.log(
              clc.greenBright('Tree starts balanced?'),
              bst.isBalanced()
            );
            console.log();

            console.log(
              clc.greenBright('Initial breadth-first level order:'),
              bst.levelOrder()
            );
            console.log(clc.greenBright('Initial pre order:'), bst.preOrder());
            console.log(
              clc.greenBright('Initial post order:'),
              bst.postOrder()
            );
            console.log(clc.greenBright('Initial value order:'), bst.inOrder());
            console.log();

            console.log('Inserted elements 128, 256, 512...');
            bst.insert(128);
            bst.insert(256);
            bst.insert(512);
            console.log();

            console.log(
              clc.greenBright('Is tree balanced now?'),
              bst.isBalanced()
            );
            console.log();

            console.log('Rebalancing the tree...');
            bst.rebalance();
            console.log();

            console.log(clc.greenBright('What about now?'), bst.isBalanced());
            console.log();

            console.log(
              clc.greenBright('New breadth-first level order:'),
              bst.levelOrder()
            );
            console.log(clc.greenBright('New pre order:'), bst.preOrder());
            console.log(clc.greenBright('New post order:'), bst.postOrder());
            console.log(clc.greenBright('New value order:'), bst.inOrder());
            console.log();

            console.log(
              clc.greenBright('Height of element 256 is'),
              bst.height(bst.find(256))
            );
            console.log(
              clc.greenBright('Depth of element 256 is'),
              bst.depth(256)
            );
            console.log();

            console.log(clc.greenBright('Visual Binary Tree:'));
            console.log();
            bst.prettyPrint();
            console.log();

            return run();

          // Controls
          case 'b':
            mainHelp();

            return mainRun();
          case 'h':
            help();

            return run();
          case 'q':
            return quit();

          default:
            console.log(clc.redBright('Unknown command'));

            return run();
        }
      })
      .catch(error => console.error(clc.redBright(error)));

  help();
  run();
}
