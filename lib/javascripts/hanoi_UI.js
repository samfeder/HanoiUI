(function () {
  if (typeof Hanoi === "undefined") {
    window.Hanoi = {}
  }

  var UI = Hanoi.UI = function (game){
    this.game = game;
    this.stacks = $("div[class='stack']");
    this.towers = [];
    this.render();
    this.setupStacks();
  }

  UI.prototype.setupStacks = function () {
    var that = this;
    for (var i = 0; i < 3; i++) {
      $currentStack = $(this.stacks[i])
      $currentStack.on("click",function(event) {
        that.towers.push(parseInt(this.id));
        that.checkTowers();
      });
    }
  }

  UI.prototype.checkTowers = function () {
    if (this.towers.length === 2){
      try {
        this.game.move(this.towers[0], this.towers[1]);
        this.render();
      }
      catch (e){
        console.log(this.towers);
        alert("Illegal move, grasshopper")
      }
      this.towers = [];
      if (this.game.isWon()){
        alert("you win!")
      }
    }
  }

  UI.prototype.render = function () {
    var setTowers = this.game.towers;
    console.log(setTowers)
    for(var i = 0; i < 3; i++){
      var tower = $("div[id='"+ i +"']")
      console.log(setTowers[i].length)
      for (var j = 0; j < setTowers[i].length; j++){
        var disc = $("div[id='disc" + setTowers[i][j] + "']");
        console.log(disc)
        tower.append(disc);
      }
    }
  }



})();