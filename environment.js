function Cell(i, j) {
  this.i = j;
  this.j = i;
  this.isWall = false;
  this.show = function () {
    var x = this.i * w;
    var y = this.j * w;
    if (this.isWall == true) {
      fill('black');
      rect(x, y, w, w);
    } else if (this.i >=4 && this.i <=16 && this.j >=4 && this.j <=16){
      fill('orange')
      rect(x,y,w,w);
    } else {
      fill('green');
      rect(x, y, w, w);
    }
  }
}

function Candi(i,j){
  this.i = i;
  this.j = j;
  this.randomPercentage = Math.round(Math.random()*100);
  if(this.randomPercentage <=50 && this.i !=0 && this.i !=20){
    this.exist = true;
  } else {
    this.exist = false;
  }

  this.show = function () {
    if(this.exist == true){
      var x = this.i * w + (w / 2);
      var y = this.j * w + (w / 2);
      fill('red');
      circle(x, y, w / 3.5);

    }
  }//end of show()
}
