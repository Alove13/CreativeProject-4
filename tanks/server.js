var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');



var people = {
 
 0: {
   "name": "Pedro",
   "age": 21,
   "gender": "Male"
  },

 1: {
   "name": "John",
   "age": "30",
   "gender": "Male"
  }
}

var app = express()
var server = http.Server(app) //use express to set up server Q: what is http accessing here?
var io = socketIO(server) // Q: socketIO connected to Server connected to express?

app.set('port', 5000) //Q:how to know range of ports can use? Local vs other servers like bitnami, etc?
app.use('/static', express.static(__dirname + '/static')) //server is going to access public or static files in this directory

//Routing
app.get('/', function(request, response) {
 response.sendFile(path.join(__dirname, 'index.html'))//Q: what is __dirname doing? Does it go out and find index.html?
})

//Starts the Server
server.listen(5000, function(){
// console.log("Started server on port 5000")
})

//Add WebSocket Handlers
io.on('connection', function(socket){
})

setInterval(function(){
 io.sockets.emit('message', 'Yolo!')//sends this message out to all connected to server once/second. In console.
}, 1000)//For testing, every second, meaning 1000 ms, will send message.

setInterval(function(){
 io.sockets.emit('name', 'Aaron')
}, 1000)

setInterval(function(){
 io.sockets.emit('json', people)
}, 1000)

//handle input received from game.js the key inputs
var players = {}
io.on('connection', function(socket){
 socket.on('new player', function(){
  players[socket.id] = {
   x:300,
   y: 300
  }
 })
 socket.on('movement', function(data){
  var player = players[socket.id] || {}
  if(data.left){
   player.x -= 5
  }
  if(data.up) {
   player.y += 5 
  }
  if(data.right) {
   player.x += 5
  }
  if(data.down) {
   player.y -= 5
  }
 })
})

setInterval(function(){
 io.sockets.emit('state', players)
}, 1000/60)
