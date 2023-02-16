// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      /*
      I: number
      O: boolean

      board.hasRowConflict
      */
      var counter = 0;
      for (var i of this.attributes[rowIndex]) {
        if (i !== 0) {
          counter++;
          if (counter > 1) {
            return true;
          }
        }
      }

      return false; // fixme
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      /*
      I: nothing
      O: boolean

      Strategy
        - it won't have any argument
        - but it will be executed as a method of a Board instance
        - which inherits Backbone.Model
      */
      var keys = Object.keys(this.attributes).slice(0, -1);
      for (var i of keys) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      let counter = 0;
      for (let i = 0; i < this.attributes['n']; i++) {
        if (this.attributes[i][colIndex] === 1) {
          counter++;
          if (counter > 1) {
            return true;
          }
        }
      }
      return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      for (let i = 0; i < this.attributes['n']; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false;
    },

    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function([row, col]) {
      // only check the bottom-right direction;
      // this.attributes
      // coordinate [0,0] [0,]
      var checker = function(row, col) {
        return Boolean(this.attributes[row][col]);
      };
      var size = this.attributes['n'];
      let counter = 0;
      for (let i = 0; i < size - row - col; i++) { // 0 , 1 , 2
        if (checker.call(this, row + i, col + i)) { // 0,1 1,2 2,3
          counter++;
          if (counter > 1) {
            return true;
          }
        }
      }
      return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // check along the first row
      // make an array with tuples
      // iterate over the array
      // -invoke hasMajorDiag...At function with each tuple
      // debugger;
      var size = this.attributes['n'];
      let coordinates = _.range(0, size).map(num => [0, num]); // [0,...,n-1]
      coordinates = coordinates.concat(_.range(1, size).map(num => [num, 0]));
      for (let coordinate of coordinates) {
        if (this.hasMajorDiagonalConflictAt(coordinate)) {
          return true;
        }
      }
      // check along the first column
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function([row, col]) {
      var checker = function(row, col) {
        return Boolean(this.attributes[row][col]);
      };
      debugger;
      var size = this.attributes['n'];
      let counter = 0;
      // [row, col] <= [0,1] [0,2] [0,3]
      if (row === 0) {
        for (let i = 0; i < col + 1; i++) {           // 0 ,           1 , 2
          if (checker.call(this, row + i, col - i)) { // [0,1] [1,0]  []
            counter++;
            if (counter > 1) {
              return true;
            }
          }
        }
      } else {
        for (let i = 0; i < size - row; i++) { // [1,3] => 3 [2,3] => 2
          if (checker.call(this, row + i, col - i)) { // [0,1] 1,2 2,3
            counter++;
            if (counter > 1) {
              return true;
            }
          }
        }
      }

      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      debugger;
      var size = this.attributes['n'];
      let coordinates = _.range(1, size).map(num => [0, num]); // [0,...,n-1] [0,1] [0, n-1]
      coordinates = coordinates.concat(_.range(1, size).map(num => [num, size - 1])); // [1,n-1] [2,n] [n-1,]
      for (let coordinate of coordinates) {
        if (this.hasMinorDiagonalConflictAt(coordinate)) {
          return true;
        }
      }
      // check along the first column
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
