define(["app/Bitmap"], function(Bitmap) {

  function Player(x, y, direction) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.weapon = new Bitmap('./assets/knife_hand.png', 319, 320);
    this.paces = 0;
  }

  Player.prototype.rotate = function(angle) {
    this.direction = (this.direction + angle + CIRCLE) % (CIRCLE);
  };

  Player.prototype.walk = function(distance, map, sideStep) {
    sideStep = (sideStep | 0) * Math.PI/2;

    var dx = Math.cos(this.direction+sideStep) * distance;
    var dy = Math.sin(this.direction+sideStep) * distance;
    if (map.get(this.x + dx, this.y) <= 0) this.x += dx;
    if (map.get(this.x, this.y + dy) <= 0) this.y += dy;

    if (Math.floor(this.x) == 7  && Math.floor(this.y) ==7) {
      if (Math.floor(this.x - dx) == 6) {
        this.x -= 6;
        this.y-=6;
      }
    }
    this.paces += distance;
  };

  Player.prototype.update = function(controls, map, seconds) {
    if (controls.left) this.rotate(-Math.PI * seconds);
    if (controls.right) this.rotate(Math.PI * seconds);
    if (controls.forward) this.walk(3 * seconds, map);
    if (controls.backward) this.walk(-3 * seconds, map);

    if (controls.stepLeft) this.walk(3 * seconds, map, -1);
    if (controls.stepRight) this.walk(3 * seconds, map, 1);
  };

  return Player;
});

