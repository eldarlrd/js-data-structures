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

const warranty = () =>
  console.log(`
  JavaScript Data Structures is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
  GNU General Public License for more details.
`);

const conditions = () =>
  console.log(`
  JavaScript Data Structures is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, version 3.
`);

const notice = () =>
  console.log(`
  JavaScript Data Structures Copyright (C) 2023 Eldar Pashazade <eldarlrd@pm.me>
  This program comes with ABSOLUTELY NO WARRANTY; for details type "w".
  This is free software, and you are welcome to redistribute it
  under certain conditions; type "c" for details.`);

const help = () =>
  console.log(`
Below is a list of manual and explorable data structures:

  1. Linked List - A linear collection of data elements.

  "n" to see the copyright notice.
  "h" to see this list again.
  "q" to close the program.
`);

const rl = readline.createInterface({ input, output });

const run = () =>
  rl
    .question('Enter the corresponding order number to explore: ')
    .then(answer => {
      switch (answer) {
        case '1':
          return linkedListCli(
            e => rl.question(e),
            () => rl.close()
          );

        case 'n':
          notice();
          console.log();
          return run();
        case 'w':
          warranty();
          return run();
        case 'c':
          conditions();
          return run();

        case 'h':
          help();
          return run();
        case 'q':
          return rl.close();

        default:
          console.log('Unknown command.');
          return run();
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });

notice();
help();
run();
