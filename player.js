function Player() {
    this.i;
    this.j;
    this.prevLocation;
    this.score = 0;
    this.health = 3;
    this.update = function(i,j){
      this.i=i;
      this.j=j;
    }
    this.show = function () {
      var x = this.i * w + (w / 2);
      var y = this.j * w + (w / 2);
      fill('white');
      circle(x, y, w / 1.5);

    }
}

function checkHealth() {
  if(player.health == 0){
  console.log("You died");
  }
}

function checkImmunity(){
  console.log("check");
    //immunitycheck
    if(immunityCounter > 0){
      console.log("immunity counter = " + immunityCounter);
      immunityCounter--;
    }
}

window.addEventListener("keydown", (event) => {
    if (event.key == "ArrowUp") {
      player.prevLocation = grid[posY][posX];
      posY--;
      if(maze_array[posY][posX] == 1)
      {
        player.update(posX,posY);
        checkImmunity();
      }
      else{
          posY++;
      }
    }
    else if (event.key == "ArrowDown") {
      player.prevLocation = grid[posY][posX];
      posY++;
      if(maze_array[posY][posX] == 1)
      {
          player.update(posX,posY);
          checkImmunity();
      }
      else{
          posY--;
      }
    }
    else if (event.key == "ArrowRight") {
      player.prevLocation = grid[posY][posX];
      posX++;
      if(maze_array[posY][posX] == 1)
      {
          player.update(posX,posY);
          checkImmunity();
      }
      else{
          posX--;
      }
    }
    else if (event.key == "ArrowLeft") {
      player.prevLocation = grid[posY][posX];
      posX--;
      if(maze_array[posY][posX] == 1)
      {
          player.update(posX,posY);
          checkImmunity();
      }
      else{
          posX++;
      }
    }


});
