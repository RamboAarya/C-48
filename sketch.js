var spaceShip,spaceShipimg,starryNight,starryNightimg,spaceMarineEnemy,spaceMarineEnemyimg;
var Bullet,Bulletimg,BulletGroup,EnemyGroup,score=0;
var restart,restrtimg;
var PLAY=1;
var END=0;
var gameState = PLAY;



function preload() {
  spaceShipimg=loadImage("space ship.png")
  starryNightimg=loadImage("starry-night.png")
  spaceMarineEnemyimg=loadImage("SpaceMarine Enemy.png")
  Bulletimg=loadImage("Bullet.png")
  spaceShipSound=loadSound("SpaceShipSound.mp3")
  BulletSound=loadSound("GunSound.mp3")
  restartimg=loadImage("Resetbuttonimg.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  starryNight=createSprite(width/2,height/2,width,height)
  starryNight.addImage("stars",starryNightimg)
  starryNight.scale=3
  starryNight.velocityY=1
  spaceShip=createSprite(width/2,height-100,10,10)
  spaceShip.debug=true
  spaceShip.setCollider("rectangle",0,0,150,550)
  spaceShip.addImage("Ship",spaceShipimg)
  spaceShip.scale=0.3
  BulletGroup=new Group()
  EnemyGroup=new Group()
  BulletSound.setVolume(0.05)
  restart=createSprite(width/2,height/2)
  restart.addImage("restart",restartimg)
  restart.visible=false
  restart.scale=0.6
}

function draw() {
  background(220);
  drawSprites()
  if (gameState===PLAY){
    if(keyDown(UP_ARROW)){
      spaceShip.y=spaceShip.y-4
      spaceShipSound.play()
    }
    if(keyDown(DOWN_ARROW)){
      spaceShip.y=spaceShip.y+4
      spaceShipSound.play()
    }
    if(keyDown(LEFT_ARROW)){
      spaceShip.x=spaceShip.x-4
      spaceShipSound.play()
    }
    if(keyDown(RIGHT_ARROW)){
      spaceShip.x=spaceShip.x+4
      spaceShipSound.play()
    }
    if(starryNight.y>height){
      starryNight.y=300
    }
    if(keyWentUp(UP_ARROW)||keyWentUp(LEFT_ARROW)||keyWentUp(RIGHT_ARROW)||keyWentUp(DOWN_ARROW)){
      spaceShipSound.stop()
    }
    if(keyDown("space")){
      Bullet=createSprite(spaceShip.x,spaceShip.y-85)
      Bullet.addImage("Bullet",Bulletimg)
      Bullet.scale=0.1
      Bullet.velocityY=-5
      Bullet.lifetime=height/5
      BulletGroup.add(Bullet)
      BulletSound.play()
    }
    for(var i=0;i<EnemyGroup.length;i++)
    { if (BulletGroup.get(i)!==null && BulletGroup.isTouching(EnemyGroup.get(i)))
      { EnemyGroup.get(i).destroy() 
        BulletGroup.destroyEach() 
        score=score+1 } }
    if (EnemyGroup.isTouching(spaceShip)){
    gameState=END
    }
    spawnEnemies()
  }
  else if (gameState===END){
    textSize(50)
    text("Game Over",width/3,height/3)
    EnemyGroup.setVelocityYEach(0)
    spaceShip.velocityY=0
    starryNight.velocityY=0
    EnemyGroup.setLifetimeEach(-1)
    restart.visible=true
    if(mousePressedOver(restart)){
      gameState=PLAY
      score=0
      restart.visible=false
    }

  }
   
  textSize(20)
  fill("red")
  text(score,width-60,50)

}
   function spawnEnemies(){
     if (frameCount%150===0){
    spaceMarineEnemy=createSprite(random(50,width-50),0,10,10)
    spaceMarineEnemy.addImage("Enemy",spaceMarineEnemyimg)
    spaceMarineEnemy.debug=true
    spaceMarineEnemy.setCollider("circle",0,0,250)
    spaceMarineEnemy.scale=0.16
    spaceMarineEnemy.velocity.y=2
    spaceMarineEnemy.lifetime=height/2
    EnemyGroup.add(spaceMarineEnemy)
     }
   }