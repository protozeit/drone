function Animation(...sprite_array) {
  this.sprite_array = sprite_array;
  this.animation_index = 0;

  this.animate = (animation_speed, x, y, w, h) => {
    let current_frame = floor(this.animation_index % this.sprite_array.length);
    image(this.sprite_array[current_frame], x, y, w, h);
    this.animation_index += animation_speed;
  };
}
