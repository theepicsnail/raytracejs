define([], function() {


  function Portal() {
  }

  Portal.prototype.setEntrance = function(row, col, dir) {
  };

  Portal.prototype.setExit = function(row, col, dir) {
  };

  Portal.prototype.rayEnters = function(x, y, dx, dy) {
    return Math.floor(x) === 7 && Math.floor(y) === 7 && Math.floor(x - dx) === 6;
  };

  Portal.prototype.cross = function(x, y, dir, dist) {
    return {
      x: 3 + (1 - y%1),
      y: 3 + (    x%1),
      dir: dir + Math.PI/2
    };
    // Project the movement through the portal and
    // return the resulting x, y, dx, dy
  };

  return Portal;
});

