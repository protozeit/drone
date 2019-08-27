function Drone() {
	this.position = createVector(windowWidth / 2, windowHeight / 2);
  	this.velocity = createVector(0.1, 0);
  	this.acceleration = createVector(0, 0);
  	// sprite size
  	this.scale = 0.1;
  	// air resitance
  	this.c = 0.02;
  	// movement speed
  	this.speed = 2.5;
	

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
			up = 0;
			down = 0;
			turbo = 0
		}

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

	this.show = () => {
		image(drone_sprite, this.position.x, this.position.y, drone_sprite.width*this.scale, drone_sprite.height*this.scale);
	}
}