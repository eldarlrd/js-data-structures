import LinkedList from './index.js';

export default function linkedListCli(question, quit) {
  const linkedList = new LinkedList();

  const help = () =>
    console.log(`
Available commands for Linked List:

  Add:
    "append {value}" - Adds a new node containing value to the end of the list.
    "prepend {value}" - Adds a new node containing value to the start of the list.
    "insertAt {value} {index}" - Inserts a new node with the provided value at the given index.

  Remove:
    "removeAt {index}" - Removes the node at the given index.
    "pop" - Removes the last element from the list.

  Check:
    "contains {value}" - true if the value is in the list, false if not.
    "find {value}" - Index of the node containing value, or null if not found.
    "at {index}" - Value at the given index.
    "head" - First value in the list.
    "tail" - Last value in the list.
    "size" - Total number of nodes in the list.
    "toString" - Linked list objects as strings.

    "h" to see this list again.
    "q" to close the program.
  `);

  const run = () =>
    question('Command: ')
      .then(answer => {
        const [command, ...args] = answer.split(/\s+/);
        switch (command) {
          case 'append':
            linkedList.append(args[0]);
            return run();
          case 'prepend':
            linkedList.prepend(args[0]);
            return run();

          case 'removeAt':
            linkedList.removeAt(args[0]);
            return run();

          case 'contains':
            console.log(linkedList.contains(args[0]));
            return run();
          case 'find':
            console.log(
              `The index of the value ${args[0]} is`,
              linkedList.find(args[0])
            );
            return run();

          // BUGGY
          case 'insertAt':
            linkedList.insertAt(args[0], args[1]);
            return run();

          // BUGGY
          case 'pop':
            linkedList.pop();
            return run();

          // BUGGY
          case 'at':
            console.log(
              `The value at index ${args[0]} is`,
              linkedList.at(args[0])
            );
            return run();

          // BUGGY
          case 'head':
            console.log('The first value in the list is', linkedList.head());
            return run();

          // BUGGY
          case 'tail':
            console.log('The last value in the list is', linkedList.tail());
            return run();

          case 'size':
            console.log('The size of the list is', linkedList.size());
            return run();
          case 'toString':
            console.log(linkedList.toString());
            return run();

          case 'h':
            help();
            return run();
          case 'q':
            return quit();

          default:
            console.log('Unknown command.');
            return run();
        }
      })
      .catch(error => {
        console.log('Error:', error);
      });

  help();
  run();
}
