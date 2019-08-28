function Drone() {
	this.position = createVector(80, windowHeight - 120);
  	this.velocity = createVector(0.1, 0);
  	this.acceleration = createVector(0, 0);
  	this.logo_side = createVector(0,0);
  	// sprite size
  	this.scale = 0.1;
  	// air resitance
  	this.c = 0.02;
  	// movement speed
  	this.speed = 2;
	

	this.update = () => {
		// Player input
		this.acceleration.x = ((right - left) * (turbo+1) * this.speed) * (stop ^ 1);
		this.acceleration.y = ((down - up) * (turbo+1) * this.speed) * (stop ^ 1);

		// Add air resistance
		let v = this.velocity.mag();
		let dragMagnitude = this.c * v;
		let dragForce = this.velocity.copy();
		dragForce.mult(-1);
		dragForce.mult(dragMagnitude);

		this.acceleration.add(dragForce);

		// Collision detection
		this.wall_collision();
		this.logo_collision();
		this.update_logo_side();

		/*
		let away = dist(this.position.x, this.position.y, target.x, target.y);

		if (away < 60) {
			this.velocity.x = random(-80, 80);
			this.velocity.y = random(-80, 80);
		}
		*/

		// propagate acceleration to movement
		this.velocity.add(this.acceleration);
		this.position.add(this.velocity);

		// brake
		if (stop)
			this.velocity.mult(0.85);
		
		// speed limit
		this.velocity.limit(12);

		this.acceleration.mult(0);
	}

	this.wall_collision = () => {	

		if (this.position.x < 0) { 
			this.position.x = 0;
			this.velocity.x = -this.velocity.x;
			left = 0;
			right = 0;
			turbo = 0;
		}
		if (this.position.x > windowWidth - drone_sprite.width*this.scale) {
			this.position.x = windowWidth - drone_sprite.width*this.scale;
			this.velocity.x = -this.velocity.x;
			left = 0;
			right = 0;
			turbo = 0;
		}
		if (this.position.y < 0) { 
			this.position.y = 0;
			this.velocity.y = -this.velocity.y;
			up = 0;
			down = 0;
			turbo = 0;
		}
		if (this.position.y > windowHeight - drone_sprite.height*this.scale) {
			this.position.y = windowHeight - drone_sprite.height*this.scale;
			// no bounce on the ground
			// this.velocity.y = -this.velocity.y;
			// up = 0;
			// down = 0;
			turbo = 0
		}
	}

	this.logo_collision = () => {
		if (collideRectRect(this.position.x, this.position.y, drone_sprite.width*this.scale, drone_sprite.height*this.scale, prelogo.x, prelogo.y, prelogo.w, prelogo.h)) {
			if (this.logo_side.y === -1) {
				this.position.y = prelogo.y - drone_sprite.height*this.scale;
				turbo = 0;
				return;
			}
			if (this.logo_side.y === 1) {
				this.position.y = prelogo.y + prelogo.h;
				turbo = 0;
				return;
			}
			if (this.logo_side.x === -1) {
				this.position.x = prelogo.x - drone_sprite.width*this.scale;
				turbo = 0;
				return;
			}
			if (this.logo_side.x === 1) {
				this.position.x = prelogo.x + prelogo.w;
				turbo = 0;
				return;
			}
		}
	}

	this.update_logo_side = () => {

		this.logo_side.mult(0);
		if (collideRectRect(this.position.x, this.position.y, drone_sprite.width*this.scale, drone_sprite.height*this.scale, up_rectx, up_recty, up_rectw, up_recth))
			this.logo_side.y = -1;
		if (collideRectRect(this.position.x, this.position.y, drone_sprite.width*this.scale, drone_sprite.height*this.scale, down_rectx, down_recty, down_rectw, down_recth))
			this.logo_side.y = 1;
		if (collideRectRect(this.position.x, this.position.y, drone_sprite.width*this.scale, drone_sprite.height*this.scale, left_rectx, left_recty, left_rectw, left_recth))
			this.logo_side.x = -1;
		if (collideRectRect(this.position.x, this.position.y, drone_sprite.width*this.scale, drone_sprite.height*this.scale, right_rectx, right_recty, right_rectw, right_recth))
			this.logo_side.x = 1;

	}

	this.show = () => {
		image(drone_sprite, this.position.x, this.position.y, drone_sprite.width*this.scale, drone_sprite.height*this.scale);
	}
}

function collideRectRect(x, y, w, h, x2, y2, w2, h2) {
  //2d
  //add in a thing to detect rectMode CENTER
  if (x + w >= x2 &&    // r1 right edge past r2 left
      x <= x2 + w2 &&    // r1 left edge past r2 right
      y + h >= y2 &&    // r1 top edge past r2 bottom
      y <= y2 + h2) {    // r1 bottom edge past r2 top
        return true;
  }
  return false;
};