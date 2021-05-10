/*******************************Loopy Bot ************************************/
function loopyBot(){
  this.i;
  this.j;
  this.prevLocation;
  this.direction;
  this.update = function(i,j){
    this.i=i;
    this.j=j;
  }
  this.show = function () {
    var x = this.i * w + (w / 2);
    var y = this.j * w + (w / 2);
    fill('blue');
    circle(x, y, w / 1.5);
  }
}

function updateLoopy()
{
  // loopyBot Movement
  if(loopyBot.i == 5 && loopyBot.j == 5){
    loopyBot.direction = "right";
  }
  else if(loopyBot.i == 7 && loopyBot.j == 5){
    loopyBotRandomNumber = Math.round(Math.random()*1);
    if(loopyBotRandomNumber == 0 ){
      loopyBot.direction = "right";
    }
    else if(loopyBotRandomNumber == 1 && loopyBot.direction == "up"){
      loopyBot.direction = "right";
    }
    else{
      loopyBot.direction = "down";
    }
  }
  else if(loopyBot.i ==13 && loopyBot.j == 5){
    loopyBotRandomNumber = Math.round(Math.random()*1);
    if(loopyBotRandomNumber ==0){
      loopyBot.direction = "right";
    }else if(loopyBotRandomNumber == 1 && loopyBot.direction == "up"){
      loopyBot.direction = "right";
    }else{
      loopyBot.direction = "down";
    }
  }
  else if(loopyBot.i == 15 && loopyBot.j == 5){
    loopyBot.direction = "down";
  }
  else if(loopyBot.i == 15 && loopyBot.j == 15){
    loopyBot.direction = "left";
  }
  else if(loopyBot.i == 13 && loopyBot.j == 15){
    if(loopyBot.direction == "left"){
        loopyBotRandomNumber = Math.round(Math.random()*1);
        if(loopyBotRandomNumber == 0){
            loopyBot.direction = "left";
        }
        else{
            loopyBot.direction = "up";
        }
    }
    else{
        loopyBot.direction = "left";
    }
  }
  else if(loopyBot.i == 7 && loopyBot.j == 15){
    if(loopyBot.direction == "left"){
        loopyBotRandomNumber = Math.round(Math.random()*1);
        if(loopyBotRandomNumber==0){
          loopyBot.direction = "left";
        }
        else{
          loopyBot.direction = "up";
        }
      }
      else{
        loopyBot.direction = "left";
      }
  }
  else if(loopyBot.i == 5 && loopyBot.j == 15){
      loopyBot.direction = "up";
  }

  if(loopyBot.direction == "right"){
    loopyBot.prevLocation = grid[loopyBot.i][loopyBot.j];
    loopyBot.update(loopyBot.i+1,loopyBot.j);
  }
  else if (loopyBot.direction == "down"){
    loopyBot.prevLocation = grid[loopyBot.i][loopyBot.j];
    loopyBot.update(loopyBot.i,loopyBot.j+1);
  }
  else if (loopyBot.direction == "left"){
    loopyBot.prevLocation = grid[loopyBot.i][loopyBot.j];
    loopyBot.update(loopyBot.i-1,loopyBot.j);
  }
  else if (loopyBot.direction == "up"){
    loopyBot.prevLocation = grid[loopyBot.i][loopyBot.j];
    loopyBot.update(loopyBot.i,loopyBot.j-1);
  }

  if(((loopyBot.i == player.i && loopyBot.j == player.j)
      || ((player.j == loopyBot.prevLocation.i && player.i == loopyBot.prevLocation.j)
      && (loopyBot.i == player.prevLocation.i && loopyBot.j == player.prevLocation.j))
      && immunityCounter == 0 )){

    immunityCounter=5;
    player.health--;
    console.log("lose a health");

  }

}
/*******************************Looopy Bot ************************************/

/*******************************Screwy Bot ************************************/
function screwyBot(){
  this.i;
  this.j;
  this.prevLocation;
  this.update = function(i,j){
    this.i=i;
    this.j=j;
  }
  this.show = function () {
    var x = this.i * w + (w / 2);
    var y = this.j * w + (w / 2);
    fill('yellow');
    circle(x, y, w / 1.5);
  }
}

function updateScrewy(){

  while(true){
    screwyRandomNumber = Math.round(Math.random()*7);
    screwyBot.prevLocation = grid[screwyBot.i][screwyBot.j];
    if((screwyRandomNumber == 2 || screwyRandomNumber == 3)&& maze_array[screwyBot.j-1][screwyBot.i] == 1 && screwyBot.i != 1){
      screwyBot.update(screwyBot.i,screwyBot.j-1);
      break;
    }
    else if ((screwyRandomNumber == 6 ||screwyRandomNumber==7) && maze_array[screwyBot.j][screwyBot.i+1] == 1 && screwyBot.i != 19){
      screwyBot.update(screwyBot.i+1,screwyBot.j);
      break;
    }
    else if ((screwyRandomNumber ==4|| screwyRandomNumber==5) && maze_array[screwyBot.j+1][screwyBot.i] == 1 && screwyBot.j != 19) {
      screwyBot.update(screwyBot.i,screwyBot.j+1);
      break;
    }
    else if ((screwyRandomNumber==0 || screwyRandomNumber==1)  && maze_array[screwyBot.j][screwyBot.i-1] == 1 && screwyBot.i != 1) {
      screwyBot.update(screwyBot.i-1,screwyBot.j);
      break;
    }//end else
  }//end of while

  if(((screwyBot.i == player.i && screwyBot.j == player.j)
      || ((player.j == screwyBot.prevLocation.i && player.i == screwyBot.prevLocation.j)
      && (screwyBot.i == player.prevLocation.i && screwyBot.j == player.prevLocation.j))
      && immunityCounter == 0 ))  {
    immunityCounter=5;
    player.health--;
    console.log("lose a health");
  }

}
/*******************************Screwy Bot ************************************/

