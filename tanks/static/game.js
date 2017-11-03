var socket = io();// Q: one of these files for each time a client opens the website?
socket.on('message', function(data){
 //console.log(data)//since server.js uses this directory: static, can communicate with this file in static. 
})//data is Yolo! from server.js which is the message stated above. Shown in console only because of this test.

socket.on('name', function(myData){
 //console.log(myData)
})

socket.on('json', function(persons){//actually just gets access to an object in the server.js file
// console.log(persons[0].name)
})

var movement = { //switch statements below manipulate the variables here.
 up: false,
 down: false,
 left: false,
 right: false
}

document.addEventListener('keydown', function(event) {//Q: connects with the user input on the html?
 switch(event.keyCode) {
  case 65: //A
   movement.left = true;
   break;
  case 83: //W
   movement.up = true;
   break;
  case 68: //D
   movement.right = true;
   break;
  case 87: //S
   movement.down = true;
   break;
 }
})

document.addEventListener('keyup', function(event) {
 switch(event.keyCode) {
  case 65: //A
   movement.left = false;
   break;
  case 83: //W
   movement.up = false;
   break;
  case 68: //D
   movement.right = false;
   break;
  case 87: //S
   movement.down = false;
   break;
 }
})

//send message to server that player joined. Create loop to constantly update server of key inputs
socket.emit('new player')
setInterval(function(){
 socket.emit('movement', movement)//Q: since socket = io(), means has direct path back to server.js??
}, 1000/60) //does so 60 times per second!

//Draw players received from server, on canvas:
var canvas = document.getElementById("canvas")
canvas.width = 800
canvas.height = 600
var context = canvas.getContext('2d')

socket.on('state', function(players){ //when server completes state and sends this 'state' message to sockets then...
 context.clearRect(0, 0, 800, 600)//create object to draw
 context.fillStyle = 'blue'
 for(var id in players) { //and set up the object for each player. Does so 60 times per second because 'state' being received from server.js at this rate 
  var player = players[id]
  context.beginPath()
  context.arc(player.x, player.y, 10, 0, 2*Math.PI)
  //context.moveTo(player.x, player.y)
  //context.lineTo(100,75)
  //context.lineTo(100, 25)
  context.fill()
 } 
})


