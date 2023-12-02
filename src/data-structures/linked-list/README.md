# Linked List

> Singly linked list written in JavaScript  
> with a command line interface to explore it.

## Commands
### Add
- `append {value}` - Adds a new node containing value to the end of the list.
- `prepend {value}` - Adds a new node containing value to the start of the list.
- `insert {value} {index}` - Inserts a new node with the provided value at the passed index.

### Delete
- `remove {index}` - Removes the node at the passed index.
- `pop` - Removes the last element from the list.
- `clear` - Clears all elements from the list.

### View
- `has {value}` - true if the value is in the list, false if not.
- `find {value}` - Index of the node containing value, or null if not found.
- `at {index}` - Value at the passed index.
- `head` - First value in the list.
- `tail` - Last value in the list.
- `size` - Total number of nodes in the list.
- `show` - Linked list objects as strings.