import clc from 'cli-color';

import { mainHelp, mainRun } from '../../main.js';

import HashMap from './index.js';

export default function hashMapCli(question, quit) {
  const hashMap = new HashMap();

  const help = () => {
    console.log(`
Available commands for Hash Map:`);

    console.log(
      clc.cyanBright(`
  Add:
    "set {key} {value}" - Sets the key-value pair to the map.

  Delete:
    "remove {key}" - Removes the key-value pair from the map.
    "clear" - Clears all entries from the map.

  View:
    "has {key}" - true if the key is in the map, false if not.
    "get {key}" - Value associated with the key.
    "length" - Length of the map.
    "keys" - An array of map keys.
    "values" - An array of map values.
    "entries" - An array of key-value pairs.`)
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
          // Add command
          case 'set':
            console.log(clc.greenBright(hashMap.set(args[0], args[1])));
            return run();

          // Delete commands
          case 'remove':
            console.log(
              clc.greenBright('Is pair removed?'),
              hashMap.remove(args[0])
            );
            return run();
          case 'clear':
            console.log(clc.greenBright(hashMap.clear()));
            return run();

          // View commands
          case 'has':
            console.log(clc.greenBright(hashMap.has(args[0])));
            return run();
          case 'get':
            console.log(
              clc.greenBright(
                `The value of the key ${args[0]} is`,
                hashMap.get(args[0])
              )
            );
            return run();
          case 'length':
            console.log(
              clc.greenBright('The length of the map is', hashMap.length())
            );
            return run();
          case 'keys':
            console.log(clc.greenBright('All keys:'), hashMap.keys());
            return run();
          case 'values':
            console.log(clc.greenBright('All values:'), hashMap.values());
            return run();
          case 'entries':
            console.log(clc.greenBright('All pairs:'), hashMap.entries());
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
