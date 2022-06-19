const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const app = express();
app.use(fileUpload({
  createParentPath: true,
}));
app.use(express.json());
app.use(cors());


const imageRouter = require('./routers/image');
const userRouter = require('./routers/user');
app.use('/image', imageRouter);
app.use('/user', userRouter);


app.get('/', (req, res) => {
  return res.send('Hello World hehe!');
});

module.exports = app;
