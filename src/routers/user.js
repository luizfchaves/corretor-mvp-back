const express = require('express');
const UserController = require('../controllers/UserController');
const userRouter = express.Router();


userRouter.post('/', UserController.create);
userRouter.post('/login', UserController.authenticate);
// userRouter.get('/:id', UserController.get);


module.exports = userRouter;
