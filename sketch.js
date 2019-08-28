let drone_sprite;
let guy_sprite1;
let guy_sprite2;
let guy_sprite3;

let drone_audio;
let birdnoise;
let music;

let d;
let guy;
let target;
let prelogo;

let right = 0;
let left = 0;
let up = 0;
let down = 0;
let turbo = 0;
let stop = 0;

function value_limit(val, min, max) {
  return val < min ? min : (val > max ? max : val);
}

function preload() {
  drone_sprite = loadImage("assets/sprites/d.png");
  guy_sprite1 = loadImage("assets/sprites/RedHackerGuy.png");
  guy_sprite2 = loadImage("assets/sprites/RedHackerGuy_HandsUp.png");
  guy_sprite3 = loadImage("assets/sprites/RedHackerGuy_HeadDown.png");
  logo = loadImage("assets/sprites/logo-pixelated.png");

  drone_audio = loadSound("assets/audio/drone.ogg");
  birdnoise = loadSound("assets/audio/birdnoise.ogg");
  music = loadSound("assets/audio/town.ogg");

  pixel_font = loadFont("assets/fonts/joystix monospace.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  d = new Drone();
  guy = new Animation(guy_sprite1, guy_sprite2, guy_sprite3);
  target = createVector(windowWidth/2 - 50, windowHeight/2 - 80);

  birdnoise.setVolume(0.1);
  birdnoise.loop();
  music.setVolume(0.2);
  music.loop();
  drone_audio.loop();
  drone_audio.playMode('restart');
}
 
function draw() {
  background(255);
  textFont(pixel_font);
  textSize(124);
  textStyle(BOLD);
  textAlign(CENTER);

  // drone sfx
  drone_audio.setVolume(0.05 + 0.05 * (d.velocity.mag()/12));

  // music fx
  let speedup = 5000 / Math.pow(dist(d.position.x, d.position.y, target.x, target.y), 2);
  speedup = value_limit(speedup, 0, 2);
  // console.log(speedup);
  music.rate(1 + speedup);


  // image(logo, windowWidth / 2 - logo.width / 2, windowHeight / 2 - logo.height / 2);
  prelogo = pixel_font.textBounds('EITC', windowWidth / 2, windowHeight / 2);
  noFill();
  rect(prelogo.x, prelogo.y, prelogo.w, prelogo.h);
  fill(50);
  text('EITC', windowWidth / 2, windowHeight / 2);
  
  guy.animate(
    0.1,
    20,
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
