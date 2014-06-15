requirejs.config({
  baseUrl: 'js',
  map: {
    '*': {
      'promise': 'libs/es6-promise/promise',
    }
  },
  shim: {
    'libs/es6-promise/promise':{
      exports: 'Promise'
    }
  }
});

require(["loadscreen", "app/resources", "app/main"],
function( loadscreen,       resources,       main) {
  loadscreen.start();
  resources.load().then(main.init).then(function() {
    loadscreen.stop();
    main.start();
  });
});

