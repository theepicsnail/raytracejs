define([], function() {


  function Portal() {
  }

  Portal.prototype.setEntrance = function(x, y, dir) {

  };

  Portal.prototype.setExit = function(x, y, dir) {

  };

  Portal.prototype.rayEnters = function(x, y, dx, dy) {
    return Math.floor(x) === 7 && Math.floor(y) === 7 && Math.floor(x - dx) === 6;
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

