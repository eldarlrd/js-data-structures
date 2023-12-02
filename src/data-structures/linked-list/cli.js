import { mainHelp, mainRun } from '../../main.js';

import LinkedList from './index.js';

export default function linkedListCli(question, quit) {
  const linkedList = new LinkedList();

  const help = () =>
    console.log(`
Available commands for Linked List:

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
    "show" - Linked list objects as strings.

    "b" to go back to the menu.
    "h" to see this list again.
    "q" to close the program.
  `);

  const run = () =>
    question('Command: ')
      .then(answer => {
        const [command, ...args] = answer.split(/\s+/);
        switch (command) {
          // Add commands
          case 'append':
            linkedList.append(args[0]);
            return run();
          case 'prepend':
            linkedList.prepend(args[0]);
            return run();
          case 'insert':
            linkedList.insert(args[0], args[1]);
            return run();

          // Delete commands
          case 'remove':
            console.log(linkedList.remove(args[0]));
            return run();
          case 'pop':
            console.log(linkedList.pop());
            return run();
          case 'clear':
            console.log(linkedList.clear());
            return run();

          // View commands
          case 'has':
            console.log(linkedList.has(args[0]));
            return run();
          case 'find':
            console.log(
              `The index of the value ${args[0]} is`,
              linkedList.find(args[0])
            );
            return run();
          case 'at':
            console.log(
              `The value at index ${args[0]} is`,
              linkedList.at(args[0])
            );
            return run();
          case 'head':
            console.log('The first value in the list is', linkedList.head());
            return run();
          case 'tail':
            console.log('The last value in the list is', linkedList.tail());
            return run();
          case 'size':
            console.log('The size of the list is', linkedList.size());
            return run();
          case 'show':
            console.log(linkedList.show());
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
            console.log('Unknown command');
            return run();
        }
      })
      .catch(error => {
        console.log('Error:', error);
      });

  help();
  run();
}
