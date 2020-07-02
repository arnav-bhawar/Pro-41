var canvas, backgroundImage;
var gameState;
var END = 0;
var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var cars, car1, car2, car3, car4;

var wrongcarsgroup;

var track, car1_img, car2_img, car3_img, car4_img;

function preload(){
  track = loadImage("images/track.jpg");
  car1_img = loadImage("images/car1.png");
  car2_img = loadImage("images/car2.png");
  car3_img = loadImage("images/car3.png");
  car4_img = loadImage("images/car4.png");
  ground = loadImage("images/ground.png");
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();

  wrongcarsgroup = new Group();


}


function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }

spawnwrongcars();


if(wrongcarsgroup.isTouching(cars)){
gameState = END;
}

else if (gameState === END) {
  
  
  //set velcity of each game object to 0
  car1.velocityX = 0;
  car2.velocityY = 0;
  car3.velocityY = 0;
  car4.velocityY = 0;

  wrongcarsgroup.setVelocityXEach(0);
  
  wrongcarsgroup.setLifetimeEach(-1);
  
 
}



drawsprites();
}

function spawnwrongcars() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var wrongcars = createSprite(600,120,40,10);
    wrongcars.y = Math.round(random(80,120));
    //wrongcars.addImage(car2_img);
    wrongcars.scale = 0.5;
    wrongcars.velocityX = -3;

    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: wrongcars.addImage(car2_img);
              break;
      case 2: wrongcars.addImage(car3_img);
              break;
      case 3: wrongcars.addImage(car4_img);
              break;
      
      default: break;
    } 
    
     wrongcars.lifetime = 200;    
      
        wrongcarsgroup.add(wrongcars);
  }
  
}