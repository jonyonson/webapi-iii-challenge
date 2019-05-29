const express = require('express');

const userRouter = require('./users/userRouter.js');
const postsRouter = require('./posts/postRouter.js');

const server = express();

server.use(express.json());
server.use(logger);

server.use('/api/users', userRouter);
server.use('/api/posts', postsRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`A ${req.method} request to '${req.url}'`);
  next();
}

module.exports = server;
