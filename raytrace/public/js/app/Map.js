define(["app/Bitmap", "app/Portal", "app/Debug"], function(Bitmap, Portal, Debug) {
//define(["app/Bitmap"], function(Bitmap) {

  function Map(size) {
    this.size = size;
    this.wallGrid = new Uint8Array(size * size);
    this.skybox = new Bitmap('./assets/deathvalley_panorama.jpg', 2000, 750);
    //this.wallTexture = new Bitmap('./assets/wall_texture.jpg', 1024, 1024);
    this.wallTexture = new Bitmap('./assets/wall.png', 32, 32);
    this.portalTexture = new Bitmap('./assets/portal_blue.png', 32, 32);
    this.light = 0;
    this.portals = [
    //new Portal()
    ];
    //Enter the portal by going left at 6,7
    //this.portals[0].setEntrance(6, 7, Portal.LEFT);

    //this.portals[0].setEntrance(8, 7, Portal.RIGHT);
    //this.portals[0].setEntrance(7, 6, Portal.UP);
    //this.portals[0].setEntrance(7, 8, Portal.DOWN);

    //Exit the portal by going into 5,6 from the left
    //this.portals[0].setExit(6, 7, Portal.RIGHT);

    this.portals.push(new Portal()
      .from(2, 1, Portal.RIGHT) // exiting 1,1 going up means you come
      .to(1, 1, Portal.RIGHT) // out from 0,1's right wall
      );

    this.portals.push(new Portal()
      .from(5, 5, Portal.RIGHT)
      .to(6,7,Portal.RIGHT));

    //this.portals.push(new Portal()
    //  .from(1, 1, Portal.LEFT)
    //  .to(1, 0, Portal.DOWN));
  }

  Map.prototype.getTexture = function(id) {
    if(id == -1) return undefined;
    if(id == 1) return this.wallTexture;
    if(id == 2) return this.portalTexture;
    console.log('invalid texture id:', id);
    return this.wallTexture;
  };

  Map.prototype.get = function(x, y) {
    x = Math.floor(x);
    y = Math.floor(y);
    if (x < 0 || x > this.size - 1 || y < 0 || y > this.size - 1) return -1;
    return this.wallGrid[y * this.size + x];
  };

  Map.prototype.randomize = function() {
    //    for (var i = 0; i < this.size * this.size; i++) {
    //      this.wallGrid[i] = Math.random() < 0.3 ? 1 : 0;
    //    }
    var data = [
      "xxxxxxxxxxxxxxxx",
      "x              x",
      "x xxxxxxxxxxxx x",
      "x              x",
      "x    xxx       x",
      "x      x       x",
      "x    xxx       x",
      "x    x         x",
      "x    xxx       x",
      "x              x",
      "x              x",
      "x              x",
      "x              x",
      "x xxxxxxxxxxx  x",
      "x              x",
      "xxxxxxxxxxxxxxxx",
      ];
    for (var i = 0 ; i < this.size ; i ++)
      for (var j = 0 ; j < this.size ; j ++) {
        this.wallGrid[i*this.size + j] = data[i][j] !== ' ';
      }
  };

  Map.prototype.cast = function(point, angle, range) {
    var sin = Math.sin(angle);
    var cos = Math.cos(angle);
    this.range = range;
    return this.ray({ x: point.x, y: point.y, height: 0, distance: 0 }, angle, cos, sin);
  };

  Map.prototype.move = function(x, y, dir, dist) {
    // returns {x, y, dir}

    var dx = Math.cos(dir) * dist;
    var dy = Math.sin(dir) * dist;

    x += dx;
    y += dy;
    for(var i in this.portals)
    if(this.portals[i].rayEnters(x, y, dx, dy))
    {
      portal_result = this.portals[i].cross(x, y, dir, dist);
      //if(Debug.enabled)
      console.log("Player crossed", x, y, portal_result);
      return portal_result
    }

    if (this.get(x + dx, y) > 0) x -= dx;
    if (this.get(x, y + dy) > 0) y -= dy;


    return {
      x:x, y:y, dir: dir
    };
  };

  Map.prototype.ray = function(origin, dir, dx, dy) {
    var casting = true;
    var result = [];
    while(casting) {
      var stepX = this.step(dy, dx, origin.x, origin.y);
      var stepY = this.step(dx, dy, origin.y, origin.x, true);
      var nextStep = stepX.length2 < stepY.length2 ?
        this.inspect(stepX, dx,dy,1, 0, origin.distance, stepX.y)
        : this.inspect(stepY, dx,dy,0, 1, origin.distance, stepY.x);

      var portaled = false;
      for(var i in this.portals)
      if(this.portals[i].rayEnters(nextStep.x, nextStep.y, dx, dy))
      {
        var end = this.portals[i].cross(nextStep.x, nextStep.y, dir, 0 );
        if (Debug.column)
          console.log("Ray crossed", nextStep.x, nextStep.y, end)
        nextStep.x = end.x;
        nextStep.y = end.y;
        dx = Math.cos(end.dir);
        dy = Math.sin(end.dir);
        origin = nextStep;
        origin.height = 0;
        result.push(origin);
        portaled = true;
      }
      //if (portaled) {
      //  continue;
      //}

      if(nextStep.height > 0)
        result.push(nextStep);
      //result.push(origin);
      //if (origin.height > 0)
      //  casting = false;
      if (nextStep.distance > this.range)
        casting = false;
      else
        origin = nextStep;
    }
    if (Debug.column) {
      console.log(result);
    }
    return result;
  };



  Map.prototype.step = function(rise, run, x, y, inverted) {
    if (run === 0) return { length2: Infinity };
    var dx = run > 0 ? Math.floor(x + 1) - x : Math.ceil(x - 1) - x;
    var dy = dx * (rise / run);
    return {
      x: inverted ? y + dy : x + dx,
        y: inverted ? x + dx : y + dy,
        length2: dx * dx + dy * dy
    };
  };

  Map.prototype.inspect = function(step,dx, dy, shiftX, shiftY, distance, offset) {
    dx = dx < 0 ? shiftX : 0;
    dy = dy < 0 ? shiftY : 0;
    step.height = this.get(step.x - dx, step.y - dy);
    step.distance = distance + Math.sqrt(step.length2);
    if (shiftX) step.shading = dx < 0 ? 2 : 0;
    else step.shading = dy < 0 ? 2 : 1;
    step.offset = offset - Math.floor(offset);
    return step;
  };

  Map.prototype.update = function(seconds) {
    //if (this.light > 0) this.light = Math.max(this.light - 10 * seconds, 0);
    //else if (Math.random() * 5 < seconds) this.light = 2;
  };

  return Map;
});
