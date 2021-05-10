/*
  Team Passione - Maze
  Authors:
  Dianne Lopez  | diannel@csu.fullerton.edu
  Jimmy Phong   | JimmyPhong16@csu.fullerton.edu
  Jose Sanrindo | takashisk@csu.fullerton.edu
  Jose Muniz    | jmuniz900@csu.fullerton.edu
  Armando Lopez |

  This file contains the code to generate the maze and the bot to traverse
  through it. The algorithm used to generate the maze is Kruskal's.
*/
let player;
let cnv;
var rows, cols;
var w = 30;
var walls = [];
var cells = [];
var path = [];
var grid = [];
var stack = new Stack();
var pathStack = new Stack();
var maze_array;
var candi_array = [];
//these 4 variables are the inital i and j AND the ending i and j
var posX;
var posY;
var endX;
var endY;
var randomPercentage;
var immunityCounter = 0;

/*******************************************************************************
p5 setup function
*******************************************************************************/
function setup() {
  cnv = createCanvas(630, 630);
  cols = floor(width / w);
  rows = floor(height / w);
  frameRate(20);
  n = floor(width / w); //we have 21 rows and columns
  // 0  1  2  3  4  5  6  7  8  9 10 11  12 13 14 15 16 17 18 19 20
  maze_array = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //0
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], //1
    [0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0], //2
    [0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0], //3
    [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0], //4
    [0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0], //5
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0], //6
    [0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0], //7
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0], //8
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0], //9
    [0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0]
  ]; //10th row
  //0 = wall 1 =cell

  //this loop mirrors the maze_array and pushes it back into the same array
  for (var j = 9; j >= 0; j--) {
    let row = [];
    for (var i = 0; i < 9; i++) {
      row = maze_array[j];
    }
    maze_array.push(row);
  }

  //initializing grid for the game for 21x21
  for (var i = 0; i < rows; i++){
    let row = [];
    for (var j = 0; j < cols; j++){
      if (maze_array[i][j] == 0) { //this pushes in cells that are walls
          row.push(new Cell(i, j));
          row[j].isWall = true;
      }
      else{ //this pushes cells with open paths
          row.push(new Cell(i,j));
          candi_array.push(new Candi(j,i));
      }//end of else
    } //end of second loop
    grid.push(row);
  } //end of first loop

} //end of setup()

let frameCount = 0;

function draw() {

  background(255);

  for (var j = 0; j < rows; j++) {
    for (var i = 0; i < cols; i++) {
      if (grid[j][i] != undefined) {
          grid[j][i].show();
      }
    }
  }//end of first loop

  for(var k = 0; k < candi_array.length; k++){
      if(player.i == candi_array[k].i && player.j== candi_array[k].j && candi_array[k].exist ==true){
          candi_array[k].exist = false;
          player.score++;
        }
      candi_array[k].show();
  }//end of loop

  player.show();
  loopyBot.show();
  screwyBot.show();

  frameCount++;

  // can set framerate high for player, and have a high mod for bot movement
  if(frameCount % 6 == 0){
    updateScrewy();
    updateLoopy();
  }
  else  if(frameCount % 3 == 0){
    updateLoopy();
  }

  checkHealth();

  /////////////////////////////////
  //Placement of canvas
  // + Score Keeping
  var winX=(windowWidth-width)/2;
  var winY=(windowHeight-height)/2;
  cnv.position(winX,winY);

  var hungrybot=0;
  document.getElementById('health').innerHTML = player.health;
  document.getElementById('score').innerHTML = player.score;
  document.getElementById('enemy-score').innerHTML = hungrybot;
  //end
  ////////////////////////////////

} //end of draw()

// Create the bot objects below
loopyBot = new loopyBot();
loopyBot.update(5,5);
var loopyBotRandomNumber;

screwyBot = new screwyBot();
screwyBot.update(17,3);

blooeyBot = new blooeyBot();
blooeyBot.update(9,9);
var blooeyOpenQueue = new Queue();
var blooeyClosedStack = new Stack(); //might not need this
var blooeyPathQueue= new Queue();
var playerLocation;                   //******************SAME AS ENDOFMAZE********
var blooeyCurrent;  //this will hold the top of openStack value;

//Setting up Starting Ending Locations
var startNumber = Math.round(Math.random()*3); //this will find the starting cell
if (startNumber == 0 ) { //starting top left
  posX = 0;
  posY = 1;
  endX = 20;
  endY = 19;
} else if (startNumber == 1) { //starting bot left
  posX = 0;
  posY = 19;
  endX = 20;
  endY = 1;
} else if (startNumber == 2) { //starting top right
  posX = 20;
  posY = 1;
  endX = 0;
  endY = 19;
} else if (startNumber == 3) { //starting bot right
  posX = 20;
  posY = 19;
  endX = 0;
  endY = 1;
}
player = new Player(); // updates the player i and j
player.update(posX,posY);
