//Creste server to listen to HTTP requests

const http = require('http');
const app = require('./app'); 

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, function(){
    console.log('listening on port ' + port);
});

