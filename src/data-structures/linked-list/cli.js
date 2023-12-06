import clc from 'cli-color';

import { mainHelp, mainRun } from '../../main.js';

import LinkedList from './index.js';

export default function linkedListCli(question, quit) {
  const linkedList = new LinkedList();

  const help = () => {
    console.log(`
Available commands for Linked List:`);

    console.log(
      clc.cyanBright(`
  Add:
    "append {value}" - Adds a new node containing value to the end of the list.
    "prepend {value}" - Adds a new node containing value to the start of the list.
    "insert {value} {index}" - Inserts a new node with the provided value at the passed index.

  Delete:
    "remove {index}" - Removes the node at the passed index.
    "pop" - Removes the last element from the list.
    "clear" - Clears all elements from the list.

  View:
    "has {value}" - true if the value is in the list, false if not.
    "find {value}" - Index of the node containing value, or null if not found.
    "at {index}" - Value at the passed index.
    "head" - First value in the list.
    "tail" - Last value in the list.
    "size" - Total number of nodes in the list.
    "show" - Linked list objects as strings.`)
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
        const [command, ...args] = answer.split(/\s+/);
        switch (command) {
          // Add commands
          case 'append':
            console.log(clc.greenBright(linkedList.append(args[0])));
            return run();
          case 'prepend':
            console.log(clc.greenBright(linkedList.prepend(args[0])));
            return run();
          case 'insert':
            console.log(clc.greenBright(linkedList.insert(args[0], args[1])));
            return run();

          // Delete commands
          case 'remove':
            console.log(clc.greenBright(linkedList.remove(args[0])));
            return run();
          case 'pop':
            console.log(clc.greenBright(linkedList.pop()));
            return run();
          case 'clear':
            console.log(clc.greenBright(linkedList.clear()));
            return run();

          // View commands
          case 'has':
            console.log(clc.greenBright(linkedList.has(args[0])));
            return run();
          case 'find':
            console.log(
              clc.greenBright(
                `The index of the value ${args[0]} is`,
                linkedList.find(args[0])
              )
            );
            return run();
          case 'at':
            console.log(
              clc.greenBright(
                `The value at index ${args[0]} is`,
                linkedList.at(args[0])
              )
            );
            return run();
          case 'head':
            console.log(
              clc.greenBright(
                'The first value in the list is',
                linkedList.head()
              )
            );
            return run();
          case 'tail':
            console.log(
              clc.greenBright(
                'The last value in the list is',
                linkedList.tail()
              )
            );
            return run();
          case 'size':
            console.log(
              clc.greenBright('The size of the list is', linkedList.size())
            );
            return run();
          case 'show':
            console.log(clc.greenBright(linkedList.show()));
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
