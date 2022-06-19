const express = require('express');
const ImageController = require('../controllers/ImageController');
const imageRouter = express.Router();


imageRouter.post('/', ImageController.upload);
imageRouter.get('/:id', ImageController.get);


module.exports = imageRouter;
