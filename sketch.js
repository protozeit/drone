let drone_sprite;
let guy_sprite1;
let guy_sprite2;
let guy_sprite3;

let drone_audio;
let birdnoise;

let d;
let guy;

let right = 0;
let left = 0;
let up = 0;
let down = 0;
let turbo = 0;
let stop = 0;

function preload() {
  drone_sprite = loadImage("assets/sprites/d.png");
  guy_sprite1 = loadImage("assets/sprites/RedHackerGuy.png");
  guy_sprite2 = loadImage("assets/sprites/RedHackerGuy_HandsUp.png");
  guy_sprite3 = loadImage("assets/sprites/RedHackerGuy_HeadDown.png");
  logo = loadImage("assets/sprites/logo-pixelated.png");

  drone_audio = loadSound("assets/audio/drone.ogg");
  birdnoise = loadSound("assets/audio/birdnoise.ogg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  d = new Drone();
  guy = new Animation(guy_sprite1, guy_sprite2, guy_sprite3);
  birdnoise.setVolume(0.2);
  birdnoise.loop();
}
 
function draw() {
  background(255);
  // drone sfx
  drone_audio.play();
  drone_audio.setVolume(0.02 + 0.02 * (d.velocity.mag()/12))


  image(logo, windowWidth / 2 - logo.width / 2, windowHeight / 2 - logo.height / 2);
  guy.animate(
    0.1,
    10,
    windowHeight - guy_sprite1.height * 0.15,
    guy_sprite1.width * 0.15,
    guy_sprite1.height * 0.15
  );
  d.update();
  // console.log(stop);
  d.show();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    up = 1;
  }
  if (keyCode === DOWN_ARROW) {
    down = 1;
  }
  if (keyCode === LEFT_ARROW) {
    left = 1;
  }
  if (keyCode === RIGHT_ARROW) {
    right = 1;
  }
  if (keyCode === SHIFT) {
    turbo = 3;
  }
  if (keyCode === 83) { // S key
  	stop = 1;
  }
}

function keyReleased() {
  if (keyCode === UP_ARROW) {
    up = 0;
  }
  if (keyCode === DOWN_ARROW) {
    down = 0;
  }
  if (keyCode === LEFT_ARROW) {
    left = 0;
  }
  if (keyCode === RIGHT_ARROW) {
    right = 0;
  }
  if (keyCode === SHIFT) {
    turbo = 0;
  }
  if (keyCode === 83) { // S key
  	stop = 0;
  }
}
