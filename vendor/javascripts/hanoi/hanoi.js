
function HanoiGame () {
  this.towers = [[3, 2, 1], [], []];
};

HanoiGame.prototype.isWon = function () {
  // move all the discs to the last tower
  return (this.towers[2].length == 3) || (this.towers[1].length == 3);
};

HanoiGame.prototype.isValidMove = function (startTowerIdx, endTowerIdx) {
  var startTower = this.towers[startTowerIdx];
  var endTower = this.towers[endTowerIdx];

  if (startTower.length === 0) {
    return false;
  } else if (endTower.length == 0) {
    return true;
  } else {
    var topStartDisc = startTower[startTower.length - 1];
    var topEndDisc = endTower[endTower.length - 1];
    return topStartDisc < topEndDisc;
  }
};

HanoiGame.prototype.move = function (startTowerIdx, endTowerIdx) {
  if (!this.isValidMove(startTowerIdx, endTowerIdx)) {
    return false;
  }

  var disc = this.towers[startTowerIdx].pop();
  this.towers[endTowerIdx].push(disc);
  return true;
};

HanoiGame.prototype.print = function () {
  console.log(JSON.stringify(game.towers));
};

HanoiGame.prototype.promptMove = function (callback) {
  this.print();
  reader.question("Enter a starting tower: ",function (start) {
    var startTowerIdx = parseInt(start);
    reader.question("Enter an ending tower: ", function (end) {
      var endTowerIdx = parseInt(end);
      callback(startTowerIdx, endTowerIdx)
    });
  });
};

HanoiGame.prototype.run = function (gameCompletionCallback) {
  var game = this;

  this.promptMove(function (startTowerIdx, endTowerIdx) {
    if (!game.move(startTowerIdx, endTowerIdx)) {
      console.log("Invalid move!");
    }

    if (!game.isWon()) {
      // Continue to play!
      game.run(gameCompletionCallback);
    } else {
      game.print();
      console.log("You win!");
      gameCompletionCallback();
    }
  });
};

