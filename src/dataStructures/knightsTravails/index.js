import clc from 'cli-color';

import Node from './node.js';

/**
 * A knight in chess can move to any square on the
 * standard 8x8 chess board from any other square on the board,
 * given enough turns; Its basic move is two steps forward and
 * one step to the side. It can face any direction.
 * @param {number[]} initPositions - Passed in starting positions from 0 to 7.
 * @param {number[]} targetPositions - Passed in destination positions from 0 to 7.
 */
export default function knightMoves(
  [initPosX, initPosY],
  [targetPosX, targetPosY]
) {
  initPosX = ~~+initPosX;
  initPosY = ~~+initPosY;
  targetPosX = ~~+targetPosX;
  targetPosY = ~~+targetPosY;

  const knight = [Node([initPosX, initPosY], [[initPosX, initPosY]])];
  let currKnight = knight.shift();

  while (
    currKnight.position[0] !== targetPosX ||
    currKnight.position[1] !== targetPosY
  ) {
    const legalMoves = [
      [currKnight.position[0] + 2, currKnight.position[1] - 1],
      [currKnight.position[0] + 2, currKnight.position[1] + 1],
      [currKnight.position[0] - 2, currKnight.position[1] - 1],
      [currKnight.position[0] - 2, currKnight.position[1] + 1],
      [currKnight.position[0] + 1, currKnight.position[1] - 2],
      [currKnight.position[0] + 1, currKnight.position[1] + 2],
      [currKnight.position[0] - 1, currKnight.position[1] - 2],
      [currKnight.position[0] - 1, currKnight.position[1] + 2]
    ];

    legalMoves.forEach(legalMove => {
      const nextKnight = Node(legalMove, currKnight.path.concat([legalMove]));

      if (nextKnight) knight.push(nextKnight);
    });

    currKnight = knight.shift();
  }

  const moveAmount = currKnight.path.length - 1;

  console.log(
    clc.greenBright(`
=> You made it in ${moveAmount} move${
      moveAmount === 1 ? '' : 's'
    }! Here's your path:
`)
  );

  console.log('  X, Y');

  currKnight.path.forEach(position => console.log(position));
  console.log();
}
