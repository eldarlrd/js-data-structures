/**
 * @license GPL-3.0-only
 * JS Data Structures - Manual and Explorable JS Data Structures
 * Copyright (C) 2023-2024 Eldar Pashazade <eldarlrd@pm.me>
 *
 * This file is part of JS Data Structures.
 *
 * JS Data Structures is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, version 3.
 *
 * JS Data Structures is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Data Structures. If not, see <https://www.gnu.org/licenses/>.
 */

import { stdin as input, stdout as output } from 'node:process';
import * as readline from 'node:readline/promises';

import clc from 'cli-color';

import binarySearchTreesCli from './dataStructures/binarySearchTrees/cli.js';
import hashMapCli from './dataStructures/hashMap/cli.js';
import knightsTravailsCli from './dataStructures/knightsTravails/cli.js';
import linkedListCli from './dataStructures/linkedList/cli.js';

const warranty = () =>
  console.log(
    clc.magentaBright(`
  JS Data Structures is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
  GNU General Public License for more details.
`)
  );

const conditions = () =>
  console.log(
    clc.magentaBright(`
  JS Data Structures is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, version 3.
`)
  );

const notice = () =>
  console.log(
    clc.magentaBright(`
  JS Data Structures Copyright (C) 2023-2024 Eldar Pashazade <eldarlrd@pm.me>
  This program comes with ABSOLUTELY NO WARRANTY; for details type "w".
  This is free software, and you are welcome to redistribute it
  under certain conditions; type "c" for details.`)
  );

const mainHelp = () => {
  console.log(`
Below is a list of manual and explorable data structures:`);

  console.log(
    clc.cyanBright(`
  1. Linked List - A linear collection of data elements.
  2. Binary Search Trees - Traversing a tree of nodes.
  3. Knights Travails - Find the shortest path for the knight.
  4. Hash Map - An associative array of keys and values.`)
  );

  console.log(
    clc.yellowBright(`
  "n" to see the copyright notice.
  "h" to see this list again.
  "q" to close the program.
`)
  );
};

const rl = readline.createInterface({ input, output });

const mainRun = () =>
  rl
    .question('Enter the corresponding order number to explore: ')
    .then(answer => {
      switch (answer) {
        case '1':
          return linkedListCli(
            e => rl.question(e),
            () => rl.close()
          );
        case '2':
          return binarySearchTreesCli(
            e => rl.question(e),
            () => rl.close()
          );
        case '3':
          return knightsTravailsCli(
            e => rl.question(e),
            () => rl.close()
          );
        case '4':
          return hashMapCli(
            e => rl.question(e),
            () => rl.close()
          );

        case 'n':
          notice();
          console.log();
          return mainRun();
        case 'w':
          warranty();
          return mainRun();
        case 'c':
          conditions();
          return mainRun();

        case 'h':
          mainHelp();
          return mainRun();
        case 'q':
          return rl.close();

        default:
          console.log(clc.redBright('Unknown command'));
          return mainRun();
      }
    })
    .catch(error => console.error(clc.redBright(error)));

notice();
mainHelp();
mainRun();

export { mainHelp, mainRun };
