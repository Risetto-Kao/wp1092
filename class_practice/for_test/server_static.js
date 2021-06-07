const http = require('http');
const express = require('express');
const path = require('path');

const app = express();
const server = http.createServer(app);

app.use(express.static(path.join(__dirname,'public')));

server.listen(8000,()=> console.log('Server on localhost 8000'));

