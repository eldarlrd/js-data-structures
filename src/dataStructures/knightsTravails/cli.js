import clc from 'cli-color';

import { mainHelp, mainRun } from '../../main.js';

import knightMoves from './index.js';

export default function knightsTravailsCli(question, quit) {
  const help = () => {
    console.log(`
A solution to the Knights Travails:`);

    console.log(
      `       _______________
    7 |_|#|_|#|_|#|_|#|
    6 |#|_|#|_|#|_|#|_|
    5 |_|#|_|#|_|#|_|#|
    4 |#|_|#|_|#|_|#|_|
    3 |_|#|_|#|_|#|_|#|
    2 |#|_|#|_|#|_|#|_|
    1 |_|#|_|#|_|#|_|#|
    0 |#|_|#|_|#|_|#|_|
       0 1 2 3 4 5 6 7`
    );

    console.log(
      clc.cyanBright(`
    "play {startX,startY} {finalX,finalY}" - Travel the knight's path.`)
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
        const isValid = position => ~~+position >= 0 && ~~+position <= 7;
        let initPositions;
        let targetPositions;

        switch (command) {
          case 'play':
            if (args[0] && args[1]) {
              initPositions = args[0].split(',');
              targetPositions = args[1].split(',');
              if (
                isValid(initPositions[0]) &&
                isValid(initPositions[1]) &&
                isValid(targetPositions[0]) &&
                isValid(targetPositions[1])
              )
                knightMoves(initPositions, targetPositions);
              else console.log(clc.redBright('Positions must be from 0 to 7'));
            } else console.log(clc.redBright('Incorrect positions'));

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
