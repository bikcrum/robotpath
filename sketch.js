var division = {
  x : 5,
  y : 5
};

var paths = [];
var canvas_size;
var i = 0;
function setup() {
  canvas_size = min(windowWidth,windowHeight);
  createCanvas(canvas_size,canvas_size);
  
  paths = getPaths(0,0,division.x-1,division.y-1);
  frameRate(10);
}

function draw() {
  background(50);
 
  createGrid();
  
 // locateMouse();

 // activeGrid(0,0);
//  activeGrid( division.x - 1,division.y - 1);

  tracePath(paths[i]);
  
  i = (i + 1) % paths.length;

}
function getPathsUtil(x,y,p,q,locations,paths,c){
  if(x > p || x < 0 || y > q || y < 0) return;

  locations[c] = [x,y]
  
  if(x== p && y == q){
    paths.push(subset(locations,0,c+1));
    c = 0;
    return;
  }
  getPathsUtil(x+1,y,p,q,locations,paths,c+1);
  getPathsUtil(x,y+1,p,q,locations,paths,c+1);
  getPathsUtil(x+1,y+1,p,q,locations,paths,c+1);
  
}
function  getPaths(x,y,p,q){
  var locations = []
  var paths = []
  getPathsUtil(x,y,p,q,locations,paths,0);
  
  return paths;
}

function tracePath(locations){
  stroke(255);
  strokeWeight(5);
  for(var i =0;i<locations.length - 1;i++){
     var one_division_x = (canvas_size) / division.x;
   var one_division_y = (canvas_size) / division.y;
    
   line(locations[i][0]*one_division_x+one_division_x/2,locations[i][1]*one_division_y+one_division_y/2,locations[i+1][0]*one_division_x+one_division_x/2,locations[i+1][1]*one_division_y+one_division_y/2);
  }
}


function activeGrid(x,y){
  var one_division_x = (canvas_size) / division.x;
   var one_division_y = (canvas_size) / division.y;
   noStroke();
   fill(200);
   //rect(x*one_division_x,y*one_division_y,one_division_x,one_division_y);
   stroke(255,255,0);
   line(x*one_division_x,y*one_division_y,x*one_division_x+one_division_x,y*one_division_y+one_division_y);
}
/*
function locateMouse(){
   var one_division_x = (canvas_size) / division.x;
   var one_division_y = (canvas_size) / division.y;
   noStroke();
   fill(200);
  rect(int(mouseX / one_division_x) * one_division_x,int(mouseY / one_division_y) * one_division_y,one_division_x,one_division_y);
}

*/
function createGrid(){
   stroke(0);
   strokeWeight(2);
  var one_division_x = (canvas_size) / division.x;
  for(var i = 0 ; i < division.x ; i++){
    stroke(255);
    line( i * one_division_x,0,i * one_division_x,height);
  }
  
  var one_division_y = (canvas_size) / division.y;
  for(i = 0 ; i < division.y ; i++){
    stroke(255);
    line( 0,i * one_division_y,height,i * one_division_y);
  }
}
