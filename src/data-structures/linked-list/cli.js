import LinkedList from './index.js';

const linkedList = new LinkedList();

export default function linkedListCli(question, quit) {
  // Intro
  console.log(`
Available commands for Linked List:`);

  // Command List
  console.log(`
  append {value} - Adds a new node containing value to the end of the list.
  prepend {value} - Adds a new node containing value to the start of the list.
  size - Total number of nodes in the list.
  head - First value in the list.
  tail - Last value in the list.
  at {value} - Value at the given index.
  pop - Removes the last element from the list.
  contains {value} - true if the value is in the list, false if not.
  find {value} - Index of the node containing value, or null if not found.
  toString - Linked list objects as strings.
  insertAt {value} {index} - Inserts a new node with the provided value at the given index.
  removeAt {index} - Removes the node at the given index.
  `);

  // Quit Program
console.log(`  "q" to close the program.
`);

  question('Command: ').then(answer => {
    switch (answer) {

    }
  }).catch(error => {
    console.log('Error:', error)
  });
}
