var express = require("express");
var app = require("express")();
var cors = require('cors')
var bodyParser = require('body-parser');
var Pusher = require('pusher');

app.use(bodyParser.json());
app.use(cors());
//app.use(express.static('../react/build'));
const pusher = new Pusher({
    key: 'APP_KEY',
});

require('./route/node.route.js')(app);

app.post('/slider', (req, res) => {
    console.log(req.body);
    const payload = req.body;
    pusher.trigger('slider', 'targetValue', payload);
    console.log(targetValue);
    res.send(payload)
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running.. on Port: ${PORT}`);
});
