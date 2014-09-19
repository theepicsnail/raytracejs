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

require(["app/main"],
function(main) {
  main.start();
});

