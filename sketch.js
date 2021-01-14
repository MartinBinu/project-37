var bg, bgImage;
var ig;
var monkey, monkeyRunning,monkeyCrash;
var BananaGroup,bannanaImage;
var ObstacleGroup,RockGroup,obstacleImage2;
var score = 0;
var bananaCount = 0;

function preload(){
  
  bgImage = loadImage("pic/jungle2.jpg");
  
  monkeyRunning = loadAnimation("pic/Monkey_01.png","pic/Monkey_02.png","pic/Monkey_03.png","pic/Monkey_04.png","pic/Monkey_05.png","pic/Monkey_06.png","pic/Monkey_07.png","pic/Monkey_08.png","pic/Monkey_09.png","pic/Monkey_10.png");

  monkeyCrash = loadAnimation("pic/Monkey_01.png");
  
  bananaImage = loadImage("pic/Banana.png");
  
  obstacleImage = loadImage("pic/stone.png");
  
}

function setup() {
  
   createCanvas(displayWidth,displayHeight - 100);

   bg = createSprite(displayWidth/2,displayHeight/2)
   bg.addImage("bg",bgImage);
   bg.width = displayWidth + 100;
   bg.scale = 1.5;
  
   monkey = createSprite(80,400);
   monkey.addAnimation("monkeyRunning",monkeyRunning);
   monkey.scale = 0.1;
  
   ig = createSprite(200,650,400,30);
   ig.visible = false;
  
   BananaGroup = new Group();
  
   ObstacleGroup = new Group();
  
   RockGroup = new Group();
  
}

function draw() {
   background("green");
  
   edges = createEdgeSprites(); 
    
   bg.velocityX = -(3 + 50*score/100);

   //camera.position.x = displayWidth/2;
   //camera.position.y = monkey.y;

   monkey.collide(ig);
   monkey.collide(edges[2]);
   monkey.scale = 0.1 + bananaCount/100;
  
   monkey.velocityY = monkey.velocityY + 0.6;
  
   if(keyDown("space")){
      monkey.velocityY = -5;
   }
  
   if(bg.x < 612){
      bg.x = displayWidth - 700;
   }
  
   if(monkey.isTouching(BananaGroup)){
      BananaGroup.destroyEach();
      score = score + 1;
      bananaCount = bananaCount + 1;
   }
      
   if(monkey.isTouching(ObstacleGroup)){
      bananaCount = 0;
      ObstacleGroup.visible = false;
   }
    
   spawnBananas();
   spawnObstacles();
    
   drawSprites();
 
   text("Banana Count: " + bananaCount,10,20)
  
}


function spawnBananas() {
  
   if(frameCount % 90 === 0){ 
      var banana = createSprite(displayWidth + 10,300); 
      banana.addImage("banana_1",bananaImage);
      banana.scale = 0.03;
      banana.velocityX = -(3 + 110*score/100)
      banana.y = Math.round(random(100,600));
      banana.lifetime = -1;
      BananaGroup.add(banana); 
  }

}
  
function spawnObstacles() {
  
   if(frameCount % 60 === 0){ 
      var obstacles = createSprite(displayWidth + 10,350); 
      obstacles.addImage("stone",obstacleImage);
      obstacles.scale = 0.1;
      obstacles.velocityX = -(3 + 50*score/100);
      obstacles.y = Math.round(random(100,650));
      obstacles.lifetime = -1;
      ObstacleGroup.add(obstacles);
    }
}
