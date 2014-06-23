define([], function() {


  function Portal() {
  }

  Portal.prototype.setEntrance = function(x, y, dir) {

  };

  Portal.prototype.setExit = function(x, y, dir) {

  };

  Portal.prototype.rayEnters = function(x, y, dx, dy) {
    //x,y are the values AFTER moving.
    var DOWN = 0;

    var enter_x = 7;
    var enter_y =8;
    var enter_dir = DOWN;

    switch(enter_dir) {
      case DOWN:
        return (Math.floor(x) === enter_x) && (Math.floor(y) === (enter_y + 1)) && (Math.floor(y-dy) === enter_y);

    }
    console.warn("Portal has invalid direction");
    return false;
  };

  Portal.prototype.cross = function(x, y, dir, dist) {
    var delta_angle = 0;// +new Date()/2000;
    var cos = Math.cos(delta_angle), sin = Math.sin(delta_angle);
    var offset_x = (x%1)-0.5, offset_y = (y%1)-0.5;
    var newX = 6 +  offset_x * cos + offset_y * -sin + 0.5;
    var newY = 7 +  offset_x * sin + offset_y * cos  + 0.5;
    ///newX += Math.sin( + new Date()/2000)-1;
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

