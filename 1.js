let board, word, wordLength, n, m;

const MOVES = [
  // We can move to the 4 adjacent cells.
  {
    x: 0,
    y: 1,
  },
  {
    x: 0,
    y: -1,
  },
  {
    x: 1,
    y: 0,
  },
  {
    x: -1,
    y: 0,
  },
];

function validation(newX, newY, currentLength) {
  // the next cell validation
  return newX >= 0 && newX < n && newY >= 0 && newY < m && board[newX][newY] === word.charAt(currentLength);
}

function DFS(currentX, currentY, currentLength) {
  if (currentLength === wordLength) {
    // Found solution
    return true;
  }

  let i;
  for (i = 0; i < 4; i++) {
    const newX = currentX + MOVES[i].x;
    const newY = currentY + MOVES[i].y;

    if (validation(newX, newY, currentLength)) {
      // check if we can move to this [newX, newY] cell
      board[newX][newY] = ' ';
      if (DFS(newX, newY, currentLength + 1)) {
        return true;
      }
      board[newX][newY] = word.charAt(currentLength);
    }
  }
}

function Boggle(newBoard, newWord) {
  n = newBoard.length;
  if (n === 0) {
    return false;
  }

  m = newBoard[0].length;
  if (m === 0) {
    return false;
  }

  // initialization. We need to use global variable to reduce memory limit.
  // We shouldn't use function arguments to send board information.

  board = newBoard;
  word = newWord;
  wordLength = word.length;

  let i, j;
  for (i = 0; i < n; i++) {
    for (j = 0; j < m; j++) {
      if (board[i][j] === word.charAt(0)) {
        board[i][j] = ' ';
        if (DFS(i, j, 1)) {
          return true;
        }
        board[i][j] = word.charAt(0);
      }
    }
  }
  return false;
}

console.log(
  Boggle(
    [
      ['A', 'B', 'C', 'E'],
      ['S', 'F', 'C', 'S'],
      ['A', 'D', 'E', 'E'],
    ],
    'ABCCED'
  )
);

console.log(
  Boggle(
    [
      ['A', 'B', 'C', 'E'],
      ['S', 'F', 'C', 'S'],
      ['A', 'D', 'E', 'E'],
    ],
    'SEE'
  )
);

console.log(
  Boggle(
    [
      ['A', 'B', 'C', 'E'],
      ['S', 'F', 'C', 'S'],
      ['A', 'D', 'E', 'E'],
    ],
    'ABCB'
  )
);
