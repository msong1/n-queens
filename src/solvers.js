/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other


// //========= Mev WIP =============
window.findNRooksSolution = function(n) {
  let solution = new Board({'n': n}); //fixme
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      solution.togglePiece(i, j);// [0,0]
      if (solution.hasAnyRooksConflicts()) {
        solution.togglePiece(i, j);
      }
    }
  }
  return solution.rows();
};

// MIN WIP ==================
// window.findNRooksSolutionMIN = function(n, board, numOfPieces = 0, nextRow = 0, nextCol = 0) {
//   // var solution = new Board(n); //fixme
//   debugger;
//   board = board || new Board({'n': n}); // not sure I can put new Board(n) as a defalut argument
//   debugger;
//   numOfPieces = numOfPieces || 0;
//   // base case
//   // if enough
//   // when on the current board we have enough pieces, or
//   // when the next coordinate goes outside the board
//   if ((nextRow >= n)) {
//     return;
//   }

//   if (numOfPieces >= n) {
//     console.log('Single solution for ' + n + ' rooks:', JSON.stringify(board));
//     return board;
//   }

//   // recursive case
//   // search space?
//   // 0,0 0,1 0,2 0,3 1,0
//   while (true) {
//     board.togglePiece(nextRow, nextCol);
//     if (board.hasAnyRooksConflicts()) {
//       console.log('conflicts found', board);
//       break
//       nextCol = nextCol+1 % n; // 0%4 1%4 2%4 3%4 0
//       nextRow =
//   }
//   // put a rook
//   board.togglePiece(nextRow, nextCol);
//   debugger;
//   numOfPieces++;

//   // check for conflicts
//   if (board.hasAnyRooksConflicts()) {
//     console.log('failed!)');
//     console.log(board.attributes);
//   }
//   debugger;

//   nextCol++;
//   return findNRooksSolution(n, board, numOfPieces, nextRow, nextCol);
// };

// findNRooksSolutionMIN(2)
// MIN WIP END===============================


// min scratch paper
/*
1.prepare a chess board => using let board = new Board({n:2})

2.put a rook on the board => board.toggle([row, col])

3.check for conflicts
  - row
  - col
    - if conflicts => stop running go to number 2 continue searching
    - if not
      - check if the number of pieces on the board is n
        - if yes, stop running and return the result(i.e coordinates)
        - if not, continue to number 2



*/
// set up a test case right after and stop running
// debugger




// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n, currentStart) {
  if (n === 1) {
    return [[1]];
  }
  let solution = new Board({'n': n}); //fixme
  currentStart = currentStart || 0;
  for (var i = 0; i < n; i++) {
    for (var j = currentStart; j < n; j++) {
      solution.togglePiece(i, j);// [0,0]
      console.log(solution);
      if (solution.hasAnyQueensConflicts()) {
        solution.togglePiece(i, j);
        continue;
      }
      if (currentStart === n - 1) {
        console.log(solution.rows());
        return solution.rows();
      }
      var recursive = window.findNQueensSolution(n, currentStart + 1);
      if (recursive.length) {
        return recursive;
      }
      solution.togglePiece(i, j);
    }
  }
  return [];
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  console.log(solution);
  return solutionCount;
};
