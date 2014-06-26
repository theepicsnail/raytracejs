define(["app/Bitmap", "app/Debug"], function(Bitmap, Debug) {

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

    var dir = this.direction + sideStep;

    var end = map.move(this.x, this.y, dir, distance);

    this.x = end.x;
    this.y = end.y;
    this.direction = end.dir - sideStep;
    this.paces += distance;
  };

  Player.prototype.update = function(controls, map, seconds) {
    if (controls.left) this.rotate(-Math.PI * seconds);
    if (controls.right) this.rotate(Math.PI * seconds);
    if (controls.forward) this.walk(3 * seconds, map);
    if (controls.backward) this.walk(-3 * seconds, map);

    if (controls.stepLeft) this.walk(3 * seconds, map, -1);
    if (controls.stepRight) this.walk(3 * seconds, map, 1);

    if (Debug.enabled)
      console.log(this);
  };

  return Player;
});