/*******************************Blooey Bot ************************************/

function blooeyBot(){
  this.i;
  this.j;
  this.prevLocation;
  this.update = function(i,j){
    this.i=i;
    this.j=j;
  }
  this.show = function () {
    var x = this.i * w + (w / 2);
    var y = this.j * w + (w / 2);
    fill('red');
    circle(x, y, w / 1.5);
  }
}// end of blooeyBot

function updateBlooey(){

  blooeyOpenQueue.enqueue(blooeyCurrent);
  blooeyPathQueue.enqueue("");
  blooeyPathQueue.enqueue("S")
  while(false){ //<--------------------------------------------------change to true if you want to test this out, WARNING: it is very slow

      blooeyCurrent = blooeyOpenQueue.front();
      blooeyOpenQueue.dequeue();
      blooeyPathQueue.dequeue();

      if(blooeyCurrent != playerLocation){
        console.log("Havent found the player location");

          //generate the children of blooeyCurrent
                  //check the left cell
                  if(grid[blooeyCurrent.j][blooeyCurrent.i-1].isWall == false && grid[blooeyCurrent.j][blooeyCurrent.i-1].isVisited == false && blooeyCurrent.i != 1){
                      console.log("checking left child");
                      grid[blooeyCurrent.j][blooeyCurrent.i-1].isVisited = true;
                      blooeyOpenQueue.enqueue(grid[blooeyCurrent.j][blooeyCurrent.i-1]);
                      blooeyPathQueue.enqueue(blooeyPathQueue.front()+"L");
                      //blooeyOpenQueue.dequeue();
                      //blooeyPathQueue.dequeue();
                      //blooeyCurrent = blooeyOpenQueue.front();
                  }

                  //check the bottom cell if its a child
                  if(grid[blooeyCurrent.j+1][blooeyCurrent.i].isWall == false && grid[blooeyCurrent.j+1][blooeyCurrent.i].isVisited == false && blooeyCurrent.j !=19){
                      console.log("checking bottom child");
                      grid[blooeyCurrent.j+1][blooeyCurrent.i].isvisited = true;
                      blooeyOpenQueue.enqueue(grid[blooeyCurrent.j+1][blooeyCurrent.i]);
                      blooeyPathQueue.enqueue(blooeyPathQueue.front()+"D");
                      //blooeyOpenQueue.dequeue();
                      //blooeyPathQueue.dequeue();
                      //blooeyCurrent = blooeyOpenQueue.front();
                  }

                  //check the right cell  if its a child
                  console.log(grid[blooeyCurrent.j][blooeyCurrent.i]);
                  console.log(grid[blooeyCurrent.j][blooeyCurrent.i+1]);
                  if(grid[blooeyCurrent.j][blooeyCurrent.i+1].isWall == false && grid[blooeyCurrent.j][blooeyCurrent.i+1].isVisited == false && blooeyCurrent.i !=19){
                      console.log("checking right child");
                      grid[blooeyCurrent.j][blooeyCurrent.i+1].isvisited = true;
                      blooeyOpenQueue.enqueue(grid[blooeyCurrent.j][blooeyCurrent.i+1]);
                      blooeyPathQueue.enqueue(blooeyPathQueue.front()+"R");
                      //blooeyOpenQueue.dequeue();
                      //blooeyPathQueue.dequeue();
                      //blooeyCurrent = blooeyOpenQueue.front();
                  }

                  //check the top cell  if its a child
                  if(grid[blooeyCurrent.j-1][blooeyCurrent.i].isWall == false && grid[blooeyCurrent.j-1][blooeyCurrent.i].isVisited == false && blooeyCurrent.j!=1){
                      console.log("checking top child");
                      grid[blooeyCurrent.j-1][blooeyCurrent.i].isvisited = true;
                      blooeyOpenQueue.enqueue(grid[blooeyCurrent.j-1][blooeyCurrent.i]);
                      blooeyPathQueue.enqueue(blooeyPathQueue.front()+"U");
                      //blooeyOpenQueue.dequeue();
                      //blooeyPathQueue.dequeue();
                      //blooeyCurrent = blooeyOpenQueue.front();
                    }

      }else{
        //have found the playerLocation
        console.log(blooeyPathQueue.front());
        //blooeyOpenQueue.dequeue();

        break; //out of while looop


      }


  }//end of while loop

}
