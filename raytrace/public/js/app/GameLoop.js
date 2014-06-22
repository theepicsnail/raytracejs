define([],
function() {
  function GameLoop() {
    console.log("start");
    this.frame = this.frame.bind(this);
    this.lastTime = 0;
    this.callback = function() {};
    this.fps = 30;
    this.interval = 1000/this.fps;
  }

  GameLoop.prototype.start = function(callback) {
    this.callback = callback;
    requestAnimationFrame(this.frame);
  };


  GameLoop.prototype.frame = function(time) {
    var dt = time - this.lastTime;
    if (dt >= this.interval) { // max fps
      if (dt < 200) {
        this.callback(dt/1000);
      }
      this.lastTime = time - dt % this.interval;
    }

    requestAnimationFrame(this.frame);
  };

  return GameLoop;
});
