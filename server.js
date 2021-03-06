var express = require("express");
var app = require("express")();
var cors = require('cors')
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(bodyParser.json());
app.use(cors());
//app.use(express.static('../react/build'));

io.on('connection', function(client){

    client.on('subscribeToSlider', (targetValue) => {
        

        client.broadcast.emit( 'slider', { targetValue, senderId: client.id } );
    });
});
  
require('./route/node.route.js')(app);

const PORT = process.env.PORT || 8080;

http.listen(PORT, () => {
    console.log(`Server is running.. on Port: ${PORT}`);
});