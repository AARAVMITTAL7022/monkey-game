var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var survivalTime;

function preload(){
  
 monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(600,600);
  
  monkey= createSprite(80,315,20,20);
  monkey.addAnimation('moving', monkey_running);
  monkey.scale=0.1;
  
  ground= createSprite(400,350,1800,10);
  ground.velocityX= -4;
  ground.x= ground.width/2;
  console.log(ground.x);

  bananaGroup = createGroup();
  obstacleGroup= createGroup();
  
  survivalTime=0;
}

function draw() {
  background(180);
  
  text('survivalTime: '+survivalTime,500,50);
  
  ground.velocityX= -(4+ 3* survivalTime/100);
  
  survivalTime= survivalTime+ Math.round(getFrameRate()/60);
  
  if(ground.x<0){
    ground.x= ground.width/2;
  }
  
  if(keyDown('space')&& monkey.y>=100){
    monkey.velocityY= -12;
  }
  
  monkey.velocityY= monkey.velocityY+ 0.8;
  
  spawnObstacle();
  spawnBanana();
  
  monkey.collide(ground);

 
  obstacleGroup.depth = monkey.depth
  monkey.depth = monkey.depth + 1;
  
    drawSprites();
  
}

function spawnObstacle(){
  if(frameCount % 300===0){
    var obstacle= createSprite(300,328,10,40);
    obstacle.velocityX= -(4+ survivalTime/100);
    obstacle.addImage('obstacle', obstacleImage);
    obstacle.scale= 0.1;
    obstacle.lifetime= 600;
    obstacleGroup.add(obstacle);
  }
}

function spawnBanana(){
  if(frameCount % 80===0){
    var banana = createSprite(300,120,40,10);
    banana.y= Math.round(random(80,200));
    banana.addImage('banana', bananaImage);
    banana.scale= 0.1;
    banana.velocityX= -(3 + survivalTime/100);
    banana.lifetime= 600; 
    
    bananaGroup.add(banana);
  }
}




