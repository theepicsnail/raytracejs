define(["promise", "app/Player", "app/Map", "app/Camera", "app/Controls", "app/GameLoop", "app/Debug"],
function(Promise,   Player,       Map,       Camera,      Controls,        GameLoop,       Debug) {

  var width, height;
  var canvas;
  var ctx;

  // GameLoop content
  var game;
  function start() {
    var player = new Player(9, 7.5, 3.14);
    var map = new Map(16);
    var camera = new Camera(canvas, 320, 0.8);

    function update(dt) {
      if(Controls.states.space) {
        Debug.enabled = true;
        console.group(dt);
      }
      map.update(dt);
      player.update(Controls.states, map, dt);
      camera.render(player, map);

      if(Debug.enabled) {
        Debug.enabled = false;
        console.groupEnd();
      }
    }
    map.randomize();
    (new GameLoop()).start(update);
  }

  function addListeners() {
    return;
    function handler(evt) {
      if(!evt) {
        evt = event;
      }
      if(evt.touches) {
        evt = evt.touches[0];
      }
      select(evt.clientX, evt.clientY);
    }
    canvas.addEventListener("touchmove", function(event){event.preventDefault();}, false);
    canvas.addEventListener("touchstart", handler, false);
    canvas.addEventListener("mousedown", handler, false);
    document.addEventListener("keydown", function(e) {
      switch(e.keyCode) {
        case 49: sel_color = 0; break;
        case 50: sel_color = 1; break;
        case 51: sel_color = 2; break;
        case 52: sel_color = 3; break;
      }
    },true);
  }

  return {
    init: function() {
      return new Promise(function(accept, reject){
        canvas = document.createElement("canvas");
        ctx = canvas.getContext("2d");
        document.getElementById("content").appendChild(canvas);
        addListeners();
        accept();
      });
    },
    start:start
  };
});
