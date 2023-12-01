/**
 * @license GPL-3.0-only
 * JavaScript Data Structures - Manual and Explorable JavaScript Data Structures
 * Copyright (C) 2023 Eldar Pashazade <eldarlrd@pm.me>
 *
 * This file is part of JavaScript Data Structures.
 *
 * JavaScript Data Structures is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, version 3.
 *
 * JavaScript Data Structures is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JavaScript Data Structures. If not, see <https://www.gnu.org/licenses/>.
 */

import { stdin as input, stdout as output } from 'node:process';
import * as readline from 'node:readline/promises';

import linkedListCli from './data-structures/linked-list/cli.js';

// Copyright Notice
console.log(`
  JavaScript Data Structures Copyright (C) 2023 Eldar Pashazade <eldarlrd@pm.me>
  This program comes with ABSOLUTELY NO WARRANTY;
  This is free software, and you are welcome to redistribute it
  under certain conditions;
`);

// Intro
console.log('Below is a list of manual and explorable data structures:');

// Data Structures
console.log(`
  1. Linked List - A linear collection of data elements.
`);

// Quit Program
console.log(`  "q" to close the program.
`);

const rl = readline.createInterface({ input, output });

const getInput = () =>
  rl.question('Enter the corresponding order number to explore: ');

const run = () =>
  getInput()
    .then(answer => {
      switch (answer) {
        case 'q':
          return rl.close();
        case '1':
          return linkedListCli(
            e => rl.question(e),
            () => rl.close()
          );
        default:
          return run();
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });

run();
