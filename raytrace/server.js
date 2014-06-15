var requirejs = require('requirejs');
requirejs.config({
  baseUrl: __dirname + '/public/js'
});

var sockjs = requirejs('sockjs');

var app_server = requirejs('app/server');

var sock_server = sockjs.createServer({
  sockjs_url: "http://cdn.sockjs.org/sockjs-0.2.min.js"
});

app_server.setup(sock_server);

var http = requirejs('http');
var web_server = http.createServer();
sock_server.installHandlers(web_server, {prefix:'/sjs'});

var node_static = require('node-static');
var static_dir = new node_static.Server(__dirname + '/public');
web_server.addListener('request', function (req, res){
  static_dir.serve(req, res);
});
web_server.addListener('upgrade', function(req, res) { res.end(); });
web_server.listen(1238, function(){
  addr = web_server.address();
  console.log("Serving on: http://localhost:" + addr.port);
});
