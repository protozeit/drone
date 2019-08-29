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

let up_rectx;
let up_recty;
let up_rectw;
let up_recth;

let down_rectx;
let down_recty;
let down_rectw;
let down_recth;

let right_rectx;
let right_recty;
let right_rectw;
let right_recth;

let left_rectx;
let left_recty;
let left_rectw;
let left_recth;


let right = 0;
let left = 0;
let up = 0;
let down = 0;
let turbo = 0;
let stop = 0;

let stage2_trigger = 0;
let stage2 = 0;

function value_limit(val, min, max) {
  return val < min ? min : (val > max ? max : val);
}

function birdnoise_loaded() {
  birdnoise.setVolume(0.1);
  birdnoise.loop();
}

function music_loaded() {
  music.setVolume(0.2);
  music.loop();
}

function preload() {
  drone_sprite = loadImage("assets/sprites/d.png");
  guy_sprite1 = loadImage("assets/sprites/RedHackerGuy.png");
  guy_sprite2 = loadImage("assets/sprites/RedHackerGuy_HandsUp.png");
  guy_sprite3 = loadImage("assets/sprites/RedHackerGuy_HeadDown.png");
  logo = loadImage("assets/sprites/logo.png");

  drone_audio = loadSound("assets/audio/drone.ogg");

  pixel_font = loadFont("assets/fonts/joystix monospace.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(pixel_font);
  textSize(124);
  textStyle(BOLD);
  textAlign(CENTER);

  birdnoise = loadSound("assets/audio/birdnoise.ogg", birdnoise_loaded);
  music = loadSound("assets/audio/town.ogg", music_loaded);

  d = new Drone();
  guy = new Animation(guy_sprite1, guy_sprite2, guy_sprite3);
  
  setup_logo();

  drone_audio.loop();
  drone_audio.playMode('restart');
}
 
function draw() {

  dynamic_effects();

  // optional hitboxes here
  // noFill();
  // rect(prelogo.x, prelogo.y, prelogo.w, prelogo.h);
  // rect(up_rectx, up_recty, up_rectw, up_recth);
  // rect(down_rectx, down_recty, down_rectw, down_recth);
  // rect(left_rectx, left_recty, left_rectw, left_recth);
  // rect(right_rectx, right_recty, right_rectw, right_recth);

  fill(0);
  if (stage2){
  	image(logo, windowWidth / 2 - logo.width / 2, (windowHeight / 2 - logo.height / 2) - 70);
  }
  else
  	text('EITC', windowWidth / 2, windowHeight / 2);
  
  guy.animate(
    0.1,
    20,
    windowHeight - guy_sprite1.height * 0.15,
    guy_sprite1.width * 0.15,
    guy_sprite1.height * 0.15
  );

  d.update();
  d.show();

  if (stage2_trigger){
  	push();
  	filter(INVERT);
  	setTimeout(function() {pop(); stage2_trigger = 0;}, 500);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setup_logo();
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

function setup_logo() {
  target = createVector(windowWidth/2 - 70, windowHeight/2 - 72);
  prelogo = pixel_font.textBounds('EITC', windowWidth / 2, windowHeight / 2);
  // padding
  prelogo.x -= 5;
  prelogo.y -= 5;
  prelogo.w += 10;
  prelogo.h += 10;

  up_rectx = prelogo.x;
  up_recty = 0;
  up_rectw = prelogo.w;
  up_recth = prelogo.y;

  down_rectx = prelogo.x;
  down_recty = prelogo.y + prelogo.h;
  down_rectw = prelogo.w;
  down_recth = windowHeight - (prelogo.y + prelogo.h);

  right_rectx = prelogo.x + prelogo.w;
  right_recty = prelogo.y;
  right_rectw = windowWidth - (prelogo.x + prelogo.w);
  right_recth = prelogo.h;

  left_rectx = 0;
  left_recty = prelogo.y;
  left_rectw = prelogo.x;
  left_recth = prelogo.h;
}

function dynamic_effects() {
  let speedup;

  if (!stage2) {
    // background fade
    let fade = 100000 / Math.pow(dist(d.position.x, d.position.y, target.x, target.y), 2);
    fade = value_limit(fade, 0, 100);
    background(255 - fade);
  
    // music fx
    speedup = 100000 / Math.pow(dist(d.position.x, d.position.y, target.x, target.y), 3);
    speedup = value_limit(speedup, 0, 2);

  } else {
  	background(255);
  	speedup = 0
  }

  drone_audio.setVolume(0.05 + 0.05 * (d.velocity.mag()/12));
  music.rate(1 + speedup);
}