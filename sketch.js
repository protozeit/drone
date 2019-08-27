let drone_sprite;
let guy_sprite1;
let guy_sprite2;
let guy_sprite3;
let guy_animation;
let animation_speed = 0.1;
let animation_index = 0;
let d;
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
  guy_animation = [guy_sprite1, guy_sprite2, guy_sprite3];
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  d = new Drone();
}

function draw() {
  background(255);
  let current_frame = floor(animation_index % guy_animation.length);
  image(guy_animation[current_frame], 10, windowHeight - guy_sprite1.height*0.15, guy_sprite1.width*0.15, guy_sprite1.height*0.15 )
  image(logo, windowWidth/2 - (logo.width/2), 10);
  d.update();
  d.show();
  animation_index += animation_speed;
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

function Drone() {
	this.position = createVector(windowWidth / 2, windowHeight / 2);
  	this.velocity = createVector(0.1, 0);
  	this.acceleration = createVector(0, 0);
  	this.c = 0.02;
  	this.speed = 2.5;
	

	this.update = () => {
		// Player input
		
		this.acceleration.x = (right - left) * this.speed;
		this.acceleration.y = (down - up) * this.speed;

		// Add air resistance
		let speed = this.velocity.mag();
		let dragMagnitude = this.c * speed;

		// Direction is inverse of velocity
		let dragForce = this.velocity.copy();
		dragForce.mult(-1);

		// Scale according to magnitude
		// dragForce.setMag(dragMagnitude);
		// dragForce.normalize();
		dragForce.mult(dragMagnitude);

		this.acceleration.add(dragForce);

		this.velocity.add(this.acceleration);
		this.position.add(this.velocity);
		
		this.velocity.limit(10);
		this.acceleration.mult(0);

		//collision detection
		if (this.position.x < 0 || this.position.x > windowWidth) {
			this.velocity.x = -this.velocity.x;
			left = 0;
			right = 0;
		}
		if (this.position.y < 0 || this.position.y > windowHeight) {
			this.velocity.y = -this.velocity.y;
			up = 0;
			down = 0;
		}
	}

	this.show = () => {
		image(drone_sprite, this.position.x, this.position.y, drone_sprite.width*0.1, drone_sprite.height*0.1);
	}
}