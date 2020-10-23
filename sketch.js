var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score, survialTime;
var ground;



function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  //Banana
  bananaImage = loadImage("banana.png");
  //Obstacle
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  createCanvas(400,400);
  monkey = createSprite(50, 250, 10, 10);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.1;
  
  survialTime = 0;
 
  foodGroup = createGroup();
  obstacleGroup = createGroup();
 
  
  ground = createSprite(70, 350, 800, 10);
  ground.velocityX = -4;
  ground.x=ground.width/2;

  score = 0;
  
  
}


function draw() {
  
  //Background
  background (250);
  
  monkey.collide(ground);
   
  
  text("Survial Time:"+  survialTime, 100, 50);
 
  text("Score:"+  score, 300, 100);
  
 
  
  
  if(gameState === PLAY){
      monkey.changeAnimation("running", monkey_running);
    
    survialTime = Math.ceil(frameCount/frameRate());
     
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")) {
        monkey.velocityY = -12;
    }    
    
    if(foodGroup.isTouching(monkey)) {
      foodGroup.destroyEach();
      score = score+1;
    }
   
  //Gravity
  monkey.velocityY = monkey.velocityY + 0.8;
  
    
  
  
  //groups lifetime
  obstacleGroup.setLifetimeEach(-1);
  
  //Adding Functions
  spawnfood();
  spawnobstacles();
    
    
      
    
    
    if(obstacleGroup.isTouching(monkey)){
        
        gameState = END;
      
    }
  }
  //END
   if (gameState === END) {
     obstacleGroup.destroyEach();
    foodGroup.destroyEach();
     survialTime.visible = false;
     monkey.visible = false;
     

     
     text("Game Over", 110, 200);
     
     
     
      
   }
 
  
  
 

  //draw Sprites
  drawSprites();
}

//Banana
function spawnfood() {
  if (frameCount % 80 === 0) {
    banana = createSprite(400,350,40,10);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(120,200));
    banana.scale = 0.1; 
    banana.velocityX = -3;
    banana.lifetime = 200;
    
    foodGroup.add(banana);
  }
}

//Obstacles
function spawnobstacles() {
  if (frameCount % 300 === 0){
    obstacle = createSprite(250,325,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -3;
    obstacle.lifetime = 200;
    obstacle.scale = 0.1 ;
    
    
    obstacleGroup.add(obstacle);
  }

}


 
 


