const express = require("express");


const app = express();

app.get('/', (req, res) => {
  res.send('this is a get message on port 3000');
});

app.listen(3000, "hello, server listen on port 3000");