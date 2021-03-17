// For validation, we will use bit-wise operation. Because it's faster and we can reduce the memory
const LABELS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G'];
let grid, n, subGridLength, emptyPositions;
let rowValidation, columnValidation, subGridValidation;

function getDigit(label) {
  // should be starting from 0
  const charCode = label.charCodeAt(0);
  if (charCode >= 65) {
    return charCode - 65 + 9;
  }
  return charCode - 48 - 1;
}

function validation(i, j, digit) {
  const mask = 1 << digit;
  const subGridIdx = parseInt(i / subGridLength) * subGridLength + parseInt(j / subGridLength);
  // row, column, sub-grid validation.
  if (
    (rowValidation[i] & mask) != 0 ||
    (columnValidation[j] & mask) != 0 ||
    (subGridValidation[subGridIdx] & mask) != 0
  ) {
    // grid data invalid
    return false;
  }
  rowValidation[i] |= mask;
  columnValidation[j] |= mask;
  subGridValidation[subGridIdx] |= mask;

  return true;
}

function DFS(idx) {
  console.log({ idx, emptyPositions: emptyPositions.length, grid: grid.map((row) => row.join(':')) });
  if (idx === emptyPositions.length) {
    // we filled all empty positions
    return true;
  }

  const { x, y } = emptyPositions[idx];

  for (let i = 0; i < n; i++) {
    label = LABELS[i];
    const digit = getDigit(label);
    const mask = 1 << digit;
    const subGridIdx = parseInt(x / subGridLength) * subGridLength + parseInt(y / subGridLength);

    if (validation(x, y, digit)) {
      grid[x][y] = label;
      if (DFS(idx + 1)) {
        return true;
      }
      rowValidation[x] &= ~mask;
      columnValidation[y] &= ~mask;
      subGridValidation[subGridIdx] &= ~mask;
      grid[x][y] = '.';
    }
  }
}

function solveSudoku(newGrid) {
  // initialization. We need to use global variable to reduce memory limit.
  // We shouldn't use function arguments to send grid information.
  grid = newGrid;
  emptyPositions = [];
  n = grid.length;
  subGridLength = Math.sqrt(n);

  let i, j;
  rowValidation = new Array(n);
  columnValidation = new Array(n);
  subGridValidation = new Array(n);
  for (i = 0; i < n; i++) {
    rowValidation[i] = columnValidation[i] = subGridValidation[i] = 0;
  }

  for (i = 0; i < n; i++) {
    for (j = 0; j < n; j++) {
      if (grid[i][j] === '.') {
        emptyPositions.push({
          x: i,
          y: j,
        });
      } else {
        if (!validation(i, j, getDigit(grid[i][j]))) {
          // grid data invalid
          return false;
        }
      }
    }
  }

  if (DFS(0)) {
    console.log(grid.map((row) => row.join(':')));
  } else {
    return false;
  }
}

solveSudoku([
  ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
  ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
  ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
  ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
  ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
  ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
  ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
  ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
  ['.', '.', '.', '.', '8', '.', '.', '7', '9'],
]);

solveSudoku([
  ['.', '.', '.', '.', '6', '.', '.', '.', '.'],
  ['.', '5', '.', '.', '.', '.', '9', '7', '.'],
  ['.', '.', '2', '.', '.', '5', '.', '.', '.'],
  ['.', '.', '.', '2', '.', '.', '.', '8', '.'],
  ['.', '7', '4', '.', '.', '.', '.', '.', '.'],
  ['.', '8', '5', '.', '4', '.', '2', '.', '1'],
  ['.', '.', '1', '.', '.', '7', '.', '.', '.'],
  ['6', '.', '.', '.', '.', '4', '.', '.', '.'],
  ['9', '2', '.', '6', '.', '.', '1', '.', '.'],
]);

solveSudoku([
  ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '9', '.', '.'],
  ['9', '7', '.', '3', '.', '.', '.', '.', '.'],
  ['.', '1', '.', '.', '6', '.', '5', '.', '.'],
  ['.', '.', '4', '7', '.', '8', '.', '.', '2'],
  ['.', '.', '.', '.', '.', '2', '.', '.', '6'],
  ['.', '3', '1', '.', '.', '4', '.', '.', '.'],
  ['.', '.', '.', '8', '.', '.', '1', '6', '7'],
  ['.', '8', '7', '.', '.', '.', '.', '.', '.'],
]);
