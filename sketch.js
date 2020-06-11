//Global Variables
var player, BananasGroup, bananaImage, StonesGroup, playerScore, ground, gameOver, restart;


var player_running, background1, backgroundImage, stone_image, groundImage, gameOver, restart;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload() {
  backgroundImage = loadImage("jungle2.jpg");

  player_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

  groundImage = loadImage("ground.jpg");
  bananaImage = loadImage("Bananas.png");
  stone_image = loadImage("stone.png");
}


function setup() {
  createCanvas(600, 300);


  ground = createSprite(200, 150, 400, 20);
  ground.addImage("ground", groundImage);
  ground.velocityX = -4;
  ground.scale = 0.5;
  background1 = createSprite(200, 150, 400, 20);
  background1.addImage("backImage", backgroundImage);
  background1.velocityX = -4;
  background1.scale = 0.6;





  player = createSprite(300, 220, 400, 20);
  player.addAnimation("running", player_running);
  player.scale = 0.15;


  BananasGroup = new Group();
  StonesGroup = new Group();


  background1.x = ground.width / 2;
  ground.x = background1.width / 2;
  playerScore = 0;

}


function draw() {
  background(255);
  edges = createEdgeSprites();


  if (gameState === PLAY) {

    if (keyDown(LEFT_ARROW)) {
      player.x = player.x - 20;
    }
    if (keyDown(RIGHT_ARROW)) {
      player.x = player.x + 20;
    }

    if (background1.x < 0) {
      background1.x = ground.width;
    }

    if (ground.x < 0) {
      ground.x = background1.width;
    }
    if (StonesGroup.isTouching(edges[3])) {
      StonesGroup.destroyEach();
    }
    
    if (BananasGroup.isTouching(player)) {
      BananasGroup.destroyEach();
      playerScore = playerScore + 2;
    }

    if (playerScore > 0 && playerScore % 10 === 0) {
      switch (playerScore) {
        case 10:
          player.scale = player.scale + 0.26;
          break;
        case 20:
          player.scale = player.scale + 0.1;
          break;
        case 30:
          player.scale = player.scale + 0.2;
          break;
        case 40:
          player.scale = player.scale + 0.15;
          break;
        case 50:
          player.scale = player.scale + 0.23;
          break;

        default:
          break;
      }
    }


    banana();
    obstacles();
  } else if (gameState === END) {
    player.changeAnimation("Monkey.png");
    BananasGroup.setVelocityYEach(0);
    StonesGroup.setVelocityYEach(0);
    BananasGroup.setLifetimeEach(-1);
    StonesGroup.setLifetimeEach(-1);
    background1.velocityX = 0;
    ground.velocityX = 0;

  }
  if (StonesGroup.isTouching(player)) {
    gameState = END;
  }

  console.log(background1.x);

  drawSprites();
  stroke("blue");
  textSize(17);
  fill("blue");
  text("score:" + playerScore, 500, 50);

}

function obstacles() {
  if (frameCount % 60 === 0) {
    var stone = createSprite(random(100, 600), 55, 10, 40);
    stone.addAnimation("stone", stone_image);
    stone.scale = 0.1;
    stone.velocityY = +(2 + 1 * playerScore / 10);
    stone.lifetime = 1000;
    StonesGroup.add(stone);
  }
}

function banana() {
  if (frameCount % 60 === 0) {
    var banana = createSprite(random(100, 600), 50, 10, 40);
    banana.addAnimation("bananafalling", bananaImage);
    banana.scale = 0.01;
    banana.velocityY = +(2 + 1 * playerScore / 10);
    banana.lifetime = 1000;
    BananasGroup.add(banana);
  }
}