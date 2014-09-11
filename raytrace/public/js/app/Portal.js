define(["app/Debug"], function(Debug) {

  function Portal() {
  }

  Portal.UP = 0;
  Portal.RIGHT = 1;
  Portal.DOWN = 2;
  Portal.LEFT = 3;

  Portal.prototype.setEntrance = function(x, y, dir) {
    this.enter_x = x;
    this.enter_y = y;
    this.enter_dir = dir;
  };

  Portal.prototype.setExit = function(x, y, dir) {
    this.exit_x = x;
    this.exit_y = y;
    this.exit_dir = dir;
  };

  Portal.prototype.from = function(x,y,dir) {
    this.setEntrance(x,y,dir);
    return this;
  };

  Portal.prototype.to = function(x,y,dir) {
    this.setExit(x,y,dir);
    return this;
  };

  Portal.prototype.rayEnters = function(x, y, dx, dy) {
    //x,y are the values AFTER moving.

    // floor(x)    3
    // floor(y)    3
    // floor(x-dx) 2
    // floor(y-dy) 2
    // ceil(y)     1
    // ceil(x)     1

    /*
    if (Debug.column)
      console.log(Math.floor(y),  this.enter_y,
        Math.ceil(x), this.enter_x,
        Math.floor(x-dx), this.enter_x,
        y
      );
    */

    switch(this.enter_dir) {
      case Portal.DOWN:
        return (
        (Math.floor(x) === this.enter_x) &&
        (Math.floor(y) === (this.enter_y + 1)) &&
        (Math.floor(y-dy) === this.enter_y) &&
        true);
      case Portal.UP:
        return (
          (Math.floor(x) === this.enter_x) &&
        (Math.ceil(y) === (this.enter_y)) &&
        (Math.floor(y-dy) === (this.enter_y))
        );
      case Portal.RIGHT:
        return (
        (Math.floor(y) === this.enter_y) &&
        (Math.floor(x) === (this.enter_x + 1)) &&
        (Math.floor(x-dx) === this.enter_x) &&
        (y%1!=0) &&
        true);
      case Portal.LEFT:
        return (
        (Math.floor(y) === this.enter_y) &&
        (Math.ceil(x) === (this.enter_x)) &&
        (Math.floor(x-dx) === (this.enter_x)) &&
        (y%1!=0)&&
        true);
    }
    console.warn("Portal has invalid direction");
    return false;
  };

  Portal.prototype.cross = function(x, y, dir, dist) {
    var delta_angle = (this.exit_dir - this.enter_dir) * Math.PI/2;
    var cos = Math.cos(delta_angle), sin = Math.sin(delta_angle);
    var offset_x = x - this.enter_x -0.5 //((x%1)-0.5),
        offset_y = y - this.enter_y-0.5//((y%1)-0.5);
    var newX = this.exit_x +  offset_x * cos + offset_y * -sin + 0.5;
    var newY = this.exit_y +  offset_x * sin + offset_y * cos  + 0.5;
    ///newX += Math.sin( + new Date()/2000)-1;
    //newX += cos
    //newY += sin
    return {
      x: newX,
      y: newY,
      dir: dir + delta_angle
    };

    /*return {
      x: 6 + x%1,//3 + (1 - y%1),
      y: 7 + y%1,//3 + (    x%1),
      dir: dir// + Math.PI/2
    };*/
    // Project the movement through the portal and
    // return the resulting x, y, dx, dy
  };

  return Portal;
});

