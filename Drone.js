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
		this.acceleration.x = (right - left) * this.speed;
		this.acceleration.y = (down - up) * this.speed;

		// Add air resistance
		let v = this.velocity.mag();
		let dragMagnitude = this.c * v;
		let dragForce = this.velocity.copy();
		dragForce.mult(-1);
		dragForce.mult(dragMagnitude);

		this.acceleration.add(dragForce);

		//collision detection
		if (this.position.x < 0 || this.position.x > windowWidth - drone_sprite.width*this.scale) {
			this.velocity.x = -this.velocity.x;
			left = 0;
			right = 0;
		}
		if (this.position.y < 0 || this.position.y > windowHeight - drone_sprite.height*this.scale) {
			this.velocity.y = -this.velocity.y;
			up = 0;
			down = 0;
		}

		// propagate acceleration to movement
		this.velocity.add(this.acceleration);
		this.position.add(this.velocity);
		
		// speed limit
		this.velocity.limit(20);

		this.acceleration.mult(0);
	}

	this.show = () => {
		image(drone_sprite, this.position.x, this.position.y, drone_sprite.width*this.scale, drone_sprite.height*this.scale);
	}
}