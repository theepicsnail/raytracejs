define([],
function() {
  function GameLoop() {
    console.log("start");
    this.frame = this.frame.bind(this);
    this.lastTime = 0;
    this.callback = function() {};
  }

  GameLoop.prototype.start = function(callback) {
    this.callback = callback;
    requestAnimationFrame(this.frame);
  };

  GameLoop.prototype.frame = function(time) {
    var seconds = (time - this.lastTime) / 1000;
    this.lastTime = time;
    if (seconds < 0.2) {
      this.callback(seconds);
    }
    requestAnimationFrame(this.frame);
  };

  return GameLoop;
});
