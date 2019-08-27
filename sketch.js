let drone_sprite;
let guy_sprite1;
let guy_sprite2;
let guy_sprite3;

let d;
let guy;

let right = 0;
let left = 0;
let up = 0;
let down = 0;

function preload(){
  drone_sprite = loadImage('sprites/colored_drone.png');
  guy_sprite1 = loadImage('sprites/TheGuy.png');
  guy_sprite2 = loadImage('sprites/hands_up.png');
  guy_sprite3 = loadImage('sprites/head_down.png');
  logo = loadImage('sprites/logo-pixelated.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  d = new Drone();
  guy = new Animation(...[guy_sprite1, guy_sprite2, guy_sprite3]);
}

function draw() {
  
  background(255);
  image(logo, windowWidth/2 - (logo.width/2), 10);
  guy.animate(0.1, 10, windowHeight - guy_sprite1.height*0.15, guy_sprite1.width*0.15, guy_sprite1.height*0.15)
  d.update();
  d.show();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
	if (keyCode === UP_ARROW){
		up = 1;
	}
	if (keyCode === DOWN_ARROW){
		down = 1;
	}
	if (keyCode === LEFT_ARROW){
		left = 1;
	}
	if (keyCode === RIGHT_ARROW){
		right = 1;
	}
}

function keyReleased() {
	if (keyCode === UP_ARROW){
		up = 0;
	}
	if (keyCode === DOWN_ARROW){
		down = 0;
	}
	if (keyCode === LEFT_ARROW){
		left = 0;
	}
	if (keyCode === RIGHT_ARROW){
		right = 0;
	}
}